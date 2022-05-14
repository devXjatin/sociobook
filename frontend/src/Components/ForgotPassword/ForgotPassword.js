import React, {useState, useEffect} from 'react'
import {Typography, Button} from '@mui/material'
import {useDispatch, useSelector} from 'react-redux'
import {useAlert} from 'react-alert'
import "./ForgotPassword.css"
import { forgotPassword } from '../../Actions/User'

const ForgotPassword = () => {
    const[email, setEmail] = useState('');
    const dispatch = useDispatch()
    const {error, loading, message} = useSelector((state) => state.like)
    const alert= useAlert()
    const submitHandler=(e)=>{
        e.preventDefault();
        dispatch(forgotPassword(email));
    }

    useEffect(()=>{
        if(error){
            console.log(error)
            alert.error(error);
            dispatch({type:"clearErrors"})
        }
        if(message){
            alert.success(message);
            dispatch({type:"clearMessage"})
        }
    },[dispatch,alert, error, message]);

  return (
    <div className="forgotPassword">
    <form className="forgotPasswordForm" onSubmit={submitHandler}>
      <Typography variant="h3" style={{ padding: "2vmax" }}>
        SocioBook
      </Typography>
      <input
        type="email"
        placeholder="Email"
        required
        value={email}
        className="forgotPasswordInputs"
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button type="submit" disabled={loading}>SEND EMAIL</Button>
    </form>
  </div>
  )
}

export default ForgotPassword