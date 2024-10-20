import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {addUserToFeed} from "../utils/redux/feedSlice.js"
import UserCard from "./UserCard.jsx";

const Feed = () => {
    const feed = useSelector((store) => store.feed);
    const dispatch = useDispatch();


    useEffect(() => {
        populateFeed();
    }, []);

    const populateFeed = async () => {
        if (feed.length > 0) return;
        try {
            const res = await axios.get("http://localhost:7000/user/feed", {
                withCredentials: true,
            })

            // console.log(res.data)
            // console.log("aaaaaaa")
            dispatch(addUserToFeed(res.data))

        } catch (err) {
            console.log(err.message);
        }

    }

    return (
        <div className="grid grid-cols-1 mx-auto w-[500px] p-4">
            {Array.from(feed).map((user) => (

                <UserCard key={user._id}  userData={user}/>
            ))}

        </div>
    );
}

export default Feed;