const express = require('express');

const routes = require('./routes/index');

const PORT = process.env.PORT || 3010;

const app = express();

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());
// the route where the API and HTML routes are
app.use('/', routes);

app.use(express.static('public'));   

app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});
