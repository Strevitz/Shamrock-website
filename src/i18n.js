// Wersje językowe strony: polska (domyślna) i angielska pod /en.
import { useLocation } from "react-router-dom";

export const ROUTES = {
  home: { pl: "/", en: "/en" },
  team: { pl: "/ekipa", en: "/en/team" },
  booking: { pl: "/rezerwacje", en: "/en/booking" },
  media: { pl: "/media", en: "/en/media" },
  friends: { pl: "/przyjaciele", en: "/en/friends" },
  contact: { pl: "/kontakt", en: "/en/contact" },
  privacy: { pl: "/polityka-prywatności", en: "/en/privacy" },
};

// Adresy podstron usług. Wartość = slug w Contentful.
export const SERVICE_SLUGS = {
  "strzyżenie": { pl: "strzyżenie", en: "haircut" },
  broda: { pl: "broda", en: "beard-trim" },
  komplet: { pl: "komplet", en: "haircut-and-beard" },
  "strzyżenie-maszynką": { pl: "strzyżenie-maszynką", en: "clipper-cut" },
  "wąsy": { pl: "wąsy", en: "moustache" },
  "repigmentacja-brody": { pl: "repigmentacja-brody", en: "beard-repigmentation" },
  "apartment-neilson": { pl: "ojciec-i-syn", en: "father-and-son" },
  "apartment-bedford": { pl: "golenie-brzytwa", en: "razor-shave" },
  maska: { pl: "maska", en: "black-mask" },
};

// Tłumaczenia nazw i opisów usług z Contentful.
export const SERVICE_EN = {
  "strzyżenie": {
    name: "Haircut",
    description:
      "Classic and modern cuts for short, medium and long hair. Includes wash and conditioning, cut and styling.",
  },
  broda: {
    name: "Beard Trim",
    description:
      "Beard cut, trim and line-up. Finished with a hot towel, straight razor and nourishing oils.",
  },
  komplet: {
    name: "Haircut & Beard",
    description:
      "Classic or modern men's haircut for short, medium or long hair, plus beard cut, trim and line-up. Finished with a hot towel, straight razor and nourishing oils.",
  },
  "strzyżenie-maszynką": {
    name: "Clipper Cut",
    description: "Clipper cut to one length or with faded lengths (buzz cut).",
  },
  "wąsy": {
    name: "Moustache Grooming",
    description: "Moustache trim, line-up and styling with wax.",
  },
  "repigmentacja-brody": {
    name: "Beard Repigmentation",
    description:
      "Beard repigmentation with professional products. Finished with a hot towel, straight razor and nourishing oils.",
  },
  "apartment-neilson": {
    name: "Father & Son Haircut (ages 3–8)",
    description:
      "Classic and modern cuts for dad and son. Includes wash and conditioning, cut and styling.",
  },
  "apartment-bedford": {
    name: "Traditional Face or Head Shave",
    description:
      "Straight razor shave with a hot towel and nourishing oils, or a double razor shave of the face or head with hot and cold towels and skin care.",
  },
  maska: {
    name: "Black Cleansing Mask",
    description:
      "Black face mask that deep-cleans the skin. A relaxing, refreshing treatment that pairs perfectly with a shave.",
  },
};

export const serviceSlug = (contentfulSlug, lang) =>
  (SERVICE_SLUGS[contentfulSlug] && SERVICE_SLUGS[contentfulSlug][lang]) ||
  contentfulSlug;

export const contentfulSlugFrom = (urlSlug) => {
  const key = Object.keys(SERVICE_SLUGS).find(
    (k) => SERVICE_SLUGS[k].pl === urlSlug || SERVICE_SLUGS[k].en === urlSlug
  );
  return key || urlSlug;
};

export const servicePath = (contentfulSlug, lang) =>
  `${ROUTES.booking[lang]}/${serviceSlug(contentfulSlug, lang)}`;

export const localizeService = (room, lang) => {
  if (!room || lang !== "en" || !SERVICE_EN[room.slug]) return room;
  return { ...room, ...SERVICE_EN[room.slug] };
};

