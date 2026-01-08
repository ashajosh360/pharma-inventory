import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const InventoryDistributionChart = ({ data }) => {
  // Calculate distribution data
  const distributionData = React.useMemo(() => {
    const otcCount = data.filter(item => item.category === 'OTC').length;
    const prescriptionCount = data.filter(item => item.category === 'Prescription').length;
    
    const otcValue = data
      .filter(item => item.category === 'OTC')
      .reduce((sum, item) => sum + item.totalValue, 0);
    
    const prescriptionValue = data
      .filter(item => item.category === 'Prescription')
      .reduce((sum, item) => sum + item.totalValue, 0);

    return [
      {
        name: 'OTC Medicines',
        count: otcCount,
        value: otcValue,
        percentage: ((otcCount / data.length) * 100).toFixed(1),
        color: '#2E86AB'
      },
      {
        name: 'Prescription Medicines',
        count: prescriptionCount,
        value: prescriptionValue,
        percentage: ((prescriptionCount / data.length) * 100).toFixed(1),
        color: '#1B5E7A'
      }
    ];
  }, [data]);

  const COLORS = ['#2E86AB', '#1B5E7A'];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-surface border border-border rounded-md p-3 shadow-modal">
          <p className="font-medium text-text-primary">{data.name}</p>
          <p className="text-sm text-text-secondary">Count: {data.count} items</p>
          <p className="text-sm text-text-secondary">Value: ₹{data.value.toLocaleString()}</p>
          <p className="text-sm text-text-secondary">Percentage: {data.percentage}%</p>
        </div>
      );
    }
    return null;
  };

  const CustomLegend = ({ payload }) => {
    return (
      <div className="flex flex-col space-y-2 mt-4">
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-sm text-text-primary">{entry.payload.name}</span>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium text-text-primary">
                {entry.payload.count} items
              </div>
              <div className="text-xs text-text-secondary">
                {entry.payload.percentage}%
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={distributionData}
            cx="50%"
            cy="40%"
            innerRadius={40}
            outerRadius={80}
            paddingAngle={5}
            dataKey="count"
          >
            {distributionData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend content={<CustomLegend />} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default InventoryDistributionChart;