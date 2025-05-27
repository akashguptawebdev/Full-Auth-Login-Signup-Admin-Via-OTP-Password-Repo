import React, { useState, useEffect, useRef } from "react";
import "./userProfile.scss";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { Pen } from "lucide-react";
import NavigateBack from "../../component/NavigateBack";
import { profileEditApi } from "../../redux/api/user_api";
import CustomSpinner from "../../component/CustomSpinner";
import { GetUserProfile } from "../../redux/action/userAction";

const UserProfile = () => {
    const dispatch = useDispatch();
    const { user, loading } = useSelector((state) => state.user);

    const [editMode, setEditMode] = useState(false);
    const fileInputRef = useRef();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        mobile: "",
        gender: "",
        dateOfBirth: "",
        location: "",
        profilePic: "",
        profilePreview: ""
    });

    const [initialFormData, setInitialFormData] = useState(null);

    useEffect(() => {
        if (user) {
            const initial = {
                name: user.name || "",
                email: user.email || "",
                mobile: user.contact_number || "",
                gender: user.gender || "",
                dateOfBirth: user.dateOfBirth ? user.dateOfBirth.split("T")[0] : "",
                location: user.location || "",
                profilePic: "",
                profilePreview: user.profilePic || "https://www.w3schools.com/howto/img_avatar.png"
            };
            setFormData(initial);
            setInitialFormData(initial);
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageClick = () => {
        if (editMode) fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData((prev) => ({
                ...prev,
                profilePic: file,
                profilePreview: URL.createObjectURL(file),
            }));
        }
    };

    const toggleEdit = () => {
        if (editMode && initialFormData) {
            // Reset everything on cancel
            setFormData(initialFormData);
        }
        setEditMode((prev) => !prev);
    };

    const handleProfileEdit = async () => {
        try {
            const token = Cookies.get("token");
            if (!token) throw new Error("Authentication token not found");

            const data = new FormData();
            data.append("name", formData.name);
            data.append("email", formData.email);
            data.append("mobile", formData.mobile);
            data.append("gender", formData.gender);
            data.append("dateOfBirth", formData.dateOfBirth);
            data.append("location", formData.location);

            if (formData.profilePic && typeof formData.profilePic !== "string") {
                data.append("profilePic", formData.profilePic);
            }

            const response = await axios.patch(profileEditApi, data, {
                headers: {
                    Authorization: token,
                    "Content-Type": "multipart/form-data",
                },
                withCredentials: true,
            });

            if (response.data.success) {
                dispatch(GetUserProfile());
                setEditMode(false);
                toast.success("Profile updated successfully!");
            } else {
                toast.error("Update failed: " + response.data.message);
            }
        } catch (err) {
            console.error("Profile update error:", err);
            toast.error("An error occurred while updating your profile.");
        }
    };

    const fields = [
        { label: "Name", name: "name", type: "text" },
        { label: "Email account", name: "email", type: "email" },
        { label: "Mobile number", name: "mobile", type: "tel", placeholder: "Enter number" },
        { label: "Gender", name: "gender", type: "text", placeholder: "male, female, other" },
        { label: "Date of Birth", name: "dateOfBirth", type: "date" },
        { label: "Location", name: "location", type: "text" }
    ];

    return (
        <>
            <NavigateBack pageName="Profile" />
            <div className="user-profile">
                <div className="header">
                    <div className="avatar-section">
                        <div
                            className="avatar"
                            onClick={handleImageClick}
                            style={{ cursor: editMode ? "pointer" : "default" }}
                        >
                            <img
                                src={formData.profilePreview}
                                alt="User Avatar"
                            />
                            {editMode && (
                                <label className="edit-icon" htmlFor="profilePicInput">
                                    <Pen />
                                </label>
                            )}
                            <input
                                type="file"
                                id="profilePicInput"
                                accept="image/*"
                                ref={fileInputRef}
                                style={{ display: "none" }}
                                onChange={handleFileChange}
                            />
                        </div>

                        <div className="user-info">
                            <p className="name">{user.name}</p>
                            <p className="email">{user.email}</p>
                        </div>
                    </div>

                    <button
                        className={`action-button ${editMode ? "cancel" : "edit"}`}
                        onClick={toggleEdit}
                    >
                        {editMode ? "Cancel" : "Edit Profile"}
                    </button>
                </div>

                <div className="form-section">
                    {fields.map(({ label, name, type, placeholder }) => (
                        <div className="field" key={name}>
                            <label htmlFor={name}>{label}</label>
                            <input
                                id={name}
                                name={name}
                                type={type}
                                placeholder={placeholder || ""}
                                value={formData[name]}
                                onChange={handleChange}
                                disabled={!editMode}
                            />
                        </div>
                    ))}
                </div>

                {editMode && (
                    <button className="submit-button save" onClick={handleProfileEdit}>
                        {loading ? <CustomSpinner /> : "Save Changes"}
                    </button>
                )}
            </div>
        </>
    );
};

export default UserProfile;
