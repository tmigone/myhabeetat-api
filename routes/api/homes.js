const asyncHandler = require('express-async-handler')
const MyHabeetat = require('myhabeetat')

module.exports = asyncHandler(async (req, res) => {
  let homes = await MyHabeetat.getHomes(req.body.token)
  res.json({ status: 'ok', homes: homes })
})