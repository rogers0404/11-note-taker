const fs = require("fs");
const path = require("path");

function addNote(body, noteArray) {
    const newNote = body;
    noteArray.push(newNote);
    fs.writeFileSync(
        path.join(__dirname, "../db/db.json"),
      JSON.stringify({ notes: noteArray }, null, 2)
    );
    return newNote;
  }

  function validateNote(note) {
    if (!note.title || typeof note.title !== 'string') {
      return false;
    }
    if (!note.text || typeof note.text !== 'string') {
      return false;
    }
    if (!note.id || typeof note.id !== 'string') {
      return false;
    }
    return true;
  }

  function deleteById(id, notesArray) {
    const result = notesArray.filter(note => note.id !== id);       //getting a new array with all elements except el element with the id found
    
    //rewrite the db.json file with the new array.
    fs.writeFileSync(
        path.join(__dirname, "../db/db.json"),
      JSON.stringify({ notes: result }, null, 2)
    );
    
    return result;
  }
  
  module.exports = {
    addNote,
    validateNote,
    deleteById
  };
  