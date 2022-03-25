import React from "react";
import User from "../User/User";
import Post from "../Post/Post";
const Home = () => {
  return (
    <div className="home">
      <div className="homeLeft">
        <Post
          postImage={
            "https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832__480.jpg"
          }
          ownerName={"Jatin"}
          caption={"This is a Sample Post"}
        />
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
