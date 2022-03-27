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
