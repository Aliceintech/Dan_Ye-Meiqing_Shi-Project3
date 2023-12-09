import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

function SearchResults() {
  const [searchParams] = useSearchParams();
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      const query = searchParams.get('query');
      console.log('Sending request with query:', query); // 打印发送的请求

      try {
        const response = await fetch(`http://localhost:5000/api/user/search-users?query=${query}`);
        console.log('Received response:', response); // 打印接收到的响应

        if (response.ok) {
          const data = await response.json();
          console.log('Response data:', data); // 打印响应数据
          setUsers(data);
        }
      } catch (error) {
        console.error('Failed to fetch users:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, [searchParams]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h2>Search Results</h2>
      {users.length > 0 ? (
        <ul>
          {users.map(user => (
            <li key={user._id}>
              <a href={`/user/${user.username}`}>{user.username}</a>
            </li>
          ))}
        </ul>
      ) : (
        <p>No users found.</p>
      )}
    </div>
  );
}

export default SearchResults;
