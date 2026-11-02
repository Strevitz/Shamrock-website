import React from "react";
import { Link } from "react-router-dom";
import Title from "./Title";
import news from "../data/news";

const formatDate = (d) =>
  new Date(d + "T12:00:00").toLocaleDateString("pl-PL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

export default function News() {
  const today = new Date().toISOString().slice(0, 10);
  const items = news.filter((n) => !n.expires || n.expires >= today).slice(0, 3);
  if (items.length === 0) return null;
  return (
    <section className="news">
      <Title title="Aktualności" />
      <div className="news-center">
        {items.map((n, i) => {
          const external = n.link && n.link.startsWith("http");
          return (
            <article className="news-item" key={i}>
              <time dateTime={n.date}>{formatDate(n.date)}</time>
              <h5>{n.title}</h5>
              <p>{n.text}</p>
              {n.link &&
                (external ? (
                  <a href={n.link} target="_blank" rel="noopener noreferrer" className="news-link">
                    {n.linkLabel || "więcej"} →
                  </a>
                ) : (
                  <Link to={n.link} className="news-link">
                    {n.linkLabel || "więcej"} →
                  </Link>
                ))}
            </article>
          );
        })}
      </div>
    </section>
  );
}
