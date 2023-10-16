import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {
  return (
    <nav id="navbar">
      <div className="navbar-links">
        <Link to="/">
          <img
            className="logo-img"
            src={"https://i.imgur.com/tPX2MEY.png"}
            alt=""
          />
        </Link>
        <Link to="/">
          <h3>Crypto Currencies</h3>
        </Link>
        <Link>
          <h3>Watch List</h3>
        </Link>
        <Link to="/news">
          <h3>News</h3>
        </Link>
      </div>
      <div className="navbar-links">
        <Link>
          <h3>Login</h3>
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
