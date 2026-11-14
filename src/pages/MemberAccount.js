import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import QRCode from "qrcode";
import Footer from "../components/Footer";
import PageMeta from "../components/PageMeta";
import { useLang } from "../i18n";
import { MEMBERSHIP } from "../membership/strings";
import { SITE_ORIGIN } from "../membership/config";
import { rest, callFn, signOut, useSession } from "../membership/supabase";
import { WHATSAPP_URL } from "../siteInfo";
import "../membership/membership.css";

const fmtDate = (iso, lang) =>
  iso ? new Date(iso).toLocaleDateString(lang === "uk" ? "uk-UA" : lang === "en" ? "en-GB" : "pl-PL") : "–";
const isActive = (s) => s === "active" || s === "trialing";

function MemberCard({ m, profile, active, lang, until }) {
  const [qr, setQr] = useState("");
  const code = profile && profile.member_code;
  useEffect(() => {
    if (!code) return;
    QRCode.toDataURL(`${SITE_ORIGIN}/membership/admin?c=${encodeURIComponent(code)}`, {
      margin: 1,
      width: 240,
      color: { dark: "#000000", light: "#ffffff" },
    }).then(setQr).catch(() => setQr(""));
  }, [code]);
  return (
    <div className={active ? "mb-card" : "mb-card mb-card--off"} aria-label={m.acc.cardTitle}>
      <div className="mb-card__top">
        <span className="mb-card__brand">☘ SHAMROCK</span>
        <span className="mb-card__tier">{m.acc.cardName}</span>
      </div>
      <div className="mb-card__body">
        <div>
          <p className="mb-card__name">{(profile && profile.full_name) || ""}</p>
          <p className="mb-card__label">{m.acc.cardCode}</p>
          <p className="mb-card__code">{code || "…"}</p>
          <p className="mb-card__label">{active ? `${m.acc.endsOn} ${fmtDate(until, lang)}` : m.acc.cardInactive}</p>
        </div>
        {qr && <img className="mb-card__qr" src={qr} alt="QR" width="120" height="120" />}
      </div>
    </div>
  );
}

