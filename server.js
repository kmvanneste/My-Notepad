const express = require("express");
var path = require("path");
//var noteData = require("./db/db.json");
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

// noteArray.forEach(note) {
//   //give unique
// };

//HTML ROUTES --------------------------------------------------------
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});
//----------------------------------------------------------------------

app.get("/api/notes/", function (req, res) {
  console.log("getting note");
  res.json(noteArray);

  fs.writeFile("./db/db.json", JSON.stringify(noteArray), function (err) {
    if (err) throw err;
    console.log("sucessful write");
 });
 
});

app.post("/api/notes", function (req, res) {
  
  let newNote = req.body;
  noteArray.push(newNote);
  res.json(noteArray);
  console.log("saving note");
});

app.delete("/api/notes/:id", function (req, res) {
  console.log("delete post");
  
})

// If no matching route is found default to home
// app.get("*", function (req, res) {
//   res.sendFile(path.join(__dirname, "./public/index.html"));
// });

//START SERVER
app.listen(PORT, function () {
  console.log("App listening on PORT: " + PORT);
});
