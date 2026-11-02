import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { RoomContext } from "../context";
import Loading from "./Loading";
import { BOOKSY_URL, prettySlug } from "../siteInfo";

// Pełny cennik z czasem trwania – dane z Contentful (te same co karty usług).
export default function PriceList() {
  const { loading, featuredRooms } = useContext(RoomContext);
  if (loading) return <Loading />;
  return (
    <div className="pricelist">
      {featuredRooms.map((s) => (
        <div className="pricelist__row" key={s.id}>
          <div className="pricelist__name">
            <Link to={`/rezerwacje/${prettySlug(s.slug)}`}>{s.name}</Link>
            <span className="pricelist__time">{s.size} min</span>
          </div>
          <div className="pricelist__price">{s.price} zł</div>
          <a
            href={BOOKSY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="pricelist__book"
          >
            rezerwuj
          </a>
        </div>
      ))}
    </div>
  );
}
