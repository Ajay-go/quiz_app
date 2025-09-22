import React, { useState } from "react";
import '../styles/question_card.css'
import { useParams } from "react-router-dom";

function Question_card(props) {
    const { difficulty, question, options } = props;
    const [selected, setSelected] = useState("");
    console.log(selected);

    return (
        <div className="question-card">
            <h1>{question}</h1>

            {options.map((opt, idx) => (
                <div key={idx} className="option">
                    <input
                        type="radio"
                        id={`option${idx}`}
                        name={question}
                        value={opt}
                        checked={selected === opt}
                        onChange={() => setSelected(opt)}
                    />
                    <label htmlFor={`option${idx}`}>{opt}</label>
                </div>
            ))}

            <button
                className="submit-btn"
                onClick={() => {
                    console.log(`ans submitted`, { selected });
                }}
            >
                Submit
            </button>
        </div>
    );
}

export default Question_card;
