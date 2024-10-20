import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router";
import axios from "axios";
import {removeUser} from "../utils/redux/userSlice.js";
import {toast} from "react-toastify";
import {Link} from "react-router-dom";
import {clearFeed} from "../utils/redux/feedSlice.js";

const Navbar = () => {
    const user = useSelector((store) => store.user)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSignOut = async () => {
        try {
            const res = await axios.post("http://localhost:7000/logout", {}, {
                    withCredentials: true
                }
            );
            dispatch(removeUser())
            navigate("/login")
        } catch (err) {
            toast.error(err)
        }

    }

    return (
        <div>
            <div className="navbar bg-base-200 ">
                <div className="flex-1">
                    <Link to="/feed" className="btn btn-ghost text-xl">👩‍💻 DevTinder</Link>
                </div>
                {user ? (<div className="flex-none gap-2">
                        <div>
                            <p>Hello , {user.firstName}</p>
                        </div>
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img
                                        alt="Tailwind CSS Navbar component"
                                        src={user.photoUrl}/>
                                </div>
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                                <li>
                                    <Link to="/profile" className="justify-between">
                                        Profile
                                        <span className="badge">New</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/connections"> Connections</Link>
                                </li>
                                <li>
                                    <Link to="/requests"> Requests</Link>
                                </li>

                                <li>
                                    <a onClick={handleSignOut}>Logout</a>
                                </li>
                            </ul>
                        </div>
                    </div>) :
                    (
                        <div>
                            <button className="btn btn-outline btn-warning"
                                    onClick={() => navigate("/login")}
                            >Login In
                            </button>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default Navbar;