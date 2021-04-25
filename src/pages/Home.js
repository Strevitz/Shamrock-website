import React from "react";
import Hero from "../components/Hero";
import Banner from "../components/Banner";
import { Link } from "react-router-dom";
import Services from "../components/Services";
import CurrentOffers from "../components/CurrentOffers";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div className="page">
      <Hero>
        <Banner
          title="Chcesz umówić wizytę?"
          subtitle="Zadzwoń do nas 600 090 715"
        >
          <Link
            to={{ pathname: "https://shamrockbarbershop.booksy.com" }}
            target="_blank"
            className="btn-primary"
          >
            lub rezerwuj online
          </Link>
        </Banner>
      </Hero>
      <Services />
      <CurrentOffers />
      <Footer />
    </div>
  );
};

export default Home;
