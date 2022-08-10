/* eslint-disable react/jsx-no-target-blank */
import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
import githubPath from "../../images/github.svg";
import linkedinPath from "../../images/linkedin.jpg";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <p className="footer__copyrights">
          © 2022 StasK, Powered by News API
        </p>
        <nav className="footer__navigation">
          <div className="footer__links">
            <Link className="footer__link" to="/">
              Home
            </Link>
            <a className="footer__link" href="https://practicum.yandex.com/" target="_blank">
              Practicum by Yandex
            </a>
          </div>
          <div className="footer__icons">
            <a className="footer__icon" href="https://github.com" target="_blank">
              <img src={githubPath} alt="github logo"></img>
            </a>
            <a className="footer__icon" href="https://linkedin.com" target="_blank">
              <img src={linkedinPath} alt="linkedin logo"></img>
            </a>
          </div>
        </nav>
      </div>
    </footer>
  );
}
