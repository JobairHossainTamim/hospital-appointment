import './App.css';
// import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'

import 'antd/dist/antd.min.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import  { Toaster } from 'react-hot-toast';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import Home from "./Pages/Home/Home";
import Loader from './Components/Loader/Loader';
import { useSelector } from 'react-redux';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import PublicRoute from './Components/PublicRoutes/PublicRoute';
import ApplyDoctors from './Pages/ApplyDoctors/ApplyDoctor';
import Notification from './Pages/Notification/Notification';
import DoctorList from './Pages/Admin/DoctorList/DoctorList';
import UserList from './Pages/Admin/UserList/UserList';
import Profile from './Pages/Doctors/Profile/Profile';
import BookAppointment from './Pages/BookAppointment/BookAppointment';
import Appointment from './Pages/Doctors/Appointment/Appointment';
import UserAppointment from './Pages/User/UserAppointment/UserAppointment';
import About from './Pages/AboutMe/About';


function App() {

  const { loading } = useSelector((state) => state.alerts);

  return (
    <div>
      <Router>
        {
          loading && (<Loader />)
        }
        <Toaster position="top-center" reverseOrder={false} />
        <Routes>
          <Route exact path='/' element={<ProtectedRoute><Home></Home></ProtectedRoute>}></Route>
          <Route exact path='/login' element={<PublicRoute><Login></Login></PublicRoute>}></Route>
          <Route exact path='/registration' element={<PublicRoute><Register></Register></PublicRoute>}></Route>
          <Route exact path='/home' element={<ProtectedRoute><Home></Home></ProtectedRoute>}></Route>
          <Route exact path='/apply-doctor' element={<ProtectedRoute><ApplyDoctors></ApplyDoctors></ProtectedRoute>}></Route>
          <Route exact path='/notifications' element={<ProtectedRoute><Notification></Notification></ProtectedRoute>}></Route>
          <Route exact path='/admin/doctorslist' element={<ProtectedRoute><DoctorList></DoctorList></ProtectedRoute>}></Route>
          <Route exact path='/admin/userslist' element={<ProtectedRoute><UserList></UserList></ProtectedRoute>}></Route>
          <Route exact path='/doctor/profile/:doctorId' element={<ProtectedRoute><Profile></Profile></ProtectedRoute>}></Route>
          <Route exact path='/doctor/appointment' element={<ProtectedRoute><Appointment></Appointment></ProtectedRoute>}></Route>
          <Route exact path='/book-appointment/:doctorId' element={<ProtectedRoute><BookAppointment></BookAppointment></ProtectedRoute>}></Route>
          <Route exact path='/user/book-appointment' element={<ProtectedRoute><UserAppointment></UserAppointment></ProtectedRoute>}></Route>
          <Route exact path='/about' element={<ProtectedRoute><About></About></ProtectedRoute>}></Route>

        </Routes>
      </Router>

    </div>
  );
}

export default App;
