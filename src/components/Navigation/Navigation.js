import { React, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { LoggedInContext } from "../../context/LoggdInContext";
import NavigationButton from "../NavigationButton/NavigationButton";
import "./Navigation.css";

export default function Navigation({ onSignInClick, onLogOut }) {
  
  const location = useLocation();

  const loggedIn = useContext(LoggedInContext);

  return (
    <nav className="header__navigate">
      <Link
        className={ 
          location.pathname === "/" 
        ? "header__navigate-link header__navigate-link_home" 
        : "header__navigate-link header__navigate-link_theme_dark" 
        }
        to="/"
      >
        Home
      </Link>
      {loggedIn && (
        <Link
          className={
            location.pathname === "/"
              ? "header__navigate-link"
              : "header__navigate-link header__navigate-link_articles"
          }
          to="/saved-news"
        >
          Saved Articles
        </Link>
      )}
      <NavigationButton onSignInClick={onSignInClick} onLogOut={onLogOut} />
    </nav>
  );
}
