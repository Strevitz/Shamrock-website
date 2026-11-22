import React, { useState, useEffect, useCallback } from "react";
import Hero from "../components/Hero";
import Banner from "../components/Banner";
import insta1 from "../images/insta1.jpg";
import insta2 from "../images/insta2.jpg";
import insta3 from "../images/insta3.jpg";
import insta4 from "../images/insta4.jpg";
import g01 from "../images/gallery/shamrock-01.jpg";
import g01s from "../images/gallery/shamrock-01-sm.jpg";
import g02 from "../images/gallery/shamrock-02.jpg";
import g02s from "../images/gallery/shamrock-02-sm.jpg";
import g03 from "../images/gallery/shamrock-03.jpg";
import g03s from "../images/gallery/shamrock-03-sm.jpg";
import g04 from "../images/gallery/shamrock-04.jpg";
import g04s from "../images/gallery/shamrock-04-sm.jpg";
import g05 from "../images/gallery/shamrock-05.jpg";
import g05s from "../images/gallery/shamrock-05-sm.jpg";
import g06 from "../images/gallery/shamrock-06.jpg";
import g06s from "../images/gallery/shamrock-06-sm.jpg";
import g07 from "../images/gallery/shamrock-07.jpg";
import g07s from "../images/gallery/shamrock-07-sm.jpg";
import g08 from "../images/gallery/shamrock-08.jpg";
import g08s from "../images/gallery/shamrock-08-sm.jpg";
import g09 from "../images/gallery/shamrock-09.jpg";
import g09s from "../images/gallery/shamrock-09-sm.jpg";
import Title from "../components/Title";
import Footer from "../components/Footer";
import PageMeta from "../components/PageMeta";
import { useLang } from "../i18n";

// Kolejność i kadrowanie miniatur (object-position) dobrane ręcznie.
const PHOTOS = [
  { full: g01, thumb: g01s, pos: "50% 45%" },
  { full: g02, thumb: g02s, pos: "50% 50%" },
  { full: g03, thumb: g03s, pos: "40% 40%" },
  { full: g04, thumb: g04s, pos: "60% 30%" },
  { full: g05, thumb: g05s, pos: "55% 50%" },
  { full: g06, thumb: g06s, pos: "50% 35%" },
  { full: g07, thumb: g07s, pos: "50% 55%" },
  { full: g08, thumb: g08s, pos: "50% 70%" },
  { full: g09, thumb: g09s, pos: "50% 60%" },
];

const SOCIAL = [insta4, insta3, insta2, insta1];

const Media = () => {
  const { t } = useLang();
  const [open, setOpen] = useState(null);
  const alts = t.media.photos || [];

  const close = useCallback(() => setOpen(null), []);
  const step = useCallback(
    (d) => setOpen((i) => (i === null ? i : (i + d + PHOTOS.length) % PHOTOS.length)),
    []
  );

  useEffect(() => {
    if (open === null) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, close, step]);

  // Przesunięcie palcem w podglądzie (mobile)
  const [touchX, setTouchX] = useState(null);
  const onTouchStart = (e) => setTouchX(e.touches[0].clientX);
  const onTouchEnd = (e) => {
    if (touchX === null) return;
    const dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
    setTouchX(null);
  };

  return (
    <div className="page">
      <PageMeta title={t.meta.media[0]} description={t.meta.media[1]} />
      <Hero hero="roomsHero3">
        <Banner title={t.media.title} subtitle={t.media.subtitle}></Banner>
      </Hero>

      <section className="services gallery-section">
        <Title title={t.media.gallery} />
        <ul className="gallery-grid">
          {PHOTOS.map((p, i) => (
            <li key={i} className="gallery-item">
              <button
                type="button"
                className="gallery-btn"
                onClick={() => setOpen(i)}
                aria-label={`${t.media.open}: ${alts[i] || t.media.alt}`}
              >
                <img
                  src={p.thumb}
                  alt={alts[i] || t.media.alt}
                  loading="lazy"
                  decoding="async"
                  style={{ objectPosition: p.pos }}
                />
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section className="services social-section">
        <Title title={t.media.social} />
        <ul className="social-grid">
          {SOCIAL.map((src, i) => (
            <li key={i} className="gallery-item">
              <img src={src} alt={t.media.alt} loading="lazy" decoding="async" />
            </li>
          ))}
        </ul>
        <div className="social-links">
          <a
            href="https://www.instagram.com/shamrock_barbershop/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            Instagram
          </a>
          <a
            href="https://www.facebook.com/ShamrockWarszawa/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            Facebook
          </a>
        </div>
      </section>

      {open !== null && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={alts[open] || t.media.alt}
          onClick={close}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <img
            className="lightbox-img"
            src={PHOTOS[open].full}
            alt={alts[open] || t.media.alt}
            onClick={(e) => e.stopPropagation()}
          />
          <button
            type="button"
            className="lightbox-close"
            aria-label={t.media.close}
            onClick={close}
          >
            ×
          </button>
          <button
            type="button"
            className="lightbox-nav lightbox-prev"
            aria-label={t.media.prev}
            onClick={(e) => {
              e.stopPropagation();
              step(-1);
            }}
          >
            ‹
          </button>
          <button
            type="button"
            className="lightbox-nav lightbox-next"
            aria-label={t.media.next}
            onClick={(e) => {
              e.stopPropagation();
              step(1);
            }}
          >
            ›
          </button>
          <div className="lightbox-count">
            {open + 1} / {PHOTOS.length}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Media;
