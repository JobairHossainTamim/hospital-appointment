import React from 'react'
import { Button, Form, Input } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import './Register.css';
import axios from 'axios';
import toast from "react-hot-toast";
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from "../../redux/alertSlice";




function Register() {

  const navigate=useNavigate();
  const dispatch=useDispatch();

const onFinish=async(values)=>{
  try{
    dispatch(showLoading())
    const response=await axios.post('/api/user/register' ,values);
    if(response.data.success){
      toast.success(response.data.message);
      toast("Redirect To Login Page");
      navigate("/login");
      dispatch(hideLoading())
    }
    else{
      dispatch(hideLoading())
      toast.error(response.data.message)
    }
  }
  catch(error){
    dispatch(hideLoading);
    toast.error(error)
  }
}


  return (
    <div className='authentication bg-img-register'>
      <div className='authentication-form card p-4'>
        <h1 className='card-title'>Nice to meet you</h1>

        <Form layout='vertical' onFinish={onFinish}>
          <Form.Item label="Name :" name='name'>
            <Input placeholder='Name'></Input>
          </Form.Item>
          <Form.Item label="Email :" name='email'>
            <Input placeholder='Email'></Input>
          </Form.Item>
          <Form.Item label="Password :" name='password'>
            <Input placeholder='Password'></Input>
          </Form.Item>
          <Button className='primary-button mt-3 full-width-button' htmlType='submit'>Register</Button>
          <Link className='anchor my-3' to="/login">Click Hear to Login</Link>
        </Form>
      </div>
    </div>
  )
}

export default Register;