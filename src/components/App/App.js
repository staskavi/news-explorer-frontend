import { React, useState, useEffect} from "react";
import { Route, Switch } from "react-router-dom";
import { useHistory } from "react-router";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import SavedNews from "../SavedNews/SavedNews";
import InfoTooltip from "../InfoTooltip/InfoTooltip";
import Login from "../Login/Login";
import Register from "../Register/Register";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import { LoggedInContext } from "../../context/LoggdInContext";
import newsApi from "../../utils/NewsApi";
import * as auth from "../../utils/auth";
import mainApi from "../../utils/MainApi";

function App() {
  const [isMobile, setIsMobile] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    name: "",
    _id: "",
  });
  const [token, setToken] = useState(localStorage.getItem("jwt"));
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
  const [cardKeyword, setCardKeyword] = useState("");

 
  const [isNewsOpen, setIsNewsOpen] = useState(false);
  const [isPreloaderOpen, setIsPreloaderOpen] = useState(false);
  const [isErrorMessageOpen, setIsErrorMessageOpen] = useState(false);

  const history = useHistory();

  
  useEffect(() => {
    window.addEventListener("resize", handleScreenResize);
    return () => {
      window.removeEventListener("resize", handleScreenResize);
    };
  }, []);

  
  useEffect(() => {
    handleScreenResize();
  }, []);

  //Close by Escape key
  useEffect(() => {
    const closeByEscape = (e) => {
      if (e.key === "Escape") {
        closeAllPopups();
      }
    };
    document.addEventListener("keydown", closeByEscape);
    return () => document.removeEventListener("keydown", closeByEscape);
  }, []);

   //Close by Click Outside
  useEffect(() => {
    const closeByClickOutside = (e) => {
      if (e.target.classList.contains("popup")) {
        closeAllPopups();
      }
    };
    document.addEventListener("click", closeByClickOutside);
    return () => document.removeEventListener("keydown", closeByClickOutside);
  }, []);

  
  useEffect(() => {
    const recoveredCards = localStorage.getItem("cards");

    if (recoveredCards) {
      setCards(JSON.parse(recoveredCards));
      setIsNewsOpen(true);
    }
  }, []);

  
  useEffect(() => {
    if (localStorage.getItem("keyword")) {
      setCardKeyword(localStorage.getItem("keyword"));
    }
  }, []);

  useEffect(() => {
    mainApi._headers = {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
  }, [token]);

  useEffect(() => {
    if (token) {
      mainApi.getUserInfo().then((res) => {
        if (res) {
          setCurrentUser({
            name: res.name,
            _id: res._id,
          });
          setLoggedIn(true); 
        }
      })
      .catch(console.log);
    }
  }, [token]);

  
  useEffect(() => {
    if (token) {
      mainApi
        .getSavedCards()
        .then((res) => {
          let modifiedArr = res.filter(function(element){
            if( element.owner === currentUser._id){
              return element;
            }
            return null;
        });
          setSavedCards(modifiedArr);
        
        })
        .catch(console.log);
    }
  }, [token, currentUser]);

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

  function handleRegister(values, resetForm) {
    auth
      .register(values)
      .then(() => {
        resetForm();
        setIsSignUpPopupOpen(false);
        setIsTooltipPopupOpen(true);
      })
      .catch((err) => {
        setResError(err.message);
        setIsError(true);
      });
  }

  function handleLogin(values, resetForm) {
    auth
      .authorize(values)
      .then((res) => {
        setToken(res);
        setLoggedIn(true);
        resetForm();
        history.push("/");
        closeAllPopups();
      })
      .catch((err) => {
        setResError(err.message);
        setIsError(true);
      });
  }

  function handleLogOut() {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
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
    setCardKeyword(keyword); 
    setIsNewsOpen(false); 
    setIsErrorMessageOpen(false);
    setIsPreloaderOpen(true);
    newsApi
      .getArticles(keyword) 
      .then((res) => {
        setCards(res.articles);
        if (res.articles.length !== 0) {
          localStorage.setItem("cards", JSON.stringify(res.articles)); 
        } else {
          localStorage.removeItem("cards"); 
        }
        setIsPreloaderOpen(false);
        setIsNewsOpen(true);
      })
      .catch((err) => {
        setIsPreloaderOpen(false);
        setIsErrorMessageOpen(true); 
        localStorage.removeItem("cards");
        console.log(err);
      });
  }

  function handleShowMoreClick() {
    if (cards.length - cardIndex <= 3) {
      setIsShowMoreActive(false);
      setCardIndex(cards.length);
    } else {
      setCardIndex(cardIndex + 3);
    }
  }

  function handleCardButtonClick(card, isSaved) {
    loggedIn
      ? mainApi 
          .changeCardSaveStatus(card, isSaved, cardKeyword) 
         .then((res) => {
            if (!res.deletedCount) {
              const savedCard = {
                _id: res._id,
                description: res.text,
                publishedAt: res.date,
                source: { name: res.source },
                title: res.title,
                urlToImage: res.image,
                keyword: res.keyword,
                link: res.link,
              };
              setSavedCards([...savedCards, savedCard]);
            } else {
              setSavedCards((cardsList) =>
                cardsList.filter((item) => item._id !== card._id)

              );
            }
          })
          .catch(console.log)
      : setIsSignInPopupOpen(true); 
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <LoggedInContext.Provider value={loggedIn}>
        <div className="container">
          <Header
            isMobile={isMobile}
            onSignInClick={handleSignInClick}
            onMenuClick={handleMenuClick}
            onClose={closeAllPopups}
            isNavOpen={isMenuPopupOpen}
            onLogOut={handleLogOut}
          />
          <Switch>
            <ProtectedRoute path="/saved-news" loggedIn={loggedIn}>
              <SavedNews
                savedCards={savedCards}
                onCardButtonClick={handleCardButtonClick}
              />
            </ProtectedRoute>
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
                onCardButtonClick={handleCardButtonClick}
              />
            </Route>
          </Switch>
          <Footer />
          <Login
            isOpen={isSignInPopupOpen}
            onClose={closeAllPopups}
            onSignUpClick={handleSignUpClick}
            onSubmit={handleLogin}
            isError={isError}
            resError={resError}
          />
          <Register
            isOpen={isSignUpPopupOpen}
            onClose={closeAllPopups}
            onSubmit={handleRegister}
            onSignInClick={handleSignInClick}
            isError={isError}
            resError={resError}
          />
          <InfoTooltip
            isOpen={isTootipPopupOpen}
            onClose={closeAllPopups}
            isMobile={isMobile}
            onSignInClick={handleSignInClick}
          />
        </div>
      </LoggedInContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
