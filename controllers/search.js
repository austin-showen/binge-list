const mongoose = require('mongoose')
const axios = require('axios')
const API_KEY = process.env.API_KEY

const index = async (req, res) => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/tv/popular?language=en-US&page=1&api_key=${API_KEY}`
  )
  const popularSeries = response.data.results
  res.render('search/index', { title: 'Popular Shows', series: popularSeries })
}

const search = async (req, res) => {
  console.log('hello')
  const query = req.query.series
  const response = await axios.get(
    `https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1&api_key=${API_KEY}`
  )
  const searchResults = response.data.results
  res.render('search/index', { title: 'Search Results', series: searchResults })
}

module.exports = {
  index,
  search
}
