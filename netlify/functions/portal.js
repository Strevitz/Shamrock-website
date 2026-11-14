// Portal klienta Stripe: zmiana karty, anulowanie subskrypcji, faktury.
const { SITE, json, sb, getUser, stripe, prefixFor } = require("./_lib");

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") return json(405, { error: "method" });
  try {
    const user = await getUser(event);
    if (!user) return json(401, { error: "unauthorized" });
    const { lang } = JSON.parse(event.body || "{}");
    const m = (await sb(`memberships?user_id=eq.${user.id}&select=stripe_customer_id`))[0];
    if (!m || !m.stripe_customer_id) return json(404, { error: "no_customer" });
    const s = await stripe("/billing_portal/sessions", {
      customer: m.stripe_customer_id,
      return_url: `${SITE()}${prefixFor(lang)}/membership/account`,
    });
    return json(200, { url: s.url });
  } catch (e) {
    console.error(e);
    return json(500, { error: "server_error" });
  }
};
