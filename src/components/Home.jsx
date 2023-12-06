// Home.jsx

import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useStatus } from '../context/StatusContext';
import CreateStatus from './CreateStatus';


function Home() {

  const { currentUser } = useAuth();
  const { statuses, fetchStatuses } = useStatus(); // 使用 StatusContext 的 fetchStatuses


  useEffect(() => {
    fetchStatuses();}, [fetchStatuses]);

  const handleDelete = async (statusId) => {
    if (window.confirm("Are you sure you want to delete this status?")) {
      try {
        const response = await fetch(`http://localhost:5000/api/status/${statusId}`, {
          method: 'DELETE',
          headers: {
            // 如果您使用身份验证，请确保包含必要的认证信息
          }
        });
        if (response.ok) {
          fetchStatuses(); // 重新获取状态以更新列表
        } else {
          console.error('Failed to delete status');
        }
      } catch (error) {
        console.error('Error deleting status:', error);
      }
    }
  };

  return (
    <div>
      <h1>Home Page</h1>
      {currentUser && <CreateStatus />}
      <h2>Status Updates</h2>

      {/* {statuses.map(status => (
        <div key={status._id}>
          <p>{status.content}</p>
          <small>Posted by {status.username} on {new Date(status.timestamp).toLocaleString()}</small>
        </div>
      ))} */}

      {
        statuses.map(status => (
          <div key={status._id}>
            <p>{status.content}</p>
            <small>Posted by {status.username} on {new Date(status.timestamp).toLocaleString()}</small>
            {currentUser && currentUser.username === status.username && (

              <>
                <button onClick={() => handleDelete(status._id)}>Delete</button>
                <button onClick={() => handleEdit(status)}>Edit</button>
              </>
              
            )}
          </div>
        ))
      }

    </div>
  );
}

export default Home;