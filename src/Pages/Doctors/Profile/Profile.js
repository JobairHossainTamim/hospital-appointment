import React, { useEffect, useState } from 'react'
import Layout from '../../../Components/Layout/Layout';
import { toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../../../redux/alertSlice";
import DoctorForm from '../../../Components/DoctorForm/DoctorForm';


const Profile = () => {

    const { user } = useSelector((state) => state.user);
    const params = useParams();
    const [doctor, setDoctor] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();






    const getDoctorData = async () => {
        try {
            dispatch(showLoading());
            const response = await axios.post("https://hospital-server-22we.onrender.com/api/doctor/get-doctor-info-by-user-id", { userId: params.userId, },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            dispatch(hideLoading());
            if (response.data.success) {
                setDoctor(response.data.data);
            }
        } catch (error) {
            console.log(error);
            dispatch(hideLoading());
        }
    };




    useEffect(() => {
        getDoctorData();
    }, []);


    const onFinish = async (values) => {
        try {
          dispatch(showLoading());
          const response = await axios.post(
            "https://hospital-server-22we.onrender.com/api/doctor/update-doctor-profile",
            {
              ...values,
              userId: user._id,
              timings: [
                moment(values.timings[0]).format("HH:mm"),
                moment(values.timings[1]).format("HH:mm"),
              ],
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
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
      };


    return (
        <Layout>
            {doctor && <DoctorForm onFinish={onFinish} initivalValues={doctor} />}
        </Layout>
    )
}

export default Profile;
