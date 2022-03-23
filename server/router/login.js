const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const schema = require('../models/User');
const jwt = require('jsonwebtoken');
const assert = require('http-assert');
const { userKey } = require('../config');

router.get('/', (req, res) => {
  res.send('fuck U');
});
router.post('/', async (req, res) => {
  const { username, password } = req.body;
  const user = await schema.findOne({ username }).select('+password');
  assert(user, 422, '用户不存在');
  const isValid = bcrypt.compareSync(password, user.password);
  assert(isValid, 422, '密码错误');
  const token = jwt.sign({ id: user._id }, userKey);
  res.send({ token });
});

module.exports = router;
