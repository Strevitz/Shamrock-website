import React from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo_green.png";
import sassy from "../images/sassy logo3.jpg";
import iconInstagram from "../images/icon-instagram.svg";
import iconFacebook from "../images/icon-facebook.svg";
import OpeningHours from "./OpeningHours";
import {
  ADDRESS_LINE,
  MAPS_DIRECTIONS_URL,
  BOOKSY_URL,
  WHATSAPP_URL,
  PHONE_HREF,
  PHONE_DISPLAY,
  EMAIL,
  INSTAGRAM_URL,
  FACEBOOK_URL,
} from "../siteInfo";
import { useLang } from "../i18n";

const resetCookies = () => {
  try {
    window.localStorage.removeItem("shamrock-cookie-consent");
  } catch (e) {}
  window.location.reload();
};

export default function Footer() {
  const { lang, t, to } = useLang();
  const f = t.footer;
  return (
    <footer>
      <div className={"container mx-5"}>
        <div className={"row"}>
          <div className={"col-md-6 col-sm-12"}>
            <div className={"widget__item"}>
              <div className={"logo"}>
                <Link to={to("home")} title={f.home}>
                  <img alt={"Shamrock Barber Shop"} src={logo} style={{ width: "10rem" }} />
                </Link>
              </div>
              <div className={"about"}>
                <p>
                  <a href={MAPS_DIRECTIONS_URL} target="_blank" rel="noopener noreferrer">
                    {lang === "en" ? "Widok 10, 00-023 Warsaw, Poland" : ADDRESS_LINE}
                  </a>
                </p>
                <OpeningHours short className="footer-hours" />
                <a href={BOOKSY_URL} target="_blank" rel="noopener noreferrer" className="btn-primary footer-book">
                  {t.bookOnline}
                </a>
              </div>
            </div>
          </div>

          <div className={"col-md-3 col-sm-12"}>
            <div className={"widget__item"}>
              <div className={"links"}>
                <h4>{f.customer}</h4>
                <ul>
                  <li><Link to={to("booking")}>{t.nav.booking}</Link></li>
                  <li><Link to={to("contact")}>{t.nav.contact}</Link></li>
                  <li><Link to={to("privacy")}>{f.privacy}</Link></li>
                  <li>
                    <a href={PHONE_HREF}>
                      {f.phone} {lang === "en" ? "+48 " : ""}{PHONE_DISPLAY}
                    </a>
                  </li>
                  <li><a href={`mailto:${EMAIL}`}>{EMAIL}</a></li>
                  <li>
                    <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">WhatsApp</a>
                  </li>
                  <li>
                    <button type="button" className="link-button" onClick={resetCookies}>
                      {f.cookies}
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className={"col-md-3 col-sm-12"}>
            <div className={"widget__item"}>
              <div className={"social"}>
                <a href={INSTAGRAM_URL} target={"_blank"} rel="noopener noreferrer" title={"Instagram"}>
                  <img alt={"Instagram"} src={iconInstagram} />
                </a>
                <a href={FACEBOOK_URL} target={"_blank"} rel="noopener noreferrer" title={"Facebook"}>
                  <img alt={"Facebook"} src={iconFacebook} />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className={"copyright"}>
          <img className="sassy" src={sassy} alt="Sassy Company" />
          <p>
            &copy; {new Date().getFullYear()} Sassy Company <br />
            <br />
            <a href="mailto:contact@sassy.company">{f.rights}</a>
            {f.rightsEnd}
          </p>
        </div>
      </div>
    </footer>
  );
}
