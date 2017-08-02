var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var NotesSchema = new Schema({
  id: {
    type: String
  },
  note: {
    type: String
  }
});

var Notes = mongoose.model("Notes", NotesSchema);
module.exports = Notes;
