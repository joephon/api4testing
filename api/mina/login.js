const request = require('request')
const { verifyPwd, createPwd, signJwt } = require('../../utils/helper')
const { ok, miss, invalid, _404 } = require('../../utils/response')
const V = require('../../utils/validator')
const { User } = require('../../models')
const config = require('../../config')

module.exports = async function login(req, res) {
  const { code } = req.body

  if (!code) {
    return res.json(miss('CODE'))
  }

  if (!V.isString(code)) {
    return res.json(invalid('CODE'))
  }

  // get user id
  const url = `https://api.weixin.qq.com/sns/jscode2session?appid=${config.appId}&secret=${config.appSecret}&js_code=${code}&grant_type=authorization_code`;
  const data = await new Promise((resolve, reject) => {
    request.get(url, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        const d = JSON.parse(body)
        resolve(d)
      } else {
        // todo
        reject(error)
      }
    })
  })


  // check is user exists
  const { openid, session_key } = data
  let existed = await User.findOne({ openid })

  if (!existed) {
    // create new user
    existed = await new User({ openid, session_key }).save()
  }

  const accessToken = await signJwt({ _id: existed._id })
  return res.json(ok(accessToken))
}