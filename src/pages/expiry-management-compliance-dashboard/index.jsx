import React, { useState, useEffect } from 'react';
import Icon from 'components/AppIcon';
import ExpiryTimeline from './components/ExpiryTimeline';
import ActionPriorityPanel from './components/ActionPriorityPanel';
import ExpiryTable from './components/ExpiryTable';
import ComplianceMetrics from './components/ComplianceMetrics';

const ExpiryManagementComplianceDashboard = () => {
  const [dateRange, setDateRange] = useState('30');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [batchSearch, setBatchSearch] = useState('');
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Mock data for expiry management
  const expiryData = [
    {
      id: 1,
      productName: "Amoxicillin 500mg",
      batchNumber: "AMX2024001",
      expiryDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      stockQuantity: 150,
      category: "Antibiotics",
      supplier: "PharmaCorp Ltd",
      purchaseDate: new Date('2023-08-15'),
      unitCost: 2.50,
      totalValue: 375.00,
      urgencyLevel: "critical",
      disposalRequired: true,
      complianceStatus: "action_required"
    },
    {
      id: 2,
      productName: "Ibuprofen 400mg",
      batchNumber: "IBU2024002",
      expiryDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
      stockQuantity: 300,
      category: "Pain Relief",
      supplier: "MediSupply Inc",
      purchaseDate: new Date('2023-09-20'),
      unitCost: 1.25,
      totalValue: 375.00,
      urgencyLevel: "high",
      disposalRequired: false,
      complianceStatus: "monitored"
    },
    {
      id: 3,
      productName: "Insulin Glargine",
      batchNumber: "INS2024003",
      expiryDate: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000),
      stockQuantity: 50,
      category: "Diabetes",
      supplier: "BioMed Solutions",
      purchaseDate: new Date('2023-10-10'),
      unitCost: 45.00,
      totalValue: 2250.00,
      urgencyLevel: "medium",
      disposalRequired: false,
      complianceStatus: "compliant"
    },
    {
      id: 4,
      productName: "Lisinopril 10mg",
      batchNumber: "LIS2024004",
      expiryDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
      stockQuantity: 200,
      category: "Cardiovascular",
      supplier: "CardioMeds Ltd",
      purchaseDate: new Date('2023-11-05'),
      unitCost: 3.75,
      totalValue: 750.00,
      urgencyLevel: "low",
      disposalRequired: false,
      complianceStatus: "compliant"
    },
    {
      id: 5,
      productName: "Metformin 850mg",
      batchNumber: "MET2024005",
      expiryDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
      stockQuantity: 400,
      category: "Diabetes",
      supplier: "DiabetesCare Inc",
      purchaseDate: new Date('2023-12-01'),
      unitCost: 1.80,
      totalValue: 720.00,
      urgencyLevel: "low",
      disposalRequired: false,
      complianceStatus: "compliant"
    }
  ];

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'Antibiotics', label: 'Antibiotics' },
    { value: 'Pain Relief', label: 'Pain Relief' },
    { value: 'Diabetes', label: 'Diabetes' },
    { value: 'Cardiovascular', label: 'Cardiovascular' }
  ];

  const dateRangeOptions = [
    { value: '30', label: 'Next 30 Days' },
    { value: '60', label: 'Next 60 Days' },
    { value: '90', label: 'Next 90 Days' }
  ];

  // Filter data based on selected criteria
  const filteredData = expiryData.filter(item => {
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    const matchesBatch = batchSearch === '' || item.batchNumber.toLowerCase().includes(batchSearch.toLowerCase());
    const daysUntilExpiry = Math.ceil((item.expiryDate - new Date()) / (1000 * 60 * 60 * 24));
    const matchesDateRange = daysUntilExpiry <= parseInt(dateRange);
    
    return matchesCategory && matchesBatch && matchesDateRange;
  });

  // Calculate compliance metrics
  const complianceMetrics = {
    expiring7Days: expiryData.filter(item => {
      const daysUntilExpiry = Math.ceil((item.expiryDate - new Date()) / (1000 * 60 * 60 * 24));
      return daysUntilExpiry <= 7;
    }).length,
    expiring30Days: expiryData.filter(item => {
      const daysUntilExpiry = Math.ceil((item.expiryDate - new Date()) / (1000 * 60 * 60 * 24));
      return daysUntilExpiry <= 30;
    }).length,
    expiredItems: expiryData.filter(item => item.expiryDate < new Date()).length,
    complianceScore: 87.5,
    complianceTrend: 2.3
  };

  const handleExportReport = () => {
    console.log('Exporting compliance report...');
    // Generate PDF report functionality
  };

  const handleRefreshData = () => {
    setLastUpdated(new Date());
    console.log('Refreshing expiry data...');
  };

  useEffect(() => {
    // Auto-refresh data every hour
    const interval = setInterval(() => {
      setLastUpdated(new Date());
    }, 3600000); // 1 hour

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="px-lg py-lg">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-text-primary mb-2">
                Expiry Management & Compliance
              </h1>
              <p className="text-text-secondary">
                Monitor medication expiry dates and ensure regulatory compliance
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-sm text-text-secondary">
                Last updated: {lastUpdated.toLocaleTimeString()}
              </div>
              <button
                onClick={handleRefreshData}
                className="p-2 rounded-md border border-border hover:bg-background transition-smooth"
              >
                <Icon name="RefreshCw" size={16} />
              </button>
              <button
                onClick={handleExportReport}
                className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-secondary transition-smooth"
              >
                <Icon name="Download" size={16} />
                <span>Export Report</span>
              </button>
            </div>
          </div>

          {/* Filter Controls */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-surface rounded-md border border-border">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Date Range
              </label>
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-md bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                {dateRangeOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Product Category
              </label>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-md bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Batch Number Search
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={batchSearch}
                  onChange={(e) => setBatchSearch(e.target.value)}
                  placeholder="Search batch number..."
                  className="w-full px-3 py-2 pl-10 border border-border rounded-md bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <Icon name="Search" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" />
              </div>
            </div>
          </div>
        </div>

        {/* Compliance Metrics */}
        <ComplianceMetrics metrics={complianceMetrics} />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 mb-8">
          {/* Timeline Visualization */}
          <div className="xl:col-span-8">
            <ExpiryTimeline data={filteredData} dateRange={parseInt(dateRange)} />
          </div>
          
          {/* Action Priority Panel */}
          <div className="xl:col-span-4">
            <ActionPriorityPanel data={filteredData} />
          </div>
        </div>

        {/* Detailed Expiry Table */}
        <ExpiryTable data={filteredData} />
      </div>
    </div>
  );
};

export default ExpiryManagementComplianceDashboard;