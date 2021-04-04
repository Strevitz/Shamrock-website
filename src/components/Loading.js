import React from "react";
import loadingGif from "../images/gif/green.gif";

export default function Loading() {
  return (
    <div className="loading">
      <h4>Ładowanie zawartości strony...</h4>
      <img className="greenload" src={loadingGif} alt="ładowanie" />
    </div>
  );
}
