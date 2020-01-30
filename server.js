const express = require('express');
const usersRouter = require('./users/userRouter');

const server = express();


//global middleware
server.use(express.json())
server.use('/users', usersRouter);
// server.use(logger)

//custom middleware

function logger(req, res, next) {
  console.log(
    `[${new Date().toISOString()}] ${req.method} to ${req.url} from ${req.get('Origin')}`
  );

  next();

};
server.use(logger)

//route handlers

//sanity check
server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});

module.exports = server;
