const express = require('express');
const router = express.Router();

const {createPost} = require('../controllers/post_controller')

router.route('/create').post(createPost);

module.exports = router;