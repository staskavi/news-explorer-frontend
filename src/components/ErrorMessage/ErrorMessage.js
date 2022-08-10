import React from "react";
import "./ErrorMessage.css";

export default function ErrorMessage() {
  return (
    <div className="error-message__container">
      <h2 className="error-message__title">Sorry</h2>
      <p className="error-message__text">
        Something went wrong during the request. Please try again later.
      </p>
    </div>
  );
}
