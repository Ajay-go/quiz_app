import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import "../styles/QuestionInputCard.css"

const QuestionInputCard = ({ onSubmit }) => {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

    const [questionText, setQuestionText] = useState("");
    const [options, setOptions] = useState({ a: "", b: "", c: "", d: "" });
    const [answer, setAnswer] = useState("");

    const handleOptionsChange = (optionId, value) => {
        setOptions(prev => ({ ...prev, [optionId]: value }));

        // Update answer if it was previously selected
        if (answer === prev[optionId]) {
            setAnswer(value);
        }
    }

    const handleFormSubmit = () => {
        if (!questionText || !options.a || !options.b || !options.c || !options.d || !answer) {
            alert("Please fill in all fields.");
            return;
        }

        const keys = Object.keys(options);
        const question = {
            questionText: questionText,
            options: keys.map(key => ({
                option_id: key,
                option_text: options[key]
            })),
            answer: answer // actual text now
        };

        onSubmit(question);

        // Reset form
        setQuestionText("");
        setOptions({ a: "", b: "", c: "", d: "" });
        setAnswer("");
    }

    return (
        <div className='input-card'>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
                <input
                    type="text"
                    {...register("questionText", { required: "Question is required" })}
                    className='input-field'
                    placeholder='Click to enter Question'
                    onChange={(e) => setQuestionText(e.target.value)}
                    value={questionText}
                />
                <span className="error-text">{errors.questionText?.message}</span>

                {
                    ["a", "b", "c", "d"].map(key => (
                        <input
                            key={key}
                            type="text"
                            className='input-field'
                            placeholder={`Click to add ${key} option`}
                            value={options[key]}
                            onChange={(e) => handleOptionsChange(key, e.target.value)}
                        />
                    ))
                }

                <select
                    className='input-field'
                    value={Object.keys(options).find(k => options[k] === answer) || ""}
                    onChange={(e) => {
                        const selectedKey = e.target.value;
                        setAnswer(options[selectedKey] || "");
                    }}
                >
                    <option value="">Click to add answer</option>
                    {["a", "b", "c", "d"].map(key => (
                        <option key={key} value={key}>
                            {options[key] || `Option ${key}`}
                        </option>
                    ))}
                </select>

                <input
                    type="submit"
                    value={isSubmitting ? "Adding Question" : "Click to Add Question"}
                    disabled={isSubmitting}
                />
            </form>
        </div>
    )
}

export default QuestionInputCard;
