const express = require('express');
const router = express.Router();
const passport = require('passport');

const postController = require('../controllers/post_controller')

router.route('/create').post(passport.authenticate('jwt', {session:false}), postController.createPost);
router.route('/:id').get(passport.authenticate('jwt', {session:false}), postController.likeAndUnlikePost);

module.exports = router;