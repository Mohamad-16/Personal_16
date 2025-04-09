import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface NotificationProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  isVisible: boolean;
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ message, type = 'info', isVisible, onClose }) => {
  const getTypeStyles = () => {
    switch (type) {
      case 'success':
        return 'bg-secondary text-text border-secondary-dark';
      case 'error':
        return 'bg-red-500 text-white border-red-600';
      default:
        return 'bg-primary text-text border-primary-dark';
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -2 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -2 }}
          className={`fixed top-20 right-4 p-4 rounded-lg border-2 ${getTypeStyles()} shadow-lg max-w-md`}
        >
          <div className="flex items-center justify-between">
            <p className="text-sm">{message}</p>
            <button
              onClick={onClose}
              className="ml-4 text-text-dark hover:text-text-light transition-colors"
            >
              ✕
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Notification;
