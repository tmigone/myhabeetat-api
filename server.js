const packageJSON = require('./package.json')
const express = require('express')

const { errorHandler } = require('./middleware/error.js')
const oauthRoutes = require('./routes/oauth.js')
const apiRoutes = require('./routes/api/index.js')
// const explorerRoutes = require('./routes/explorer.js')

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

// app.use('/', explorerRoutes)
app.use('/v1/oauth/', oauthRoutes)
app.use('/v1/api/', apiRoutes)
app.use(errorHandler)

// Start server
app.listen(app.get('port'), () => {
  console.log(`${packageJSON.name} listening on port ${app.get('port')}`)
})
