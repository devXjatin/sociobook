import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header/Header";
import Login from "./Components/Login/Login";
import Home from "./Components/Home/Home";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./Actions/User";
import Account from "./Components/Account/Account";
import NewPost from "./Components/NewPost/NewPost";
import Register from "./Components/Register/Register";
import UpdateProfile from "./Components/UpdateProfile/UpdateProfile";
import UpdatePassword from "./Components/UpdatePassword/UpdatePassword";
import ForgotPassword from "./Components/ForgotPassword/ForgotPassword";
import ResetPassword from "./Components/ResetPassword/ResetPassword";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  const {isAuthenticated} = useSelector((state) => state.user);

  return (
    <Router>
      {
        isAuthenticated && <Header />
      }
      <Routes>
        <Route path="/" element={isAuthenticated?<Home/>:<Login/>} />
        <Route path="/account" element={isAuthenticated?<Account/>:<Login/>} />
        <Route path="/register" element={isAuthenticated?<Account/>:<Register/>} />
        <Route path="/newpost" element={isAuthenticated?<NewPost/>:<Login/>} />
        <Route path="/update/profile" element={isAuthenticated?<UpdateProfile/>:<Login/>} />
        <Route path="/update/password" element={isAuthenticated?<UpdatePassword/>:<Login/>} />
        <Route path="/forgot/password" element={isAuthenticated?<UpdatePassword/>:<ForgotPassword/>} />
        <Route path="/reset/password/:token" element={isAuthenticated?<UpdatePassword/>:<ResetPassword/>} />
      </Routes>
    </Router>
  );
}

export default App;
