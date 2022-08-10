import React from "react";
import "./Main.css";
import SearchForm from "../SearchForm/SearchForm";
import About from "../About/About";
import Preloader from "../Preloader/Preloader";
import NotFound from "../NotFound/NotFound";
import News from "../News/News";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

export default function Main({
  cards,
  savedCards,
  onSearch,
  isNewsOpen,
  isPreloaderOpen,
  isErrorMessageOpen,
  isShowMoreActive,
  cardIndex,
  onShowMoreClick,
  onCardButtonClick
}) {
  return (
    <>
      <section className="search">
        <div className="search__container">
          <SearchForm onSearch={onSearch} />
        </div>
      </section>
      {isPreloaderOpen && (
        <section className="circle-preloader">
          <Preloader />
        </section>
      )}
      {isErrorMessageOpen && (
        <section className="error-message">
          <ErrorMessage />
        </section>
      )}
      {cards.length === 0 && isNewsOpen && (
        <section className="not-found">
          <NotFound />
        </section>
      )}
     
        <section className="news">
          <News
            cards={cards}
            savedCards={savedCards}
            isShowMoreActive={isShowMoreActive}
            cardIndex={cardIndex}
            onShowMoreClick={onShowMoreClick}
            onCardButtonClick={onCardButtonClick}
          />
        </section>
      
      <section className="about">
        <About />
      </section>
    </>
  );
}
