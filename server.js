const express = require('express');
const helmet = require('helmet');

const logger = require('./middleware/logger');
const userRouter = require('./users/userRouter');
const postRouter = require('./posts/postRouter');

const server = express();
const PORT = 5000;

// built in middleware
server.use(express.json())

// 3rd party middleware
server.use(helmet());

// custom middleware
server.use(logger('short'));
// server.use(lockout)

server.use(userRouter);
// server.use(postRouter);

// function lockout(req, res, next) {
//   if ((Date.now() % 3 === 0)) {
//     return res.status(403).json({ message: 'locked out' })
//   }

//   next()
// }

server.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`)
})
