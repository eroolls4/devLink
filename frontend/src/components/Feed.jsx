import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addUserToFeed } from "../utils/redux/feedSlice.js";
import UserCard from "./UserCard.jsx";

const Feed = () => {
    const feed = useSelector((store) => store.feed);
    const dispatch = useDispatch();

    const [page, setPage] = useState(1); // Track current page
    const [totalPages, setTotalPages] = useState(1); // You might want to get this from the backend

    useEffect(() => {
        populateFeed(page);
    }, [page]);

    const populateFeed = async (currentPage) => {
        try {
            const res = await axios.get(`http://localhost:7000/user/feed?page=${currentPage}&limit=1`, {
                withCredentials: true,
            });

            console.log(res)

            dispatch(addUserToFeed(res.data.properUsers));
            setTotalPages(res.data.totalPages);
        } catch (err) {
            console.log(err.message);
        }
    };

    const handlePrev = () => {
        if (page > 1) {
            setPage((page) => page - 1); // Move to the previous page
        }
    };

    const handleNext = () => {
        // Assuming you know the total number of pages
        if (page < totalPages) {
            setPage((page) => page + 1); // Move to the next page
        }
    };

    return (
        <div className="flex flex-col items-center">
            <div className="grid grid-cols-1 mx-auto w-[500px] p-4">
                {feed.length > 0 && <UserCard key={feed[0]._id} userData={feed[0]} />}
            </div>

            <div className="flex justify-between w-full max-w-xs mt-4">
                <button
                    onClick={handlePrev}
                    className={`btn btn-primary ${page === 1 ? "disabled" : ""}`}
                    disabled={page === 1}
                >
                    Prev
                </button>
                <button
                    onClick={handleNext}
                    className={`btn btn-primary ${page === totalPages ? "disabled" : ""}`}
                    disabled={page === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Feed;
