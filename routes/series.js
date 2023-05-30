const express = require('express')
const router = express.Router()
const seriesCtrl = require('../controllers/series')
const ensureLoggedIn = require('../config/ensureLoggedIn')

router.get('/', ensureLoggedIn, seriesCtrl.index)
router.post('/', ensureLoggedIn, seriesCtrl.create)

module.exports = router
