import React, { Component } from "react";
import "./App.css";
import Home from "./pages/Home";
import Apartments from "./pages/Apartments";
import About from "./pages/About";
import Friends from "./pages/Friends";
import Polityka from "./pages/Polityka";
import Media from "./pages/Media";
import Kontakt from "./pages/Kontakt";
import Membership from "./pages/Membership";
import MemberAccount from "./pages/MemberAccount";
import MemberAdmin from "./pages/MemberAdmin";
import SingleApartment from "./pages/SingleApartment";
import Error from "./pages/404";
import { Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import ActionBar from "./components/ActionBar";
import CookieConsent from "./components/CookieConsent";
import { CSSTransition, TransitionGroup } from "react-transition-group";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <Route
          render={({ location }) => (
            <TransitionGroup>
              <CSSTransition key={location.key} timeout={300} classNames="fade">
                <Switch location={location}>
                  <Route exact path={["/", "/en", "/ua"]} component={Home} />
                  <Route exact path={["/ekipa", "/en/team", "/ua/team"]} component={Apartments} />
                  <Route exact path={["/rezerwacje", "/en/booking", "/ua/booking"]} component={About} />
                  <Route exact path={["/media", "/en/media", "/ua/media"]} component={Media} />
                  <Route exact path={["/przyjaciele", "/en/friends", "/ua/friends"]} component={Friends} />
                  <Route
                    exact
                    path={["/polityka-prywatności", "/en/privacy", "/ua/privacy"]}
                    component={Polityka}
                  />
                  <Route exact path={["/membership", "/en/membership", "/ua/membership"]} component={Membership} />
                  <Route exact path={["/membership/account", "/en/membership/account", "/ua/membership/account"]} component={MemberAccount} />
                  <Route exact path={["/membership/admin", "/en/membership/admin", "/ua/membership/admin"]} component={MemberAdmin} />
                  <Route exact path={["/kontakt", "/en/contact", "/ua/contact"]} component={Kontakt} />
                  <Route
                    exact
                    path={["/rezerwacje/:slug", "/en/booking/:slug", "/ua/booking/:slug"]}
                    component={SingleApartment}
                  />
                  <Route component={Error} />
                </Switch>
              </CSSTransition>
            </TransitionGroup>
          )}
        />
        <ActionBar />
        <CookieConsent />
      </div>
    );
  }
}

export default App;
