import React, { Component } from "react";
import defaultBg from "../images/room-1.jpeg";
//import Hero from "../components/Hero";
import Banner from "../components/Banner";
import { Link } from "react-router-dom";
import { RoomContext } from "../context";
import StyledHero from "../components/StyledHero";
import Footer from "../components/Footer";

export default class SingleApartment extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    this.state = {
      slug: this.props.match.params.slug,
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
          <Link to="/rezerwacje" className="btn-primary">
            rezerwuj teraz
          </Link>
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
        <StyledHero img={mainImg || this.state.defaultBg}>
          <Banner title={`${name}`}>
            <Link to="/rezerwacje" className="btn-primary">
              rezerwuj teraz
            </Link>
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
            </article>
          </div>
        </section>

        <Footer />
      </div>
    );
  }
}
