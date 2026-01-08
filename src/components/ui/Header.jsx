import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedTimeRange, setSelectedTimeRange] = useState('7d');
  const [connectionStatus, setConnectionStatus] = useState('connected');
  const [isTimeRangeOpen, setIsTimeRangeOpen] = useState(false);

  const navigationItems = [
    {
      label: 'Live Operations',
      path: '/real-time-operations-dashboard',
      icon: 'Activity',
      tooltip: 'Real-time monitoring and system health'
    },
    {
      label: 'Executive Overview',
      path: '/executive-engagement-overview-dashboard',
      icon: 'TrendingUp',
      tooltip: 'Strategic engagement metrics and KPIs'
    },
    {
      label: 'Customer Success',
      path: '/customer-success-monitoring-dashboard',
      icon: 'Users',
      tooltip: 'At-risk user identification and intervention'
    },
    {
      label: 'Product Analytics',
      path: '/product-analytics-deep-dive-dashboard',
      icon: 'BarChart3',
      tooltip: 'Deep behavioral analysis and feature adoption'
    }
  ];

  const timeRangeOptions = [
    { value: '1h', label: 'Last Hour' },
    { value: '24h', label: 'Last 24 Hours' },
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' },
    { value: '90d', label: 'Last 90 Days' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const handleTabClick = (path) => {
    navigate(path);
  };

  const handleTimeRangeChange = (value) => {
    setSelectedTimeRange(value);
    setIsTimeRangeOpen(false);
  };

  // Simulate connection status monitoring
  useEffect(() => {
    const interval = setInterval(() => {
      const statuses = ['connected', 'connecting', 'disconnected'];
      const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
      setConnectionStatus(randomStatus);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const getConnectionStatusColor = () => {
    switch (connectionStatus) {
      case 'connected':
        return 'text-success';
      case 'connecting':
        return 'text-warning';
      case 'disconnected':
        return 'text-error';
      default:
        return 'text-secondary';
    }
  };

  const getConnectionStatusIcon = () => {
    switch (connectionStatus) {
      case 'connected':
        return 'Wifi';
      case 'connecting':
        return 'WifiOff';
      case 'disconnected':
        return 'WifiOff';
      default:
        return 'Wifi';
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface border-b border-border h-20">
      <div className="flex items-center justify-between h-full px-4">
        {/* Logo and Navigation */}
        <div className="flex items-center space-x-8">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="BarChart3" size={20} color="white" />
            </div>
            <span className="text-xl font-heading font-semibold text-text-primary">
              Analytics Hub
            </span>
          </div>

          {/* Navigation Tabs */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <button
                  key={item.path}
                  onClick={() => handleTabClick(item.path)}
                  className={`
                    flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium
                    transition-all duration-150 ease-out focus-ring micro-feedback
                    ${isActive 
                      ? 'bg-primary-50 text-primary border-2 border-primary' :'text-text-secondary hover:text-text-primary hover:bg-secondary-50 border-2 border-transparent'
                    }
                  `}
                  title={item.tooltip}
                >
                  <Icon name={item.icon} size={16} />
                  <span className="hidden lg:inline">{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Mobile Navigation Dropdown */}
          <div className="md:hidden relative">
            <select
              value={location.pathname}
              onChange={(e) => handleTabClick(e.target.value)}
              className="appearance-none bg-surface border border-border rounded-lg px-3 py-2 pr-8 text-sm font-medium focus-ring"
            >
              {navigationItems.map((item) => (
                <option key={item.path} value={item.path}>
                  {item.label}
                </option>
              ))}
            </select>
            <Icon 
              name="ChevronDown" 
              size={16} 
              className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none text-secondary"
            />
          </div>
        </div>

        {/* Global Controls */}
        <div className="flex items-center space-x-4">
          {/* Time Range Selector */}
          <div className="relative">
            <button
              onClick={() => setIsTimeRangeOpen(!isTimeRangeOpen)}
              className="flex items-center space-x-2 px-3 py-2 bg-secondary-50 border border-border rounded-lg text-sm font-medium text-text-primary hover:bg-secondary-100 transition-colors duration-150 focus-ring micro-feedback"
            >
              <Icon name="Calendar" size={16} />
              <span className="hidden sm:inline">
                {timeRangeOptions.find(option => option.value === selectedTimeRange)?.label}
              </span>
              <Icon name="ChevronDown" size={14} />
            </button>

            {isTimeRangeOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-surface border border-border rounded-lg shadow-elevation-2 context-menu z-50">
                {timeRangeOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleTimeRangeChange(option.value)}
                    className={`
                      w-full text-left px-4 py-2 text-sm hover:bg-secondary-50 transition-colors duration-150
                      ${selectedTimeRange === option.value ? 'bg-primary-50 text-primary' : 'text-text-primary'}
                      ${option === timeRangeOptions[0] ? 'rounded-t-lg' : ''}
                      ${option === timeRangeOptions[timeRangeOptions.length - 1] ? 'rounded-b-lg' : ''}
                    `}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Connection Status Indicator */}
          <div className="flex items-center space-x-2">
            <div className={`flex items-center space-x-1 ${getConnectionStatusColor()}`}>
              <Icon name={getConnectionStatusIcon()} size={16} />
              <span className="hidden lg:inline text-xs font-medium capitalize">
                {connectionStatus}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Click outside handler for time range dropdown */}
      {isTimeRangeOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsTimeRangeOpen(false)}
        />
      )}
    </header>
  );
};

export default Header;