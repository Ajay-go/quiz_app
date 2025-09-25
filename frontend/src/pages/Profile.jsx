import React, { useEffect, useState } from 'react'
import {useNavigate} from "react-router-dom"
import "../styles/Profile.css"

const Profile = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const navigateToHome = () => {
        const data = JSON.parse(localStorage.getItem("userData"));
        console.log(data);
        if(data.userRole === "Student") navigate("/");
        else if(data.userRole === "Teacher") navigate("/teacher");
    }

    const handleLogoutClick = () => {
        setUser(null);
        localStorage.removeItem("userData");
        navigate("/");
    }

    useEffect(() => {
        const parsedUser = JSON.parse(localStorage.getItem("userData"))
        setUser(() => parsedUser);
    }, [])

  return (
    <div className='profile-container'>
        <h1 className='title'>Profile</h1>
        <div className="user-details">
            <p className='user-name-profile' >Name: {user?.userName}</p>
            <p className='user-email-profile'>Email: {user?.userEmail}</p>
            <p className='user-password-profile'>Password: {user?.userPassword}</p>
            <p className='user-role-profile'>User type: {user?.userRole}</p>
            <div className="btns">
                <button className='home-btn' onClick={navigateToHome}>Home</button>
                <button className='logout-btn' onClick={handleLogoutClick}>Logout</button>
            </div>
        </div>
    </div>
  )
}

export default Profile
