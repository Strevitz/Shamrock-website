import React from "react";
import { Link } from "react-router-dom";
import Title from "./Title";
import news from "../data/news";
import { useLang, ROUTES } from "../i18n";

export default function News() {
  const { lang, t } = useLang();
  const today = new Date().toISOString().slice(0, 10);
  const items = news
    .filter((n) => n[lang] && (!n.expires || n.expires >= today))
    .slice(0, 3);
  if (items.length === 0) return null;
  const fmt = (d) =>
    new Date(d + "T12:00:00").toLocaleDateString(t.dateLocale, {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  const resolve = (link) => {
    if (!link) return null;
    if (typeof link === "object") link = link[lang];
    if (ROUTES[link]) return ROUTES[link][lang];
    return link;
  };
  return (
    <section className="news">
      <Title title={t.home.news} />
      <div className="news-center">
        {items.map((n, i) => {
          const c = n[lang];
          const href = resolve(n.link);
          const external = href && href.startsWith("http");
          const label = `${c.linkLabel || t.home.more} →`;
          return (
            <article className="news-item" key={i}>
              <time dateTime={n.date}>{fmt(n.date)}</time>
              <h5>{c.title}</h5>
              <p>{c.text}</p>
              {href &&
                (external ? (
                  <a href={href} target="_blank" rel="noopener noreferrer" className="news-link">{label}</a>
                ) : (
                  <Link to={href} className="news-link">{label}</Link>
                ))}
            </article>
          );
        })}
      </div>
    </section>
  );
}
