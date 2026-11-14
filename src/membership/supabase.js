// Minimalny klient Supabase (Auth + REST) oparty na fetch – bez dodatkowych zależności.
import { useEffect, useState } from "react";
import { SUPABASE_URL, SUPABASE_ANON_KEY, IS_CONFIGURED } from "./config";

const KEY = "shamrock-member-session";
const listeners = new Set();
let session = null;

try {
  session = JSON.parse(window.localStorage.getItem(KEY) || "null");
} catch (e) {
  session = null;
}

function setSession(s) {
  session = s;
  try {
    if (s) window.localStorage.setItem(KEY, JSON.stringify(s));
    else window.localStorage.removeItem(KEY);
  } catch (e) {}
  listeners.forEach((fn) => fn(session));
}

function normalize(data) {
  if (!data || !data.access_token) return null;
  return {
    access_token: data.access_token,
    refresh_token: data.refresh_token,
    expires_at: data.expires_at || Math.floor(Date.now() / 1000) + (data.expires_in || 3600),
    user: data.user,
  };
}

async function auth(path, body, token) {
  const res = await fetch(`${SUPABASE_URL}/auth/v1${path}`, {
    method: "POST",
    headers: {
      apikey: SUPABASE_ANON_KEY,
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(data.msg || data.error_description || data.message || "auth_error");
    err.code = data.error_code || data.code || res.status;
    throw err;
  }
  return data;
}

export async function signUp({ email, password, fullName, phone }) {
  const data = await auth("/signup", { email, password, data: { full_name: fullName, phone } });
  const s = normalize(data);
  if (s) setSession(s);
  return { session: s, needsConfirmation: !s };
}

export async function signIn(email, password) {
  const data = await auth("/token?grant_type=password", { email, password });
  setSession(normalize(data));
}

export async function resetPassword(email) {
  await auth("/recover", { email });
}

export function signOut() {
  setSession(null);
}

export async function getAccessToken() {
  if (!session) return null;
  if (session.expires_at - 60 > Date.now() / 1000) return session.access_token;
  try {
    const data = await auth("/token?grant_type=refresh_token", { refresh_token: session.refresh_token });
    setSession(normalize(data));
    return session.access_token;
  } catch (e) {
    setSession(null);
    return null;
  }
}

// Zapytanie do PostgREST (z regułami RLS zalogowanego użytkownika).
export async function rest(path, { method = "GET", body, prefer } = {}) {
  const token = await getAccessToken();
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    method,
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${token || SUPABASE_ANON_KEY}`,
      "Content-Type": "application/json",
      ...(prefer ? { Prefer: prefer } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  const data = text ? JSON.parse(text) : null;
  if (!res.ok) throw new Error((data && data.message) || "rest_error");
  return data;
}

// Wywołanie funkcji Netlify z tokenem użytkownika.
export async function callFn(name, payload) {
  const token = await getAccessToken();
  const res = await fetch(`/.netlify/functions/${name}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify(payload || {}),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || "server_error");
  return data;
}

export function useSession() {
  const [s, setS] = useState(session);
  useEffect(() => {
    listeners.add(setS);
    return () => listeners.delete(setS);
  }, []);
  return IS_CONFIGURED ? s : null;
}
