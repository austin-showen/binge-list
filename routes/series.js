const express = require('express')
const router = express.Router()
const seriesCtrl = require('../controllers/series')
const ensureLoggedIn = require('../config/ensureLoggedIn')

router.get('/', ensureLoggedIn, seriesCtrl.index)
router.get('/:id', ensureLoggedIn, seriesCtrl.show)
router.post('/', ensureLoggedIn, seriesCtrl.create)
router.delete('/:id', ensureLoggedIn, seriesCtrl.delete)

module.exports = router
