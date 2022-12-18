import { Button, Form, Input } from 'antd';
import axios from 'axios';
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import  toast  from 'react-hot-toast';
import {useDispatch} from 'react-redux';
import { hideLoading, showLoading } from "../../redux/alertSlice";
 
function Login() {

  const navigate=useNavigate();
 const dispatch = useDispatch()

  const onFinish=async(values)=>{
    try{
      dispatch(showLoading());
      const response=await axios.post('https://hospital-server-22we.onrender.com/api/user/login' ,values);
      if(response.data.success){
        toast.success(response.data.message);
        localStorage.setItem("token" ,response.data.data)
        navigate('/home')
        dispatch(hideLoading())
      }
      else{
        dispatch(hideLoading());
        toast.error(response.data.message)
      }
    }
    catch(error){
      dispatch(hideLoading());
      toast.error(error)
    }
  }


  return (
    <div className='authentication bg-img-login'>
    <div className='authentication-form card p-4'>
      <h1 className='card-title'>Welcome To Our Hospital</h1>

      <Form layout='vertical' onFinish={onFinish}>
        <Form.Item label="Email :" name='email'>
          <Input placeholder='Email'></Input>
        </Form.Item>
        <Form.Item label="Password :" name='password'>
          <Input placeholder='Password'></Input>
        </Form.Item>
        <Button className='primary-button mt-3 full-width-button' htmlType='submit'>Login</Button>
        <Link className='anchor my-3' to="/registration">If You Not register ? Please Register</Link>
      </Form>
    </div>
  </div>
  )
}

export default Login