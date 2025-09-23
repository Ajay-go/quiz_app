const express = require("express")
// import 'dotenv/config';
// import cors from 'cors';
const cors = require("cors");
const connectMongoDb = require("./connection")
const {userRouter} = require("./routes/user.routes");
const {paperRouter} = require("./routes/paper.routes")


const app = express();
const port = process.env.PORT || 4000;

connectMongoDb("mongodb://127.0.0.1:27017/quizapp").then(() => console.log("Mongodb connected")).catch(() => console.log("MongoDb disconnected"));


// middlewares
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended: true}));

app.use("/", userRouter);
app.use("/quiz", paperRouter);



app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
