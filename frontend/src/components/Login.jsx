import React, {useState} from 'react';
import axios from "axios";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router";
import {addUser} from "../utils/redux/userSlice.js";
import {Bounce, toast, ToastContainer} from "react-toastify";

const Login = () => {
    const [emailId, setEmailId] = useState("eroll@gmail.com");
    const [password, setPassword] = useState("Test12345.");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const res = await axios.post("http://localhost:7000/login",
                {
                    emailId,
                    password,
                },
                {
                    withCredentials: true
                }
            );

            console.log(res)

            dispatch(addUser(res.data.data))

            toast.success("Logged in successfully");
            setTimeout(() => {
                navigate("/feed")
            }, 2000);

        } catch (err) {

            if (err.status === 404) {
                return toast.error("Invalid credentials", {
                    position: "top-right"
                })
            }
            console.log(err.message)
        }

    }

    return (
        <div>

            <div className="bg-base-200 flex items-center justify-center min-h-screen">
                <div className="card w-96 bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title text-2xl font-bold mb-6">Login</h2>
                        <form onSubmit={(e) => e.preventDefault()}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <label className="input input-bordered flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                                         className="w-4 h-4 opacity-70">
                                        <path
                                            d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z"/>
                                        <path
                                            d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z"/>
                                    </svg>
                                    <input type="email"
                                           value={emailId}
                                           className="grow"
                                           placeholder="email@example.com"
                                           onChange={(e) => setEmailId(e.target.value)}
                                    />
                                </label>
                            </div>
                            <div className="form-control mt-4">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <label className="input input-bordered flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                                         className="w-4 h-4 opacity-70">
                                        <path fillRule="evenodd"
                                              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                                              clipRule="evenodd"/>
                                    </svg>
                                    <input type="password"
                                           className="grow"
                                           placeholder="Enter password"
                                           value={password}
                                           onChange={(e) => setPassword(e.target.value)}
                                    />
                                </label>
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary"
                                        onClick={handleLogin}
                                >
                                    Login
                                </button>
                            </div>
                        </form>
                        <div className="divider">OR</div>
                        <div className="text-center">
                            <p>Don't have an account?</p>
                            <a href="#" className="link link-primary">Sign up now</a>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    );
}

export default Login;