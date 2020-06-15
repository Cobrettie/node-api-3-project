const express = require('express');

const logger = require('./middleware/logger');
const userRouter = require('./users/userRouter');
const postRouter = require('./posts/postRouter');

const server = express();
const PORT = 5000;

server.use(express.json())
server.use(logger('short'));
server.use('/api/users', userRouter);

server.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`)
})
