const express = require("express");
var path = require("path");
var noteData = require("./db/db.json");
console.log(noteData);
const fs = require("fs");

var app = express();

var PORT = process.env.PORT || 8080;

app.use(express.static("./public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Read db.json using fs.readFileSync and JSON.parse()
let dataStr = fs.readFileSync("db/db.json", "utf8");
console.log("dataStr", dataStr);
let noteArray = JSON.parse(dataStr);
console.log("noteArray", noteArray);

//HTML ROUTES
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});


app.get("/api/notes", function (req, res) {
  res.json([{"title":"Test Title","text":"Test text"}]);
  // read
});

//API ROUTES
//User is shown a JSON of the data in the table
// app.get("/api/notes", function(req, res) {

//   });
//User submits a new note
app.post("/api/notes", function (req, res) {
  console.log("Testing post");
  noteArray.push(req.body);

  fs.writeFile(noteData, JSON.stringify(noteArray), function (err) {
    if (err) throw err;
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(noteArray);
  });

  // var newNote = req.body;
  // newNote.routeName = newNote.name.replace(/\s+/g, "").toLowerCase()
  // console.log(newNote)
  // noteData.push(newNote);
  // res.json(newNote);
});
//app.delet

// If no matching route is found default to home
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

//START SERVER
app.listen(PORT, function () {
  console.log("App listening on PORT: " + PORT);
});
