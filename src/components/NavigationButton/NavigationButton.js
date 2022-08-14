import { React, useContext } from "react";
import { useLocation } from "react-router-dom";
import logOutPath from "../../images/logout.svg";
import darkLogOutPath from "../../images/darkLogout.svg";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import { LoggedInContext } from "../../context/LoggdInContext";
import "./NavigationButton.css";


export default function NavigationButton({ onSignInClick, onLogOut }) {

  const location = useLocation();

  const currentUser = useContext(CurrentUserContext);
  const loggedIn = useContext(LoggedInContext);

  return (
    <button
      className={`header__navigate-button 
      ${loggedIn && "header__navigate-button_loggedin"} 
      ${location.pathname === "/saved-news" && "header__navigate-button_theme_dark"}`
    }
    onClick={!loggedIn  ?onSignInClick :onLogOut}
    >
      {loggedIn ? currentUser.name : "Sign In"}
      {loggedIn && (
        <img
          className="header__nevigate-button-icon"
          src={location.pathname === "/saved-news" ? darkLogOutPath :logOutPath}
          alt="log out"
        ></img>
      )}
    </button>
  );
}
