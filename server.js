//variable declaration
// const { notStrictEqual } = require("assert");
const express = require("express");
const path = require("path");
const app = express();
const uuid = require('./helpers/uuid');
const db = require("./db/db.json")
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

app.get("/notes", (req, res)=> {
    res.sendFile(path.join(__dirname, "./public/notes.html"))
})

app.get("/api/notes", (req, res) => {
    res.json(db)
})

app.post('/api/notes', (req, res) => {
    console.log(`${req.method} request received to add a note`);

    const { title, text } = req.body;

    if (title && text) {
        const newNote = {
            title: title,
            text: text,
            note_id: uuid(),
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

app.delete('/', (req, res) => {
  res.send("DELETE Request Called")
})