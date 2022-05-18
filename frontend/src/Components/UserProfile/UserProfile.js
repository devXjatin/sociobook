import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {followAndUnfollowUser, getUsersPosts, getUsersProfile} from "../../Actions/User";
import Loader from "../Loader/Loader";
import Post from "../Post/Post";
import { Typography, Avatar, Button, Dialog } from "@mui/material";
import {useParams } from "react-router-dom";
import User from "../User/User";
import { useAlert } from "react-alert";

const UserProfile = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const [followersToggle, setFollowersToggle] = useState(false);
  const [followingToggle, setFollowingToggle] = useState(false);
  const [following, setFollowing] = useState(false);
  const [myProfile, setMyProfile] = useState(false);

  const params = useParams();

  const { user, loading: userLoading, error:userError } = useSelector(
    (state) => state.userProfile
  );

  const { user: me } = useSelector((state) => state.user);
  const { loading, error, posts } = useSelector((state) => state.userPosts);

  const { error: followError, message, loading:followLoading} = useSelector((state) => state.like);

  const followHandler = async()=>{
      setFollowing(!following)
      await dispatch(followAndUnfollowUser(params.id))
        dispatch(getUsersProfile(params.id))
    }

  useEffect(() => {
    dispatch(getUsersPosts(params.id));
    dispatch(getUsersProfile(params.id));
  }, [dispatch, params.id]);

  useEffect(() => {
    if (me._id === params.id) {
        setMyProfile(true);
      }
      if(user){
          user.followers.forEach(item=>{
              if(item._id === me._id){
                  setFollowing(true);
              }else{
                  setFollowing(false)
              }
          })
      }
  },[user, me._id, params.id])

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({
        type: "clearErrors",
      });
    }
    if (followError) {
      alert.error(followError);
      dispatch({
        type: "clearErrors",
      });
    }
    if (userError) {
      alert.error(userError);
      dispatch({
        type: "clearErrors",
      });
    }
    if (message) {
      alert.success(message);
      dispatch({
        type: "clearMessage",
      });
    }
  }, [error, message, userError, followError, dispatch, alert]);

  return loading === true || userLoading === true ? (
    <Loader />
  ) : (
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
          <Typography variant="h6">No posts Yet</Typography>
        )}
      </div>
      <div className="accountRight">
        {user && (
          <>
            <Avatar
              src={user.avatar.url}
              sx={{ height: "8vmax", width: "8vmax" }}
            />
            <Typography variant="h6">{user.name}</Typography>
            <div>
              <button onClick={() => setFollowersToggle(!followersToggle)}>
                <Typography>Followers</Typography>
              </button>
              <Typography>{user.followers.length}</Typography>
            </div>
            <div>
              <button onClick={() => setFollowingToggle(!followingToggle)}>
                <Typography>Following</Typography>
              </button>
              <Typography>{user.following.length}</Typography>
            </div>
            <div>
              <Typography>Post</Typography>
              <Typography>{user.posts.length}</Typography>
            </div>
            {myProfile ? null : (
              <Button
              disabled={followLoading}
              onClick={followHandler}
                variant="contained"
                style={{ background: following ? "red" : "" }}
              >
                {following ? "Unfollow" : "Follow"}
              </Button>
            )}
          </>
        )}

        {/* followers dialogbox */}
        <Dialog
          open={followersToggle}
          onClose={() => setFollowersToggle(!followersToggle)}
        >
          <div className="dialogBox">
            <Typography variant="h4">Followers</Typography>
            {user && user.followers.length > 0 ? (
              user.followers.map((follower) => {
                return (
                  <User
                    key={follower._id}
                    userId={follower._id}
                    name={follower.name}
                    avatar={follower.avatar.url}
                  />
                );
              })
            ) : (
              <Typography style={{ margin: "2vmax" }}>
                You Have No Followers
              </Typography>
            )}
          </div>
        </Dialog>

        {/* following dialogBox */}
        <Dialog
          open={followingToggle}
          onClose={() => setFollowingToggle(!followingToggle)}
        >
          <div className="dialogBox">
            <Typography variant="h4">Following</Typography>
            {user && user.following.length > 0 ? (
              user.following.map((follow) => {
                return (
                  <User
                    key={follow._id}
                    userId={follow._id}
                    name={follow.name}
                    avatar={follow.avatar.url}
                  />
                );
              })
            ) : (
              <Typography style={{ margin: "2vmax" }}>
                You are not Following Anyone{" "}
              </Typography>
            )}
          </div>
        </Dialog>
      </div>
    </div>
  );
};

export default UserProfile;
