import React from "react";
import "./Login.css";
import { Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="login">
      <form className="loginForm">
        <Typography variant="h3" style={{ padding: "2vmax" }}>
          SocioBook
        </Typography>
        <input type="email" />
        <input type="password" />

        <Link to="/user/forgot/password">
          <Typography>Forgot Password</Typography>
        </Link>

        <Button>Login</Button>

        <Link to="/user/register">
          <Typography>New User?</Typography>
        </Link>
      </form>
    </div>
  );
};

export default Login;
