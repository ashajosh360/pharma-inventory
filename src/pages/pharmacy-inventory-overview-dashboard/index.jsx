import React, { useState, useEffect, useCallback } from 'react';
import Icon from 'components/AppIcon';
import KPICards from './components/KPICards';
import InventoryTable from './components/InventoryTable';
import InventoryDistributionChart from './components/InventoryDistributionChart';
import LowStockAlerts from './components/LowStockAlerts';
import ProductDetailDrawer from './components/ProductDetailDrawer';
import GlobalControls from './components/GlobalControls';

const PharmacyInventoryOverviewDashboard = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('main-pharmacy');
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [inventoryData, setInventoryData] = useState([]);
  const [kpiData, setKpiData] = useState({});
  const [lowStockItems, setLowStockItems] = useState([]);

  // Mock inventory data
  const mockInventoryData = [
    {
      id: 'MED001',
      name: 'Paracetamol 500mg',
      category: 'OTC',
      batchNumber: 'PCM2024001',
      currentStock: 150,
      minStock: 50,
      maxStock: 500,
      expiryDate: new Date('2024-12-15'),
      supplier: 'PharmaCorp Ltd',
      unitPrice: 2.50,
      totalValue: 375.00,
      lastRestocked: new Date('2024-01-15'),
      status: 'In Stock'
    },
    {
      id: 'MED002',
      name: 'Amoxicillin 250mg',
      category: 'Prescription',
      batchNumber: 'AMX2024002',
      currentStock: 25,
      minStock: 30,
      maxStock: 200,
      expiryDate: new Date('2024-03-20'),
      supplier: 'MediSupply Inc',
      unitPrice: 8.75,
      totalValue: 218.75,
      lastRestocked: new Date('2024-01-10'),
      status: 'Low Stock'
    },
    {
      id: 'MED003',
      name: 'Insulin Glargine 100IU',
      category: 'Prescription',
      batchNumber: 'INS2024003',
      currentStock: 2,
      minStock: 10,
      maxStock: 50,
      expiryDate: new Date('2024-06-30'),
      supplier: 'DiabetesCare Solutions',
      unitPrice: 45.00,
      totalValue: 90.00,
      lastRestocked: new Date('2024-01-05'),
      status: 'Critical'
    },
    {
      id: 'MED004',
      name: 'Ibuprofen 400mg',
      category: 'OTC',
      batchNumber: 'IBU2024004',
      currentStock: 0,
      minStock: 40,
      maxStock: 300,
      expiryDate: new Date('2024-08-15'),
      supplier: 'PharmaCorp Ltd',
      unitPrice: 3.25,
      totalValue: 0.00,
      lastRestocked: new Date('2024-01-01'),
      status: 'Out of Stock'
    },
    {
      id: 'MED005',
      name: 'Metformin 500mg',
      category: 'Prescription',
      batchNumber: 'MET2024005',
      currentStock: 85,
      minStock: 25,
      maxStock: 150,
      expiryDate: new Date('2024-02-28'),
      supplier: 'DiabetesCare Solutions',
      unitPrice: 1.80,
      totalValue: 153.00,
      lastRestocked: new Date('2024-01-12'),
      status: 'Near Expiry'
    },
    {
      id: 'MED006',
      name: 'Aspirin 75mg',
      category: 'OTC',
      batchNumber: 'ASP2024006',
      currentStock: 200,
      minStock: 60,
      maxStock: 400,
      expiryDate: new Date('2025-01-15'),
      supplier: 'CardioMed Supplies',
      unitPrice: 1.20,
      totalValue: 240.00,
      lastRestocked: new Date('2024-01-18'),
      status: 'In Stock'
    }
  ];

  const mockKPIData = {
    totalSKUs: 156,
    outOfStock: 12,
    nearExpiry: 8,
    inventoryTurnover: 4.2,
    totalValue: 125750.00,
    pendingReorders: 5
  };

  const mockLowStockItems = [
    {
      id: 'MED002',
      name: 'Amoxicillin 250mg',
      currentStock: 25,
      minStock: 30,
      supplier: 'MediSupply Inc',
      urgency: 'medium'
    },
    {
      id: 'MED003',
      name: 'Insulin Glargine 100IU',
      currentStock: 2,
      minStock: 10,
      supplier: 'DiabetesCare Solutions',
      urgency: 'high'
    },
    {
      id: 'MED007',
      name: 'Lisinopril 10mg',
      currentStock: 15,
      minStock: 20,
      supplier: 'CardioMed Supplies',
      urgency: 'low'
    }
  ];

  // Initialize data
  useEffect(() => {
    setInventoryData(mockInventoryData);
    setKpiData(mockKPIData);
    setLowStockItems(mockLowStockItems);
  }, []);

  // Auto-refresh functionality
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      setLastUpdated(new Date());
      // In a real app, this would fetch fresh data
      console.log('Auto-refreshing inventory data...');
    }, 15 * 60 * 1000); // 15 minutes

    return () => clearInterval(interval);
  }, [autoRefresh]);

  const handleProductSelect = useCallback((product) => {
    setSelectedProduct(product);
    setIsDrawerOpen(true);
  }, []);

  const handleCloseDrawer = useCallback(() => {
    setIsDrawerOpen(false);
    setSelectedProduct(null);
  }, []);

  const handleLocationChange = useCallback((location) => {
    setSelectedLocation(location);
    setLastUpdated(new Date());
    // In a real app, this would fetch data for the new location
  }, []);

  const handleAutoRefreshToggle = useCallback(() => {
    setAutoRefresh(prev => !prev);
  }, []);

  const handleReorderProduct = useCallback((productId, quantity) => {
    console.log(`Reordering product ${productId} with quantity ${quantity}`);
    // Update inventory data to reflect pending reorder
    setInventoryData(prev => 
      prev.map(item => 
        item.id === productId 
          ? { ...item, status: 'Reorder Pending' }
          : item
      )
    );
    setIsDrawerOpen(false);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="px-lg py-lg">
        {/* Global Controls */}
        <GlobalControls
          selectedLocation={selectedLocation}
          onLocationChange={handleLocationChange}
          autoRefresh={autoRefresh}
          onAutoRefreshToggle={handleAutoRefreshToggle}
          lastUpdated={lastUpdated}
        />

        {/* KPI Cards */}
        <div className="mb-8">
          <KPICards data={kpiData} />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-24 gap-6">
          {/* Main Inventory Table */}
          <div className="xl:col-span-16">
            <div className="card p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-text-primary">Medicine Inventory</h2>
                  <p className="text-sm text-text-secondary mt-1">
                    Real-time stock levels and expiry tracking
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <button className="flex items-center space-x-2 px-4 py-2 border border-border rounded-md hover:bg-background transition-smooth">
                    <Icon name="Download" size={16} />
                    <span className="text-sm">Export PDF</span>
                  </button>
                  <button className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-secondary transition-smooth">
                    <Icon name="Plus" size={16} />
                    <span className="text-sm">Add Medicine</span>
                  </button>
                </div>
              </div>
              
              <InventoryTable
                data={inventoryData}
                onProductSelect={handleProductSelect}
              />
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="xl:col-span-8 space-y-6">
            {/* Inventory Distribution Chart */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-text-primary mb-4">
                Inventory Distribution
              </h3>
              <InventoryDistributionChart data={inventoryData} />
            </div>

            {/* Low Stock Alerts */}
            <div className="card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-text-primary">
                  Low Stock Alerts
                </h3>
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-warning/10 text-warning">
                  {lowStockItems.length} Items
                </span>
              </div>
              <LowStockAlerts 
                items={lowStockItems}
                onItemSelect={handleProductSelect}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Product Detail Drawer */}
      <ProductDetailDrawer
        isOpen={isDrawerOpen}
        product={selectedProduct}
        onClose={handleCloseDrawer}
        onReorder={handleReorderProduct}
      />
    </div>
  );
};

export default PharmacyInventoryOverviewDashboard;