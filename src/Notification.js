// Notification.js
import React, { useEffect } from 'react';
import './Notification.css';
import { Visibility } from '@mui/icons-material';

const Notification = ({ message, type, onClose }) => {
  useEffect(() => {
    // Automatically close the notification after a few seconds
    if (message) {
      const timer = setTimeout(() => {
        onClose();
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  return (
    <div className={`notification ${type} ${message ? {} : ''}`}>
      {message}
    </div>
  );
};

export default Notification;
