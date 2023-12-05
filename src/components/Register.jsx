import React, { useState } from 'react';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // 添加状态来存储可能出现的错误消息
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault(); // 阻止表单的默认提交行为

    // 检查用户名和密码是否符合要求
    if (!username) {
      setError('Username is required');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    // 清除错误消息
    setError('');

    // 构建请求体
    const requestBody = {
      username: username,
      password: password,
    };

    try {
      // 发送注册请求到后端API
      const response = await fetch('http://localhost:5000/api/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json(); // 解析JSON响应

      if (response.ok) {
        // 注册成功处理逻辑
        console.log('Registration successful:', data);
        // 可以在这里进行如页面跳转等后续操作
      } else {
        // 注册失败处理逻辑
        console.error('Registration failed:', data.message);
        // 更新错误状态
        setError(data.message);
      }
    } catch (error) {
      // 网络或其他错误处理逻辑
      console.error('There was an error registering the user:', error);
      // 更新错误状态
      setError('There was an error registering the user');
    }
  };

  // JSX代码用于渲染注册表单
  return (
    <div>
      <h2>Register</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* 显示错误消息 */}
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
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;