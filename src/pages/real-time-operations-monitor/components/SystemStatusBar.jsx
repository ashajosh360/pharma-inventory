import React from 'react';
import Icon from 'components/AppIcon';

const SystemStatusBar = ({ 
  isDarkMode, 
  isAudioEnabled, 
  lastUpdate, 
  connectionStatus, 
  onToggleDarkMode, 
  onToggleAudio 
}) => {
  const currentShift = {
    name: 'Day Shift',
    time: '7:00 AM - 7:00 PM',
    staff: 'Dr. Smith, Nurse Johnson, Tech Williams'
  };

  const getConnectionStatusColor = () => {
    switch (connectionStatus) {
      case 'connected':
        return 'text-success';
      case 'reconnecting':
        return 'text-warning';
      case 'disconnected':
        return 'text-error';
      default:
        return 'text-text-secondary';
    }
  };

  const getConnectionStatusIcon = () => {
    switch (connectionStatus) {
      case 'connected':
        return 'Wifi';
      case 'reconnecting':
        return 'WifiOff';
      case 'disconnected':
        return 'WifiOff';
      default:
        return 'Wifi';
    }
  };

  return (
    <div className={`border-b transition-colors ${
      isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-border bg-surface'
    }`}>
      <div className="px-lg py-md">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          {/* Left Section - System Status */}
          <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-6">
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${
                connectionStatus === 'connected' ? 'bg-success' : 
                connectionStatus === 'reconnecting' ? 'bg-warning' : 'bg-error'
              }`}></div>
              <span className="font-medium">System Status</span>
              <Icon 
                name={getConnectionStatusIcon()} 
                size={16} 
                className={getConnectionStatusColor()} 
              />
              <span className={`text-sm capitalize ${getConnectionStatusColor()}`}>
                {connectionStatus}
              </span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Icon name="Clock" size={16} className="text-text-secondary" />
              <span className="text-sm">Last Update:</span>
              <span className="text-sm font-data">
                {lastUpdate.toLocaleTimeString()}
              </span>
            </div>
          </div>

          {/* Center Section - Shift Information */}
          <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
            <div className="flex items-center space-x-2">
              <Icon name="Users" size={16} className="text-primary" />
              <span className="font-medium">{currentShift.name}</span>
              <span className="text-sm text-text-secondary">({currentShift.time})</span>
            </div>
            <div className="text-sm text-text-secondary hidden lg:block">
              Staff: {currentShift.staff}
            </div>
          </div>

          {/* Right Section - Controls */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm">Auto-refresh:</span>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                <span className="text-sm text-success">30s</span>
              </div>
            </div>

            <button
              onClick={onToggleAudio}
              className={`p-2 rounded-md transition-colors ${
                isDarkMode 
                  ? 'hover:bg-gray-700' :'hover:bg-background'
              } ${isAudioEnabled ? 'text-primary' : 'text-text-secondary'}`}
              title={`${isAudioEnabled ? 'Disable' : 'Enable'} audio alerts`}
            >
              <Icon name={isAudioEnabled ? "Volume2" : "VolumeX"} size={18} />
            </button>

            <button
              onClick={onToggleDarkMode}
              className={`p-2 rounded-md transition-colors ${
                isDarkMode 
                  ? 'hover:bg-gray-700 text-yellow-400' :'hover:bg-background text-text-secondary'
              }`}
              title={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
            >
              <Icon name={isDarkMode ? "Sun" : "Moon"} size={18} />
            </button>

            <button
              className={`p-2 rounded-md transition-colors ${
                isDarkMode 
                  ? 'hover:bg-gray-700 text-text-secondary' :'hover:bg-background text-text-secondary'
              }`}
              title="Refresh data"
            >
              <Icon name="RefreshCw" size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemStatusBar;