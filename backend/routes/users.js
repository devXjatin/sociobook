const express = require('express');
const router = express.Router();
const passport = require("passport");

const {register, login, followUser}= require('../controllers/user_controller')

//register user
router.route('/register').post(register);

//login route
router.route('/login').post(login);

//follow route
router.route('/follow/:id').get(  passport.authenticate("jwt", { session: false }),followUser);

module.exports = router;