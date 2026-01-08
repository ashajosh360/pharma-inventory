import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const ActionPriorityPanel = ({ data }) => {
  const [selectedAction, setSelectedAction] = useState(null);

  // Sort and prioritize items based on urgency, value, and stock levels
  const prioritizedItems = data
    .map(item => {
      const daysUntilExpiry = Math.ceil((item.expiryDate - new Date()) / (1000 * 60 * 60 * 24));
      const urgencyScore = daysUntilExpiry <= 7 ? 100 : daysUntilExpiry <= 30 ? 75 : 50;
      const valueScore = (item.totalValue / 1000) * 10; // Scale value impact
      const stockScore = item.stockQuantity > 100 ? 20 : 10;
      
      return {
        ...item,
        daysUntilExpiry,
        priorityScore: urgencyScore + valueScore + stockScore,
        recommendedAction: daysUntilExpiry <= 7 ? 'immediate_disposal' : 
                          daysUntilExpiry <= 30 ? 'return_supplier' : 'monitor_closely'
      };
    })
    .sort((a, b) => b.priorityScore - a.priorityScore)
    .slice(0, 10); // Top 10 priority items

  const getUrgencyColor = (urgencyLevel) => {
    switch (urgencyLevel) {
      case 'critical': return 'text-error bg-error/10 border-error';
      case 'high': return 'text-warning bg-warning/10 border-warning';
      case 'medium': return 'text-accent bg-accent/10 border-accent';
      default: return 'text-success bg-success/10 border-success';
    }
  };

  const getActionIcon = (action) => {
    switch (action) {
      case 'immediate_disposal': return 'Trash2';
      case 'return_supplier': return 'RotateCcw';
      case 'monitor_closely': return 'Eye';
      default: return 'AlertCircle';
    }
  };

  const getActionLabel = (action) => {
    switch (action) {
      case 'immediate_disposal': return 'Dispose Now';
      case 'return_supplier': return 'Return to Supplier';
      case 'monitor_closely': return 'Monitor Closely';
      default: return 'Review Required';
    }
  };

  const handleActionClick = (item, action) => {
    setSelectedAction({ item, action });
    console.log(`Action ${action} triggered for item:`, item);
    // Handle action implementation
  };

  const handleBulkAction = (action) => {
    const criticalItems = prioritizedItems.filter(item => item.urgencyLevel === 'critical');
    console.log(`Bulk ${action} for ${criticalItems.length} critical items`);
  };

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-text-primary mb-1">
            Priority Actions
          </h3>
          <p className="text-sm text-text-secondary">
            Ranked by urgency, impact, and stock levels
          </p>
        </div>
        
        <div className="relative">
          <button className="p-2 rounded-md border border-border hover:bg-background transition-smooth">
            <Icon name="MoreVertical" size={16} />
          </button>
        </div>
      </div>

      {/* Bulk Actions */}
      <div className="mb-6 p-4 bg-background rounded-md border border-border">
        <h4 className="text-sm font-medium text-text-primary mb-3">Quick Actions</h4>
        <div className="grid grid-cols-1 gap-2">
          <button
            onClick={() => handleBulkAction('dispose_critical')}
            className="flex items-center space-x-2 px-3 py-2 text-left text-error hover:bg-error/5 rounded-md transition-smooth"
          >
            <Icon name="Trash2" size={16} />
            <span className="text-sm">Dispose All Critical Items</span>
          </button>
          <button
            onClick={() => handleBulkAction('generate_disposal_report')}
            className="flex items-center space-x-2 px-3 py-2 text-left text-text-primary hover:bg-background rounded-md transition-smooth"
          >
            <Icon name="FileText" size={16} />
            <span className="text-sm">Generate Disposal Report</span>
          </button>
          <button
            onClick={() => handleBulkAction('notify_suppliers')}
            className="flex items-center space-x-2 px-3 py-2 text-left text-text-primary hover:bg-background rounded-md transition-smooth"
          >
            <Icon name="Mail" size={16} />
            <span className="text-sm">Notify Suppliers</span>
          </button>
        </div>
      </div>

      {/* Priority Items List */}
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {prioritizedItems.map((item, index) => (
          <div key={item.id} className="border border-border rounded-md p-4 hover:bg-background/50 transition-smooth">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-sm font-medium text-text-primary truncate">
                    {item.productName}
                  </span>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getUrgencyColor(item.urgencyLevel)}`}>
                    {item.urgencyLevel.toUpperCase()}
                  </span>
                </div>
                <div className="text-xs text-text-secondary space-y-1">
                  <div>Batch: {item.batchNumber}</div>
                  <div>Expires: {item.expiryDate.toLocaleDateString()}</div>
                  <div>Stock: {item.stockQuantity} units</div>
                  <div>Value: ₹{item.totalValue.toLocaleString()}</div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-lg font-bold text-text-primary">
                  {item.daysUntilExpiry}
                </div>
                <div className="text-xs text-text-secondary">days left</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-3 border-t border-border">
              <div className="flex items-center space-x-1">
                <Icon name={getActionIcon(item.recommendedAction)} size={14} className="text-text-secondary" />
                <span className="text-xs text-text-secondary">
                  {getActionLabel(item.recommendedAction)}
                </span>
              </div>
              
              <div className="flex items-center space-x-2">
                {item.recommendedAction === 'immediate_disposal' && (
                  <button
                    onClick={() => handleActionClick(item, 'dispose')}
                    className="px-3 py-1 text-xs bg-error text-white rounded-md hover:bg-error/90 transition-smooth"
                  >
                    Dispose
                  </button>
                )}
                {item.recommendedAction === 'return_supplier' && (
                  <button
                    onClick={() => handleActionClick(item, 'return')}
                    className="px-3 py-1 text-xs bg-warning text-white rounded-md hover:bg-warning/90 transition-smooth"
                  >
                    Return
                  </button>
                )}
                <button
                  onClick={() => handleActionClick(item, 'view_details')}
                  className="px-3 py-1 text-xs border border-border text-text-primary rounded-md hover:bg-background transition-smooth"
                >
                  Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Footer */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-error">
              {prioritizedItems.filter(item => item.urgencyLevel === 'critical').length}
            </div>
            <div className="text-xs text-text-secondary">Critical Actions</div>
          </div>
          <div>
            <div className="text-lg font-bold text-text-primary">
              ₹{prioritizedItems.reduce((sum, item) => sum + item.totalValue, 0).toLocaleString()}
            </div>
            <div className="text-xs text-text-secondary">Total Value</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActionPriorityPanel;