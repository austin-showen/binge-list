const Series = require('../models/series')
const mongoose = require('mongoose')
const render = require('../server')

const index = async (req, res) => {
  res.render('series/index', { title: 'My Binge List' })
}

module.exports = {
  index
}
