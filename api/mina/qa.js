const { ok, miss, invalid, _404 } = require('../../utils/response')
const V = require('../../utils/validator')
const { Qa } = require('../../models')

module.exports = async function qas(req, res) {
  const {} = req.body

  const list = await Qa.list({})
  return res.json(ok(list))
}