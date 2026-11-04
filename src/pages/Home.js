import React from "react";
import Hero from "../components/Hero";
import Banner from "../components/Banner";
import Services from "../components/Services";
import CurrentOffers from "../components/CurrentOffers";
import News from "../components/News";
import Footer from "../components/Footer";
import PageMeta from "../components/PageMeta";
import { PHONE_DISPLAY, PHONE_HREF, BOOKSY_URL } from "../siteInfo";
import { useLang } from "../i18n";

const Home = () => {
  const { t } = useLang();
  return (
    <div className="page">
      <PageMeta />
      <Hero>
        <Banner title={t.home.title} subtitle={t.home.subtitle}>
          <div className="hero-buttons">
            <a href={BOOKSY_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">
              {t.bookOnline}
            </a>
            <a href={PHONE_HREF} className="btn-primary btn-outline">
              {t.call} {t.phonePrefix}{PHONE_DISPLAY}
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
