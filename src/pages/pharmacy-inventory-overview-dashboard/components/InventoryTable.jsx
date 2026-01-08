import React, { useState, useMemo } from 'react';
import Icon from 'components/AppIcon';

const InventoryTable = ({ data, onProductSelect }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [filterCategory, setFilterCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRows, setSelectedRows] = useState(new Set());

  const filteredAndSortedData = useMemo(() => {
    let filtered = data.filter(item => {
      const matchesCategory = filterCategory === 'all' || item.category === filterCategory;
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.batchNumber.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    if (sortConfig.key) {
      filtered.sort((a, b) => {
        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];

        if (sortConfig.key === 'expiryDate') {
          aValue = new Date(aValue);
          bValue = new Date(bValue);
        }

        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }, [data, sortConfig, filterCategory, searchTerm]);

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleRowSelect = (id) => {
    setSelectedRows(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handleSelectAll = () => {
    if (selectedRows.size === filteredAndSortedData.length) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(filteredAndSortedData.map(item => item.id)));
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'In Stock':
        return 'bg-success/10 text-success';
      case 'Low Stock':
        return 'bg-warning/10 text-warning';
      case 'Critical':
        return 'bg-error/10 text-error';
      case 'Out of Stock':
        return 'bg-error/20 text-error';
      case 'Near Expiry':
        return 'bg-warning/10 text-warning';
      case 'Reorder Pending':
        return 'bg-secondary/10 text-secondary';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const getExpiryWarning = (expiryDate) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const daysUntilExpiry = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));
    
    if (daysUntilExpiry <= 30) {
      return daysUntilExpiry <= 7 ? 'text-error' : 'text-warning';
    }
    return 'text-text-primary';
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-GB');
  };

  const formatCurrency = (amount) => {
    return `₹${amount.toFixed(2)}`;
  };

  return (
    <div className="space-y-4">
      {/* Table Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Icon name="Search" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" />
            <input
              type="text"
              placeholder="Search medicines..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-border rounded-md bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-3 py-2 border border-border rounded-md bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="all">All Categories</option>
            <option value="OTC">OTC</option>
            <option value="Prescription">Prescription</option>
          </select>
        </div>

        {selectedRows.size > 0 && (
          <div className="flex items-center space-x-2">
            <span className="text-sm text-text-secondary">
              {selectedRows.size} selected
            </span>
            <button className="flex items-center space-x-2 px-3 py-2 bg-primary text-white rounded-md hover:bg-secondary transition-smooth">
              <Icon name="ShoppingCart" size={16} />
              <span>Bulk Reorder</span>
            </button>
          </div>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4">
                <input
                  type="checkbox"
                  checked={selectedRows.size === filteredAndSortedData.length && filteredAndSortedData.length > 0}
                  onChange={handleSelectAll}
                  className="rounded border-border focus:ring-primary"
                />
              </th>
              {[
                { key: 'name', label: 'Medicine Name' },
                { key: 'category', label: 'Category' },
                { key: 'batchNumber', label: 'Batch' },
                { key: 'currentStock', label: 'Stock' },
                { key: 'expiryDate', label: 'Expiry Date' },
                { key: 'supplier', label: 'Supplier' },
                { key: 'totalValue', label: 'Value' },
                { key: 'status', label: 'Status' }
              ].map((column) => (
                <th
                  key={column.key}
                  className="text-left py-3 px-4 font-medium text-text-secondary cursor-pointer hover:text-text-primary transition-smooth"
                  onClick={() => handleSort(column.key)}
                >
                  <div className="flex items-center space-x-1">
                    <span>{column.label}</span>
                    {sortConfig.key === column.key && (
                      <Icon 
                        name={sortConfig.direction === 'asc' ? 'ChevronUp' : 'ChevronDown'} 
                        size={14} 
                      />
                    )}
                  </div>
                </th>
              ))}
              <th className="text-left py-3 px-4 font-medium text-text-secondary">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedData.map((item) => (
              <tr
                key={item.id}
                className="border-b border-border hover:bg-background transition-smooth cursor-pointer"
                onClick={() => onProductSelect(item)}
              >
                <td className="py-3 px-4" onClick={(e) => e.stopPropagation()}>
                  <input
                    type="checkbox"
                    checked={selectedRows.has(item.id)}
                    onChange={() => handleRowSelect(item.id)}
                    className="rounded border-border focus:ring-primary"
                  />
                </td>
                <td className="py-3 px-4">
                  <div>
                    <div className="font-medium text-text-primary">{item.name}</div>
                    <div className="text-sm text-text-secondary">{item.id}</div>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    item.category === 'Prescription' ?'bg-primary/10 text-primary' :'bg-secondary/10 text-secondary'
                  }`}>
                    {item.category}
                  </span>
                </td>
                <td className="py-3 px-4 text-sm font-data">{item.batchNumber}</td>
                <td className="py-3 px-4">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">{item.currentStock}</span>
                    <div className="w-16 h-2 bg-gray-200 rounded-full">
                      <div
                        className={`h-full rounded-full ${
                          item.currentStock <= item.minStock 
                            ? 'bg-error' 
                            : item.currentStock <= item.minStock * 1.5 
                            ? 'bg-warning' :'bg-success'
                        }`}
                        style={{
                          width: `${Math.min((item.currentStock / item.maxStock) * 100, 100)}%`
                        }}
                      />
                    </div>
                  </div>
                </td>
                <td className={`py-3 px-4 ${getExpiryWarning(item.expiryDate)}`}>
                  {formatDate(item.expiryDate)}
                </td>
                <td className="py-3 px-4 text-sm">{item.supplier}</td>
                <td className="py-3 px-4 font-medium">{formatCurrency(item.totalValue)}</td>
                <td className="py-3 px-4">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                    {item.status}
                  </span>
                </td>
                <td className="py-3 px-4" onClick={(e) => e.stopPropagation()}>
                  <div className="flex items-center space-x-2">
                    <button className="p-1 rounded-md hover:bg-background transition-smooth">
                      <Icon name="Eye" size={16} className="text-text-secondary" />
                    </button>
                    <button className="p-1 rounded-md hover:bg-background transition-smooth">
                      <Icon name="Edit" size={16} className="text-text-secondary" />
                    </button>
                    <button className="p-1 rounded-md hover:bg-background transition-smooth">
                      <Icon name="ShoppingCart" size={16} className="text-primary" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredAndSortedData.length === 0 && (
        <div className="text-center py-8">
          <Icon name="Package" size={48} className="text-text-secondary mx-auto mb-4" />
          <h3 className="text-lg font-medium text-text-primary mb-2">No medicines found</h3>
          <p className="text-text-secondary">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
};

export default InventoryTable;