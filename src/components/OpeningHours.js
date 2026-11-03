import React from "react";
import { useLang } from "../i18n";

export default function OpeningHours({ short = false, className = "hours-table" }) {
  const { t } = useLang();
  const list = short ? t.hoursShort : t.hours;
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
