const mongoose = require('mongoose')
const Schema = mongoose.Schema

const seriesSchema = new Schema(
  {
    name: String
  },
  { timestamps: true }
)

module.exports = mongoose.model('Series', seriesSchema)
