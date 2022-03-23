const express = require('express');
const router = express.Router();
const schema = require('../models/Log');

router.get('/', async (req, res) => {
  const model = await schema.find().sort({ _id: -1 });
  res.send(model);
});

router.post('/', async (req, res) => {
  res.send();
});

router.delete('/', async (req, res) => {
  const model = await schema.findByIdAndDelete(req.query._id);
  res.send(model);
});

router.put('/', async (req, res) => {
  res.send();
});

router.patch('/', (req, res) => {
  res.send();
});

module.exports = router;
