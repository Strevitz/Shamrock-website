// Tworzy sesję Stripe Checkout (subskrypcja miesięczna) dla zalogowanego użytkownika.
const { env, SITE, json, sb, getUser, stripe, prefixFor, isClubSubscription } = require("./_lib");
const agreement = require("../../src/membership/agreement.json");

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") return json(405, { error: "method" });
  try {
    const user = await getUser(event);
    if (!user) return json(401, { error: "unauthorized" });
    const { lang: rawLang, termsVersion, acceptTerms, startNow } = JSON.parse(event.body || "{}");
    if (termsVersion !== agreement.version || acceptTerms !== true || startNow !== true) {
      return json(400, { error: "agreement_required" });
    }
    const lang = ["pl", "en", "uk"].includes(rawLang) ? rawLang : "pl";

    const rows = await sb(`memberships?user_id=eq.${user.id}&select=*`);
    const m = rows[0];
    if (m && ["active", "trialing", "past_due", "incomplete"].includes(m.status)) {
      return json(409, { error: "already_subscribed" });
    }

    let customer = m && m.stripe_customer_id;
    if (!customer) {
      const prof = (await sb(`profiles?id=eq.${user.id}&select=full_name,phone`))[0] || {};
      const c = await stripe("/customers", {
        email: user.email,
        name: prof.full_name || undefined,
        phone: prof.phone || undefined,
        metadata: { user_id: user.id },
      }, "POST", `club-customer-${user.id}`);
      customer = c.id;
      await sb("memberships?on_conflict=user_id", {
        method: "POST",
        prefer: "resolution=merge-duplicates",
        body: { user_id: user.id, stripe_customer_id: customer, updated_at: new Date().toISOString() },
      });
    }

    const customerQuery = `customer=${encodeURIComponent(customer)}`;
    const { data: previous } = await stripe(`/checkout/sessions?${customerQuery}&limit=1`);
    const latest = previous[0];
    if (latest && latest.status === "open" && latest.url) {
      if (latest.metadata?.club_terms_version === agreement.version) return json(200, { url: latest.url });
      await stripe(`/checkout/sessions/${latest.id}/expire`, {}, "POST", `club-expire-${latest.id}`);
    }

    // Stripe jest źródłem prawdy także przed zapisaniem zdarzenia w Supabase.
    const { data: subscriptions } = await stripe(`/subscriptions?${customerQuery}&limit=100`);
    if (subscriptions.some((sub) => !["canceled", "incomplete_expired"].includes(sub.status) && isClubSubscription(sub))) {
      return json(409, { error: "already_subscribed" });
    }

    const p = prefixFor(lang);
    const session = await stripe("/checkout/sessions", {
      mode: "subscription",
      customer,
      client_reference_id: user.id,
      line_items: [{ price: env("STRIPE_PRICE_ID"), quantity: 1 }],
      // Cena klubu jest podana w PLN; nie zmieniaj waluty na podstawie lokalizacji klienta.
      adaptive_pricing: { enabled: false },
      payment_method_types: ["card"],
      success_url: `${SITE()}${p}/membership/account?checkout=success`,
      cancel_url: `${SITE()}${p}/membership`,
      locale: lang,
      custom_text: { submit: { message: agreement[lang].checkoutText } },
      metadata: { club_terms_version: termsVersion, club_start_now: "yes", club_language: lang },
      subscription_data: { metadata: { user_id: user.id, club_terms_version: termsVersion, club_start_now: "yes", club_language: lang } },
    }, "POST", `club-checkout-${customer}-${latest ? latest.id : "first"}`);
    return json(200, { url: session.url });
  } catch (e) {
    console.error(e);
    return json(500, { error: "server_error" });
  }
};
