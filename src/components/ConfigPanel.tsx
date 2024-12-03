import React from 'react';
import { Settings, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PortfolioConfig } from '../types/config';

interface ConfigPanelProps {
  config: PortfolioConfig;
  setConfig: (config: PortfolioConfig) => void;
  showConfig: boolean;
  setShowConfig: (show: boolean) => void;
}

export const ConfigPanel: React.FC<ConfigPanelProps> = ({
  config,
  setConfig,
  showConfig,
  setShowConfig
}) => {
  return (
    <AnimatePresence>
      {showConfig && (
        <motion.div
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 300 }}
          className="fixed top-0 right-0 h-full w-80 bg-white dark:bg-gray-800 shadow-lg p-6 overflow-y-auto z-40"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Configuration</h2>
            <button
              onClick={() => setShowConfig(false)}
              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-6">
            {/* Animation Settings */}
            <div>
              <h3 className="font-semibold mb-3">Animation</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm mb-1">Type</label>
                  <select
                    value={config.animation.type}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        animation: { ...config.animation, type: e.target.value as 'jump' | 'fade' | 'none' },
                      })
                    }
                    className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  >
                    <option value="jump">Jump</option>
                    <option value="fade">Fade</option>
                    <option value="none">None</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm mb-1">Direction</label>
                  <select
                    value={config.animation.direction}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        animation: { ...config.animation, direction: e.target.value as 'ltr' | 'rtl' | 'normal' },
                      })
                    }
                    className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  >
                    <option value="normal">Normal</option>
                    <option value="ltr">Left to Right</option>
                    <option value="rtl">Right to Left</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm mb-1">Duration (seconds)</label>
                  <input
                    type="number"
                    value={config.animation.duration}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        animation: { ...config.animation, duration: Number(e.target.value) },
                      })
                    }
                    step="0.1"
                    min="0.1"
                    max="2"
                    className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-1">Delay (seconds)</label>
                  <input
                    type="number"
                    value={config.animation.delay}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        animation: { ...config.animation, delay: Number(e.target.value) },
                      })
                    }
                    step="0.1"
                    min="0"
                    max="1"
                    className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </div>
            </div>

            {/* Style Settings */}
            <div>
              <h3 className="font-semibold mb-3">Style</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm mb-1">Border Radius</label>
                  <input
                    type="number"
                    value={config.style.borderRadius}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        style: { ...config.style, borderRadius: Number(e.target.value) },
                      })
                    }
                    min="0"
                    max="20"
                    className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>

                <div>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={config.style.boxShadow}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          style: { ...config.style, boxShadow: e.target.checked },
                        })
                      }
                      className="rounded"
                    />
                    <span className="text-sm">Enable Box Shadow</span>
                  </label>
                </div>

                <div>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={config.style.darkMode}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          style: { ...config.style, darkMode: e.target.checked },
                        })
                      }
                      className="rounded"
                    />
                    <span className="text-sm">Dark Mode</span>
                  </label>
                </div>

                <div>
                  <label className="block text-sm mb-1">Skills View</label>
                  <select
                    value={config.style.skillsView}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        style: { ...config.style, skillsView: e.target.value as 'card' | 'stats' },
                      })
                    }
                    className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  >
                    <option value="card">Card View</option>
                    <option value="stats">Stats View</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
