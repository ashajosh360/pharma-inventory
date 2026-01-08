import React, { useState } from 'react';
import Icon from '../AppIcon';

const UserContextPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('main-pharmacy');

  const pharmacyLocations = [
    { id: 'main-pharmacy', name: 'Main Pharmacy', address: '123 Medical Center Dr' },
    { id: 'emergency-pharmacy', name: 'Emergency Pharmacy', address: '456 Hospital Ave' },
    { id: 'outpatient-pharmacy', name: 'Outpatient Pharmacy', address: '789 Clinic Blvd' }
  ];

  const emergencyContacts = [
    { name: 'Dr. Johnson', role: 'Chief Pharmacist', phone: '(555) 123-4567' },
    { name: 'Poison Control', role: 'Emergency Line', phone: '1-800-222-1222' },
    { name: 'Hospital Security', role: 'Security Desk', phone: '(555) 987-6543' }
  ];

  const currentLocation = pharmacyLocations.find(loc => loc.id === selectedLocation);
  const currentUser = {
    name: 'Dr. Smith',
    role: 'Pharmacy Manager',
    shift: 'Day Shift (7AM - 7PM)',
    lastLogin: new Date().toLocaleString()
  };

  const togglePanel = () => {
    setIsOpen(!isOpen);
  };

  const handleLocationChange = (locationId) => {
    setSelectedLocation(locationId);
    console.log(`Switched to location: ${locationId}`);
  };

  const handleEmergencyCall = (contact) => {
    console.log(`Calling ${contact.name} at ${contact.phone}`);
    // In a real app, this would trigger a phone call or emergency protocol
  };

  return (
    <div className="relative">
      {/* Trigger Button */}
      <button
        onClick={togglePanel}
        className="flex items-center space-x-2 px-3 py-2 rounded-md border border-border hover:bg-background transition-smooth"
      >
        <div className="flex items-center space-x-2">
          <Icon name="MapPin" size={16} className="text-primary" />
          <span className="text-sm font-medium text-text-primary">
            {currentLocation?.name}
          </span>
        </div>
        <Icon name="ChevronDown" size={16} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Panel Overlay */}
      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-dropdown" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full right-0 mt-2 w-80 bg-surface border border-border rounded-md shadow-modal z-dropdown">
            {/* User Info Section */}
            <div className="p-4 border-b border-border">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Icon name="User" size={24} className="text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-text-primary">{currentUser.name}</h3>
                  <p className="text-sm text-text-secondary">{currentUser.role}</p>
                  <p className="text-xs text-text-secondary">{currentUser.shift}</p>
                </div>
                <button className="p-2 rounded-md hover:bg-background transition-smooth">
                  <Icon name="Settings" size={16} className="text-text-secondary" />
                </button>
              </div>
            </div>

            {/* Location Selector */}
            <div className="p-4 border-b border-border">
              <h4 className="font-medium text-text-primary mb-3 flex items-center space-x-2">
                <Icon name="MapPin" size={16} />
                <span>Pharmacy Location</span>
              </h4>
              <div className="space-y-2">
                {pharmacyLocations.map((location) => (
                  <button
                    key={location.id}
                    onClick={() => handleLocationChange(location.id)}
                    className={`w-full text-left p-3 rounded-md border transition-smooth ${
                      selectedLocation === location.id
                        ? 'border-primary bg-primary/5 text-primary' :'border-border hover:border-primary/50 hover:bg-primary/5'
                    }`}
                  >
                    <div className="font-medium">{location.name}</div>
                    <div className="text-xs text-text-secondary">{location.address}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Emergency Contacts */}
            <div className="p-4 border-b border-border">
              <h4 className="font-medium text-text-primary mb-3 flex items-center space-x-2">
                <Icon name="Phone" size={16} />
                <span>Emergency Contacts</span>
              </h4>
              <div className="space-y-2">
                {emergencyContacts.map((contact, index) => (
                  <button
                    key={index}
                    onClick={() => handleEmergencyCall(contact)}
                    className="w-full text-left p-2 rounded-md hover:bg-background transition-smooth group"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-sm">{contact.name}</div>
                        <div className="text-xs text-text-secondary">{contact.role}</div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-data">{contact.phone}</span>
                        <Icon name="Phone" size={14} className="text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* System Status */}
            <div className="p-4 border-b border-border">
              <h4 className="font-medium text-text-primary mb-3 flex items-center space-x-2">
                <Icon name="Activity" size={16} />
                <span>System Status</span>
              </h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-secondary">Connection</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                    <span className="text-sm text-success">Online</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-secondary">Last Sync</span>
                  <span className="text-sm text-text-secondary">2 min ago</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-secondary">Auto-refresh</span>
                  <button className="text-sm text-primary hover:underline">
                    Enabled
                  </button>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="p-4">
              <div className="space-y-2">
                <button className="w-full flex items-center space-x-2 px-3 py-2 text-left text-text-primary hover:bg-background rounded-md transition-smooth">
                  <Icon name="RefreshCw" size={16} />
                  <span>Refresh Data</span>
                </button>
                <button className="w-full flex items-center space-x-2 px-3 py-2 text-left text-text-primary hover:bg-background rounded-md transition-smooth">
                  <Icon name="Download" size={16} />
                  <span>Export Report</span>
                </button>
                <hr className="my-2 border-border" />
                <button className="w-full flex items-center space-x-2 px-3 py-2 text-left text-error hover:bg-error/5 rounded-md transition-smooth">
                  <Icon name="LogOut" size={16} />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UserContextPanel;