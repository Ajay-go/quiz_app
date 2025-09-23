import mongoose  from "mongoose";

const paper_Schema = new mongoose.Schema({
    paper_id :{
        type : Number,
        unique : true,
        required : true,
    },
    questions : {
        type: Array,
        required : true,
    }
})

const paper = mongoose.model("Paper",paper_Schema);


module.exports = paper;