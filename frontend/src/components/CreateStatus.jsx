// CreateStatus.jsx

// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useStatus } from '../context/StatusContext';

function CreateStatus() {
  const [content, setContent] = useState('');
  const { currentUser } = useAuth(); // 使用 AuthContext 获取当前用户
  const { fetchStatuses } = useStatus();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!currentUser) {
      console.error('No user logged in');
      return;
    }

    try {
      const response = await fetch('/api/status', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: currentUser.username, content }), // 包含用户名和内容
      });

      if (response.ok) {
        console.log('Status posted successfully');
        setContent(''); // 清空文本域
        fetchStatuses(); // 调用 fetchStatuses 更新全局状态
      } else {
        console.error('Failed to post status');
      }
    } catch (error) {
      console.error('Error posting status:', error);
    }
  };

  return (
    <div>
      <h2>Create a New Status</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's on your mind?"
        />
        <button type="submit">Post</button>
      </form>
    </div>
  );
}

export default CreateStatus;