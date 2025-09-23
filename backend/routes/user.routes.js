const express = require("express")
const {handleLogin, handleSignup} = require("../controllers/user.controllers")

const userRouter = express.Router();

userRouter.post("/signup", handleSignup);
userRouter.get("/login", handleLogin);

module.exports = {userRouter};
