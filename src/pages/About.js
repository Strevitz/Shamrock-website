import React from "react";
import Hero from "../components/Hero";
import Banner from "../components/Banner";
import { Link } from "react-router-dom";
import Title from "../components/Title";
import Footer from "../components/Footer";

const About = () => {
  return (
    <div className="page">
      <Hero hero="roomsHero">
        <Banner
          title="Rezerwacje"
          subtitle="Zarezerwuj najbliższy termin"
        ></Banner>
      </Hero>
      <section className="services">
        <Title title="Why Propriété" />
        <p>
          Whether you are a landlord looking for a let only, rent collection or
          full management service, Propriété will help you with your legal,
          statutory and financial obligations whilst finding the most suitable,
          fully referenced tenants for your property.
        </p>
        <br />
        <Link
          to={{ pathname: "https://www.instagram.com/shamrock_barbershop/" }}
          target="_blank"
          className="btn-primary-insta"
        >
          rezerwuj online
        </Link>
        <br />
        <p>
          Statutory and financial obligations whilst finding the most suitable,
          fully referenced tenants for your property. Whether you are a landlord
          looking for a let only, rent collection or full management service,
          Propriété will help you with your legal, statutory and financial
          obligations whilst finding the most suitable, fully referenced tenants
          for your property.
        </p>
        <br />
        <Link
          to={{ pathname: "https://www.instagram.com/shamrock_barbershop/" }}
          target="_blank"
          className="btn-primary-insta"
        >
          zadzwoń teraz
        </Link>
      </section>

      <Footer />
    </div>
  );
};

export default About;
