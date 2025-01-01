
const express=require('express');
const createBook = require('../../controller/book.controller.js');

const router=express.Router();

router.post('/create',createBook);

module.exports=router;