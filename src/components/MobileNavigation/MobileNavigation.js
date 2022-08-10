import React from "react";
import Navigation from "../Navigation/Navigation";
import "./MobileNavigation.css";

export default function MobileNavigation({ isOpen, onSignInClick, onLogOut }) {
  return (
    <div className={`header__popup ${isOpen ? "header__popup_opened" : ""}`}>
      <div className="header__navigation-container">
        <Navigation onSignInClick={onSignInClick} onLogOut={onLogOut}/>
      </div>
    </div>
  );
}
