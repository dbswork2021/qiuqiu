const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    phone: { type: String, unique: true },
    tencent: { type: String },
    agent: { type: String },
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

module.exports = mongoose.model('Agent', schema);
