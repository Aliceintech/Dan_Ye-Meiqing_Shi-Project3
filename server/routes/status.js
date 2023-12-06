// server/routes/status.js

const express = require('express');
const Status = require('../models/Status');
const router = express.Router();

// 创建状态
router.post('/', async (req, res) => {
  try {
    const newStatus = new Status(req.body);
    const savedStatus = await newStatus.save();
    res.status(201).json(savedStatus);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 获取所有状态
router.get('/', async (req, res) => {
  try {
    const statuses = await Status.find().sort({ timestamp: -1 });
    res.json(statuses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;