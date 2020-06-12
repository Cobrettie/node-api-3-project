const express = require('express');
const helmet = require('helmet');
const postRouter = require('./posts/postRouter');

const server = express();
const PORT = 5000;

server.use(express.json())
server.use(helmet());
server.use(postRouter);

// server.get('/', (req, res) => {
//   res.send(`<h2>Let's write some middleware!</h2>`);
// });

//custom middleware

function logger(req, res, next) {

}

server.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`)
})
