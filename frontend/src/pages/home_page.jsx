import React, { useState, useEffect } from "react";
import Question_card from "./question_card";
import "../styles/home_page.css";
import Header from "./header";
import { useParams, useNavigate } from "react-router-dom";

function Quiz_Page() {
    const [quizData, setQuizData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { testId } = useParams();
    const [currIndex, setCurrIndex] = useState(0);
    const [candid, setCandid] = useState(null);
    const [score, setScore] = useState(0);

    const navigate = useNavigate();

    useEffect(() => {
        const get_quiz = async () => {
            try {
                setLoading(true);
                const res = await fetch(`https://quiz-app-sigma-dun-80.vercel.app/quiz/${testId}`);
                if (!res.ok) throw new Error("Failed to fetch quiz");

                const data = await res.json();
                setQuizData(data);
            } catch (err) {
                console.error(err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        const user_data = localStorage.getItem("user");
        if (user_data) setCandid(JSON.parse(user_data).email);

        get_quiz();
    }, [testId]);

    if (loading) return <p>Loading quiz...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!quizData) return <p>No questions found.</p>;

    const totalQuestions = quizData.questions.length;

    const handleAnswerSubmit = (questionScore) => {
        setScore(prev => prev + questionScore);
        if (currIndex < totalQuestions - 1) handleNext();
    };

    const handleNext = () => {
        setCurrIndex(prev => prev + 1);
    };

    const handleSubmit = () => {
        navigate("/completed", { state: { score} });
    };

    return (
        <>
            <Header candidateId={candid} testId={testId} testName={quizData.testName || "Quiz"} />
            <div className="quiz-page">
                <Question_card
                    question={quizData.questions[currIndex]}
                    options={[
                        quizData.options["0"][currIndex],
                        quizData.options["1"][currIndex],
                        quizData.options["2"][currIndex],
                        quizData.options["3"][currIndex]
                    ]}
                    correctAnswer={quizData.answers[currIndex]}
                    onAnswerSubmit={handleAnswerSubmit}
                />

                <div className="quiz-navigation">
                    <button className="submit-btn" onClick={handleSubmit}>
                        Submit Quiz
                    </button>
                </div>
            </div>
        </>
    );
}

export default Quiz_Page;
