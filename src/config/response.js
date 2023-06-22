// 200
const successCode = (res, data, message) => {
  res.status(200).json({
    statusCode: 200,
    message,
    content: data
  })
}
// 400
const failCode = (res, data, message) => {
  res.status(400).json({
    statusCode: 400,
    message,
    content: data
  })
}
// 500
const errorCode = (res, message) => {
  res.status(500).json({
    statusCode: 500,
    message,
    content: data
  })
}

export { successCode, failCode, errorCode }
