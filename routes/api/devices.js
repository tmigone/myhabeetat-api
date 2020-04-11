const asyncHandler = require('express-async-handler')
const MyHabeetat = require('myhabeetat')

module.exports = asyncHandler(async (req, res) => {
  let devices = await MyHabeetat.getDevices(req.body.token, req.body.home)
  res.json({ status: 'ok', devices: devices })
})