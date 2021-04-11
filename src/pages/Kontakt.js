import React from "react";
import Hero from "../components/Hero";
import Banner from "../components/Banner";
import Footer from "../components/Footer";
import MessengerCustomerChat from "react-messenger-customer-chat";

const About = () => {
  return (
    <div className="page">
      <div>
        <MessengerCustomerChat
          pageId="<104481088421602>"
          appId="<ShamrockWarszawa>"
        />
      </div>
      <Hero hero="roomsHero">
        <Banner title="Kontakt" subtitle="Skontaktuj się z nami"></Banner>
      </Hero>
      <section className="services2">
        <td>numer tel.: </td>
        <a href="tel:+48600090715">+48 600 090 715</a>
        <br />
        <br />
        <td>adres e-mail: </td>
        <a href="mailto:info@shamrockbarber.com">info@shamrockbarber.com</a>
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
        <p>Shamrock Barber Shop</p>
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
        ></iframe>
      </section>

      <Footer />
    </div>
  );
};

export default About;
