import React, { useContext } from "react";
import { RoomContext } from "../context";
import Loading from "./Loading";
import Apartment from "./Apartment";
import Title from "./Title";
import { useLang } from "../i18n";

export default function CurrentOffers() {
  const { loading, featuredRooms } = useContext(RoomContext);
  const { t } = useLang();
  return (
    <section className="featured-rooms">
      <Title title={t.home.services} />
      <div className="featured-rooms-center">
        {loading ? <Loading /> : featuredRooms.map((room) => <Apartment key={room.id} room={room} />)}
      </div>
    </section>
  );
}
