import React, { useEffect } from "react";
import User from "../User/User";
import Post from "../Post/Post";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, getFollowingPost } from "../../Actions/User";
import Loader from "../Loader/Loader";
import { Typography } from "@mui/material";
import {useAlert} from "react-alert"
const Home = () => {
  const alert = useAlert();
  
  const dispatch = useDispatch();

  const { loading, posts, error } = useSelector(
    (state) => state.postOfFollowing
  );

  const {
    users,
    loading: loadingUsers,
  } = useSelector((state) => state.allUsers);

  const {error:likeError, message} = useSelector((state)=>state.like);

  useEffect(() => {
    dispatch(getFollowingPost());
    dispatch(getAllUsers());
  }, [dispatch]);

  //useEffect for show post liked and unliked notification
  useEffect(()=>{
    if(error){
      alert.error(error);
      dispatch({
        type:"clearErrors"
      })
    }
    if(likeError){
      alert.error(likeError);
      dispatch({
        type:"clearErrors"
      })
    }
    if(message){
      alert.success(message)
      dispatch({
        type:"clearMessage"
      })
    }

  },[alert, error, message, likeError, dispatch])

  return loading === true || loadingUsers === true ? (
    <Loader />
  ) : (
    <div className="home">
      <div className="homeLeft">
        {posts && posts.length > 0 ? (
          posts.map((post) => {
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
        ) : (
          <Typography variant="h6">No Posts Yet</Typography>
        )}
      </div>
      <div className="homeRight">
        {users && users.length > 0 ? (
          users.map((user) => {
            return (
              <User
                key={user._id}
                userId={user._id}
                name={user.name}
                avatar={user.avatar.url}
              />
            );
          })
        ) : (
          <Typography variant="h6">No Users Yet</Typography>
        )}
      </div>
    </div>
  );
};

export default Home;
