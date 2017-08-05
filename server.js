// Server Dependencies
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const mongoose = require("mongoose");

// Schemas
const Articles = require("./models/Articles");
const Notes = require("./models/Notes");

// Express
const app = express();
const PORT = process.env.PORT || 3000;

// Morgan for Logging
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

// MongoDB Configuration
mongoose.connect('mongodb://heroku_t2gfv3zf:uen6eu649kst00g6u8kpjc2430@ds151202.mlab.com:51202/heroku_t2gfv3zf'); //Deployed
// mongoose.connect('mongodb://localhost/nytreact'); //Local
const db = mongoose.connection;

db.on("error", function (err) {
  console.log("Mongoose Error: ", err);
});

db.once("open", function () {
  console.log("Mongoose connection successful.");
});

// Routes

// This will redirect the users to index.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

// Get route for articles
app.get("/api", function (req, res) {

  Articles.find({}).exec(function (err, doc) {
    if (err) {
      console.log(err);
    } else {
      res.send(doc);
    }
  });

});

// Get route to query the notes
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

// Post route to save articles
app.post("/api", function (req, res) {
  Articles.create(req.body, function (err) {
    if (err) {
      console.log(err);
    } else {
      res.send("Saved Search");
    }
  });
});

// Post route to save notes
app.post("/notes", function (req, res) {
  Notes.create(req.body, function (err) {
    if (err) {
      console.log(err);
    } else {
      res.send("Saved Notes");
    }
  });
});

// Delete route for articles
app.delete("/api", function (req, res) {
  Articles.remove(req.body, function (err) {
    if (err) {
      return handleError(err);
    } else {
      res.send("Deleted!")
    }
  });
});

// Delete route for notes
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

// This will redirect the users to index.html - wildcard
app.get("*", function (req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

// Listener
app.listen(PORT, function () {
  console.log("App listening on PORT: " + PORT);
});