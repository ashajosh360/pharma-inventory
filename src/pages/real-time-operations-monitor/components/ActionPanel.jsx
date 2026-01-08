import React from 'react';
import Icon from 'components/AppIcon';

const ActionPanel = ({ isDarkMode }) => {
  const quickActions = [
    {
      id: 'emergency-reorder',
      title: 'Emergency Reorder',
      description: 'Initiate critical stock reorder',
      icon: 'ShoppingCart',
      color: 'error',
      urgent: true
    },
    {
      id: 'broadcast-alert',
      title: 'Broadcast Alert',
      description: 'Send alert to all staff',
      icon: 'Megaphone',
      color: 'warning',
      urgent: false
    },
    {
      id: 'system-override',
      title: 'System Override',
      description: 'Override system restrictions',
      icon: 'Shield',
      color: 'primary',
      urgent: false
    },
    {
      id: 'backup-protocol',
      title: 'Backup Protocol',
      description: 'Activate backup procedures',
      icon: 'Database',
      color: 'secondary',
      urgent: false
    }
  ];

  const handleQuickAction = (actionId) => {
    console.log(`Quick action triggered: ${actionId}`);
    // Handle specific quick actions
  };

  const getActionColor = (color) => {
    switch (color) {
      case 'error':
        return 'bg-error text-white hover:bg-error/90';
      case 'warning':
        return 'bg-warning text-white hover:bg-warning/90';
      case 'primary':
        return 'bg-primary text-white hover:bg-primary/90';
      case 'secondary':
        return 'bg-secondary text-white hover:bg-secondary/90';
      default:
        return 'bg-primary text-white hover:bg-primary/90';
    }
  };

  return (
    <div className="space-y-lg">
      {/* Quick Actions */}
      <div className={`rounded-md border ${
        isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-border bg-surface'
      }`}>
        <div className={`p-4 border-b ${
          isDarkMode ? 'border-gray-700' : 'border-border'
        }`}>
          <h3 className="font-semibold flex items-center space-x-2">
            <Icon name="Zap" size={18} className="text-primary" />
            <span>Quick Actions</span>
          </h3>
        </div>
        
        <div className="p-4 space-y-3">
          {quickActions?.map((action) => (
            <button
              key={action?.id}
              onClick={() => handleQuickAction(action?.id)}
              className={`w-full p-3 rounded-md transition-colors ${getActionColor(action?.color)} ${
                action?.urgent ? 'animate-pulse' : ''
              }`}
            >
              <div className="flex items-center space-x-3">
                <Icon name={action?.icon} size={20} />
                <div className="text-left flex-1">
                  <div className="font-medium">{action?.title}</div>
                  <div className="text-sm opacity-90">{action?.description}</div>
                </div>
                {action?.urgent && (
                  <div className="bg-white/20 px-2 py-1 rounded text-xs font-medium">
                    URGENT
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
      {/* System Status */}
      <div className={`rounded-md border ${
        isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-border bg-surface'
      }`}>
        <div className={`p-4 border-b ${
          isDarkMode ? 'border-gray-700' : 'border-border'
        }`}>
          <h3 className="font-semibold flex items-center space-x-2">
            <Icon name="Activity" size={18} className="text-success" />
            <span>System Health</span>
          </h3>
        </div>
        
        <div className="p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm">Database Connection</span>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <span className="text-sm text-success">Online</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm">API Services</span>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <span className="text-sm text-success">Operational</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm">Backup Systems</span>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-warning rounded-full"></div>
              <span className="text-sm text-warning">Standby</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm">Last Backup</span>
            <span className="text-sm text-text-secondary">2 hours ago</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActionPanel;