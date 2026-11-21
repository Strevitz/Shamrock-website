import React from "react";
import agreement from "./agreement.json";

export default function ClubTerms({ lang }) {
  const terms = agreement[lang];
  return (
    <details className="mb-terms" id="regulamin">
      <summary>{terms.title} ({agreement.version})</summary>
      <p>{agreement.seller}<br />
        <a href={`mailto:${agreement.email}`}>{agreement.email}</a>{" · "}
        <a href={`tel:${agreement.phone.replace(/\s/g, "")}`}>{agreement.phone}</a>
      </p>
      <ul>{terms.items.map((item) => <li key={item}>{item}</li>)}</ul>
      <p><strong>{terms.formTitle}</strong><br />{terms.form}</p>
    </details>
  );
}
