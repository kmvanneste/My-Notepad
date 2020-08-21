var express = require("express");
var path = require("path");
var noteData = require("./Develop/db/db.json");
const fs = require("fs");

var app = express();

var PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//HTML ROUTES
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "./Develop/public/index.html"));
  });

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "./Develop/public/notes.html"));
  });

// If no matching route is found default to home
app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "./Develop/public/index.html"));
  });


//API ROUTES
//User is shown a JSON of the data in the table
app.get("/api/notes", function(req, res) {
    fs.readFile('db.json', function(err, data) {
        if (err) throw err;
        res.writeHead(200, { "Content-Type": "text/html"});
        res.end(data);
    })
  });
//User submits a new note
app.post("/api/notes", function(req, res) {
    var newNote = req.body;
    newNote.routeName = newNote.name.replace(/\s+/g, "").toLowerCase()
    console.log(newNote)
    noteData.push(newNote);
    res.json(newNote);
});


//START SERVER
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
})

