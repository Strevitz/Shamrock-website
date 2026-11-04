import { useEffect } from "react";
import { useLang, switchPath, LANGS } from "../i18n";

const ORIGIN = "https://shamrockbarber.com";

function setLink(rel, href, hreflang) {
  const sel = hreflang
    ? `link[rel="${rel}"][hreflang="${hreflang}"]`
    : `link[rel="${rel}"]:not([hreflang])`;
  let el = document.querySelector(sel);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    if (hreflang) el.setAttribute("hreflang", hreflang);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

function setMeta(attr, key, content) {
  let el = document.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

export default function PageMeta({ title, description }) {
  const { lang, t, location } = useLang();
  useEffect(() => {
    document.documentElement.setAttribute("lang", lang);
    const desc = description || t.meta.desc;
    document.title = title ? `${title} | ${t.meta.suffix}` : t.meta.siteTitle;
    setMeta("name", "description", desc);
    setMeta("property", "og:title", document.title);
    setMeta("property", "og:description", desc);
    setMeta("property", "og:locale", t.ogLocale);
    const path = location.pathname;
    const url = (l) => ORIGIN + encodeURI(switchPath(path, l));
    setLink("canonical", url(lang));
    LANGS.forEach((l) => setLink("alternate", url(l), l));
    setLink("alternate", url("pl"), "x-default");
  }, [title, description, lang, t, location.pathname]);
  return null;
}
