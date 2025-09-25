import React from 'react';
import { useForm } from "react-hook-form";
import "../styles/Signup.css"
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

    const navigate = useNavigate();

    const handleFormSignup = async (data) => {
        console.log(data);
        try {
            const res = await fetch("https://quiz-app-sigma-dun-80.vercel.app/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            }
            );
            const result = await res.json();
            console.log(result);

            if (res.ok) {
                localStorage.setItem("user", JSON.stringify({
                    id: result.userId,  
                    role: result.role, 
                    name: data.userName, 
                    email: data.userEmail 
                }));
                alert("Signup successful!");
                navigate("/");
            }

            else {
                alert("some error occured")
            }
        }
        catch (err) {
            console.log(err);
            alert("something went wrong");
        }

    }

    return (
        <div className="signup-container">

            <h1>Signup</h1>

            <form className="signup-form" onSubmit={handleSubmit(handleFormSignup)}>
                {/* <label htmlFor="user-name">Full Name: </label> */}
                <input type="text" name="" id="user-name" {...register("userName", {
                    required: "Name is required"
                })} className='input-field' placeholder='Full Name' />

                <span>{errors.userName?.message}</span>

                {/* <label htmlFor="user-email">Email: </label> */}
                <input type="email" name="" id="user-email" {...register("userEmail", {
                    required: "Email is required",
                    pattern: {
                        value: /^\S+@\S+$/i,
                        message: "Invalid email"
                    }
                })} className='input-field' placeholder='Email' />

                <span>{errors.userEmail?.message}</span>

                {/* <label htmlFor="user-password">Password: </label> */}
                <input type="password" name="" id="user-password" {...register("userPassword", {
                    required: "Password is required",
                    minLength: {
                        value: 8,
                        message: "Min length for a valid password is 8"
                    }
                })} className='input-field' placeholder='Password' />

                <span>{errors.userPassword?.message}</span>

                <select name="" id="" {...register("userRole", {
                    required: "Select your role"
                })} className='input-field' defaultValue="">
                    <option value="" disabled>Click to select your role</option>
                    <option value="Teacher">Teacher</option>
                    <option value="Student">Student</option>
                </select>

                <span>{errors.userRole?.message}</span>

                <input type="submit" disabled={isSubmitting} value={isSubmitting ? "Submitting" : "Submit"} className='submit-btn' />
            </form>

            <p className='login-sentence'>have an accound?<Link to="/login">Login</Link></p>
        </div>
    )
}

export default Signup
