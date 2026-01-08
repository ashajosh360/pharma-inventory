import React from 'react';
import Icon from 'components/AppIcon';

const KPICards = ({ data }) => {
  const kpiItems = [
    {
      title: 'Total SKUs',
      value: data.totalSKUs || 0,
      icon: 'Package',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      trend: '+2.5%',
      trendDirection: 'up'
    },
    {
      title: 'Out of Stock',
      value: data.outOfStock || 0,
      icon: 'AlertTriangle',
      color: 'text-error',
      bgColor: 'bg-error/10',
      trend: '-1.2%',
      trendDirection: 'down'
    },
    {
      title: 'Near Expiry (30d)',
      value: data.nearExpiry || 0,
      icon: 'Calendar',
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      trend: '+0.8%',
      trendDirection: 'up'
    },
    {
      title: 'Inventory Turnover',
      value: `${data.inventoryTurnover || 0}x`,
      icon: 'TrendingUp',
      color: 'text-success',
      bgColor: 'bg-success/10',
      trend: '+5.3%',
      trendDirection: 'up'
    },
    {
      title: 'Total Value',
      value: `₹${(data.totalValue || 0).toLocaleString()}`,
      icon: 'DollarSign',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      trend: '+3.1%',
      trendDirection: 'up'
    },
    {
      title: 'Pending Reorders',
      value: data.pendingReorders || 0,
      icon: 'ShoppingCart',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10',
      trend: '-2.0%',
      trendDirection: 'down'
    }
  ];

  const getTrendColor = (direction) => {
    return direction === 'up' ? 'text-success' : 'text-error';
  };

  const getTrendIcon = (direction) => {
    return direction === 'up' ? 'TrendingUp' : 'TrendingDown';
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {kpiItems.map((item, index) => (
        <div key={index} className="card p-6 hover:shadow-lg transition-smooth">
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 rounded-lg ${item.bgColor} flex items-center justify-center`}>
              <Icon name={item.icon} size={24} className={item.color} />
            </div>
            <div className={`flex items-center space-x-1 text-sm ${getTrendColor(item.trendDirection)}`}>
              <Icon name={getTrendIcon(item.trendDirection)} size={14} />
              <span>{item.trend}</span>
            </div>
          </div>
          
          <div>
            <h3 className="text-2xl font-bold text-text-primary mb-1">
              {item.value}
            </h3>
            <p className="text-sm text-text-secondary">
              {item.title}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default KPICards;