// Home.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useStatus } from '../context/StatusContext';

import CreateStatus from './CreateStatus';
import './Home.css';


function Home() {

  const { currentUser } = useAuth();
  const { statuses, fetchStatuses } = useStatus();
  const navigate = useNavigate();

  const [editingStatus, setEditingStatus] = useState(null); // 当前正在编辑的状态
  const [editContent, setEditContent] = useState(''); // 编辑中的内容



  useEffect(() => {
    fetchStatuses();}, [fetchStatuses]);

  const handleDelete = async (statusId) => {
    if (window.confirm("Are you sure you want to delete this status?")) {
      try {
        const response = await fetch('/api/status/${statusId}', {
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

  const handleEdit = (status) => {
    setEditingStatus(status);
    setEditContent(status.content);
  };

  const submitEdit = async () => {
    try {
      const response = await fetch('/api/status/${editingStatus._id}', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: editContent })
      });

      if (response.ok) {
        setEditingStatus(null); // 关闭编辑表单
        fetchStatuses(); // 重新获取状态以更新列表
      } else {
        console.error('Failed to update status');
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const navigateToUserDetails = (username) => {
    navigate(`/user/${username}`);
  };


  return (
    <div className="container">
      <h1 className="header">Home Page</h1>
      {currentUser && <CreateStatus />}
      <h2 className="header">Status Updates</h2>
  
      <div className="content-grid">
        {statuses.map(status => (
          <div 
            key={status._id} 
            onClick={() => navigateToUserDetails(status.username)}
            className="card"
            style={{ cursor: 'pointer' }} // 可选的样式，指示可点击
          >
            <p>{status.content}</p>
            <small>Posted by {status.username} on {new Date(status.timestamp).toLocaleString()}</small>
            {currentUser && currentUser.username === status.username && (
              <div>
                <button className="button" onClick={() => handleDelete(status._id)}>Delete</button>
                <button className="button" onClick={() => handleEdit(status)}>Edit</button>
              </div>
            )}
          </div>
        ))}
      </div>
  
      {editingStatus && (
        <div className="card">
          <textarea 
            className="input-field"
            value={editContent} 
            onChange={(e) => setEditContent(e.target.value)}
          />
          <button className="button" onClick={submitEdit}>Submit Changes</button>
          <button className="button" onClick={() => setEditingStatus(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
}

export default Home;