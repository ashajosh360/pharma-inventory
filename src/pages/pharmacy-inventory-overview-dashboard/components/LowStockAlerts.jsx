import React from 'react';
import Icon from 'components/AppIcon';

const LowStockAlerts = ({ items, onItemSelect }) => {
  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'high':
        return 'border-l-error bg-error/5';
      case 'medium':
        return 'border-l-warning bg-warning/5';
      case 'low':
        return 'border-l-secondary bg-secondary/5';
      default:
        return 'border-l-gray-300 bg-gray-50';
    }
  };

  const getUrgencyIcon = (urgency) => {
    switch (urgency) {
      case 'high':
        return 'AlertTriangle';
      case 'medium':
        return 'AlertCircle';
      case 'low':
        return 'Info';
      default:
        return 'Package';
    }
  };

  const getUrgencyText = (urgency) => {
    switch (urgency) {
      case 'high':
        return 'Critical';
      case 'medium':
        return 'Low Stock';
      case 'low':
        return 'Monitor';
      default:
        return 'Normal';
    }
  };

  const getStockPercentage = (current, min) => {
    return Math.round((current / min) * 100);
  };

  if (items.length === 0) {
    return (
      <div className="text-center py-8">
        <Icon name="CheckCircle" size={48} className="text-success mx-auto mb-4" />
        <h3 className="text-lg font-medium text-text-primary mb-2">All Good!</h3>
        <p className="text-text-secondary">No low stock alerts at the moment</p>
      </div>
    );
  }

  return (
    <div className="space-y-3 max-h-96 overflow-y-auto">
      {items.map((item) => (
        <div
          key={item.id}
          className={`border-l-4 p-4 rounded-r-md cursor-pointer hover:shadow-sm transition-smooth ${getUrgencyColor(item.urgency)}`}
          onClick={() => onItemSelect(item)}
        >
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-2">
                <Icon 
                  name={getUrgencyIcon(item.urgency)} 
                  size={16} 
                  className={`${
                    item.urgency === 'high' ? 'text-error' :
                    item.urgency === 'medium'? 'text-warning' : 'text-secondary'
                  }`}
                />
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                  item.urgency === 'high' ? 'bg-error/10 text-error' :
                  item.urgency === 'medium'? 'bg-warning/10 text-warning' : 'bg-secondary/10 text-secondary'
                }`}>
                  {getUrgencyText(item.urgency)}
                </span>
              </div>
              
              <h4 className="font-medium text-text-primary mb-1 truncate">
                {item.name}
              </h4>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-text-secondary">Current Stock:</span>
                  <span className="font-medium text-text-primary">{item.currentStock}</span>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-text-secondary">Min Required:</span>
                  <span className="font-medium text-text-primary">{item.minStock}</span>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      item.urgency === 'high' ? 'bg-error' :
                      item.urgency === 'medium'? 'bg-warning' : 'bg-secondary'
                    }`}
                    style={{
                      width: `${Math.min(getStockPercentage(item.currentStock, item.minStock), 100)}%`
                    }}
                  />
                </div>
                
                <div className="text-xs text-text-secondary">
                  Supplier: {item.supplier}
                </div>
              </div>
            </div>
            
            <div className="ml-3 flex flex-col space-y-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  console.log(`Quick reorder for ${item.id}`);
                }}
                className="p-2 rounded-md bg-primary text-white hover:bg-secondary transition-smooth"
                title="Quick Reorder"
              >
                <Icon name="ShoppingCart" size={14} />
              </button>
              
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  console.log(`Contact supplier for ${item.id}`);
                }}
                className="p-2 rounded-md border border-border hover:bg-background transition-smooth"
                title="Contact Supplier"
              >
                <Icon name="Phone" size={14} />
              </button>
            </div>
          </div>
        </div>
      ))}
      
      <div className="pt-3 border-t border-border">
        <button className="w-full flex items-center justify-center space-x-2 py-2 text-sm text-primary hover:bg-primary/5 rounded-md transition-smooth">
          <Icon name="Eye" size={16} />
          <span>View All Low Stock Items</span>
        </button>
      </div>
    </div>
  );
};

export default LowStockAlerts;