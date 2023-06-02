const Series = require('../models/series')
const Episode = require('../models/episode')
const mongoose = require('mongoose')
const axios = require('axios')
const API_KEY = process.env.API_KEY

const index = async (req, res) => {
  const series = await Series.find({ user: req.user._id })
  res.render('series/index', { title: 'My Binge List', series })
}

const show = async (req, res) => {
  const series = await Series.findOne({
    tmdbId: req.params.id,
    user: req.user._id
  })

  const episodeList = await Episode.find({
    seriesTmdbId: series.tmdbId,
    user: req.user._id
  })

  const episodeRatings = {}

  episodeList.forEach((episode) => {
    if (episode.userRating) {
      const episodeId = episode.seasonNo + 'x' + episode.episodeNo
      episodeRatings[episodeId] = episode.userRating
    }
  })

  res.render('series/show', {
    title: series.name,
    series,
    episodeRatings
  })
}

const create = async (req, res) => {
  if (await Series.exists({ tmdbId: req.query.tmdbId, user: req.user._id })) {
    res.redirect('/series')
  } else {
    const tmdbId = req.query.tmdbId
    const response = await axios.get(
      `https://api.themoviedb.org/3/tv/${tmdbId}?language=en-US&api_key=${API_KEY}`
    )
    const series = new Series()

    try {
      series.name = response.data.name
      series.tmdbId = response.data.id
      series.description = response.data.overview
      series.seasons = response.data.seasons
      series.thumbnail = response.data.poster_path
      series.backdrop = response.data.backdrop_path
      series.tmdbRating = response.data.vote_average
      series.user = req.user._id
      series.save()
    } catch (err) {
      console.log(err)
    }

    res.redirect('/series')
  }
}

const deleteSeries = async (req, res) => {
  await Series.findByIdAndDelete(req.params.id)
  res.redirect('/series')
}

module.exports = {
  index,
  show,
  create,
  delete: deleteSeries
}
