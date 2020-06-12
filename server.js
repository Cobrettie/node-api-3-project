const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const postRouter = require('./posts/postRouter');

const server = express();
const PORT = 5000;

server.use(express.json())
server.use(helmet());
// server.use(morgan('dev'));
server.use(logger);
server.use(postRouter);

// server.get('/', (req, res) => {
//   res.send(`<h2>Let's write some middleware!</h2>`);
// });

//custom middleware

function logger(req, res, next) {
  console.log(`${req.method} method, ${req.url} req url, ${Date.now()}`);
  next();
}

server.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`)
})
