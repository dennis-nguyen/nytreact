let axios = require("axios");

let helper = {

  // API CALL TO NYT
  queryNYT: function (term, startYear, endYear) {
    let apiKey = "04e29e439fa74279b26380af9efb7a08";
    let queryURL = `https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=${apiKey}&q=${term}&begin_date=${startYear}0101&end_date=${endYear}0101`;
    return axios.get(queryURL).then(function (response) {
      return response;
    });
  },
  // SAVE ARTICLES TO DB
  saveToDB: function (article) {
    console.log(article);
    return axios.post("/api", article);
  },
  // DELETES ARTICLES FROM DB
  deleteFromDB: function (article) {
    console.log("helpers delete function")
    return axios({
    method: 'delete',
    url: '/api',
    data: article
    });
  },
  // QUERY SAVED ARTICLES FROM DB
  queryFromDB: function () {
    return axios.get("/api");
  },
  // QUERY ARTICLES NOTES FROM DB
  queryNotes: function (ID) {
    console.log(ID);
    return axios.get("/notes",{
      params: {
        id: ID
      }
    });
  },
  // ADD ARTICLE NOTES TO DB
  addNotes: function (note) {
    return axios.post("/notes", note);
  },
  // DELETES NOTE FROM DB
  deleteNote: function (ID) {
    console.log("helpers delete function")
    return axios({
    method: 'delete',
    url: '/notes',
    data: ID
    });
  }

};

// We export the API helper
module.exports = helper;
