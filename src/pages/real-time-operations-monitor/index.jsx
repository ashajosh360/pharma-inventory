import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from 'components/AppIcon';
import SystemStatusBar from './components/SystemStatusBar';
import MetricCard from './components/MetricCard';
import RecentActivity from './components/RecentActivity';
import ActionPanel from './components/ActionPanel';
import EmergencyContacts from './components/EmergencyContacts';
import EscalationProcedures from './components/EscalationProcedures';

const RealTimeOperationsMonitor = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [connectionStatus, setConnectionStatus] = useState('connected');

  // Real-time metrics data
  const [metrics, setMetrics] = useState({
    currentStock: { value: 2847, change: +12, status: 'normal' },
    activeTransactions: { value: 23, change: +3, status: 'active' },
    pendingOrders: { value: 8, change: -2, status: 'pending' },
    systemAlerts: { value: 4, change: +1, status: 'warning' },
    staffActions: { value: 156, change: +8, status: 'normal' },
    supplierDeliveries: { value: 3, change: 0, status: 'normal' },
    expiredItems: { value: 12, change: +2, status: 'critical' },
    criticalShortages: { value: 5, change: -1, status: 'critical' }
  });

  // Navigation items for quick access
  const navigationItems = [
    {
      title: 'Inventory Overview',
      path: '/pharmacy-inventory-overview-dashboard',
      icon: 'Package',
      description: 'Complete inventory dashboard'
    },
    {
      title: 'Expiry Management',
      path: '/expiry-management-compliance-dashboard',
      icon: 'Calendar',
      description: 'Compliance tracking'
    },
    {
      title: 'Supply Chain Analytics',
      path: '/supply-chain-analytics-dashboard',
      icon: 'TrendingUp',
      description: 'Strategic insights'
    }
  ];

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdate(new Date());
      
      // Simulate metric updates
      setMetrics(prev => ({
        ...prev,
        activeTransactions: {
          ...prev?.activeTransactions,
          value: prev?.activeTransactions?.value + Math.floor(Math.random() * 3) - 1
        },
        staffActions: {
          ...prev?.staffActions,
          value: prev?.staffActions?.value + Math.floor(Math.random() * 2)
        }
      }));

      // Simulate connection status changes
      if (Math.random() < 0.05) {
        setConnectionStatus(prev => prev === 'connected' ? 'reconnecting' : 'connected');
      }
    }, 30000); // 30-second intervals

    return () => clearInterval(interval);
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleAudio = () => {
    setIsAudioEnabled(!isAudioEnabled);
  };

  const handleEmergencyReorder = () => {
    console.log('Emergency reorder initiated');
    // Emergency reorder logic
  };

  const handleAlertAcknowledge = (alertId) => {
    console.log(`Alert ${alertId} acknowledged`);
    // Alert acknowledgment logic
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode ? 'bg-gray-900 text-white' : 'bg-background text-text-primary'
    }`}>
      {/* System Status Bar - Full Width */}
      <SystemStatusBar 
        isDarkMode={isDarkMode}
        isAudioEnabled={isAudioEnabled}
        lastUpdate={lastUpdate}
        connectionStatus={connectionStatus}
        onToggleDarkMode={toggleDarkMode}
        onToggleAudio={toggleAudio}
      />
      {/* Emergency Alert Banner */}
      <div className="px-lg py-sm border-b border-border">
        <div className="bg-error/10 border border-error rounded-md p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Icon name="AlertTriangle" size={24} className="text-error" />
              <div>
                <h3 className="font-semibold text-error">Critical Stock Alert</h3>
                <p className="text-sm text-error/80">5 medications below safety threshold - Immediate action required</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={handleEmergencyReorder}
                className="px-4 py-2 bg-error text-white rounded-md hover:bg-error/90 transition-colors"
              >
                Emergency Reorder
              </button>
              <button
                onClick={() => handleAlertAcknowledge('critical-stock')}
                className="p-2 text-error hover:bg-error/10 rounded-md transition-colors"
              >
                <Icon name="Check" size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="px-lg py-lg">
        {/* Quick Navigation */}
        <div className="mb-lg">
          <h2 className="text-lg font-semibold mb-4">Quick Navigation</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {navigationItems?.map((item, index) => (
              <Link
                key={index}
                to={item?.path}
                className={`p-4 rounded-md border transition-colors ${
                  isDarkMode 
                    ? 'border-gray-700 hover:border-primary bg-gray-800 hover:bg-gray-700' : 'border-border hover:border-primary bg-surface hover:bg-primary/5'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon name={item?.icon} size={20} className="text-primary" />
                  <div>
                    <h3 className="font-medium">{item?.title}</h3>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-text-secondary'}`}>
                      {item?.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Real-time Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-8 gap-4 mb-lg">
          <MetricCard
            title="Current Stock"
            value={metrics?.currentStock?.value}
            change={metrics?.currentStock?.change}
            status={metrics?.currentStock?.status}
            icon="Package"
            isDarkMode={isDarkMode}
          />
          <MetricCard
            title="Active Transactions"
            value={metrics?.activeTransactions?.value}
            change={metrics?.activeTransactions?.change}
            status={metrics?.activeTransactions?.status}
            icon="Activity"
            isDarkMode={isDarkMode}
          />
          <MetricCard
            title="Pending Orders"
            value={metrics?.pendingOrders?.value}
            change={metrics?.pendingOrders?.change}
            status={metrics?.pendingOrders?.status}
            icon="Clock"
            isDarkMode={isDarkMode}
          />
          <MetricCard
            title="System Alerts"
            value={metrics?.systemAlerts?.value}
            change={metrics?.systemAlerts?.change}
            status={metrics?.systemAlerts?.status}
            icon="AlertCircle"
            isDarkMode={isDarkMode}
          />
          <MetricCard
            title="Staff Actions"
            value={metrics?.staffActions?.value}
            change={metrics?.staffActions?.change}
            status={metrics?.staffActions?.status}
            icon="Users"
            isDarkMode={isDarkMode}
          />
          <MetricCard
            title="Supplier Deliveries"
            value={metrics?.supplierDeliveries?.value}
            change={metrics?.supplierDeliveries?.change}
            status={metrics?.supplierDeliveries?.status}
            icon="Truck"
            isDarkMode={isDarkMode}
          />
          <MetricCard
            title="Expired Items"
            value={metrics?.expiredItems?.value}
            change={metrics?.expiredItems?.change}
            status={metrics?.expiredItems?.status}
            icon="Calendar"
            isDarkMode={isDarkMode}
          />
          <MetricCard
            title="Critical Shortages"
            value={metrics?.criticalShortages?.value}
            change={metrics?.criticalShortages?.change}
            status={metrics?.criticalShortages?.status}
            icon="AlertTriangle"
            isDarkMode={isDarkMode}
          />
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-lg mb-lg">
          {/* Activity Feed - 3 columns on xl screens */}
          <div className="xl:col-span-3">
            <RecentActivity isDarkMode={isDarkMode} />
          </div>

          {/* Action Panel - 1 column on xl screens */}
          <div className="xl:col-span-1">
            <ActionPanel isDarkMode={isDarkMode} />
          </div>
        </div>

        {/* Emergency Contacts and Escalation Procedures - Below Activity Feed */}
        <div className="space-y-lg">
          {/* Emergency Contacts Section */}
          <EmergencyContacts isDarkMode={isDarkMode} />

          {/* Escalation Procedures Section */}
          <EscalationProcedures isDarkMode={isDarkMode} />
        </div>
      </div>
    </div>
  );
};

export default RealTimeOperationsMonitor;