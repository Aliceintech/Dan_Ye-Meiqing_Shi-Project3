// server/models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // 添加任何其他需要的字段
});

module.exports = mongoose.model('User', userSchema);
