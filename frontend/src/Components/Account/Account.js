import React, { useEffect } from "react";
import "./Account.css";
import { useDispatch, useSelector } from "react-redux";
import { getMyPosts } from "../../Actions/User";
import Loader from "../Loader/Loader";
import Post from "../Post/Post";
import { Typography, Avatar } from "@mui/material";

const Account = () => {
  const dispatch = useDispatch();

  const {user, loading:userLoading} = useSelector((state)=> state.user)

  const { loading, error, posts } = useSelector((state) => state.myPosts);

  const { error: likeError, message } = useSelector((state) => state.like);
  useEffect(() => {
    dispatch(getMyPosts());
  }, [dispatch]);

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

  },[error, message, likeError, dispatch])

  return loading===true || userLoading===true? (
    <Loader />
  ): (
    <div className="account">
      <div className="accountLeft">
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
          <Typography variant="h6">No posts</Typography>
        )}
      </div>
      <div className="accountRight">
        <Avatar src={user.avatar.url}
        sx={{height:"8vmax", width:"8vmax"}}
        />
        <Typography variant="h6">{user.name}</Typography>
        <div>
          <button>
            <Typography>
              Followers
            </Typography>
          </button>
          <Typography>{user.followers.length}</Typography>
        </div>
        <div>
          <button>
            <Typography>
              Following
            </Typography>
          </button>
          <Typography>{user.following.length}</Typography>
        </div>
        <div>
            <Typography>
              Post
            </Typography>
          <Typography>{user.posts.length}</Typography>
        </div>
      </div>
    </div>
  );
};

export default Account;
