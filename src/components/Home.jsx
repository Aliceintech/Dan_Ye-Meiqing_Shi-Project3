import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';


function Home() {
  // fake data
  const [posts, setPosts] = useState([
    {
      id: '1',
      username: 'Alice',
      content: 'Just started learning React, loving it so far!',
      timestamp: '2023-04-01T08:00:00.000Z'
    },
    {
      id: '2',
      username: 'Bob',
      content: 'Does anyone know a good resource for learning GraphQL?',
      timestamp: '2023-04-02T09:30:00.000Z'
    },
    {
      id: '3',
      username: 'Charlie',
      content: 'I’m looking for recommendations for tech podcasts.',
      timestamp: '2023-04-03T11:45:00.000Z'
    }
  ]);


  
  return (
    <div>
      <h1>Home Page</h1>
      {posts.map(post => (
        <div key={post.id} style={{ borderBottom: '1px solid #ccc', paddingBottom: '10px', marginBottom: '10px' }}>
          <h3>{post.username}</h3>
          <p>{post.content}</p>
          <small>Posted on: {new Date(post.timestamp).toLocaleString()}</small>
        </div>
      ))}
    </div>
  );
}

export default Home;
