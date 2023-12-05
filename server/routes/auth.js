// server/routes/auth.js
const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const router = express.Router();


// 注册路由
router.post('/register', async (req, res) => {
  console.log('Received register request');

  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
      username: req.body.username,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();
    console.log('New user registered:', savedUser); // 打印新注册的用户信息
    res.status(201).json(savedUser);
  } catch (error) {
    console.error('Error during registration:', error); // 打印错误信息
    res.status(500).json({ message: error.message });
  }
});


// 登录路由
router.post('/login', async (req, res) => {
  console.log('Received login request');

  try {
    // 从请求中获取用户名和密码
    const { username, password } = req.body;

    // 在数据库中查找用户
    const user = await User.findOne({ username });
    if (user) {
      // 检查密码是否正确
      const isValid = await bcrypt.compare(password, user.password);
      if (isValid) {
        // 密码正确，发送成功响应
        res.status(200).json({ message: 'Login successful', user: { username: user.username } });
      } else {
        // 密码错误
        res.status(400).json({ message: 'Invalid password' });
      }
    } else {
      // 用户不存在
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Error logging in' });
  }
});


module.exports = router;