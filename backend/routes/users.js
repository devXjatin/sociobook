const express = require('express');
const router = express.Router();

const {register, login}= require('../controllers/user_controller')

//register user
router.route('/register').post(register);

//login route
router.route('/login').post(login);

module.exports = router;