import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Line, ComposedChart, ResponsiveContainer } from "recharts";
import Icon from "components/AppIcon";

const InventoryMovementChart = ({ dateRange, selectedSuppliers, selectedCategories, comparisonMode }) => {
  const [chartData, setChartData] = useState([]);
  const [chartType, setChartType] = useState("combined"); // combined, movement, cost
  const [isLoading, setIsLoading] = useState(true);

  // Generate mock data based on filters
  useEffect(() => {
    setIsLoading(true);
    
    // Simulate API call delay
    const timer = setTimeout(() => {
      // Generate 12 months of data
      const data = [];
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const currentYear = new Date().getFullYear();
      
      // Base values that will be modified by filters
      const baseInflow = [320, 350, 380, 410, 440, 470, 500, 530, 560, 590, 620, 650];
      const baseOutflow = [300, 330, 360, 390, 420, 450, 480, 510, 540, 570, 600, 630];
      const baseCost = [15000, 16000, 17000, 18000, 19000, 20000, 21000, 22000, 23000, 24000, 25000, 26000];
      
      // Apply filter effects
      let inflowModifier = 1;
      let outflowModifier = 1;
      let costModifier = 1;
      
      // Supplier filter effect
      if (selectedSuppliers.length > 0) {
        inflowModifier *= 0.8 + (selectedSuppliers.length * 0.05);
        costModifier *= 0.9 + (selectedSuppliers.length * 0.03);
      }
      
      // Category filter effect
      if (selectedCategories.length > 0) {
        outflowModifier *= 0.85 + (selectedCategories.length * 0.04);
        costModifier *= 0.95 + (selectedCategories.length * 0.02);
      }
      
      // Comparison mode effect
      if (comparisonMode === "yoy") {
        inflowModifier *= 0.9;
        outflowModifier *= 0.85;
        costModifier *= 0.8;
      }
      
      // Generate data points
      for (let i = 0; i < 12; i++) {
        // Add some randomness
        const randomFactor = 0.9 + Math.random() * 0.2;
        
        data.push({
          name: months[i],
          inflow: Math.round(baseInflow[i] * inflowModifier * randomFactor),
          outflow: Math.round(baseOutflow[i] * outflowModifier * randomFactor),
          cost: Math.round(baseCost[i] * costModifier * randomFactor),
          net: Math.round((baseInflow[i] * inflowModifier - baseOutflow[i] * outflowModifier) * randomFactor)
        });
      }
      
      setChartData(data);
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, [dateRange, selectedSuppliers, selectedCategories, comparisonMode]);

  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-surface p-3 border border-border rounded-md shadow-modal">
          <p className="font-medium text-text-primary mb-2">{label}</p>
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center space-x-2 text-sm">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-text-secondary">{entry.name}:</span>
              <span className="font-medium text-text-primary">
                {entry.name === "Cost" ? `$${entry.value.toLocaleString()}` : entry.value.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-80">
        <div className="flex flex-col items-center">
          <Icon name="Loader" size={32} className="text-primary animate-spin mb-4" />
          <p className="text-text-secondary">Loading chart data...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between mb-4">
        <div className="flex items-center space-x-2 mb-2 sm:mb-0">
          <button
            onClick={() => setChartType("combined")}
            className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
              chartType === "combined" ?"bg-primary/10 text-primary" :"text-text-secondary hover:bg-background"
            }`}
          >
            Combined View
          </button>
          <button
            onClick={() => setChartType("movement")}
            className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
              chartType === "movement" ?"bg-primary/10 text-primary" :"text-text-secondary hover:bg-background"
            }`}
          >
            Inventory Movement
          </button>
          <button
            onClick={() => setChartType("cost")}
            className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
              chartType === "cost" ?"bg-primary/10 text-primary" :"text-text-secondary hover:bg-background"
            }`}
          >
            Cost Analysis
          </button>
        </div>
        
        <div className="flex items-center space-x-2">
          <span className="text-xs text-text-secondary">
            {comparisonMode === "mom" ? "Month-over-Month" : "Year-over-Year"} comparison
          </span>
        </div>
      </div>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === "combined" ? (
            <ComposedChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis 
                yAxisId="left" 
                orientation="left" 
                tick={{ fontSize: 12 }} 
                tickFormatter={(value) => value}
                label={{ value: 'Units', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fontSize: 12 } }}
              />
              <YAxis 
                yAxisId="right" 
                orientation="right" 
                tick={{ fontSize: 12 }} 
                tickFormatter={(value) => `$${value/1000}k`}
                label={{ value: 'Cost ($)', angle: 90, position: 'insideRight', style: { textAnchor: 'middle', fontSize: 12 } }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar yAxisId="left" dataKey="inflow" name="Inflow" fill="var(--color-primary)" barSize={20} />
              <Bar yAxisId="left" dataKey="outflow" name="Outflow" fill="var(--color-secondary)" barSize={20} />
              <Line 
                yAxisId="right" 
                type="monotone" 
                dataKey="cost" 
                name="Cost" 
                stroke="var(--color-accent)" 
                strokeWidth={2} 
                dot={{ r: 4 }} 
                activeDot={{ r: 6 }} 
              />
            </ComposedChart>
          ) : chartType === "movement" ? (
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis 
                tick={{ fontSize: 12 }} 
                tickFormatter={(value) => value}
                label={{ value: 'Units', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fontSize: 12 } }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="inflow" name="Inflow" fill="var(--color-primary)" barSize={20} />
              <Bar dataKey="outflow" name="Outflow" fill="var(--color-secondary)" barSize={20} />
              <Bar dataKey="net" name="Net Change" fill="var(--color-success)" barSize={20} />
            </BarChart>
          ) : (
            <ComposedChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis 
                tick={{ fontSize: 12 }} 
                tickFormatter={(value) => `$${value/1000}k`}
                label={{ value: 'Cost ($)', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fontSize: 12 } }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="cost" name="Total Cost" fill="var(--color-accent)" barSize={30} />
              <Line 
                type="monotone" 
                dataKey="cost" 
                name="Cost Trend" 
                stroke="var(--color-error)" 
                strokeWidth={2} 
                dot={{ r: 4 }} 
                activeDot={{ r: 6 }} 
              />
            </ComposedChart>
          )}
        </ResponsiveContainer>
      </div>
      
      <div className="mt-4 text-xs text-text-secondary">
        <p>Click on chart elements to drill down into detailed analysis</p>
      </div>
    </div>
  );
};

export default InventoryMovementChart;