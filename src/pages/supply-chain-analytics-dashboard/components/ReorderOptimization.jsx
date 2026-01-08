import React, { useState, useEffect } from "react";
import Icon from "components/AppIcon";

const ReorderOptimization = ({ dateRange, selectedSuppliers }) => {
  const [products, setProducts] = useState([]);
  const [sortBy, setSortBy] = useState("savings");
  const [sortOrder, setSortOrder] = useState("desc");
  const [isLoading, setIsLoading] = useState(true);
  const [optimizationMode, setOptimizationMode] = useState("balanced"); // balanced, cost, availability

  // Generate mock reorder optimization data
  useEffect(() => {
    setIsLoading(true);
    
    // Simulate API call delay
    const timer = setTimeout(() => {
      const mockProducts = [
        {
          id: "prod1",
          name: "Amoxicillin 500mg",
          category: "Antibiotics",
          supplier: "PharmaCorp Inc.",
          currentROP: 50,
          optimizedROP: 42,
          leadTime: 4,
          annualDemand: 1200,
          costPerUnit: 1.25,
          holdingCost: 0.18,
          stockoutRisk: "Low",
          potentialSavings: 980,
          recommendation: "Decrease"
        },
        {
          id: "prod2",
          name: "Lisinopril 10mg",
          category: "Cardiovascular",
          supplier: "MediSource Ltd.",
          currentROP: 75,
          optimizedROP: 90,
          leadTime: 6,
          annualDemand: 2400,
          costPerUnit: 0.85,
          holdingCost: 0.15,
          stockoutRisk: "High",
          potentialSavings: 1250,
          recommendation: "Increase"
        },
        {
          id: "prod3",
          name: "Albuterol Inhaler",
          category: "Respiratory",
          supplier: "HealthDirect Supplies",
          currentROP: 30,
          optimizedROP: 45,
          leadTime: 3,
          annualDemand: 800,
          costPerUnit: 12.50,
          holdingCost: 0.22,
          stockoutRisk: "Medium",
          potentialSavings: 1850,
          recommendation: "Increase"
        },
        {
          id: "prod4",
          name: "Metformin 850mg",
          category: "Diabetes Care",
          supplier: "BioTech Pharmaceuticals",
          currentROP: 100,
          optimizedROP: 85,
          leadTime: 5,
          annualDemand: 3600,
          costPerUnit: 0.65,
          holdingCost: 0.12,
          stockoutRisk: "Low",
          potentialSavings: 1120,
          recommendation: "Decrease"
        },
        {
          id: "prod5",
          name: "Omeprazole 20mg",
          category: "Gastrointestinal",
          supplier: "Global Pharma Distributors",
          currentROP: 60,
          optimizedROP: 55,
          leadTime: 7,
          annualDemand: 1800,
          costPerUnit: 0.95,
          holdingCost: 0.16,
          stockoutRisk: "Low",
          potentialSavings: 570,
          recommendation: "Maintain"
        },
        {
          id: "prod6",
          name: "Ibuprofen 400mg",
          category: "Pain Management",
          supplier: "MedEquip Solutions",
          currentROP: 120,
          optimizedROP: 100,
          leadTime: 4,
          annualDemand: 4800,
          costPerUnit: 0.35,
          holdingCost: 0.10,
          stockoutRisk: "Low",
          potentialSavings: 840,
          recommendation: "Decrease"
        },
        {
          id: "prod7",
          name: "Fluticasone Nasal Spray",
          category: "Respiratory",
          supplier: "PrecisionMed Supply Co.",
          currentROP: 40,
          optimizedROP: 60,
          leadTime: 6,
          annualDemand: 960,
          costPerUnit: 8.75,
          holdingCost: 0.20,
          stockoutRisk: "High",
          potentialSavings: 2100,
          recommendation: "Increase"
        },
        {
          id: "prod8",
          name: "Atorvastatin 20mg",
          category: "Cardiovascular",
          supplier: "Vital Healthcare Products",
          currentROP: 80,
          optimizedROP: 75,
          leadTime: 5,
          annualDemand: 2100,
          costPerUnit: 1.05,
          holdingCost: 0.17,
          stockoutRisk: "Low",
          potentialSavings: 630,
          recommendation: "Maintain"
        }
      ];
      
      // Apply optimization mode adjustments
      const optimizedProducts = mockProducts.map(product => {
        let adjustedROP = product.optimizedROP;
        let adjustedSavings = product.potentialSavings;
        
        if (optimizationMode === "cost") {
          // Cost-focused mode reduces ROP further to minimize holding costs
          if (product.recommendation === "Decrease" || product.recommendation === "Maintain") {
            adjustedROP = Math.round(adjustedROP * 0.9);
            adjustedSavings = Math.round(adjustedSavings * 1.2);
          }
        } else if (optimizationMode === "availability") {
          // Availability-focused mode increases ROP to reduce stockout risk
          if (product.recommendation === "Increase" || product.stockoutRisk !== "Low") {
            adjustedROP = Math.round(adjustedROP * 1.15);
            adjustedSavings = Math.round(adjustedSavings * 0.8);
          }
        }
        
        return {
          ...product,
          optimizedROP: adjustedROP,
          potentialSavings: adjustedSavings
        };
      });
      
      // Filter by selected suppliers if needed
      let filteredProducts = optimizedProducts;
      if (selectedSuppliers.length > 0) {
        // This is a mock implementation - in a real app, you'd match supplier IDs // Here we're just filtering based on if any part of the supplier name matches
        filteredProducts = optimizedProducts.filter(product => 
          selectedSuppliers.some(supplierId => 
            product.supplier.toLowerCase().includes(supplierId.toLowerCase())
          )
        );
      }
      
      setProducts(filteredProducts);
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, [dateRange, selectedSuppliers, optimizationMode]);

  // Sort products
  const sortedProducts = [...products].sort((a, b) => {
    let comparison = 0;
    
    if (sortBy === "savings") {
      comparison = a.potentialSavings - b.potentialSavings;
    } else if (sortBy === "risk") {
      // Convert risk levels to numeric values for sorting
      const riskValue = {
        "Low": 1,
        "Medium": 2,
        "High": 3
      };
      comparison = riskValue[a.stockoutRisk] - riskValue[b.stockoutRisk];
    } else if (sortBy === "name") {
      comparison = a.name.localeCompare(b.name);
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

  // Get recommendation icon and color
  const getRecommendationDetails = (recommendation) => {
    switch (recommendation) {
      case "Increase":
        return { 
          icon: <Icon name="ArrowUp" size={14} className="text-error" />,
          colorClass: "text-error"
        };
      case "Decrease":
        return { 
          icon: <Icon name="ArrowDown" size={14} className="text-success" />,
          colorClass: "text-success"
        };
      default:
        return { 
          icon: <Icon name="Minus" size={14} className="text-text-secondary" />,
          colorClass: "text-text-secondary"
        };
    }
  };

  // Get risk badge color
  const getRiskBadgeColor = (risk) => {
    switch (risk) {
      case "High":
        return "bg-error/10 text-error";
      case "Medium":
        return "bg-warning/10 text-warning";
      case "Low":
        return "bg-success/10 text-success";
      default:
        return "bg-primary/10 text-primary";
    }
  };

  // Calculate total potential savings
  const totalSavings = sortedProducts.reduce((sum, product) => sum + product.potentialSavings, 0);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex flex-col items-center">
          <Icon name="Loader" size={32} className="text-primary animate-spin mb-4" />
          <p className="text-text-secondary">Calculating optimal reorder points...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between mb-4">
        <div className="flex items-center space-x-2 mb-2 sm:mb-0">
          <button
            onClick={() => setOptimizationMode("balanced")}
            className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
              optimizationMode === "balanced" ?"bg-primary/10 text-primary" :"text-text-secondary hover:bg-background"
            }`}
          >
            Balanced
          </button>
          <button
            onClick={() => setOptimizationMode("cost")}
            className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
              optimizationMode === "cost" ?"bg-primary/10 text-primary" :"text-text-secondary hover:bg-background"
            }`}
          >
            Cost-Focused
          </button>
          <button
            onClick={() => setOptimizationMode("availability")}
            className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
              optimizationMode === "availability" ?"bg-primary/10 text-primary" :"text-text-secondary hover:bg-background"
            }`}
          >
            Availability-Focused
          </button>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => toggleSort("savings")}
            className={`px-2 py-1 text-xs rounded-md transition-colors ${
              sortBy === "savings" ?"bg-primary/10 text-primary" :"text-text-secondary hover:bg-background"
            }`}
          >
            Savings
            {sortBy === "savings" && (
              <Icon 
                name={sortOrder === "desc" ? "ChevronDown" : "ChevronUp"} 
                size={14} 
                className="ml-1 inline" 
              />
            )}
          </button>
          <button
            onClick={() => toggleSort("risk")}
            className={`px-2 py-1 text-xs rounded-md transition-colors ${
              sortBy === "risk" ?"bg-primary/10 text-primary" :"text-text-secondary hover:bg-background"
            }`}
          >
            Risk
            {sortBy === "risk" && (
              <Icon 
                name={sortOrder === "desc" ? "ChevronDown" : "ChevronUp"} 
                size={14} 
                className="ml-1 inline" 
              />
            )}
          </button>
        </div>
      </div>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="p-4 bg-surface rounded-md border border-border">
          <h4 className="text-sm font-medium text-text-secondary mb-1">Total Potential Savings</h4>
          <div className="text-xl font-bold text-success">${totalSavings.toLocaleString()}</div>
        </div>
        <div className="p-4 bg-surface rounded-md border border-border">
          <h4 className="text-sm font-medium text-text-secondary mb-1">Products to Adjust</h4>
          <div className="text-xl font-bold text-primary">
            {sortedProducts.filter(p => p.recommendation !== "Maintain").length} of {sortedProducts.length}
          </div>
        </div>
        <div className="p-4 bg-surface rounded-md border border-border">
          <h4 className="text-sm font-medium text-text-secondary mb-1">Optimization Strategy</h4>
          <div className="text-xl font-bold text-text-primary capitalize">
            {optimizationMode}
          </div>
        </div>
      </div>
      
      {/* Products Table */}
      <div className="overflow-x-auto border border-border rounded-md">
        <table className="min-w-full divide-y divide-border">
          <thead className="bg-background">
            <tr>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                Product
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                Current ROP
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                Optimized ROP
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                Lead Time
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                Risk
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                Savings
              </th>
            </tr>
          </thead>
          <tbody className="bg-surface divide-y divide-border">
            {sortedProducts.map((product) => {
              const { icon, colorClass } = getRecommendationDetails(product.recommendation);
              
              return (
                <tr key={product.id} className="hover:bg-background transition-colors">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex flex-col">
                      <div className="text-sm font-medium text-text-primary">{product.name}</div>
                      <div className="text-xs text-text-secondary">{product.category}</div>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-text-primary">
                    {product.currentROP} units
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center space-x-1">
                      <span className={`text-sm font-medium ${colorClass}`}>
                        {product.optimizedROP} units
                      </span>
                      {icon}
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-text-primary">
                    {product.leadTime} days
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getRiskBadgeColor(product.stockoutRisk)}`}>
                      {product.stockoutRisk}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-success">
                    ${product.potentialSavings.toLocaleString()}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      
      <div className="mt-4 text-xs text-text-secondary flex items-center justify-between">
        <span>
          ROP = Reorder Point (units)
        </span>
        <button className="flex items-center space-x-1 text-primary hover:underline">
          <Icon name="Download" size={12} />
          <span>Export Optimization Report</span>
        </button>
      </div>
    </div>
  );
};

export default ReorderOptimization;