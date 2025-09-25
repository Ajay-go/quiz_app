import React, { useEffect, useState } from 'react';
import "../styles/Landing.css";
import { useNavigate } from 'react-router-dom';

const Landing = () => {
    const [testId, setTestId] = useState("");
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser)); // parse JSON string
        }
    }, []);

    const handleProceedClick = () => {
        if (!user) return alert("Login to proceed");
        if (!testId) return alert("Enter a valid Test ID");
        
        navigate(`/quiz/${testId}`);
    }

    const handleSignupClick = () => navigate("/signup");
    const handleLoginClick = () => navigate("/login");
    const handleProfileClick = () => navigate("/profile");

    return (
        <div className='container'>
            <nav className='nav-bar'>
                <h1 className='brand-name'>Quiz App</h1>
                <div className="nav-buttons">
                    {!user ? (
                        <>
                            <button className='signup-btn' onClick={handleSignupClick}>Sign-up</button>
                            <button className="login-btn" onClick={handleLoginClick}>Login</button>
                        </>
                    ) : (
                        <>
                            <span className='user-name'>Hello, {user.name}</span>
                            <button className='profile-btn' onClick={handleProfileClick}>Profile</button>
                        </>
                    )}
                </div>
            </nav>

            <div className="input-card">
                <input
                    type="text"
                    onChange={(e) => setTestId(e.target.value)}
                    value={testId}
                    id='testIdInput'
                    placeholder='Enter Your Test Id'
                />
                <button className='proceed-btn' onClick={handleProceedClick}>Click to Proceed</button>
            </div>
        </div>
    );
}

export default Landing;
