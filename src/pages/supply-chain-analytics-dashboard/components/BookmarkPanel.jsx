import React, { useState, useEffect } from "react";
import Icon from "components/AppIcon";

const BookmarkPanel = ({ onClose }) => {
  const [savedViews, setSavedViews] = useState([]);
  const [newViewName, setNewViewName] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  // Load mock saved views
  useEffect(() => {
    const mockSavedViews = [
      {
        id: "view1",
        name: "Q1 Supplier Performance",
        description: "Supplier performance analysis for Q1 2023",
        filters: {
          dateRange: "Q1 2023",
          suppliers: "All Suppliers",
          categories: "All Categories",
          comparisonMode: "YoY"
        },
        createdAt: "2023-04-15",
        isDefault: true
      },
      {
        id: "view2",
        name: "Antibiotics Supply Chain",
        description: "Supply chain analysis for antibiotics category",
        filters: {
          dateRange: "Last 12 months",
          suppliers: "PharmaCorp, MediSource",
          categories: "Antibiotics",
          comparisonMode: "MoM"
        },
        createdAt: "2023-06-22",
        isDefault: false
      },
      {
        id: "view3",
        name: "Critical Suppliers Review",
        description: "Performance review of top 3 suppliers",
        filters: {
          dateRange: "YTD",
          suppliers: "PharmaCorp, HealthDirect, BioTech",
          categories: "All Categories",
          comparisonMode: "YoY"
        },
        createdAt: "2023-08-10",
        isDefault: false
      }
    ];
    
    setSavedViews(mockSavedViews);
  }, []);

  // Handle save new view
  const handleSaveView = () => {
    if (!newViewName.trim()) return;
    
    const newView = {
      id: `view${Date.now()}`,
      name: newViewName.trim(),
      description: "Current view configuration",
      filters: {
        dateRange: "Custom",
        suppliers: "Current Selection",
        categories: "Current Selection",
        comparisonMode: "Current Setting"
      },
      createdAt: new Date().toISOString().split('T')[0],
      isDefault: false
    };
    
    setSavedViews([...savedViews, newView]);
    setNewViewName("");
    setIsCreating(false);
  };

  // Handle delete view
  const handleDeleteView = (id) => {
    setSavedViews(savedViews.filter(view => view.id !== id));
  };

  // Handle set default view
  const handleSetDefault = (id) => {
    setSavedViews(savedViews.map(view => ({
      ...view,
      isDefault: view.id === id
    })));
  };

  // Handle load view
  const handleLoadView = (view) => {
    console.log("Loading view:", view);
    // In a real app, this would apply the saved filters
    onClose();
  };

  return (
    <div className="fixed inset-0 z-modal flex items-start justify-center pt-20 px-4">
      <div className="absolute inset-0 bg-text-primary opacity-25" onClick={onClose}></div>
      <div className="relative bg-surface rounded-lg shadow-modal border border-border w-full max-w-2xl">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h3 className="text-lg font-medium text-text-primary">Saved Analysis Views</h3>
          <button
            onClick={onClose}
            className="p-2 rounded-md hover:bg-background transition-colors"
          >
            <Icon name="X" size={20} className="text-text-secondary" />
          </button>
        </div>
        
        <div className="p-4">
          {/* Create New View Form */}
          {isCreating ? (
            <div className="mb-4 p-4 border border-primary/20 bg-primary/5 rounded-md">
              <h4 className="text-sm font-medium text-text-primary mb-2">Save Current View</h4>
              <div className="mb-3">
                <input
                  type="text"
                  value={newViewName}
                  onChange={(e) => setNewViewName(e.target.value)}
                  placeholder="Enter a name for this view"
                  className="w-full px-3 py-2 text-sm border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleSaveView}
                  disabled={!newViewName.trim()}
                  className="px-3 py-2 text-sm bg-primary text-white rounded-md hover:bg-secondary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Save View
                </button>
                <button
                  onClick={() => setIsCreating(false)}
                  className="px-3 py-2 text-sm border border-border text-text-secondary rounded-md hover:bg-background transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="mb-4">
              <button
                onClick={() => setIsCreating(true)}
                className="flex items-center space-x-2 px-3 py-2 text-sm bg-primary text-white rounded-md hover:bg-secondary transition-colors"
              >
                <Icon name="Plus" size={16} />
                <span>Save Current View</span>
              </button>
            </div>
          )}
          
          {/* Saved Views List */}
          <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
            {savedViews.length > 0 ? (
              savedViews.map((view) => (
                <div 
                  key={view.id}
                  className={`p-4 border rounded-md transition-colors ${
                    view.isDefault 
                      ? 'border-primary bg-primary/5' :'border-border hover:border-primary/30'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-medium text-text-primary flex items-center">
                        {view.name}
                        {view.isDefault && (
                          <span className="ml-2 text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                            Default
                          </span>
                        )}
                      </h4>
                      <p className="text-sm text-text-secondary">{view.description}</p>
                    </div>
                    <div className="flex items-center space-x-1">
                      {!view.isDefault && (
                        <button
                          onClick={() => handleSetDefault(view.id)}
                          className="p-1.5 rounded-md hover:bg-background transition-colors"
                          title="Set as default"
                        >
                          <Icon name="Star" size={16} className="text-text-secondary" />
                        </button>
                      )}
                      <button
                        onClick={() => handleDeleteView(view.id)}
                        className="p-1.5 rounded-md hover:bg-background transition-colors"
                        title="Delete view"
                      >
                        <Icon name="Trash2" size={16} className="text-text-secondary" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    <div>
                      <div className="text-xs text-text-secondary">Date Range</div>
                      <div className="text-sm text-text-primary">{view.filters.dateRange}</div>
                    </div>
                    <div>
                      <div className="text-xs text-text-secondary">Comparison</div>
                      <div className="text-sm text-text-primary">{view.filters.comparisonMode}</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    <div>
                      <div className="text-xs text-text-secondary">Suppliers</div>
                      <div className="text-sm text-text-primary truncate" title={view.filters.suppliers}>
                        {view.filters.suppliers}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-text-secondary">Categories</div>
                      <div className="text-sm text-text-primary truncate" title={view.filters.categories}>
                        {view.filters.categories}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-text-secondary">
                      Created: {view.createdAt}
                    </div>
                    <button
                      onClick={() => handleLoadView(view)}
                      className="px-3 py-1.5 text-sm text-primary hover:bg-primary/5 rounded-md transition-colors"
                    >
                      Load View
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <Icon name="Bookmark" size={32} className="text-text-secondary mx-auto mb-2 opacity-50" />
                <p className="text-text-secondary">No saved views yet</p>
                <p className="text-sm text-text-secondary mt-1">
                  Save your current filter configuration for quick access later
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookmarkPanel;