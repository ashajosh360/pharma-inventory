import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import Header from "components/ui/Header";
import AlertBanner from "components/ui/AlertBanner";
import PharmacyInventoryOverviewDashboard from "pages/pharmacy-inventory-overview-dashboard";
import RealTimeOperationsMonitor from "pages/real-time-operations-monitor";
import ExpiryManagementComplianceDashboard from "pages/expiry-management-compliance-dashboard";
import SupplyChainAnalyticsDashboard from "pages/supply-chain-analytics-dashboard";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <div className="min-h-screen bg-background">
          <Header />
          <AlertBanner />
          <main className="pt-16">
            <RouterRoutes>
              <Route path="/" element={<PharmacyInventoryOverviewDashboard />} />
              <Route path="/pharmacy-inventory-overview-dashboard" element={<PharmacyInventoryOverviewDashboard />} />
              <Route path="/real-time-operations-monitor" element={<RealTimeOperationsMonitor />} />
              <Route path="/expiry-management-compliance-dashboard" element={<ExpiryManagementComplianceDashboard />} />
              <Route path="/supply-chain-analytics-dashboard" element={<SupplyChainAnalyticsDashboard />} />
              <Route path="*" element={<NotFound />} />
            </RouterRoutes>
          </main>
        </div>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;