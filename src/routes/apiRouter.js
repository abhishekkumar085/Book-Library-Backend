const express=require('express');

const v1Router=require('./V1/v1Router.js');

const router=express.Router();  

router.use('/v1',v1Router);

module.exports=router;