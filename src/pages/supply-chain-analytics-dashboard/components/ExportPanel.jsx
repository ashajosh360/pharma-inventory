import React, { useState } from "react";
import Icon from "components/AppIcon";

const ExportPanel = ({ onClose }) => {
  const [exportFormat, setExportFormat] = useState("pdf");
  const [exportOptions, setExportOptions] = useState({
    includeCharts: true,
    includeSupplierPerformance: true,
    includeForecastData: true,
    includeReorderRecommendations: true,
    includeSeasonalAnalysis: true,
    includeRawData: false
  });
  const [exportName, setExportName] = useState("Supply Chain Analysis Report");
  const [isExporting, setIsExporting] = useState(false);

  // Handle checkbox change
  const handleOptionChange = (option) => {
    setExportOptions(prev => ({
      ...prev,
      [option]: !prev[option]
    }));
  };

  // Handle export
  const handleExport = () => {
    setIsExporting(true);
    
    // Simulate export process
    setTimeout(() => {
      console.log("Exporting report:", {
        name: exportName,
        format: exportFormat,
        options: exportOptions
      });
      
      setIsExporting(false);
      onClose();
      
      // In a real app, this would trigger the actual export
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-modal flex items-start justify-center pt-20 px-4">
      <div className="absolute inset-0 bg-text-primary opacity-25" onClick={onClose}></div>
      <div className="relative bg-surface rounded-lg shadow-modal border border-border w-full max-w-xl">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h3 className="text-lg font-medium text-text-primary">Export Report</h3>
          <button
            onClick={onClose}
            className="p-2 rounded-md hover:bg-background transition-colors"
          >
            <Icon name="X" size={20} className="text-text-secondary" />
          </button>
        </div>
        
        <div className="p-4">
          {/* Report Name */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-text-primary mb-1">
              Report Name
            </label>
            <input
              type="text"
              value={exportName}
              onChange={(e) => setExportName(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          
          {/* Export Format */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-text-primary mb-2">
              Export Format
            </label>
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => setExportFormat("pdf")}
                className={`flex flex-col items-center justify-center p-3 border rounded-md transition-colors ${
                  exportFormat === "pdf" ?"border-primary bg-primary/5 text-primary" :"border-border hover:border-primary/30"
                }`}
              >
                <Icon name="FileText" size={24} className={exportFormat === "pdf" ? "text-primary" : "text-text-secondary"} />
                <span className="mt-1 text-sm">PDF</span>
              </button>
              <button
                onClick={() => setExportFormat("excel")}
                className={`flex flex-col items-center justify-center p-3 border rounded-md transition-colors ${
                  exportFormat === "excel" ?"border-primary bg-primary/5 text-primary" :"border-border hover:border-primary/30"
                }`}
              >
                <Icon name="FileSpreadsheet" size={24} className={exportFormat === "excel" ? "text-primary" : "text-text-secondary"} />
                <span className="mt-1 text-sm">Excel</span>
              </button>
              <button
                onClick={() => setExportFormat("csv")}
                className={`flex flex-col items-center justify-center p-3 border rounded-md transition-colors ${
                  exportFormat === "csv" ?"border-primary bg-primary/5 text-primary" :"border-border hover:border-primary/30"
                }`}
              >
                <Icon name="FileText" size={24} className={exportFormat === "csv" ? "text-primary" : "text-text-secondary"} />
                <span className="mt-1 text-sm">CSV</span>
              </button>
            </div>
          </div>
          
          {/* Export Options */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-text-primary mb-2">
              Report Sections
            </label>
            <div className="space-y-2 border border-border rounded-md p-3">
              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2 text-sm text-text-primary cursor-pointer">
                  <input
                    type="checkbox"
                    checked={exportOptions.includeCharts}
                    onChange={() => handleOptionChange("includeCharts")}
                    className="rounded text-primary focus:ring-primary"
                  />
                  <span>Inventory Movement Charts</span>
                </label>
                <Icon name="BarChart2" size={16} className="text-text-secondary" />
              </div>
              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2 text-sm text-text-primary cursor-pointer">
                  <input
                    type="checkbox"
                    checked={exportOptions.includeSupplierPerformance}
                    onChange={() => handleOptionChange("includeSupplierPerformance")}
                    className="rounded text-primary focus:ring-primary"
                  />
                  <span>Supplier Performance Analysis</span>
                </label>
                <Icon name="Users" size={16} className="text-text-secondary" />
              </div>
              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2 text-sm text-text-primary cursor-pointer">
                  <input
                    type="checkbox"
                    checked={exportOptions.includeForecastData}
                    onChange={() => handleOptionChange("includeForecastData")}
                    className="rounded text-primary focus:ring-primary"
                  />
                  <span>Demand Forecast Data</span>
                </label>
                <Icon name="TrendingUp" size={16} className="text-text-secondary" />
              </div>
              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2 text-sm text-text-primary cursor-pointer">
                  <input
                    type="checkbox"
                    checked={exportOptions.includeReorderRecommendations}
                    onChange={() => handleOptionChange("includeReorderRecommendations")}
                    className="rounded text-primary focus:ring-primary"
                  />
                  <span>Reorder Point Recommendations</span>
                </label>
                <Icon name="RefreshCw" size={16} className="text-text-secondary" />
              </div>
              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2 text-sm text-text-primary cursor-pointer">
                  <input
                    type="checkbox"
                    checked={exportOptions.includeSeasonalAnalysis}
                    onChange={() => handleOptionChange("includeSeasonalAnalysis")}
                    className="rounded text-primary focus:ring-primary"
                  />
                  <span>Seasonal Pattern Analysis</span>
                </label>
                <Icon name="Calendar" size={16} className="text-text-secondary" />
              </div>
              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2 text-sm text-text-primary cursor-pointer">
                  <input
                    type="checkbox"
                    checked={exportOptions.includeRawData}
                    onChange={() => handleOptionChange("includeRawData")}
                    className="rounded text-primary focus:ring-primary"
                  />
                  <span>Raw Data Tables</span>
                </label>
                <Icon name="Table" size={16} className="text-text-secondary" />
              </div>
            </div>
          </div>
          
          {/* Export Templates */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-text-primary mb-2">
              Report Templates
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button className="flex items-center space-x-2 p-3 border border-border rounded-md hover:border-primary/30 transition-colors">
                <Icon name="FileText" size={16} className="text-text-secondary" />
                <div className="text-left">
                  <div className="text-sm text-text-primary">Executive Summary</div>
                  <div className="text-xs text-text-secondary">Concise overview for management</div>
                </div>
              </button>
              <button className="flex items-center space-x-2 p-3 border border-border rounded-md hover:border-primary/30 transition-colors">
                <Icon name="FileText" size={16} className="text-text-secondary" />
                <div className="text-left">
                  <div className="text-sm text-text-primary">Detailed Analysis</div>
                  <div className="text-xs text-text-secondary">Comprehensive data with insights</div>
                </div>
              </button>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex items-center justify-end space-x-3 mt-6">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm border border-border text-text-secondary rounded-md hover:bg-background transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleExport}
              disabled={isExporting}
              className="flex items-center space-x-2 px-4 py-2 text-sm bg-primary text-white rounded-md hover:bg-secondary transition-colors disabled:opacity-70"
            >
              {isExporting ? (
                <>
                  <Icon name="Loader" size={16} className="animate-spin" />
                  <span>Exporting...</span>
                </>
              ) : (
                <>
                  <Icon name="Download" size={16} />
                  <span>Export Report</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportPanel;