const User = require("../models/userModels")

const handleSignup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "Email already registered" });
        }

        const newUser = await User.create({
            name: name,
            email : email,
            password: password
        })

        if(newUser) res.status(201).json({ message: "User registered successfully", userId: newUser._id });
        else res.status(400).json({message : "There is some error"});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};

const handleLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }

        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(400).json({ error: "User not found. Please signup" });
        }

        if (existingUser.password !== password) {
            return res.status(401).json({ error: "Invalid password" });
        }

        res.status(200).json({ message: "Login successful", userId: existingUser._id, name: existingUser.name, email: existingUser.email });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};
  
module.exports = {
    handleLogin,
    handleSignup
}
