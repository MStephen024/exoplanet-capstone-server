const mongoose = require('mongoose')

const favoriteSchema = new mongoose.Schema({
  // Note: Check if you can change this object below to just be a key/value of pl_name:String, like pl_disc
  pl_name: {
    type: String
  },
  pl_disc: String,
  pl_facility: {
    type: String
  },
  pl_discmethod: {
    type: String
  },
  pl_massj: {
    type: String
  },
  tags: {
    type: String,
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Favorite', favoriteSchema)
