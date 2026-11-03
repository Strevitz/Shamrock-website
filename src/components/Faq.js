import React from "react";
import { Link } from "react-router-dom";
import Title from "./Title";
import { PHONE_DISPLAY, PHONE_HREF, BOOKSY_URL, MESSENGER_URL } from "../siteInfo";
import { useLang, servicePath } from "../i18n";

const ext = { target: "_blank", rel: "noopener noreferrer" };

function itemsPl(to) {
  return [
    {
      q: "Jak umówić wizytę?",
      a: (<>Najszybciej online przez <a href={BOOKSY_URL} {...ext}>Booksy</a> – widzisz wolne terminy i wybierasz barbera. Możesz też zadzwonić: <a href={PHONE_HREF}>{PHONE_DISPLAY}</a> albo napisać na <a href={MESSENGER_URL} {...ext}>Messengerze</a>.</>),
    },
    {
      q: "Jak odwołać lub przełożyć wizytę?",
      a: (<>Wizytę zarezerwowaną w Booksy zmienisz lub odwołasz w aplikacji. Możesz też zadzwonić – prosimy o informację jak najwcześniej, żeby termin mógł trafić do innego klienta.</>),
    },
    {
      q: "Czy mogę przyjść bez rezerwacji?",
      a: (<>Zapraszamy, ale nie gwarantujemy wolnego miejsca. Najlepiej zadzwoń chwilę wcześniej: <a href={PHONE_HREF}>{PHONE_DISPLAY}</a>.</>),
    },
    {
      q: "Czy strzyżecie dzieci?",
      a: (<>Tak – mamy usługę <Link to={servicePath("apartment-neilson", "pl")}>Strzyżenie Ojciec i Syn</Link> dla chłopców od 3 do 8 lat.</>),
    },
    {
      q: "Jak do Was dojechać?",
      a: (<>Jesteśmy przy ul. Widok 10, obok Rotundy i naprzeciwko hotelu PURO – kilka minut pieszo od stacji metra Centrum. Szczegóły i mapa w zakładce <Link to={to("contact")}>Kontakt</Link>.</>),
    },
  ];
}

function itemsEn(to) {
  return [
    {
      q: "How do I book?",
      a: (<>The quickest way is online on <a href={BOOKSY_URL} {...ext}>Booksy</a> – see free slots and choose your barber. You can also call <a href={PHONE_HREF}>+48 {PHONE_DISPLAY}</a> or message us on <a href={MESSENGER_URL} {...ext}>Messenger</a>.</>),
    },
    {
      q: "Do you speak English?",
      a: (<>Yes – feel free to book, call or message us in English.</>),
    },
    {
      q: "How do I cancel or reschedule?",
      a: (<>Bookings made on Booksy can be changed or cancelled in the app. You can also call us – please let us know as early as possible so someone else can take the slot.</>),
    },
    {
      q: "Can I walk in without a booking?",
      a: (<>You're welcome to, but we can't guarantee a free chair. It's best to call shortly before: <a href={PHONE_HREF}>+48 {PHONE_DISPLAY}</a>.</>),
    },
    {
      q: "Do you cut kids' hair?",
      a: (<>Yes – our <Link to={servicePath("apartment-neilson", "en")}>Father & Son Haircut</Link> is for boys aged 3 to 8.</>),
    },
    {
      q: "How do I get there?",
      a: (<>We're at Widok 10, next to the Rotunda and opposite PURO Hotel – a few minutes' walk from Centrum metro station. See the <Link to={to("contact")}>Contact</Link> page for a map.</>),
    },
  ];
}

export default function Faq() {
  const { lang, t, to } = useLang();
  const items = lang === "en" ? itemsEn(to) : itemsPl(to);
  return (
    <section className="faq">
      <Title title={t.bookingPage.faq} />
      <div className="faq-center">
        {items.map((it, i) => (
          <details key={i} className="faq-item">
            <summary>{it.q}</summary>
            <p>{it.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
