var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ArticlesSchema = new Schema({
  location: {
    type: String
  },
  date: {
    type: Date
  }
});

var Articles = mongoose.model("Articles", ArticlesSchema);
module.exports = Articles;
