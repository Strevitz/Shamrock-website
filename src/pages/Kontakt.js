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
  WHATSAPP_URL,
  MAPS_DIRECTIONS_URL,
  MAPS_EMBED_URL,
} from "../siteInfo";
import { useLang } from "../i18n";

const Kontakt = () => {
  const { lang, t } = useLang();
  const c = t.contact;
  return (
    <div className="page">
      <PageMeta title={t.meta.contact[0]} description={t.meta.contact[1]} />
      <Hero hero="roomsHero4">
        <Banner title={c.title} subtitle={c.subtitle}></Banner>
      </Hero>
      <section className="contact">
        <div className="contact-grid">
          <div className="contact-card">
            <Title title={c.card} />
            <p><strong>{c.phone}:</strong> <a href={PHONE_HREF}>+48 {PHONE_DISPLAY}</a></p>
            <p><strong>{c.email}:</strong> <a href={`mailto:${EMAIL}`}>{EMAIL}</a></p>
            <p>
              <strong>{c.whatsapp}:</strong>{" "}
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">{c.write}</a>
            </p>
            <div className="contact-buttons">
              <a href={BOOKSY_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">{t.bookOnline}</a>
              <a href={PHONE_HREF} className="btn-primary btn-outline-dark">{t.call}</a>
            </div>
          </div>
          <div className="contact-card">
            <Title title={c.hours} />
            <OpeningHours />
          </div>
          <div className="contact-card">
            <Title title={c.address} />
            <p>
              <strong>Shamrock Barber Shop</strong>
              <br />
              {lang === "en" ? "Widok 10" : "ul. Widok 10"} ({c.opposite})
              <br />
              {lang === "en" ? "00-023 Warsaw, Poland" : "00-023 Warszawa"}
            </p>
            <ul className="directions">
              {c.directions.map((d) => <li key={d}>{d}</li>)}
            </ul>
            <a href={MAPS_DIRECTIONS_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">{c.navigate}</a>
          </div>
        </div>
        <div className="map-wrap">
          <iframe
            title={c.mapTitle}
            src={MAPS_EMBED_URL + (lang === "en" ? "&hl=en" : "&hl=pl")}
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
