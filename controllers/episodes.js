const Series = require('../models/series')
const Episode = require('../models/episode')
const mongoose = require('mongoose')
const axios = require('axios')
const API_KEY = process.env.API_KEY

const show = async (req, res) => {
  const seriesId = req.params.seriesId
  const seasonNo = req.params.seasonNo
  const episodeNo = req.params.episodeNo

  const episode = await Episode.findOne({
    seriesTmdbId: seriesId,
    seasonNo: seasonNo,
    episodeNo: episodeNo,
    user: req.user._id
  })

  res.render(`episodes/show`, {
    title: episode.seriesName,
    episode
  })
}

const create = async (req, res) => {
  const seriesId = req.params.seriesId
  const seasonNo = req.query.season
  const episodeNo = req.query.episode
  if (
    await Episode.exists({
      seasonNo: seasonNo,
      episodeNo: episodeNo,
      seriesTmdbId: seriesId,
      user: req.user._id
    })
  ) {
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
      episode.tmdbRating = response.data.vote_average
      episode.thumbnail = response.data.still_path
      episode.description = response.data.overview
      episode.seriesName = series.name
      episode.seriesTmdbId = seriesId
      episode.seasonNo = seasonNo
      episode.episodeNo = episodeNo
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

const update = async (req, res) => {
  const episode = await Episode.findOne({
    seasonNo: req.params.seasonNo,
    episodeNo: req.params.episodeNo,
    seriesTmdbId: req.params.seriesId,
    user: req.user._id
  })
  console.log(episode)
  episode.userRating = req.body.rating
  episode.userComments.push(req.body.comment)
  episode.watched = true
  episode.save()
  res.redirect(
    `/series/${req.params.seriesId}/season/${req.params.seasonNo}/episode/${req.params.episodeNo}`
  )
}

module.exports = {
  show,
  create,
  update
}
