import React from "react";
import { useLocation } from "react-router-dom";
import logOutPath from "../../images/logout.svg";
import darkLogOutPath from "../../images/darkLogout.svg";
import "./NavigationButton.css";


export default function NavigationButton({ onSignInClick }) {

  const location = useLocation();


  return (
    <button
      className={`header__navigate-button 
      ${ "header__navigate-button_loggedin"} 
      ${location.pathname === "/saved-news" && "header__navigate-button_theme_dark"}`
    }
    onClick={onSignInClick }
    >
      { "Sign In"}
      {(
        <img
          className="header__nevigate-button-icon"
          src={location.pathname === "/saved-news" ? darkLogOutPath :logOutPath}
          alt="log out"
        ></img>
      )}
    </button>
  );
}
