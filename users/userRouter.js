const express = require('express');
const db = require('./userDb');

const router = express.Router();

// runs every time a request is made 
router.use((req, res, next) => {
  console.log('userRouter console log');
  next();
})

router.get('/', (req, res) => {
  db.get()
    .then(users => {
      res.status(200).json(users)
    })
    .catch(err => {
      console.log('Error:', err);
      res.status(500).json({
        errorMessage: "Users could not be retrieved"
      })
    })
});

router.get('/:id', validateUserId(), (req, res) => {
  res.status(200).json(req.user);
});

router.post('/', validateUser(), (req, res) => {
  db.insert(req.body)
    .then(user => {
      res.status(201).json(user)
    })
    .catch(err => {
      console.log('Error:', err);
      res.status(500).json({
        errorMessage: "Server error, user creation unsuccessful"
      })
    })
});

router.post('/:id/posts', validateUserId(), validateUser(), (req, res) => {
  // do your magic!
});

router.get('/:id/posts', (req, res) => {
  // do your magic!
});

router.put('/:id', validateUser(), (req, res) => {
  db.update(req.params.id, req.body)
    .then(user => {
      res.status(200).json(user)
    })
    .catch(err => {
      console.log('Error:', err);
      res.status(500).json({
        errorMessage: "There was a problem updating the user"
      })
    })
});

router.delete('/:id', validateUserId(), (req, res) => {
  db.remove(req.params.id)
    .then(() => {
      res.status(200).json({
        message: "user deleted"
      })
    })
    .catch(err => {
      res.status(500).json({
        errorMessage: "failed to delete user"
      })
    })
});

//custom middleware

function validateUserId() {
  return (req, res, next) => {
    db.getById(req.params.id)
      .then(user => {
        if (user) {
          // attach user to req obj, to access later
          req.user = user;
          next();
        } else {
          res.status(404).json({
            message: "user not found"
          })
        }
      })
      .catch(err => {
        console.log('Error:', err);
        res.status(500).json({
          errorMessage: `There was a problem with your ${req.method} request`
        })
      })
  }
}

function validateUser() {
  return (req, res, next) => {
    if (req.body) {
      if (req.body.name) {
        next();
      } else {
        res.status(400).json({
          errorMessage: "Missing required name field"
        })
      }
    } else {
      res.status(400).json({
        errorMessage: "Missing user data"
      })
    }
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
