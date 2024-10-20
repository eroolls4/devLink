import axios from "axios";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/redux/feedSlice.js";

const UserCard = ({ userData }) => {
    const { _id, firstName, lastName, photoUrl, age, gender, about } = userData;
    const dispatch = useDispatch();

    const handleSendRequest = async (status, userId) => {
        try {
            const res = await axios.post(
                "http://localhost:7000"+ "/request/send/" + status + "/" + userId,
                {},
                { withCredentials: true }
            );
            dispatch(removeUserFromFeed(userId));
        } catch (err) {}
    };

    return (
        <div className="m-4 card bg-base-300 w-96 shadow-xl flex items-center">
            <figure>
                <img src={userData.photoUrl} alt="photo" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{firstName + " " + lastName}</h2>
                {age && gender && <p>{age + ", " + gender}</p>}
                <p>{about}</p>
                <div className="card-actions justify-center my-4">
                    <button
                        className="btn btn-primary"
                        onClick={() => handleSendRequest("ignored", _id)}
                    >
                        Ignore
                    </button>
                    <button
                        className="btn btn-secondary"
                        onClick={() => handleSendRequest("interested", _id)}
                    >
                        Interested
                    </button>
                </div>
            </div>
        </div>
    );
};
export default UserCard;