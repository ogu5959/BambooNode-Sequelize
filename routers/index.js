const express = require('express')
const router = express.Router()

router.use('/agent', require('./agent'))

module.exports = router