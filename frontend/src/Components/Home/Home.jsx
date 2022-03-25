import React from 'react'
import User from "../User/User";
const Home = () => {
  return (
    <div className='home'>
        <div className='homeLeft'></div>
        <div className='homeRight'>
            <User
            userId={"user._id"}
            name={"user.name"}
            avatar={"https://coursebari.com/wp-content/uploads/2021/06/899048ab0cc455154006fdb9676964b3.jpg"}
            />
        </div>
    </div>
  )
}

export default Home