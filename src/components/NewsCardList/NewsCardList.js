import React from "react";
import "./NewsCardList.css";
import NewsCard from "../NewsCard/NewsCard";
import { useLocation } from "react-router-dom";

export default function NewsCardList({
  cards,
  savedCards,
  index,
  onCardButtonClick,
}) {
  
  const location = useLocation();

  return (
    <ul className="news__list">
      {location.pathname === "/"
        ? cards.slice(0, index).map((card) => {
            return (
              <NewsCard
                card={card}
                key={cards.indexOf(card)}
                onCardButtonClick={onCardButtonClick}
                savedCards={savedCards}
              />
            );
          })
        : savedCards.map((card) => {
            return (
              <NewsCard
                card={card}
                key={savedCards.indexOf(card)}
                onCardButtonClick={onCardButtonClick}
                savedCards={savedCards}
              />
            );
          })}
    </ul>
  );
}
