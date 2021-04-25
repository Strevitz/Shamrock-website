import React from "react";
import Hero from "../components/Hero";
import Banner from "../components/Banner";
import { Link } from "react-router-dom";
import Title from "../components/Title";
import Footer from "../components/Footer";

const About = () => {
  return (
    <div className="page">
      <Hero hero="roomsHero2">
        <Banner
          title="Rezerwacje"
          subtitle="Zarezerwuj najbliższy termin"
        ></Banner>
      </Hero>
      <section className="services">
        <Title title="Rezerwuj telefonicznie!" />
        <p>
          Jeśli chcesz szybko zarezerwować wizytę? Dzwoń śmiało, a znajdziemy
          dogodny dla Ciebie termin.
        </p>
        <br />
        <Link
          to={{ pathname: "tel:+48600090715" }}
          target="_blank"
          className="btn-primary-insta"
        >
          zadzwoń teraz
        </Link>
        <br />
        <Title title="Rezerwuj online!" />
        <p>Zarezerwuj u nas wizytę online poprzez BOOKSY.</p>
        <br />
        <Link
          to={{ pathname: "https://shamrockbarbershop.booksy.com/" }}
          target="_blank"
          className="btn-primary-insta"
        >
          rezerwuj online
        </Link>
      </section>

      <Footer />
    </div>
  );
};

export default About;
