import axios from "axios"

export const loginUser =(email, password)=>async(dispatch)=>{
    try {

        dispatch({
            type:"LoginRequest"
        });

        const{data} = await axios.post("/user/login",{email,password},{
            headers:{
                "Content-Type":"application/json"
            }
        });
        console.log(data.success);
        if(data.success === true){
            localStorage.setItem('token', data.token)
        }

        dispatch({
            type:"LoginSuccess",
            payload:data.user
        })
        
    } catch (error) {
        dispatch({
            type:"LoginFailure",
            payload:error,
        })
        
    }
}

//load user
export const loadUser = () => async (dispatch) => {
    try {
      dispatch({
        type: "LoadUserRequest",
      });
  
      const { data } = await axios.get("/user/me",{
        headers: {
            'Authorization': localStorage.getItem('token')
        }
      });
      console.log(data);
  
      dispatch({
        type: "LoadUserSuccess",
        payload: data.user
      });
    } catch (error) {
      dispatch({
        type: "LoadUserFailure",
        payload: error.response.data.message,
      });
    }
  };
  