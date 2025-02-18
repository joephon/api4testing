const { ok, miss, invalid, _404 } = require('../../utils/response')
const V = require('../../utils/validator')
const { Location, Qa, Survey } = require('../../models')

async function list(req, res) {
  const {} = req.body

  const list = await Qa.list({})
  return res.json(ok(list))
}

async function match(req, res) {
  const { qa } = req.body

  if (!qa) {
    return res.json(miss('QA'))
  }

  if (!V.isArray(qa)) {
    return res.json(invalid('QA'))
  }

  if (!qa.length) {
    return res.json(invalid('QA'))
  }

  // await Survey.deleteMany({})
  // await Location.deleteMany({})

  // save qa list as survey
  await new Survey({ qa, belongsTo: req.currentUser._id }).save()

  // create each location
  const locs = qa.filter(i => i.kind === 'gps')
  locs.forEach(async i => {
    await new Location({ 
      belongsTo: req.currentUser._id,
      qaID: i._id,
      name: i.key,
      location: {
        type: 'Point',
        coordinates: i.value,
      }
    }).save()
  })

  // 拿最新的三个问卷定位去匹配
  const ll = await Location.find({}).limit(3).sort({ createdAt: -1 })

  // core logic, try to match the one via location
  const maxDistance = 3000; // 3000米
  const points = await Promise.all(ll.map(async i => {
    const p = await Location.findOne({  // 每次只匹配一个最接近的
      // 真实匹配应该过滤掉自己  belongsTo: { $ne: req.currentUser._id },
      location: {
        $near: {
          $geometry: i.location,
          $maxDistance: maxDistance
        }
      }
    })
    return p
  }))

  return res.json(ok(points))
}

module.exports = {
  list, match
}