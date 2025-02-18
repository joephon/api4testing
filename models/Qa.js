const mongoose = require('mongoose')
const list = require('../utils/list')

const { Schema } = mongoose

const schema = new Schema(
  {
    key: { type: String, default: '' }, // q
    value:{ type: String, default: '' }, // a
    tips:{ type: String, default: '' },
    kind:{ type: String, default: 'text' }, // text, gps
  },
  { timestamps: true }
);

schema.static('list', list);

module.exports = mongoose.model('qa', schema)