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

// Delete
router.delete('/:statusId', async (req, res) => {
    try {
        const statusId = req.params.statusId;
        
        await Status.findByIdAndDelete(statusId);
        res.status(200).send({ message: 'Status deleted successfully' });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

// update
router.put('/:statusId', async (req, res) => {
    try {
        const statusId = req.params.statusId;
        const updatedContent = req.body.content;
        
        const updatedStatus = await Status.findByIdAndUpdate(statusId, { content: updatedContent }, { new: true });
        res.status(200).json(updatedStatus);
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

// // 获取特定用户状态
// router.get('/user/:username', async (req, res) => {
//     try {
//         const username = req.params.username;
//         const statuses = await Status.find({ username: username }).sort({ timestamp: -1 });
//         res.json(statuses);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
//   });

module.exports = router;