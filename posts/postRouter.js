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

// router.get('/:id', validateUserId(), (req, res) => {
//   // 'user' now gets attached to req in 'validateUserID'
//   res.status(200).json(req.user)
// });

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
});

// custom middleware

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
