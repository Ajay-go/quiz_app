import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/final_score.css";

function Final_score() {
    const location = useLocation();
    const navigate = useNavigate();
    const { score } = location.state || 0;

    return (
        <div className="final-score-container">
            <h1>Thank you!</h1>
            <h1>Your score is {score}</h1>
            <button onClick={() => navigate("/")}>Go to Home</button>
        </div>
    );
}

export default Final_score;
