import React, { Component } from "react";
import Title from "./Title";
import { FaCut, FaGamepad, FaSearchLocation, FaMugHot } from "react-icons/fa";

export default class Services extends Component {
  state = {
    services: [
      {
        icon: <FaCut />,
        title: "Pasja",
        info:
          "Praca to dla nas styl życia, który praktykujemy od lat i cały czas podnosimy umiejętności dla Was. Specjalizujemy się w tradycyjnych cięciach jak i w modern barbering. Zapraszamy również na relaksujące golenie z gorącym ręcznikiem.",
      },
      {
        icon: <FaSearchLocation />,
        title: "Lokalizacja",
        info:
          "Shamrock Barber Shop zlokalizowany jest w samym sercu Warszawy przy ul. WIDOK 10 obok Rotundy. Wszystkie drogi prowadzą do nas!",
      },
      {
        icon: <FaGamepad />,
        title: "Czekając na serwis",
        info:
          "Koniec z nudą podczas czekania na swoją kolej! W naszym shopie zagrasz w najnowsze gry wideo na streamingowej platformie Google Stadia. Możesz również zabrać znajomych i zagrać w gry planszowe w dostosowanej dla Was przestrzeni.",
      },
      {
        icon: <FaMugHot />,
        title: "Napoje",
        info:
          "Spragniony podczas wizyty w Shamrocku? Dla naszych gości podajemy pyszną kawę, whiskey i piwo bezalkoholowe dla zmotoryzowanych.",
      },
    ],
  };

  render() {
    return (
      <section className="services">
        <Title title="O nas"></Title>
        <div className="services-center">
          {this.state.services.map((item, index) => {
            return (
              <article key={index} className="service">
                <span>{item.icon}</span>
                <h6>{item.title}</h6>
                <p>{item.info}</p>
              </article>
            );
          })}
        </div>
      </section>
    );
  }
}
