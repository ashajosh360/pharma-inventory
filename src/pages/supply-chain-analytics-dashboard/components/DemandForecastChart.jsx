import React, { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from "recharts";
import Icon from "components/AppIcon";

const DemandForecastChart = ({ dateRange, selectedCategories }) => {
  const [chartData, setChartData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [forecastPeriod, setForecastPeriod] = useState(3); // months
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  // Generate mock categories
  useEffect(() => {
    const mockCategories = [
      { id: "all", name: "All Categories" },
      { id: "cat1", name: "Antibiotics" },
      { id: "cat2", name: "Pain Management" },
      { id: "cat3", name: "Cardiovascular" },
      { id: "cat4", name: "Respiratory" },
      { id: "cat5", name: "Gastrointestinal" },
      { id: "cat6", name: "Diabetes Care" },
      { id: "cat7", name: "Dermatology" },
      { id: "cat8", name: "Vaccines" }
    ];
    
    // Filter categories if needed
    if (selectedCategories.length > 0) {
      const filtered = mockCategories.filter(
        cat => cat.id === "all" || selectedCategories.includes(cat.id)
      );
      setCategories(filtered);
      
      // If currently selected category is not in filtered list, reset to "all"
      if (!filtered.some(cat => cat.id === selectedCategory) && selectedCategory !== "all") {
        setSelectedCategory("all");
      }
    } else {
      setCategories(mockCategories);
    }
  }, [selectedCategories, selectedCategory]);

  // Generate mock forecast data
  useEffect(() => {
    setIsLoading(true);
    
    // Simulate API call delay
    const timer = setTimeout(() => {
      // Generate 12 months of historical data + forecast months
      const data = [];
      const now = new Date();
      const currentMonth = now.getMonth();
      const currentYear = now.getFullYear();
      
      // Base demand patterns for different categories
      const baseDemand = {
        all: [420, 450, 480, 510, 540, 570, 600, 630, 660, 690, 720, 750],
        cat1: [120, 130, 140, 150, 160, 170, 180, 190, 200, 210, 220, 230], // Antibiotics
        cat2: [90, 95, 100, 105, 110, 115, 120, 125, 130, 135, 140, 145],   // Pain Management
        cat3: [80, 85, 90, 95, 100, 105, 110, 115, 120, 125, 130, 135],     // Cardiovascular
        cat4: [70, 75, 80, 85, 90, 95, 100, 105, 110, 115, 120, 125],       // Respiratory
        cat5: [60, 65, 70, 75, 80, 85, 90, 95, 100, 105, 110, 115],         // Gastrointestinal
        cat6: [50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100, 105],           // Diabetes Care
        cat7: [40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95],             // Dermatology
        cat8: [30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85]              // Vaccines
      };
      
      // Seasonal factors (higher in winter months for some categories)
      const seasonalFactor = (month) => {
        // Winter months (Nov-Feb) have higher demand for some categories
        const winterMonths = [0, 1, 10, 11]; // Jan, Feb, Nov, Dec
        
        if (selectedCategory === "cat4") { // Respiratory
          return winterMonths.includes(month) ? 1.3 : 0.9;
        } else if (selectedCategory === "cat8") { // Vaccines
          return winterMonths.includes(month) ? 1.4 : 0.8;
        } else if (selectedCategory === "cat1") { // Antibiotics
          return winterMonths.includes(month) ? 1.2 : 0.95;
        }
        
        return 1;
      };
      
      // Generate historical data (past 12 months)
      for (let i = 0; i < 12; i++) {
        const month = (currentMonth - 11 + i) % 12;
        const year = currentYear - (month > currentMonth ? 1 : 0);
        const monthName = new Date(year, month, 1).toLocaleString('default', { month: 'short' });
        
        // Get base demand for the selected category
        const categoryDemand = baseDemand[selectedCategory] || baseDemand.all;
        const baseValue = categoryDemand[i % 12];
        
        // Apply seasonal factor
        const seasonalValue = baseValue * seasonalFactor(month);
        
        // Add some randomness (±10%)
        const randomFactor = 0.9 + Math.random() * 0.2;
        const actualValue = Math.round(seasonalValue * randomFactor);
        
        data.push({
          name: `${monthName} ${year}`,
          actual: actualValue,
          forecast: null,
          isHistorical: true
        });
      }
      
      // Generate forecast data
      for (let i = 0; i < forecastPeriod; i++) {
        const month = (currentMonth + i + 1) % 12;
        const year = currentYear + (month <= currentMonth ? 1 : 0);
        const monthName = new Date(year, month, 1).toLocaleString('default', { month: 'short' });
        
        // Get base demand for the selected category
        const categoryDemand = baseDemand[selectedCategory] || baseDemand.all;
        const baseValue = categoryDemand[month];
        
        // Apply seasonal factor
        const seasonalValue = baseValue * seasonalFactor(month);
        
        // Apply growth trend (3% monthly growth)
        const trendFactor = 1 + (0.03 * i);
        
        // Calculate forecast with some randomness for upper/lower bounds
        const forecastValue = Math.round(seasonalValue * trendFactor);
        const lowerBound = Math.round(forecastValue * 0.9);
        const upperBound = Math.round(forecastValue * 1.1);
        
        data.push({
          name: `${monthName} ${year}`,
          actual: null,
          forecast: forecastValue,
          lowerBound,
          upperBound,
          isHistorical: false
        });
      }
      
      setChartData(data);
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, [dateRange, selectedCategory, forecastPeriod]);

  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const dataPoint = payload[0].payload;
      
      return (
        <div className="bg-surface p-3 border border-border rounded-md shadow-modal">
          <p className="font-medium text-text-primary mb-2">{label}</p>
          
          {dataPoint.isHistorical ? (
            <div className="flex items-center space-x-2 text-sm">
              <div className="w-3 h-3 rounded-full bg-primary" />
              <span className="text-text-secondary">Actual Demand:</span>
              <span className="font-medium text-text-primary">
                {dataPoint.actual} units
              </span>
            </div>
          ) : (
            <>
              <div className="flex items-center space-x-2 text-sm">
                <div className="w-3 h-3 rounded-full bg-accent" />
                <span className="text-text-secondary">Forecast:</span>
                <span className="font-medium text-text-primary">
                  {dataPoint.forecast} units
                </span>
              </div>
              <div className="flex items-center space-x-2 text-sm mt-1">
                <div className="w-3 h-3 rounded-full bg-text-secondary opacity-50" />
                <span className="text-text-secondary">Range:</span>
                <span className="font-medium text-text-primary">
                  {dataPoint.lowerBound} - {dataPoint.upperBound} units
                </span>
              </div>
            </>
          )}
        </div>
      );
    }
    return null;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex flex-col items-center">
          <Icon name="Loader" size={32} className="text-primary animate-spin mb-4" />
          <p className="text-text-secondary">Generating forecast...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between mb-4">
        <div className="flex items-center space-x-2 mb-2 sm:mb-0">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-1.5 text-sm rounded-md border border-border bg-background focus:outline-none focus:ring-1 focus:ring-primary"
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          
          <select
            value={forecastPeriod}
            onChange={(e) => setForecastPeriod(Number(e.target.value))}
            className="px-3 py-1.5 text-sm rounded-md border border-border bg-background focus:outline-none focus:ring-1 focus:ring-primary"
          >
            <option value={3}>3 Month Forecast</option>
            <option value={6}>6 Month Forecast</option>
            <option value={12}>12 Month Forecast</option>
          </select>
        </div>
        
        <div className="flex items-center space-x-2">
          <button className="flex items-center space-x-1 px-3 py-1.5 text-sm text-primary hover:bg-primary/5 rounded-md transition-colors">
            <Icon name="Download" size={14} />
            <span>Export Forecast</span>
          </button>
        </div>
      </div>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
            <XAxis 
              dataKey="name" 
              tick={{ fontSize: 12 }} 
              tickFormatter={(value) => value.split(' ')[0]}
            />
            <YAxis 
              tick={{ fontSize: 12 }} 
              tickFormatter={(value) => value}
              label={{ value: 'Units', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fontSize: 12 } }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            
            {/* Reference line separating historical from forecast */}
            <ReferenceLine 
              x={11} 
              stroke="var(--color-text-secondary)" 
              strokeDasharray="3 3" 
              label={{ 
                value: 'Current', 
                position: 'top', 
                fill: 'var(--color-text-secondary)',
                fontSize: 12
              }} 
            />
            
            {/* Historical data line */}
            <Line 
              type="monotone" 
              dataKey="actual" 
              name="Historical Demand" 
              stroke="var(--color-primary)" 
              strokeWidth={2} 
              dot={{ r: 4 }} 
              activeDot={{ r: 6 }} 
            />
            
            {/* Forecast line */}
            <Line 
              type="monotone" 
              dataKey="forecast" 
              name="Forecast Demand" 
              stroke="var(--color-accent)" 
              strokeWidth={2} 
              strokeDasharray="5 5"
              dot={{ r: 4 }} 
              activeDot={{ r: 6 }} 
            />
            
            {/* Forecast range area */}
            <Line 
              type="monotone" 
              dataKey="upperBound" 
              name="Upper Bound" 
              stroke="var(--color-text-secondary)" 
              strokeWidth={1}
              strokeOpacity={0.5}
              dot={false}
            />
            <Line 
              type="monotone" 
              dataKey="lowerBound" 
              name="Lower Bound" 
              stroke="var(--color-text-secondary)" 
              strokeWidth={1}
              strokeOpacity={0.5}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-3 bg-background rounded-md border border-border">
          <h4 className="text-sm font-medium text-text-primary mb-1">Peak Demand Period</h4>
          <p className="text-sm text-text-secondary">
            {selectedCategory === "cat4"|| selectedCategory === "cat8" || selectedCategory === "cat1" ?"November - February" :"June - September"}
          </p>
        </div>
        <div className="p-3 bg-background rounded-md border border-border">
          <h4 className="text-sm font-medium text-text-primary mb-1">Forecast Confidence</h4>
          <div className="flex items-center space-x-2">
            <div className="w-full bg-border rounded-full h-2">
              <div 
                className="bg-success h-2 rounded-full" 
                style={{ width: `${forecastPeriod === 3 ? 85 : forecastPeriod === 6 ? 72 : 60}%` }}
              ></div>
            </div>
            <span className="text-sm text-text-secondary">
              {forecastPeriod === 3 ? "85%" : forecastPeriod === 6 ? "72%" : "60%"}
            </span>
          </div>
        </div>
        <div className="p-3 bg-background rounded-md border border-border">
          <h4 className="text-sm font-medium text-text-primary mb-1">Recommended Action</h4>
          <p className="text-sm text-text-secondary">
            {selectedCategory === "cat4"|| selectedCategory === "cat8" ?"Increase stock levels by 20% before winter" :"Maintain standard inventory levels"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DemandForecastChart;