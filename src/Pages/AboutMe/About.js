import React from 'react';
import Layout from './../../Components/Layout/Layout';
import img from '../../Assets/filename.jpg';
import './About.css';

const About = () => {
    return (
        <Layout>

            <div className='d-flex flex-column mb-3 align-items-center'>

                <h1 className='page-title'>Developed By</h1>
                <img src={img} alt=""></img>

                <div className='my-4'>
                    <h3><b>Mohammed Jobair Hossain  </b>(MERN  Developer )</h3>
                    <p>Address: Nazir Road, Feni Sadar, Feni. Bangladesh</p>
                    <h4>Contact: +8801630372177</h4>
                    <h4> Email : mohammadjobairhossain@gmail.com  </h4>
                </div>

                <ul className="socialIcons">
                    <li className="github"><a href="https://github.com/JobairHossainTamim"><i className="ri-github-fill"></i>Github</a></li>
                    <li className="facebook"><a href="https://www.facebook.com/profile.php?id=100012141661981"><i className="ri-facebook-circle-fill"></i>Facebook</a></li>
                    <li className="instagram"><a href="https://www.instagram.com/jobair_hossain_tamim/"><i className="ri-instagram-line"></i>Instagram</a></li>

                </ul>

            </div>

        </Layout>
    );
};

export default About;