const asyncHandler = require('express-async-handler')
const MyHabeetat = require('myhabeetat')

module.exports = asyncHandler(async (req, res) => {
  let token = await MyHabeetat.login(req.body.email, req.body.password)
  res.json({ status: 'ok', token: token })
})