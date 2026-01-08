import React, { useState, useEffect } from "react";
import Icon from "components/AppIcon";

const SupplierPerformance = ({ selectedSuppliers, dateRange }) => {
  const [suppliers, setSuppliers] = useState([]);
  const [sortBy, setSortBy] = useState("reliability");
  const [sortOrder, setSortOrder] = useState("desc");
  const [isLoading, setIsLoading] = useState(true);

  // Generate mock supplier performance data
  useEffect(() => {
    setIsLoading(true);
    
    // Simulate API call delay
    const timer = setTimeout(() => {
      const mockSuppliers = [
        {
          id: "sup1",
          name: "PharmaCorp Inc.",
          reliability: 92,
          costEfficiency: 87,
          qualityScore: 95,
          leadTime: 4.2,
          lastDelivery: "2 days ago",
          trend: "up"
        },
        {
          id: "sup2",
          name: "MediSource Ltd.",
          reliability: 87,
          costEfficiency: 91,
          qualityScore: 89,
          leadTime: 5.8,
          lastDelivery: "1 week ago",
          trend: "stable"
        },
        {
          id: "sup3",
          name: "HealthDirect Supplies",
          reliability: 95,
          costEfficiency: 82,
          qualityScore: 93,
          leadTime: 3.5,
          lastDelivery: "3 days ago",
          trend: "up"
        },
        {
          id: "sup4",
          name: "Global Pharma Distributors",
          reliability: 83,
          costEfficiency: 88,
          qualityScore: 86,
          leadTime: 7.2,
          lastDelivery: "2 weeks ago",
          trend: "down"
        },
        {
          id: "sup5",
          name: "MedEquip Solutions",
          reliability: 89,
          costEfficiency: 85,
          qualityScore: 91,
          leadTime: 5.1,
          lastDelivery: "5 days ago",
          trend: "stable"
        },
        {
          id: "sup6",
          name: "BioTech Pharmaceuticals",
          reliability: 91,
          costEfficiency: 93,
          qualityScore: 88,
          leadTime: 4.8,
          lastDelivery: "1 day ago",
          trend: "up"
        },
        {
          id: "sup7",
          name: "PrecisionMed Supply Co.",
          reliability: 86,
          costEfficiency: 90,
          qualityScore: 84,
          leadTime: 6.3,
          lastDelivery: "10 days ago",
          trend: "down"
        },
        {
          id: "sup8",
          name: "Vital Healthcare Products",
          reliability: 90,
          costEfficiency: 86,
          qualityScore: 92,
          leadTime: 4.5,
          lastDelivery: "4 days ago",
          trend: "stable"
        }
      ];
      
      // Filter suppliers if needed
      let filteredSuppliers = mockSuppliers;
      if (selectedSuppliers.length > 0) {
        filteredSuppliers = mockSuppliers.filter(supplier => 
          selectedSuppliers.includes(supplier.id)
        );
      }
      
      setSuppliers(filteredSuppliers);
      setIsLoading(false);
    }, 600);
    
    return () => clearTimeout(timer);
  }, [selectedSuppliers, dateRange]);

  // Sort suppliers
  const sortedSuppliers = [...suppliers].sort((a, b) => {
    let comparison = 0;
    
    if (sortBy === "reliability") {
      comparison = a.reliability - b.reliability;
    } else if (sortBy === "costEfficiency") {
      comparison = a.costEfficiency - b.costEfficiency;
    } else if (sortBy === "leadTime") {
      // For lead time, lower is better
      comparison = b.leadTime - a.leadTime;
    } else if (sortBy === "qualityScore") {
      comparison = a.qualityScore - b.qualityScore;
    }
    
    return sortOrder === "desc" ? -comparison : comparison;
  });

  // Toggle sort
  const toggleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("desc");
    }
  };

  // Get trend icon
  const getTrendIcon = (trend) => {
    switch (trend) {
      case "up":
        return <Icon name="TrendingUp" size={14} className="text-success" />;
      case "down":
        return <Icon name="TrendingDown" size={14} className="text-error" />;
      default:
        return <Icon name="Minus" size={14} className="text-text-secondary" />;
    }
  };

  // Get score color class
  const getScoreColorClass = (score) => {
    if (score >= 90) return "text-success";
    if (score >= 80) return "text-primary";
    if (score >= 70) return "text-warning";
    return "text-error";
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Icon name="Loader" size={24} className="text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="h-full">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => toggleSort("reliability")}
            className={`px-2 py-1 text-xs rounded-md transition-colors ${
              sortBy === "reliability" ?"bg-primary/10 text-primary" :"text-text-secondary hover:bg-background"
            }`}
          >
            Reliability
            {sortBy === "reliability" && (
              <Icon 
                name={sortOrder === "desc" ? "ChevronDown" : "ChevronUp"} 
                size={14} 
                className="ml-1 inline" 
              />
            )}
          </button>
          <button
            onClick={() => toggleSort("costEfficiency")}
            className={`px-2 py-1 text-xs rounded-md transition-colors ${
              sortBy === "costEfficiency" ?"bg-primary/10 text-primary" :"text-text-secondary hover:bg-background"
            }`}
          >
            Cost
            {sortBy === "costEfficiency" && (
              <Icon 
                name={sortOrder === "desc" ? "ChevronDown" : "ChevronUp"} 
                size={14} 
                className="ml-1 inline" 
              />
            )}
          </button>
          <button
            onClick={() => toggleSort("leadTime")}
            className={`px-2 py-1 text-xs rounded-md transition-colors ${
              sortBy === "leadTime" ?"bg-primary/10 text-primary" :"text-text-secondary hover:bg-background"
            }`}
          >
            Lead Time
            {sortBy === "leadTime" && (
              <Icon 
                name={sortOrder === "desc" ? "ChevronDown" : "ChevronUp"} 
                size={14} 
                className="ml-1 inline" 
              />
            )}
          </button>
        </div>
      </div>
      
      <div className="overflow-y-auto h-[calc(100%-2rem)] pr-1">
        {sortedSuppliers.length > 0 ? (
          <div className="space-y-3">
            {sortedSuppliers.map((supplier) => (
              <div 
                key={supplier.id}
                className="p-3 border border-border rounded-md hover:border-primary/50 transition-colors cursor-pointer"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-text-primary">{supplier.name}</h4>
                  {getTrendIcon(supplier.trend)}
                </div>
                
                <div className="grid grid-cols-2 gap-2 mb-2">
                  <div>
                    <div className="text-xs text-text-secondary">Reliability</div>
                    <div className={`text-sm font-medium ${getScoreColorClass(supplier.reliability)}`}>
                      {supplier.reliability}%
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-text-secondary">Cost Efficiency</div>
                    <div className={`text-sm font-medium ${getScoreColorClass(supplier.costEfficiency)}`}>
                      {supplier.costEfficiency}%
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <div className="text-xs text-text-secondary">Lead Time</div>
                    <div className="text-sm font-medium text-text-primary">
                      {supplier.leadTime} days
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-text-secondary">Last Delivery</div>
                    <div className="text-sm font-medium text-text-primary">
                      {supplier.lastDelivery}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center p-4">
            <Icon name="Users" size={32} className="text-text-secondary mb-2 opacity-50" />
            <p className="text-text-secondary">No suppliers match your current filters</p>
            <button className="mt-2 text-sm text-primary hover:underline">
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SupplierPerformance;