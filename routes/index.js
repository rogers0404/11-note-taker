////////////////////////////////// Variables //////////////////////////////////////////////////////

const path = require('path');
const router = require('express').Router();
let { notes } = require("../db/db");                     //see Issue #4 in git@github.com:rogers0404/11-note-taker.git
const {addNote, validateNote, deleteById} = require("../lib/notesFunctions");
const shortid = require('shortid');                      //generate an unique ID - String
 
//uniqueString();

///////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////// HTML Routes ////////////////////////////////////////////////////

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

router.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/notes.html'));
});

///////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////// API Routes ////////////////////////////////////////////////////

router.get("/api/notes", (req, res) => {
    res.json(notes);
  });

  router.delete("/api/notes/:id", (req, res) => {
    const result = deleteById(req.params.id, notes);
    if (result) {
        notes = result;         //see Issue #4 in git@github.com:rogers0404/11-note-taker.git
      res.json(result);
    } else {
      res.send(404);
    }
  });

  router.post("/api/notes", (req, res) => {
    // set id based on npm package shortid
    req.body.id = shortid.generate();           //Getting an unique string ID from npm package
  
    // if any data in req.body is incorrect, send 400 error back
    if (!validateNote(req.body)) {
      res.status(400).send("You must enter a note in all text-inputs");
    } else {
      const note = addNote(req.body, notes);
      res.json(note);
    }
  });



///////////////////////////////////////////////////////////////////////////////////////////////////


module.exports = router;