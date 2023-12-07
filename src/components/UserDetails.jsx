// UserDetails.jsx



import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function UserDetails() {
  const { username } = useParams();
  const [userDetails, setUserDetails] = useState(null);
  const [userStatuses, setUserStatuses] = useState([]);

  useEffect(() => {
    // 合并了获取用户详细信息和状态的调用
    const fetchDetailsAndStatuses = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/user/user/${username}`);
        if (response.ok) {
          const data = await response.json();
          setUserDetails(data.userDetails);
          setUserStatuses(data.statuses);
        } else {
          console.error('Failed to fetch user details and statuses');
        }
      } catch (error) {
        console.error('Error fetching user details and statuses:', error);
      }
    };

    fetchDetailsAndStatuses();
  }, [username]);

  return (
    <div>
      {userDetails ? (
        <>
          <h1 style={{ fontSize: '2em' }}>{userDetails.username}</h1>
          <p>Joined: {new Date(userDetails.joinedDate).toLocaleString()}</p>
          <p>{userDetails.description}</p>
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

// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { useStatus } from '../context/StatusContext';

// function UserDetails() {
//   const { username } = useParams();
//   const { fetchUserStatuses } = useStatus();
//   const [userDetails, setUserDetails] = useState(null);
//   const [userStatuses, setUserStatuses] = useState([]);

//   useEffect(() => {
//     fetchUserDetails(username);
//     fetchStatusesForUser(username);
//   }, [username, fetchUserStatuses]);

//   // 获取用户详细信息的函数
//   const fetchUserDetails = async (username) => {
//     try {
//       const response = await fetch(`http://localhost:5000/api/user/details/${username}`);
//       if (response.ok) {
//         const data = await response.json();
//         setUserDetails(data);
//       } else {
//         console.error('Failed to fetch user details');
//       }
//     } catch (error) {
//       console.error('Error fetching user details:', error);
//     }
//   };

//   // 获取特定用户状态的函数
//   const fetchStatusesForUser = async (username) => {
//     const statuses = await fetchUserStatuses(username);
//     setUserStatuses(statuses);
//   };

//   return (
//     <div>
//       <h1 style={{ fontSize: '2em' }}>{userDetails?.username}</h1>
//       <p>Joined: {userDetails?.joinedDate && new Date(userDetails.joinedDate).toLocaleString()}</p>
//       <p>{userDetails?.description}</p>
//       {userStatuses.map(status => (
//         <div key={status._id}>
//           <p>{status.content}</p>
//           <small>Posted on: {new Date(status.timestamp).toLocaleString()}</small>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default UserDetails;