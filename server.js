const express = require("express");
const path = require("path");
const noteData = require("./db/db.json");
const fs = require("fs");
const uuid = require("uuid/v1");

const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.static("./public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Read db.json using fs.readFileSync and JSON.parse()
//let dataStr = fs.readFileSync("db/db.json", "utf8");
//let noteArray = JSON.parse(dataStr);

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
});

app.post("/api/notes", function (req, res) {
  console.log(req.body);
  let note = req.body;
  const { title, text } = note;
  let newNote = { title, text, id:uuid() };

  console.log(newNote);
  noteArray.push(newNote);
  res.json(noteArray);
  console.log("saving note");

  fs.writeFile("./db/db.json", JSON.stringify(noteArray), function (err) {
    if (err) throw err;
    console.log("sucessful write");
  });
});

app.delete("/api/notes/:id", function (req, res) {
  let id = req.params.id;
  let notes = noteArray;
  console.log(notes);
  let filteredNotes = noteArray.filter((note) => note.id !== id);
  console.log(filteredNotes);
  fs.writeFile("./db/db.json", JSON.stringify(filteredNotes), function (err) {
    if (err) throw err;
    console.log("sucessful delete");
  });
  window.location.reload();
  //console.log(noteArray);
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
