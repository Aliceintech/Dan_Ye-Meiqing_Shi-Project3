// Register.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const { login } = useAuth(); // 从 AuthContext 获取 login 方法

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!username) {
      setError('Username is required');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }
    setError('');

    const requestBody = {
      username,
      password,
      description
    };

    try {
      const response = await fetch('http://localhost:5000/api/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        // 注册成功后，更新登录状态
        login({ username });
        navigate('/'); // 导航到主页
      } else {
        const data = await response.json();
        console.error('Registration failed:', data.message);
        setError(data.message);
      }
    } catch (error) {
      console.error('There was an error registering the user:', error);
      setError('There was an error registering the user');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
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
        <div>
          <label>Description (optional)</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;