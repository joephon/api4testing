const { verifyPwd, createPwd, signJwt } = require('../../utils/helper')
const { ok, miss, invalid, _404 } = require('../../utils/response')
const { Admin } = require('../../models')

module.exports = async function login(req, res) {
  const { account, password } = req.body

  if (!account) {
    return res.json(miss('ACCOUNT'))
  }

  if (!password) {
    return res.json(miss('PASSWORD'))
  }

  if (account !== 'admin') {
    return res.json(invalid('ACCOUNT'))
  }

  if (password.length < 6) {
    return res.json(invalid('PASSWORD'))
  }

  // generate super admin for the first time
  const total = await Admin.countDocuments()
  if (!total) {
    const pwd = await createPwd(password)
    const { _id } = await new Admin({
      account, password: pwd, nickName: 'super born'
    }).save()

    const accessToken = await signJwt({ _id })
    return res.json(ok(accessToken))
  }

  const admin = await Admin.findOne({ account })
  if (!admin) {
    return res.json(_404('ADMIN NOT EXISTS'))
  }

  const salt = admin.password.slice(-64) // use apart of the raw text as salt
  const matched = await verifyPwd(password, salt, admin.password)
  if (!matched) {
    return res.json(invalid('PASSWORD'))
  }

  const accessToken = await signJwt({ _id: admin._id })
  return res.json(ok(accessToken))
}