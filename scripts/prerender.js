/* eslint-disable */
// Po zbudowaniu strony (npm run build) tworzy osobny plik HTML dla każdej podstrony
// z właściwym tytułem, opisem, adresem kanonicznym, hreflang, danymi strukturalnymi
// i treścią w <noscript>. Dzięki temu Google i inne wyszukiwarki widzą poprawne
// znaczniki od razu, bez uruchamiania JavaScriptu. Generuje też sitemap.xml i _redirects.
//
// Skrypt nie ma zależności – działa na zwykłym Node.js (12+).
// Jeśli coś pójdzie nie tak, kończy się bez błędu i zostawia zwykłą wersję strony.

const fs = require("fs");
const path = require("path");
const vm = require("vm");
const https = require("https");

const ORIGIN = "https://shamrockbarber.com";
const ROOT = path.join(__dirname, "..");
const BUILD = path.join(ROOT, "build");
const PAGES_DIR = "_pages"; // build/_pages/<plik>.html – cel przepisań w _redirects
const BOOKSY_URL = "https://shamrockbarbershop.booksy.com";
const PHONE = "+48 884 769 758";

// Dane usług na wypadek, gdyby Contentful nie odpowiedział podczas budowania.
const FALLBACK_SERVICES = {
  "strzyżenie": { name: "Strzyżenie Włosów", price: 120, size: 45, description: "Klasyczne i nowoczesne strzyżenia włosów krótkich, średnich i długich. W zakresie usługi zawarte jest mycie i odżywianie włosów, strzyżenie i modelowanie." },
  broda: { name: "Trymowanie Brody", price: 80, size: 30, description: "Strzyżenie, trymowanie oraz wyrównanie konturów. Zabieg z użyciem gorącego ręcznika, brzytwy oraz olejków pielęgnacyjnych." },
  komplet: { name: "Komplet - strzyżenie włosów i brody", price: 180, size: 75, description: "Klasyczne i nowoczesne fryzury męskie, strzyżenie dotyczy włosów krótkich, średnich i długich oraz strzyżenie, trymowanie oraz wyrównanie konturów brody. Zabieg z użyciem gorącego ręcznika, brzytwy oraz olejków pielęgnacyjnych." },
  "strzyżenie-maszynką": { name: "Strzyżenie Maszynką", price: 70, size: 30, description: "Strzyżenie maszynką na jednakową długość lub cieniowane długości (tzw. BUZZ CUT)." },
  "wąsy": { name: "Pielęgnacja Wąsów", price: 39, size: 15, description: "Trymowanie wąsów, wyrównanie konturów i podkręcenie wąsów na wosk." },
  "repigmentacja-brody": { name: "Repigmentacja brody", price: 80, size: 30, description: "Repigmentacja brody profesjonalnymi kosmetykami. Zabieg z użyciem gorącego ręcznika, brzytwy oraz olejków pielęgnacyjnych." },
  "apartment-neilson": { name: "Strzyżenie Ojciec i Syn (od 3 do 8 lat)", price: 180, size: 115, description: "Klasyczne i nowoczesne strzyżenia włosów krótkich, średnich i długich. W zakresie usługi zawarte jest mycie i odżywianie włosów, strzyżenie i modelowanie." },
  "apartment-bedford": { name: "Tradycyjne golenie twarzy lub głowy", price: 90, size: 45, description: "Zabieg z użyciem gorącego ręcznika, brzytwy oraz olejków pielęgnacyjnych lub dwukrotne golenie twarzy lub głowy brzytwą z użyciem gorących i zimnych ręczników wraz z pielęgnacją skóry." },
  maska: { name: "Czarna Maska Oczyszczająca", price: 39, size: 15, description: "Czarna maska oczyszczająca skórę twarzy. Relaksujący zabieg odświeżający, idealnie komponuje się z innymi naszymi usługami jak golenie twarzy." },
};

// --- i18n.js z kodu strony (bez bundlera) ---
function loadI18n() {
  let src = fs.readFileSync(path.join(ROOT, "src", "i18n.js"), "utf8");
  src = src.replace(/^import .*$/gm, "");
  src = src.replace(/^export (const|function) /gm, "$1 ");
  src += "\nmodule.exports = { LANGS, ROUTES, SERVICE_SLUGS, STRINGS, localizeService, serviceSlug };";
  const sandbox = { module: { exports: {} }, useLocation: function () {} };
  vm.runInNewContext(src, sandbox, { filename: "i18n.js" });
  return sandbox.module.exports;
}

