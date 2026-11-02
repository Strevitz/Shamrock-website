import React, { Component } from "react";
import Title from "./Title";
import { FaCut, FaCalendarCheck, FaSearchLocation, FaMugHot } from "react-icons/fa";

export default class Services extends Component {
  state = {
    services: [
      {
        icon: <FaCut />,
        title: "Pasja",
        info:
          "Praca to dla nas styl życia, który praktykujemy od lat i cały czas podnosimy umiejętności dla Ciebie. Specjalizujemy się w tradycyjnych cięciach jak i w modern barbering. Zapraszamy również na relaksujące golenie z gorącym ręcznikiem.",
      },
      {
        icon: <FaSearchLocation />,
        title: "Lokalizacja",
        info:
          "Shamrock Barber Shop zlokalizowany jest w samym sercu Warszawy przy ul. Widok 10, obok Rotundy i kilka minut od metra Centrum. Wszystkie drogi prowadzą do nas!",
      },
      {
        icon: <FaMugHot />,
        title: "Napoje",
        info:
          "Spragniony podczas wizyty w Shamrocku? Dla naszych gości podajemy pyszną kawę, whiskey i piwo bezalkoholowe dla zmotoryzowanych.",
      },
      {
        icon: <FaCalendarCheck />,
        title: "Rezerwacja w minutę",
        info:
          "Wolne terminy sprawdzisz online przez Booksy o każdej porze. Wolisz porozmawiać? Zadzwoń lub napisz na Messengerze – chętnie doradzimy.",
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
