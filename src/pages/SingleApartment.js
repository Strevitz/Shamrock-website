import React, { Component } from "react";
import defaultBg from "../images/room-1.jpeg";
//import Hero from "../components/Hero";
import Banner from "../components/Banner";
import { Link } from "react-router-dom";
import { RoomContext } from "../context";
import StyledHero from "../components/StyledHero";
import Footer from "../components/Footer";
import PageMeta from "../components/PageMeta";
import { BOOKSY_URL, PHONE_HREF, PHONE_DISPLAY, realSlug } from "../siteInfo";

export default class SingleApartment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slug: realSlug(this.props.match.params.slug),
      defaultBg,
    };
  }
  static contextType = RoomContext;
  componentDidMount() {}

  render() {
    const { getRoom } = this.context;
    const room = getRoom(this.state.slug);
    if (!room) {
      return (
        <div className="error">
          <h3>
            strona ładuje się dłużej niż zwykle, zrelaksuj się i zarezerwuj
            wizytę...
          </h3>
          <a href={BOOKSY_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">
            rezerwuj teraz
          </a>
        </div>
      );
    }
    const {
      name,
      description,

      size,
      price,

      images,
    } = room;

    const [mainImg, ...defaultImg] = images;

    return (
      <div className="page">
        <PageMeta
          title={`${name} – ${price} zł`}
          description={`${name} w Shamrock Barber Shop Warszawa (ul. Widok 10). Cena ${price} zł, czas ok. ${size} min. Zarezerwuj online przez Booksy.`}
        />
        <StyledHero img={mainImg || this.state.defaultBg}>
          <Banner title={`${name}`} subtitle={`${price} zł · ${size} min`}>
            <div className="hero-buttons">
              <a href={BOOKSY_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">
                rezerwuj teraz
              </a>
              <a href={PHONE_HREF} className="btn-primary btn-outline">
                zadzwoń {PHONE_DISPLAY}
              </a>
            </div>
          </Banner>
        </StyledHero>
        <section className="single-room">
          <div className="single-room-images">
            {defaultImg.map((item, index) => {
              return <img key={index} src={item} alt={name} />;
            })}
          </div>
          <div className="single-room-info">
            <article className="desc">
              <h3>szczegóły</h3>
              <p>{description}</p>
            </article>
            <article className="info">
              <h3>informacje</h3>
              <h6>cena : {price}PLN</h6>
              <h6>czas : {size}min</h6>
              <a href={BOOKSY_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">
                rezerwuj online
              </a>
              <br />
              <Link to="/rezerwacje" className="see-all">
                zobacz pełny cennik →
              </Link>
            </article>
          </div>
        </section>

        <Footer />
      </div>
    );
  }
}
