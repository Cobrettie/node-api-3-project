const express = require('express');
const postdb = require ('./postDb');

const router = express.Router();

router.use((req, res, next) => {
  console.log('you are using postRouter');
  next();
})

router.get('/', (req, res) => {
  postdb.get()
    .then(posts => {
      res.status(200).json(posts)
    })
    .catch(err => {
      console.log('Error: ', err)
      res.status(500).json({
        errorMessage: "Failed to retrieve posts"
      })
    })
});

router.get('/:id', (req, res) => {
  postdb.getById(req.params.id)
    .then(post => {
      if (post) {
        res.status(200).json(post)
      } else {
        res.status(400).json({
          errorMessage: "Post not found"
        })
      }
    })
    .catch(err => {
      console.log('Error: ', err)
      res.status(500).json({
        errorMessage: "Post could not be retrieved"
      })
    })
});

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
