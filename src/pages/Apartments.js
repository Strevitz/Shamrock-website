import React from "react";
import Hero from "../components/Hero";
import Banner from "../components/Banner";
import arthur from "../images/arthur.jpg";
import tom from "../images/tom.jpg";
import jamal from "../images/jamal.jpg";
import andrzej from "../images/andrzej.jpg";
import Title from "../components/Title";
import Footer from "../components/Footer";
import PageMeta from "../components/PageMeta";
import { BOOKSY_URL } from "../siteInfo";

const Apartments = () => {
  return (
    <div className="page">
      <PageMeta title="Ekipa" description="Poznaj barberów Shamrock Barber Shop Warszawa i umów się online na wizytę." />
      <Hero hero="roomsHero5">
        <Banner title="Ekipa" subtitle="Poznaj naszą ekipę"></Banner>
      </Hero>

      <section className="services3">
        <div className="employee-box">
          <img className="avatar" src={arthur} alt="Arthur - Barber" />
          <p className="employee">Arthur - Barber</p>
        </div>
        <div className="employee-box">
          <img className="avatar" src={tom} alt="Tom Horn - Barber" />
          <p className="employee">Tom Horn - Barber</p>
        </div>
        <div className="employee-box">
          <img className="avatar" src={jamal} alt="Jamal - Barber" />
          <p className="employee">Jamal - Barber</p>
        </div>
        <div className="employee-box">
          <img className="avatar" src={andrzej} alt="Andrzej - Barber" />
          <p className="employee">Andrzej - Barber</p>
        </div>
      </section>
      <section className="services3 team-cta">
        <p>Wybierz swojego barbera w Booksy i zarezerwuj termin.</p>
        <a href={BOOKSY_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">
          umów wizytę
        </a>
      </section>
      <section className="services">
        <Title title="Dołącz do Nas!" />
        <p>
          Jeśli jesteś pełnym zapału i pasji do zawodu Barberem, to właśnie
          Ciebie szukamy!{" "}
        </p>
        <p>Nie czekaj i skontaktuj się z nami:</p>
        <br />
        <a
          className="praca"
          href="mailto:praca@shamrockbarber.com"
          title={"e-mail"}
        >
          praca@shamrockbarber.com
        </a>
      </section>
      <Footer />
    </div>
  );
};

export default Apartments;
