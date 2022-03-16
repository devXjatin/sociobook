const express = require("express");
const router = express.Router();
const passport = require("passport");

const postController = require("../controllers/post_controller");

//route to create post
router
  .route("/create")
  .post(
    passport.authenticate("jwt", { session: false }),
    postController.createPost
  );

router.route("/posts").get(passport.authenticate("jwt", {session:false}), postController.getPostFollowing);

//route to like and unlike post and delete post
router
  .route("/:id")
  .get(
    passport.authenticate("jwt", { session: false }),
    postController.likeAndUnlikePost
  )
  .delete(
    passport.authenticate("jwt", { session: false }),
    postController.deletePost
  );




module.exports = router;
