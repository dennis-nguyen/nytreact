const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NotesSchema = new Schema({
  id: {
    type: String
  },
  note: {
    type: String
  }
});

const Notes = mongoose.model("Notes", NotesSchema);
module.exports = Notes;
