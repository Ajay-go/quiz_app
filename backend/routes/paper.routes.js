const express = require("express");
const {get_paper, upload_paper, add_more_question} = require("../controllers/paper.controllers");

const paperRouter = express.Router();

paperRouter.get("/:paper_id", get_paper); 
paperRouter.post("/", upload_paper);     
paperRouter.patch("/:paper_id", add_more_question);

module.exports = {paperRouter};

