import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../../redux/alertSlice'
import Layout from '../../Components/Layout/Layout';
import { Row, Col } from 'antd';
import Doctor from './../../Components/Doctor/Doctor';


const Home = () => {

    const [doctors, setDoctors] = useState([]);
    const dispatch = useDispatch();

    const AxiosConfig = {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),

        }
    };

    const getData = async () => {
        try {
            dispatch(showLoading())
            const response = await axios.post("https://hospital-server-production.up.railway.app/api/user/get-user-info-by-id", {}, AxiosConfig)
            dispatch(hideLoading())
        } catch (error) {
            dispatch(hideLoading())

        }
    }

    const getAllApprovedDoctor = async () => {

        try {
            dispatch(showLoading())
            const response = await axios.get("https://hospital-server-production.up.railway.app/api/user/get-all-approved-doctors", {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            });
            dispatch(hideLoading())
            if (response.data.success) {
                setDoctors(response.data.data);
            }
        } catch (error) {
            dispatch(hideLoading())
        }
    }




    useEffect(() => {
        getData();
        getAllApprovedDoctor();
    }, []);

    return (
        <Layout>
            <Row gutter={20}>
                {doctors.map((doctor) => (
                    <Col key={doctor._id} span={8} xs={24} sm={24} lg={8}>
                        <Doctor doctor={doctor} />
                    </Col>
                ))}
            </Row>
        </Layout>
    );
};

export default Home;