import React from "react";
import Hero from "../components/Hero";
import Banner from "../components/Banner";
import Footer from "../components/Footer";
import Title from "../components/Title";
import OpeningHours from "../components/OpeningHours";
import PageMeta from "../components/PageMeta";
import {
  PHONE_DISPLAY,
  PHONE_HREF,
  EMAIL,
  BOOKSY_URL,
  MESSENGER_URL,
  MAPS_DIRECTIONS_URL,
  MAPS_EMBED_URL,
} from "../siteInfo";

const Kontakt = () => {
  return (
    <div className="page">
      <PageMeta
        title="Kontakt i dojazd"
        description="Shamrock Barber Shop, ul. Widok 10, 00-023 Warszawa (obok Rotundy, naprzeciwko hotelu PURO). Godziny otwarcia, telefon 884 769 758, dojazd i mapa."
      />
      <Hero hero="roomsHero4">
        <Banner title="Kontakt" subtitle="Skontaktuj się z nami"></Banner>
      </Hero>
      <section className="contact">
        <div className="contact-grid">
          <div className="contact-card">
            <Title title="Kontakt" />
            <p>
              <strong>Telefon:</strong> <a href={PHONE_HREF}>+48 {PHONE_DISPLAY}</a>
            </p>
            <p>
              <strong>E-mail:</strong> <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            </p>
            <p>
              <strong>Messenger:</strong>{" "}
              <a href={MESSENGER_URL} target="_blank" rel="noopener noreferrer">
                napisz do nas
              </a>
            </p>
            <div className="contact-buttons">
              <a href={BOOKSY_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">
                rezerwuj online
              </a>
              <a href={PHONE_HREF} className="btn-primary btn-outline-dark">
                zadzwoń
              </a>
            </div>
          </div>
          <div className="contact-card">
            <Title title="Godziny otwarcia" />
            <OpeningHours />
          </div>
          <div className="contact-card">
            <Title title="Adres i dojazd" />
            <p>
              <strong>Shamrock Barber Shop</strong>
              <br />
              ul. Widok 10 (vis à vis hotelu PURO)
              <br />
              00-023 Warszawa
            </p>
            <ul className="directions">
              <li>Kilka minut pieszo od stacji metra Centrum (M1) i Rotundy.</li>
              <li>Przystanki tramwajowe i autobusowe „Centrum” tuż obok.</li>
              <li>Parking: strefa płatnego parkowania w okolicznych ulicach.</li>
            </ul>
            <a
              href={MAPS_DIRECTIONS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              nawiguj do nas
            </a>
          </div>
        </div>
        <div className="map-wrap">
          <iframe
            title="Mapa dojazdu do Shamrock Barber Shop"
            src={MAPS_EMBED_URL}
            frameBorder="0"
            scrolling="no"
            loading="lazy"
          ></iframe>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Kontakt;
