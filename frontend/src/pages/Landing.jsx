import React, { useState } from 'react'
import "../styles/Landing.css"
import { useNavigate } from 'react-router-dom';

const Landing = () => {

    const [testId, setTestId] = useState(0);
    const navigate = useNavigate();
    const [studentId, setStudentId] = useState(null);

    const handleProceedClick = () => {
        const user = localStorage.getItem("userData");
        console.log(user);
        if(!user) return alert("Login to proceed");
        navigate(`/quiz/${testId}`);
    }

    const handleSignupClick = () => {
        navigate("/signup");
    }

    const handleLoginClick = () => {
        navigate("/login");
    }

  if(!studentId) {
    return (
        <div className='container' >
            <nav className='nav-bar'>
                <h1 className='brand-name'>Quiz App</h1>
                <div className="signup-login-btn">
                    <button className='signup-btn' onClick={handleSignupClick}>Sign-up</button>
                    <button className="login-btn" onClick={handleLoginClick}>Login</button>
                </div>
            </nav>
            <div className="input-card">
                {/* <label htmlFor="testIdInput">Enter test id: </label> */}
                <input type="text" onChange={(e) => setTestId(e.target.value)} id='testIdInput' placeholder='Enter Your Test Id'/>
                <button className='proceed-btn' onClick={handleProceedClick} >Click to Proceed</button>
            </div>
        </div>
    )
  } else {
    return (
        <div className='container' >
            <nav className='nav-bar'>
                <h1 className='brand-name'>Quiz App</h1>
                <div className="signup-login-btn">
                    <button className='profile-btn'>Profile</button>
                </div>
            </nav>
            <div className="input-card">
                <label htmlFor="testIdInput">Enter test id: </label>
                <input type="text" onChange={(e) => setTestId(e.target.value)} id='testIdInput'/>
                <button onClick={handleProceedClick} >Click to Proceed</button>
            </div>
        </div>
    )
  }
}

export default Landing
