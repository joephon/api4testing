const mongoose = require('mongoose')
const list = require('../utils/list')

const { Schema } = mongoose

const schema = new Schema(
  {
    name: { type: String, required: true }, // 位置名称
    qaID: { type: String, required: true }, // 从属于哪个qa id    // type: mongoose.Schema.Types.ObjectId, ref: 'Location'
    belongsTo: { type: String, required: true }, // 用户 id
    location: {
        type: { type: String, enum: ['Point'], default: 'Point' },
        coordinates:{ type: [Number], require: true  }, // 经纬度
    }, // 位置信息
    extend: { type: Object, default: {} }, // 拓展字段
  },
  { timestamps: true }
);

schema.static('list', list)
schema.index({location: '2dsphere'})

module.exports = mongoose.model('location', schema)