const mongoose = require('mongoose')

const exoplanet = new mongoose.Schema({
  exo_name: {
    type: String,
    required: true
  },
  exo_disc: {
    type: Number,
    required: false
  },
  exo_facility: {
    type: String,
    required: false
  },
  exo_discMethod: {
    type: String,
    required: false
  },
  exo_massJ: {
    type: Number,
    required: false
  },
  exo_dec: {
    type: Number,
    required: false
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Exoplanet', exoplanet)
