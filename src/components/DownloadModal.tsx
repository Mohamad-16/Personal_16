import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Loader } from 'lucide-react';

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  pdfUrl: string;
}

export const DownloadModal: React.FC<DownloadModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  pdfUrl
}) => {
  const [isLoading, setIsLoading] = useState(true);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50"
          onClick={onClose}
        />
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-4xl w-full mx-4 z-50 overflow-hidden flex flex-col"
          style={{ height: '90vh' }}
        >
          <div className="p-4 border-b dark:border-gray-700 flex justify-between items-center">
            <h3 className="text-xl font-semibold dark:text-white">
              Preview CV - {decodeURIComponent(pdfUrl.split('/').pop() || '')}
            </h3>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-hidden relative bg-gray-100 dark:bg-gray-900">
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <Loader className="w-8 h-8 animate-spin text-blue-600" />
              </div>
            )}
            
            <iframe
              src={`${pdfUrl}#toolbar=0&navpanes=0`}
              className="w-full h-full"
              onLoad={() => setIsLoading(false)}
              title="CV Preview"
            />
          </div>

          <div className="p-4 border-t dark:border-gray-700 flex justify-end space-x-4">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors flex items-center space-x-2"
            >
              <Download size={20} />
              <span>Download</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
