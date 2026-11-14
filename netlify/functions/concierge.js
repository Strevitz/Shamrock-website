// Personal Concierge: zapis prośby, e-mail do salonu (info@) i potwierdzenie dla członka.
const { env, json, sb, getUser, sendMail, STAFF_EMAIL } = require("./_lib");

const TYPES = { booking: "Znalezienie terminu", change: "Zmiana / odwołanie rezerwacji", other: "Inne pytanie" };

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") return json(405, { error: "method" });
  try {
    const user = await getUser(event);
    if (!user) return json(401, { error: "unauthorized" });
    const body = JSON.parse(event.body || "{}");
    const type = TYPES[body.type] ? body.type : "other";
    const message = String(body.message || "").trim().slice(0, 800);
    if (!message) return json(400, { error: "empty" });

    const mem = (await sb(`memberships?user_id=eq.${user.id}&select=status`))[0];
    if (!mem || !["active", "trialing"].includes(mem.status)) return json(403, { error: "not_member" });

    const prof = (await sb(`profiles?id=eq.${user.id}&select=full_name,phone,member_code`))[0] || {};
    await sb("concierge_requests", { method: "POST", body: { user_id: user.id, type, message } });

    await sendMail({
      to: STAFF_EMAIL(),
      replyTo: user.email,
      subject: `Concierge: ${TYPES[type]} – ${prof.full_name || user.email}`,
      text: `Członek: ${prof.full_name} (${prof.member_code})\nTelefon: ${prof.phone}\nE-mail: ${user.email}\nRodzaj: ${TYPES[type]}\n\n${message}`,
    }).catch((e) => console.error(e));
    await sendMail({
      to: user.email,
      replyTo: STAFF_EMAIL(),
      subject: "Klub Szamrokersów – otrzymaliśmy Twoją prośbę",
      text: `Cześć ${prof.full_name || ""},\n\notrzymaliśmy Twoją prośbę (${TYPES[type]}) i odezwiemy się na WhatsApp lub e-mail.\n\nShamrock Barber Shop`,
    }).catch((e) => console.error(e));

    const wa = `${env("WHATSAPP_BASE", "https://wa.me/48519603221")}?text=${encodeURIComponent(
      `Klub Szamrokersów (${prof.member_code}): ${TYPES[type]}. ${message}`
    )}`;
    return json(200, { ok: true, whatsapp: wa });
  } catch (e) {
    console.error(e);
    return json(500, { error: "server_error" });
  }
};
