import React, { useState, useEffect } from 'react';
import Icon from 'components/AppIcon';

const RecentActivity = ({ isDarkMode }) => {
  const [activities, setActivities] = useState([]);
  const [filter, setFilter] = useState('all');

  // Mock real-time activity data
  const mockActivities = [
    {
      id: 1,
      type: 'inventory',
      action: 'Stock Updated',
      details: 'Paracetamol 500mg - Quantity adjusted from 150 to 175 units',
      user: 'Dr. Smith',
      timestamp: new Date(Date.now() - 2 * 60 * 1000),
      priority: 'normal',
      icon: 'Package'
    },
    {
      id: 2,
      type: 'alert',
      action: 'Critical Alert',
      details: 'Insulin Rapid - Stock level below safety threshold (2 units remaining)',
      user: 'System',
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      priority: 'critical',
      icon: 'AlertTriangle'
    },
    {
      id: 3,
      type: 'transaction',
      action: 'Prescription Filled',
      details: 'Patient ID: P-2024-0156 - Amoxicillin 250mg x30 capsules dispensed',
      user: 'Pharmacist Johnson',
      timestamp: new Date(Date.now() - 8 * 60 * 1000),
      priority: 'normal',
      icon: 'FileText'
    },
    {
      id: 4,
      type: 'delivery',
      action: 'Delivery Received',
      details: 'Supplier: MedCorp - 45 items received and verified',
      user: 'Tech Williams',
      timestamp: new Date(Date.now() - 12 * 60 * 1000),
      priority: 'normal',
      icon: 'Truck'
    },
    {
      id: 5,
      type: 'system',
      action: 'System Update',
      details: 'Inventory database synchronized with central server',
      user: 'System',
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      priority: 'normal',
      icon: 'RefreshCw'
    },
    {
      id: 6,
      type: 'alert',
      action: 'Expiry Warning',
      details: 'Aspirin 75mg - Batch #ASP-2024-03 expires in 5 days',
      user: 'System',
      timestamp: new Date(Date.now() - 18 * 60 * 1000),
      priority: 'warning',
      icon: 'Calendar'
    },
    {
      id: 7,
      type: 'order',
      action: 'Emergency Order',
      details: 'Epinephrine Auto-Injector - Emergency reorder initiated',
      user: 'Dr. Smith',
      timestamp: new Date(Date.now() - 22 * 60 * 1000),
      priority: 'critical',
      icon: 'ShoppingCart'
    },
    {
      id: 8,
      type: 'staff',
      action: 'Staff Action',
      details: 'Controlled substance audit completed - All items accounted for',
      user: 'Pharmacist Johnson',
      timestamp: new Date(Date.now() - 25 * 60 * 1000),
      priority: 'normal',
      icon: 'Shield'
    }
  ];

  useEffect(() => {
    setActivities(mockActivities);
    
    // Simulate new activities
    const interval = setInterval(() => {
      const newActivity = {
        id: Date.now(),
        type: 'system',
        action: 'Live Update',
        details: `System heartbeat - All services operational at ${new Date().toLocaleTimeString()}`,
        user: 'System',
        timestamp: new Date(),
        priority: 'normal',
        icon: 'Activity'
      };
      
      setActivities(prev => [newActivity, ...prev.slice(0, 19)]);
    }, 60000); // Add new activity every minute

    return () => clearInterval(interval);
  }, []);

  const filterTypes = [
    { value: 'all', label: 'All Activities', icon: 'List' },
    { value: 'alert', label: 'Alerts', icon: 'AlertCircle' },
    { value: 'inventory', label: 'Inventory', icon: 'Package' },
    { value: 'transaction', label: 'Transactions', icon: 'FileText' },
    { value: 'delivery', label: 'Deliveries', icon: 'Truck' }
  ];

  const filteredActivities = filter === 'all' 
    ? activities 
    : activities.filter(activity => activity.type === filter);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'critical':
        return 'text-error';
      case 'warning':
        return 'text-warning';
      case 'normal':
      default:
        return isDarkMode ? 'text-gray-300' : 'text-text-primary';
    }
  };

  const getPriorityBorder = (priority) => {
    switch (priority) {
      case 'critical':
        return 'border-l-error';
      case 'warning':
        return 'border-l-warning';
      case 'normal':
      default:
        return 'border-l-primary';
    }
  };

  const getTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = Math.floor((now - timestamp) / 1000);
    
    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return timestamp.toLocaleDateString();
  };

  return (
    <div className={`rounded-md border ${
      isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-border bg-surface'
    }`}>
      {/* Header */}
      <div className={`p-4 border-b ${
        isDarkMode ? 'border-gray-700' : 'border-border'
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
          <div className="flex items-center space-x-2">
            <Icon name="Activity" size={20} className="text-primary" />
            <h2 className="text-lg font-semibold">Real-Time Activity Feed</h2>
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm text-text-secondary">Filter:</span>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className={`px-3 py-1 rounded-md border text-sm ${
                isDarkMode 
                  ? 'border-gray-600 bg-gray-700 text-white' :'border-border bg-surface text-text-primary'
              }`}
            >
              {filterTypes.map(type => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Activity List */}
      <div className="max-h-96 overflow-y-auto">
        {filteredActivities.length === 0 ? (
          <div className="p-8 text-center">
            <Icon name="Inbox" size={48} className="text-text-secondary mx-auto mb-3" />
            <p className="text-text-secondary">No activities found for the selected filter</p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {filteredActivities.map((activity) => (
              <div
                key={activity.id}
                className={`p-4 border-l-4 transition-colors hover:bg-opacity-50 ${
                  getPriorityBorder(activity.priority)
                } ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-primary/5'}`}
              >
                <div className="flex items-start space-x-3">
                  <div className={`p-2 rounded-md ${
                    activity.priority === 'critical' ? 'bg-error/10' :
                    activity.priority === 'warning'? 'bg-warning/10' : 'bg-primary/10'
                  }`}>
                    <Icon 
                      name={activity.icon} 
                      size={16} 
                      className={getPriorityColor(activity.priority)} 
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className={`font-medium ${getPriorityColor(activity.priority)}`}>
                        {activity.action}
                      </h4>
                      <span className={`text-xs ${
                        isDarkMode ? 'text-gray-400' : 'text-text-secondary'
                      }`}>
                        {getTimeAgo(activity.timestamp)}
                      </span>
                    </div>
                    
                    <p className={`text-sm mb-2 ${
                      isDarkMode ? 'text-gray-300' : 'text-text-secondary'
                    }`}>
                      {activity.details}
                    </p>
                    
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Icon name="User" size={12} className="text-text-secondary" />
                        <span className={`text-xs ${
                          isDarkMode ? 'text-gray-400' : 'text-text-secondary'
                        }`}>
                          {activity.user}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="Clock" size={12} className="text-text-secondary" />
                        <span className={`text-xs font-data ${
                          isDarkMode ? 'text-gray-400' : 'text-text-secondary'
                        }`}>
                          {activity.timestamp.toLocaleTimeString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className={`p-3 border-t text-center ${
        isDarkMode ? 'border-gray-700' : 'border-border'
      }`}>
        <button className={`text-sm text-primary hover:underline transition-colors`}>
          View All Activities
        </button>
      </div>
    </div>
  );
};

export default RecentActivity;