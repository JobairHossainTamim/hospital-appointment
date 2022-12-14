import React, { useEffect, useState } from "react";
import Layout from './../../../Components/Layout/Layout';
import { useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../../../redux/alertSlice';
import axios from "axios";
import { Table } from "antd";
import moment from "moment";


const UserList = () => {

    const [users, setUsers] = useState([]);
    const dispatch = useDispatch();


    const getUsersData = async () => {
        try {
            dispatch(showLoading());
            const response = await axios.get("https://hospital-server-22we.onrender.com/api/admin/get-all-users", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            dispatch(hideLoading());
            if (response.data.success) {
                setUsers(response.data.data);
            }
        } catch (error) {
            dispatch(hideLoading());
        }
    };

    // 
    useEffect(() => {
        getUsersData();

    }, []);


    const columns = [
        {
          title: "Name",
          dataIndex: "name",
        },
        {
          title: "Email",
          dataIndex: "email",
        },
        {
          title: "Created At",
          dataIndex: "createdAt",
          render: (record , text) => moment(record.createdAt).format("DD-MM-YYYY"),
        },
        {
          title: "Actions",
          dataIndex: "actions",
          render: (text, record) => (
            <div className="d-flex">
              <h1 className="anchor">Block</h1>
            </div>
          ),
        },
      ];


    return (
        <Layout>
            <h1 className="page-header">Users List</h1>
            <hr />
            <Table columns={columns} dataSource={users} key={columns.title} />
        </Layout>
    );
};

export default UserList;