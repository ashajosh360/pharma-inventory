import React, { useState, useEffect } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import Icon from "components/AppIcon";

const SeasonalPatternChart = ({ dateRange, selectedCategories }) => {
  const [chartData, setChartData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewMode, setViewMode] = useState("monthly"); // monthly, quarterly
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

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
    
    // Generate available years
    const currentYear = new Date().getFullYear();
    setYears([currentYear - 2, currentYear - 1, currentYear]);
  }, [selectedCategories, selectedCategory]);

  // Generate mock seasonal pattern data
  useEffect(() => {
    setIsLoading(true);
    
    // Simulate API call delay
    const timer = setTimeout(() => {
      // Generate data based on view mode
      let data = [];
      
      if (viewMode === "monthly") {
        // Monthly data for the selected year
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        
        // Base patterns for different categories
        const basePatterns = {
          all: [85, 80, 90, 95, 100, 110, 115, 120, 110, 100, 95, 105],
          cat1: [110, 105, 100, 90, 85, 80, 75, 80, 90, 100, 110, 120], // Antibiotics (winter peak)
          cat2: [90, 95, 100, 105, 110, 115, 110, 105, 100, 95, 90, 85], // Pain Management (summer peak)
          cat3: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], // Cardiovascular (stable)
          cat4: [120, 110, 100, 90, 80, 70, 65, 70, 80, 90, 100, 110], // Respiratory (winter peak)
          cat5: [90, 95, 100, 105, 110, 115, 110, 105, 100, 95, 90, 85], // Gastrointestinal (summer peak)
          cat6: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], // Diabetes Care (stable)
          cat7: [80, 85, 90, 100, 110, 120, 125, 120, 110, 100, 90, 85], // Dermatology (summer peak)
          cat8: [130, 120, 110, 100, 90, 80, 70, 80, 90, 100, 110, 120]  // Vaccines (winter peak)
        };
        
        // Year-specific modifiers (e.g., growth trends)
        const yearModifier = selectedYear === new Date().getFullYear() ? 1.1 : 
                            selectedYear === new Date().getFullYear() - 1 ? 1.0 : 0.9;
        
        // Generate data points
        for (let i = 0; i < 12; i++) {
          // Get base pattern for the selected category
          const basePattern = basePatterns[selectedCategory] || basePatterns.all;
          const baseValue = basePattern[i];
          
          // Apply year modifier and some randomness
          const randomFactor = 0.95 + Math.random() * 0.1;
          const value = Math.round(baseValue * yearModifier * randomFactor);
          
          // Calculate 3-year average for comparison
          const avgValue = Math.round(baseValue * 1.0); // Simplified average
          
          data.push({
            name: months[i],
            value,
            average: avgValue,
            anomaly: Math.abs(value - avgValue) > avgValue * 0.15 // Flag significant deviations
          });
        }
      } else {
        // Quarterly data for multiple years
        const quarters = ['Q1', 'Q2', 'Q3', 'Q4'];
        const availableYears = years;
        
        // Base quarterly patterns
        const baseQuarterlyPatterns = {
          all: [90, 105, 115, 100],
          cat1: [115, 85, 75, 110], // Antibiotics (Q1/Q4 peak)
          cat2: [95, 110, 115, 90], // Pain Management (Q2/Q3 peak)
          cat3: [100, 100, 100, 100], // Cardiovascular (stable)
          cat4: [120, 80, 70, 110], // Respiratory (Q1/Q4 peak)
          cat5: [90, 110, 115, 95], // Gastrointestinal (Q2/Q3 peak)
          cat6: [100, 100, 100, 100], // Diabetes Care (stable)
          cat7: [85, 115, 120, 90], // Dermatology (Q2/Q3 peak)
          cat8: [125, 85, 75, 115]  // Vaccines (Q1/Q4 peak)
        };
        
        // Generate data points for each quarter across years
        for (let i = 0; i < 4; i++) {
          const quarterData = {
            name: quarters[i]
          };
          
          // Add data for each year
          availableYears.forEach(year => {
            // Get base pattern for the selected category
            const basePattern = baseQuarterlyPatterns[selectedCategory] || baseQuarterlyPatterns.all;
            const baseValue = basePattern[i];
            
            // Apply year-specific growth and randomness
            const yearModifier = year === new Date().getFullYear() ? 1.1 : 
                               year === new Date().getFullYear() - 1 ? 1.0 : 0.9;
            const randomFactor = 0.95 + Math.random() * 0.1;
            
            quarterData[`y${year}`] = Math.round(baseValue * yearModifier * randomFactor);
          });
          
          data.push(quarterData);
        }
      }
      
      setChartData(data);
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, [dateRange, selectedCategory, viewMode, selectedYear, years]);

  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-surface p-3 border border-border rounded-md shadow-modal">
          <p className="font-medium text-text-primary mb-2">{label}</p>
          
          {viewMode === "monthly" ? (
            <>
              <div className="flex items-center space-x-2 text-sm">
                <div className="w-3 h-3 rounded-full bg-primary" />
                <span className="text-text-secondary">{selectedYear}:</span>
                <span className="font-medium text-text-primary">
                  {payload[0].value} units
                </span>
                {payload[0].payload.anomaly && (
                  <span className="ml-1 text-warning">
                    <Icon name="AlertTriangle" size={14} />
                  </span>
                )}
              </div>
              <div className="flex items-center space-x-2 text-sm mt-1">
                <div className="w-3 h-3 rounded-full bg-text-secondary opacity-50" />
                <span className="text-text-secondary">3-Year Average:</span>
                <span className="font-medium text-text-primary">
                  {payload[1].value} units
                </span>
              </div>
            </>
          ) : (
            <>
              {payload.map((entry, index) => (
                <div key={index} className="flex items-center space-x-2 text-sm mt-1">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: entry.color }}
                  />
                  <span className="text-text-secondary">{entry.name.replace('y', '')}:</span>
                  <span className="font-medium text-text-primary">
                    {entry.value} units
                  </span>
                </div>
              ))}
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
          <p className="text-text-secondary">Analyzing seasonal patterns...</p>
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
          
          <button
            onClick={() => setViewMode("monthly")}
            className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
              viewMode === "monthly" ?"bg-primary/10 text-primary" :"text-text-secondary hover:bg-background"
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setViewMode("quarterly")}
            className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
              viewMode === "quarterly" ?"bg-primary/10 text-primary" :"text-text-secondary hover:bg-background"
            }`}
          >
            Quarterly
          </button>
          
          {viewMode === "monthly" && (
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
              className="px-3 py-1.5 text-sm rounded-md border border-border bg-background focus:outline-none focus:ring-1 focus:ring-primary"
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          {viewMode === "monthly" ? (
            <AreaChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis 
                tick={{ fontSize: 12 }} 
                tickFormatter={(value) => value}
                label={{ value: 'Units', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fontSize: 12 } }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              
              <Area 
                type="monotone" 
                dataKey="value" 
                name={`${selectedYear}`} 
                stroke="var(--color-primary)" 
                fill="var(--color-primary)" 
                fillOpacity={0.2}
                strokeWidth={2}
                activeDot={{ r: 6, strokeWidth: 1, stroke: '#fff' }}
              />
              <Area 
                type="monotone" 
                dataKey="average" 
                name="3-Year Average" 
                stroke="var(--color-text-secondary)" 
                fill="var(--color-text-secondary)" 
                fillOpacity={0.1}
                strokeWidth={1}
                strokeDasharray="5 5"
                activeDot={{ r: 4, strokeWidth: 1, stroke: '#fff' }}
              />
            </AreaChart>
          ) : (
            <AreaChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis 
                tick={{ fontSize: 12 }} 
                tickFormatter={(value) => value}
                label={{ value: 'Units', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fontSize: 12 } }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              
              {years.map((year, index) => (
                <Area 
                  key={year}
                  type="monotone" 
                  dataKey={`y${year}`} 
                  name={`${year}`} 
                  stroke={index === 2 ? "var(--color-primary)" : index === 1 ? "var(--color-secondary)" : "var(--color-accent)"}
                  fill={index === 2 ? "var(--color-primary)" : index === 1 ? "var(--color-secondary)" : "var(--color-accent)"}
                  fillOpacity={0.2}
                  strokeWidth={index === 2 ? 2 : 1.5}
                  activeDot={{ r: index === 2 ? 6 : 5, strokeWidth: 1, stroke: '#fff' }}
                />
              ))}
            </AreaChart>
          )}
        </ResponsiveContainer>
      </div>
      
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-background rounded-md border border-border">
          <h4 className="text-sm font-medium text-text-primary mb-2">Seasonal Pattern</h4>
          <p className="text-sm text-text-secondary">
            {selectedCategory === "cat1"|| selectedCategory === "cat4" || selectedCategory === "cat8" ?"Winter peak (Q1/Q4) with summer trough" 
              : selectedCategory === "cat2"|| selectedCategory === "cat5" || selectedCategory === "cat7" ?"Summer peak (Q2/Q3) with winter trough" :"Relatively stable throughout the year"}
          </p>
        </div>
        <div className="p-4 bg-background rounded-md border border-border">
          <h4 className="text-sm font-medium text-text-primary mb-2">Procurement Strategy</h4>
          <p className="text-sm text-text-secondary">
            {selectedCategory === "cat1"|| selectedCategory === "cat4" || selectedCategory === "cat8" ?"Increase stock 30-45 days before winter season" 
              : selectedCategory === "cat2"|| selectedCategory === "cat5" || selectedCategory === "cat7" ?"Increase stock 30-45 days before summer season" :"Maintain consistent stock levels with regular review"}
          </p>
        </div>
        <div className="p-4 bg-background rounded-md border border-border">
          <h4 className="text-sm font-medium text-text-primary mb-2">Year-over-Year Trend</h4>
          <div className="flex items-center space-x-2">
            <div className="w-full bg-border rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full" 
                style={{ width: `${selectedCategory === "cat3" || selectedCategory === "cat6" ? 65 : 85}%` }}
              ></div>
            </div>
            <span className="text-sm text-text-secondary">
              {selectedCategory === "cat3" || selectedCategory === "cat6" ? "+6.5%" : "+8.5%"}
            </span>
          </div>
          <p className="text-xs text-text-secondary mt-2">
            Annual growth rate based on 3-year data
          </p>
        </div>
      </div>
    </div>
  );
};

export default SeasonalPatternChart;