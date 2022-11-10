import React, { useEffect, useState } from 'react';
import Layout from './../../../Components/Layout/Layout';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../../../redux/alertSlice';
import moment from "moment";
import { Table } from 'antd';


const UserAppointment = () => {
    const [userAppointment, setUserAppointment] = useState([]);
    const dispatch = useDispatch();


    const getAppointmentsData = async () => {
        try {
            dispatch(showLoading());
            const resposne = await axios.get("/api/user/get-appointments-by-user-id", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            dispatch(hideLoading());
            if (resposne.data.success) {
                setUserAppointment(resposne.data.data);
            }
        } catch (error) {
            dispatch(hideLoading());
        }
    };


    useEffect(() => {
        getAppointmentsData();
    }, [])

    const columns = [
        {
            title: "Id",
            dataIndex: "_id",
        },
        {
            title: "Doctor",
            dataIndex: "name",
            render: (text, record) => (
                <span>
                    {record.doctorInfo.firstName} {record.doctorInfo.lastName}
                </span>
            ),
        },
        {
            title: "Phone",
            dataIndex: "phoneNumber",
            render: (text, record) => (
                <span>
                    {record.doctorInfo.phoneNumber}
                </span>
            ),
        },
        {
            title: "Date & Time",
            dataIndex: "createdAt",
            render: (text, record) => (
                <span>
                    {moment(record.date).format("DD-MM-YYYY")} {moment(record.time).format("HH:mm")}
                </span>
            ),
        },
        {
            title: "Status",
            dataIndex: "status",
        }
    ];




    return (
        <Layout>
            <h1 className="page-title">Appointments</h1>
            <hr />
            <Table columns={columns} dataSource={userAppointment} />
        </Layout>
    );
};

export default UserAppointment;