let axios = require("axios");

let helper = {

  // API CALL TO NYT
  queryNYT: function (term, startYear, endYear) {
    let apiKey = "b9f91d369ff59547cd47b931d8cbc56b:0:74623931";
    let queryURL = `https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=${apiKey}&q=${term}&begin_date=${startYear}0101&end_date=${endYear}0101`;
    return axios.get(queryURL).then(function (response) {
      return response;
    });
  },

  saveToDB: function (article) {
    console.log(article);
    return axios.post("/api", article);
  },

  deleteFromDB: function () {

  }
};

// We export the API helper
module.exports = helper;
