import React from "react";
import "./SavedNews.css";
import NewsCardList from "../NewsCardList/NewsCardList";

export default function SavedNews({ cards, savedCards, onCardButtonClick }) {
 
  return (
    <section className="saved-news">
      <div className="saved-news__caption">
        <p className="saved-news__text">Saved articles</p>
        <h2 className="saved-news__title">
          Anonimous, you have 0 saved articles
        </h2>
        <p className="saved-news__keywords">
          By keywords:
          <span>&nbsp;</span>
        </p>
      </div>
      <div className="saved-news__container">
        <NewsCardList
          cards={cards}
          savedCards={savedCards}
          onCardButtonClick={onCardButtonClick}
        />
      </div>
    </section>
  );
}
