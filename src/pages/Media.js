import React from "react";
import Hero from "../components/Hero";
import Banner from "../components/Banner";
import insta1 from "../images/insta1.jpg";
import insta2 from "../images/insta2.jpg";
import insta3 from "../images/insta3.jpg";
import insta4 from "../images/insta4.jpg";
import Title from "../components/Title";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

const Apartments = () => {
  return (
    <div className="page">
      <Hero hero="roomsHero">
        <Banner title="Media" subtitle="Poznaj nas od kuchni"></Banner>
      </Hero>
      <section className="services">
        <Title title="Znajdź nas na Instagramie" />
        <div className="media-box">
          <div className="employee-box">
            <img className="mediapic" src={insta4} alt="A Plant Company" />
          </div>
          <div className="employee-box">
            <img className="mediapic" src={insta3} alt="A Plant Company" />
          </div>
          <div className="employee-box">
            <img className="mediapic" src={insta2} alt="A Plant Company" />
          </div>
          <div className="employee-box">
            <img className="mediapic" src={insta1} alt="A Plant Company" />
          </div>
        </div>
        <Link
          to={{ pathname: "https://www.instagram.com/shamrock_barbershop/" }}
          target="_blank"
          className="btn-primary-insta"
        >
          @shamrock_barbershop
        </Link>
        <Title className="fbtitle" title="Znajdź nas na Facebooku" />
        <div className="media-box">
          <div className="employee-box">
            <img className="mediapic" src={insta4} alt="A Plant Company" />
          </div>
          <div className="employee-box">
            <img className="mediapic" src={insta3} alt="A Plant Company" />
          </div>
          <div className="employee-box">
            <img className="mediapic" src={insta2} alt="A Plant Company" />
          </div>
          <div className="employee-box">
            <img className="mediapic" src={insta1} alt="A Plant Company" />
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
