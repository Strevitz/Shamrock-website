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
                  <Route exact path="/" component={Home} />
                  <Route exact path="/ekipa/" component={Apartments} />
                  <Route exact path="/rezerwacje/" component={About} />
                  <Route exact path="/media/" component={Media} />
                  <Route exact path="/przyjaciele/" component={Friends} />
                  <Route
                    exact
                    path="/polityka-prywatności/"
                    component={Polityka}
                  />
                  <Route exact path="/kontakt/" component={Kontakt} />
                  <Route
                    exact
                    path="/rezerwacje/:slug"
                    component={SingleApartment}
                  />
                  <Route component={Error} />
                </Switch>
              </CSSTransition>
            </TransitionGroup>
          )}
        />
      </div>
    );
  }
}

export default App;
