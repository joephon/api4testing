const { ok, miss, invalid, _404 } = require('../../utils/response')
const V = require('../../utils/validator')
const { Qa } = require('../../models')

async function list(req, res) {
  const {} = req.body

  const list = await Qa.list({})
  return res.json(ok(list))
}

module.exports = {
  list
}