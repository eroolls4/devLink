import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {addRequest, removeRequest} from "../utils/redux/requestsSlice.js";


const Requests = () => {
    const dispatch = useDispatch();
    const requests = useSelector((store) => store.requests)

    useEffect(() => {
        fetchRequests();
    }, []);


    const fetchRequests = async () => {
        try{
            const res=await axios.get(
                "http://localhost:7000/user/requests/received",
                {withCredentials : true}
            )
            console.log(res)
            dispatch(addRequest(res.data.data))
        }catch (err){
            console.log(err.message)
        }
    }

   const reviewRequest = async (status,id) => {
        try{
            const res=await axios.post(
                "http://localhost:7000/request/review/" + status + "/" + id,
                {},
                {withCredentials : true}
            )
            dispatch(removeRequest(id));
        }catch (err){
            console.log(err.message)
        }
    }

    if(requests.length ===0) return (<div className="flex items-center justify-center m-8 text-white font-bold">No requests yet ...</div>)

    return (
        <div className="text-center my-10">
            <h1 className="text-bold text-white text-3xl"> Requests</h1>

            {requests.map((request) => {
                const {_id, firstName, lastName, photoUrl, age, gender, about} =
                    request.fromUserId;

                return (
                    <div
                        key={_id}
                        className=" flex justify-between items-center m-4 p-4 rounded-lg bg-base-300  mx-auto"
                    >
                        <div>
                            <img
                                alt="photo"
                                className="w-20 h-20 rounded-full"
                                src={photoUrl}
                            />
                        </div>
                        <div className="text-left mx-4 ">
                            <h2 className="font-bold text-xl">
                                {firstName + " " + lastName}
                            </h2>
                            {age && gender && <p>{age + ", " + gender}</p>}
                            <p>{about}</p>
                        </div>
                        <div>
                            <button
                                className="btn btn-primary mx-2"
                                onClick={() => reviewRequest("rejected", request._id)}
                            >
                                Reject
                            </button>
                            <button
                                className="btn btn-secondary mx-2"
                                onClick={() => reviewRequest("accepted", request._id)}
                            >
                                Accept
                            </button>
                        </div>
                    </div>
                );
            })}
        </div>
    )
};

export default Requests;