// AKTUALNOŚCI – dopisuj nowe wpisy na górze listy.
// "date" w formacie RRRR-MM-DD. Wpisy z "expires" znikną automatycznie po tej dacie.
// Pole "en" to wersja angielska (jeśli jej nie ma, wpis pokaże się tylko po polsku).
// "link": klucz strony (team, booking, contact, media, friends) albo pełny adres https://...
const news = [
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
    link: "team",
  },
  {
    date: "2026-11-02",
    pl: {
      title: "Rezerwacja online 24/7",
      text: "Wolne terminy sprawdzisz o każdej porze przez Booksy. Wolisz porozmawiać? Zadzwoń lub napisz na Messengerze.",
      linkLabel: "zarezerwuj",
    },
    en: {
      title: "Book online 24/7",
      text: "Check free slots on Booksy any time. Prefer to talk? Call us or send a message on Messenger.",
      linkLabel: "book now",
    },
    link: "https://shamrockbarbershop.booksy.com",
  },
];

export default news;
