const mongoose = require('mongoose');
const { db } = require('../config');
const dbConnect =
  'mongodb://' +
  db.user +
  ':' +
  db.password +
  '@' +
  db.ip +
  ':' +
  db.port +
  '/' +
  db.db;

module.exports = () => {
  mongoose.connect(dbConnect, {
    useNewUrlParser: true,
  });
};
