const mongoose = require('mongoose')
const list = require('../utils/list')

const { Schema } = mongoose

const schema = new Schema(
  {
    qa: { type: [String], default: [] }, // qa合集
    belongsTo:{ type: String, require: true }, // 属于哪个用户
  },
  { timestamps: true }
);

schema.static('list', list);

module.exports = mongoose.model('survey', schema)