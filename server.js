const express = require('express');

const logger = require('./middleware/logger');
const userRouter = require('./users/userRouter');
const postRouter = require('./posts/postRouter');

const server = express();
const PORT = 5000;

server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
})

server.use(express.json())
server.use(logger('short'));
server.use('/api/users', userRouter);
server.use('/api/posts', postRouter);

server.get('/', (req, res) => {
  res.status(200).json({
    message: 'Server Running'
  })
})

server.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`)
})
