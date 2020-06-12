const express = require('express');
const db = require ('./postDb');

const router = express.Router();

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
      .catch(next())
  }
}

module.exports = router;