export default function MemberAccount() {
  const { lang, t } = useLang();
  const m = MEMBERSHIP[lang];
  const a = m.acc;
  const session = useSession();
  const prefix = lang === "pl" ? "" : lang === "uk" ? "/ua" : "/en";
  const [profile, setProfile] = useState(null);
  const [mem, setMem] = useState(null);
  const [payments, setPayments] = useState([]);
  const [requests, setRequests] = useState([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [req, setReq] = useState({ type: "booking", message: "" });
  const [reqMsg, setReqMsg] = useState(null);
  const justPaid = /checkout=success/.test(window.location.search);

  const load = useCallback(async () => {
    if (!session) return;
    const uid = session.user.id;
    try {
      const [p, ms, pay, rq] = await Promise.all([
        rest(`profiles?id=eq.${uid}&select=*`),
        rest(`memberships?user_id=eq.${uid}&select=*`),
        rest(`payments?user_id=eq.${uid}&select=*&order=created_at.desc&limit=24`),
        rest(`concierge_requests?user_id=eq.${uid}&select=*&order=created_at.desc&limit=10`),
      ]);
      setProfile(p[0] || null);
      setMem(ms[0] || { status: "none" });
      setPayments(pay || []);
      setRequests(rq || []);
    } catch (e) {
      setError(m.errGeneric);
    }
  }, [session, m.errGeneric]);

  useEffect(() => {
    load();
  }, [load]);

  // Po powrocie ze Stripe status aktualizuje webhook – odświeżamy kilka razy.
  useEffect(() => {
    if (!justPaid || !session) return undefined;
    let n = 0;
    const id = setInterval(() => {
      n += 1;
      load();
      if (n >= 6) clearInterval(id);
    }, 3000);
    return () => clearInterval(id);
  }, [justPaid, session, load]);

  const status = (mem && mem.status) || "none";
  const active = isActive(status);

  const go = async (fn) => {
    setBusy(true);
    setError("");
    try {
      const { url } = await callFn(fn, { lang });
      window.location.href = url;
    } catch (e) {
      setError(m.errGeneric);
      setBusy(false);
    }
  };

  const sendRequest = async (e) => {
    e.preventDefault();
    setReqMsg(null);
    setBusy(true);
    try {
      const r = await callFn("concierge", { type: req.type, message: req.message, lang });
      setReqMsg({ ok: a.reqSent, wa: r.whatsapp });
      setReq({ ...req, message: "" });
      load();
    } catch (err) {
      setReqMsg({ err: m.errGeneric });
    }
    setBusy(false);
  };

  const isStaff = profile && (profile.role === "admin" || profile.role === "barber");

  if (!session) {
    return (
      <div className="page mb">
        <PageMeta title={a.title} description={t.meta.membership[1]} noindex />
        <section className="mb-section mb-narrow">
          <h1 className="mb-h2">{a.title}</h1>
          <p>{a.login}</p>
          <Link className="mb-btn" to={`${prefix}/membership#dolacz`}>{m.loginBtn}</Link>
        </section>
        <Footer />
      </div>
    );
  }

  return (
    <div className="page mb">
      <PageMeta title={a.title} description={t.meta.membership[1]} noindex />
      <section className="mb-section mb-account">
        <div className="mb-account__head">
          <h1 className="mb-h2 mb-h2--left">{a.title}</h1>
          <div>
            {isStaff && <Link className="mb-link" to={`${prefix}/membership/admin`}>{a.staffLink}</Link>}
            <button className="mb-link" onClick={signOut}>{a.logout}</button>
          </div>
        </div>
        {justPaid && <p className="mb-msg mb-msg--ok">{a.successMsg}</p>}
        {error && <p className="mb-msg mb-msg--err">{error}</p>}

        <div className="mb-account__grid">
          <div>
            <MemberCard m={m} profile={profile} active={active} lang={lang} until={mem && mem.current_period_end} />
          </div>
          <div className="mb-box">
            <h3>{a.status}</h3>
            <p className={`mb-status mb-status--${status}`}>{a.statuses[status] || status}</p>
            {active && mem.current_period_end && !mem.cancel_at_period_end && (
              <p>{a.renews}: {fmtDate(mem.current_period_end, lang)}</p>
            )}
            {active && mem.cancel_at_period_end && <p>{a.cancelScheduled}</p>}
            {status === "past_due" && <p className="mb-msg mb-msg--err">{a.pastDueHelp}</p>}
            {!active && status !== "past_due" && (
              <button className="mb-btn" disabled={busy} onClick={() => go("checkout")}>{a.join}</button>
            )}
            {mem && mem.stripe_customer_id && (
              <>
                <button className="mb-btn mb-btn--ghost" disabled={busy} onClick={() => go("portal")}>{a.manage}</button>
                <p className="mb-hint">{a.manageHint}</p>
              </>
            )}
            <button className="mb-link" onClick={load}>{a.refresh}</button>
          </div>
        </div>

        <div className="mb-account__grid">
          <div className="mb-box">
            <h3>{a.concierge}</h3>
            <p>{a.conciergeSub}</p>
            {active ? (
              <form onSubmit={sendRequest} className="mb-form mb-form--light">
                <label>{a.reqType}
                  <select value={req.type} onChange={(e) => setReq({ ...req, type: e.target.value })}>
                    {Object.keys(a.reqTypes).map((k) => <option key={k} value={k}>{a.reqTypes[k]}</option>)}
                  </select>
                </label>
                <label>{a.reqMsg}
                  <textarea required rows="4" maxLength="800" value={req.message} onChange={(e) => setReq({ ...req, message: e.target.value })} />
                </label>
                {reqMsg && <p className={reqMsg.err ? "mb-msg mb-msg--err" : "mb-msg mb-msg--ok"}>{reqMsg.err || reqMsg.ok}</p>}
                {reqMsg && reqMsg.wa && (
                  <a className="mb-btn mb-btn--ghost" href={reqMsg.wa} target="_blank" rel="noopener noreferrer">{a.reqWa}</a>
                )}
                <button className="mb-btn" disabled={busy}>{a.reqSend}</button>
              </form>
            ) : (
              <p className="mb-hint">{a.reqOnlyMembers}</p>
            )}
            {requests.length > 0 && (
              <>
                <h4>{a.myRequests}</h4>
                <ul className="mb-list">
                  {requests.map((r) => (
                    <li key={r.id}>{fmtDate(r.created_at, lang)} · {a.reqTypes[r.type] || r.type} · {r.status === "done" ? "✓" : "…"}</li>
                  ))}
                </ul>
              </>
            )}
          </div>
          <div className="mb-box">
            <h3>{a.payments}</h3>
            {payments.length === 0 ? (
              <p>{a.noPayments}</p>
            ) : (
              <table className="mb-table">
                <tbody>
                  {payments.map((p) => (
                    <tr key={p.id}>
                      <td>{fmtDate(p.created_at, lang)}</td>
                      <td>{(p.amount / 100).toFixed(2)} {String(p.currency).toUpperCase()}</td>
                      <td>{p.status === "paid" ? a.paid : a.failed}</td>
                      <td>{p.hosted_invoice_url && <a href={p.hosted_invoice_url} target="_blank" rel="noopener noreferrer">{a.invoice}</a>}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            <a className="mb-link" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">WhatsApp</a>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
