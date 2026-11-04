// Wersje językowe strony: polska (domyślna), angielska pod /en i ukraińska pod /ua.
// Kod języka ukraińskiego to "uk" (ISO 639-1), a adresy zaczynają się od /ua.
import { useLocation } from "react-router-dom";

export const LANGS = ["pl", "en", "uk"];

export const ROUTES = {
  home: { pl: "/", en: "/en", uk: "/ua" },
  team: { pl: "/ekipa", en: "/en/team", uk: "/ua/team" },
  booking: { pl: "/rezerwacje", en: "/en/booking", uk: "/ua/booking" },
  media: { pl: "/media", en: "/en/media", uk: "/ua/media" },
  friends: { pl: "/przyjaciele", en: "/en/friends", uk: "/ua/friends" },
  contact: { pl: "/kontakt", en: "/en/contact", uk: "/ua/contact" },
  privacy: { pl: "/polityka-prywatności", en: "/en/privacy", uk: "/ua/privacy" },
};

// Adresy podstron usług. Wartość = slug w Contentful.
export const SERVICE_SLUGS = {
  "strzyżenie": { pl: "strzyżenie", en: "haircut", uk: "haircut" },
  broda: { pl: "broda", en: "beard-trim", uk: "beard-trim" },
  komplet: { pl: "komplet", en: "haircut-and-beard", uk: "haircut-and-beard" },
  "strzyżenie-maszynką": { pl: "strzyżenie-maszynką", en: "clipper-cut", uk: "clipper-cut" },
  "wąsy": { pl: "wąsy", en: "moustache", uk: "moustache" },
  "repigmentacja-brody": { pl: "repigmentacja-brody", en: "beard-repigmentation", uk: "beard-repigmentation" },
  "apartment-neilson": { pl: "ojciec-i-syn", en: "father-and-son", uk: "father-and-son" },
  "apartment-bedford": { pl: "golenie-brzytwa", en: "razor-shave", uk: "razor-shave" },
  maska: { pl: "maska", en: "black-mask", uk: "black-mask" },
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

// Tłumaczenia ukraińskie nazw i opisów usług z Contentful.
export const SERVICE_UK = {
  "strzyżenie": {
    name: "Стрижка",
    description:
      "Класичні та сучасні стрижки для короткого, середнього й довгого волосся. Миття голови з кондиціонером, стрижка та укладка.",
  },
  broda: {
    name: "Стрижка бороди",
    description:
      "Стрижка, підрівнювання та оформлення контуру бороди. Завершуємо гарячим рушником, небезпечною бритвою та живильними оліями.",
  },
  komplet: {
    name: "Стрижка + борода",
    description:
      "Класична або сучасна чоловіча стрижка для короткого, середнього чи довгого волосся, а також стрижка, підрівнювання й контур бороди. Завершуємо гарячим рушником, небезпечною бритвою та живильними оліями.",
  },
  "strzyżenie-maszynką": {
    name: "Стрижка машинкою",
    description: "Стрижка машинкою під одну довжину або з плавним переходом (buzz cut).",
  },
  "wąsy": {
    name: "Догляд за вусами",
    description: "Підрівнювання, оформлення контуру та укладка вусів воском.",
  },
  "repigmentacja-brody": {
    name: "Камуфляж бороди",
    description:
      "Тонування (репігментація) бороди професійними засобами. Завершуємо гарячим рушником, небезпечною бритвою та живильними оліями.",
  },
  "apartment-neilson": {
    name: "Стрижка «Тато і син» (3–8 років)",
    description:
      "Класичні та сучасні стрижки для тата й сина. Миття голови з кондиціонером, стрижка та укладка.",
  },
  "apartment-bedford": {
    name: "Традиційне гоління обличчя або голови",
    description:
      "Гоління небезпечною бритвою з гарячим рушником і живильними оліями або подвійне гоління обличчя чи голови з гарячим і холодним рушником та доглядом за шкірою.",
  },
  maska: {
    name: "Чорна очищувальна маска",
    description:
      "Чорна маска для обличчя, що глибоко очищує шкіру. Розслаблююча й освіжаюча процедура, яка чудово доповнює гоління.",
  },
};

const SERVICE_TEXT = { en: SERVICE_EN, uk: SERVICE_UK };

export const serviceSlug = (contentfulSlug, lang) =>
  (SERVICE_SLUGS[contentfulSlug] && SERVICE_SLUGS[contentfulSlug][lang]) ||
  contentfulSlug;

export const contentfulSlugFrom = (urlSlug) => {
  const key = Object.keys(SERVICE_SLUGS).find(
    (k) => LANGS.some((l) => SERVICE_SLUGS[k][l] === urlSlug)
  );
  return key || urlSlug;
};

export const servicePath = (contentfulSlug, lang) =>
  `${ROUTES.booking[lang]}/${serviceSlug(contentfulSlug, lang)}`;

export const localizeService = (room, lang) => {
  const texts = SERVICE_TEXT[lang];
  if (!room || !texts || !texts[room.slug]) return room;
  return { ...room, ...texts[room.slug] };
};

const decode = (p) => {
  try {
    return decodeURIComponent(p);
  } catch (e) {
    return p;
  }
};

export const langFromPath = (pathname) => {
  const p = pathname || "";
  if (/^\/en(\/|$)/.test(p)) return "en";
  if (/^\/ua(\/|$)/.test(p)) return "uk";
  return "pl";
};

// Odpowiednik bieżącej strony w innym języku.
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
      title: "Barber w centrum Warszawy",
      subtitle: "Chcesz umówić wizytę? Wybierz wolny termin online albo zadzwoń – znajdziemy dla Ciebie miejsce.",
      local: {
        title: "Barber Warszawa Centrum – Widok 10",
        text: [
          "Shamrock Barber Shop to męski barbershop w Śródmieściu, przy ul. Widok 10 – obok Rotundy, kilka minut pieszo od metra Centrum i Dworca Centralnego. Strzyżemy klasycznie i nowocześnie: od krótkich fade’ów i strzyżenia maszynką, po dłuższe fryzury modelowane nożyczkami.",
          "Zajmujemy się też brodą – trymowanie, wyrównanie konturów i tradycyjne golenie brzytwą z gorącym ręcznikiem. Zapraszamy ojców z synami, a wizytę zarezerwujesz online w Booksy, telefonicznie lub na WhatsAppie. Pon–pt 9:00–21:00, sob 9:00–18:00.",
        ],
        services: "Popularne usługi:",
      },
      localNames: {"strzyżenie": "strzyżenie męskie", "komplet": "strzyżenie + broda", "broda": "trymowanie brody", "strzyżenie-maszynką": "strzyżenie maszynką", "apartment-bedford": "golenie brzytwą", "apartment-neilson": "ojciec i syn"},
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
      siteTitle: "Barber Warszawa Centrum – Shamrock Barber Shop, ul. Widok 10",
      suffix: "Shamrock Barber Shop Warszawa",
      desc: "Shamrock Barber Shop – barbershop w centrum Warszawy, ul. Widok 10 obok Rotundy. Strzyżenie męskie, broda, golenie brzytwą z gorącym ręcznikiem. Rezerwacja online przez Booksy lub tel. 884 769 758.",
      booking: ["Cennik i rezerwacja – barber Warszawa Centrum", "Cennik Shamrock Barber Shop Warszawa: strzyżenie, broda, golenie brzytwą. Zarezerwuj wizytę online przez Booksy lub zadzwoń 884 769 758."],
      contact: ["Kontakt i dojazd – ul. Widok 10, Śródmieście", "Shamrock Barber Shop, ul. Widok 10, 00-023 Warszawa (obok Rotundy, naprzeciwko hotelu PURO). Godziny otwarcia, telefon 884 769 758, dojazd i mapa."],
      team: ["Barberzy – nasza ekipa", "Poznaj barberów Shamrock Barber Shop w centrum Warszawy (ul. Widok 10). Wybierz swojego barbera i umów się online w Booksy."],
      media: ["Media", "Zdjęcia i nowości z Shamrock Barber Shop – zobacz nas na Instagramie i Facebooku."],
      friends: ["Przyjaciele", "Marki i partnerzy, z którymi współpracuje Shamrock Barber Shop Warszawa."],
      privacy: ["Polityka prywatności", "Polityka prywatności i plików cookies serwisu shamrockbarber.com."],
      notFound: ["Nie znaleziono strony", "Ta strona nie istnieje. Wróć na stronę główną Shamrock Barber Shop."],
      service: (name, price, size) => [
        `${name} Warszawa – ${price} zł`,
        `${name} w Shamrock Barber Shop Warszawa (ul. Widok 10). Cena ${price} zł, czas ok. ${size} min. Zarezerwuj online przez Booksy.`,
      ],
    },
    dateLocale: "pl-PL",
    ogLocale: "pl_PL",
    mapsHl: "pl",
    currency: "zł",
    phonePrefix: "",
    street: "ul. Widok 10",
    city: "00-023 Warszawa",
    addressLine: "ul. Widok 10, 00-023 Warszawa",
    privacyTitle: "Polityka Prywatności",
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
      title: "Barber in Central Warsaw",
      subtitle: "Need a fresh cut? Pick a free slot online or give us a call – we'll find a time that works for you.",
      local: {
        title: "Barber in Warsaw City Centre – Widok 10",
        text: [
          "Shamrock Barber Shop is a men's barbershop in Śródmieście, Warsaw, at Widok 10 – next to the Rotunda, a few minutes' walk from Centrum metro station and Warszawa Centralna. We do classic and modern cuts: from skin fades and clipper cuts to longer scissor-cut styles.",
          "We also take care of beards – trims, line-ups and traditional hot-towel straight razor shaves. Dads with sons are welcome too. Book online on Booksy, by phone or on WhatsApp – we speak English. Mon–Fri 9:00–21:00, Sat 9:00–18:00.",
        ],
        services: "Popular services:",
      },
      localNames: {"strzyżenie": "men's haircut", "komplet": "haircut & beard", "broda": "beard trim", "strzyżenie-maszynką": "clipper cut", "apartment-bedford": "razor shave", "apartment-neilson": "father & son"},
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
      siteTitle: "Barber Warsaw City Centre – Shamrock Barber Shop, Widok 10",
      suffix: "Shamrock Barber Shop Warsaw",
      desc: "Shamrock Barber Shop – barbershop in the centre of Warsaw at Widok 10, next to the Rotunda. Men's haircuts, beard grooming and hot-towel razor shaves. Book online on Booksy or call +48 884 769 758.",
      booking: ["Prices & booking – barber in central Warsaw", "Shamrock Barber Shop Warsaw prices: haircuts, beard trims, razor shaves. Book online on Booksy or call +48 884 769 758."],
      contact: ["Contact & directions – Widok 10, Warsaw centre", "Shamrock Barber Shop, Widok 10, 00-023 Warsaw (next to the Rotunda, opposite PURO Hotel). Opening hours, phone +48 884 769 758, directions and map."],
      team: ["Our barbers", "Meet the barbers at Shamrock Barber Shop in central Warsaw (Widok 10). Choose your barber and book online on Booksy."],
      media: ["Media", "Photos and news from Shamrock Barber Shop – follow us on Instagram and Facebook."],
      friends: ["Friends", "Brands and partners working with Shamrock Barber Shop Warsaw."],
      privacy: ["Privacy policy", "Privacy and cookie policy of shamrockbarber.com."],
      notFound: ["Page not found", "This page doesn't exist. Go back to the Shamrock Barber Shop home page."],
      service: (name, price, size) => [
        `${name} in Warsaw – ${price} PLN`,
        `${name} at Shamrock Barber Shop Warsaw (Widok 10). Price ${price} PLN, about ${size} min. Book online on Booksy.`,
      ],
    },
    dateLocale: "en-GB",
    ogLocale: "en_GB",
    mapsHl: "en",
    currency: "PLN",
    phonePrefix: "+48 ",
    street: "Widok 10",
    city: "00-023 Warsaw, Poland",
    addressLine: "Widok 10, 00-023 Warsaw, Poland",
    privacyTitle: "Privacy Policy",
  },
  uk: {
    nav: {
      home: "Головна",
      team: "Команда",
      booking: "Запис",
      media: "Медіа",
      friends: "Друзі",
      contact: "Контакти",
    },
    langSwitch: "UA",
    langSwitchLabel: "Українська версія",
    bookOnline: "записатися онлайн",
    book: "записатися",
    bookNow: "записатися зараз",
    call: "дзвінок",
    details: "детальніше",
    min: "хв",
    bar: { call: "Дзвінок", book: "Запис", write: "Написати", aria: "Швидкий зв'язок" },
    home: {
      title: "Барбершоп у центрі Варшави",
      subtitle: "Хочеш записатися? Обери вільний час онлайн або зателефонуй – ми знайдемо для тебе місце.",
      local: {
        title: "Барбер Варшава центр – Widok 10",
        text: [
          "Shamrock Barber Shop – чоловічий барбершоп у районі Śródmieście, вул. Widok 10 – біля Ротонди, кілька хвилин пішки від станції метро Centrum і вокзалу Warszawa Centralna. Робимо класичні й сучасні стрижки: від фейдів і стрижки машинкою до довших стрижок ножицями.",
          "Також доглядаємо за бородою – тримінг, оформлення контурів і традиційне гоління небезпечною бритвою з гарячим рушником. Запрошуємо тат із синами. Запис онлайн у Booksy, телефоном або у WhatsApp. Пн–пт 9:00–21:00, сб 9:00–18:00.",
        ],
        services: "Популярні послуги:",
      },
      localNames: {"strzyżenie": "чоловіча стрижка", "komplet": "стрижка + борода", "broda": "тримінг бороди", "strzyżenie-maszynką": "стрижка машинкою", "apartment-bedford": "гоління бритвою", "apartment-neilson": "тато і син"},
      about: "Про нас",
      services: "Послуги",
      news: "Новини",
      more: "більше",
      features: [
        {
          title: "Пристрасть",
          info: "Барберинг для нас – це стиль життя. Ми займаємося ним багато років і постійно вдосконалюємо майстерність для тебе. Спеціалізуємося як на класичних стрижках, так і на сучасному барберингу. Запрошуємо також на розслаблююче гоління з гарячим рушником.",
        },
        {
          title: "Розташування",
          info: "Shamrock Barber Shop знаходиться в самому серці Варшави, на вул. Widok 10, біля Ротонди та за кілька хвилин від станції метро Centrum. Усі дороги ведуть до нас!",
        },
        {
          title: "Напої",
          info: "Захотілося пити під час візиту? Пригощаємо смачною кавою, віскі, а для водіїв – безалкогольним пивом.",
        },
        {
          title: "Запис за хвилину",
          info: "Вільні години можна перевірити онлайн у Booksy будь-коли. Хочеш поговорити? Зателефонуй або напиши у WhatsApp – ми з радістю порадимо.",
        },
      ],
    },
    bookingPage: {
      title: "Запис",
      subtitle: "Запишися на найближчий час",
      online: "Онлайн 24/7",
      onlineText: "Обери послугу, барбера та час у Booksy. Нагадування прийде SMS-повідомленням.",
      onlineBtn: "записатися в booksy",
      phone: "Телефоном",
      phoneText: "Зателефонуй, і ми знайдемо зручний для тебе час.",
      msg: "Повідомлення",
      msgText: "Маєш питання? Напиши нам у WhatsApp.",
      msgBtn: "написати нам",
      priceList: "Ціни",
      faq: "Часті питання",
    },
    service: {
      details: "детальніше",
      info: "інформація",
      price: "ціна",
      time: "тривалість",
      allPrices: "переглянути всі ціни →",
      loading: "сторінка завантажується довше, ніж зазвичай – розслабся і запишися на візит...",
    },
    team: {
      title: "Команда",
      subtitle: "Познайомся з нашою командою",
      cta: "Обери свого барбера в Booksy та запишися на зручний час.",
      ctaBtn: "записатися",
      join: "Приєднуйся до нас!",
      joinText: "Якщо ти барбер, сповнений енергії та пристрасті до своєї справи, – ми шукаємо саме тебе!",
      joinContact: "Не зволікай і зв'яжися з нами:",
      role: "Барбер",
    },
    contact: {
      title: "Контакти",
      subtitle: "Зв'яжися з нами",
      card: "Контакти",
      phone: "Телефон",
      email: "E-mail",
      whatsapp: "WhatsApp",
      write: "написати нам",
      hours: "Години роботи",
      address: "Адреса та як дістатися",
      opposite: "навпроти готелю PURO",
      directions: [
        "Кілька хвилин пішки від станції метро Centrum (M1) та Ротонди.",
        "Трамвайні й автобусні зупинки «Centrum» зовсім поруч.",
        "Паркування: платна зона паркування на сусідніх вулицях.",
      ],
      navigate: "прокласти маршрут",
      mapTitle: "Карта – як дістатися до Shamrock Barber Shop",
    },
    media: {
      title: "Медіа",
      subtitle: "Зазирни за лаштунки",
      insta: "Ми в Instagram",
      fb: "Ми у Facebook",
      alt: "Shamrock Barber Shop – фото з Instagram",
    },
    friends: {
      title: "Друзі",
      subtitle: "Бо найкраще – серед друзів",
      heading: "Ми співпрацюємо з найкращими",
      alt: "партнер Shamrock Barber Shop",
    },
    notFound: {
      subtitle: "Такої сторінки не існує – розслабся і запишися на стрижку!",
      back: "повернутися на головну",
    },
    footer: {
      customer: "Обслуговування клієнтів",
      privacy: "Політика конфіденційності",
      phone: "тел.",
      cookies: "Налаштування cookies",
      home: "Головна",
      rights:
        "Shamrock Barber Shop ® і продукти Shamrock Barber Shop ® є зареєстрованими торговельними марками компанії Sassy Company Arthur Oliver Strzewiczek",
      rightsEnd: ". Усі права захищено.",
    },
    cookie: {
      text: "Ми використовуємо файли cookies, щоб вимірювати ефективність нашої реклами (Facebook Pixel). Детальніше – у",
      link: "політиці конфіденційності",
      deny: "Лише необхідні",
      accept: "Погоджуюсь",
      aria: "Згода на файли cookies",
    },
    hours: [
      { day: "Понеділок", hours: "9:00 – 21:00" },
      { day: "Вівторок", hours: "9:00 – 21:00" },
      { day: "Середа", hours: "9:00 – 21:00" },
      { day: "Четвер", hours: "9:00 – 21:00" },
      { day: "П'ятниця", hours: "9:00 – 21:00" },
      { day: "Субота", hours: "9:00 – 18:00" },
      { day: "Неділя", hours: "вихідний" },
    ],
    hoursShort: [
      { day: "Пн – Пт", hours: "9:00 – 21:00" },
      { day: "Субота", hours: "9:00 – 18:00" },
      { day: "Неділя", hours: "вихідний" },
    ],
    meta: {
      siteTitle: "Барбершоп Варшава центр – Shamrock Barber Shop, вул. Widok 10",
      suffix: "Shamrock Barber Shop Варшава",
      desc: "Shamrock Barber Shop – барбершоп у центрі Варшави, вул. Widok 10, біля Ротонди. Чоловічі стрижки, догляд за бородою, гоління небезпечною бритвою з гарячим рушником. Запис онлайн у Booksy або за тел. +48 884 769 758.",
      booking: ["Ціни та запис – барбер у центрі Варшави", "Ціни Shamrock Barber Shop Варшава: стрижки, борода, гоління бритвою. Запишися онлайн у Booksy або зателефонуй +48 884 769 758."],
      contact: ["Контакти та як дістатися", "Shamrock Barber Shop, вул. Widok 10, 00-023 Варшава (біля Ротонди, навпроти готелю PURO). Години роботи, телефон +48 884 769 758, маршрут і карта."],
      team: ["Наші барбери", "Познайомся з барберами Shamrock Barber Shop у центрі Варшави (вул. Widok 10). Обери свого барбера та запишися онлайн у Booksy."],
      media: ["Медіа", "Фото та новини Shamrock Barber Shop – стеж за нами в Instagram і Facebook."],
      friends: ["Друзі", "Бренди та партнери, з якими співпрацює Shamrock Barber Shop Варшава."],
      privacy: ["Політика конфіденційності", "Політика конфіденційності та файлів cookies сайту shamrockbarber.com."],
      notFound: ["Сторінку не знайдено", "Такої сторінки не існує. Повернися на головну сторінку Shamrock Barber Shop."],
      service: (name, price, size) => [
        `${name} Варшава – ${price} zł`,
        `${name} у Shamrock Barber Shop Варшава (вул. Widok 10). Ціна ${price} zł, тривалість близько ${size} хв. Запис онлайн у Booksy.`,
      ],
    },
    dateLocale: "uk-UA",
    ogLocale: "uk_UA",
    mapsHl: "uk",
    currency: "zł",
    phonePrefix: "+48 ",
    street: "вул. Widok 10",
    city: "00-023 Варшава, Польща",
    addressLine: "вул. Widok 10, 00-023 Варшава, Польща",
    privacyTitle: "Політика конфіденційності",
  },
};

// Etykiety przełącznika języka (kolejność jak na stronie).
export const LANG_LABELS = {
  pl: { short: "PL", name: "Polski" },
  en: { short: "EN", name: "English" },
  uk: { short: "UA", name: "Українська" },
};

export function useLang() {
  const location = useLocation();
  const lang = langFromPath(location.pathname);
  return { lang, t: STRINGS[lang], to: (key) => ROUTES[key][lang], location };
}
