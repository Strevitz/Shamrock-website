import React from "react";
import Hero from "../components/Hero";
import Banner from "../components/Banner";
import Services from "../components/Services";
import CurrentOffers from "../components/CurrentOffers";
import News from "../components/News";
import Footer from "../components/Footer";
import PageMeta from "../components/PageMeta";
import { PHONE_DISPLAY, PHONE_HREF, BOOKSY_URL } from "../siteInfo";

const Home = () => {
  return (
    <div className="page">
      <PageMeta />
      <Hero>
        <Banner
          title="Chcesz umówić wizytę?"
          subtitle="Wybierz wolny termin online albo zadzwoń – znajdziemy dla Ciebie miejsce."
        >
          <div className="hero-buttons">
            <a
              href={BOOKSY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              rezerwuj online
            </a>
            <a href={PHONE_HREF} className="btn-primary btn-outline">
              zadzwoń {PHONE_DISPLAY}
            </a>
          </div>
        </Banner>
      </Hero>
      <Services />
      <CurrentOffers />
      <News />
      <Footer />
    </div>
  );
};

export default Home;
