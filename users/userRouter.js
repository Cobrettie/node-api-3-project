const express = require('express');
const db = require('./userDb');

const router = express.Router();

router.use((req, res, next) => {
  console.log('userRouter console log');
  next();
})

// router.post('/', validateUser(), (req, res) => {
//   db.insert(req.body)
//     .then(newPost => {
//       res.status(200).json(newPost)
//     })
//     .catch(err => {
//       res.status(500).json({
//         errorMessage: "Server error, user creation unsuccessful"
//       })
//     })
// });

router.post('/:id/posts', (req, res) => {
  // do your magic!
});

router.get('/', (req, res) => {
  db.get()
    .then(users => {
      res.status(200).json(users)
    })
    .catch(err => {
      res.status(500).json({
        errorMessage: "Users could not be retrieved"
      })
    })
});

router.get('/:id', validateUserId(), (req, res) => {
  res.status(200).json(req.user);
});

router.get('/:id/posts', (req, res) => {
  // do your magic!
});

router.delete('/:id', validateUserId(), (req, res) => {
  db.remove(req.user.id)
    .then(test => {
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

router.put('/:id', (req, res) => {
  // do your magic!
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
          res.status(400).json({
            message: "invalid user id"
          })
        }
      })
      .catch(err => {
        res.status(500).json({
          errorMessage: "Error retrieving user"
        })
      })
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
