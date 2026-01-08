import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const EmergencyContacts = ({ isDarkMode }) => {
  const [selectedContact, setSelectedContact] = useState(null);

  const emergencyContacts = [
    {
      id: 1,
      name: 'Dr. Johnson',
      role: 'Chief Pharmacist',
      phone: '(555) 123-4567',
      email: 'johnson@pharmacy.com',
      available: true
    },
    {
      id: 2,
      name: 'Poison Control',
      role: 'Emergency Line',
      phone: '1-888-222-1222',
      email: 'emergency@poisoncontrol.org',
      available: true
    },
    {
      id: 3,
      name: 'Hospital Security',
      role: 'Security Desk',
      phone: '(555) 987-6543',
      email: 'security@hospital.com',
      available: true
    },
    {
      id: 4,
      name: 'IT Support',
      role: 'Technical Support',
      phone: '(555) 456-7890',
      email: 'support@pharmacy.com',
      available: false
    }
  ];

  const handleEmergencyCall = (contact) => {
    setSelectedContact(contact);
    console.log(`Calling ${contact?.name} at ${contact?.phone}`);
    // In a real app, this would trigger a phone call
  };

  return (
    <div className={`rounded-md border ${
      isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-border bg-surface'
    }`}>
      <div className={`p-4 border-b ${
        isDarkMode ? 'border-gray-700' : 'border-border'
      }`}>
        <h3 className="font-semibold flex items-center space-x-2">
          <Icon name="Phone" size={18} className="text-primary" />
          <span>Emergency Contacts</span>
        </h3>
      </div>
      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {emergencyContacts?.map((contact) => (
            <button
              key={contact?.id}
              onClick={() => handleEmergencyCall(contact)}
              className={`p-4 rounded-md border transition-colors text-left ${
                contact?.available
                  ? isDarkMode 
                    ? 'border-gray-600 hover:border-primary hover:bg-gray-700' : 'border-border hover:border-primary hover:bg-primary/5'
                  : isDarkMode
                    ? 'border-gray-600 opacity-50 cursor-not-allowed' : 'border-border opacity-50 cursor-not-allowed'
              }`}
              disabled={!contact?.available}
            >
              <div className="flex flex-col space-y-2">
                <div className="flex items-center justify-between">
                  <div className="font-medium">{contact?.name}</div>
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${
                      contact?.available ? 'bg-success' : 'bg-error'
                    }`}></div>
                    <Icon name="Phone" size={16} className="text-primary" />
                  </div>
                </div>
                <div className={`text-sm ${
                  isDarkMode ? 'text-gray-400' : 'text-text-secondary'
                }`}>
                  {contact?.role}
                </div>
                <div className={`text-xs font-data ${
                  isDarkMode ? 'text-gray-400' : 'text-text-secondary'
                }`}>
                  {contact?.phone}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmergencyContacts;