const router = require('express').Router()

const login = require('./login')
const devices = require('./devices')
const homes = require('./homes')
const status = require('./status')

router.post('/login', login)
router.get('/devices', devices)
router.get('/homes', homes)
router.get('/status', status.get)
router.post('/status', status.set)

module.exports = router



