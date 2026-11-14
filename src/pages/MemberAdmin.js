import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import PageMeta from "../components/PageMeta";
import { useLang } from "../i18n";
import { MEMBERSHIP } from "../membership/strings";
import { rest, useSession } from "../membership/supabase";
import "../membership/membership.css";

const fmt = (iso) => (iso ? new Date(iso).toLocaleDateString("pl-PL") : "–");
const isActive = (s) => s === "active" || s === "trialing";

export default function MemberAdmin() {
  const { lang, t } = useLang();
  const m = MEMBERSHIP[lang];
  const a = m.adm;
  const session = useSession();
  const prefix = lang === "pl" ? "" : lang === "uk" ? "/ua" : "/en";
  const [me, setMe] = useState(null);
  const [rows, setRows] = useState([]);
  const [requests, setRequests] = useState([]);
  const [q, setQ] = useState(new URLSearchParams(window.location.search).get("c") || "");
  const [result, setResult] = useState(null);
  const [searched, setSearched] = useState(false);

  const load = useCallback(async () => {
    if (!session) return;
    try {
      const [p] = await rest(`profiles?id=eq.${session.user.id}&select=role`);
      setMe(p || { role: "member" });
      if (p && (p.role === "admin" || p.role === "barber")) {
        setRows(await rest("profiles?select=id,full_name,email,phone,member_code,role,memberships(status,current_period_end)&order=created_at.desc&limit=500"));
        setRequests(await rest("concierge_requests?select=*,profiles(full_name,phone,member_code)&order=created_at.desc&limit=30"));
      }
    } catch (e) {
      setMe({ role: "member" });
    }
  }, [session]);

  useEffect(() => { load(); }, [load]);

  const search = useCallback((term) => {
    const s = (term || "").trim().toLowerCase();
    if (!s) return;
    setSearched(true);
        const hit = rows.find((r) =>
      [r.member_code, r.full_name, r.phone, r.email].some((v) => v && String(v).toLowerCase().includes(s))
    );
    setResult(hit || null);
  }, [rows]);

  // Kod z QR (?c=...) wyszukujemy automatycznie po załadowaniu listy.
  useEffect(() => {
    if (rows.length && q && !searched) search(q);
  }, [rows, q, searched, search]);

  const markDone = async (id) => {
    await rest(`concierge_requests?id=eq.${id}`, { method: "PATCH", body: { status: "done" } });
    load();
  };

  if (!session) {
    return (
      <div className="page mb"><PageMeta title={a.title} noindex />
        <section className="mb-section mb-narrow">
          <h1 className="mb-h2">{a.title}</h1>
          <Link className="mb-btn" to={`${prefix}/membership#dolacz`}>{m.loginBtn}</Link>
        </section><Footer /></div>
    );
  }
  const staff = me && (me.role === "admin" || me.role === "barber");
  const active = rows.filter((r) => r.memberships && isActive(r.memberships.status)).length;
  const mstat = (r) => (r.memberships && r.memberships.status) || "none";

  return (
    <div className="page mb">
      <PageMeta title={a.title} description={t.meta.membership[1]} noindex />
      <section className="mb-section mb-account">
        <h1 className="mb-h2 mb-h2--left">{a.title}</h1>
        {me && !staff && <p className="mb-msg mb-msg--err">{a.noAccess}</p>}
        {staff && (
          <>
            <div className="mb-box">
              <h3>{a.verify}</h3>
              <p className="mb-hint">{a.verifyHint}</p>
              <form className="mb-form mb-form--light mb-inline" onSubmit={(e) => { e.preventDefault(); search(q); }}>
                <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="SZ-XXXXXXXX" aria-label={a.verify} />
                <button className="mb-btn">{a.search}</button>
              </form>
              {searched && !result && <p className="mb-msg mb-msg--err">{a.notFound}</p>}
              {result && (
                <div className={isActive(mstat(result)) ? "mb-verdict mb-verdict--ok" : "mb-verdict mb-verdict--no"}>
                  <strong>{result.full_name}</strong> · {result.member_code}
                  <span>{isActive(mstat(result)) ? a.validBadge : a.invalidBadge}</span>
                  <small>{m.acc.statuses[mstat(result)]} · {a.until}: {fmt(result.memberships && result.memberships.current_period_end)}</small>
                </div>
              )}
            </div>

            <div className="mb-box">
              <h3>{a.requests}</h3>
              {requests.filter((r) => r.status === "new").length === 0 && <p>{a.noRequests}</p>}
              <ul className="mb-list">
                {requests.filter((r) => r.status === "new").map((r) => (
                  <li key={r.id}>
                    <strong>{r.profiles && r.profiles.full_name}</strong> ({r.profiles && r.profiles.phone}) · {m.acc.reqTypes[r.type] || r.type}
                    <br />{r.message}
                    <br /><button className="mb-link" onClick={() => markDone(r.id)}>{a.markDone}</button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-box">
              <h3>{a.members} · {a.count}: {active}</h3>
              <div className="mb-scroll">
                <table className="mb-table">
                  <thead><tr><th>{a.name}</th><th>{a.code}</th><th>{a.status}</th><th>{a.until}</th></tr></thead>
                  <tbody>
                    {rows.map((r) => (
                      <tr key={r.id}>
                        <td>{r.full_name}</td><td>{r.member_code}</td>
                        <td>{m.acc.statuses[mstat(r)]}</td>
                        <td>{fmt(r.memberships && r.memberships.current_period_end)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </section>
      <Footer />
    </div>
  );
}
