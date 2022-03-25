import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header/Header";
import Login from "./Components/Login/Login";
import Home from "./Components/Home/Home";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./Actions/User";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, []);

  const {isAuthenticated} = useSelector((state) => state.user);

  return (
    <Router>
      {
        isAuthenticated && <Header />
      }
      <Routes>
        <Route path="/" element={isAuthenticated?<Home/>:<Login/>} />
      </Routes>
    </Router>
  );
}

export default App;
