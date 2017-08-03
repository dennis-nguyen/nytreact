// Include Server Dependencies
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const mongoose = require("mongoose");

// Require Schemas
const Articles = require("./models/Articles");
const Notes = require("./models/Notes");

// Create Instance of Express
const app = express();
const PORT = process.env.PORT || 3000;

// Run Morgan for Logging
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.text());
app.use(bodyParser.json({
  type: "application/vnd.api+json"
}));

app.use(express.static("public"));

// -------------------------------------------------

// MongoDB Configuration configuration (Change this URL to your own DB)
mongoose.connect('mongodb://localhost/nytreact');
const db = mongoose.connection;

db.on("error", function (err) {
  console.log("Mongoose Error: ", err);
});

db.once("open", function () {
  console.log("Mongoose connection successful.");
});

// -------------------------------------------------

// Main "/" Route. This will redirect the user to our rendered React application
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

// This is the route we will send GET requests to retrieve our most recent search data.
// We will call this route the moment our page gets rendered
app.get("/api", function (req, res) {

  Articles.find({}).exec(function (err, doc) {
    if (err) {
      console.log(err);
    } else {
      res.send(doc);
    }
  });

});

app.get("/notes", function (req, res) {
 Notes.find({
   id: req.query.id
 }).exec(function (err, doc) {
    if (err) {
      console.log(err);
    } else {
      res.send(doc);
    }
  });

});

// This is the route we will send POST requests to save each search.
app.post("/api", function (req, res) {
  console.log(req.body);
  console.log("post working");

  Articles.create(req.body, function (err) {
    if (err) {
      console.log(err);
    } else {
      res.send("Saved Search");
    }
  });
});

// This is the route we will send POST requests to save each search.
app.post("/notes", function (req, res) {
  console.log(req.body);
  console.log("note post working");

  Notes.create(req.body, function (err) {
    if (err) {
      console.log(err);
    } else {
      res.send("Saved Notes");
    }
  });
});

app.delete("/api", function (req, res) {
  Articles.remove(req.body, function (err) {
    if (err) {
      return handleError(err);
    } else {
      res.send("Deleted!")
    }
  });
});

app.delete("/notes", function (req, res) {
  Notes.remove({
    _id: req.body
  }, function (err) {
    if (err) {
      return handleError(err);
    } else {
      res.send("Deleted!")
    }
  });
});

// -------------------------------------------------

// Listener
app.listen(PORT, function () {
  console.log("App listening on PORT: " + PORT);
});