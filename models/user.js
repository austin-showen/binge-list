const mongoose = require('mongoose')
const Schema = mongoose.Schema
const seriesSchema = require('./series')

const userSchema = new Schema(
  {
    name: String,
    googleId: {
      type: String,
      required: true
    },
    email: String,
    avatar: String
    // seriesList: [seriesSchema]
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('User', userSchema)
