const express = require('express')
const passport = require('passport')

const Favorite = require('../models/favorite')

const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
const removeBlanks = require('../../lib/remove_blank_fields')
const requireToken = passport.authenticate('bearer', { session: false })
const router = express.Router()

// INDEX
router.get('/favorites', requireToken, (req, res, next) => {
  Favorite.find()
    .then(favorites => {
      // `favorites` will be an array of Mongoose documents
      // so we use `.map` to apply `.toObject` to each one
      return favorites.map(favorite => favorite.toObject())
    })
    .then(favorites => res.status(200).json({ favorites: favorites }))
    .catch(next)
})

// SHOW
router.get('/favorites/:id', requireToken, (req, res, next) => {
  Favorite.findById(req.params.id)
    .then(handle404)
    .then(favorite => res.status(200).json({ favorite: favorite.toObject() }))
    .catch(next)
})

// CREATE
router.post('/favorites', requireToken, (req, res, next) => {
  req.body.favorite.owner = req.user.id

  Favorite.create(req.body.favorite)
    .then(favorite => {
      res.status(201).json({ favorite: favorite.toObject() })
    })
    // the error handler needs the error message and the `res` object so that it
    // can send an error message back to the client
    .catch(next)
})

// UPDATE
router.patch('/favorites/:id', requireToken, removeBlanks, (req, res, next) => {
  // if the client attempts to change the `owner` property by including a new
  // owner, prevent that by deleting that key/value pair
  delete req.body.favorite.owner

  Favorite.findById(req.params.id)
    .then(handle404)
    .then(favorite => {
      requireOwnership(req, favorite)

      return favorite.update(req.body.favorite)
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

// DESTROY
router.delete('/favorites/:id', requireToken, (req, res, next) => {
  Favorite.findById(req.params.id)
    .then(handle404)
    .then(favorite => {
      requireOwnership(req, favorite)
      favorite.remove()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

module.exports = router
