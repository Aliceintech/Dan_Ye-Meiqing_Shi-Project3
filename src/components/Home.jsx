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

  return (
    <div>
      <h1>Home Page</h1>
      {currentUser && <CreateStatus />}
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