import React from "react";
import * as userService from "../../Utilities/users-service";
import {
  LayoutGrid,
  Wallet,
  LineChart,
  Settings,
  LogOut,
  Search,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import "./NavBar.css";

const NavBar = ({ user, setUser, children }) => {
  function handleLogOut() {
    // Delegate to the users-service
    userService.logOut();
    // Update state will also cause a re-render
    setUser(null);
  }
  return (
    <div className="appShell">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo">
          Crpyto<span>Terminal</span>
        </div>
        <nav className="nav-menu">
          <NavLink to="/dashboard" className="nav-item">
            <LayoutGrid size={20} /> Dashboard
          </NavLink>
          <NavLink to="/wallet" className="nav-item">
            <Wallet size={20} /> Wallet
          </NavLink>
          <NavLink to="/market" className="nav-item">
            <LineChart size={20} /> Markets
          </NavLink>
        </nav>
        <div className="nav-footer">
          <div className="nav-item">
            <Settings size={20} /> Settings
          </div>
          <div className="nav-item" onClick={handleLogOut}>
            <LogOut size={20} /> Logout
          </div>
        </div>
      </aside>

      {/* 2. Main Content Area */}
      <div className="appMain">
        <header className="topBar">
          <div className="searchWrap">
            <Search size={18} className="searchIcon" />
            <input type="text" placeholder="Search assets..." />
          </div>
          <div className="topRight">
            <div className="userChip">
              <div className="userAvatar">{user?.name?.charAt(0) || "U"}</div>
              <div className="userName">{user?.name || "User"}</div>
            </div>
          </div>
        </header>

        {/* This is where HomePage.jsx content will appear */}
        <main className="pageContent">{children}</main>
      </div>
    </div>
  );
};

export default NavBar;
