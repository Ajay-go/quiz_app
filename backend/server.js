require('dotenv').config();
const express = require("express");
const cors = require("cors");
const connectMongoDb = require("./connection");
const { userRouter } = require("./routes/user.routes");
const { paperRouter } = require("./routes/paper.routes");

const mongo_url = process.env.MONGO_URL;
const port = process.env.PORT || 4000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/", userRouter);
app.use("/quiz", paperRouter);

connectMongoDb(mongo_url)
    .then(() => {
        console.log("MongoDB connected");
        app.listen(port, () => console.log(`Server running on port ${port}`));
    })
    .catch(err => console.error(" MongoDB connection error:", err));
