// Home.jsx

import React, { useEffect, useState } from 'react'; // 引入 useEffect
import { useAuth } from '../context/AuthContext';
import CreateStatus from './CreateStatus';


function Home() {


  const [statuses, setStatuses] = useState([]);
  const { currentUser } = useAuth(); // 使用 AuthContext 获取当前用户

  useEffect(() => {
    // 获取并显示状态更新的逻辑（不变）
    const fetchStatuses = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/status');
        if (response.ok) {
          const data = await response.json();
          setStatuses(data);
        }
      } catch (error) {
        console.error('Error fetching statuses:', error);
      }
    };

    fetchStatuses();
  }, []);

  return (
    <div>
      <h1>Home Page</h1>
      {currentUser && <CreateStatus />} // 仅当用户登录时显示 CreateStatus 组件
      <h2>Status Updates</h2>
      {statuses.map(status => (
        <div key={status._id}>
          <p>{status.content}</p>
          <small>Posted by {status.username} on {new Date(status.timestamp).toLocaleString()}</small>
        </div>
      ))}
    </div>
  );
}

export default Home;