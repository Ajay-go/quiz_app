import React from "react";
import Question_card from "./question_card";

function Quiz_Page() {
    return (
        <>
            <Question_card
                question="What day is today?"
                options={["Monday", "Tuesday", "Sunday", "Wednesday"]}
                difficulty="Medium"
            />
        </>
    );
}

export default Quiz_Page;
