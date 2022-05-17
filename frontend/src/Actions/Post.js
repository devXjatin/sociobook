import axios from "axios";

//Post like and Unliked
export const likePost = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "likeRequest",
    });

    const { data } = await axios.get(`/post/${id}`, {
      headers: { Authorization: localStorage.getItem("token") },
    });

    dispatch({
      type: "likeSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "likeFailure",
      payload: error.response.data.message,
    });
  }
};

//add comment to post
export const addCommentOnPost = (id, comment) => async (dispatch) => {
  try {
    dispatch({
      type: "addCommentRequest",
    });

    const { data } = await axios.put(
      `/post/comment/${id}`,
      {
        comment,
      },
      {
        headers: {
          Authorization: localStorage.getItem("token"),
          "Content-type": "application/json",
        },
      }
    );

    dispatch({
      type: "addCommentSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "addCommentFailure",
      payload: error.response.data.message,
    });
  }
};

//delete comment on post
export const deleteCommentOnPost = (id, commentId) => async (dispatch) => {
  console.log(commentId);
  try {
    dispatch({
      type: "deleteCommentRequest",
    });

    const { data } = await axios.delete(
      `/post/comment/${id}`,
     
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      },
      {
        commentId,
      },

     
    );

    dispatch({
      type: "deleteCommentSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "deleteCommentFailure",
      payload: error.response.data.message,
    });
  }
};

//create new post
export const createNewPost = (caption, image) => async (dispatch) => {
  try {
    dispatch({
      type: "newPostRequest",
    });

    const { data } = await axios.post(
      "/post/create",
      {
        caption: caption,
        image: image,
      },

      {
        headers: {
          "Content-type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      }
    );

    dispatch({
      type: "newPostSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "newPostFailure",
      payload: error.response.data.message,
    });
  }
};

//update Caption
export const updateCaption = (caption, id) => async (dispatch) => {
  try {
    dispatch({
      type: "updateCaptionRequest",
    });

    const { data } = await axios.put(
      `/post/${id}`,
      {
        caption: caption,
      },

      {
        headers: {
          "Content-type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      }
    );

    dispatch({
      type: "updateCaptionSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "updateCaptionFailure",
      payload: error.response.data.message,
    });
  }
};

//delete post
export const deletePost = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "deletePostRequest",
    });

    const { data } = await axios.delete(`/post/${id}`, {
      headers: {
        "Content-type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    });

    dispatch({
      type: "deletePostSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "deletePostFailure",
      payload: error.response.data.message,
    });
  }
};
