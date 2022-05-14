import axios from "axios";

export const loginUser = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: "LoginRequest",
    });

    const { data } = await axios.post(
      "/user/login",
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(data.success);
    if (data.success === true) {
      localStorage.setItem("token", data.token);
    }

    dispatch({
      type: "LoginSuccess",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "LoginFailure",
      payload: error,
    });
  }
};


//register User
export const registerUser = (name, email, password, avatar) => async (dispatch) => {
  try {
    dispatch({
      type: "RegisterRequest",
    });

    const { data } = await axios.post(
      "/user/register",
      {name, email, password,avatar },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(data.success);
    if (data.success === true) {
      localStorage.setItem("token", data.token);
    }

    dispatch({
      type: "RegisterSuccess",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "RegisterFailure",
      payload: error,
    });
  }
};

//update user profile
export const updateProfile = (name, email,avatar) => async (dispatch) => {
  try {
    dispatch({
      type: "updateProfileRequest",
    });

    const { data }  = await axios.put(
      "/user/update/profile",
      {name, email,avatar},
      {
        headers: {
          Authorization: localStorage.getItem("token"),
          "Content-Type": "application/json",
        
        },
      }
    );
    dispatch({
      type: "updateProfileSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "updateProfileFailure",
      payload: error.response.data.message
    });
  }
};


//update password

//update user profile
export const updatePassword = (oldPassword, newPassword) => async (dispatch) => {
  try {
    dispatch({
      type: "updatePasswordRequest",
    });

    const { data }  = await axios.put(
      "/user/update/password",
      {oldPassword, newPassword},
      {
        headers: {
          Authorization: localStorage.getItem("token"),
          "Content-Type": "application/json",
        
        },
      }
    );
    dispatch({
      type: "updatePasswordSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "updatePasswordFailure",
      payload: error.response.data.message
    });
  }
};

//logout
export const logoutUser = () => async (dispatch) => {
  try {
    dispatch({
      type: "LogoutUserRequest",
    });

    const { data } = await axios.get("/user/logout")
    console.log(data.success);
    if (data.success === true) {
      localStorage.clear();
    }
    dispatch({
      type: "LogoutUserSuccess",
    });
  } catch (error) {
    dispatch({
      type: "LogoutUserFailure",
      payload: error,
    });
  }
};

//load user
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({
      type: "LoadUserRequest",
    });

    const { data } = await axios.get("/user/me", {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });

    dispatch({
      type: "LoadUserSuccess",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "LoadUserFailure",
      payload: error.response.data.message,
    });
  }
};

//get post
export const getFollowingPost = () => async (dispatch) => {
  try {
    dispatch({
      type: "postOfFollowingRequest",
    });

    const { data } = await axios.get("/post/posts", {
      headers: { Authorization: localStorage.getItem("token") },
    });
    // console.log(data)

    dispatch({
      type: "postOfFollowingSuccess",
      payload : data.posts,
    });
  } catch (error) {
    dispatch({
      type: "postOfFollowingFailure",
      payload: error.response.data.message,
    });
  }
};

//get my post
export const getMyPosts = () => async (dispatch) => {
  try {
    dispatch({
      type: "myPostsRequest",
    });

    const { data }  = await axios.get("/user/my/posts", {
      headers: { Authorization: localStorage.getItem("token") },
    });
    dispatch({
      type: "myPostsSuccess",
      payload : data.posts,
    });
  } catch (error) {
    dispatch({
      type: "myPostsFailure",
      payload: error.response.data.message,
    });
  }
};

//get all users
export const getAllUsers = () => async (dispatch) => {
  try {
    dispatch({
      type: "allUsersRequest",
    });

    const { data } = await axios.get("/user/users", {
      headers: { Authorization: localStorage.getItem("token") },
    });

    dispatch({
      type: "allUsersSuccess",
      payload : data.users,
    });
  } catch (error) {
    dispatch({
      type: "allUsersFailure",
      payload: error.response.data.message,
    });
  }
};

