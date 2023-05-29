const express = require('express')
const router = express.Router()
const seriesCtrl = require('../controllers/series')

router.get('/', seriesCtrl.index)

module.exports = router
