const express = require('express')
const router = express.Router()
const searchCtrl = require('../controllers/search')

router.get('/', searchCtrl.index)
router.get('/search', searchCtrl.search)
router.get('/:id', searchCtrl.similar)

module.exports = router
