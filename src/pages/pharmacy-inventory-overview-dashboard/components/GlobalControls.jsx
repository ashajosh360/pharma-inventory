import React from 'react';
import Icon from 'components/AppIcon';

const GlobalControls = ({ 
  selectedLocation, 
  onLocationChange, 
  autoRefresh, 
  onAutoRefreshToggle, 
  lastUpdated 
}) => {
  const pharmacyLocations = [
    { id: 'main-pharmacy', name: 'Main Pharmacy', address: '123 Medical Center Dr' },
    { id: 'emergency-pharmacy', name: 'Emergency Pharmacy', address: '456 Hospital Ave' },
    { id: 'outpatient-pharmacy', name: 'Outpatient Pharmacy', address: '789 Clinic Blvd' }
  ];

  const formatLastUpdated = (date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="mb-8">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        {/* Page Title */}
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Pharmacy Inventory Overview</h1>
          <p className="text-text-secondary mt-1">
            Real-time monitoring and analytics for pharmaceutical inventory management
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
          {/* Location Selector */}
          <div className="flex items-center space-x-2">
            <Icon name="MapPin" size={16} className="text-text-secondary" />
            <select
              value={selectedLocation}
              onChange={(e) => onLocationChange(e.target.value)}
              className="px-3 py-2 border border-border rounded-md bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              {pharmacyLocations.map((location) => (
                <option key={location.id} value={location.id}>
                  {location.name}
                </option>
              ))}
            </select>
          </div>

          {/* Auto-refresh Toggle */}
          <div className="flex items-center space-x-2">
            <button
              onClick={onAutoRefreshToggle}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md border transition-smooth ${
                autoRefresh
                  ? 'border-primary bg-primary/10 text-primary' :'border-border bg-surface text-text-secondary hover:border-primary/50'
              }`}
            >
              <Icon name={autoRefresh ? "RefreshCw" : "Pause"} size={16} />
              <span className="text-sm font-medium">
                {autoRefresh ? 'Auto-refresh ON' : 'Auto-refresh OFF'}
              </span>
            </button>
          </div>

          {/* Last Updated */}
          <div className="flex items-center space-x-2 text-sm text-text-secondary">
            <Icon name="Clock" size={14} />
            <span>Updated {formatLastUpdated(lastUpdated)}</span>
          </div>

          {/* Manual Refresh */}
          <button className="flex items-center space-x-2 px-3 py-2 border border-border rounded-md hover:bg-background transition-smooth">
            <Icon name="RefreshCw" size={16} />
            <span className="text-sm">Refresh</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default GlobalControls;