import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLang } from "../i18n";

const KEY = "shamrock-cookie-consent";
const PIXEL_ID = "361683365283084";

function loadPixel() {
  if (window.fbq) return;
  /* eslint-disable */
  !(function (f, b, e, v, n, t, s) {
    if (f.fbq) return;
    n = f.fbq = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    };
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = !0;
    n.version = "2.0";
    n.queue = [];
    t = b.createElement(e);
    t.async = !0;
    t.src = v;
    s = b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t, s);
  })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
  /* eslint-enable */
  window.fbq("init", PIXEL_ID);
  window.fbq("track", "PageView");
}

// Baner zgody na pliki cookies – Facebook Pixel uruchamia się dopiero po akceptacji (RODO).
export default function CookieConsent() {
  const { t, to } = useLang();
  const [choice, setChoice] = useState(() => {
    try {
      return window.localStorage.getItem(KEY);
    } catch (e) {
      return null;
    }
  });

  useEffect(() => {
    if (choice === "granted") loadPixel();
  }, [choice]);

  const save = (value) => {
    try {
      window.localStorage.setItem(KEY, value);
    } catch (e) {}
    setChoice(value);
  };

  if (choice) return null;

  return (
    <div className="cookie-banner" role="dialog" aria-label={t.cookie.aria}>
      <p>
        {t.cookie.text} <Link to={to("privacy")}>{t.cookie.link}</Link>.
      </p>
      <div className="cookie-banner__buttons">
        <button type="button" className="cookie-btn cookie-btn--ghost" onClick={() => save("denied")}>
          {t.cookie.deny}
        </button>
        <button type="button" className="cookie-btn" onClick={() => save("granted")}>
          {t.cookie.accept}
        </button>
      </div>
    </div>
  );
}
