// Wspólne funkcje dla funkcji Netlify Klubu Szamrokersów (bez dodatkowych SDK – tylko fetch).
const crypto = require("crypto");

const env = (k, d) => process.env[k] || d;
const SITE = () => env("SITE_URL", "https://shamrockbarber.com").replace(/\/$/, "");
const SB_URL = () => env("SUPABASE_URL", env("REACT_APP_SUPABASE_URL", "")).replace(/\/$/, "");

const json = (statusCode, body) => ({
  statusCode,
  headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
  body: JSON.stringify(body),
});

// --- Supabase (sb_secret lub legacy service_role; tylko po stronie serwera) ---
async function sb(path, { method = "GET", body, prefer } = {}) {
  const key = env("SUPABASE_SERVICE_ROLE_KEY");
  if (!key) throw new Error("missing Supabase server key");
  const res = await fetch(`${SB_URL()}/rest/v1/${path}`, {
    method,
    headers: {
      apikey: key,
      // Współczesny klucz nie jest JWT; bramka Supabase autoryzuje go przez apikey.
      ...(key.startsWith("sb_secret_") ? {} : { Authorization: `Bearer ${key}` }),
      "Content-Type": "application/json",
      ...(prefer ? { Prefer: prefer } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  const data = text ? JSON.parse(text) : null;
  if (!res.ok) throw new Error(`supabase ${res.status}: ${text}`);
  return data;
}

// Użytkownik z nagłówka Authorization: Bearer <token>
async function getUser(event) {
  const auth = event.headers.authorization || event.headers.Authorization || "";
  const token = auth.replace(/^Bearer\s+/i, "");
  if (!token || token === "null") return null;
  const res = await fetch(`${SB_URL()}/auth/v1/user`, {
    headers: { apikey: env("SUPABASE_ANON_KEY", env("REACT_APP_SUPABASE_ANON_KEY", "")), Authorization: `Bearer ${token}` },
  });
  if (!res.ok) return null;
  return res.json();
}

// --- Stripe (REST, formularz x-www-form-urlencoded) ---
function encode(obj, prefix, out = []) {
  Object.keys(obj).forEach((k) => {
    const v = obj[k];
    if (v === undefined || v === null) return;
    const key = prefix ? `${prefix}[${k}]` : k;
    if (typeof v === "object") encode(v, key, out);
    else out.push(`${encodeURIComponent(key)}=${encodeURIComponent(v)}`);
  });
  return out;
}

async function stripe(path, params, method, idempotencyKey) {
  const res = await fetch(`https://api.stripe.com/v1${path}`, {
    method: method || (params ? "POST" : "GET"),
    headers: {
      Authorization: `Bearer ${env("STRIPE_SECRET_KEY")}`,
      "Content-Type": "application/x-www-form-urlencoded",
      ...(idempotencyKey ? { "Idempotency-Key": idempotencyKey } : {}),
    },
    body: params ? encode(params).join("&") : undefined,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(`stripe ${res.status}: ${(data.error && data.error.message) || ""}`);
  return data;
}

const isClubSubscription = (sub) => Boolean(env("STRIPE_PRICE_ID") &&
  Array.isArray(sub.items?.data) && sub.items.data.some((item) => item.price && item.price.id === env("STRIPE_PRICE_ID")));

function verifyStripeSignature(rawBody, header, secret, toleranceSec = 300) {
  if (!header || !secret) return false;
  const parts = {};
  header.split(",").forEach((p) => {
    const [k, v] = p.split("=");
    (parts[k] = parts[k] || []).push(v);
  });
  const t = parts.t && parts.t[0];
  if (!t || !/^\d+$/.test(t) || !parts.v1) return false;
  if (Math.abs(Date.now() / 1000 - Number(t)) > toleranceSec) return false;
  const expected = crypto.createHmac("sha256", secret).update(`${t}.${rawBody}`).digest("hex");
  return parts.v1.some((sig) => {
    const a = Buffer.from(sig);
    const b = Buffer.from(expected);
    return a.length === b.length && crypto.timingSafeEqual(a, b);
  });
}

// --- E-mail transakcyjny: Resend HTTPS w produkcji lub opcjonalny SMTP ---
async function sendMail({ to, subject, text, replyTo, idempotencyKey }) {
  const resendKey = env("RESEND_API_KEY");
  if (resendKey) {
    const from = env("MAIL_FROM");
    if (!from) throw new Error("missing MAIL_FROM");
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendKey}`,
        "Content-Type": "application/json",
        ...(idempotencyKey ? { "Idempotency-Key": idempotencyKey } : {}),
      },
      body: JSON.stringify({ from: `Shamrock Barber Shop <${from}>`, to: [to], subject, text, reply_to: replyTo }),
    });
    if (!res.ok) throw new Error(`Resend send failed (${res.status})`);
    return true;
  }
  if (!env("SMTP_HOST") || !env("SMTP_USER") || !env("SMTP_PASS")) {
    console.log("[mail] brak konfiguracji SMTP – pomijam:", subject);
    return false;
  }
  const nodemailer = require("nodemailer");
  const port = Number(env("SMTP_PORT", "465"));
  const transport = nodemailer.createTransport({
    host: env("SMTP_HOST"),
    port,
    secure: port === 465,
    auth: { user: env("SMTP_USER"), pass: env("SMTP_PASS") },
  });
  await transport.sendMail({
    from: `"Shamrock Barber Shop" <${env("MAIL_FROM", env("SMTP_USER"))}>`,
    to,
    subject,
    text,
    replyTo,
  });
  return true;
}

const STAFF_EMAIL = () => env("MAIL_TO", "info@shamrockbarber.com");
const prefixFor = (lang) => (lang === "uk" ? "/ua" : lang === "en" ? "/en" : "");

module.exports = { env, SITE, json, sb, getUser, stripe, isClubSubscription, verifyStripeSignature, sendMail, STAFF_EMAIL, prefixFor };
