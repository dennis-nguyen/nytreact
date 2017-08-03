const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ArticlesSchema = new Schema({
  title: {
    type: String
  },
  date: {
    type: String
  },
  url: {
    type: String
  }
});

const Articles = mongoose.model("Articles", ArticlesSchema);
module.exports = Articles;
