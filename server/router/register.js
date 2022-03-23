const express = require('express');
const router = express.Router();
const assert = require('http-assert');
const jwt = require('jsonwebtoken');
const schema = require('../models/User');
const { userKey } = require('../config');

router.post('/', async (req, res) => {
  const { username, password, safeCode } = req.body;
  const user = await schema.findOne({ username }).select('+password');
  assert(safeCode === '123456', 400, '安全码错误');
  assert(!user, 400, '用户已存在');
  const newUser = await schema.create({
    username,
    password,
  });
  assert(newUser, 400, '注册失败请重新注册');
  const token = jwt.sign({ id: newUser._id }, userKey);
  res.send({ token });
});

module.exports = router;
