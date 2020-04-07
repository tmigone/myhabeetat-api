const packageJSON = require('./package.json')
const express = require('express')
const MyHabeetat = require('myhabeetat')

const app = express()
app.set('view engine', 'pug')
app.set('trust proxy', 1)
app.set('port', 80)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Test endpoint
app.get('/', (req, res) => {
  res.json({ status: 'ok' })
})

// OAuth 2.0 - Authorization URI
app.get('/oauth/authorize', (req, res) => {
  const { state, redirect_uri: redirectURL } = req.query
  if (state && redirectURL) {
    res.render('login', data)
  } else {
    res.status(500).json({
      status: 'error',
      message: 'Missing required querystring parameters: state, redirect_uri'
    })
  }
})

app.get('/oauth/authorize/callback', async (req, res) => {
  const { uname, psw, redirect_uri: redirectURL, state } = req.query
  try {
    let token = await MyHabeetat.login(uname, psw)
    if (redirectURL && state && token) {
      res.redirect(`${decodeURI(redirectURL)}?state=${state}&code=${token}`)
    } else {
      res.status(500).json({
        status: 'error',
        message: 'Error: Could not get redirectURL, state or token.'
      })
    }
  } catch (error) {
    res.status(500).json({
      status: 'error',
      source: 'MyHabeetat',
      message: error.message
    })
  }
})

// OAuth 2.0 - Access token URI
// TODO: Don't do it the hacky way...
app.post('/oauth/access_token', (req, res) => {
  res.json({
    access_token: req.body.code
  })
})

// Start server
app.listen(app.get('port'), () => {
  console.log(`${packageJSON.name} listening on port ${app.get('port')}`)
})
