// Login.jsx

import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // 打印发送的请求数据
      console.log('Login request:', { username, password });

      // 向后端发送登录请求
      const response = await fetch('http://localhost:5000/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json(); // 解析响应数据

      // 打印响应数据
      console.log('Login response:', data);

      if (response.ok) {
        // 登录成功
        console.log('Login successful:', data);
        login({ username }); // 更新登录状态
        navigate('/'); // 导航到主页或其他页面
      } else {
        // 登录失败
        console.error('Login failed:', data.message);
      }
    } catch (error) {
      // 网络或其他错误处理
      console.error('There was an error logging in the user:', error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username</label>
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
          />
        </div>
        <div>
          <label>Password</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;