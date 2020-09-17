import React from "react";
import logo from "../../images/logo.png";
import "./Header.css";
import { Link } from "react-router-dom";
import { useAuth } from "../Login/useAuth";

function Header() {
  const auth = useAuth();
  console.log(auth);
  return (
    <div className="header">
      <div className="header__top">
        <div className="header__logo">
          <img src={logo} alt="logo" />
        </div>
      </div>
      <div className="header__bottom">
        <nav>
          <Link to="/" className="nav__link">
            Shop
          </Link>
          <Link to="/review" className="nav__link">
            Order Review
          </Link>

          {auth.user && (
            <span style={{ color: "yellow" }}>Hi,{auth.user.name}</span>
          )}
          {auth.user ? (
            <Link to="/login" className="nav__link__dynamic">
              Sign Out
            </Link>
          ) : (
            <Link to="/login" className="nav__link__dynamic">
              Sign In
            </Link>
          )}

          <Link to="/review" className="nav__link__dynamic">
            Cart
          </Link>
        </nav>
      </div>
    </div>
  );
}

export default Header;
