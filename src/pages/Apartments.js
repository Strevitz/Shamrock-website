import React from "react";
import Hero from "../components/Hero";
import Banner from "../components/Banner";
import avatar from "../images/avatar.jpg";
import stefan from "../images/stefan.jpg";
import Title from "../components/Title";
import Footer from "../components/Footer";

const Apartments = () => {
  return (
    <div className="page">
      <Hero hero="roomsHero">
        <Banner title="Ekipa" subtitle="Poznaj naszą ekipę"></Banner>
      </Hero>

      <section className="services3">
        <div className="employee-box">
          <img className="avatar" src={avatar} alt="A Plant Company" />
          <p className="employee">Arthur - Barber</p>
        </div>
        <div className="employee-box">
          <img className="avatar" src={avatar} alt="A Plant Company" />
          <p className="employee">Łukasz - Barber</p>
        </div>
        <div className="employee-box">
          <img className="avatar" src={avatar} alt="A Plant Company" />
          <p className="employee">Krzysiek - Barber</p>
        </div>
        <div className="employee-box">
          <img className="avatar" src={stefan} alt="A Plant Company" />
          <p className="employee">Stefan - Recepcjonista</p>
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
