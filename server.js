'use strict';

// Load array of notes
const express = require('express');
const data = require('./db/notes');
const app = express();
const { PORT } = require('./config');
const logger = require('./middleware/logger');

app.use(express.static('public'));

//update this so that wea re adding searchTerm req.query
// app.get('/api/notes', (req, res) => {res.json(data);});

app.use(logger);

app.get('/api/notes', (req, res) => {
  
  if (req.query.searchTerm) {
    const searchTerm = data.filter( term => term.title.includes(req.query.searchTerm));
    // console.log(searchTerm);
    return res.json(searchTerm);
  } 
  res.json(data);
});

app.get('/api/notes/:id', (req, res) => {
  //get the value of in dynamically changing :id
  const { id } = req.params;
  //use const 
  const reqNote = data.find(item => item.id === Number(id));
  res.json(reqNote);
});

app.get('/boom', (req, res, next) => {
  throw new Error('Boom!!');
});

app.use(function (req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  res.status(404).json({ message: 'Not Found' });
});

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  });
});

app.listen(PORT, function () {
  console.info(`Server listening on ${this.address().port}`);
}).on('error', err => {
  console.error(err);
});
