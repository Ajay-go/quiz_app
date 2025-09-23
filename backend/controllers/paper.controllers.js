import Paper from "../models/ques_paperModel.js";

export const get_questions = async (req, res) => {
    try {
        const { paper_id } = req.params; // e.g., /api/papers/1

        if (!paper_id) {
            return res.status(400).json({ error: "paper_id is required" });
        }

        const paper = await Paper.findOne({ paper_id: Number(paper_id) });
        if (!paper) {
            return res.status(404).json({ error: "Paper not found" });
        }

        res.status(200).json({ questions: paper.questions });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};
