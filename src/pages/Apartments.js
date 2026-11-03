import React from "react";
import Hero from "../components/Hero";
import Banner from "../components/Banner";
import arthur from "../images/arthur.jpg";
import tom from "../images/tom.jpg";
import jamal from "../images/jamal.jpg";
import andrzej from "../images/andrzej.jpg";
import Title from "../components/Title";
import Footer from "../components/Footer";
import PageMeta from "../components/PageMeta";
import { BOOKSY_URL } from "../siteInfo";
import { useLang } from "../i18n";

// Ekipa – dodawaj/usuwaj osoby tutaj.
const TEAM = [
  { name: "Arthur", img: arthur },
  { name: "Tom Horn", img: tom },
  { name: "Jamal", img: jamal },
  { name: "Andrzej", img: andrzej },
];

const Team = () => {
  const { t } = useLang();
  const tm = t.team;
  return (
    <div className="page">
      <PageMeta title={t.meta.team[0]} description={t.meta.team[1]} />
      <Hero hero="roomsHero5">
        <Banner title={tm.title} subtitle={tm.subtitle}></Banner>
      </Hero>
      <section className="services3">
        {TEAM.map((p) => (
          <div className="employee-box" key={p.name}>
            <img className="avatar" src={p.img} alt={`${p.name} - ${tm.role}`} />
            <p className="employee">{p.name} - {tm.role}</p>
          </div>
        ))}
      </section>
      <section className="services3 team-cta">
        <p>{tm.cta}</p>
        <a href={BOOKSY_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">{tm.ctaBtn}</a>
      </section>
      <section className="services">
        <Title title={tm.join} />
        <p>{tm.joinText}</p>
        <p>{tm.joinContact}</p>
        <br />
        <a className="praca" href="mailto:praca@shamrockbarber.com" title={"e-mail"}>
          praca@shamrockbarber.com
        </a>
      </section>
      <Footer />
    </div>
  );
};

export default Team;
