import React from 'react';
import Icon from 'components/AppIcon';

const ComplianceMetrics = ({ metrics }) => {
  const metricCards = [
    {
      title: "Expiring in 7 Days",
      value: metrics.expiring7Days,
      icon: "AlertTriangle",
      color: "error",
      bgColor: "bg-error/10",
      textColor: "text-error",
      iconColor: "text-error"
    },
    {
      title: "Expiring in 30 Days",
      value: metrics.expiring30Days,
      icon: "Clock",
      color: "warning",
      bgColor: "bg-warning/10",
      textColor: "text-warning",
      iconColor: "text-warning"
    },
    {
      title: "Expired Items",
      value: metrics.expiredItems,
      icon: "XCircle",
      color: "error",
      bgColor: "bg-error/10",
      textColor: "text-error",
      iconColor: "text-error"
    },
    {
      title: "Compliance Score",
      value: `${metrics.complianceScore}%`,
      icon: "Shield",
      color: "success",
      bgColor: "bg-success/10",
      textColor: "text-success",
      iconColor: "text-success",
      trend: metrics.complianceTrend,
      trendIcon: metrics.complianceTrend > 0 ? "TrendingUp" : "TrendingDown"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
      {metricCards.map((metric, index) => (
        <div key={index} className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 rounded-lg ${metric.bgColor} flex items-center justify-center`}>
              <Icon name={metric.icon} size={24} className={metric.iconColor} />
            </div>
            {metric.trend !== undefined && (
              <div className={`flex items-center space-x-1 ${metric.textColor}`}>
                <Icon name={metric.trendIcon} size={16} />
                <span className="text-sm font-medium">
                  {metric.trend > 0 ? '+' : ''}{metric.trend}%
                </span>
              </div>
            )}
          </div>
          
          <div className="space-y-1">
            <h3 className="text-2xl font-bold text-text-primary">
              {metric.value}
            </h3>
            <p className="text-sm text-text-secondary">
              {metric.title}
            </p>
          </div>
          
          {index === 0 && metric.value > 0 && (
            <div className="mt-4 pt-4 border-t border-border">
              <button className="text-sm text-error hover:underline font-medium">
                View Critical Items
              </button>
            </div>
          )}
          
          {index === 3 && (
            <div className="mt-4 pt-4 border-t border-border">
              <div className="w-full bg-background rounded-full h-2">
                <div 
                  className="bg-success h-2 rounded-full transition-all duration-300"
                  style={{ width: `${metrics.complianceScore}%` }}
                ></div>
              </div>
              <p className="text-xs text-text-secondary mt-2">
                Target: 95% compliance
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ComplianceMetrics;