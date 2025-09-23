import express from 'express';
import 'dotenv/config';
import cors from 'cors';


const app = express();
const port = process.env.PORT || 4000;



app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send("API working");
});



app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
