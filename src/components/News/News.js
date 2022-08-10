import React from "react";
import "./News.css";
import NewsCardList from "../NewsCardList/NewsCardList";

export default function News({
  cards,
  savedCards,
  isShowMoreActive,
  cardIndex,
  onShowMoreClick,
  onCardButtonClick,
}) {
  return (
    <>
      <h2 className="news__title">Search results</h2>
      <NewsCardList
        cards={cards}
        savedCards={savedCards}
        index={cardIndex}
        onCardButtonClick={onCardButtonClick}
      />
      {isShowMoreActive && (
        <button
          className="news__show-button"
          type="button"
          onClick={onShowMoreClick}
        >
          Show more
        </button>
      )}
    </>
  );
}
