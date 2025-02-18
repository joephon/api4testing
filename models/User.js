const mongoose = require('mongoose')
const { list } = require('../utils/list')

const { Schema } = mongoose

const schema = new Schema(
  {
    nickName: { type: String, default: '微信用户' }, // 用户昵称
    openID:{ type: String, default: '微信用户' }, // wx openid
    extend: { type: Object, default: {} }, // 拓展字段
    active: { type: Boolean, default: false }, // 是否激活
    lock: { type: Boolean, default: false }, // 是否冻结
  },
  { timestamps: true }
);

schema.static('list', list);

module.exports = mongoose.model('user', schema)