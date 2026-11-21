// Webhook Stripe: synchronizuje status członkostwa i historię płatności z bazą Supabase
// oraz obsługuje nieudane płatności (status past_due + e-mail do członka i salonu).
const { env, json, sb, stripe, isClubSubscription, verifyStripeSignature, sendMail, STAFF_EMAIL, SITE, prefixFor } = require("./_lib");
const agreement = require("../../src/membership/agreement.json");

const mapStatus = (s) =>
  ({ active: "active", trialing: "trialing", past_due: "past_due", unpaid: "past_due", canceled: "canceled", incomplete: "incomplete", incomplete_expired: "canceled" }[s] || "none");

const periodEnd = (sub) => {
  const ts = sub.current_period_end || sub.items?.data?.[0]?.current_period_end;
  return ts ? new Date(ts * 1000).toISOString() : null;
};

async function clubMembership(sub) {
  if (!isClubSubscription(sub)) return null;
  const r = await sb(`memberships?stripe_customer_id=eq.${encodeURIComponent(sub.customer)}&select=user_id,stripe_subscription_id`);
  return r[0] || null;
}

async function syncSubscription(sub, membership) {
  if (!membership) return null;
  const userId = membership.user_id;
  const status = mapStatus(sub.status);
  if (status === "canceled" && membership.stripe_subscription_id && membership.stripe_subscription_id !== sub.id) return null;
  await sb("memberships?on_conflict=user_id", {
    method: "POST",
    prefer: "resolution=merge-duplicates",
    body: {
      user_id: userId,
      stripe_customer_id: sub.customer,
      stripe_subscription_id: sub.id,
      status,
      current_period_end: periodEnd(sub),
      cancel_at_period_end: Boolean(sub.cancel_at_period_end || sub.cancel_at),
      updated_at: new Date().toISOString(),
    },
  });
  return userId;
}

async function recordInvoice(inv, status, userId) {
  await sb("payments?on_conflict=stripe_invoice_id", {
    method: "POST",
    prefer: "resolution=merge-duplicates",
    body: {
      user_id: userId,
      stripe_invoice_id: inv.id,
      amount: status === "paid" ? inv.amount_paid : inv.amount_due,
      currency: inv.currency,
      status,
      hosted_invoice_url: inv.hosted_invoice_url || null,
    },
  });
}

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") return json(405, { error: "method" });
  const raw = event.isBase64Encoded ? Buffer.from(event.body, "base64").toString("utf8") : event.body;
  const sig = event.headers["stripe-signature"] || event.headers["Stripe-Signature"];
  if (!verifyStripeSignature(raw, sig, env("STRIPE_WEBHOOK_SECRET"))) return json(400, { error: "bad_signature" });

  try {
    const ev = JSON.parse(raw);
    const obj = ev.data.object;
    switch (ev.type) {
      case "checkout.session.completed": {
        if (obj.mode === "subscription" && obj.subscription) {
          const sub = await stripe(`/subscriptions/${obj.subscription}`);
          const membership = await clubMembership(sub);
          if (!membership || (obj.client_reference_id && obj.client_reference_id !== membership.user_id)) break;
          const uid = await syncSubscription(sub, membership);
          const prof = uid && (await sb(`profiles?id=eq.${uid}&select=full_name,email,member_code`))[0];
          if (prof && prof.email && ["active", "trialing"].includes(sub.status)) {
            const lang = ["pl", "en", "uk"].includes(obj.metadata?.club_language) ? obj.metadata.club_language : "pl";
            const terms = agreement[lang];
            const date = new Date((ev.created || obj.created) * 1000);
            const confirmations = obj.metadata?.club_terms_version === agreement.version
              ? [terms.accept, terms.startNow] : [];
            const sent = await sendMail({
              to: prof.email,
              subject: terms.confirmSubject,
              text: [
                terms.confirmIntro,
                Number.isNaN(date.getTime()) ? null : `${terms.agreementDate}: ${date.toISOString().slice(0, 10)}`,
                `${terms.memberCode}: ${prof.member_code || "—"}`,
                `${terms.account}: ${SITE()}${prefixFor(lang)}/membership/account`,
                `${terms.title} (${obj.metadata?.club_terms_version || agreement.version})`,
                `${agreement.seller}\n${agreement.email}\n${agreement.phone}`,
                ...terms.items,
                ...confirmations,
                `${terms.formTitle}:\n${terms.form}`,
              ].filter(Boolean).join("\n\n"),
              replyTo: STAFF_EMAIL(),
              idempotencyKey: `club-welcome-${obj.id}`,
            });
            // Testowy podgląd może działać bez poczty, produkcja ma ponowić wysyłkę.
            if (!sent && obj.livemode) throw new Error("Club confirmation mail is not configured");
          }
        }
        break;
      }
      case "customer.subscription.created":
      case "customer.subscription.updated":
      case "customer.subscription.deleted": {
        if (!isClubSubscription(obj)) break;
        const sub = await stripe(`/subscriptions/${obj.id}`);
        await syncSubscription(sub, await clubMembership(sub));
        break;
      }
      case "invoice.paid":
      case "invoice.payment_succeeded":
      case "invoice.payment_failed": {
        const subId = (obj.parent && obj.parent.subscription_details && obj.parent.subscription_details.subscription) || obj.subscription;
        if (!subId) break;
        const sub = await stripe(`/subscriptions/${subId}`);
        const membership = await clubMembership(sub);
        if (!membership) break;
        const uid = membership.user_id;
        const failed = ev.type === "invoice.payment_failed";
        // Zaległe zdarzenie nie może nadpisać zaksięgowanej płatności.
        if (failed && ["active", "trialing"].includes(sub.status)) break;
        await recordInvoice(obj, failed ? "failed" : "paid", uid);
        if (failed && (!membership.stripe_subscription_id || membership.stripe_subscription_id === sub.id)) {
          await syncSubscription(sub, membership);
          const prof = (await sb(`profiles?id=eq.${uid}&select=full_name,email`))[0];
          if (prof && prof.email) {
            await sendMail({
              to: prof.email,
              subject: "Klub Szamrokersów – nie udało się pobrać płatności",
              text: `Cześć ${prof.full_name || ""},\n\nnie udało się pobrać opłaty za członkostwo. Zaktualizuj kartę w panelu: ${SITE()}/membership/account\nDo czasu uregulowania przywileje są wstrzymane.\n\nShamrock Barber Shop`,
              replyTo: STAFF_EMAIL(),
              idempotencyKey: `club-payment-failed-member-${ev.id}`,
            }).catch((e) => console.error(e));
          }
          await sendMail({
            to: STAFF_EMAIL(),
            subject: "Nieudana płatność członka klubu",
            text: `Nieudana płatność: ${(prof && prof.full_name) || uid} (${(prof && prof.email) || ""}).`,
            idempotencyKey: `club-payment-failed-staff-${ev.id}`,
          }).catch((e) => console.error(e));
        }
        break;
      }
      default:
        break;
    }
    return json(200, { received: true });
  } catch (e) {
    console.error(e);
    return json(500, { error: "server_error" }); // Stripe ponowi dostarczenie
  }
};
