const express = require('express')
const router = express.Router()
const episodesCtrl = require('../controllers/episodes')
const ensureLoggedIn = require('../config/ensureLoggedIn')

router.get(
  '/series/:seriesId/episode/:episodeId',
  ensureLoggedIn,
  episodesCtrl.show
)
router.post('/series/:seriesId/episode', ensureLoggedIn, episodesCtrl.create)

module.exports = router
