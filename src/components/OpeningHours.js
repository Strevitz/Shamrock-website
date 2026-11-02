import React from "react";
import { OPENING_HOURS } from "../siteInfo";

export default function OpeningHours({ list = OPENING_HOURS, className = "hours-table" }) {
  return (
    <table className={className}>
      <tbody>
        {list.map((row) => (
          <tr key={row.day}>
            <td>{row.day}</td>
            <td>{row.hours}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
