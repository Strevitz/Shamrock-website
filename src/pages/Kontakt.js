import React from "react";
import Hero from "../components/Hero";
import Banner from "../components/Banner";
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
        <p>ul. Widok 10 (vis à vis PURO Hotel)</p>
        <p>00-023 Warszawa</p>
        <br />
        <iframe
          title="map"
          width="300"
          height="300"
          id="gmap_canvas"
          src="https://maps.google.com/maps?q=widok%2010&t=&z=15&ie=UTF8&iwloc=&output=embed"
          frameborder="0"
          scrolling="no"
          marginheight="0"
          marginwidth="0"
        ></iframe>
      </section>

      <Footer />
    </div>
  );
};

export default About;
