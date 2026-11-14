import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FaPercent, FaShoppingBag, FaBolt, FaConciergeBell, FaGem } from "react-icons/fa";
import Footer from "../components/Footer";
import PageMeta from "../components/PageMeta";
import { useLang } from "../i18n";
import { MEMBERSHIP } from "../membership/strings";
import { IS_CONFIGURED, PRICE_PROMO, PRICE_REGULAR } from "../membership/config";
import { signUp, signIn, resetPassword, callFn, useSession } from "../membership/supabase";
import { WHATSAPP_URL } from "../siteInfo";
import "../membership/membership.css";

const ICONS = [FaPercent, FaShoppingBag, FaBolt, FaConciergeBell, FaGem];

function PriceBlock({ m }) {
  return (
    <div className="mb-price">
      {PRICE_PROMO ? (
        <>
          <span className="mb-badge">{m.promoBadge}</span>
          <div className="mb-price__row">
            <s className="mb-price__old">{PRICE_REGULAR} zł</s>
            <span className="mb-price__now">{PRICE_PROMO}</span>
            <span className="mb-price__unit">{m.perMonth}</span>
          </div>
          <p className="mb-price__note">{m.promoNote}</p>
        </>
      ) : (
        <div className="mb-price__row">
          <span className="mb-price__now">{PRICE_REGULAR}</span>
          <span className="mb-price__unit">{m.perMonth}</span>
        </div>
      )}
    </div>
  );
}

function JoinForm({ m, lang, to }) {
  const [mode, setMode] = useState("signup");
  const [f, setF] = useState({ fullName: "", email: "", phone: "", password: "", consent: false });
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState(null);
  const history = useHistory();
  const prefix = lang === "pl" ? "" : lang === "uk" ? "/ua" : "/en";
  const set = (k) => (e) => setF({ ...f, [k]: e.target.type === "checkbox" ? e.target.checked : e.target.value });

  const startCheckout = async () => {
    const { url } = await callFn("checkout", { lang });
    window.location.href = url;
  };

  const submit = async (e) => {
    e.preventDefault();
    setMsg(null);
    if (f.password.length < 8) return setMsg({ err: m.errPassword });
    if (mode === "signup" && !f.consent) return setMsg({ err: m.errConsent });
    setBusy(true);
    try {
      if (mode === "signup") {
        const r = await signUp({ email: f.email.trim(), password: f.password, fullName: f.fullName.trim(), phone: f.phone.trim() });
        if (r.needsConfirmation) {
          setMsg({ ok: m.confirmEmail });
          setBusy(false);
          return;
        }
        await startCheckout();
      } else {
        await signIn(f.email.trim(), f.password);
        history.push(`${prefix}/membership/account`);
      }
    } catch (err) {
      const t = String(err.message || "");
      let text = m.errGeneric;
      if (/already|registered/i.test(t)) text = m.errExists;
      else if (/invalid.*(credentials|login)/i.test(t)) text = m.errCredentials;
      setMsg({ err: text });
      setBusy(false);
    }
  };

  const forgot = async () => {
    if (!f.email) return;
    try {
      await resetPassword(f.email.trim());
      setMsg({ ok: m.resetSent });
    } catch (e) {
      setMsg({ err: m.errGeneric });
    }
  };

  return (
    <form className="mb-form" onSubmit={submit} noValidate={false}>
      <div className="mb-tabs" role="tablist">
        <button type="button" role="tab" aria-selected={mode === "signup"} className={mode === "signup" ? "is-on" : ""} onClick={() => setMode("signup")}>{m.tabSignup}</button>
        <button type="button" role="tab" aria-selected={mode === "login"} className={mode === "login" ? "is-on" : ""} onClick={() => setMode("login")}>{m.tabLogin}</button>
      </div>
      {mode === "signup" && (
        <>
          <label>{m.fullName}<input required autoComplete="name" value={f.fullName} onChange={set("fullName")} /></label>
          <label>{m.phone}<input required type="tel" autoComplete="tel" value={f.phone} onChange={set("phone")} /></label>
        </>
      )}
      <label>{m.email}<input required type="email" autoComplete="email" value={f.email} onChange={set("email")} /></label>
      <label>{m.password}<input required type="password" minLength={8} autoComplete={mode === "signup" ? "new-password" : "current-password"} value={f.password} onChange={set("password")} /></label>
      {mode === "signup" && (
        <label className="mb-check">
          <input type="checkbox" checked={f.consent} onChange={set("consent")} />
          <span>{m.consent} (<Link to={to("privacy")}>{m.consentLink}</Link>)</span>
        </label>
      )}
      {msg && <p className={msg.err ? "mb-msg mb-msg--err" : "mb-msg mb-msg--ok"} role="alert">{msg.err || msg.ok}</p>}
      <button className="mb-btn" disabled={busy}>{busy ? m.processing : mode === "signup" ? m.signupBtn : m.loginBtn}</button>
      {mode === "login" && <button type="button" className="mb-link" onClick={forgot}>{m.forgot}</button>}
    </form>
  );
}

export default function Membership() {
  const { lang, t, to } = useLang();
  const m = MEMBERSHIP[lang];
  const session = useSession();
  const prefix = lang === "pl" ? "" : lang === "uk" ? "/ua" : "/en";
  return (
    <div className="page mb">
      <PageMeta title={t.meta.membership[0]} description={t.meta.membership[1]} />
      <header className="mb-hero">
        <div className="mb-hero__inner">
          <p className="mb-eyebrow">☘ {m.eyebrow}</p>
          <h1>{m.heroTitle}</h1>
          <p className="mb-hero__sub">{m.heroSub}</p>
          <a className="mb-btn" href="#dolacz">{session ? m.ctaLogged : m.cta}</a>
        </div>
      </header>

      <section className="mb-section">
        <h2 className="mb-h2">{m.benefitsTitle}</h2>
        <div className="mb-benefits">
          {m.benefits.map(([title, text], i) => {
            const Icon = ICONS[i];
            return (
              <article key={title} className="mb-benefit">
                <Icon aria-hidden="true" />
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="mb-section mb-section--dark" id="dolacz">
        <div className="mb-join">
          <div>
            <h2 className="mb-h2 mb-h2--left">{m.joinTitle}</h2>
            <PriceBlock m={m} />
            <ol className="mb-steps">
              {m.steps.map(([a, b]) => (
                <li key={a}><strong>{a}</strong><span>{b}</span></li>
              ))}
            </ol>
          </div>
          <div className="mb-panel">
            {!IS_CONFIGURED ? (
              <div className="mb-soon">
                <p>{m.comingSoon}</p>
                <a className="mb-btn" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">{m.comingSoonBtn}</a>
              </div>
            ) : session ? (
              <div className="mb-soon">
                <Link className="mb-btn" to={`${prefix}/membership/account`}>{m.ctaLogged}</Link>
              </div>
            ) : (
              <JoinForm m={m} lang={lang} to={to} />
            )}
          </div>
        </div>
      </section>

      <section className="mb-section">
        <h2 className="mb-h2">{m.faqTitle}</h2>
        <div className="mb-faq">
          {m.faq.map(([q, a]) => (
            <details key={q}><summary>{q}</summary><p>{a}</p></details>
          ))}
        </div>
        <details className="mb-terms">
          <summary>{m.terms.title}</summary>
          <ul>{m.terms.items.map((i) => <li key={i}>{i}</li>)}</ul>
        </details>
      </section>
      <Footer />
    </div>
  );
}
