import React, { useState, useEffect } from "react";
import '../styles/question_card.css';

function Question_card({ question, options, difficulty, correctAnswer, onAnswerSubmit, defaultValue = "" }) {
    const [selected, setSelected] = useState(defaultValue);
    useEffect(() => {
        setSelected(defaultValue); // reset selection when question changes
    }, [question, defaultValue]);

    const handleSubmit = () => {
        if (!selected) return alert("Select an option first");

        const questionScore = selected === correctAnswer ? 1 : 0;
        console.log(correctAnswer)
        console.log(selected, correctAnswer);
        console.log("correctAnwer:", correctAnswer);
        if (onAnswerSubmit) {
            console.log(questionScore);
            onAnswerSubmit(questionScore);
        }
    };

    return (
        <div className="question-card">
            <h2 className="question-text">{question}</h2>

            <div className="options-container">
                {options.map((opt, idx) => (
                    <div key={idx} className="option">
                        <input
                            type="radio"
                            id={`option-${idx}`}
                            name="question"
                            value={opt}
                            checked={selected === opt}
                            onChange={() => setSelected(opt)}
                        />
                        <label htmlFor={`option-${idx}`}>{opt}</label>
                    </div>
                ))}
            </div>

            <button className="submit-btn" onClick={handleSubmit}>Submit question</button>
        </div>
    );
}

export default Question_card;
