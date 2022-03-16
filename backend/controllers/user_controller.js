const res = require("express/lib/response");
const user = require("../model/user");
const User = require("../model/user");

//register user
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });

    //user exist
    if (user) {
      return res.status(400).json({
        success: false,
        message: "User already Exists",
      });
    }

    //create user
    user = await User.create({
      name,
      email,
      password,
      avatar: { public_id: "sample_id", url: "sample_url" },
    });
    await user.save();
    let token = user.generateToken();
    const options = {
      expires: new Date(Date.now() + 60 * 60 * 10000),
      httpOnly: true,
    };
    token = "Bearer " + token;

    res.status(200).cookie("token", token, options).json({
      success: true,
      user,
      token: token,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

//login user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "user doesn't exist",
      });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invaild Creditinals",
      });
    }

    let token = user.generateToken();
    const options = {
      httpOnly: true,
    };
    token = "Bearer " + token;

    res.status(200).cookie("token", token, options).json({
      success: true,
      user,
      token: token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//logout
exports.logout = async (req, res) => {
  res
    .status(200)
    .cookie("tokken", null, { expires: new Date(Date.now()), httpOnly: true })
    .json({
      success: true,
      message: "Logged Out Successfully!",
    });
};

//follow user
exports.followUser = async (req, res) => {
  try {
    const userToFollow = await User.findById(req.params.id);
    const userLoggedIn = await User.findById(req.user._id);
    if (!userToFollow) {
      return res.status(500).json({
        success: false,
        message: "User Not found",
      });
    }

    if (userLoggedIn.following.includes(userToFollow._id)) {
      userLoggedIn.following.pull(userToFollow._id);
      userToFollow.followers.pull(userLoggedIn._id);
      await userLoggedIn.save();
      await userToFollow.save();
      res.status(200).json({
        success: true,
        message: "User Unfollowed",
      });
    } else {
      //push follower id to logged in user following
      userLoggedIn.following.push(userToFollow._id);

      //push logged in user id to follower
      userToFollow.followers.push(userLoggedIn._id);

      await userLoggedIn.save();
      await userToFollow.save();

      res.status(200).json({
        success: true,
        message: "User Followed",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//update password
exports.updatePassword = async(req, res)=>{
  try {
    const user = await User.findById(req.user._id).select("+password");
    const {oldPassword, newPassword} =req.body
    if(!oldPassword || !newPassword){
      return res.status(400).json({
        success:false,
        message:"Please Provide old and new password"
      })
    }
    
    const isMatch = await user.matchPassword(oldPassword);
    if(!isMatch){
      return res.status(400).json({
        success:false,
        message:"Incorrect Old Password"
      })
    }

    user.password = newPassword;
    await user.save();
    res.status(200).json({
      success:true,
      message:"Password Updated"
    })

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

//update profile 
exports.updateProfile = async(req, res)=>{
  try {
    const user = await User.findById(req.user._id);
    const { name, email} = req.body;
    if(!name || !email){
      return res.status(400).json({
        success:false, 
        message:"Please provide name and email"
      })
    }
    user.name = name;
    user.email = email;
    await user.save();

    res.status(200).json({
      success:true,
      message:"Profile Updated"
    })

  } catch (error) {
    res.status(500).json({
      success:false,
      message:error.message
    })
    
  }
}
