import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // 添加状态来存储可能出现的错误消息
  const [error, setError] = useState('');
  const navigate = useNavigate();


  const handleSubmit = async (event) => {
    event.preventDefault(); // 阻止表单的默认提交行为

    // check validity
    if (!username) {
      setError('Username is required');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    // clear error
    setError('');

    const requestBody = {
      username: username,
      password: password,
    };

    try {
      const response = await fetch('http://localhost:5000/api/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Registration successful:', data);
        navigate('/');
      } else {
        console.error('Registration failed:', data.message);
        setError(data.message);
      }
    } catch (error) {
      console.error('There was an error registering the user:', error);
      setError('There was an error registering the user');
    }
  };

  // JSX代码用于渲染注册表单
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
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;