import React from "react";
import { FaPhoneAlt, FaCalendarCheck, FaFacebookMessenger } from "react-icons/fa";
import { PHONE_HREF, BOOKSY_URL, MESSENGER_URL } from "../siteInfo";

// Pasek szybkich akcji przyklejony do dołu ekranu (widoczny na telefonach).
export default function ActionBar() {
  return (
    <div className="action-bar" role="navigation" aria-label="Szybki kontakt">
      <a href={PHONE_HREF} className="action-bar__item">
        <FaPhoneAlt aria-hidden="true" />
        <span>Zadzwoń</span>
      </a>
      <a
        href={BOOKSY_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="action-bar__item action-bar__item--main"
      >
        <FaCalendarCheck aria-hidden="true" />
        <span>Rezerwuj</span>
      </a>
      <a
        href={MESSENGER_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="action-bar__item"
      >
        <FaFacebookMessenger aria-hidden="true" />
        <span>Napisz</span>
      </a>
    </div>
  );
}
