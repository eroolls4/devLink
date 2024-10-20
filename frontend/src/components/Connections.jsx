import React, {useEffect} from 'react';
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {addConnection} from "../utils/redux/connectionsSlice.js";

const Connections = () => {
    const dispatch = useDispatch();
    const connections = useSelector((store) => store.connections)


    useEffect(() => {
        fetchConnectionData();
    }, []);


    const fetchConnectionData = async () => {
        try {
            const res = await axios.get(
                "http://localhost:7000/user/connections",
                {withCredentials: true}
            )
            dispatch(addConnection(res.data.data))
        } catch (err) {
            console.log(err.message)
        }
    }


    if (!connections) return;

    if (connections.length === 0)
        return <h1 className="flex justify-center my-10"> No Connections Found!!!</h1>

    return (
        <div className="text-center my-10">
            <h1 className="text-bold text-white text-3xl">Connections</h1>

            {connections.map((connection) => {
                const {_id, firstName, lastName, photoUrl, age, gender, about} =
                    connection;

                return (
                    <div
                        key={_id}
                        className=" flex m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto"
                    >
                        <div>
                            <img
                                alt="photo"
                                className="w-20 h-20 rounded-full object-cover"
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
                    </div>
                );
            })}
        </div>
    );
};

export default Connections;