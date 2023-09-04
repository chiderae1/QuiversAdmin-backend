const express = require('express')
const router = express.Router();
const {uploadQuestions} = require('../controller/controller');

router.post('/',uploadQuestions)

module.exports = router;