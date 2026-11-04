import React from "react";
import Hero from "../components/Hero";
import Banner from "../components/Banner";
import Title from "../components/Title";
import Footer from "../components/Footer";
import PriceList from "../components/PriceList";
import Faq from "../components/Faq";
import PageMeta from "../components/PageMeta";
import { PHONE_DISPLAY, PHONE_HREF, BOOKSY_URL, WHATSAPP_URL } from "../siteInfo";
import { useLang } from "../i18n";

const Booking = () => {
  const { t } = useLang();
  const b = t.bookingPage;
  const phone = t.phonePrefix + PHONE_DISPLAY;
  return (
    <div className="page">
      <PageMeta title={t.meta.booking[0]} description={t.meta.booking[1]} />
      <Hero hero="roomsHero7">
        <Banner title={b.title} subtitle={b.subtitle}>
          <div className="hero-buttons">
            <a href={BOOKSY_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">
              {t.bookOnline}
            </a>
            <a href={PHONE_HREF} className="btn-primary btn-outline">
              {t.call} {phone}
            </a>
          </div>
        </Banner>
      </Hero>
      <section className="services booking-options">
        <div className="booking-grid">
          <div className="booking-card">
            <Title title={b.online} />
            <p>{b.onlineText}</p>
            <a href={BOOKSY_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">{b.onlineBtn}</a>
          </div>
          <div className="booking-card">
            <Title title={b.phone} />
            <p>{b.phoneText}</p>
            <a href={PHONE_HREF} className="btn-primary">{phone}</a>
          </div>
          <div className="booking-card">
            <Title title={b.msg} />
            <p>{b.msgText}</p>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">{b.msgBtn}</a>
          </div>
        </div>
      </section>
      <section className="services3 pricelist-section">
        <Title title={b.priceList} />
        <PriceList />
      </section>
      <Faq />
      <Footer />
    </div>
  );
};

export default Booking;
