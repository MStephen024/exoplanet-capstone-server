const express = require('express')
const router = express.Router()

const axios = require('axios')

// OLD NASA Exos
// let nasaLink = 'https://exoplanetarchive.ipac.caltech.edu/cgi-bin/nstedAPI/nph-nstedAPI?table=exoplanets&format=json'

// NEW NASA Planetary System link:
const nasaLink = 'https://exoplanetarchive.ipac.caltech.edu/TAP/sync?query=select+pl_name,sy_snum,sy_pnum,sy_mnum,discoverymethod,disc_facility,disc_telescope,pl_masse,pl_orbper,pl_rade,pl_trandur,disc_year,st_rad,st_age,st_dens,rowupdate+from+ps+where+upper(soltype)+like+%27%CONF%%27+and+pl_masse+%3C+100.0+&format=json'

router.get('/', async (req, res, next) => {
  await axios.get(`${nasaLink}`)
    .then(response => {
      res.send(response.data)
    })
    .catch(next)
})

router.get('/exoplanets/:id', async (req, res, next) => {
  await axios.get(`${nasaLink}`)
    .then(response => {
      res.send(response.data[req.params.id])
    })
    .catch(next)
})

module.exports = router
