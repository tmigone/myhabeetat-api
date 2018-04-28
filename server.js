const express = require('express')
const serveStatic = require('serve-static')
const path = require('path')
const session = require('cookie-session')

const app = express()
app.set('trust proxy', 1)
app.set('port', 5000)
app.use(session({ secret: 'batata', cookie: { maxAge: 2592000 }}))
// c9rvt7y / alexa1234


app.get('/', (req, res) => {
  res.send("Hello!")
})


app.get('/oauth/request_token', (req, res) => {
  let sess = req.session
  sess.state = req.query.state
  sess.client_id = req.query.client_id
  sess.scope = req.query.scope
  sess.redirect_uri = req.query.redirect_uri
  console.log(sess)

  let redirect_alexa = decodeURI(sess.redirect_uri)+"?state="+sess.state+"&code="+"SplxlOBeZQQYbYS6WxSbIA"
  console.log(redirect_alexa)

  res.redirect(redirect_alexa)
})

app.get('/oauth/access_token', (req, res) => {
	let sess = req.session
	res.json({
    access_token: "SplxlOBeZQQYbYS6WxSbIR",
    refresh_token: "SplxlOBeZQQYbYS6WxSbIR"
  })
})

app.post('/oauth/access_token', (req, res) => {
	let sess = req.session

	res.json({
    access_token: "SplxlOBeZQQYbYS6WxSbIR",
    refresh_token: "SplxlOBeZQQYbYS6WxSbIR"
  })
})


app.listen(app.get('port'), () => {
  console.log('Express server started on port 5000')
})
