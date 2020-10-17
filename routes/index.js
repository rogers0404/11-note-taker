////////////////////////////////// Variables //////////////////////////////////////////////////////

const path = require('path');
const router = require('express').Router();
const { notes } = require("../db/db");
const {addNote, validateNote} = require("../lib/notesFunctions");
const shortid = require('shortid');                    //generate an unique ID - String
 
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
    //console.log(notes);
    res.json(notes);
  });

  router.post("/api/notes", (req, res) => {
    // set id based on what the next index of the array will be
    //req.body.id = notes.length.toString();
    req.body.id = shortid.generate();           //Getting an unique string ID from npm package
    //console.log(uniqueString());
    //console.log(shortid.generate());
  
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