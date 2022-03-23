const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  username: { type: String },
  password: {
    type: String,
    set: (value) => require('bcrypt').hashSync(value, 10),
  },
});

module.exports = mongoose.model('User', schema);
