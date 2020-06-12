const express = require('express');
const helmet = require('helmet');
const logger = require('./middleware/logger');
const postRouter = require('./posts/postRouter');

const server = express();
const PORT = 5000;

// built in middleware
server.use(express.json())

// 3rd party middleware
server.use(helmet());

// custom middleware
server.use(logger('short'));
// server.use(validateUser);
server.use(postRouter);


// function validateUser(req, res, next) {
//   if (!req.body) {
//     res.status(400).json({
//       message: "missing user data"
//     })
//   } else if (!req.body.name) {
//     res.status(400).json({
//       message: "missing required name field"
//     })
//   }

//   next();
// }

// server.get('/', (req, res) => {
//   res.send(`<h2>Let's write some middleware!</h2>`);
// });

server.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`)
})
