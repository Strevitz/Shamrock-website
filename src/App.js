import React, { Component } from "react";
import "./App.css";
import Home from "./pages/Home";
import Apartments from "./pages/Apartments";
import About from "./pages/About";
import Friends from "./pages/Friends";
import Polityka from "./pages/Polityka";
import Media from "./pages/Media";
import Kontakt from "./pages/Kontakt";
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
                  <Route exact path={["/", "/en"]} component={Home} />
                  <Route exact path={["/ekipa", "/en/team"]} component={Apartments} />
                  <Route exact path={["/rezerwacje", "/en/booking"]} component={About} />
                  <Route exact path={["/media", "/en/media"]} component={Media} />
                  <Route exact path={["/przyjaciele", "/en/friends"]} component={Friends} />
                  <Route
                    exact
                    path={["/polityka-prywatności", "/en/privacy"]}
                    component={Polityka}
                  />
                  <Route exact path={["/kontakt", "/en/contact"]} component={Kontakt} />
                  <Route
                    exact
                    path={["/rezerwacje/:slug", "/en/booking/:slug"]}
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
