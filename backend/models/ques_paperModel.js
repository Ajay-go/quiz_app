const mongoose = require("mongoose");

const paperSchema = new mongoose.Schema({
    paper_id: {
        type: Number,
        unique: true,
        required: true,
    },
    teacher_id: {
        type: String,
        required: true,
    },
    questions: {
        type: [String], // array of question strings
        required: true,
    },
    answers: {
        type: [String], // array of correct answers
        required: true,
    },
    options: {
        type: Map,
        of: [String], // each key (0,1,2,3) maps to an array of options
        required: true,
    },
}, { timestamps: true });

const Paper = mongoose.model("Paper", paperSchema);

module.exports = Paper;
