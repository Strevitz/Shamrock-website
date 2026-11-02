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
import PageMeta from "../components/PageMeta";

const Friends = () => {
  return (
    <div className="page">
      <PageMeta title="Przyjaciele" description="Marki i partnerzy, z którymi współpracuje Shamrock Barber Shop Warszawa." />
      <Hero hero="roomsHero2">
        <Banner
          title="Przyjaciele"
          subtitle="Ponieważ najlepiej wśród przyjaciół"
        ></Banner>
      </Hero>
      <section className="services3">
        <Title title="Współpracujemy z najlepszymi" />
        <img className="booksy" src={booksy} alt="Booksy – partner Shamrock Barber Shop" />
        <img className="jameson" src={jameson} alt="Jameson – partner Shamrock Barber Shop" />
        <img className="reuzel" src={reuzel} alt="Reuzel – partner Shamrock Barber Shop" />
        <img className="uppercut" src={uppercut} alt="Uppercut Deluxe – partner Shamrock Barber Shop" />
        <img className="supply" src={supply} alt="Supply – partner Shamrock Barber Shop" />
        <img className="friend" src={plant} alt="A Plant Company – partner Shamrock Barber Shop" />
        <img className="okocim" src={okocim} alt="Okocim – partner Shamrock Barber Shop" />
        <img className="mk" src={mk} alt="MK – partner Shamrock Barber Shop" />
      </section>
      <Footer />
    </div>
  );
};

export default Friends;
