import React, { Component } from "react";
import logo from "../images/logo_white.png";
//import { Slant as Hamburger } from "hamburger-react";
import { HamburgerCollapse } from "react-animated-burgers";
import { Link, NavLink } from "react-router-dom";

export default class Navbar extends Component {
  state = {
    isActive: false,
  };

  handleToggle = () => {
    this.setState({ isActive: !this.state.isActive });
  };

  closeMenu = () => {
    this.setState({ isActive: false });
  };

  render() {
    return (
      <nav className="navbar">
        <div className="nav-center">
          <div className="nav-header">
            <Link to="/">
              <img src={logo} alt="Shamrock Barber Shop" />
            </Link>
            <button type="button" className="nav-btn">
              <HamburgerCollapse
                isActive={this.state.isActive}
                toggleButton={this.handleToggle}
                buttonColor="transparent"
                barColor="#fff"
                buttonWidth={26}
              />
            </button>
          </div>
          <ul
            className={this.state.isActive ? "nav-links show-nav" : "nav-links"}
          >
            <li onClick={this.closeMenu}>
              <NavLink
                to="/"
                exact
                activeStyle={{ fontWeight: "bold", color: "#40d181" }}
              >
                Strona Główna
              </NavLink>
            </li>
            <li onClick={this.closeMenu}>
              <NavLink
                to="/ekipa"
                exact
                activeStyle={{ fontWeight: "bold", color: "#40d181" }}
              >
                Ekipa
              </NavLink>
            </li>
            <li onClick={this.closeMenu}>
              <NavLink
                to="/rezerwacje"
                exact
                activeStyle={{ fontWeight: "bold", color: "#40d181" }}
              >
                Rezerwacje
              </NavLink>
            </li>
            <li onClick={this.closeMenu}>
              <NavLink
                to="/media"
                exact
                activeStyle={{ fontWeight: "bold", color: "#40d181" }}
              >
                Media
              </NavLink>
            </li>
            <li onClick={this.closeMenu}>
              <NavLink
                to="/przyjaciele"
                exact
                activeStyle={{ fontWeight: "bold", color: "#40d181" }}
              >
                Przyjaciele
              </NavLink>
            </li>
            <li onClick={this.closeMenu}>
              <NavLink
                to="/kontakt"
                exact
                activeStyle={{ fontWeight: "bold", color: "#40d181" }}
              >
                Kontakt
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
