import React from "react";
import "./InfoTooltip.css";

export default function InfoTooltip({
  isOpen,
  onClose,
  isMobile,
  onSignInClick
}) {
  return (
    <div className={`popup popup_type_tooltip ${isOpen ? "popup_opened" : ""}`}>
      {isMobile && (
        <button
          className="popup__close-button"
          type="button"
          onClick={onClose}
        ></button>
      )}
      <div className="popup__frame">
        {!isMobile && (
          <button
            className="popup__close-button"
            type="button"
            onClick={onClose}
          ></button>
        )}

        <h2 className="popup__title">Registration successfully completed!</h2>
        <button className="popup__signin-button" onClick={onSignInClick}>
          Sign in
        </button>
      </div>
    </div>
  );
}
