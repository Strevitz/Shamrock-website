import React from "react";
import Hero from "../components/Hero";
import Banner from "../components/Banner";
import plant from "../images/plant.webp";
import booksy from "../images/booksy.png";
import supply from "../images/supply.jpg";
import jameson from "../images/jameson.png";
import reuzel from "../images/reuzel.png";
import uppercut from "../images/uppercut.png";
import mk from "../images/mk.png";
import okocim from "../images/okocim.png";
import Title from "../components/Title";
import Footer from "../components/Footer";

const About = () => {
  return (
    <div className="page">
      <Hero hero="roomsHero2">
        <Banner
          title="Przyjaciele"
          subtitle="Ponieważ najlepiej wśród przyjaciół"
        ></Banner>
      </Hero>
      <section className="services3">
        <Title title="Współpracujemy z najlepszymi" />
        <img className="booksy" src={booksy} alt="A Plant Company" />
        <img className="jameson" src={jameson} alt="A Plant Company" />
        <img className="reuzel" src={reuzel} alt="A Plant Company" />
        <img className="uppercut" src={uppercut} alt="A Plant Company" />
        <img className="supply" src={supply} alt="A Plant Company" />
        <img className="friend" src={plant} alt="A Plant Company" />
        <img className="okocim" src={okocim} alt="A Plant Company" />
        <img className="mk" src={mk} alt="A Plant Company" />
      </section>
      <Footer />
    </div>
  );
};

export default About;
