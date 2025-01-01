const express = require('express');
const bookRouter = require('./book.route.js');
const userRouter = require('./user.route.js');

const router = express.Router();

router.use('/book', bookRouter);

router.use('/user', userRouter);

module.exports = router;
