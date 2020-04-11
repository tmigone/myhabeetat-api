const asyncHandler = require('express-async-handler')
const MyHabeetat = require('myhabeetat')

exports.get = asyncHandler(async (req, res) => {
  let status = await MyHabeetat.getDeviceStatus(req.body.token, parseInt(req.body.home), parseInt(req.body.device))
  res.json({ status: 'ok', devices: status })
})

exports.set = asyncHandler(async (req, res) => {
  let status = {}
  if (req.body.mode) status.mode = req.body.mode
  if (req.body.fanMode) status.fanMode = req.body.fanMode
  if (req.body.targetTemperature) status.targetTemperature = req.body.targetTemperature
  let result = await MyHabeetat.setDeviceStatus(req.body.token, parseInt(req.body.model), parseInt(req.body.endpoint), status)
  res.json({ status: 'ok', devices: result })
})
