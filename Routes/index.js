const express=require("express");
const router = express.Router();
const apis = require('../api');
router.use('/api/v1/', apis);
module.exports = router;