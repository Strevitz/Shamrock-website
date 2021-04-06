import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo_green.png";
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
                      <Link to="/about" title={"Rezerwacje"}>
                        Rezerwacje
                      </Link>
                    </li>
                    <li>
                      <Link to="/contact" title={"Kontakt"}>
                        Kontakt
                      </Link>
                    </li>
                    <li>
                      <Link to="/privacy" title={"Polityka Prywatności"}>
                        Polityka Prywatności
                      </Link>
                    </li>
                    <li>
                      <a href="tel:+48600090715" title={"Numer telefonu"}>
                        tel. 600 090 715
                      </a>
                    </li>
                    <li>
                      <a href="mailto:shamrock@email.com" title={"e-mail"}>
                        shamrock@email.com
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
                    href="https://www.instagram.com"
                    target={"_blank"}
                    rel="noopener noreferrer"
                    title={"Instagram"}
                  >
                    <img alt={"Instagram"} src={iconInstagram} />
                  </a>

                  <a
                    href="https://www.facebook.com"
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
            <p>
              Copyright {new Date().getFullYear()}, {` `}{" "}
              <a
                href="https://strzewiczek.pl"
                title={"Własność Arthur Strzewiczek"}
              >
                Shamrock Barber Shop Arthur Strzewiczek
              </a>
              . Wszystkie prawa zastrzeżone.
            </p>
          </div>
        </div>
      </footer>
    );
  }
}
