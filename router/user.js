const router = require('express').Router()
// const db = require('../db')

router.get('/user/:id', (req, res, next) => {
  if (req.params.id === '1') next('route')
  else next()
}, (req, res, next) => {
  res.send('middle router')
})

router.get('/user/:id', (req, res, next) => {
  res.send('heihei')
})

module.exports = router