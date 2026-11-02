import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo_green.png";
import sassy from "../images/sassy logo3.jpg";
import iconInstagram from "../images/icon-instagram.svg";
import iconFacebook from "../images/icon-facebook.svg";
import OpeningHours from "./OpeningHours";
import {
  OPENING_HOURS_SHORT,
  ADDRESS_LINE,
  MAPS_DIRECTIONS_URL,
  BOOKSY_URL,
  MESSENGER_URL,
  PHONE_HREF,
  PHONE_DISPLAY,
  EMAIL,
} from "../siteInfo";

const resetCookies = () => {
  try {
    window.localStorage.removeItem("shamrock-cookie-consent");
  } catch (e) {}
  window.location.reload();
};

export default class Footer extends Component {
  render() {
    return (
      <footer>
        <div className={"container mx-5"}>
          <div className={"row"}>
            <div className={"col-md-6 col-sm-12"}>
              <div className={"widget__item"}>
                <div className={"logo"}>
                  <Link to="/" title={"Strona główna"}>
                    <img alt={"Logo"} src={logo} style={{ width: "10rem" }} />
                  </Link>
                </div>

                <div className={"about"}>
                  <p>
                    <a href={MAPS_DIRECTIONS_URL} target="_blank" rel="noopener noreferrer">
                      {ADDRESS_LINE}
                    </a>
                  </p>
                  <OpeningHours list={OPENING_HOURS_SHORT} className="footer-hours" />
                  <a href={BOOKSY_URL} target="_blank" rel="noopener noreferrer" className="btn-primary footer-book">
                    rezerwuj online
                  </a>
                </div>
              </div>
            </div>

            <div className={"col-md-3 col-sm-12"}>
              <div className={"widget__item"}>
                <div className={"links"}>
                  <h4>Obsługa Klienta</h4>
                  <ul>
                    <li>
                      <Link to="/rezerwacje" title={"Rezerwacje"}>
                        Rezerwacje
                      </Link>
                    </li>
                    <li>
                      <Link to="/kontakt" title={"Kontakt"}>
                        Kontakt
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/polityka-prywatności"
                        title={"Polityka Prywatności"}
                      >
                        Polityka Prywatności
                      </Link>
                    </li>
                    <li>
                      <a href={PHONE_HREF} title={"Numer telefonu"}>
                        tel. {PHONE_DISPLAY}
                      </a>
                    </li>
                    <li>
                      <a href={`mailto:${EMAIL}`} title={"e-mail"}>
                        {EMAIL}
                      </a>
                    </li>
                    <li>
                      <a href={MESSENGER_URL} target="_blank" rel="noopener noreferrer">
                        Messenger
                      </a>
                    </li>
                    <li>
                      <button type="button" className="link-button" onClick={resetCookies}>
                        Ustawienia cookies
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className={"col-md-3 col-sm-12"}>
              <div className={"widget__item"}>
                <div className={"social"}>
                  <a
                    href="https://www.instagram.com/shamrock_barbershop"
                    target={"_blank"}
                    rel="noopener noreferrer"
                    title={"Instagram"}
                  >
                    <img alt={"Instagram"} src={iconInstagram} />
                  </a>

                  <a
                    href="https://www.facebook.com/ShamrockWarszawa"
                    target={"_blank"}
                    rel="noopener noreferrer"
                    title={"Facebook"}
                  >
                    <img alt={"Facebook"} src={iconFacebook} />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className={"copyright"}>
            <img className="sassy" src={sassy} alt="Sassy Company" />
            <p>
              &copy; {new Date().getFullYear()} Sassy Company {` `} <br />
              <br />
              <a
                href="mailto:contact@sassy.company"
                title={"Własność Sassy Company"}
              >
                Shamrock Barber Shop ® i produkty Shamrock Barber Shop ® są
                zarejestrowanymi znakami towarowymi firmy Sassy Company Arthur
                Oliver Strzewiczek
              </a>
              . Wszystkie prawa zastrzeżone.
            </p>
          </div>
        </div>
      </footer>
    );
  }
}
