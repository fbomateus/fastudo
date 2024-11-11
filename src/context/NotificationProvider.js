import React, { createContext, useState, useContext, useCallback } from 'react';
import Notification from '../components/Notification';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState({ message: '', visible: false });

  const showNotification = useCallback((message) => {
    setNotification({ message, visible: true });
  }, []);

  const hideNotification = useCallback(() => {
    setNotification({ message: '', visible: false });
  }, []);

  return (
    <NotificationContext.Provider value={showNotification}>
      {children}
      <Notification message={notification.message} visible={notification.visible} onClose={hideNotification} />
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);
