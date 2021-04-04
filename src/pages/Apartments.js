import React from "react";
import Hero from "../components/Hero";
import Banner from "../components/Banner";

import ApartmentsContainer from "../components/ApartmentsContainer";
import Footer from "../components/Footer";

const Apartments = () => {
  return (
    <div className="page">
      <Hero hero="roomsHero">
        <Banner title="Ekipa" subtitle="Poznaj naszą ekipę"></Banner>
      </Hero>
      <ApartmentsContainer />
      <Footer />
    </div>
  );
};

export default Apartments;
