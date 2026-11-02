import React from "react";
import { Link } from "react-router-dom";
import defaultImg from "../images/room-1.jpeg";
import PropTypes from "prop-types";
import { BOOKSY_URL, prettySlug } from "../siteInfo";

// Karta usługi na stronie głównej.
export default function Apartment({ room }) {
  const { name, slug, images, price, size } = room;
  const url = `/rezerwacje/${prettySlug(slug)}`;
  return (
    <article className="room">
      <div className="img-container">
        <img src={images[0] || defaultImg} alt={`${name} – Shamrock Barber Shop`} loading="lazy" />
        <div className="price-top">
          <h6>{price} PLN</h6>
        </div>
        <Link to={url} className="btn-primary room-link">
          szczegóły
        </Link>
      </div>
      <div className="room-info">
        <Link to={url} className="room-name">{name}</Link>
        {size ? <span className="room-time">{size} min</span> : null}
        <a href={BOOKSY_URL} target="_blank" rel="noopener noreferrer" className="room-book">
          rezerwuj
        </a>
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
