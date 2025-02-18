const { verifyPwd, createPwd, signJwt } = require('../../utils/helper')
const { ok, miss, invalid, _404 } = require('../../utils/response')
const { Admin, Qa } = require('../../models')

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

    // init qa 
    const qa = [
      { key: '经常去哪玩？', value: '', tips: '写商圈吧，或者什么滑雪场都行（如三里屯、南山滑雪场）', kind: 'gps' /* text, gps */ },
      { key: '在哪块工作？', value: '', tips: '比如某个写字楼，某个地铁站附近', kind: 'gps'},
      { key: '住在哪块？', value: '', tips: '考虑女生安全，不用写得太具体；男生自便', kind: 'gps'},
      { key: '你的性别', value: '', tips: '', kind: 'text'},  // male, female
      { key: '哪年出生呢？', value: '', tips: '', kind: 'text'},
      { key: '你的身高', value: '', tips: '单位：厘米', kind: 'text'},
      { key: '你的体重', value: '', tips: '单位：公斤', kind: 'text'},
      { key: '老家哪呢？', value: '', tips: '写省/市/区县都可以', kind: 'text'},
      { key: '工作行业', value: '', tips: '如：金融、时尚、待业、学生等', kind: 'text'},
      { key: 'MBTI', value: '', tips: '不知道填星座也行', kind: 'text'},
      { key: '吸烟与否', value: '', tips: '烟民之间，优先匹配', kind: 'text'}, // 吸烟，不吸烟
      { key: '喝咖啡频率', value: '', tips: '咖友之间，优先匹配', kind: 'text'}, // 每天（经常）， 偶尔， 从不
      { key: '吃辣情况', value: '', tips: '辣党之间，优先匹配', kind: 'text'}, // 无辣不欢，一般般，我服了！一点都吃不了！！！
    ]
    qa.forEach(async (item) => {
      await new Qa({ ...item }).save()
    })

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