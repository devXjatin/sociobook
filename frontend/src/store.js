import {configureStore} from "@reduxjs/toolkit"
import { userReducer, postOfFollowingReducer, allUsersReducer } from "./Reducers/User";


const store = configureStore({
    reducer:{
        user:userReducer,
        postOfFollowing:postOfFollowingReducer,
        allUsers:allUsersReducer
    }
});

export default store;