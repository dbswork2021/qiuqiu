const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    note: {
      type: String,
    },
    count: { type: Number },
    types: { type: String },
    fileRepect: { type: Number },
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

module.exports = mongoose.model('Log', schema);
