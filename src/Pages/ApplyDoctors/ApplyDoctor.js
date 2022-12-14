
import React from 'react';
import Layout from './../../Components/Layout/Layout';
import axios from 'axios';
import toast from "react-hot-toast";
import { useDispatch, useSelector } from 'react-redux';
import { hideLoading, showLoading } from "../../redux/alertSlice";
import { useNavigate } from 'react-router-dom';
import DoctorForm from './../../Components/DoctorForm/DoctorForm';

const ApplyDoctors = () => {
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.user)
    const navigate = useNavigate();

    const onFinish = async (values) => {
        try {
            dispatch(showLoading())
            const response = await axios.post('https://hospital-server-22we.onrender.com/api/user/apply-doctor-account', { ...values, userId: user._id },{
                headers: {
                   Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            
            
            dispatch(hideLoading());
            if (response.data.success) {
              toast.success(response.data.message);
              navigate("/");
            } else {
              toast.error(response.data.message);
            }
          } catch (error) {
            dispatch(hideLoading());
            toast.error("Something went wrong");
          }
    }


    return (
        <Layout>
            <h1 className='page-title'>Apply Doctor</h1>
            <hr />

            <DoctorForm onFinish={onFinish} ></DoctorForm>
        </Layout>
    );
};

export default ApplyDoctors;