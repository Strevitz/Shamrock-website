import React from "react";
import { Link } from "react-router-dom";
import defaultImg from "../images/room-1.jpeg";
import PropTypes from "prop-types";
import { BOOKSY_URL } from "../siteInfo";
import { useLang, servicePath, localizeService } from "../i18n";

// Karta usługi na stronie głównej.
export default function Apartment({ room }) {
  const { lang, t } = useLang();
  const { name, slug, images, price, size } = localizeService(room, lang);
  const url = servicePath(slug, lang);
  return (
    <article className="room">
      <div className="img-container">
        <img src={images[0] || defaultImg} alt={`${name} – Shamrock Barber Shop`} loading="lazy" />
        <div className="price-top">
          <h6>{price} PLN</h6>
        </div>
        <Link to={url} className="btn-primary room-link">{t.details}</Link>
      </div>
      <div className="room-info">
        <Link to={url} className="room-name">{name}</Link>
        {size ? <span className="room-time">{size} {t.min}</span> : null}
        <a href={BOOKSY_URL} target="_blank" rel="noopener noreferrer" className="room-book">{t.book}</a>
      </div>
    </article>
  );
}

Apartment.propTypes = {
  room: PropTypes.shape({
    name: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
    price: PropTypes.number.isRequired,
  }),
};
