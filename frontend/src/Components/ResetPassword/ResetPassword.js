import React, { useState , useEffect} from 'react'
import "./ResetPassword.css"
import {Typography, Button } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { resetPassword } from '../../Actions/User'
import { useAlert } from 'react-alert'
const ResetPassword = () => {

    const[newPassword, setNewPassword] = useState('');
    const dispatch = useDispatch();
    const {error, loading, message} = useSelector((state) => state.like);
    const params = useParams();
    const alert = useAlert();

    const submitHandler=(e)=>{
        e.preventDefault();
        dispatch(resetPassword(params.token, newPassword));
    }

    useEffect(()=>{
        if(error){
            alert.error(error);
            dispatch({type:"clearErrors"})
        }
        if(message){
            alert.success(message);
            dispatch({type:"clearMessage"})
        }
    },[dispatch, alert, error, message]);

  return (
    <div className="resetPassword">
    <form className="resetPasswordForm" onSubmit={submitHandler}>
      <Typography variant="h3" style={{ padding: "2vmax" }} >
        SocioBook
      </Typography>
      <input
        type="password"
        placeholder="New Password"
        required
        value={newPassword}
        className="resetPasswordInputs"
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <Link to="/">
          <Typography>Login</Typography>
      </Link>
      <Typography>Or</Typography>
      <Link to='/forgot/password'>
          <Typography>Sent Another Token</Typography>
      </Link>
      <Button type="submit" disabled={loading}>Reset Password</Button>
    </form>
  </div>
  )
}

export default ResetPassword