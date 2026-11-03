import React from "react";
import Hero from "../components/Hero";
import Banner from "../components/Banner";
import insta1 from "../images/insta1.jpg";
import insta2 from "../images/insta2.jpg";
import insta3 from "../images/insta3.jpg";
import insta4 from "../images/insta4.jpg";
import Title from "../components/Title";
import Footer from "../components/Footer";
import PageMeta from "../components/PageMeta";
import { Link } from "react-router-dom";
import { useLang } from "../i18n";

const Apartments = () => {
  const { t } = useLang();
  return (
    <div className="page">
      <PageMeta title={t.meta.media[0]} description={t.meta.media[1]} />
      <Hero hero="roomsHero3">
        <Banner title={t.media.title} subtitle={t.media.subtitle}></Banner>
      </Hero>
      <section className="services">
        <Title title={t.media.insta} />
        <div className="media-box">
          <div className="employee-box">
            <img className="mediapic" src={insta4} alt={t.media.alt} />
          </div>
          <div className="employee-box">
            <img className="mediapic" src={insta3} alt={t.media.alt} />
          </div>
          <div className="employee-box">
            <img className="mediapic" src={insta2} alt={t.media.alt} />
          </div>
          <div className="employee-box">
            <img className="mediapic" src={insta1} alt={t.media.alt} />
          </div>
        </div>
        <Link
          to={{ pathname: "https://www.instagram.com/shamrock_barbershop/" }}
          target="_blank"
          className="btn-primary-insta"
        >
          @shamrock_barbershop
        </Link>
        <Title className="fbtitle" title={t.media.fb} />
        <div className="media-box">
          <div className="employee-box">
            <img className="mediapic" src={insta4} alt={t.media.alt} />
          </div>
          <div className="employee-box">
            <img className="mediapic" src={insta3} alt={t.media.alt} />
          </div>
          <div className="employee-box">
            <img className="mediapic" src={insta2} alt={t.media.alt} />
          </div>
          <div className="employee-box">
            <img className="mediapic" src={insta1} alt={t.media.alt} />
          </div>
        </div>
        <Link
          to={{ pathname: "https://www.facebook.com/ShamrockWarszawa/" }}
          target="_blank"
          className="btn-primary"
        >
          @shamrockwarszawa
        </Link>
      </section>
      <Footer />
    </div>
  );
};

export default Apartments;
