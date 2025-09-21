import React, { useState } from "react";

function Question_card(props) {
    const { difficulty, question, options } = props;
    const [selected, setSelected] = useState("");
    console.log(selected);
    return (
        <fieldset>
            <legend>{question}</legend>

            <div>
                <input
                    type="radio"
                    id="option1"
                    name={question}
                    value={options[0]}
                    checked={selected === options[0]}
                    onChange={() => setSelected(options[0])}
                />
                <label htmlFor="option1">{options[0]}</label>
            </div>

            <div>
                <input
                    type="radio"
                    id="option2"
                    name={question}
                    value={options[1]}
                    checked={selected === options[1]}
                    onChange={() => setSelected(options[1])}
                />
                <label htmlFor="option2">{options[1]}</label>
            </div>

            <div>
                <input
                    type="radio"
                    id="option3"
                    name={question}
                    value={options[2]}
                    checked={selected === options[2]}
                    onChange={() => setSelected(options[2])}
                />
                <label htmlFor="option3">{options[2]}</label>
            </div>
        </fieldset>
    );
}

export default Question_card;
