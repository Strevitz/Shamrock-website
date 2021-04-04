import React from "react";
import Hero from "../components/Hero";
import Banner from "../components/Banner";

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
        <br />
        <p>
          Statutory and financial obligations whilst finding the most suitable,
          fully referenced tenants for your property. Whether you are a landlord
          looking for a let only, rent collection or full management service,
          Propriété will help you with your legal, statutory and financial
          obligations whilst finding the most suitable, fully referenced tenants
          for your property.
        </p>
      </section>
      <section className="services">
        <Title title="Who is Propriété" />
        <p>
          Statutory and financial obligations whilst finding the most suitable,
          fully referenced tenants for your property. Whether you are a landlord
          looking for a let only, rent collection or full management service,
          Propriété will help you with your legal, statutory and financial
          obligations whilst finding the most suitable, fully referenced tenants
          for your property.
        </p>
      </section>
      <section className="services">
        <Title title="Propriété for you" />
        <p>
          Statutory and financial obligations whilst finding the most suitable,
          fully referenced tenants for your property. Whether you are a landlord
          looking for a let only, rent collection or full management service,
          Propriété will help you with your legal, statutory and financial
          obligations whilst finding the most suitable, fully referenced tenants
          for your property.
        </p>
        <br />
        <br />
        <p>
          Statutory and financial obligations whilst finding the most suitable,
          fully referenced tenants for your property. Whether you are a landlord
          looking for a let only, rent collection or full management service,
          Propriété will help you with your legal, statutory and financial
          obligations whilst finding the most suitable, fully referenced tenants
          for your property.
        </p>
      </section>
      <Footer />
    </div>
  );
};

export default About;
