import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const ProductDetailDrawer = ({ isOpen, product, onClose, onReorder }) => {
  const [reorderQuantity, setReorderQuantity] = useState(100);
  const [reorderNotes, setReorderNotes] = useState('');

  if (!isOpen || !product) return null;

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-GB');
  };

  const formatCurrency = (amount) => {
    return `₹${amount.toFixed(2)}`;
  };

  const getDaysUntilExpiry = () => {
    const today = new Date();
    const expiry = new Date(product.expiryDate);
    return Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));
  };

  const getStockLevel = () => {
    const percentage = (product.currentStock / product.maxStock) * 100;
    if (percentage <= 20) return { level: 'Critical', color: 'text-error' };
    if (percentage <= 40) return { level: 'Low', color: 'text-warning' };
    if (percentage <= 70) return { level: 'Moderate', color: 'text-secondary' };
    return { level: 'Good', color: 'text-success' };
  };

  const stockLevel = getStockLevel();
  const daysUntilExpiry = getDaysUntilExpiry();

  const handleReorder = () => {
    onReorder(product.id, reorderQuantity);
    setReorderQuantity(100);
    setReorderNotes('');
  };

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-modal"
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-lg bg-surface shadow-modal z-modal overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-text-primary">Product Details</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-md hover:bg-background transition-smooth"
            >
              <Icon name="X" size={20} />
            </button>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Basic Information */}
            <div className="card p-4">
              <h3 className="font-medium text-text-primary mb-3">Basic Information</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-text-secondary">Medicine Name:</span>
                  <span className="font-medium text-text-primary">{product.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Product ID:</span>
                  <span className="font-data text-text-primary">{product.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Category:</span>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    product.category === 'Prescription' ?'bg-primary/10 text-primary' :'bg-secondary/10 text-secondary'
                  }`}>
                    {product.category}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Batch Number:</span>
                  <span className="font-data text-text-primary">{product.batchNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Supplier:</span>
                  <span className="text-text-primary">{product.supplier}</span>
                </div>
              </div>
            </div>

            {/* Stock Information */}
            <div className="card p-4">
              <h3 className="font-medium text-text-primary mb-3">Stock Information</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-text-secondary">Current Stock:</span>
                  <div className="text-right">
                    <span className="font-medium text-text-primary text-lg">{product.currentStock}</span>
                    <div className={`text-sm ${stockLevel.color}`}>{stockLevel.level}</div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Min Stock: {product.minStock}</span>
                    <span>Max Stock: {product.maxStock}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full ${
                        product.currentStock <= product.minStock 
                          ? 'bg-error' 
                          : product.currentStock <= product.minStock * 1.5 
                          ? 'bg-warning' :'bg-success'
                      }`}
                      style={{
                        width: `${Math.min((product.currentStock / product.maxStock) * 100, 100)}%`
                      }}
                    />
                  </div>
                </div>

                <div className="flex justify-between">
                  <span className="text-text-secondary">Unit Price:</span>
                  <span className="font-medium text-text-primary">{formatCurrency(product.unitPrice)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Total Value:</span>
                  <span className="font-medium text-text-primary">{formatCurrency(product.totalValue)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Last Restocked:</span>
                  <span className="text-text-primary">{formatDate(product.lastRestocked)}</span>
                </div>
              </div>
            </div>

            {/* Expiry Information */}
            <div className="card p-4">
              <h3 className="font-medium text-text-primary mb-3">Expiry Information</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-text-secondary">Expiry Date:</span>
                  <span className={`font-medium ${
                    daysUntilExpiry <= 7 ? 'text-error' :
                    daysUntilExpiry <= 30 ? 'text-warning': 'text-text-primary'
                  }`}>
                    {formatDate(product.expiryDate)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Days Until Expiry:</span>
                  <span className={`font-medium ${
                    daysUntilExpiry <= 7 ? 'text-error' :
                    daysUntilExpiry <= 30 ? 'text-warning': 'text-success'
                  }`}>
                    {daysUntilExpiry} days
                  </span>
                </div>
                {daysUntilExpiry <= 30 && (
                  <div className={`p-3 rounded-md ${
                    daysUntilExpiry <= 7 ? 'bg-error/10 text-error' : 'bg-warning/10 text-warning'
                  }`}>
                    <div className="flex items-center space-x-2">
                      <Icon name="AlertTriangle" size={16} />
                      <span className="text-sm font-medium">
                        {daysUntilExpiry <= 7 ? 'Critical: Expires Soon' : 'Warning: Expiring Soon'}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Reorder Section */}
            <div className="card p-4">
              <h3 className="font-medium text-text-primary mb-3">Reorder Management</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    Reorder Quantity
                  </label>
                  <input
                    type="number"
                    value={reorderQuantity}
                    onChange={(e) => setReorderQuantity(parseInt(e.target.value) || 0)}
                    min="1"
                    max="1000"
                    className="w-full px-3 py-2 border border-border rounded-md bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  <p className="text-xs text-text-secondary mt-1">
                    Recommended: {product.maxStock - product.currentStock} units
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    Notes (Optional)
                  </label>
                  <textarea
                    value={reorderNotes}
                    onChange={(e) => setReorderNotes(e.target.value)}
                    rows={3}
                    placeholder="Add any special instructions..."
                    className="w-full px-3 py-2 border border-border rounded-md bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                  />
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={handleReorder}
                    className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-secondary transition-smooth"
                  >
                    <Icon name="ShoppingCart" size={16} />
                    <span>Place Reorder</span>
                  </button>
                  <button className="flex items-center justify-center space-x-2 px-4 py-2 border border-border rounded-md hover:bg-background transition-smooth">
                    <Icon name="Phone" size={16} />
                    <span>Contact Supplier</span>
                  </button>
                </div>

                <div className="text-xs text-text-secondary">
                  Estimated delivery: 3-5 business days
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="card p-4">
              <h3 className="font-medium text-text-primary mb-3">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-3">
                <button className="flex items-center justify-center space-x-2 px-3 py-2 border border-border rounded-md hover:bg-background transition-smooth">
                  <Icon name="Edit" size={16} />
                  <span className="text-sm">Edit Details</span>
                </button>
                <button className="flex items-center justify-center space-x-2 px-3 py-2 border border-border rounded-md hover:bg-background transition-smooth">
                  <Icon name="BarChart3" size={16} />
                  <span className="text-sm">View Analytics</span>
                </button>
                <button className="flex items-center justify-center space-x-2 px-3 py-2 border border-border rounded-md hover:bg-background transition-smooth">
                  <Icon name="FileText" size={16} />
                  <span className="text-sm">Generate Report</span>
                </button>
                <button className="flex items-center justify-center space-x-2 px-3 py-2 border border-border rounded-md hover:bg-background transition-smooth">
                  <Icon name="History" size={16} />
                  <span className="text-sm">View History</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetailDrawer;