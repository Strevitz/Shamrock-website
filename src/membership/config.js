// Konfiguracja Klubu Szamrokersów. Klucze publiczne (Supabase anon) ustawia się w Netlify
// jako zmienne środowiskowe REACT_APP_*. Bez nich strona działa w trybie „zapisy wkrótce”.
import agreement from "./agreement.json";

export const SUPABASE_URL = (process.env.REACT_APP_SUPABASE_URL || "").replace(/\/$/, "");
export const SUPABASE_ANON_KEY = process.env.REACT_APP_SUPABASE_ANON_KEY || "";
export const IS_CONFIGURED = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

export const PRICE_REGULAR = 29; // zł / miesiąc – cena standardowa
export const PRICE_PROMO = agreement.pricePln; // Cena startowa zgodna z regulaminem i Stripe.
export const DISCOUNT_PERCENT = 10;

export const SITE_ORIGIN = "https://shamrockbarber.com";
