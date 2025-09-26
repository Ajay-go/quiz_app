const Paper = require("../models/ques_paperModel")

const get_paper = async (req, res) => {
    try {
        const { paper_id } = req.params; 

        if (!paper_id) {
            return res.status(400).json({ error: "paper_id is required" });
        }

        const paper = await Paper.findOne({ paper_id: Number(paper_id) });
        if (!paper) {
            return res.status(404).json({ error: "Paper not found" });
        }

        // Send the new structure
        res.status(200).json({
            paper_id: paper.paper_id,
            teacher_id: paper.teacher_id,
            questions: paper.questions,
            answers: paper.answers,
            options: paper.options
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};
  

const upload_paper = async (req, res) => {
    try{
        const {data} = req.body;

        const result = await Paper.create({
            paper_id: data.paper_id,
            teacher_id: data.teacher_id,
            questions: data.questions,
            answers: data.answers,
            options: data.options
        })

        if(!result) return res.status(400).json({
            message: "paper_id and questions are required"
        }) 
        else return res.status(201).json(result.paper_id);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Server error"});
    }
}

const add_more_question = async (req, res) => {
    try {
        const { paper_id } = req.params;
        const { question, answer, options } = req.body;

        if (!paper_id || !question || !answer || !options) {
            return res.status(400).json({ message: "Insufficient details" });
        }

        const result = await Paper.findOneAndUpdate(
            { paper_id: Number(paper_id) },
            {
                $push: {
                    questions: question,
                    answers: answer,
                    options: options
                }
            },
            { new: true } 
        );

        if (!result) {
            return res.status(404).json({ message: "Paper not found" });
        }

        res.json({
            message: "Question added successfully",
            updatedPaper: result
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};


module.exports = {
    get_paper,
    upload_paper,
    add_more_question
}