//variable declaration
// const { notStrictEqual } = require("assert");
const express = require("express");
const path = require("path");
const app = express();
const uuid = require('./helpers/uuid');
var db = require("./db/db.json")
const fs = require("fs");
// const { resolveSoa } = require("dns");
const PORT = process.env.PORT || 3001;

//middleware
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(__dirname, "./public/index.html");
});

app.get("/notes", (req, res) => {
    console.log("Inside of get notes")
    res.sendFile(path.join(__dirname, "./public/notes.html"))
})

app.get("/api/notes", (req, res) => {
    console.log("inside of api notes")
    res.json(db)
})

app.post('/api/notes', (req, res) => {
    console.log(`${req.method} request received to add a note`);

    const { title, text } = req.body;

    if (title && text) {
        const newNote = {
            title: title,
            text: text,
            id: uuid(),
        }

        db.push(newNote)

        fs.writeFile("./db/db.json", JSON.stringify(db), err => {
            err ? console.error(err) : console.log('Success!')
        })

        res.send(db)

    } else {
        res.json("Error in posting note")
    }
})

app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`);
});

app.delete('/api/notes/:id', (req, res) => {
    let newDb = []
    console.log(req.params)
    for (let i = 0; i < db.length; i++) {
        console.log(db[i])
        if (db[i].id != req.params.id) {
            newDb.push(db[i])
        }
    }
    fs.writeFile("./db/db.json", JSON.stringify(newDb), err => {
        err ? console.error(err) : console.log('Success!')
    })
    db = newDb
    res.send(newDb)
})