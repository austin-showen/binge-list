const mongoose = require('mongoose')
const Schema = mongoose.Schema

const episodeSchema = new Schema(
  {
    name: String,
    description: String,
    thumbnail: String,
    seriesName: String,
    seriesTmdbId: Number,
    seasonNo: Number,
    episodeNo: Number,
    watched: Boolean,
    userRating: Number,
    userComments: [String],
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    series: {
      type: Schema.Types.ObjectId,
      ref: 'Series',
      required: true
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model('Episode', episodeSchema)
