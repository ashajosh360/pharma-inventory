import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const ExpiryTable = ({ data }) => {
  const [sortField, setSortField] = useState('expiryDate');
  const [sortDirection, setSortDirection] = useState('asc');
  const [selectedRows, setSelectedRows] = useState(new Set());
  const [showAuditTrail, setShowAuditTrail] = useState(null);

  // Mock audit trail data
  const auditTrailData = {
    1: [
      {
        id: 1,
        action: "Stock Received",
        timestamp: new Date('2023-08-15T10:30:00'),
        user: "Dr. Johnson",
        details: "Initial stock receipt from PharmaCorp Ltd",
        batchNumber: "AMX2024001",
        quantity: 150
      },
      {
        id: 2,
        action: "Quality Check",
        timestamp: new Date('2023-08-15T14:20:00'),
        user: "QA Team",
        details: "Quality verification completed - Passed",
        batchNumber: "AMX2024001",
        quantity: 150
      },
      {
        id: 3,
        action: "Expiry Alert Generated",
        timestamp: new Date(),
        user: "System",
        details: "Automated expiry warning - 5 days remaining",
        batchNumber: "AMX2024001",
        quantity: 150
      }
    ]
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedData = [...data].sort((a, b) => {
    let aValue = a[sortField];
    let bValue = b[sortField];
    
    if (sortField === 'expiryDate') {
      aValue = new Date(aValue);
      bValue = new Date(bValue);
    }
    
    if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const handleRowSelect = (id) => {
    const newSelected = new Set(selectedRows);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedRows(newSelected);
  };

  const handleSelectAll = () => {
    if (selectedRows.size === data.length) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(data.map(item => item.id)));
    }
  };

  const getDaysUntilExpiry = (expiryDate) => {
    return Math.ceil((expiryDate - new Date()) / (1000 * 60 * 60 * 24));
  };

  const getExpiryStatus = (daysUntilExpiry) => {
    if (daysUntilExpiry <= 0) return { label: 'Expired', color: 'text-error bg-error/10 border-error' };
    if (daysUntilExpiry <= 7) return { label: 'Critical', color: 'text-error bg-error/10 border-error' };
    if (daysUntilExpiry <= 30) return { label: 'Warning', color: 'text-warning bg-warning/10 border-warning' };
    if (daysUntilExpiry <= 90) return { label: 'Monitor', color: 'text-accent bg-accent/10 border-accent' };
    return { label: 'Good', color: 'text-success bg-success/10 border-success' };
  };

  const getComplianceStatus = (status) => {
    switch (status) {
      case 'compliant':
        return { label: 'Compliant', color: 'text-success bg-success/10 border-success' };
      case 'monitored':
        return { label: 'Monitored', color: 'text-warning bg-warning/10 border-warning' };
      case 'action_required':
        return { label: 'Action Required', color: 'text-error bg-error/10 border-error' };
      default:
        return { label: 'Unknown', color: 'text-text-secondary bg-background border-border' };
    }
  };

  const handleBulkAction = (action) => {
    const selectedItems = data.filter(item => selectedRows.has(item.id));
    console.log(`Bulk ${action} for ${selectedItems.length} items:`, selectedItems);
  };

  const toggleAuditTrail = (itemId) => {
    setShowAuditTrail(showAuditTrail === itemId ? null : itemId);
  };

  const SortIcon = ({ field }) => {
    if (sortField !== field) return <Icon name="ArrowUpDown" size={14} className="text-text-secondary" />;
    return (
      <Icon 
        name={sortDirection === 'asc' ? "ArrowUp" : "ArrowDown"} 
        size={14} 
        className="text-primary" 
      />
    );
  };

  return (
    <div className="card">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-text-primary mb-1">
              Detailed Expiry Tracking
            </h3>
            <p className="text-sm text-text-secondary">
              Comprehensive batch-level medication expiry management
            </p>
          </div>
          
          {selectedRows.size > 0 && (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-text-secondary">
                {selectedRows.size} selected
              </span>
              <button
                onClick={() => handleBulkAction('dispose')}
                className="px-3 py-1 text-sm bg-error text-white rounded-md hover:bg-error/90 transition-smooth"
              >
                Bulk Dispose
              </button>
              <button
                onClick={() => handleBulkAction('return')}
                className="px-3 py-1 text-sm bg-warning text-white rounded-md hover:bg-warning/90 transition-smooth"
              >
                Bulk Return
              </button>
              <button
                onClick={() => handleBulkAction('export')}
                className="px-3 py-1 text-sm border border-border text-text-primary rounded-md hover:bg-background transition-smooth"
              >
                Export Selected
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-background border-b border-border">
            <tr>
              <th className="px-6 py-4 text-left">
                <input
                  type="checkbox"
                  checked={selectedRows.size === data.length && data.length > 0}
                  onChange={handleSelectAll}
                  className="rounded border-border text-primary focus:ring-primary"
                />
              </th>
              <th 
                className="px-6 py-4 text-left text-sm font-medium text-text-primary cursor-pointer hover:bg-background/50 transition-smooth"
                onClick={() => handleSort('productName')}
              >
                <div className="flex items-center space-x-2">
                  <span>Product Name</span>
                  <SortIcon field="productName" />
                </div>
              </th>
              <th 
                className="px-6 py-4 text-left text-sm font-medium text-text-primary cursor-pointer hover:bg-background/50 transition-smooth"
                onClick={() => handleSort('batchNumber')}
              >
                <div className="flex items-center space-x-2">
                  <span>Batch Number</span>
                  <SortIcon field="batchNumber" />
                </div>
              </th>
              <th 
                className="px-6 py-4 text-left text-sm font-medium text-text-primary cursor-pointer hover:bg-background/50 transition-smooth"
                onClick={() => handleSort('expiryDate')}
              >
                <div className="flex items-center space-x-2">
                  <span>Expiry Date</span>
                  <SortIcon field="expiryDate" />
                </div>
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-text-primary">
                Days Left
              </th>
              <th 
                className="px-6 py-4 text-left text-sm font-medium text-text-primary cursor-pointer hover:bg-background/50 transition-smooth"
                onClick={() => handleSort('stockQuantity')}
              >
                <div className="flex items-center space-x-2">
                  <span>Stock Qty</span>
                  <SortIcon field="stockQuantity" />
                </div>
              </th>
              <th 
                className="px-6 py-4 text-left text-sm font-medium text-text-primary cursor-pointer hover:bg-background/50 transition-smooth"
                onClick={() => handleSort('supplier')}
              >
                <div className="flex items-center space-x-2">
                  <span>Supplier</span>
                  <SortIcon field="supplier" />
                </div>
              </th>
              <th 
                className="px-6 py-4 text-left text-sm font-medium text-text-primary cursor-pointer hover:bg-background/50 transition-smooth"
                onClick={() => handleSort('totalValue')}
              >
                <div className="flex items-center space-x-2">
                  <span>Value</span>
                  <SortIcon field="totalValue" />
                </div>
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-text-primary">
                Status
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-text-primary">
                Compliance
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-text-primary">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {sortedData.map((item) => {
              const daysUntilExpiry = getDaysUntilExpiry(item.expiryDate);
              const expiryStatus = getExpiryStatus(daysUntilExpiry);
              const complianceStatus = getComplianceStatus(item.complianceStatus);
              
              return (
                <React.Fragment key={item.id}>
                  <tr className={`hover:bg-background/50 transition-smooth ${selectedRows.has(item.id) ? 'bg-primary/5' : ''}`}>
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedRows.has(item.id)}
                        onChange={() => handleRowSelect(item.id)}
                        className="rounded border-border text-primary focus:ring-primary"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium text-text-primary">{item.productName}</div>
                        <div className="text-sm text-text-secondary">{item.category}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-data text-sm text-text-primary">{item.batchNumber}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-text-primary">{item.expiryDate.toLocaleDateString()}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${expiryStatus.color}`}>
                        {daysUntilExpiry > 0 ? `${daysUntilExpiry} days` : 'Expired'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-text-primary">{item.stockQuantity} units</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-text-primary">{item.supplier}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-text-primary">₹{item.totalValue.toLocaleString()}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${expiryStatus.color}`}>
                        {expiryStatus.label}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${complianceStatus.color}`}>
                        {complianceStatus.label}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => toggleAuditTrail(item.id)}
                          className="p-1 rounded-md hover:bg-background transition-smooth"
                          title="View Audit Trail"
                        >
                          <Icon name="FileText" size={16} className="text-text-secondary" />
                        </button>
                        {item.disposalRequired && (
                          <button
                            onClick={() => console.log('Dispose item:', item.id)}
                            className="p-1 rounded-md hover:bg-error/10 transition-smooth"
                            title="Dispose Item"
                          >
                            <Icon name="Trash2" size={16} className="text-error" />
                          </button>
                        )}
                        <button
                          onClick={() => console.log('Return to supplier:', item.id)}
                          className="p-1 rounded-md hover:bg-warning/10 transition-smooth"
                          title="Return to Supplier"
                        >
                          <Icon name="RotateCcw" size={16} className="text-warning" />
                        </button>
                      </div>
                    </td>
                  </tr>
                  
                  {/* Audit Trail Expansion */}
                  {showAuditTrail === item.id && auditTrailData[item.id] && (
                    <tr>
                      <td colSpan="11" className="px-6 py-4 bg-background/50">
                        <div className="border border-border rounded-md p-4">
                          <h4 className="font-medium text-text-primary mb-3 flex items-center space-x-2">
                            <Icon name="Clock" size={16} />
                            <span>Audit Trail - {item.productName}</span>
                          </h4>
                          <div className="space-y-3">
                            {auditTrailData[item.id].map((entry) => (
                              <div key={entry.id} className="flex items-start space-x-3 pb-3 border-b border-border last:border-b-0">
                                <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                                <div className="flex-1">
                                  <div className="flex items-center justify-between mb-1">
                                    <span className="font-medium text-sm text-text-primary">{entry.action}</span>
                                    <span className="text-xs text-text-secondary">{entry.timestamp.toLocaleString()}</span>
                                  </div>
                                  <p className="text-sm text-text-secondary mb-1">{entry.details}</p>
                                  <div className="text-xs text-text-secondary">
                                    By: {entry.user} | Batch: {entry.batchNumber} | Qty: {entry.quantity}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>

      {data.length === 0 && (
        <div className="p-12 text-center">
          <Icon name="Package" size={48} className="text-text-secondary mx-auto mb-4" />
          <h3 className="text-lg font-medium text-text-primary mb-2">No Expiry Data</h3>
          <p className="text-text-secondary">No medications found matching the current filters.</p>
        </div>
      )}
    </div>
  );
};

export default ExpiryTable;