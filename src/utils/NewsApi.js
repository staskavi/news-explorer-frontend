import { TOKEN, NEWS_API_URL } from "./constants";
  
  class NewsApi {
    constructor(baseUrl, headers, from, to) {
      this._baseUrl = baseUrl;
      this._headers = headers;
      this._from = from;
      this._to = to;
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
    
   
    getArticles(keyword) {
      return this.fetchCall(`
      ${this._baseUrl}?q=${keyword}&from=${this._from}&to=${this._to}&pageSize=100&apiKey=${TOKEN}`, 
      {
        headers: this._headers,
        });
    }
  }
  
  const date = new Date();
  const last = new Date(date.getTime() - 7 * 24 * 60 * 60 * 1000);
  const day = last.getDate();
  const month = last.getMonth() + 1;
  const year = last.getFullYear();
  const from = year + "/" + month + "/" + day;
  const to = date;

  const newsApi = new NewsApi(NEWS_API_URL, {
  }, from, to);
  
  export default newsApi;