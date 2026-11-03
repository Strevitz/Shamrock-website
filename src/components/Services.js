import React from "react";
import Title from "./Title";
import { FaCut, FaCalendarCheck, FaSearchLocation, FaMugHot } from "react-icons/fa";
import { useLang } from "../i18n";

const icons = [<FaCut />, <FaSearchLocation />, <FaMugHot />, <FaCalendarCheck />];

export default function Services() {
  const { t } = useLang();
  return (
    <section className="services">
      <Title title={t.home.about} />
      <div className="services-center">
        {t.home.features.map((item, index) => (
          <article key={index} className="service">
            <span>{icons[index]}</span>
            <h6>{item.title}</h6>
            <p>{item.info}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
