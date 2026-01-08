import React from 'react';
import Icon from 'components/AppIcon';

const EscalationProcedures = ({ isDarkMode }) => {
  const escalationProcedures = [
    {
      level: 1,
      title: 'Pharmacy Manager',
      description: 'First line escalation for operational issues',
      contact: 'Dr. Smith',
      timeframe: 'Immediate'
    },
    {
      level: 2,
      title: 'Chief Pharmacist',
      description: 'Clinical and regulatory escalation',
      contact: 'Dr. Johnson',
      timeframe: '15 minutes'
    },
    {
      level: 3,
      title: 'Hospital Administration',
      description: 'Administrative and policy escalation',
      contact: 'Admin Office',
      timeframe: '30 minutes'
    },
    {
      level: 4,
      title: 'Emergency Services',
      description: 'Critical patient safety escalation',
      contact: 'Emergency Line',
      timeframe: 'Immediate'
    }
  ];

  const handleEscalation = (procedure) => {
    console.log(`Escalation triggered: Level ${procedure?.level} - ${procedure?.title}`);
    // Handle escalation procedures
  };

  return (
    <div className={`rounded-md border ${
      isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-border bg-surface'
    }`}>
      <div className={`p-4 border-b ${
        isDarkMode ? 'border-gray-700' : 'border-border'
      }`}>
        <h3 className="font-semibold flex items-center space-x-2">
          <Icon name="AlertTriangle" size={18} className="text-warning" />
          <span>Escalation Procedures</span>
        </h3>
      </div>
      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {escalationProcedures?.map((procedure) => (
            <button
              key={procedure?.level}
              onClick={() => handleEscalation(procedure)}
              className={`p-4 rounded-md border transition-colors text-left ${
                isDarkMode 
                  ? 'border-gray-600 hover:border-warning hover:bg-gray-700' : 'border-border hover:border-warning hover:bg-warning/5'
              }`}
            >
              <div className="flex flex-col space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 bg-warning/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-warning">{procedure?.level}</span>
                  </div>
                  <span className="text-xs text-warning font-medium bg-warning/10 px-2 py-1 rounded">
                    {procedure?.timeframe}
                  </span>
                </div>
                
                <div className="space-y-1">
                  <div className="font-medium">{procedure?.title}</div>
                  <div className={`text-sm ${
                    isDarkMode ? 'text-gray-400' : 'text-text-secondary'
                  }`}>
                    {procedure?.description}
                  </div>
                </div>
                
                <div className="flex items-center space-x-1 mt-2">
                  <Icon name="User" size={12} className="text-text-secondary" />
                  <span className={`text-xs ${
                    isDarkMode ? 'text-gray-400' : 'text-text-secondary'
                  }`}>
                    Contact: {procedure?.contact}
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EscalationProcedures;