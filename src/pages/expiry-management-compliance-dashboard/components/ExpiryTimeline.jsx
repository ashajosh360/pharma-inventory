import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import Icon from 'components/AppIcon';

const ExpiryTimeline = ({ data, dateRange }) => {
  const [selectedPeriod, setSelectedPeriod] = useState(null);

  // Generate timeline data for the next 12 months
  const generateTimelineData = () => {
    const months = [];
    const currentDate = new Date();
    
    for (let i = 0; i < 12; i++) {
      const monthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + i, 1);
      const monthName = monthDate.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
      
      // Count items expiring in this month
      const expiringItems = data.filter(item => {
        const expiryMonth = item.expiryDate.getMonth();
        const expiryYear = item.expiryDate.getFullYear();
        return expiryMonth === monthDate.getMonth() && expiryYear === monthDate.getFullYear();
      });

      // Calculate severity based on timing and value
      const criticalItems = expiringItems.filter(item => {
        const daysUntilExpiry = Math.ceil((item.expiryDate - new Date()) / (1000 * 60 * 60 * 24));
        return daysUntilExpiry <= 30 || item.urgencyLevel === 'critical';
      }).length;

      const totalValue = expiringItems.reduce((sum, item) => sum + item.totalValue, 0);

      months.push({
        month: monthName,
        items: expiringItems.length,
        criticalItems,
        totalValue,
        severity: criticalItems > 0 ? 'critical' : expiringItems.length > 5 ? 'high' : expiringItems.length > 0 ? 'medium' : 'low',
        details: expiringItems
      });
    }
    
    return months;
  };

  const timelineData = generateTimelineData();

  const getBarColor = (severity) => {
    switch (severity) {
      case 'critical': return '#DC3545';
      case 'high': return '#FFC107';
      case 'medium': return '#F18F01';
      case 'low': return '#28A745';
      default: return '#6C757D';
    }
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-surface border border-border rounded-md shadow-modal p-4 max-w-xs">
          <h4 className="font-semibold text-text-primary mb-2">{label}</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-text-secondary">Total Items:</span>
              <span className="font-medium text-text-primary">{data.items}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Critical:</span>
              <span className="font-medium text-error">{data.criticalItems}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Total Value:</span>
              <span className="font-medium text-text-primary">₹{data.totalValue.toLocaleString()}</span>
            </div>
          </div>
          {data.details.length > 0 && (
            <div className="mt-3 pt-3 border-t border-border">
              <p className="text-xs text-text-secondary mb-2">Top Items:</p>
              {data.details.slice(0, 3).map((item, index) => (
                <div key={index} className="text-xs text-text-primary">
                  {item.productName} ({item.batchNumber})
                </div>
              ))}
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-text-primary mb-1">
            Expiry Timeline Distribution
          </h3>
          <p className="text-sm text-text-secondary">
            12-month medication expiry forecast with severity indicators
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Severity Legend */}
          <div className="flex items-center space-x-3 text-xs">
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-error rounded"></div>
              <span>Critical</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-warning rounded"></div>
              <span>High</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-accent rounded"></div>
              <span>Medium</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-success rounded"></div>
              <span>Low</span>
            </div>
          </div>
          
          <button className="p-2 rounded-md border border-border hover:bg-background transition-smooth">
            <Icon name="Download" size={16} />
          </button>
        </div>
      </div>

      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={timelineData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis 
              dataKey="month" 
              stroke="#6B7280"
              fontSize={12}
              tickLine={false}
            />
            <YAxis 
              stroke="#6B7280"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="items" radius={[4, 4, 0, 0]}>
              {timelineData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getBarColor(entry.severity)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Summary Statistics */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-text-primary">
              {timelineData.reduce((sum, month) => sum + month.items, 0)}
            </div>
            <div className="text-sm text-text-secondary">Total Items Expiring</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-error">
              {timelineData.reduce((sum, month) => sum + month.criticalItems, 0)}
            </div>
            <div className="text-sm text-text-secondary">Critical Items</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-text-primary">
              ₹{timelineData.reduce((sum, month) => sum + month.totalValue, 0).toLocaleString()}
            </div>
            <div className="text-sm text-text-secondary">Total Value at Risk</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpiryTimeline;