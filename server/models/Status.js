// server/models/Status.js

const mongoose = require('mongoose');

const statusSchema = new mongoose.Schema({
  username: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  content: { type: String, required: true },
});

module.exports = mongoose.model('Status', statusSchema);
