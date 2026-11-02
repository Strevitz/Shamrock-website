import { useEffect } from "react";

const DEFAULT_DESC =
  "Shamrock Barber Shop – barbershop w centrum Warszawy, ul. Widok 10 obok Rotundy. Strzyżenie męskie, broda, golenie brzytwą z gorącym ręcznikiem. Rezerwacja online przez Booksy lub tel. 884 769 758.";

export default function PageMeta({ title, description }) {
  useEffect(() => {
    document.title = title
      ? `${title} | Shamrock Barber Shop Warszawa`
      : "Shamrock Barber Shop – barber Warszawa Centrum, ul. Widok 10";
    let tag = document.querySelector('meta[name="description"]');
    if (!tag) {
      tag = document.createElement("meta");
      tag.setAttribute("name", "description");
      document.head.appendChild(tag);
    }
    tag.setAttribute("content", description || DEFAULT_DESC);
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", "https://shamrockbarber.com" + window.location.pathname);
  }, [title, description]);
  return null;
}
