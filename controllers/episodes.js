const Series = require('../models/series')
const Episode = require('../models/episode')
const mongoose = require('mongoose')
const axios = require('axios')
const API_KEY = process.env.API_KEY

const show = async (req, res) => {
  const seriesId = req.params.seriesId
  const episodeId = req.params.episodeId
  res.render(`episodes/show`, {
    title: 'Episode Details',
    seriesId,
    episodeId
  })
}

const create = async (req, res) => {
  console.log('hello')
  const seriesId = req.params.seriesId
  const season = req.query.season
  const episode = req.query.episode
  const episodeId = season + 'x' + episode
  res.redirect(`/series/${seriesId}/episode/${episodeId}`)
}

module.exports = {
  show,
  create
}
