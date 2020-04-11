exports.errorHandler = (err, req, res, next) => {
  console.error(`[Error Handler] ${err.message}`)
  let code = err.code > 100 ? err.code : 500
  res.status(code).json({ success: false, error: err.message })
}
