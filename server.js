const express = require('express');
const { db } = require('./db/db');

const routes = require('./routes/index');

const PORT = process.env.PORT || 3010;

const app = express();

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());
app.use('/', routes);

app.use(express.static('public'));    //I need to do this in order to load the file in Express.js

app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});
