// StatusContext.jsx

// eslint-disable-next-line no-unused-vars
import React, { createContext, useContext, useState } from 'react';

const StatusContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useStatus = () => useContext(StatusContext);

// eslint-disable-next-line react/prop-types
export const StatusProvider = ({ children }) => {
  const [statuses, setStatuses] = useState([]);

  const fetchStatuses = async () => {
    try {
      const response = await fetch('/api/status');
      if (response.ok) {
        const data = await response.json();
        setStatuses(data);
      }
    } catch (error) {
      console.error('Error fetching statuses:', error);
    }
  };

  const fetchUserStatuses = async (username) => {
    try {
      const response = await fetch('/api/status/user/${username}');
      if (response.ok) {
        return await response.json();
      } else {
        console.error('Failed to fetch user statuses');
        return [];
      }
    } catch (error) {
      console.error('Error fetching user statuses:', error);
      return [];
    }
  };

  return (
    <StatusContext.Provider value={{ statuses, fetchStatuses, fetchUserStatuses }}>
      {children}
    </StatusContext.Provider>
  );
};