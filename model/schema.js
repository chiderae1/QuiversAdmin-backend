const mongoose = require('mongoose')

const schema = mongoose.Schema

const questions = new schema (
    {
        question:
        {
            type : String,
            required : true
        },
        option1:
        {
            type : String,
            required : true
        },
        option2:
        {
            type : String,
            required : true
        },
        option3:
        {
            type : String,
            required : true
        },
        option4:
        {
            type : String,
            required : true
        },
        answer:
        {
            type : String,
            required: true
        },
        Exam_name:
        {
            type : String,
            required : true
        },
        time:
        {
            type: Number,
            required: true   
        }
    },  {timestamps: true}
)

module.exports = mongoose.model('Questions',questions)