import React,{useState} from "react";
import "./Post.css";
import { Link } from "react-router-dom";
import { Typography, Avatar, Button } from "@mui/material";
import {MoreVert, Favorite, FavoriteBorder, ChatBubbleOutline, DeleteOutline} from "@mui/icons-material"
const Post = ({
  postId,
  caption,
  postImage,
  likes = [],
  comments = [],
  ownerImage,
  ownerId,
  ownerName,
  isDelete = false,
  isAccount = false,
}) => {

    const[liked, setLiked] = useState(false);
    
    //like handler
    const handleLike=()=>{
        setLiked(!liked)
    }

  return (
    <div className="post">
      <div className="postHeader"></div>

      <div className="postDetails">
        <Avatar
          src={ownerImage}
          alt="User"
          sx={{
            height: "3vmax",
            width: "3vmax",
          }}
        />
        <Link to={`/user/${ownerId}`}>
          <Typography fontWeight={700}>{ownerName}</Typography>
        </Link>
        <Typography
          fontWeight={100}
          color="rgba(0,0,0,0.582)"
          style={{ alignSelf: "center" }}
        >
          {caption}
        </Typography>
      </div>
      <img src={postImage} alt="Post" />
      <button
        style={{
          border: "none",
          backgroundColor: "white",
          cursor: "pointer",
          margin: "1vmax 2vmax",
        }}
      >
        <Typography>5 Likes</Typography>
      </button>
      <div className="postFooter">
          <Button onClick={handleLike}>
              {
                  liked ? <Favorite style={{color:"red"}}/>:<FavoriteBorder/>
              }
          </Button>
          <Button>
              <ChatBubbleOutline/>
          </Button>
          <Button>
              <DeleteOutline/>
          </Button>
      </div>
    </div>
  );
};

export default Post;
