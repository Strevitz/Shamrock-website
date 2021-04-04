import React from "react";
import loadingGif from "../images/gif/barberpole.gif";

export default function Loading() {
  return (
    <div className="loading">
      <h4>Ładowanie zawartości strony...</h4>
      <img src={loadingGif} alt="ładowanie" />
    </div>
  );
}
