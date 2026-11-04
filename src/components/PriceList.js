import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { RoomContext } from "../context";
import Loading from "./Loading";
import { BOOKSY_URL } from "../siteInfo";
import { useLang, servicePath, localizeService } from "../i18n";

// Pełny cennik z czasem trwania – dane z Contentful (te same co karty usług).
export default function PriceList() {
  const { loading, featuredRooms } = useContext(RoomContext);
  const { lang, t } = useLang();
  if (loading) return <Loading />;
  const currency = t.currency;
  return (
    <div className="pricelist">
      {featuredRooms.map((raw) => {
        const s = localizeService(raw, lang);
        return (
          <div className="pricelist__row" key={s.id}>
            <div className="pricelist__name">
              <Link to={servicePath(s.slug, lang)}>{s.name}</Link>
              <span className="pricelist__time">{s.size} {t.min}</span>
            </div>
            <div className="pricelist__price">{s.price} {currency}</div>
            <a href={BOOKSY_URL} target="_blank" rel="noopener noreferrer" className="pricelist__book">
              {t.book}
            </a>
          </div>
        );
      })}
    </div>
  );
}
