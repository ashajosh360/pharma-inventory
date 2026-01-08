import React, { useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "components/AppIcon";
import FilterPanel from "./components/FilterPanel";
import KpiMetricCard from "./components/KpiMetricCard";
import InventoryMovementChart from "./components/InventoryMovementChart";
import SupplierPerformance from "./components/SupplierPerformance";
import DemandForecastChart from "./components/DemandForecastChart";
import ReorderOptimization from "./components/ReorderOptimization";
import SeasonalPatternChart from "./components/SeasonalPatternChart";
import BookmarkPanel from "./components/BookmarkPanel";
import ExportPanel from "./components/ExportPanel";

const SupplyChainAnalyticsDashboard = () => {
  const navigate = useNavigate();
  const [dateRange, setDateRange] = useState({ start: new Date(2023, 0, 1), end: new Date() });
  const [selectedSuppliers, setSelectedSuppliers] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [comparisonMode, setComparisonMode] = useState("mom"); // mom = Month-over-Month, yoy = Year-over-Year
  const [isBookmarkPanelOpen, setIsBookmarkPanelOpen] = useState(false);
  const [isExportPanelOpen, setIsExportPanelOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("forecast");

  // Mock data for KPIs
  const kpiData = useMemo(() => [
    {
      id: "turnover-rate",
      title: "Inventory Turnover Rate",
      value: 4.8,
      change: 0.6,
      trend: [3.9, 4.1, 4.3, 4.5, 4.7, 4.8],
      format: "decimal",
      icon: "BarChart2",
      color: "primary",
    },
    {
      id: "lead-time",
      title: "Average Lead Time",
      value: 5.2,
      change: -0.8,
      trend: [6.5, 6.2, 5.9, 5.6, 5.4, 5.2],
      format: "days",
      icon: "Clock",
      color: "success",
    },
    {
      id: "cost-variance",
      title: "Cost Variance",
      value: 3.7,
      change: -1.2,
      trend: [5.2, 4.9, 4.5, 4.2, 3.9, 3.7],
      format: "percentage",
      icon: "DollarSign",
      color: "success",
    },
    {
      id: "supplier-score",
      title: "Supplier Performance",
      value: 87,
      change: 4,
      trend: [81, 82, 84, 85, 86, 87],
      format: "score",
      icon: "Award",
      color: "primary",
    },
  ], []);

  // Toggle bookmark panel
  const toggleBookmarkPanel = useCallback(() => {
    setIsBookmarkPanelOpen(prev => !prev);
    setIsExportPanelOpen(false);
  }, []);

  // Toggle export panel
  const toggleExportPanel = useCallback(() => {
    setIsExportPanelOpen(prev => !prev);
    setIsBookmarkPanelOpen(false);
  }, []);

  // Handle filter changes
  const handleDateRangeChange = useCallback((newRange) => {
    setDateRange(newRange);
  }, []);

  const handleSupplierChange = useCallback((suppliers) => {
    setSelectedSuppliers(suppliers);
  }, []);

  const handleCategoryChange = useCallback((categories) => {
    setSelectedCategories(categories);
  }, []);

  const handleComparisonModeChange = useCallback((mode) => {
    setComparisonMode(mode);
  }, []);

  // Handle tab changes for segmented analysis
  const handleTabChange = useCallback((tab) => {
    setActiveTab(tab);
  }, []);

  return (
    <div className="min-h-screen bg-background pb-16">
      {/* Page Header */}
      <div className="bg-surface border-b border-border">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
            <div>
              <h1 className="text-2xl font-bold text-text-primary">Supply Chain Analytics</h1>
              <p className="text-text-secondary mt-1">
                Optimize procurement decisions and supplier performance
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={toggleBookmarkPanel}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md border transition-colors ${
                  isBookmarkPanelOpen 
                    ? "border-primary bg-primary/10 text-primary" :"border-border hover:border-primary/50 text-text-secondary hover:text-primary"
                }`}
              >
                <Icon name="Bookmark" size={18} />
                <span className="hidden sm:inline">Saved Views</span>
              </button>
              
              <button
                onClick={toggleExportPanel}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md border transition-colors ${
                  isExportPanelOpen 
                    ? "border-primary bg-primary/10 text-primary" :"border-border hover:border-primary/50 text-text-secondary hover:text-primary"
                }`}
              >
                <Icon name="Download" size={18} />
                <span className="hidden sm:inline">Export</span>
              </button>
              
              <button
                onClick={() => navigate("/pharmacy-inventory-overview-dashboard")}
                className="flex items-center space-x-2 px-3 py-2 rounded-md border border-border hover:border-primary/50 text-text-secondary hover:text-primary transition-colors"
              >
                <Icon name="LayoutDashboard" size={18} />
                <span className="hidden sm:inline">Inventory Dashboard</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Panel */}
      <FilterPanel
        dateRange={dateRange}
        selectedSuppliers={selectedSuppliers}
        selectedCategories={selectedCategories}
        comparisonMode={comparisonMode}
        onDateRangeChange={handleDateRangeChange}
        onSupplierChange={handleSupplierChange}
        onCategoryChange={handleCategoryChange}
        onComparisonModeChange={handleComparisonModeChange}
      />

      {/* Bookmark Panel (Conditional) */}
      {isBookmarkPanelOpen && (
        <BookmarkPanel onClose={toggleBookmarkPanel} />
      )}

      {/* Export Panel (Conditional) */}
      {isExportPanelOpen && (
        <ExportPanel onClose={toggleExportPanel} />
      )}

      {/* Main Dashboard Content */}
      <div className="container mx-auto px-4 py-6">
        {/* KPI Metrics Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {kpiData.map((kpi) => (
            <KpiMetricCard key={kpi.id} {...kpi} />
          ))}
        </div>

        {/* Main Content Area - 2 Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
          {/* Main Visualization Area - 3/4 width on desktop */}
          <div className="lg:col-span-3">
            <div className="bg-surface border border-border rounded-md shadow-card p-4 h-full">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-text-primary">Inventory Movement & Cost Analysis</h2>
                <div className="flex items-center space-x-2">
                  <button className="p-2 rounded-md hover:bg-background transition-colors">
                    <Icon name="Filter" size={16} className="text-text-secondary" />
                  </button>
                  <button className="p-2 rounded-md hover:bg-background transition-colors">
                    <Icon name="Maximize2" size={16} className="text-text-secondary" />
                  </button>
                </div>
              </div>
              <InventoryMovementChart 
                dateRange={dateRange}
                selectedSuppliers={selectedSuppliers}
                selectedCategories={selectedCategories}
                comparisonMode={comparisonMode}
              />
            </div>
          </div>

          {/* Supplier Performance - 1/4 width on desktop */}
          <div className="lg:col-span-1">
            <div className="bg-surface border border-border rounded-md shadow-card p-4 h-full">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-text-primary">Supplier Performance</h2>
                <button className="p-2 rounded-md hover:bg-background transition-colors">
                  <Icon name="MoreHorizontal" size={16} className="text-text-secondary" />
                </button>
              </div>
              <SupplierPerformance 
                selectedSuppliers={selectedSuppliers}
                dateRange={dateRange}
              />
            </div>
          </div>
        </div>

        {/* Segmented Analysis Section */}
        <div className="bg-surface border border-border rounded-md shadow-card mb-6">
          <div className="border-b border-border">
            <div className="flex overflow-x-auto">
              <button
                onClick={() => handleTabChange("forecast")}
                className={`px-6 py-4 font-medium text-sm whitespace-nowrap transition-colors ${
                  activeTab === "forecast"
                    ? "border-b-2 border-primary text-primary" :"text-text-secondary hover:text-primary"
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Icon name="TrendingUp" size={16} />
                  <span>Demand Forecasting</span>
                </div>
              </button>
              <button
                onClick={() => handleTabChange("reorder")}
                className={`px-6 py-4 font-medium text-sm whitespace-nowrap transition-colors ${
                  activeTab === "reorder" ?"border-b-2 border-primary text-primary" :"text-text-secondary hover:text-primary"
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Icon name="RefreshCw" size={16} />
                  <span>Reorder Optimization</span>
                </div>
              </button>
              <button
                onClick={() => handleTabChange("seasonal")}
                className={`px-6 py-4 font-medium text-sm whitespace-nowrap transition-colors ${
                  activeTab === "seasonal" ?"border-b-2 border-primary text-primary" :"text-text-secondary hover:text-primary"
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Icon name="Calendar" size={16} />
                  <span>Seasonal Patterns</span>
                </div>
              </button>
            </div>
          </div>
          
          <div className="p-6">
            {activeTab === "forecast" && <DemandForecastChart dateRange={dateRange} selectedCategories={selectedCategories} />}
            {activeTab === "reorder" && <ReorderOptimization dateRange={dateRange} selectedSuppliers={selectedSuppliers} />}
            {activeTab === "seasonal" && <SeasonalPatternChart dateRange={dateRange} selectedCategories={selectedCategories} />}
          </div>
        </div>

        {/* Data Refresh Information */}
        <div className="flex items-center justify-between text-xs text-text-secondary">
          <div className="flex items-center space-x-2">
            <Icon name="RefreshCw" size={12} />
            <span>Last updated: {new Date().toLocaleString()}</span>
          </div>
          <div>
            <span>Data refreshes nightly at 2:00 AM</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplyChainAnalyticsDashboard;