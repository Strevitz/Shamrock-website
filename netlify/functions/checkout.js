// Tworzy sesję Stripe Checkout (subskrypcja miesięczna) dla zalogowanego użytkownika.
const { env, SITE, json, sb, getUser, stripe, prefixFor } = require("./_lib");

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") return json(405, { error: "method" });
  try {
    const user = await getUser(event);
    if (!user) return json(401, { error: "unauthorized" });
    const { lang } = JSON.parse(event.body || "{}");

    const rows = await sb(`memberships?user_id=eq.${user.id}&select=*`);
    let m = rows[0];
    if (m && (m.status === "active" || m.status === "trialing")) return json(409, { error: "already_active" });

    let customer = m && m.stripe_customer_id;
    if (!customer) {
      const prof = (await sb(`profiles?id=eq.${user.id}&select=full_name,phone`))[0] || {};
      const c = await stripe("/customers", {
        email: user.email,
        name: prof.full_name || undefined,
        phone: prof.phone || undefined,
        metadata: { user_id: user.id },
      });
      customer = c.id;
      await sb("memberships?on_conflict=user_id", {
        method: "POST",
        prefer: "resolution=merge-duplicates",
        body: { user_id: user.id, stripe_customer_id: customer, updated_at: new Date().toISOString() },
      });
    }

    const p = prefixFor(lang);
    const session = await stripe("/checkout/sessions", {
      mode: "subscription",
      customer,
      client_reference_id: user.id,
      line_items: [{ price: env("STRIPE_PRICE_ID"), quantity: 1 }],
      success_url: `${SITE()}${p}/membership/account?checkout=success`,
      cancel_url: `${SITE()}${p}/membership`,
      locale: ["pl", "en", "uk"].includes(lang) ? lang : "pl",
      allow_promotion_codes: true,
      subscription_data: { metadata: { user_id: user.id } },
    });
    return json(200, { url: session.url });
  } catch (e) {
    console.error(e);
    return json(500, { error: "server_error" });
  }
};
