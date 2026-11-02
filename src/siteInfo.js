// Wspólne dane kontaktowe – zmieniaj tutaj, a zaktualizują się na całej stronie.
export const PHONE_DISPLAY = "884 769 758";
export const PHONE_HREF = "tel:+48884769758";
export const EMAIL = "info@shamrockbarber.com";
export const BOOKSY_URL = "https://shamrockbarbershop.booksy.com";
export const MESSENGER_URL = "https://m.me/ShamrockWarszawa";
export const INSTAGRAM_URL = "https://www.instagram.com/shamrock_barbershop";
export const FACEBOOK_URL = "https://www.facebook.com/ShamrockWarszawa";

export const ADDRESS_LINE = "ul. Widok 10, 00-023 Warszawa";
export const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=Shamrock+Barber+Shop+Widok+10+Warszawa";
export const MAPS_DIRECTIONS_URL =
  "https://www.google.com/maps/dir/?api=1&destination=Shamrock+Barber+Shop+Widok+10+00-023+Warszawa";
export const MAPS_EMBED_URL =
  "https://maps.google.com/maps?q=Shamrock%20Barber%20Shop%2C%20Widok%2010%2C%20Warszawa&t=&z=16&ie=UTF8&iwloc=&output=embed";

export const OPENING_HOURS = [
  { day: "Poniedziałek", hours: "9:00 – 21:00" },
  { day: "Wtorek", hours: "9:00 – 21:00" },
  { day: "Środa", hours: "9:00 – 21:00" },
  { day: "Czwartek", hours: "9:00 – 21:00" },
  { day: "Piątek", hours: "9:00 – 21:00" },
  { day: "Sobota", hours: "9:00 – 18:00" },
  { day: "Niedziela", hours: "nieczynne" },
];
export const OPENING_HOURS_SHORT = [
  { day: "Pon – Pt", hours: "9:00 – 21:00" },
  { day: "Sobota", hours: "9:00 – 18:00" },
  { day: "Niedziela", hours: "nieczynne" },
];

// Ładniejsze adresy podstron usług. Klucz = nowy adres, wartość = slug w Contentful.
// Stare adresy nadal działają.
export const SLUG_ALIASES = {
  "ojciec-i-syn": "apartment-neilson",
  "golenie-brzytwa": "apartment-bedford",
};
export const prettySlug = (slug) => {
  const found = Object.keys(SLUG_ALIASES).find((k) => SLUG_ALIASES[k] === slug);
  return found || slug;
};
export const realSlug = (slug) => SLUG_ALIASES[slug] || slug;
