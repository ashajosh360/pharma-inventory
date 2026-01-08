import React, { useState, useEffect } from "react";
import Icon from "components/AppIcon";

const FilterPanel = ({
  dateRange,
  selectedSuppliers,
  selectedCategories,
  comparisonMode,
  onDateRangeChange,
  onSupplierChange,
  onCategoryChange,
  onComparisonModeChange
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [suppliers, setSuppliers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [localDateRange, setLocalDateRange] = useState(dateRange);
  const [localSuppliers, setLocalSuppliers] = useState(selectedSuppliers);
  const [localCategories, setLocalCategories] = useState(selectedCategories);
  const [localComparisonMode, setLocalComparisonMode] = useState(comparisonMode);

  // Mock data for suppliers
  useEffect(() => {
    const mockSuppliers = [
      { id: "sup1", name: "PharmaCorp Inc.", reliability: 92 },
      { id: "sup2", name: "MediSource Ltd.", reliability: 87 },
      { id: "sup3", name: "HealthDirect Supplies", reliability: 95 },
      { id: "sup4", name: "Global Pharma Distributors", reliability: 83 },
      { id: "sup5", name: "MedEquip Solutions", reliability: 89 },
      { id: "sup6", name: "BioTech Pharmaceuticals", reliability: 91 },
      { id: "sup7", name: "PrecisionMed Supply Co.", reliability: 86 },
      { id: "sup8", name: "Vital Healthcare Products", reliability: 90 }
    ];
    setSuppliers(mockSuppliers);
  }, []);

  // Mock data for categories
  useEffect(() => {
    const mockCategories = [
      { id: "cat1", name: "Antibiotics", count: 124 },
      { id: "cat2", name: "Pain Management", count: 87 },
      { id: "cat3", name: "Cardiovascular", count: 103 },
      { id: "cat4", name: "Respiratory", count: 76 },
      { id: "cat5", name: "Gastrointestinal", count: 92 },
      { id: "cat6", name: "Diabetes Care", count: 68 },
      { id: "cat7", name: "Dermatology", count: 54 },
      { id: "cat8", name: "Vaccines", count: 41 }
    ];
    setCategories(mockCategories);
  }, []);

  // Preset date ranges
  const datePresets = [
    { label: "Last 30 Days", value: "30d" },
    { label: "Last Quarter", value: "quarter" },
    { label: "Year to Date", value: "ytd" },
    { label: "Last Fiscal Year", value: "fiscal" },
    { label: "Custom Range", value: "custom" }
  ];

  // Handle date preset selection
  const handleDatePreset = (preset) => {
    const now = new Date();
    let start = new Date();
    
    switch (preset) {
      case "30d":
        start = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 30);
        break;
      case "quarter":
        start = new Date(now.getFullYear(), now.getMonth() - 3, now.getDate());
        break;
      case "ytd":
        start = new Date(now.getFullYear(), 0, 1);
        break;
      case "fiscal":
        // Assuming fiscal year starts April 1
        const fiscalYearStart = new Date(now.getFullYear(), 3, 1);
        start = now >= fiscalYearStart 
          ? fiscalYearStart 
          : new Date(now.getFullYear() - 1, 3, 1);
        break;
      default:
        // Keep current selection for custom
        return;
    }
    
    setLocalDateRange({ start, end: now });
  };

  // Toggle supplier selection
  const toggleSupplier = (supplierId) => {
    setLocalSuppliers(prev => {
      if (prev.includes(supplierId)) {
        return prev.filter(id => id !== supplierId);
      } else {
        return [...prev, supplierId];
      }
    });
  };

  // Toggle category selection
  const toggleCategory = (categoryId) => {
    setLocalCategories(prev => {
      if (prev.includes(categoryId)) {
        return prev.filter(id => id !== categoryId);
      } else {
        return [...prev, categoryId];
      }
    });
  };

  // Apply filters
  const applyFilters = () => {
    onDateRangeChange(localDateRange);
    onSupplierChange(localSuppliers);
    onCategoryChange(localCategories);
    onComparisonModeChange(localComparisonMode);
    setIsExpanded(false);
  };

  // Reset filters
  const resetFilters = () => {
    setLocalDateRange({ start: new Date(2023, 0, 1), end: new Date() });
    setLocalSuppliers([]);
    setLocalCategories([]);
    setLocalComparisonMode("mom");
  };

  // Format date for display
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="bg-surface border-b border-border">
      <div className="container mx-auto px-4 py-3">
        {/* Filter Summary (Collapsed View) */}
        {!isExpanded && (
          <div className="flex flex-wrap items-center justify-between">
            <div className="flex flex-wrap items-center space-x-2 space-y-2 sm:space-y-0">
              <div className="flex items-center space-x-2 bg-background px-3 py-1.5 rounded-md border border-border">
                <Icon name="Calendar" size={16} className="text-primary" />
                <span className="text-sm text-text-primary">
                  {formatDate(dateRange.start)} - {formatDate(dateRange.end)}
                </span>
              </div>
              
              {selectedSuppliers.length > 0 && (
                <div className="flex items-center space-x-2 bg-background px-3 py-1.5 rounded-md border border-border">
                  <Icon name="Users" size={16} className="text-primary" />
                  <span className="text-sm text-text-primary">
                    {selectedSuppliers.length} supplier{selectedSuppliers.length !== 1 ? 's' : ''}
                  </span>
                </div>
              )}
              
              {selectedCategories.length > 0 && (
                <div className="flex items-center space-x-2 bg-background px-3 py-1.5 rounded-md border border-border">
                  <Icon name="Tag" size={16} className="text-primary" />
                  <span className="text-sm text-text-primary">
                    {selectedCategories.length} categor{selectedCategories.length !== 1 ? 'ies' : 'y'}
                  </span>
                </div>
              )}
              
              <div className="flex items-center space-x-2 bg-background px-3 py-1.5 rounded-md border border-border">
                <Icon name="BarChart2" size={16} className="text-primary" />
                <span className="text-sm text-text-primary">
                  {comparisonMode === "mom" ? "Month-over-Month" : "Year-over-Year"}
                </span>
              </div>
            </div>
            
            <button
              onClick={() => setIsExpanded(true)}
              className="flex items-center space-x-2 px-3 py-1.5 text-sm text-primary hover:bg-primary/5 rounded-md transition-colors"
            >
              <Icon name="SlidersHorizontal" size={16} />
              <span>Edit Filters</span>
            </button>
          </div>
        )}
        
        {/* Expanded Filter Panel */}
        {isExpanded && (
          <div className="py-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-text-primary">Filter Analytics</h3>
              <button
                onClick={() => setIsExpanded(false)}
                className="p-2 rounded-md hover:bg-background transition-colors"
              >
                <Icon name="X" size={18} className="text-text-secondary" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Date Range Section */}
              <div>
                <h4 className="text-sm font-medium text-text-primary mb-3">Date Range</h4>
                <div className="space-y-2">
                  {datePresets.map((preset) => (
                    <button
                      key={preset.value}
                      onClick={() => handleDatePreset(preset.value)}
                      className="w-full flex items-center justify-between px-3 py-2 text-sm rounded-md hover:bg-background transition-colors"
                    >
                      <span>{preset.label}</span>
                      {preset.value === "custom" && (
                        <Icon name="Calendar" size={16} className="text-text-secondary" />
                      )}
                    </button>
                  ))}
                  <div className="pt-2 space-y-2">
                    <div className="flex items-center space-x-2">
                      <div className="flex-1">
                        <label className="block text-xs text-text-secondary mb-1">Start Date</label>
                        <input
                          type="date"
                          value={localDateRange.start.toISOString().split('T')[0]}
                          onChange={(e) => setLocalDateRange(prev => ({ ...prev, start: new Date(e.target.value) }))}
                          className="w-full px-3 py-2 text-sm border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                        />
                      </div>
                      <div className="flex-1">
                        <label className="block text-xs text-text-secondary mb-1">End Date</label>
                        <input
                          type="date"
                          value={localDateRange.end.toISOString().split('T')[0]}
                          onChange={(e) => setLocalDateRange(prev => ({ ...prev, end: new Date(e.target.value) }))}
                          className="w-full px-3 py-2 text-sm border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Suppliers Section */}
              <div>
                <h4 className="text-sm font-medium text-text-primary mb-3">Suppliers</h4>
                <div className="relative">
                  <div className="mb-2">
                    <div className="flex items-center px-3 py-2 border border-border rounded-md">
                      <Icon name="Search" size={16} className="text-text-secondary mr-2" />
                      <input
                        type="text"
                        placeholder="Search suppliers..."
                        className="w-full text-sm bg-transparent focus:outline-none"
                      />
                    </div>
                  </div>
                  <div className="h-48 overflow-y-auto border border-border rounded-md">
                    {suppliers.map((supplier) => (
                      <div
                        key={supplier.id}
                        className="flex items-center px-3 py-2 hover:bg-background cursor-pointer"
                        onClick={() => toggleSupplier(supplier.id)}
                      >
                        <input
                          type="checkbox"
                          checked={localSuppliers.includes(supplier.id)}
                          onChange={() => {}}
                          className="mr-3"
                        />
                        <div className="flex-1">
                          <div className="text-sm text-text-primary">{supplier.name}</div>
                          <div className="text-xs text-text-secondary">Reliability: {supplier.reliability}%</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Categories Section */}
              <div>
                <h4 className="text-sm font-medium text-text-primary mb-3">Product Categories</h4>
                <div className="h-64 overflow-y-auto border border-border rounded-md">
                  {categories.map((category) => (
                    <div
                      key={category.id}
                      className="flex items-center px-3 py-2 hover:bg-background cursor-pointer"
                      onClick={() => toggleCategory(category.id)}
                    >
                      <input
                        type="checkbox"
                        checked={localCategories.includes(category.id)}
                        onChange={() => {}}
                        className="mr-3"
                      />
                      <div className="flex-1">
                        <div className="text-sm text-text-primary">{category.name}</div>
                        <div className="text-xs text-text-secondary">{category.count} products</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Comparison Mode & Actions */}
              <div>
                <h4 className="text-sm font-medium text-text-primary mb-3">Comparison Mode</h4>
                <div className="space-y-2 mb-6">
                  <button
                    onClick={() => setLocalComparisonMode("mom")}
                    className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-md transition-colors ${
                      localComparisonMode === "mom" ?"bg-primary/10 text-primary border border-primary" :"hover:bg-background border border-border"
                    }`}
                  >
                    <span>Month-over-Month</span>
                    {localComparisonMode === "mom" && <Icon name="Check" size={16} />}
                  </button>
                  <button
                    onClick={() => setLocalComparisonMode("yoy")}
                    className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-md transition-colors ${
                      localComparisonMode === "yoy" ?"bg-primary/10 text-primary border border-primary" :"hover:bg-background border border-border"
                    }`}
                  >
                    <span>Year-over-Year</span>
                    {localComparisonMode === "yoy" && <Icon name="Check" size={16} />}
                  </button>
                </div>
                
                <div className="space-y-2 pt-4 border-t border-border">
                  <button
                    onClick={applyFilters}
                    className="w-full flex items-center justify-center space-x-2 px-3 py-2 bg-primary text-white rounded-md hover:bg-secondary transition-colors"
                  >
                    <Icon name="Check" size={16} />
                    <span>Apply Filters</span>
                  </button>
                  <button
                    onClick={resetFilters}
                    className="w-full flex items-center justify-center space-x-2 px-3 py-2 border border-border text-text-secondary rounded-md hover:bg-background transition-colors"
                  >
                    <Icon name="RotateCcw" size={16} />
                    <span>Reset</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterPanel;