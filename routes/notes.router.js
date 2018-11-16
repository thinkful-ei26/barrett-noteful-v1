/* eslint-disable strict */
const express = require('express');

const notesRouter = express.Router();

// Simple In-Memory Database
const data = require('../db/notes');
const simDB = require('../db/simDB');
const notes = simDB.initialize(data);


// Get All (and search by query)
notesRouter.get('/', (req, res, next) => {
  const { searchTerm } = req.query;

  notes.filter(searchTerm)
    .then(list => {
      res.json(list);
    })
    .catch(err => {
      next(err);
    });
});
  
// Get a single item
notesRouter.get('/:id', (req, res, next) => {
  const id = req.params.id;

  notes.find(id)
    .then(item => {
      if (item) {
        res.json(item);
      } else {
        next();
      }
    })
    .catch(err => {
      next(err);
    });
});
  
// Put update an item
notesRouter.put('/:id', (req, res, next) => {
  const id = req.params.id;
  
  /***** Never trust users - validate input *****/
  const updateObj = {};
  const updateableFields = ['title', 'content'];
  
  updateableFields.forEach(field => {
    if (field in req.body) {
      updateObj[field] = req.body[field];
    }
  });
  
  /***** Never trust users - validate input *****/
  if (!updateObj.title) {
    const err = new Error('Missing `title` in request body');
    err.status = 400;
    return next(err);
  }

  notes.update(id, updateObj)
    .then(item => {
      if (item) {
        res.json(item);
      } else {
        next();
      }
    })
    .catch(err => {
      next(err);
    });
});

notesRouter.post('/', (req, res, next) => {
  const { title, content } = req.body;
  
  const newItem = { title, content };
  /***** Never trust users - validate input *****/
  if (!newItem.title) {
    const err = new Error('Missing `title` in request body');
    err.status = 400;
    return next(err);
  }

  notes.create(newItem)
    .then(item => {
      if (item) {
        res.location(`http://${req.headers.host}/notes/${item.id}`)
          .status(201).json(item);
      } else {
        next();
      }
    })
    .catch(err => {
      next(err);
    });
});

notesRouter.delete('/:id', (req, res, next) => {
  const id = req.params.id;

  notes.delete(id)
    .then(item => {
      if (item) {
        res.sendStatus(204);
      }
    })
    .catch(err => {
      next(err);
    });

  // notes.delete(id, (err, item) => {
  //   if (err) {
  //     return next(err);
  //   }
  //   if (item) {
  //     res.sendStatus(204);
  //   } else {
  //     next();
  //   }
  // });
});

module.exports = notesRouter;