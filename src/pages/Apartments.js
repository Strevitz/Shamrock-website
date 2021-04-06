import React from "react";
import Hero from "../components/Hero";
import Banner from "../components/Banner";
import avatar from "../images/avatar.jpg";
import Title from "../components/Title";
import Footer from "../components/Footer";

const Apartments = () => {
  return (
    <div className="page">
      <Hero hero="roomsHero">
        <Banner title="Ekipa" subtitle="Poznaj naszą ekipę"></Banner>
      </Hero>
      <section className="services3">
        <Title title="Współpracujemy z najlepszymi" />
        <div className="employee-box">
          <img className="avatar" src={avatar} alt="A Plant Company" />
          <p className="employee">Arthur</p>
        </div>

        <img className="avatar" src={avatar} alt="A Plant Company" />
        <img className="avatar" src={avatar} alt="A Plant Company" />
        <img className="avatar" src={avatar} alt="A Plant Company" />
      </section>
      <Footer />
    </div>
  );
};

export default Apartments;
