import React from "react";
import { Link } from "react-router-dom";
import defaultImg from "../images/room-1.jpeg";
import PropTypes from "prop-types";

export default function Apartment({ room }) {
  const { name, slug, images, price } = room;
  return (
    <article className="room">
      <div className="img-container">
        <img src={images[0] || defaultImg} alt="single room" />
        <div className="price-top">
          <h6>{price} PLN</h6>
        </div>
        <Link to={`/rezerwacje/${slug}`} className="btn-primary room-link">
          szczegóły
        </Link>
      </div>
      <p className="room-info">{name}</p>
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
