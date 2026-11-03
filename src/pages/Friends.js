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
import { useLang } from "../i18n";

const Friends = () => {
  const { t } = useLang();
  return (
    <div className="page">
      <PageMeta title={t.meta.friends[0]} description={t.meta.friends[1]} />
      <Hero hero="roomsHero2">
        <Banner title={t.friends.title} subtitle={t.friends.subtitle}></Banner>
      </Hero>
      <section className="services3">
        <Title title={t.friends.heading} />
        <img className="booksy" src={booksy} alt={`Booksy – ${t.friends.alt}`} />
        <img className="jameson" src={jameson} alt={`Jameson – ${t.friends.alt}`} />
        <img className="reuzel" src={reuzel} alt={`Reuzel – ${t.friends.alt}`} />
        <img className="uppercut" src={uppercut} alt={`Uppercut Deluxe – ${t.friends.alt}`} />
        <img className="supply" src={supply} alt={`Supply – ${t.friends.alt}`} />
        <img className="friend" src={plant} alt={`A Plant Company – ${t.friends.alt}`} />
        <img className="okocim" src={okocim} alt={`Okocim – ${t.friends.alt}`} />
        <img className="mk" src={mk} alt={`MK – ${t.friends.alt}`} />
      </section>
      <Footer />
    </div>
  );
};

export default Friends;
