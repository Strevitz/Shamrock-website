import React from "react";
import { FaPhoneAlt, FaCalendarCheck, FaWhatsapp } from "react-icons/fa";
import { PHONE_HREF, BOOKSY_URL, WHATSAPP_URL } from "../siteInfo";
import { useLang } from "../i18n";

// Pasek szybkich akcji przyklejony do dołu ekranu (widoczny na telefonach).
export default function ActionBar() {
  const { t } = useLang();
  return (
    <div className="action-bar" role="navigation" aria-label={t.bar.aria}>
      <a href={PHONE_HREF} className="action-bar__item">
        <FaPhoneAlt aria-hidden="true" />
        <span>{t.bar.call}</span>
      </a>
      <a href={BOOKSY_URL} target="_blank" rel="noopener noreferrer" className="action-bar__item action-bar__item--main">
        <FaCalendarCheck aria-hidden="true" />
        <span>{t.bar.book}</span>
      </a>
      <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="action-bar__item">
        <FaWhatsapp aria-hidden="true" />
        <span>WhatsApp</span>
      </a>
    </div>
  );
}
