import React, { useEffect } from "react";
import User from "../User/User";
import Post from "../Post/Post";
import { useDispatch, useSelector } from "react-redux";
import { getFollowingPost } from "../../Actions/User";
import Loader from "../Loader/Loader";
import { Typography } from "@mui/material";
const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFollowingPost());
  }, []);

  const { loading, posts, error } = useSelector(
    (state) => state.postOfFollowing
  );

  return loading ? (
    <Loader />
  ) : (
    <div className="home">
      <div className="homeLeft">
        {posts && posts.length > 0 ? (
          posts.map((posts) => {
            <Post
              key={posts._id}
            //   postImage={
            //     "https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832__480.jpg"
            //   }
            //   ownerName={"Jatin"}
            // //   caption={"This is a Sample Post"}
              postId={posts._id}
              caption={posts.caption}
              postImage={posts.image.url}
              likes={posts.likes}
              comments={posts.comments}
              ownerImage={posts.owner.avatar.url}
              ownerId={posts.owner._id}
              ownerName={posts.owner.name}
            />;
          })
        ) : (
          <Typography variant="h6">No Posts Yet</Typography>
        )}
      </div>
      <div className="homeRight">
        <User
          userId={"user._id"}
          name={"user.name"}
          avatar={
            "https://coursebari.com/wp-content/uploads/2021/06/899048ab0cc455154006fdb9676964b3.jpg"
          }
        />
      </div>
    </div>
  );
};

export default Home;
