const mongoose = require("mongoose");

const paper_Schema = new mongoose.Schema({
    paper_id :{
        type : Number,
        unique : true,
        required : true,
    },
    teacher_id: {
        type: String,
        required: true
    },
    questionsAndAnswers : [
        {
            question_text: {
                type: String, 
                unique: true,
            }, 
            options: [
                {
                    option_id : {
                    type: String,
                    required: true
                    },
                    option_text: {
                        type: String,
                        required: true
                    }
                }
            ],
            answer: {
                type: String,
                required: true
            }
        }
    ]
})

const Paper = mongoose.model("Paper",paper_Schema);


module.exports = Paper;