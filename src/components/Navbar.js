import React, { useState } from "react";
import logo from "../images/logo_white.png";
import { HamburgerCollapse } from "react-animated-burgers";
import { Link, NavLink } from "react-router-dom";
import { useLang, switchPath, LANGS, LANG_LABELS } from "../i18n";

const active = { fontWeight: "bold", color: "#40d181" };
const KEYS = ["home", "team", "booking", "media", "friends", "contact", "membership"];

function LangSwitch({ lang, pathname, className, onClick }) {
  return (
    <div className={`lang-switcher ${className || ""}`} role="group" aria-label="Język / Language / Мова">
      {LANGS.map((l) => (
        <Link
          key={l}
          to={switchPath(pathname, l)}
          className={l === lang ? "lang-switch lang-switch--active" : "lang-switch"}
          hrefLang={l}
          lang={l}
          title={LANG_LABELS[l].name}
          aria-current={l === lang ? "true" : undefined}
          onClick={onClick}
        >
          {LANG_LABELS[l].short}
        </Link>
      ))}
    </div>
  );
}

export default function Navbar() {
  const [isActive, setActive] = useState(false);
  const { lang, t, to, location } = useLang();
  const close = () => setActive(false);
  return (
    <nav className="navbar">
      <div className="nav-center">
        <div className="nav-header">
          <Link to={to("home")}>
            <img src={logo} alt="Shamrock Barber Shop" />
          </Link>
          <div className="nav-header-right">
            <LangSwitch
              lang={lang}
              pathname={location.pathname}
              className="lang-switcher--mobile"
              onClick={close}
            />
            <button type="button" className="nav-btn">
              <HamburgerCollapse
                isActive={isActive}
                toggleButton={() => setActive(!isActive)}
                buttonColor="transparent"
                barColor="#fff"
                buttonWidth={26}
              />
            </button>
          </div>
        </div>
        <ul className={isActive ? "nav-links show-nav" : "nav-links"}>
          {KEYS.map((key) => (
            <li key={key} onClick={close}>
              <NavLink to={to(key)} exact activeStyle={active}>
                {t.nav[key]}
              </NavLink>
            </li>
          ))}
          <li className="lang-item">
            <LangSwitch lang={lang} pathname={location.pathname} />
          </li>
        </ul>
      </div>
    </nav>
  );
}
