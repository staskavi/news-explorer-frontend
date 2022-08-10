import { React ,useState, useEffect} from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import SavedNews from "../SavedNews/SavedNews";
import Login from "../Login/Login";
import Register from "../Register/Register";

import { defaultCards } from "../../utils/constants";
 /* eslint-disable no-unused-vars */
function App() {
  const [isMobile, setIsMobile] = useState(true);
  
  const [cardIndex, setCardIndex] = useState(3); 
  const [isShowMoreActive, setIsShowMoreActive] = useState(true);

  const [resError, setResError] = useState("");
  const [isError, setIsError] = useState(false);

  const [isTootipPopupOpen, setIsTooltipPopupOpen] = useState(false);
  const [isSignInPopupOpen, setIsSignInPopupOpen] = useState(false);
  const [isSignUpPopupOpen, setIsSignUpPopupOpen] = useState(false);
  const [isMenuPopupOpen, setIsMenuPopupOpen] = useState(false);
  const [cards, setCards] = useState([]);
  const [savedCards, setSavedCards] = useState([]);

  const [isNewsOpen, setIsNewsOpen] = useState(false);
  const [isPreloaderOpen, setIsPreloaderOpen] = useState(false);
  const [isErrorMessageOpen, setIsErrorMessageOpen] = useState(false);


  useEffect(() => {
    window.addEventListener("resize", handleScreenResize);
    return () => {
      window.removeEventListener("resize", handleScreenResize);
    };
  }, []);

  
  useEffect(() => {
    handleScreenResize();
  }, []);

  useEffect(() => {
    const recoveredCards = defaultCards;//Temporary, only for checking layouts
    if (recoveredCards) {
      setCards(recoveredCards);
      setIsNewsOpen(true);
    }
  }, []);


  ////////////////////////Close by Escape key
  useEffect(() => {
    const closeByEscape = (e) => {
      if (e.key === "Escape") {
        closeAllPopups();
      }
    };
    document.addEventListener("keydown", closeByEscape);
    return () => document.removeEventListener("keydown", closeByEscape);
  }, []);
////////////////////////Close by Click Outside
  useEffect(() => {
    const closeByClickOutside = (e) => {
      if (e.target.classList.contains("popup")) {
        closeAllPopups();
      }
    };
    document.addEventListener("click", closeByClickOutside);
    return () => document.removeEventListener("keydown", closeByClickOutside);
  }, []);
//////////////////////////////////
  


  function handleScreenResize() {
    if (window.innerWidth > 745) {
      setIsMobile(false);
    } else {
      setIsMobile(true);
    }
  }

  function handleSignInClick() {
    closeAllPopups();
    setIsSignInPopupOpen(true);
  }

  function handleSignUpClick() {
    closeAllPopups();
    setIsSignUpPopupOpen(true);
  }

  function handleMenuClick() {
    setIsMenuPopupOpen(true);
  }

  function closeAllPopups() {
    setIsMenuPopupOpen(false);
    setIsSignInPopupOpen(false);
    setIsSignUpPopupOpen(false);
    setIsTooltipPopupOpen(false);
    setIsError(false); 
  }

  function handleSearch(keyword) { 
    setIsNewsOpen(false); 
    setIsErrorMessageOpen(false);
    setIsPreloaderOpen(true);
  }

  function handleShowMoreClick() {
    if (cards.length - cardIndex <= 3) {
      setIsShowMoreActive(false);
      setCardIndex(cards.length);
    } else {
      setCardIndex(cardIndex + 3);
    }
  }

  return (
        <div className="container">
          <Header
            isMobile={isMobile}
            onSignInClick={handleSignInClick}
            onMenuClick={handleMenuClick}
            onClose={closeAllPopups}
            isNavOpen={isMenuPopupOpen}
          />
          <Switch>
            <Route path="/saved-news">
            <SavedNews
                cards={cards}
                savedCards={savedCards}
              />
            </Route>
            <Route path="/">
              <Main
                cards={cards}
                savedCards={savedCards}
                onSearch={handleSearch}
                isNewsOpen={isNewsOpen}
                isPreloaderOpen={isPreloaderOpen}
                isErrorMessageOpen={isErrorMessageOpen}
                isShowMoreActive={isShowMoreActive}
                cardIndex={cardIndex}
                onShowMoreClick={handleShowMoreClick}
              />
            </Route>
          </Switch>
          <Footer />
           <Login
            isOpen={isSignInPopupOpen}
            onClose={closeAllPopups}
            onSignUpClick={handleSignUpClick}
            isError={isError}
            resError={resError}
          />
          <Register
            isOpen={isSignUpPopupOpen}
            onClose={closeAllPopups}
            onSignInClick={handleSignInClick}
            isError={isError}
            resError={resError}
          />
        </div>
  );
}

export default App;
