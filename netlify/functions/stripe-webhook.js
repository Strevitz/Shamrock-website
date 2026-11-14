// Webhook Stripe: synchronizuje status członkostwa i historię płatności z bazą Supabase
// oraz obsługuje nieudane płatności (status past_due + e-mail do członka i salonu).
const { env, json, sb, stripe, verifyStripeSignature, sendMail, STAFF_EMAIL, SITE } = require("./_lib");

const mapStatus = (s) =>
  ({ active: "active", trialing: "trialing", past_due: "past_due", unpaid: "past_due", canceled: "canceled", incomplete: "incomplete", incomplete_expired: "canceled" }[s] || "none");

const periodEnd = (sub) => {
  const ts = sub.current_period_end || (sub.items && sub.items.data[0] && sub.items.data[0].current_period_end);
  return ts ? new Date(ts * 1000).toISOString() : null;
};

async function userIdForCustomer(customerId) {
  const r = await sb(`memberships?stripe_customer_id=eq.${customerId}&select=user_id`);
  return r[0] && r[0].user_id;
}

async function syncSubscription(sub, userIdHint) {
  const userId = userIdHint || (sub.metadata && sub.metadata.user_id) || (await userIdForCustomer(sub.customer));
  if (!userId) return console.log("[webhook] brak user_id dla subskrypcji", sub.id);
  await sb("memberships?on_conflict=user_id", {
    method: "POST",
    prefer: "resolution=merge-duplicates",
    body: {
      user_id: userId,
      stripe_customer_id: sub.customer,
      stripe_subscription_id: sub.id,
      status: mapStatus(sub.status),
      current_period_end: periodEnd(sub),
      cancel_at_period_end: Boolean(sub.cancel_at_period_end || sub.cancel_at),
      updated_at: new Date().toISOString(),
    },
  });
  return userId;
}

async function recordInvoice(inv, status) {
  const userId = await userIdForCustomer(inv.customer);
  if (!userId) return null;
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
  return userId;
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
          const uid = await syncSubscription(sub, obj.client_reference_id);
          const prof = uid && (await sb(`profiles?id=eq.${uid}&select=full_name,email,member_code`))[0];
          if (prof && prof.email) {
            await sendMail({
              to: prof.email,
              subject: "Witaj w Klubie Szamrokersów ☘",
              text: `Cześć ${prof.full_name || ""}!\n\nTwoje członkostwo jest aktywne. Kod członka: ${prof.member_code}.\nKartę z kodem QR znajdziesz w panelu: ${SITE()}/membership/account\n\nShamrock Barber Shop`,
              replyTo: STAFF_EMAIL(),
            }).catch((e) => console.error(e));
          }
        }
        break;
      }
      case "customer.subscription.created":
      case "customer.subscription.updated":
      case "customer.subscription.deleted":
        await syncSubscription(obj);
        break;
      case "invoice.paid":
      case "invoice.payment_succeeded":
        await recordInvoice(obj, "paid");
        break;
      case "invoice.payment_failed": {
        const uid = await recordInvoice(obj, "failed");
        if (uid) {
          await sb(`memberships?user_id=eq.${uid}`, { method: "PATCH", body: { status: "past_due", updated_at: new Date().toISOString() } });
          const prof = (await sb(`profiles?id=eq.${uid}&select=full_name,email`))[0];
          if (prof && prof.email) {
            await sendMail({
              to: prof.email,
              subject: "Klub Szamrokersów – nie udało się pobrać płatności",
              text: `Cześć ${prof.full_name || ""},\n\nnie udało się pobrać opłaty za członkostwo. Zaktualizuj kartę w panelu: ${SITE()}/membership/account\nDo czasu uregulowania przywileje są wstrzymane.\n\nShamrock Barber Shop`,
              replyTo: STAFF_EMAIL(),
            }).catch((e) => console.error(e));
          }
          await sendMail({
            to: STAFF_EMAIL(),
            subject: "Nieudana płatność członka klubu",
            text: `Nieudana płatność: ${(prof && prof.full_name) || uid} (${(prof && prof.email) || ""}).`,
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
