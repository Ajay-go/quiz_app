import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import "../styles/Profile.css";

const Profile = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const navigateToHome = () => {
        if (!user) return;
        if (user.role === "Student") navigate("/");
        else if (user.role === "Teacher") navigate("/teacher");
    }

    const handleLogoutClick = () => {
        setUser(null);
        localStorage.removeItem("user");
        navigate("/login"); // usually logout sends user to login page
    }

    useEffect(() => {
        const parsedUser = JSON.parse(localStorage.getItem("user"));
        if (parsedUser) setUser(parsedUser);
    }, []);

    if (!user) return <p>Loading...</p>;

    return (
        <div className='profile-container'>
            <h1 className='title'>Profile</h1>
            <div className="user-details">
                <p className='user-name-profile'>Name: {user.name}</p>
                <p className='user-email-profile'>Email: {user.email}</p>
                <p className='user-role-profile'>Role: {user.role}</p>

                <div className="btns">
                    <button className='home-btn' onClick={navigateToHome}>Home</button>
                    <button className='logout-btn' onClick={handleLogoutClick}>Logout</button>
                </div>
            </div>
        </div>
    );
}

export default Profile;
