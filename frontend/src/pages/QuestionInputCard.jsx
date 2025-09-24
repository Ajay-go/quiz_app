import React from 'react'
import { useState } from 'react'
import { useForm } from 'react-hook-form';
import "../styles/QuestionInputCard.css"

const QuestionInputCard = ({onSubmit}) => {

    const {register, handleSubmit, formState : {errors, isSubmitting}} = useForm();

    const [questionText, setQuestionText] = useState("");
    const [options, setOptions] = useState({
        a: "",
        b: "",
        c: "",
        d: ""
    });
    const [answer, setAnswer] = useState("");

    const handleOptionsChange = (optionId, value) => {
        setOptions(prev => ({ ...prev, [optionId]: value }));
    }

    const handleFormSubmit = () => {


        if (!questionText || !options.a || !options.b || !options.c || !options.d || !answer) {
            alert("Please fill in all fields.");
            return;
        }
        
        const keys = Object.keys(options);
        const question = {
            questionText: questionText,
            options: keys.map((key) => {
                return (
                    {
                        option_id: key,
                        option_text: options[key]
                    }
                )
            }),
            answer: answer
        }

        onSubmit(question);

        setQuestionText("");
        setOptions({ a: "", b: "", c: "", d: "" });
        setAnswer("");
    }

  return (
    <div className='input-card'>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
            <input type="text" name="" id="" {...register("questionText", {
                required: "Question is required"
            })} className='input-field' placeholder='Click to enter Question' onChange={(e) => setQuestionText(e.target.value)} value={questionText}/>

            <span className="error-text">{errors.questionText?.message}</span>

            {
                ["a", "b", "c", "d"].map((key) => {
                    return (
                        <input type="text" className='input-field' onChange={(e) => handleOptionsChange(key, e.target.value)} placeholder={`Click to add ${key} option`} value={options[key]} />
                    )
                })
            }

            <select name="" id="" onChange={(e) => setAnswer(e.target.value)} className='input-field' defaultValue={""} value={answer}>

                <option value="">Click to add answer</option>
                <option value="a">a</option>
                <option value="b">b</option>
                <option value="c">c</option>
                <option value="d">d</option>

            </select>

            <input type="submit" value={isSubmitting ? "Adding Question" : "Click to Add Question"} disabled={isSubmitting} />
        </form>
    </div>
  )
}

export default QuestionInputCard
