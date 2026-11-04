import React from "react";
import Hero from "../components/Hero";
import Banner from "../components/Banner";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import PageMeta from "../components/PageMeta";
import { useLang } from "../i18n";

const Error = () => {
  const { t, to } = useLang();
  return (
    <div className="page">
      <PageMeta title={t.meta.notFound[0]} description={t.meta.notFound[1]} noindex />
      <Hero>
        <Banner
          title="404"
          subtitle={t.notFound.subtitle}
        >
          <Link to={to("home")} className="btn-primary">
            {t.notFound.back}
          </Link>
        </Banner>
      </Hero>
      <Footer />
    </div>
  );
};

export default Error;
