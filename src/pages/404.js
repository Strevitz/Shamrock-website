import React from "react";
import Hero from "../components/Hero";
import Banner from "../components/Banner";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

const Error = () => {
  return (
    <div className="page">
      <Hero>
        <Banner
          title="404"
          subtitle="Podana strona nie istnieje, zrelaksuj się i zarezerwuj strzyżenie!"
        >
          <Link to="/" className="btn-primary">
            powrót do strony głównej
          </Link>
        </Banner>
      </Hero>
      <Footer />
    </div>
  );
};

export default Error;
