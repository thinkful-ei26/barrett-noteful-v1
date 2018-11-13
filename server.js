'use strict';

// Load array of notes
const express = require('express');
const data = require('./db/notes');
const simDB = require('./db/simDB');
const notes = simDB.initialize(data);
const app = express();
const { PORT } = require('./config');
const logger = require('./middleware/logger');

app.use(logger);
app.use(express.static('public'));
app.use(express.json());

app.get('/api/notes', (req, res, next) => {
  const { searchTerm } = req.query;

  notes.filter(searchTerm, (err, list) => {
    if (err) {
      return next(err);
    }
    res.json(list);
  });
  // if (req.query.searchTerm) {
  //   const searchTerm = data.filter( term => term.title.includes(req.query.searchTerm));
  //   // console.log(searchTerm);
  //   return res.json(searchTerm);
  // } 
  // res.json(data);
});

app.get('/api/notes/:id', (req, res) => {
  //get the value of in dynamically changing :id
  const { id } = req.params;
  
  notes.find(id, (err, item) => {
    if (err) {
      return next(err);
    }
    res.json(item);
  });
  //use const 
  // const reqNote = data.find(item => item.id === Number(id));
  // res.json(reqNote);
});

app.put('/api/notes/:id', (req, res, next) => {
  const id = req.params.id;

  /***** Never trust users - validate input *****/
  const updateObj = {};
  const updateFields = ['title', 'content'];

  updateFields.forEach(field => {
    if (field in req.body) {
      updateObj[field] = req.body[field]; 
    }
  });

  notes.update(id, updateObj, (err, item) => {
    if (err) {
      return next(err);
    }
    if (item) {
      res.json(item);
    } else {
      next();
    }
  });
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
