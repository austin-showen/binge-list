const express = require('express')
const router = express.Router()
const episodesCtrl = require('../controllers/episodes')
const ensureLoggedIn = require('../config/ensureLoggedIn')

router.get(
  '/series/:seriesId/season/:seasonNo/episode/:episodeNo',
  ensureLoggedIn,
  episodesCtrl.show
)
router.post('/series/:seriesId/episode', ensureLoggedIn, episodesCtrl.create)

module.exports = router
