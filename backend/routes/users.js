const express = require('express');
const router = express.Router();

const {register}= require('../controllers/user_controller')

//register user
router.route('/register').post(register);

module.exports = router;