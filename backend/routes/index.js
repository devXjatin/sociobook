const express = require('express')
const router = express.Router();

//post route
router.use('/post', require('./posts'))

//user route
router.use('/user', require('./users'));

module.exports = router;