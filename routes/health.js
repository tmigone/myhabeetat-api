const router = require('express').Router()

router.get('/', (req, res) => {
  res.json({ status: 'ok', date: new Date() })
})

module.exports = router