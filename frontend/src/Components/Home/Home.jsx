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
          posts.map((post) => {
            console.log(post.image.url);
            return (
              <Post
                key={post._id}
                postId={post._id}
                caption={post.caption}
                postImage={post.image.url}
                likes={post.likes}
                comments={post.comments}
                ownerImage={post.owner.avatar.url}
                ownerId={post.owner._id}
                ownerName={post.owner.name}
              />
            );
          })
        ) : 
        (
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
