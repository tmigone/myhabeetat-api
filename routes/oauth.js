const router = require('express').Router()
const asyncHandler = require('express-async-handler')
const MyHabeetat = require('myhabeetat')

// Authorization URI
router.get('/authorize', (req, res) => {
  const { state, redirect_uri: redirectURL } = req.query

  if (state && redirectURL) {
    res.render('login', { state, redirectURL })
  } else {
    res.status(500).json({
      status: 'error',
      message: 'Missing required querystring parameters: state, redirect_uri'
    })
  }
})

// Callback
router.get('/authorize/callback', asyncHandler(async (req, res) => {
  const { uname, psw, redirect_uri: redirectURL, state } = req.query
  let token = await MyHabeetat.login(uname, psw)
  if (redirectURL && state && token) {
    res.redirect(`${decodeURI(redirectURL)}?state=${state}&code=${token}`)
  } else {
    res.status(500).json({
      status: 'error',
      message: 'Error: Could not get redirectURL, state or token.'
    })
  }
}))

// OAuth 2.0 - Access token URI
// TODO: Don't do it the hacky way...
router.post('/access_token', (req, res) => {
  res.json({
    access_token: req.body.code
  })
})

module.exports = router