import React, { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import defaultBg from "../images/room-1.jpeg";
import Banner from "../components/Banner";
import { RoomContext } from "../context";
import StyledHero from "../components/StyledHero";
import Footer from "../components/Footer";
import PageMeta from "../components/PageMeta";
import { BOOKSY_URL, PHONE_HREF, PHONE_DISPLAY } from "../siteInfo";
import { useLang, contentfulSlugFrom, localizeService } from "../i18n";

export default function SingleApartment() {
  const { slug } = useParams();
  const { getRoom } = useContext(RoomContext);
  const { lang, t, to } = useLang();
  const room = localizeService(getRoom(contentfulSlugFrom(slug)), lang);

  if (!room) {
    return (
      <div className="error">
        <h3>{t.service.loading}</h3>
        <a href={BOOKSY_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">
          {t.bookNow}
        </a>
      </div>
    );
  }

  const { name, description, size, price, images } = room;
  const [mainImg, ...otherImg] = images;
  const currency = t.currency;
  const [metaTitle, metaDesc] = t.meta.service(name, price, size);

  return (
    <div className="page">
      <PageMeta title={metaTitle} description={metaDesc} />
      <StyledHero img={mainImg || defaultBg}>
        <Banner title={name} subtitle={`${price} ${currency} · ${size} ${t.min}`}>
          <div className="hero-buttons">
            <a href={BOOKSY_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">
              {t.bookNow}
            </a>
            <a href={PHONE_HREF} className="btn-primary btn-outline">
              {t.call} {t.phonePrefix}{PHONE_DISPLAY}
            </a>
          </div>
        </Banner>
      </StyledHero>
      <section className="single-room">
        <div className="single-room-images">
          {otherImg.map((item, index) => (
            <img key={index} src={item} alt={name} />
          ))}
        </div>
        <div className="single-room-info">
          <article className="desc">
            <h3>{t.service.details}</h3>
            <p>{description}</p>
          </article>
          <article className="info">
            <h3>{t.service.info}</h3>
            <h6>{t.service.price} : {price} {currency}</h6>
            <h6>{t.service.time} : {size} {t.min}</h6>
            <a href={BOOKSY_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">
              {t.bookOnline}
            </a>
            <br />
            <Link to={to("booking")} className="see-all">{t.service.allPrices}</Link>
          </article>
        </div>
      </section>
      <Footer />
    </div>
  );
}
