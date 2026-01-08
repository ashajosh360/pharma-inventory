import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';

const AlertBanner = () => {
  const [alerts, setAlerts] = useState([]);
  const [dismissedAlerts, setDismissedAlerts] = useState(new Set());

  // Simulate real-time alerts
  useEffect(() => {
    const mockAlerts = [
      {
        id: 'alert-1',
        type: 'error',
        title: 'Critical Stock Alert',
        message: 'Insulin supplies below safety threshold (2 units remaining)',
        timestamp: new Date(),
        priority: 'high',
        action: 'Order Now'
      },
      {
        id: 'alert-2',
        type: 'warning',
        title: 'Expiry Warning',
        message: '15 medications expiring within 7 days',
        timestamp: new Date(),
        priority: 'medium',
        action: 'Review Items'
      },
      {
        id: 'alert-3',
        type: 'success',
        title: 'Delivery Confirmed',
        message: 'Antibiotics shipment received and verified',
        timestamp: new Date(),
        priority: 'low',
        action: 'View Details'
      }
    ];

    setAlerts(mockAlerts);
  }, []);

  const getAlertIcon = (type) => {
    switch (type) {
      case 'error':
        return 'AlertTriangle';
      case 'warning':
        return 'AlertCircle';
      case 'success':
        return 'CheckCircle';
      default:
        return 'Info';
    }
  };

  const getAlertStyles = (type) => {
    switch (type) {
      case 'error':
        return 'bg-error/10 border-error text-error';
      case 'warning':
        return 'bg-warning/10 border-warning text-warning';
      case 'success':
        return 'bg-success/10 border-success text-success';
      default:
        return 'bg-primary/10 border-primary text-primary';
    }
  };

  const dismissAlert = (alertId) => {
    setDismissedAlerts(prev => new Set([...prev, alertId]));
  };

  const handleAlertAction = (alert) => {
    console.log(`Action triggered for alert: ${alert.id}`);
    // Handle specific alert actions here
  };

  const visibleAlerts = alerts.filter(alert => !dismissedAlerts.has(alert.id));

  if (visibleAlerts.length === 0) {
    return null;
  }

  return (
    <div className="sticky top-16 z-alert bg-surface border-b border-border">
      <div className="px-lg py-sm">
        <div className="space-y-2">
          {visibleAlerts.map((alert) => (
            <div
              key={alert.id}
              className={`flex items-center justify-between p-4 rounded-md border transition-smooth ${getAlertStyles(alert.type)}`}
            >
              <div className="flex items-center space-x-3 flex-1">
                <Icon name={getAlertIcon(alert.type)} size={20} strokeWidth={2} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-medium text-sm">{alert.title}</h4>
                    {alert.priority === 'high' && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-error text-white">
                        URGENT
                      </span>
                    )}
                  </div>
                  <p className="text-sm opacity-90 mt-1">{alert.message}</p>
                  <div className="flex items-center space-x-4 mt-2">
                    <span className="text-xs opacity-75">
                      {alert.timestamp.toLocaleTimeString()}
                    </span>
                    {alert.action && (
                      <button
                        onClick={() => handleAlertAction(alert)}
                        className="text-xs font-medium underline hover:no-underline transition-smooth"
                      >
                        {alert.action}
                      </button>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 ml-4">
                {alert.priority === 'high' && (
                  <button className="p-1 rounded-md hover:bg-current hover:bg-opacity-10 transition-smooth">
                    <Icon name="Phone" size={16} strokeWidth={2} />
                  </button>
                )}
                <button
                  onClick={() => dismissAlert(alert.id)}
                  className="p-1 rounded-md hover:bg-current hover:bg-opacity-10 transition-smooth"
                >
                  <Icon name="X" size={16} strokeWidth={2} />
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {visibleAlerts.length > 1 && (
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-current border-opacity-20">
            <span className="text-xs opacity-75">
              {visibleAlerts.length} active alerts
            </span>
            <button
              onClick={() => setDismissedAlerts(new Set(alerts.map(a => a.id)))}
              className="text-xs font-medium underline hover:no-underline transition-smooth"
            >
              Dismiss All
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AlertBanner;