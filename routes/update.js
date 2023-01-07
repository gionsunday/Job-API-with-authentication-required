const express = require('express')
const router = express.Router()

const {updateJobs} = require('../controllers/jobs')

router.route('/:id').patch(updateJobs)

module.exports = router