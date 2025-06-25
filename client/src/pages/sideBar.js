import React, { useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import "./sideBar.css";
import barangayLogo from '../assets/login/barangay-logo.png';

const SidebarLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className={`dashboard ${sidebarOpen ? '' : 'sidebar-collapsed'}`}>
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-header">
          <button 
            className="hamburger" 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Toggle sidebar"
          >
            &#9776;
          </button>

          {sidebarOpen && (
            <>
              <div className="logo-container">
                <img 
                  src={barangayLogo} 
                  alt="Barangay Logo" 
                  className="logo" 
                  loading="lazy"
                />
              </div>
              <span className="app-title">AGAP</span>
            </>
          )}
        </div>

        <nav className="nav-links">
          <NavLink 
            to="/home" 
            className={({ isActive }) => isActive ? "active-link" : ""}
          >
            {sidebarOpen ? 'Dashboard' : '🏠'}
          </NavLink>
          <NavLink 
            to="/register-family" 
            className={({ isActive }) => isActive ? "active-link" : ""}
          >
            {sidebarOpen ? 'Add Family' : '👨‍👩‍👧‍👦'}
          </NavLink>
          <NavLink 
            to="/distribute-aid" 
            className={({ isActive }) => isActive ? "active-link" : ""}
          >
            {sidebarOpen ? 'Distribute Aid' : '📦'}
          </NavLink>
          <NavLink to="/">
            {sidebarOpen ? 'Log Out' : '🚪'}
          </NavLink>
        </nav>
      </div>

      <div className="main-content-wrapper">
        <div className="main-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default SidebarLayout;