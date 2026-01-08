import React from "react";
import Icon from "components/AppIcon";

const KpiMetricCard = ({ title, value, change, trend, format, icon, color }) => {
  // Format the value based on the format type
  const formatValue = (val, formatType) => {
    switch (formatType) {
      case "percentage":
        return `${val}%`;
      case "currency":
        return `$${val.toLocaleString()}`;
      case "days":
        return `${val} days`;
      case "score":
        return val;
      case "decimal":
        return val.toFixed(1);
      default:
        return val;
    }
  };

  // Determine if change is positive or negative
  const isPositive = (change, format) => {
    // For some metrics like lead time, negative change is actually positive
    if (format === "days") {
      return change < 0;
    }
    return change > 0;
  };

  // Calculate trend line points
  const calculateTrendPoints = () => {
    if (!trend || trend.length < 2) return "";
    
    const height = 30;
    const width = 80;
    const max = Math.max(...trend);
    const min = Math.min(...trend);
    const range = max - min || 1;
    
    const points = trend.map((value, index) => {
      const x = (index / (trend.length - 1)) * width;
      const y = height - ((value - min) / range) * height;
      return `${x},${y}`;
    }).join(" ");
    
    return points;
  };

  const positive = isPositive(change, format);
  const trendPoints = calculateTrendPoints();
  const changeAbs = Math.abs(change);

  return (
    <div className="bg-surface border border-border rounded-md shadow-card p-4">
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-sm font-medium text-text-secondary">{title}</h3>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center bg-${color}/10`}>
          <Icon name={icon} size={16} className={`text-${color}`} />
        </div>
      </div>
      
      <div className="flex items-baseline space-x-2 mb-2">
        <span className="text-2xl font-bold text-text-primary">
          {formatValue(value, format)}
        </span>
        <div className={`flex items-center text-sm ${positive ? 'text-success' : 'text-error'}`}>
          <Icon 
            name={positive ? 'TrendingUp' : 'TrendingDown'} 
            size={16} 
            className="mr-1" 
          />
          <span>{formatValue(changeAbs, format)}</span>
        </div>
      </div>
      
      {/* Trend Sparkline */}
      <div className="h-8 mt-2">
        <svg width="100%" height="100%" viewBox="0 0 80 30" preserveAspectRatio="none">
          <polyline
            points={trendPoints}
            fill="none"
            stroke={positive ? 'var(--color-success)' : 'var(--color-error)'}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
};

export default KpiMetricCard;