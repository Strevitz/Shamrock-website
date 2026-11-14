// Konfiguracja Klubu Szamrokersów. Klucze publiczne (Supabase anon) ustawia się w Netlify
// jako zmienne środowiskowe REACT_APP_*. Bez nich strona działa w trybie „zapisy wkrótce”.
export const SUPABASE_URL = (process.env.REACT_APP_SUPABASE_URL || "").replace(/\/$/, "");
export const SUPABASE_ANON_KEY = process.env.REACT_APP_SUPABASE_ANON_KEY || "";
export const IS_CONFIGURED = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

export const PRICE_REGULAR = 29; // zł / miesiąc – cena standardowa
export const PRICE_PROMO = 19; // zł / miesiąc – promocja na start (ustaw null, aby ją wyłączyć)
export const DISCOUNT_PERCENT = 10;

export const SITE_ORIGIN = "https://shamrockbarber.com";
