const mongoose = require('mongoose')
const Schema = mongoose.Schema

const episodeSchema = new Schema(
  {
    seriesName: String,
    seriesTmdbId: Number,
    seasonNo: Number,
    episodeNo: Number,
    series: {
      type: Schema.Types.ObjectId,
      ref: 'Series',
      required: true
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model('Episode', episodeSchema)
