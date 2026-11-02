import React from "react";
import Hero from "../components/Hero";
import Banner from "../components/Banner";
import Title from "../components/Title";
import Footer from "../components/Footer";
import PriceList from "../components/PriceList";
import Faq from "../components/Faq";
import PageMeta from "../components/PageMeta";
import { PHONE_DISPLAY, PHONE_HREF, BOOKSY_URL, MESSENGER_URL } from "../siteInfo";

const About = () => {
  return (
    <div className="page">
      <PageMeta
        title="Rezerwacje i cennik"
        description="Cennik Shamrock Barber Shop Warszawa: strzyżenie, broda, golenie brzytwą. Zarezerwuj wizytę online przez Booksy lub zadzwoń 884 769 758."
      />
      <Hero hero="roomsHero7">
        <Banner title="Rezerwacje" subtitle="Zarezerwuj najbliższy termin">
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
      <section className="services booking-options">
        <div className="booking-grid">
          <div className="booking-card">
            <Title title="Online 24/7" />
            <p>Wybierz usługę, barbera i godzinę w Booksy. Przypomnienie przyjdzie SMS-em.</p>
            <a href={BOOKSY_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">
              rezerwuj w booksy
            </a>
          </div>
          <div className="booking-card">
            <Title title="Telefonicznie" />
            <p>Zadzwoń, a znajdziemy dogodny dla Ciebie termin.</p>
            <a href={PHONE_HREF} className="btn-primary">
              {PHONE_DISPLAY}
            </a>
          </div>
          <div className="booking-card">
            <Title title="Wiadomość" />
            <p>Masz pytanie? Napisz do nas na Messengerze.</p>
            <a href={MESSENGER_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">
              napisz do nas
            </a>
          </div>
        </div>
      </section>
      <section className="services3 pricelist-section">
        <Title title="Cennik" />
        <PriceList />
      </section>
      <Faq />
      <Footer />
    </div>
  );
};

export default About;
