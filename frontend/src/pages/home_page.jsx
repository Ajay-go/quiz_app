import React from "react";
import Question_card from "./question_card";
import "../styles/home_page.css";   // ✅ import styles
import Header from "./header";
function Quiz_Page() {
    return (
        <>
            <div>
                <Header candidateId="12345" testId="T001" testName="React Basics Quiz" />
            </div>
            <div className="quiz-page">
                <Question_card
                    question="What day is today?"
                    options={["Monday", "Tuesday", "Sunday", "Wednesday"]}
                    difficulty="Medium"
                />
            </div>
        </>
    );
}

export default Quiz_Page;
