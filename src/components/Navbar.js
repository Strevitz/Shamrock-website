import React, { useState } from "react";
import logo from "../images/logo_white.png";
import { HamburgerCollapse } from "react-animated-burgers";
import { Link, NavLink } from "react-router-dom";
import { useLang, switchPath } from "../i18n";

const active = { fontWeight: "bold", color: "#40d181" };
const KEYS = ["home", "team", "booking", "media", "friends", "contact"];

export default function Navbar() {
  const [isActive, setActive] = useState(false);
  const { lang, t, to, location } = useLang();
  const other = lang === "en" ? "pl" : "en";
  const close = () => setActive(false);
  return (
    <nav className="navbar">
      <div className="nav-center">
        <div className="nav-header">
          <Link to={to("home")}>
            <img src={logo} alt="Shamrock Barber Shop" />
          </Link>
          <div className="nav-header-right">
            <Link
              to={switchPath(location.pathname, other)}
              className="lang-switch lang-switch--mobile"
              hrefLang={other}
              title={t.langSwitchLabel}
              onClick={close}
            >
              {t.langSwitch}
            </Link>
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
            <Link
              to={switchPath(location.pathname, other)}
              className="lang-switch"
              hrefLang={other}
              title={t.langSwitchLabel}
            >
              {t.langSwitch}
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
