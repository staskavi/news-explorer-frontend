import { API_URL } from "./constants";

  class MainApi {
    constructor(baseUrl, headers) {
      this._baseUrl = baseUrl;
      this._headers = headers;
      this.fetchCall = this.fetchCall.bind(this);
    }

    fetchCall(url, headers) {
      return fetch(url, headers)
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          Promise.reject(`ERROR: ${res.statusText}`);
        })
    };
  
    getUserInfo() {
      return this.fetchCall(`${this._baseUrl}/users/me`, {
        headers: this._headers,
      });
    }
  

    getSavedCards() {
      return this.fetchCall(`${this._baseUrl}/articles`, {
        method:"GET",
        headers: this._headers,
      });
    }
  
   
    _saveCard(card, cardKeyword) {
      return this.fetchCall(`${this._baseUrl}/articles`, {
        method: "POST",
        headers: this._headers,
        body: JSON.stringify({
            keyword: cardKeyword,
            title: card.title,
            text: card.description,
            date: card.publishedAt,
            source: card.source.name,
            link: card.url,
            image: card.urlToImage,
        }),
      });
    }
  
   
    _deleteCard(cardId) {
      return this.fetchCall(`${this._baseUrl}/articles/${cardId}`, {
        method: "DELETE",
        headers: this._headers,
      });
    }

    
    changeCardSaveStatus(card, isSaved, cardKeyword){
      if (isSaved){
        return this._deleteCard(card._id);
      } else {
        return this._saveCard(card, cardKeyword);
      }
    }
  }
  
  const mainApi = new MainApi(API_URL, {
    authorization: `Bearer ${localStorage.jwt}`,
    "Content-Type": "application/json",
  });
  
  export default mainApi;