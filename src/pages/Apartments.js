import React from "react";
import Hero from "../components/Hero";
import Banner from "../components/Banner";
import stefan from "../images/stefan.jpg";
import artur from "../images/artur.jpg";
import amira from "../images/amira.jpg";
import lukas from "../images/lukas.jpg";
import Title from "../components/Title";
import Footer from "../components/Footer";

const Apartments = () => {
  return (
    <div className="page">
      <Hero hero="roomsHero5">
        <Banner title="Ekipa" subtitle="Poznaj naszą ekipę"></Banner>
      </Hero>

      <section className="services3">
        <div className="employee-box">
          <img className="avatar" src={artur} alt="A Plant Company" />
          <p className="employee">Arthur - Barber</p>
        </div>
        <div className="employee-box">
          <img className="avatar" src={lukas} alt="A Plant Company" />
          <p className="employee">Łukasz - Barber</p>
        </div>
        <div className="employee-box">
          <img className="avatar" src={amira} alt="A Plant Company" />
          <p className="employee">Amira - Manager</p>
        </div>
        <div className="employee-box">
          <img className="avatar" src={stefan} alt="A Plant Company" />
          <p className="employee">Franek - Recepcjonista</p>
        </div>
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
