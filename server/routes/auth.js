// server/routes/auth.js

const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const Status = require('../models/Status'); // 引入状态模型

const router = express.Router();

// 注册路由
router.post('/register', async (req, res) => {
  console.log('Received register request:', req.body);
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
      username: req.body.username,
      password: hashedPassword,
      description: req.body.description
    });
    const savedUser = await newUser.save();
    savedUser.password = undefined;

    console.log('User registered successfully:', savedUser.username);
    res.cookie('userId', savedUser._id.toString(), { httpOnly: true, maxAge: 3600000 });
    console.log('Cookie set for user:', savedUser._id);
    res.status(201).json({ message: 'Registration successful and logged in' });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ message: error.message });
  }
});

// 登录路由
router.post('/login', async (req, res) => {
  console.log('Login attempt for user:', req.body.username);
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user) {
      const isValid = await bcrypt.compare(password, user.password);
      if (isValid) {
        res.cookie('userId', user._id.toString(), { httpOnly: true, maxAge: 3600000 });
        console.log('Cookie set for user:', user._id);
        res.status(200).json({ message: 'Login successful', user: { username: user.username } });
      } else {
        console.log('Invalid password for user:', username);
        res.status(400).json({ message: 'Invalid password' });
      }
    } else {
      console.log('User not found:', username);
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Error logging in' });
  }
});

// 检查登录状态的路由
router.get('/checkLogin', async (req, res) => {
  console.log('Checking login status. Cookie received:', req.cookies.userId);
  try {
    if (req.cookies.userId) {
      const user = await User.findById(req.cookies.userId);
      if (user) {
        user.password = undefined;
        console.log('User is logged in:', user.username);
        res.json({ user: { username: user.username, description: user.description } });
      } else {
        console.log('No user found with id:', req.cookies.userId);
        res.status(404).json({ message: 'User not found' });
      }
    } else {
      console.log('No cookie found, user is not logged in');
      res.status(401).json({ message: 'Not logged in' });
    }
  } catch (error) {
    console.error('Error checking login status:', error);
    res.status(500).json({ message: 'Error checking login status' });
  }
});

// 获取用户详细信息及其状态的路由
router.get('/user/:username', async (req, res) => {
  try {
    const username = req.params.username;
    const user = await User.findOne({ username: username }).select('-password');
    const statuses = await Status.find({ username: username }).sort({ timestamp: -1 });

    if (user) {
      res.json({
        userDetails: {
          username: user.username,
          joinedDate: user.joinedDate,
          description: user.description
        },
        statuses: statuses
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error fetching user details and statuses:', error);
    res.status(500).json({ message: 'Error fetching user details and statuses' });
  }
});

// 修改description路由
router.put('/updateDescription', async (req, res) => {
  try {
    const { username, description } = req.body;
    // 这里应该有身份验证逻辑，以确保用户有权更新描述

    const updatedUser = await User.findOneAndUpdate(
      { username },
      { description },
      { new: true }
    ).select('-password');

    if (updatedUser) {
      res.json({ message: 'Description updated successfully', user: updatedUser });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error updating user description:', error);
    res.status(500).json({ message: 'Error updating user description' });
  }
});


module.exports = router;