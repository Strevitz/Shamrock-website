import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo_green.png";
import sassy from "../images/sassy logo3.jpg";
import iconInstagram from "../images/icon-instagram.svg";
import iconFacebook from "../images/icon-facebook.svg";

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
                  <p>ul. Widok 10, 00-023 Warszawa</p>
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
                      <a href="tel:+48884769758" title={"Numer telefonu"}>
                        tel. 884 769 758
                      </a>
                    </li>
                    <li>
                      <a href="mailto:info@shamrockbarber.com" title={"e-mail"}>
                        info@shamrockbarber.com
                      </a>
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
            <img className="sassy" src={sassy} alt="A Plant Company" />
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