const decode = (p) => {
  try {
    return decodeURIComponent(p);
  } catch (e) {
    return p;
  }
};

export const langFromPath = (pathname) =>
  /^\/en(\/|$)/.test(pathname || "") ? "en" : "pl";

// Odpowiednik bieżącej strony w drugim języku.
export const switchPath = (pathname, toLang) => {
  const path = decode(pathname).replace(/\/+$/, "") || "/";
  const fromLang = langFromPath(path);
  for (const key of Object.keys(ROUTES)) {
    if (ROUTES[key][fromLang] === path) return ROUTES[key][toLang];
  }
  const prefix = ROUTES.booking[fromLang] + "/";
  if (path.startsWith(prefix)) {
    const slug = contentfulSlugFrom(path.slice(prefix.length));
    return servicePath(slug, toLang);
  }
  return ROUTES.home[toLang];
};

export const STRINGS = {
  pl: {
    nav: {
      home: "Strona Główna",
      team: "Ekipa",
      booking: "Rezerwacje",
      media: "Media",
      friends: "Przyjaciele",
      contact: "Kontakt",
    },
    langSwitch: "EN",
    langSwitchLabel: "English version",
    bookOnline: "rezerwuj online",
    book: "rezerwuj",
    bookNow: "rezerwuj teraz",
    call: "zadzwoń",
    details: "szczegóły",
    min: "min",
    bar: { call: "Zadzwoń", book: "Rezerwuj", write: "Napisz", aria: "Szybki kontakt" },
    home: {
      title: "Chcesz umówić wizytę?",
      subtitle: "Wybierz wolny termin online albo zadzwoń – znajdziemy dla Ciebie miejsce.",
      about: "O nas",
      services: "Usługi",
      news: "Aktualności",
      more: "więcej",
      features: [
        {
          title: "Pasja",
          info: "Praca to dla nas styl życia, który praktykujemy od lat i cały czas podnosimy umiejętności dla Ciebie. Specjalizujemy się w tradycyjnych cięciach jak i w modern barbering. Zapraszamy również na relaksujące golenie z gorącym ręcznikiem.",
        },
        {
          title: "Lokalizacja",
          info: "Shamrock Barber Shop zlokalizowany jest w samym sercu Warszawy przy ul. Widok 10, obok Rotundy i kilka minut od metra Centrum. Wszystkie drogi prowadzą do nas!",
        },
        {
          title: "Napoje",
          info: "Spragniony podczas wizyty w Shamrocku? Dla naszych gości podajemy pyszną kawę, whiskey i piwo bezalkoholowe dla zmotoryzowanych.",
        },
        {
          title: "Rezerwacja w minutę",
          info: "Wolne terminy sprawdzisz online przez Booksy o każdej porze. Wolisz porozmawiać? Zadzwoń lub napisz na WhatsAppie – chętnie doradzimy.",
        },
      ],
    },
    bookingPage: {
      title: "Rezerwacje",
      subtitle: "Zarezerwuj najbliższy termin",
      online: "Online 24/7",
      onlineText: "Wybierz usługę, barbera i godzinę w Booksy. Przypomnienie przyjdzie SMS-em.",
      onlineBtn: "rezerwuj w booksy",
      phone: "Telefonicznie",
      phoneText: "Zadzwoń, a znajdziemy dogodny dla Ciebie termin.",
      msg: "Wiadomość",
      msgText: "Masz pytanie? Napisz do nas na WhatsAppie.",
      msgBtn: "napisz do nas",
      priceList: "Cennik",
      faq: "Najczęstsze pytania",
    },
    service: {
      details: "szczegóły",
      info: "informacje",
      price: "cena",
      time: "czas",
      allPrices: "zobacz pełny cennik →",
      loading: "strona ładuje się dłużej niż zwykle, zrelaksuj się i zarezerwuj wizytę...",
    },
    team: {
      title: "Ekipa",
      subtitle: "Poznaj naszą ekipę",
      cta: "Wybierz swojego barbera w Booksy i zarezerwuj termin.",
      ctaBtn: "umów wizytę",
      join: "Dołącz do Nas!",
      joinText: "Jeśli jesteś pełnym zapału i pasji do zawodu Barberem, to właśnie Ciebie szukamy!",
      joinContact: "Nie czekaj i skontaktuj się z nami:",
      role: "Barber",
    },
    contact: {
      title: "Kontakt",
      subtitle: "Skontaktuj się z nami",
      card: "Kontakt",
      phone: "Telefon",
      email: "E-mail",
      whatsapp: "WhatsApp",
      write: "napisz do nas",
      hours: "Godziny otwarcia",
      address: "Adres i dojazd",
      opposite: "vis à vis hotelu PURO",
      directions: [
        "Kilka minut pieszo od stacji metra Centrum (M1) i Rotundy.",
        "Przystanki tramwajowe i autobusowe „Centrum” tuż obok.",
        "Parking: strefa płatnego parkowania w okolicznych ulicach.",
      ],
      navigate: "nawiguj do nas",
      mapTitle: "Mapa dojazdu do Shamrock Barber Shop",
    },
    media: {
      title: "Media",
      subtitle: "Poznaj nas od kuchni",
      insta: "Znajdź nas na Instagramie",
      fb: "Znajdź nas na Facebooku",
      alt: "Shamrock Barber Shop – zdjęcie z Instagrama",
    },
    friends: {
      title: "Przyjaciele",
      subtitle: "Ponieważ najlepiej wśród przyjaciół",
      heading: "Współpracujemy z najlepszymi",
      alt: "partner Shamrock Barber Shop",
    },
    notFound: {
      subtitle: "Podana strona nie istnieje, zrelaksuj się i zarezerwuj strzyżenie!",
      back: "powrót do strony głównej",
    },
    footer: {
      customer: "Obsługa Klienta",
      privacy: "Polityka Prywatności",
      phone: "tel.",
      cookies: "Ustawienia cookies",
      home: "Strona główna",
      rights:
        "Shamrock Barber Shop ® i produkty Shamrock Barber Shop ® są zarejestrowanymi znakami towarowymi firmy Sassy Company Arthur Oliver Strzewiczek",
      rightsEnd: ". Wszystkie prawa zastrzeżone.",
    },
    cookie: {
      text: "Używamy plików cookies, aby mierzyć skuteczność naszych reklam (Facebook Pixel). Szczegóły w",
      link: "polityce prywatności",
      deny: "Tylko niezbędne",
      accept: "Akceptuję",
      aria: "Zgoda na pliki cookies",
    },
    hours: [
      { day: "Poniedziałek", hours: "9:00 – 21:00" },
      { day: "Wtorek", hours: "9:00 – 21:00" },
      { day: "Środa", hours: "9:00 – 21:00" },
      { day: "Czwartek", hours: "9:00 – 21:00" },
      { day: "Piątek", hours: "9:00 – 21:00" },
      { day: "Sobota", hours: "9:00 – 18:00" },
      { day: "Niedziela", hours: "nieczynne" },
    ],
    hoursShort: [
      { day: "Pon – Pt", hours: "9:00 – 21:00" },
      { day: "Sobota", hours: "9:00 – 18:00" },
      { day: "Niedziela", hours: "nieczynne" },
    ],
    meta: {
      siteTitle: "Shamrock Barber Shop – barber Warszawa Centrum, ul. Widok 10",
      suffix: "Shamrock Barber Shop Warszawa",
      desc: "Shamrock Barber Shop – barbershop w centrum Warszawy, ul. Widok 10 obok Rotundy. Strzyżenie męskie, broda, golenie brzytwą z gorącym ręcznikiem. Rezerwacja online przez Booksy lub tel. 884 769 758.",
      booking: ["Rezerwacje i cennik", "Cennik Shamrock Barber Shop Warszawa: strzyżenie, broda, golenie brzytwą. Zarezerwuj wizytę online przez Booksy lub zadzwoń 884 769 758."],
      contact: ["Kontakt i dojazd", "Shamrock Barber Shop, ul. Widok 10, 00-023 Warszawa (obok Rotundy, naprzeciwko hotelu PURO). Godziny otwarcia, telefon 884 769 758, dojazd i mapa."],
      team: ["Ekipa", "Poznaj barberów Shamrock Barber Shop Warszawa i umów się online na wizytę."],
      media: ["Media", "Zdjęcia i nowości z Shamrock Barber Shop – zobacz nas na Instagramie i Facebooku."],
      friends: ["Przyjaciele", "Marki i partnerzy, z którymi współpracuje Shamrock Barber Shop Warszawa."],
      privacy: ["Polityka prywatności", "Polityka prywatności i plików cookies serwisu shamrockbarber.com."],
      notFound: ["Nie znaleziono strony", "Ta strona nie istnieje. Wróć na stronę główną Shamrock Barber Shop."],
      service: (name, price, size) => [
        `${name} – ${price} zł`,
        `${name} w Shamrock Barber Shop Warszawa (ul. Widok 10). Cena ${price} zł, czas ok. ${size} min. Zarezerwuj online przez Booksy.`,
      ],
    },
    dateLocale: "pl-PL",
  },
  en: {
    nav: {
      home: "Home",
      team: "Team",
      booking: "Booking",
      media: "Media",
      friends: "Friends",
      contact: "Contact",
    },
    langSwitch: "PL",
    langSwitchLabel: "Wersja polska",
    bookOnline: "book online",
    book: "book",
    bookNow: "book now",
    call: "call",
    details: "details",
    min: "min",
    bar: { call: "Call", book: "Book", write: "Message", aria: "Quick contact" },
    home: {
      title: "Need a fresh cut?",
      subtitle: "Pick a free slot online or give us a call – we'll find a time that works for you.",
      about: "About us",
      services: "Services",
      news: "News",
      more: "more",
      features: [
        {
          title: "Passion",
          info: "Barbering is our way of life. We've been doing it for years and keep sharpening our skills for you. We specialise in traditional cuts as well as modern barbering, and we'd love to treat you to a relaxing hot-towel shave.",
        },
        {
          title: "Location",
          info: "Shamrock Barber Shop is right in the heart of Warsaw at Widok 10, next to the Rotunda and a few minutes from Centrum metro station. All roads lead to us!",
        },
        {
          title: "Drinks",
          info: "Thirsty during your visit? We serve great coffee, whiskey, and alcohol-free beer for drivers.",
        },
        {
          title: "Book in a minute",
          info: "Check available slots online on Booksy any time. Prefer to talk? Call us or send a message on WhatsApp – we speak English.",
        },
      ],
    },
    bookingPage: {
      title: "Booking",
      subtitle: "Book your next appointment",
      online: "Online 24/7",
      onlineText: "Choose your service, barber and time on Booksy. You'll get a text reminder.",
      onlineBtn: "book on booksy",
      phone: "By phone",
      phoneText: "Give us a call and we'll find a time that suits you.",
      msg: "Message",
      msgText: "Got a question? Message us on WhatsApp.",
      msgBtn: "message us",
      priceList: "Price list",
      faq: "FAQ",
    },
    service: {
      details: "details",
      info: "info",
      price: "price",
      time: "time",
      allPrices: "see full price list →",
      loading: "the page is taking longer than usual to load – relax and book your visit...",
    },
    team: {
      title: "Team",
      subtitle: "Meet our team",
      cta: "Pick your barber on Booksy and book your slot.",
      ctaBtn: "book a visit",
      join: "Join us!",
      joinText: "If you're a barber full of energy and passion for the craft, we're looking for you!",
      joinContact: "Get in touch:",
      role: "Barber",
    },
    contact: {
      title: "Contact",
      subtitle: "Get in touch",
      card: "Contact",
      phone: "Phone",
      email: "Email",
      whatsapp: "WhatsApp",
      write: "message us",
      hours: "Opening hours",
      address: "Address & directions",
      opposite: "opposite PURO Hotel",
      directions: [
        "A few minutes' walk from Centrum metro station (M1) and the Rotunda.",
        "Tram and bus stops “Centrum” right nearby.",
        "Parking: paid street parking zone in the surrounding streets.",
      ],
      navigate: "get directions",
      mapTitle: "Map – how to find Shamrock Barber Shop",
    },
    media: {
      title: "Media",
      subtitle: "Behind the scenes",
      insta: "Find us on Instagram",
      fb: "Find us on Facebook",
      alt: "Shamrock Barber Shop – Instagram photo",
    },
    friends: {
      title: "Friends",
      subtitle: "Because it's best among friends",
      heading: "We work with the best",
      alt: "Shamrock Barber Shop partner",
    },
    notFound: {
      subtitle: "This page doesn't exist – relax and book a haircut!",
      back: "back to home page",
    },
    footer: {
      customer: "Customer service",
      privacy: "Privacy policy",
      phone: "phone",
      cookies: "Cookie settings",
      home: "Home",
      rights:
        "Shamrock Barber Shop ® and Shamrock Barber Shop ® products are registered trademarks of Sassy Company Arthur Oliver Strzewiczek",
      rightsEnd: ". All rights reserved.",
    },
    cookie: {
      text: "We use cookies to measure how well our ads work (Facebook Pixel). Details in our",
      link: "privacy policy",
      deny: "Essential only",
      accept: "Accept",
      aria: "Cookie consent",
    },
    hours: [
      { day: "Monday", hours: "9:00 – 21:00" },
      { day: "Tuesday", hours: "9:00 – 21:00" },
      { day: "Wednesday", hours: "9:00 – 21:00" },
      { day: "Thursday", hours: "9:00 – 21:00" },
      { day: "Friday", hours: "9:00 – 21:00" },
      { day: "Saturday", hours: "9:00 – 18:00" },
      { day: "Sunday", hours: "closed" },
    ],
    hoursShort: [
      { day: "Mon – Fri", hours: "9:00 – 21:00" },
      { day: "Saturday", hours: "9:00 – 18:00" },
      { day: "Sunday", hours: "closed" },
    ],
    meta: {
      siteTitle: "Shamrock Barber Shop – Barber in Warsaw City Centre, Widok 10",
      suffix: "Shamrock Barber Shop Warsaw",
      desc: "Shamrock Barber Shop – barbershop in the centre of Warsaw at Widok 10, next to the Rotunda. Men's haircuts, beard grooming and hot-towel razor shaves. Book online on Booksy or call +48 884 769 758.",
      booking: ["Booking & prices", "Shamrock Barber Shop Warsaw prices: haircuts, beard trims, razor shaves. Book online on Booksy or call +48 884 769 758."],
      contact: ["Contact & directions", "Shamrock Barber Shop, Widok 10, 00-023 Warsaw (next to the Rotunda, opposite PURO Hotel). Opening hours, phone +48 884 769 758, directions and map."],
      team: ["Team", "Meet the barbers at Shamrock Barber Shop Warsaw and book your visit online."],
      media: ["Media", "Photos and news from Shamrock Barber Shop – follow us on Instagram and Facebook."],
      friends: ["Friends", "Brands and partners working with Shamrock Barber Shop Warsaw."],
      privacy: ["Privacy policy", "Privacy and cookie policy of shamrockbarber.com."],
      notFound: ["Page not found", "This page doesn't exist. Go back to the Shamrock Barber Shop home page."],
      service: (name, price, size) => [
        `${name} – ${price} PLN`,
        `${name} at Shamrock Barber Shop Warsaw (Widok 10). Price ${price} PLN, about ${size} min. Book online on Booksy.`,
      ],
    },
    dateLocale: "en-GB",
  },
};

export function useLang() {
  const location = useLocation();
  const lang = langFromPath(location.pathname);
  return { lang, t: STRINGS[lang], to: (key) => ROUTES[key][lang], location };
}