function fetchServices() {
  const url =
    "https://cdn.contentful.com/spaces/bkegovtlyyd6/environments/master/entries" +
    "?content_type=realEstate&limit=100&access_token=K_oabpGE2Qb02cCv-b_-aCEIQgeoLRsj3UTyGQL9Z-Y";
  return new Promise(function (resolve) {
    const req = https.get(url, function (res) {
      let body = "";
      res.setEncoding("utf8");
      res.on("data", function (c) { body += c; });
      res.on("end", function () {
        try {
          const items = JSON.parse(body).items || [];
          const out = {};
          items.forEach(function (it) {
            const f = it.fields || {};
            if (f.slug) out[f.slug] = { name: f.name, price: f.price, size: f.size, description: f.description };
          });
          resolve(out);
        } catch (e) {
          resolve(null);
        }
      });
    });
    req.on("error", function () { resolve(null); });
    req.setTimeout(8000, function () { req.abort(); resolve(null); });
  });
}

// --- pomocnicze ---
const esc = (s) =>
  String(s == null ? "" : s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
const clean = (s) => String(s || "").replace(/\s+/g, " ").trim();
const abs = (p) => ORIGIN + encodeURI(p);
const jsonLd = (obj) =>
  '<script type="application/ld+json">' + JSON.stringify(obj).replace(/</g, "\\u003c") + "</script>";

function setMetaTag(html, attr, key, content) {
  const re = new RegExp("<meta " + attr + '="' + key + '"[^>]*>');
  const tag = "<meta " + attr + '="' + key + '" content="' + esc(content) + '"/>';
  return re.test(html) ? html.replace(re, tag) : html.replace("</head>", tag + "</head>");
}

async function main() {
  const indexPath = path.join(BUILD, "index.html");
  if (!fs.existsSync(indexPath)) {
    console.log("[prerender] brak build/index.html – pomijam");
    return;
  }
  const template = fs.readFileSync(indexPath, "utf8");
  const { LANGS, ROUTES, SERVICE_SLUGS, STRINGS, localizeService, serviceSlug } = loadI18n();

  let services = await fetchServices();
  const known = Object.keys(SERVICE_SLUGS);
  if (!services || !known.every((k) => services[k])) {
    console.log("[prerender] Contentful niedostępny – używam zapisanych danych usług");
    services = Object.assign({}, FALLBACK_SERVICES, services || {});
  }

  const pageKeys = ["home", "team", "booking", "media", "friends", "contact", "membership", "privacy"];
  const routes = [];

  pageKeys.forEach((key) => {
    LANGS.forEach((lang) => {
      const alt = {};
      LANGS.forEach((l) => (alt[l] = ROUTES[key][l]));
      routes.push({ kind: "page", key, lang, path: ROUTES[key][lang], alt });
    });
  });
  known.forEach((slug) => {
    LANGS.forEach((lang) => {
      const alt = {};
      LANGS.forEach((l) => (alt[l] = ROUTES.booking[l] + "/" + serviceSlug(slug, l)));
      routes.push({ kind: "service", key: slug, lang, path: alt[lang], alt });
    });
  });

  const outDir = path.join(BUILD, PAGES_DIR);
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);

  const today = new Date().toISOString().slice(0, 10);
  const redirects = [];
  const sitemap = [];

  routes.forEach((r, idx) => {
    const t = STRINGS[r.lang];
    let title, desc, h1, body, crumbs, extraLd = [];
    const homeUrl = abs(ROUTES.home[r.lang]);

    if (r.kind === "page") {
      if (r.key === "home") {
        title = t.meta.siteTitle;
        desc = t.meta.desc;
        h1 = t.home.title;
        body =
          "<p>" + esc(t.home.subtitle) + "</p>" +
          "<h2>" + esc(t.home.local.title) + "</h2>" +
          t.home.local.text.map((p) => "<p>" + esc(p) + "</p>").join("");
        crumbs = [[t.nav.home, homeUrl]];
        extraLd.push({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "@id": ORIGIN + "/#website",
          url: ORIGIN + "/",
          name: "Shamrock Barber Shop",
          inLanguage: ["pl", "en", "uk"],
          publisher: { "@id": ORIGIN + "/#barbershop" },
        });
      } else {
        const m = t.meta[r.key];
        title = m[0] + " | " + t.meta.suffix;
        desc = m[1];
        const sec = { team: t.team, booking: t.bookingPage, media: t.media, friends: t.friends, contact: t.contact }[r.key];
        h1 = sec ? sec.title : m[0];
        body = "<p>" + esc(desc) + "</p>";
        if (r.key === "booking") {
          body += "<ul>" + known.map((slug) => {
            const s = localizeService(Object.assign({ slug }, services[slug]), r.lang);
            const href = ROUTES.booking[r.lang] + "/" + serviceSlug(slug, r.lang);
            return '<li><a href="' + esc(encodeURI(href)) + '">' + esc(clean(s.name)) + "</a> – " + esc(s.price) + " " + esc(t.currency) + ", " + esc(s.size) + " " + esc(t.min) + "</li>";
          }).join("") + "</ul>";
        }
        crumbs = [[t.nav.home, homeUrl], [h1, abs(r.path)]];
      }
    } else {
      const s = localizeService(Object.assign({ slug: r.key }, services[r.key]), r.lang);
      const name = clean(s.name);
      const pair = t.meta.service(name, s.price, s.size);
      title = pair[0] + " | " + t.meta.suffix;
      desc = pair[1];
      h1 = name;
      body =
        "<p>" + esc(clean(s.description)) + "</p>" +
        "<p>" + esc(t.service.price) + ": " + esc(s.price) + " " + esc(t.currency) + " · " + esc(t.service.time) + ": " + esc(s.size) + " " + esc(t.min) + "</p>";
      crumbs = [[t.nav.home, homeUrl], [t.nav.booking, abs(ROUTES.booking[r.lang])], [name, abs(r.path)]];
      extraLd.push({
        "@context": "https://schema.org",
        "@type": "Service",
        name: name,
        description: clean(s.description),
        serviceType: name,
        url: abs(r.path),
        areaServed: { "@type": "City", name: "Warszawa" },
        provider: { "@id": ORIGIN + "/#barbershop" },
        offers: {
          "@type": "Offer",
          price: String(s.price),
          priceCurrency: "PLN",
          url: BOOKSY_URL,
          availability: "https://schema.org/InStock",
        },
      });
    }

    if (crumbs.length > 1) {
      extraLd.push({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: crumbs.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: clean(c[0]), item: c[1] })),
      });
    }

    const canonical = abs(r.path);
    const links =
      '<link rel="canonical" href="' + canonical + '"/>' +
      LANGS.map((l) => '<link rel="alternate" hreflang="' + l + '" href="' + abs(r.alt[l]) + '"/>').join("") +
      '<link rel="alternate" hreflang="x-default" href="' + abs(r.alt.pl) + '"/>';

    const nav = pageKeys
      .filter((k) => k !== "privacy")
      .map((k) => '<a href="' + esc(encodeURI(ROUTES[k][r.lang])) + '">' + esc(t.nav[k]) + "</a>")
      .join(" · ");
    const noscript =
      "<noscript><div style=\"padding:2rem;max-width:760px;margin:0 auto\">" +
      "<h1>" + esc(h1) + "</h1>" + body +
      "<p>Shamrock Barber Shop · " + esc(t.addressLine) + " · <a href=\"tel:+48884769758\">" + PHONE + "</a> · <a href=\"" + BOOKSY_URL + "\">Booksy</a></p>" +
      "<p>" + nav + "</p></div></noscript>";

    let html = template;
    html = html.replace(/<html lang="[^"]*"/, '<html lang="' + r.lang + '"');
    html = html.replace(/<title>[\s\S]*?<\/title>/, "<title>" + esc(title) + "</title>");
    html = setMetaTag(html, "name", "description", desc);
    html = setMetaTag(html, "property", "og:title", title);
    html = setMetaTag(html, "property", "og:description", desc);
    html = setMetaTag(html, "property", "og:url", canonical);
    html = setMetaTag(html, "property", "og:locale", t.ogLocale);
    if (r.kind === "page" && r.key === "membership") {
      html = setMetaTag(html, "property", "og:image", ORIGIN + "/og-klub.jpg");
      html = setMetaTag(html, "name", "twitter:image", ORIGIN + "/og-klub.jpg");
    }
    html = html.replace("</head>", links + extraLd.map(jsonLd).join("") + "</head>");
    html = html.replace(/<noscript>[\s\S]*?<\/noscript>/, noscript);

    const file = r.path === "/" ? "index.html" : PAGES_DIR + "/" + idx + ".html";
    fs.writeFileSync(path.join(BUILD, file), html);

    if (r.path !== "/") {
      const encoded = encodeURI(r.path);
      redirects.push(encoded + "  /" + file + "  200");
      if (encoded !== r.path) redirects.push(r.path + "  /" + file + "  200");
    }

    sitemap.push(
      "  <url><loc>" + canonical + "</loc><lastmod>" + today + "</lastmod>" +
      LANGS.map((l) => '<xhtml:link rel="alternate" hreflang="' + l + '" href="' + abs(r.alt[l]) + '"/>').join("") +
      '<xhtml:link rel="alternate" hreflang="x-default" href="' + abs(r.alt.pl) + '"/></url>'
    );
  });

  // _redirects: najpierw konkretne podstrony, na końcu dotychczasowa reguła SPA.
  fs.writeFileSync(
    path.join(BUILD, "_redirects"),
    "# Wygenerowane przez scripts/prerender.js\n" +
      redirects.join("\n") +
      "\n/*    /index.html   200\n"
  );

  fs.writeFileSync(
    path.join(BUILD, "sitemap.xml"),
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
      '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n' +
      sitemap.join("\n") +
      "\n</urlset>\n"
  );

  console.log("[prerender] gotowe: " + routes.length + " podstron, sitemap i _redirects zaktualizowane");
}

main().catch(function (e) {
  console.log("[prerender] błąd – zostawiam zwykłą wersję strony:", e && e.message);
});
