import {useState} from "react";
import UserCard from "./UserCard";
import axios from "axios";
import {useDispatch} from "react-redux";
import {addUser} from "../utils/redux/userSlice.js";
import {toast} from "react-toastify";
import Modal from "react-modal";

Modal.setAppElement("#root"); // Required for screen readers

const EditProfile = ({user}) => {
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
    const [age, setAge] = useState(user.age || "");
    const [gender, setGender] = useState(user.gender || "");
    const [about, setAbout] = useState(user.about || "");
    const [error, setError] = useState("");
    const dispatch = useDispatch();

    // Modal state for live preview
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);

    const saveProfile = async () => {
        // Clear Errors
        setError("");
        try {
            const res = await axios.put(
                'http://localhost:7000/profile/edit',
                {
                    firstName,
                    lastName,
                    photoUrl,
                    age,
                    gender,
                    about,
                }, {
                    withCredentials: true
                }
            );

            // console.log(res)
            dispatch(addUser(res?.data?.data));
            toast.success("Profile updated successfully");
        } catch (err) {
            console.error('Error updating profile:', error);
        }
    };

    // Function to open and close the modal
    const openPreview = () => {
        setIsPreviewOpen(true);
    };

    const closePreview = () => {
        setIsPreviewOpen(false);
    };

    return (
        <>
            <div className="flex justify-center my-10">
                <div className="flex justify-center mx-10">
                    <div className="card bg-base-300 w-96 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title justify-center">Edit Profile</h2>
                            <div>
                                <label className="form-control w-full max-w-xs my-2">
                                    <div className="label">
                                        <span className="label-text">First Name:</span>
                                    </div>
                                    <input
                                        type="text"
                                        value={firstName}
                                        className="input input-bordered w-full max-w-xs"
                                        onChange={(e) => setFirstName(e.target.value)}
                                    />
                                </label>
                                <label className="form-control w-full max-w-xs my-2">
                                    <div className="label">
                                        <span className="label-text">Last Name:</span>
                                    </div>
                                    <input
                                        type="text"
                                        value={lastName}
                                        className="input input-bordered w-full max-w-xs"
                                        onChange={(e) => setLastName(e.target.value)}
                                    />
                                </label>
                                <label className="form-control w-full max-w-xs my-2">
                                    <div className="label">
                                        <span className="label-text">Photo URL:</span>
                                    </div>
                                    <input
                                        type="text"
                                        value={photoUrl}
                                        className="input input-bordered w-full max-w-xs"
                                        onChange={(e) => setPhotoUrl(e.target.value)}
                                    />
                                </label>
                                <label className="form-control w-full max-w-xs my-2">
                                    <div className="label">
                                        <span className="label-text">Age:</span>
                                    </div>
                                    <input
                                        type="text"
                                        value={age}
                                        className="input input-bordered w-full max-w-xs"
                                        onChange={(e) => setAge(e.target.value)}
                                    />
                                </label>
                                <label className="form-control w-full max-w-xs my-2">
                                    <div className="label">
                                        <span className="label-text">Gender:</span>
                                    </div>
                                    <input
                                        type="text"
                                        value={gender}
                                        className="input input-bordered w-full max-w-xs"
                                        onChange={(e) => setGender(e.target.value)}
                                    />
                                </label>
                                <label className="form-control w-full max-w-xs my-2">
                                    <div className="label">
                                        <span className="label-text">About:</span>
                                    </div>
                                    <input
                                        type="text"
                                        value={about}
                                        className="input input-bordered w-full max-w-xs"
                                        onChange={(e) => setAbout(e.target.value)}
                                    />
                                </label>
                            </div>
                            <p className="text-red-500">{error}</p>
                            <div className="card-actions justify-center m-2">
                                <button className="btn btn-primary" onClick={saveProfile}>
                                    Save Profile
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mx-4">
                    <button className="btn btn-secondary" onClick={openPreview}>
                        Live Preview
                    </button>
                </div>
            </div>


            <Modal
                isOpen={isPreviewOpen}
                onRequestClose={closePreview}
                className="relative bg-white rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/3 mx-auto mt-10 p-6 animate-fade-in"
                overlayClassName="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center"
            >
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold">Live Preview</h2>
                    <button className="btn btn-error" onClick={closePreview}>
                        X
                    </button>
                </div>
                <div className="mt-4">
                    <UserCard
                        userData={{firstName, lastName, photoUrl, age, gender, about}}
                    />
                </div>
            </Modal>
        </>
    );
};

export default EditProfile;
