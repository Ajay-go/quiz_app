import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import QuestionInputCard from './QuestionInputCard';
import "../styles/Teacher_home_page.css";

const Teacher_home_Page = () => {
    const navigate = useNavigate();
    const [questionList, setQuestionList] = useState([]);
    const [paperId, setPaperId] = useState("");
    const [user, setUser] = useState(null);

    const handleProfileClick = () => {
        navigate("/profile");
    };

    const handleSubmitClick = async () => {
        if (!paperId || questionList.length === 0) {
            alert("Please add a paper ID and at least one question.");
            return;
        }

        // Initialize options object for 4 options per question
        const optionsObj = { 0: [], 1: [], 2: [], 3: [] };

        questionList.forEach((q) => {
            q.options.forEach((opt, idx) => {
                optionsObj[idx].push(opt.option_text);
            });
        });

        const data = {
            paper_id: Number(paperId),
            teacher_id: user?.teacher_id || 123,
            questions: questionList.map((q) => q.questionText),
            answers: questionList.map((q) => q.answer),
            options: optionsObj
        };

        try {
            const res = await fetch("https://quiz-app-sigma-dun-80.vercel.app/quiz", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ data })
            });

            const result = await res.json();
            if (res.ok) {
                alert(`Paper ${result} uploaded successfully!`);
                setQuestionList([]);
                setPaperId("");
            } else {
                alert(result.error || "Failed to upload paper.");
            }
        } catch (err) {
            console.error(err);
            alert("Server error while uploading paper.");
        }
    };
      

    const addQuestion = (question) => {
        setQuestionList((prev) => [...prev, question]);
    };

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        setUser(storedUser);
        if (!storedUser || storedUser.role !== "Teacher") {
            alert("You are not authorized to access this page");
            navigate("/");
        }
    }, [navigate]);

    return (
        <div className="container">
            <nav className="nav-bar">
                <h1 className="brand-name">Quiz App</h1>
                <div className="signup-login-btn">
                    <button className="profile-btn" onClick={handleProfileClick}>
                        Profile
                    </button>
                </div>
            </nav>

            <div className="input-card">
                <div className="paper-id-input">
                    <label>Paper ID: </label>
                    <input
                        type="number"
                        value={paperId}
                        onChange={(e) => setPaperId(e.target.value)}
                        placeholder="Enter paper ID"
                    />
                </div>

                <QuestionInputCard onSubmit={addQuestion} />

                <div>
                    <h3 className="question-title">Questions:</h3>
                    <div className="question-description">
                        {questionList.map((question, qidx) => (
                            <div key={qidx} className="question-card">
                                <p className="question-text">
                                    Question: {question.questionText}
                                </p>
                                <div className="options-list">
                                    {question.options.map((option, idx) => (
                                        <p key={idx}>
                                            {option.option_id}: {option.option_text}
                                        </p>
                                    ))}
                                </div>
                                <p className="answer-text">Answer: {question.answer}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <button className="submit-btn" onClick={handleSubmitClick}>
                    Submit Paper
                </button>
            </div>
        </div>
    );
};

export default Teacher_home_Page;
