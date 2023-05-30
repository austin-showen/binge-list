const mongoose = require('mongoose')
const Schema = mongoose.Schema

const seriesSchema = new Schema(
  {
    name: String,
    description: String,
    seasons: [],
    thumbnail: String,
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
