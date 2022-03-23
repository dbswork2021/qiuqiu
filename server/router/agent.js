const express = require('express');
const router = express.Router();
const assert = require('http-assert');
const schema = require('../models/Agent');

router.get('/', async (req, res) => {
  let model = [];
  if (req.query.page) {
    model = await schema
      .find()
      .skip((req.query.page - 1) * 10)
      .limit(10)
      .sort({ _id: -1 });
  } else {
    model = await schema.find().limit(10).sort({ _id: -1 });
  }
  const count = await schema.count();
  res.send({
    total: count,
    data: model,
  });
});

router.post('/', async (req, res) => {
  const searchModel = {};
  if (req.body.phone != '') {
    searchModel.phone = req.body.phone;
  }
  if (req.body.note != '') {
    searchModel.note = req.body.note;
  }
  if (req.body.tencent != '') {
    searchModel.tencent = req.body.tencent;
  }
  if (req.body.agent != '') {
    searchModel.agent = req.body.agent;
  }
  if (req.body.historyRepect) {
    searchModel.historyRepect = { $gt: 0 };
  } else {
    searchModel.historyRepect = 0;
  }
  if (req.body.creatTime != 0) {
    searchModel.creatTime = req.body.creatTime;
  }

  const model = await schema
    .find(searchModel)
    .skip((req.body.page - 1) * 10)
    .limit(10)
    .sort({ _id: -1 });
  const count = await schema.find(searchModel).count();

  res.send({
    total: count,
    data: model,
  });
});

router.delete('/', async (req, res) => {
  const model = await schema.findByIdAndDelete(req.query._id);

  res.send(model);
});

router.put('/', async (req, res) => {
  console.log(req.body);

  const model = await schema.findByIdAndUpdate(req.body._id, req.body);
  res.send(model);
});

router.patch('/', (req, res) => {
  res.send();
});

module.exports = router;
