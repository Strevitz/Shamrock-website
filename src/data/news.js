// AKTUALNOŚCI – dopisuj nowe wpisy na górze listy.
// "date" w formacie RRRR-MM-DD. Wpisy z "expires" znikną automatycznie po tej dacie.
// Pola "en" i "uk" to wersje angielska i ukraińska (jeśli ich nie ma, wpis nie pokaże się w danym języku).
// "link": klucz strony (team, booking, contact, media, friends) albo pełny adres https://...
const news = [
  {
    date: "2026-11-04",
    pl: {
      title: "Strona po ukraińsku",
      text: "Shamrockbarber.com jest teraz dostępna także po ukraińsku – poleć nas znajomym z Ukrainy.",
      linkLabel: "wersja ukraińska",
    },
    en: {
      title: "Now in Ukrainian too",
      text: "Our website is now also available in Ukrainian – tell your Ukrainian friends about us.",
      linkLabel: "ukrainian version",
    },
    uk: {
      title: "Сайт українською",
      text: "Тепер наш сайт доступний українською мовою. Записуйся онлайн у Booksy або пиши нам у WhatsApp.",
      linkLabel: "записатися онлайн",
    },
    link: { pl: "/ua", en: "/ua", uk: "https://shamrockbarbershop.booksy.com" },
  },
  {
    date: "2026-11-03",
    pl: {
      title: "Strona po angielsku",
      text: "Shamrockbarber.com jest teraz dostępna także po angielsku – poleć nas znajomym z zagranicy.",
      linkLabel: "english version",
    },
    en: {
      title: "Now in English",
      text: "Our website is now available in English. Walk-ins welcome when there's a free chair – best to book ahead.",
      linkLabel: "book online",
    },
    link: { pl: "/en", en: "https://shamrockbarbershop.booksy.com" },
  },
  {
    date: "2026-11-02",
    pl: {
      title: "Nowy barber Tom Horn",
      text: "Do Shamrocka dołączył Tom Horn. Poznaj całą ekipę i umów się na wizytę online.",
      linkLabel: "poznaj ekipę",
    },
    en: {
      title: "New barber Tom Horn",
      text: "Tom Horn has joined Shamrock. Meet the whole team and book your visit online.",
      linkLabel: "meet the team",
    },
    uk: {
      title: "Новий барбер Tom Horn",
      text: "До команди Shamrock приєднався Tom Horn. Познайомся з усією командою та запишися на візит онлайн.",
      linkLabel: "наша команда",
    },
    link: "team",
  },
  {
    date: "2026-11-02",
    pl: {
      title: "Rezerwacja online 24/7",
      text: "Wolne terminy sprawdzisz o każdej porze przez Booksy. Wolisz porozmawiać? Zadzwoń lub napisz na WhatsAppie.",
      linkLabel: "zarezerwuj",
    },
    en: {
      title: "Book online 24/7",
      text: "Check free slots on Booksy any time. Prefer to talk? Call us or send a message on WhatsApp.",
      linkLabel: "book now",
    },
    uk: {
      title: "Онлайн-запис 24/7",
      text: "Вільні години можна перевірити в Booksy будь-коли. Хочеш поговорити? Зателефонуй або напиши у WhatsApp.",
      linkLabel: "записатися",
    },
    link: "https://shamrockbarbershop.booksy.com",
  },
];

export default news;
