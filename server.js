var express = require("express");
var path = require("path");
var noteData = require("./Develop/db/db.json")

var app = express();

var PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//HTML ROUTES
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
  });

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "notes.html"));
  });

// If no matching route is found default to home
app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
  });


//API ROUTES
//User is shown a JSON of the data in the table
app.get("/api/notes", function(req, res) {
    res.json(noteData);
  });
//User submits a new note
app.post("/api/notes", function(req, res) {
    var newNote = req.body;
    newCharacter.routeName = newCharacter.name.replace(/\s+/g, "").toLowerCase()
    console.log(newCharacter)
    characters.push(newCharacter);
    res.json(newCharacter);
});


//START SERVER
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
})

