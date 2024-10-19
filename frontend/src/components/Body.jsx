import React, {useEffect} from 'react';
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";
import {Outlet, useNavigate} from "react-router";
import {toast, ToastContainer} from "react-toastify";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {addUser} from "../utils/redux/userSlice.js";

const Body = () => {
    const user = useSelector((store) => store.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        fetchUserData()
    }, []);

    const fetchUserData = async () => {
        if (user) return;
        try {
            const req = await axios.get("http://localhost:7000/profile/view", {
                withCredentials: true,
            })
            dispatch(addUser(req.data))
        } catch (err) {
            if (err.status === 401) {
                navigate("/login")
            }
            toast.error(err.response.data)
        }
    }

    return (
        <div>
            <div>
                <ToastContainer
                    position="top-center"
                    autoClose={1950}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="colored"
                />
            </div>
            <div>
                <Navbar/>
                <Outlet/>
                <Footer/>
            </div>
        </div>
    );
}

export default Body;