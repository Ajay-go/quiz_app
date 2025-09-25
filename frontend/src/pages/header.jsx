import React from "react";
import "../styles/header.css";

function Header({ candidateId, testId, testName }) {
    return (
        <div className="header">
            <h3>Candidate ID: {candidateId}</h3>
            <h3>Test ID: {testId}</h3>
        </div>
    );
}

export default Header;
