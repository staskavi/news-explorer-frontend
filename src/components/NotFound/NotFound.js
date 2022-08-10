import React from "react";
import './NotFound.css';
import notFoundPath from "../../images/notFound.svg";

export default function NotFound() {
  return (
    <div className="not-found__container">
      <img
        className="not-found__image"
        src={notFoundPath}
        alt="sad smiley"
      ></img>
      <h2 className="not-found__title">Nothing found</h2>
      <p className="not-found__text">
        Sorry, but nothing matched your search.
      </p>
    </div>
  );
}
