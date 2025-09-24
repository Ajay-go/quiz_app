import React from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import QuestionInputCard from './QuestionInputCard';
import { useState } from 'react';
import "../styles/Teacher_home_Page.css"

const Teacher_home_Page = () => {

    const navigate = useNavigate();
    const [questionList, setQuestionList] = useState([]);
    const [paperId, setPaperId] = useState(0);

    const handleProfileClick = () => {
        navigate("/profile");
    }

    const handleSubmitClick = () => {
        const paper = {
            paper_id : paperId,
            teacher_id : user?.teacher_id || 123,
            questionsAndAnswers: questionList
        }
    }

    const addQuestion = (question) => {
        setQuestionList((prev) => [...prev, question]);
    }

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("userData"));
        console.log(user);
        if(!user || user.userRole !== "Teacher") {
            alert("You are not authorized to access this page");
            navigate("/");
        }
    }, [])

  return (
    <div>
      <div className='container' >
                <nav className='nav-bar'>
                    <h1 className='brand-name'>Quiz App</h1>
                    <div className="signup-login-btn">
                        <button className='profile-btn' onClick={handleProfileClick} >Profile</button>
                    </div>
                </nav>
                <div className="input-card">
                    <QuestionInputCard onSubmit={addQuestion} />
                    
                    <div>
                        <h3 className='question-title'>Questions:</h3>

                        <div className='question-description'>
                            {
                                questionList.map((question, qidx) => {
                                    return (
                                        <div key={qidx} className='question-card'>
                                            <p className='question-text'>Question: {question.questionText}</p>
                                            <div className='options-list'>
                                                {
                                                    question.options.map((option) => {
                                                        return (
                                                            <p>{option.option_id}: {option.option_text}</p>
                                                        )
                                                    })
                                                }
                                            </div>
                                            <p className='answer-text'>Answer: {question.answer}</p>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>

                    <button className='submit-btn' onClick={handleSubmitClick} >Submit Paper</button>
                </div>
            </div>
    </div>
  )
}

export default Teacher_home_Page
