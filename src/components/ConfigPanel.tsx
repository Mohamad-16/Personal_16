import React from 'react';
import { Settings, X, ChevronDown } from 'lucide-react';
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
          className="fixed top-0 right-0 h-full w-80 bg-background dark:bg-background-dark shadow-lg p-6 overflow-y-auto z-40 custom-scrollbar"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-text">Configuration</h2>
            <button
              onClick={() => setShowConfig(false)}
              className="p-1 hover:bg-background-dark dark:hover:bg-background rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-text" />
            </button>
          </div>

          <div className="space-y-6">
            {/* Animation Settings */}
            <div>
              <h3 className="font-semibold mb-3 text-text">Animation</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm mb-1 text-text-light">Type</label>
                  <div className="relative">
                    <select
                      value={config.animation.type}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          animation: { ...config.animation, type: e.target.value as 'jump' | 'fade' | 'none' },
                        })
                      }
                      className="w-full p-2 pr-8 appearance-none bg-background dark:bg-background-dark border border-border rounded-md text-text focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent cursor-pointer hover:border-primary transition-colors"
                    >
                      <option value="jump">Jump</option>
                      <option value="fade">Fade</option>
                      <option value="none">None</option>
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-light pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm mb-1 text-text-light">Direction</label>
                  <div className="relative">
                    <select
                      value={config.animation.direction}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          animation: { ...config.animation, direction: e.target.value as 'ltr' | 'rtl' | 'normal' },
                        })
                      }
                      className="w-full p-2 pr-8 appearance-none bg-background dark:bg-background-dark border border-border rounded-md text-text focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent cursor-pointer hover:border-primary transition-colors"
                    >
                      <option value="normal">Normal</option>
                      <option value="ltr">Left to Right</option>
                      <option value="rtl">Right to Left</option>
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-light pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm mb-1 text-text-light">Duration (seconds)</label>
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
                    className="w-full p-2 bg-background dark:bg-background-dark border border-border rounded-md text-text focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent hover:border-primary transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-1 text-text-light">Delay (seconds)</label>
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
                    className="w-full p-2 bg-background dark:bg-background-dark border border-border rounded-md text-text focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent hover:border-primary transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Style Settings */}
            <div>
              <h3 className="font-semibold mb-3 text-text">Style</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm mb-1 text-text-light">Border Radius</label>
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
                    className="w-full p-2 bg-background dark:bg-background-dark border border-border rounded-md text-text focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent hover:border-primary transition-colors"
                  />
                </div>

                <div>
                  <label className="flex items-center space-x-2 text-text">
                    <input
                      type="checkbox"
                      checked={config.style.boxShadow}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          style: { ...config.style, boxShadow: e.target.checked },
                        })
                      }
                      className="rounded border-border text-primary focus:ring-primary cursor-pointer"
                    />
                    <span className="text-sm">Enable Box Shadow</span>
                  </label>
                </div>

                <div>
                  <label className="flex items-center space-x-2 text-text">
                    <input
                      type="checkbox"
                      checked={config.style.darkMode}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          style: { ...config.style, darkMode: e.target.checked },
                        })
                      }
                      className="rounded border-border text-primary focus:ring-primary cursor-pointer"
                    />
                    <span className="text-sm">Dark Mode</span>
                  </label>
                </div>

                <div>
                  <label className="block text-sm mb-1 text-text-light">Skills View</label>
                  <div className="relative">
                    <select
                      value={config.style.skillsView}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          style: { ...config.style, skillsView: e.target.value as 'card' | 'stats' },
                        })
                      }
                      className="w-full p-2 pr-8 appearance-none bg-background dark:bg-background-dark border border-border rounded-md text-text focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent cursor-pointer hover:border-primary transition-colors"
                    >
                      <option value="card">Card View</option>
                      <option value="stats">Stats View</option>
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-light pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
