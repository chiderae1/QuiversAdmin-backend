// const mongoose = require('mongoose')
const Upload = require('../model/schema')

const uploadQuestions = async (req, res) => {
    // get's data from frontend
    const { question, option1, option2, option3, option4, answer, Exam_name, time } = req.body;

    try {
        // to check if user put a time condition
        const numberRegex = /\d/;
        const hasNumber = numberRegex.test(time);

        if(!hasNumber){
            return res.status(400).json({ error: 'set a timer' })
        }

        if (time === 0) {
            return res.status(400).json({ error: 'set a timer' })
        }
        // upload to database
        const upload = await Upload.create({ question, option1, option2, option3, option4, answer, Exam_name, time })
        res.status(200).json(upload)

    }
    catch (error) {
        res.status(400).json({ error: error.message })
    }
}




module.exports = { uploadQuestions }