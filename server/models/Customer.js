const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    date: { type: String },
    group: { type: String },
    account: { type: String },
    agent: { type: String },
    platform: { type: String },
    subPlatform: { type: String },
    source: { type: String },
    types: { type: String },
    price: { type: String },
    phone: { type: String },
    qq: { type: String },
    wechat: { type: String },
    game: { type: String },
    other: { type: String },
    note: {
      type: String,
    },
    historyRepect: { type: Number },
    creatTime: { type: Number },
  },
  {
    versionKey: false,
    timestamps: {
      currentTime: () => {
        const d = new Date(Date.now());
        d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
        return new Date(d.toLocaleDateString()).getTime();
      },
      createdAt: 'creatTime',
    },
  }
);

module.exports = mongoose.model('Customer', schema);
