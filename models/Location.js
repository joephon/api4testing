const mongoose = require('mongoose')
const list = require('../utils/list')

const { Schema } = mongoose

const locationSchema = new Schema(
  {
    type: { type: String, default: 'Point' },
    coordinates:{ type: [Number], require: true  }, // 经纬度
  },
);

const schema = new Schema(
  {
    name: { type: String, required: true }, // 位置名称
    qaID: { type: String, required: true }, // 从属于哪个qa id
    belongsTo: { type: String, required: true }, // 用户 id
    location: locationSchema, // 位置信息
    extend: { type: Object, default: {} }, // 拓展字段
  },
  { timestamps: true }
);

schema.static('list', list);

module.exports = mongoose.model('location', schema)