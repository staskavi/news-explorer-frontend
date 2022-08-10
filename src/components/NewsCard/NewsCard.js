import React from "react";
import { useLocation } from "react-router-dom";
import "./NewsCard.css";

export default function NewsCard({ card, onCardButtonClick, savedCards }) {

  const {
    description=card.text,
    publishedAt=card.date,
    source,
    title,
    keyword,
    link=card.url,
  } = card;

  const location = useLocation();

  const loggedIn = true;
  
 
  function checkForSavedCards() {
    // eslint-disable-next-line array-callback-return
    return savedCards.find((savedCard) => {
      if (savedCard.title === card.title) {
        return true;
      }
    });
  }

  const isSaved = checkForSavedCards(); 

  function handleCardButtonClick(e) {
    const isSavedCard = checkForSavedCards();

    if (isSavedCard) {
      card = isSavedCard;
    }
    e.target.classList.toggle("news__card-button_active");
    onCardButtonClick(card, isSaved);
  }

  return (
    <li className="news__item">
      <button
        className={`
          ${ location.pathname === "/" 
          ? "news__card-button news__card-button_type_save"
          : "news__card-button news__card-button_type_delete"
           }
          ${
            location.pathname === "/" && isSaved
              ? "news__card-button_active"
              : undefined
          }
        `}
        type="button"
        aria-label="card button"
        onClick={handleCardButtonClick}
      ></button>
      <div
        className={
          !loggedIn
            ? "news__tooltip"
            : location.pathname === "/saved-news"
            ? "news__tooltip news__tooltip_theme_saved"
            : undefined
        }
      >
        {!loggedIn ? (
          <p className="news__tooltip-text">Sign in to save articles</p>
        ) : (
          location.pathname === "/saved-news" && (
            <p className="news__tooltip-text">Remove from saved</p>
          )
        )}
      </div>
      {/* eslint-disable-next-line react/jsx-no-target-blank */}
      <a className="news__article-link" href={link} target="_blank">
      {location.pathname === "/saved-news" && (
        <div className="news__keyword-container">
          <p className="news__keyword">{keyword}</p>
        </div>
      )}
      <div
        className="news__image"
        style={{ backgroundImage:  `url(${link})` }}
      />
      <div className="news__item-description">
      <p className="news__item-date">{publishedAt}</p>
        <h3 className="news__item-title">{title}</h3>
        <p className="news__item-text">{description}</p>
        <p className="news__item-source">{source.name ? source.name.toUpperCase() :source.toUpperCase()}</p>
      </div>
      </a>
    </li>
  );
}
