const mongoose = require('mongoose')
const { list } = require('../utils/list')

const { Schema } = mongoose

const schema = new Schema(
  {
    nickName: { type: String, default: '管理员' }, // 用户昵称
    account: { type: String, required: true }, // 账号
    password: { type: String, required: true }, // 加密后的密码
    born: { type: String, default: 'normal' }, // super  超管标识
    active: { type: Boolean, default: false }, // 是否激活
    lock: { type: Boolean, default: false }, // 是否冻结
    createdBy: { type: String, default: 'system' }, // 非系统创建则为 创建者管理员的id
    time: { type: Number, default: Date.now }, // 创建时间
  },
  { timestamps: true }
);

schema.static('list', list);

module.exports = mongoose.model('admin', schema)