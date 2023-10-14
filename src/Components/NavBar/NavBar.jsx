import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {
  return (
    <nav id="navbar">
      <div className="navbar-links">
        <Link>
          <h3>Home</h3>
        </Link>
        <Link>
          <h3>Crypto Currencies</h3>
        </Link>
        <Link>
          <h3>Watch List</h3>
        </Link>
        <Link>
          <h3>News</h3>
        </Link>
      </div>
      <div className="navbar-links">
        <Link>
          <img src="" alt="" />
          <h3>Login</h3>
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
