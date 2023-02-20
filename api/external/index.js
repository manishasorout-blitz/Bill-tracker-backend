const express=require("express");
const router=express.Router();
const AuthController = require('./AuthController');
const BillController=require('./BillController');
router.use("/bill",BillController);
router.use('/auth', AuthController);
module.exports = router;