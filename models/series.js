const mongoose = require('mongoose')
const Schema = mongoose.Schema

const seriesSchema = new Schema(
  {
    name: String,
    tmdbId: Number,
    description: String,
    seasons: [],
    thumbnail: String,
    backdrop: String,
    tmdbRating: Number,
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model('Series', seriesSchema)
