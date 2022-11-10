import React, { useState } from 'react';
import { Link, useLocation, Navigate, useNavigate } from 'react-router-dom';
import './Layout.css';
import { useSelector } from 'react-redux';
import { Badge } from 'antd';

const Layout = ({ children }) => {


    const location = useLocation();
    const [collapsed, setCollapsed] = useState(false);
    const { user } = useSelector((state) => state.user);
    const navigate = useNavigate();

    const userMenu = [
        {
            name: "Home",
            path: "/",
            icon: "ri-home-line",
        },
        {
            name: "Appointments",
            path: "/user/book-appointment",
            icon: "ri-file-list-line",
        },
        {
            name: "Apply Doctor",
            path: "/apply-doctor",
            icon: "ri-hospital-line",
        },

    ];

    const doctorMenu = [
        {
            name: "Home",
            path: "/",
            icon: "ri-home-line",
        },
        {
            name: "Appointments",
            path: "/doctor/appointment",
            icon: "ri-file-list-line",
        },
        {
            name: "Profile",
            path: `/doctor/profile/${user?._id}`,
            icon: "ri-user-line",
        },
    ];

    const adminMenu = [
        {
            name: "Home",
            path: "/",
            icon: "ri-home-line",
        },
        {
            name: "Users",
            path: "/admin/userslist",
            icon: "ri-user-line",
        },
        {
            name: "Doctors",
            path: "/admin/doctorslist",
            icon: "ri-user-star-line",
        },
        
    ];

  

    const menuToBeRendered = user?.isAdmin ? adminMenu : user?.isDoctor ? doctorMenu : userMenu;
    const role = user?.isAdmin ? "Admin" : user?.isDoctor ? "Doctor" : "User";


    return (
        <div className='main p-2'>
            <div className='d-flex layout'>

                <div className='sidebar'>
                    <div className="sidebar-header">
                        <h1 className="logo">T.H</h1>
                        <h1 className="role">{role}</h1>


                    </div>
                    <div className='menu'>
                        {menuToBeRendered.map(menu => {
                            const isActive = location.pathname === menu.path;
                            return (
                                <div className={`d-flex menu-item ${isActive && 'active-menu-item'}`} key={menu.path}>
                                    <i className={menu.icon}></i>
                                    {!collapsed && <Link to={menu.path}>{menu.name}</Link>}
                                </div>)
                        })}

                        {/* Profile  */}
                        <div className={`d-flex menu-item `} onClick={() => {
                            navigate("/about");
                        }}
                        >
                            <i className="ri-information-fill"></i>
                            {!collapsed && <Link to="/login">About</Link>}
                        </div>

                        {/* Logout  */}

                        <div className={`d-flex menu-item `} onClick={() => {
                            localStorage.clear();
                            navigate("/login");
                        }}
                        >
                            <i className="ri-logout-circle-line"></i>
                            {!collapsed && <Link to="/login">Logout</Link>}
                        </div>
                    </div>
                </div>

                <div className='content'>

                    <div className='header'>
                        {collapsed ? (
                            <i
                                className="ri-menu-2-fill header-action-icon"
                                onClick={() => setCollapsed(false)}
                            ></i>
                        ) : (<i
                            className="ri-close-fill header-action-icon"
                            onClick={() => setCollapsed(true)}
                        ></i>
                        )}

                        {/* User & Notification  */}

                        <div className="d-flex align-items-center px-4">
                            <Badge  count={user?.unseenNotifications.length} onClick={()=>navigate('/notifications')}>
                                <i className="ri-notification-line header-action-icon px-3"></i>
                            </Badge>

                            <Link className="anchor mx-2 " to="/profile">
                                {user?.name}
                            </Link>

                        </div>



                        {/* End User & Notification */}


                    </div>

                    <div className='body'>
                        {children}
                        <span className='my-5 d-flex justify-content-end'> <p> Copyright  &copy;  {new Date().getFullYear()} Mohammed Jobair Hossain </p> </span>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Layout;