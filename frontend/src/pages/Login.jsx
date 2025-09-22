import React from 'react'
import {useForm} from "react-hook-form"
import { Link, useNavigate } from 'react-router-dom';
import "../styles/Login.css"

const Login = () => {

    const {register, handleSubmit, formState: {errors, isSubmitting}} = useForm();

    const navigate = useNavigate();

    const handleLoginClick = (data) => {
        return new Promise((resolve, reject) => {
            console.log("Form is submitting");
            console.log(data);
            localStorage.setItem("userData", JSON.stringify(data));
            setTimeout(() => {
                navigate("/");
                resolve();
            }, 5000);

        })
    }

  return (
      <div className='login-container'>
        <h1>Login</h1>

      <form className='login-form' onSubmit={handleSubmit(handleLoginClick)}>
        {/* <label htmlFor="user-email">Email:</label> */}
        <input type="email" name="user-email" id="user-email" {...register("userEmail", {
            required: "Email is required",
            pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email"
            }
        })} className='user-email' placeholder='Email'/>

        <span>{errors.userEmail?.message}</span>

        <input type="password" name="" id="" {...register("userPassword", {
            required: "Password is required",
            minLength: {
                value: 8,
                message: "Min length for a valid password is 8"
            }
        })} className='user-password' placeholder='Password'/>

        <span>{errors.userPassword?.message}</span>

        <input type="submit" name="" disabled={isSubmitting} value={isSubmitting ? "Logging" : "Login"} className='login-btn'/>
      </form>

      <p>Need an Accound?<Link to="/signup">Create one</Link></p>
    </div>
  )
}

export default Login
