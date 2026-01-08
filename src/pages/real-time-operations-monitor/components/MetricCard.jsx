import React from 'react';
import Icon from 'components/AppIcon';

const MetricCard = ({ title, value, change, status, icon, isDarkMode }) => {
  const getStatusColor = () => {
    switch (status) {
      case 'critical':
        return 'text-error';
      case 'warning':
        return 'text-warning';
      case 'active':
        return 'text-primary';
      case 'pending':
        return 'text-warning';
      case 'normal':
      default:
        return 'text-success';
    }
  };

  const getStatusLight = () => {
    switch (status) {
      case 'critical':
        return 'bg-error';
      case 'warning':
        return 'bg-warning';
      case 'active':
        return 'bg-primary';
      case 'pending':
        return 'bg-warning';
      case 'normal':
      default:
        return 'bg-success';
    }
  };

  const getChangeIcon = () => {
    if (change > 0) return 'TrendingUp';
    if (change < 0) return 'TrendingDown';
    return 'Minus';
  };

  const getChangeColor = () => {
    if (change > 0) return 'text-success';
    if (change < 0) return 'text-error';
    return 'text-text-secondary';
  };

  return (
    <div className={`p-4 rounded-md border transition-colors ${
      isDarkMode 
        ? 'border-gray-700 bg-gray-800' :'border-border bg-surface'
    }`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <Icon name={icon} size={18} className={getStatusColor()} />
          <div className={`w-2 h-2 rounded-full ${getStatusLight()} ${
            status === 'active' || status === 'critical' ? 'animate-pulse' : ''
          }`}></div>
        </div>
        {change !== 0 && (
          <div className={`flex items-center space-x-1 ${getChangeColor()}`}>
            <Icon name={getChangeIcon()} size={14} />
            <span className="text-xs font-medium">
              {Math.abs(change)}
            </span>
          </div>
        )}
      </div>
      
      <div className="space-y-1">
        <div className="text-2xl font-bold font-data">
          {value.toLocaleString()}
        </div>
        <div className={`text-xs font-medium ${
          isDarkMode ? 'text-gray-400' : 'text-text-secondary'
        }`}>
          {title}
        </div>
      </div>
    </div>
  );
};

export default MetricCard;