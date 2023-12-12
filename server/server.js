const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const authRoute = require('./routes/auth');
const statusRoute = require('./routes/status');

dotenv.config();
const app = express();

// CORS 配置
const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
};

app.use(cors(corsOptions)); // 使用自定义的 CORS 配置
app.use(express.json()); // 解析 JSON 请求体
app.use(cookieParser()); // 解析 Cookie

// 连接到 MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// 使用路由
app.use('/api/user', authRoute);
app.use('/api/status', statusRoute);

//add from https://github.com/ajorgense1-chwy/cs5610_spr23_mod3/blob/main/backend/server.js#L29-L35
let frontend_dir = path.join(__dirname, '..', 'frontend', 'dist')

app.use(express.static(frontend_dir));
app.get('*', function (req, res) {
    console.log("received request");
    res.sendFile(path.join(frontend_dir, "index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});