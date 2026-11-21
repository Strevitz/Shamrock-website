import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import PageMeta from "../components/PageMeta";
import { useLang } from "../i18n";
import { IS_CONFIGURED } from "../membership/config";
import { MEMBERSHIP } from "../membership/strings";
import { updatePassword } from "../membership/supabase";
import "../membership/membership.css";

function parseAuthLink(hash, type) {
  if (!IS_CONFIGURED) return "";
  const params = new URLSearchParams(hash.slice(1));
  return !params.has("error") && params.get("type") === type ? params.get("access_token") || "" : "";
}

export default function MemberAuthLink() {
  const { lang } = useLang();
  const m = MEMBERSHIP[lang];
  const a = m.authLink;
  const { pathname, hash } = useLocation();
  const isRecovery = pathname.endsWith("/reset");
  const prefix = lang === "uk" ? "/ua" : lang === "en" ? "/en" : "";
  const [token, setToken] = useState(() => isRecovery ? parseAuthLink(hash, "recovery") : "");
  const [done, setDone] = useState(() => !isRecovery && Boolean(parseAuthLink(hash, "signup")));
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    // Keep the recovery token in this component only, never in history or the normal login session.
    if (window.location.hash && window.location.pathname === pathname) {
      window.history.replaceState(window.history.state, "", `${pathname}${window.location.search}`);
    }
  }, [pathname]);

  const submit = async (event) => {
    event.preventDefault();
    if (busy || !token) return;
    if (password.length < 8) return setError(m.errPassword);
    if (password !== confirmation) return setError(a.mismatch);
    setError("");
    setBusy(true);
    try {
      await updatePassword(password, token);
      setToken("");
      setPassword("");
      setConfirmation("");
      setDone(true);
    } catch (e) {
      if (["bad_jwt", "session_not_found", "session_expired", "user_not_found", 401, 403].includes(e.code)) {
        setToken("");
        setPassword("");
        setConfirmation("");
      } else {
        setError(m.errGeneric);
      }
    } finally {
      setBusy(false);
    }
  };

  const title = isRecovery ? a.resetTitle : a.confirmTitle;
  return (
    <div className="page mb">
      <PageMeta title={title} description="" noindex />
      <section className="mb-section mb-narrow">
        <h1 className="mb-h2">{title}</h1>
        {done ? (
          <p className="mb-msg mb-msg--ok" role="status">{isRecovery ? a.passwordUpdated : a.confirmed}</p>
        ) : isRecovery && token ? (
          <form className="mb-form mb-form--light" onSubmit={submit}>
            <label>{a.newPassword}<input type="password" autoComplete="new-password" required minLength={8} value={password} onChange={(event) => setPassword(event.target.value)} /></label>
            <label>{a.repeatPassword}<input type="password" autoComplete="new-password" required minLength={8} value={confirmation} onChange={(event) => setConfirmation(event.target.value)} /></label>
            {error && <p className="mb-msg mb-msg--err" role="alert">{error}</p>}
            <button className="mb-btn" disabled={busy}>{busy ? m.processing : a.savePassword}</button>
          </form>
        ) : (
          <p className="mb-msg mb-msg--err" role="alert">{isRecovery ? a.invalidReset : a.invalidConfirmation}</p>
        )}
        {(done || !isRecovery || !token) && <Link className="mb-btn" to={`${prefix}/membership?auth=login#dolacz`}>{m.loginBtn}</Link>}
      </section>
      <Footer />
    </div>
  );
}
