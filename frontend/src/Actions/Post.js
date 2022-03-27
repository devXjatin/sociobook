import axios from 'axios';

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
        payload : data.message,
      });
    } catch (error) {
      dispatch({
        type: "likeFailure",
        payload: error.response.data.message,
      });
    }
  };