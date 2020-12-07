import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../content/userContext";
import "./Navbar.css";

const Navbar = (props) => {
  const { userData, setUserData } = useContext(UserContext);

  const logout = () => {
    setUserData({
      token: undefined,
      user: undefined,
    });
    localStorage.setItem("auth-token", "");
  };

  return (
    <nav className="navbar sticky-top navbar-expand-lg navbar-dark">
      <Link to="/" className="navbar-brand"><i className="fa fa-car"></i> Carsoup-Scraper</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        {userData.user ? (
          <ul className="navbar-nav mr-auto w-100 justify-content-end">
            <li className={window.location.pathname === "/search"
              ? "nav-item active"
              : "nav-item"
            }>
              <Link to="/search" className="nav-link">Search</Link>
            </li>

            <li className={window.location.pathname === "/saved"
              ? "nav-item active"
              : "nav-item"
            }>
              <Link to ="/saved" className="nav-link">Saved Cars</Link>
            </li>
            <li className="nav-item">
              <Link to="/" onClick={logout} className="nav-link">Log out</Link>
            </li>
          </ul>
        ) : (
          <ul className="navbar-nav mr-auto w-100 justify-content-end">
            <li className={window.location.pathname === "/login"
              ? "nav-item active"
              : "nav-item"
            }>
              <Link to="/login" className="nav-link">Log in</Link>
            </li>
            <li className={window.location.pathname === "/register"
              ? "nav-item active"
              : "nav-item"
            }>
              <Link to="/register" className="nav-link">Sign up</Link>
            </li>
          </ul>
        )
      }
      </div>
    </nav>
  );
};

export default Navbar;