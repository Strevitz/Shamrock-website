import React from "react";
import Hero from "../components/Hero";
import Banner from "../components/Banner";

import Title from "../components/Title";
import Footer from "../components/Footer";

const About = () => {
  return (
    <div className="page">
      <Hero hero="roomsHero">
        <Banner title="Kontakt" subtitle="Skontaktuj się z nami"></Banner>
      </Hero>
      <section className="services2">
        <a href="+48600090715" title={"Numer telefonu"}>
          tel. +48 600 090 715
        </a>
        <br />
        <br />
        <a href="+48600090715" title={"e-mail"}>
          adres e-mail: shamrock@email.com
        </a>
        <br />
        <br />
        <table id="pricelist">
          <td>GODZINY OTWARCIA</td>
          <br />
          <br />
          <tr>
            <td id="cell">Poniedziałek</td>
            <td id="cell">12 - 20</td>
          </tr>
          <tr>
            <td id="cell">Wtorek</td>
            <td id="cell">9 - 20</td>
          </tr>
          <tr>
            <td id="cell">Środa</td>
            <td id="cell">9 - 20</td>
          </tr>
          <tr>
            <td id="cell">Czwartek</td>
            <td id="cell">9 - 20</td>
          </tr>
          <tr>
            <td id="cell">Piątek</td>
            <td id="cell">9 - 20</td>
          </tr>
          <tr>
            <td id="cell">Sobota</td>
            <td id="cell">9 - 16</td>
          </tr>
          <tr>
            <td id="cell">Niedziela</td>
            <td id="cell">NIECZYNNE</td>
          </tr>
        </table>
        <br />
        <br />
        <p>ADRES</p>
        <br />
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
