import React from "react";
import { Link } from "react-router-dom";
import Title from "./Title";
import { useLang, servicePath } from "../i18n";

// Krótki opis lokalu pod lokalne wyszukiwania (barber Warszawa Centrum / Śródmieście)
// z linkami do najpopularniejszych usług.
const POPULAR = ["strzyżenie", "komplet", "broda", "strzyżenie-maszynką", "apartment-bedford", "apartment-neilson"];

export default function LocalIntro() {
  const { lang, t } = useLang();
  const local = t.home.local;
  const names = t.home.localNames;
  return (
    <section className="local-intro">
      <Title title={local.title} />
      <div className="local-intro__text">
        {local.text.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
        <p className="local-intro__links">
          {local.services}{" "}
          {POPULAR.map((slug, i) => (
            <React.Fragment key={slug}>
              <Link to={servicePath(slug, lang)}>{names[slug]}</Link>
              {i < POPULAR.length - 1 ? " · " : ""}
            </React.Fragment>
          ))}
        </p>
      </div>
    </section>
  );
}
