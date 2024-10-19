import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Body from "./components/Body.jsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./components/Login.jsx";
import Profile from "./components/Profile.jsx";
import Feed from "./components/Feed.jsx";

function App() {


    return (
        <BrowserRouter basename="/">
            <Routes>
                <Route path="/" element={<Body/>}>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/profile" element={<Profile/>}/>
                    <Route path="/feed" element={<Feed/>}/>

                </Route>
            </Routes>
        </BrowserRouter>

    )
}

export default App
