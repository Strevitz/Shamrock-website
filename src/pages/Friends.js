import React from "react";
import Hero from "../components/Hero";
import Banner from "../components/Banner";
import plant from "../images/plant.webp";
import booksy from "../images/booksy.png";
import supply from "../images/supply.jpg";
import jameson from "../images/jameson.png";
import reuzel from "../images/reuzel.png";
import uppercut from "../images/uppercut.png";
import Title from "../components/Title";
import Footer from "../components/Footer";

const About = () => {
  return (
    <div className="page">
      <Hero hero="roomsHero">
        <Banner
          title="Przyjaciele"
          subtitle="Ponieważ najlepiej wśród przyjaciół"
        ></Banner>
      </Hero>
      <section className="services3">
        <Title title="Współpracujemy z najlepszymi" />
        <img className="friend" src={plant} alt="A Plant Company" />
        <img className="booksy" src={booksy} alt="A Plant Company" />
        <img className="supply" src={supply} alt="A Plant Company" />
        <img className="jameson" src={jameson} alt="A Plant Company" />
        <img className="reuzel" src={reuzel} alt="A Plant Company" />
        <img className="uppercut" src={uppercut} alt="A Plant Company" />
      </section>
      <Footer />
    </div>
  );
};

export default About;
