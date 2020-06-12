const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const postRouter = require('./posts/postRouter');

const server = express();
const PORT = 5000;

// built in middleware
server.use(express.json())

// 3rd party middleware
server.use(helmet());
// server.use(morgan('dev'));

// custom middleware
server.use(logger);
server.use(validateUser);
server.use(postRouter);

// server.get('/', (req, res) => {
//   res.send(`<h2>Let's write some middleware!</h2>`);
// });

//custom middleware

function logger(req, res, next) {
  console.log(`${req.method} method, ${req.url} req url, ${Date.now()}`);
  next();
}

// function validateUserId(req, res, next) {
//   if (req.params.id) {
//     req.user = req
//   } else {
//     res.status(400).json({
//       message: "invalid user id"
//     })
//   }

//   next();
// }

function validateUser(req, res, next) {
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

server.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`)
})
