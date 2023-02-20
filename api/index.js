const express=require("express");
const router=express.Router();
const external = require('./external');
router.use('/platform', external);
module.exports=router;