import React, { useEffect, useState } from 'react';
import Layout from '../../../Components/Layout/Layout';
import { useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../../../redux/alertSlice';
import axios from "axios";
import { Table } from "antd";
import moment from "moment";
import  toast  from 'react-hot-toast';

const DoctorList = () => {
    const [doctors, setDoctors] = useState([]);
    const dispatch = useDispatch();



    const getDoctorsData = async () => {
        try {
            dispatch(showLoading());
            const response = await axios.get("/api/admin/get-all-doctors", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            dispatch(hideLoading());
            if (response.data.success) {
                setDoctors(response.data.data);
            }
        } catch (error) {
            dispatch(hideLoading());
        }
    };




    useEffect(() => {
        getDoctorsData();
    }, []);

    const changeDoctorStatus =async(record, status) => {
        try {
            dispatch(showLoading());
            const response = await axios.post("/api/admin/change-doctor-account-status",{ doctorId: record._id, userId: record.userId, status: status },
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              }
            );
            dispatch(hideLoading());
            if (response.data.success) {
              toast.success(response.data.message);
              getDoctorsData();
            }
          } catch (error) {
            toast.error('Error changing doctor account status');
            dispatch(hideLoading());
          }
    }



    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            render: (text, record) => (
                <span>
                    {record.firstName} {record.lastName}
                </span>
            ),
        },
        {
            title: "Phone",
            dataIndex: "phoneNumber",
        },
        {
            title: "Created At",
            dataIndex: "createdAt",
            render: (record, text) => moment(record.createdAt).format("DD-MM-YYYY"),
        },
        {
            title: "status",
            dataIndex: "status",
        },
        {
            title: "Actions",
            dataIndex: "actions",
            render: (text, record) => (
                <div className="d-flex">
                    {record.status === "pending" && (
                        <h1
                            className="anchor"
                            onClick={() => changeDoctorStatus(record, "approved")}
                        >
                            Approve
                        </h1>
                    )}
                    {record.status === "approved" && (
                        <h1
                            className="anchor"
                            onClick={() => changeDoctorStatus(record, "blocked")}
                        >
                            Block
                        </h1>
                    )}
                </div>
            ),
        },
    ];




    return (
        <div>
            <Layout>
                <h1 className="page-header">Doctors List</h1>
                <hr />
                <Table columns={columns} dataSource={doctors} />
            </Layout>
        </div>
    );
};

export default DoctorList;