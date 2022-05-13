import React, { useEffect, useState } from "react";
import "./Register.css";
import { Typography, Button, Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../Actions/User";
import {useAlert} from 'react-alert';
const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [password, setPassword] = useState("");

  const{loading, error} = useSelector((state)=>state.user);

  const dispatch = useDispatch();

  const alert = useAlert();

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    const Reader = new FileReader();
    Reader.readAsDataURL(file);

    Reader.onload=()=>{
        if(Reader.readyState === 2){
            setAvatar(Reader.result);
        }
    }
  }

  const handleSubmit = (e) => {
      e.preventDefault();
      dispatch(registerUser(name, email, password, avatar));
  }

  useEffect(()=>{
    if(error){
        alert.error(error);
        dispatch({type:"clearErrors"});
    }
  },[dispatch, error, alert])

  return (
    <div className="register">
      <form className="registerForm" onSubmit={handleSubmit}>
        <Typography variant="h3" style={{ padding: "2vmax" }}>
          SocioBook
        </Typography>

        <Avatar
          src={avatar}
          alt="User"
          sx={{ height: "10vmax", width: "10vmax" }}
        />

        <input type="file" accept="image/*" onChange={handleImageChange} />

        <input
          className="registerInputs"
          type="text"
          placeholder="Name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="registerInputs"
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="registerInputs"
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Link to="/"><Typography>  Already Sign Up? Login Now</Typography></Link>
        <Button disabled={loading} type="submit">SIGN UP</Button>
      </form>
    </div>
  );
};

export default Register;
