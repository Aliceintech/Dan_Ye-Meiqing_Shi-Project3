// UserDetails.jsx

// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // 引入 useAuth 钩子

function UserDetails() {
  const { username } = useParams();
  const { currentUser } = useAuth(); // 从 AuthContext 获取当前登录用户
  const [userDetails, setUserDetails] = useState(null);
  const [userStatuses, setUserStatuses] = useState([]);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [newDescription, setNewDescription] = useState('');

  useEffect(() => {
    const fetchDetailsAndStatuses = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/user/user/${username}`);
        if (response.ok) {
          const data = await response.json();
          setUserDetails(data.userDetails);
          setUserStatuses(data.statuses);
          setNewDescription(data.userDetails.description);
        } else {
          console.error('Failed to fetch user details and statuses');
        }
      } catch (error) {
        console.error('Error fetching user details and statuses:', error);
      }
    };

    fetchDetailsAndStatuses();
  }, [username]);

  const handleDescriptionEdit = () => {
    setIsEditingDescription(true);
  };

  const handleDescriptionChange = (event) => {
    setNewDescription(event.target.value);
  };

  const handleDescriptionSave = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/user/updateDescription`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: userDetails.username, description: newDescription }),
      });
  
      if (response.ok) {
        setUserDetails({ ...userDetails, description: newDescription });
        setIsEditingDescription(false);
      } else {
        console.error('Failed to update description');
      }
    } catch (error) {
      console.error('Error updating description:', error);
    }
  };
  
  return (
    <div>
      {userDetails ? (
        <>
          <h1 style={{ fontSize: '2em' }}>{userDetails.username}</h1>
          <p>Joined: {new Date(userDetails.joinedDate).toLocaleString()}</p>
          {isEditingDescription ? (
            <>
              <textarea value={newDescription} onChange={handleDescriptionChange} />
              <button onClick={handleDescriptionSave}>Save Description</button>
            </>
          ) : (
            <>
              <p>{userDetails.description}</p>
              {/* 只有当登录用户是当前查看的用户时才显示编辑按钮 */}
              {currentUser && currentUser.username === userDetails.username && (
                <button onClick={handleDescriptionEdit}>Edit Description</button>
              )}
            </>
          )}
        </>
      ) : (
        <p>Loading user details...</p>
      )}
      <h2>Status Updates</h2>
      {userStatuses.length > 0 ? (
        userStatuses.map(status => (
          <div key={status._id}>
            <p>{status.content}</p>
            <small>Posted on: {new Date(status.timestamp).toLocaleString()}</small>
          </div>
        ))
      ) : (
        <p>No status updates to show.</p>
      )}
    </div>
  );
}

export default UserDetails;