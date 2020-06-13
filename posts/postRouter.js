const express = require('express');
const db = require ('./postDb');

const router = express.Router();

router.use((req, res, next) => {
  console.log('you are using postRouter');
  next();
})

router.get('/', (req, res) => {
  // do your magic!
  db.get();
  res.send(`<h2>Lets code!</h2>`)
});

router.get('/:id', validateUserId(), (req, res) => {
  // 'user' now gets attached to req in 'validateUserID'
  res.status(200).json(req.user)
});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
});

// custom middleware

function validateUserId() {
  return (req, res, next) => {
    db.getById(req.params.id)
      .then(user => {
        if (user) {
          // attach user to req obj, to access later
          req.user = user;

          next();
        } else {
          res.status(400).json({
            message: "invalid user id"
          })
        }
      })
      .catch(err => {
        res.status(400).json({
          errorMessage: "Error retrieving user"
        })
      })
      next();
  }
}

function validateUser() {
  return (req, res, next) => {
    if (!req.body) {
      res.status(400).json({
        message: "missing user data"
      })
    } else if (!req.body.name) {
      res.status(400).json({
        message: "missing required name field"
      })
    }
    next();
  }
}

function validatePost() {
  return (req, res, next) => {
    if (!req.body) {
      res.status(400).json({
        message: "missing post data"
      })
    } else if (!req.body.text) {
      res.status(400).json({
        message: "missing required text field"
      })
    }
    next();
  }
}

module.exports = router;
