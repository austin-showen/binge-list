const Series = require('../models/series')
const Episode = require('../models/episode')
const mongoose = require('mongoose')
const axios = require('axios')
const API_KEY = process.env.API_KEY

const show = async (req, res) => {
  const seasonNo = req.params.seasonNo
  const episodeNo = req.params.episodeNo
  const episode = await Episode.findOne({
    seasonNo: seasonNo,
    episodeNo: episodeNo,
    user: req.user._id
  })
  res.render(`episodes/show`, {
    title: 'Episode Details',
    episode
  })
}

const create = async (req, res) => {
  const seriesId = req.params.seriesId
  const seasonNo = req.query.season
  const episodeNo = req.query.episode
  if (await Episode.exists({ seasonNo: seasonNo, episodeNo: episodeNo })) {
    console.log('hello')
    res.redirect(`/series/${seriesId}/season/${seasonNo}/episode/${episodeNo}`)
  } else {
    const series = await Series.findOne({ tmdbId: seriesId })

    const response = await axios.get(
      `https://api.themoviedb.org/3/tv/${seriesId}/season/${seasonNo}/episode/${episodeNo}?language=en-US&api_key=${API_KEY}`
    )

    const episode = new Episode()

    try {
      episode.name = response.data.name
      episode.seriesName = series.$incname
      episode.seriesTmdbId = seriesId
      episode.seasonNo = seasonNo
      episode.episodeNo = episodeNo
      episode.tmdbRating = response.data.vote_average
      episode.watched = false
      episode.series = series._id
      episode.user = req.user._id
      episode.save()
    } catch (err) {
      console.log(err)
    }

    res.redirect(`/series/${seriesId}/season/${seasonNo}/episode/${episodeNo}`)
  }
}

module.exports = {
  show,
  create
}
