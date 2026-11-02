import React from "react";
import { Link } from "react-router-dom";
import Title from "./Title";
import { PHONE_DISPLAY, PHONE_HREF, BOOKSY_URL, MESSENGER_URL } from "../siteInfo";

const items = [
  {
    q: "Jak umówić wizytę?",
    a: (
      <>
        Najszybciej online przez{" "}
        <a href={BOOKSY_URL} target="_blank" rel="noopener noreferrer">Booksy</a>{" "}
        – widzisz wolne terminy i wybierasz barbera. Możesz też zadzwonić:{" "}
        <a href={PHONE_HREF}>{PHONE_DISPLAY}</a> albo napisać na{" "}
        <a href={MESSENGER_URL} target="_blank" rel="noopener noreferrer">Messengerze</a>.
      </>
    ),
  },
  {
    q: "Jak odwołać lub przełożyć wizytę?",
    a: (
      <>
        Wizytę zarezerwowaną w Booksy zmienisz lub odwołasz w aplikacji. Możesz
        też zadzwonić – prosimy o informację jak najwcześniej, żeby termin mógł
        trafić do innego klienta.
      </>
    ),
  },
  {
    q: "Czy mogę przyjść bez rezerwacji?",
    a: (
      <>
        Zapraszamy, ale nie gwarantujemy wolnego miejsca. Najlepiej zadzwoń
        chwilę wcześniej: <a href={PHONE_HREF}>{PHONE_DISPLAY}</a>.
      </>
    ),
  },
  {
    q: "Czy strzyżecie dzieci?",
    a: (
      <>
        Tak – mamy usługę{" "}
        <Link to="/rezerwacje/ojciec-i-syn">Strzyżenie Ojciec i Syn</Link> dla
        chłopców od 3 do 8 lat.
      </>
    ),
  },
  {
    q: "Jak do Was dojechać?",
    a: (
      <>
        Jesteśmy przy ul. Widok 10, obok Rotundy i naprzeciwko hotelu PURO –
        kilka minut pieszo od stacji metra Centrum. Szczegóły i mapa w zakładce{" "}
        <Link to="/kontakt">Kontakt</Link>.
      </>
    ),
  },
];

export default function Faq() {
  return (
    <section className="faq">
      <Title title="Najczęstsze pytania" />
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
