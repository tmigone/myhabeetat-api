const packageJSON = require('./package.json')
const express = require('express')

const { errorHandler } = require('./middleware/error.js')
const healthRoutes = require('./routes/health.js')
const oauthRoutes = require('./routes/oauth.js')
const apiRoutes = require('./routes/api/index.js')
// const explorerRoutes = require('./routes/explorer.js')

const app = express()
app.set('views', __dirname + '/views')
app.set('view engine', 'pug')
app.set('trust proxy', 1)
app.set('port', 80)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/health', healthRoutes)
// app.use('/', explorerRoutes)
app.use('/v1/oauth/', oauthRoutes)
app.use('/v1/api/', apiRoutes)
app.use(errorHandler)

// Start server
app.listen(app.get('port'), () => {
  console.log(`${packageJSON.name} listening on port ${app.get('port')}`)
})
