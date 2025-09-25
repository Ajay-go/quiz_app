const Paper = require("../models/ques_paperModel")

const get_paper = async (req, res) => {
    try {
        const { paper_id } = req.params; // e.g., /quiz/1

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
        const {paper_id, questionsAndAnswers, teacher_id} = req.body;

        const result = await Paper.create({
            paper_id: paper_id,
            teacher_id: teacher_id,
            questionsAndAnswers: questionsAndAnswers
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
    const {paper_id} = req.params;
    const {questionsAndAnswers} = req.body;

    console.log(paper_id);
    console.log(questionsAndAnswers);

    if(!paper_id || !questionsAndAnswers) return res.status(400).json({message: "insufficient details"});

    const result = await Paper.findOneAndUpdate(
        {paper_id: paper_id}, 
        {
            $push: {
                questionsAndAnswers: questionsAndAnswers
            }
        }
    );

    if(!result) return res.status(404).json({message: "paper not found"});
    else return res.json({message: "updation is successfull"});
}

module.exports = {
    get_paper,
    upload_paper,
    add_more_question
}