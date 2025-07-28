import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import About from "./pages/About";
import CreatorMarketplace from "./pages/creator/CreatorMarketplace";
import CreatorProfile from "./pages/creator/CreatorProfile";
import CreatorAnalytics from "./pages/creator/CreatorAnalytics";
import BrandDashboard from "./pages/brand/BrandDashboard";
import BrandAnalytics from "./pages/brand/BrandAnalytics";
import BrowseCreators from "./pages/BrowseCreators";
import BrandCampaigns from "./pages/brand/BrandCampaigns";
import BrandProfile from "./pages/brand/BrandProfile";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/creator-marketplace" element={<CreatorMarketplace />} />
            <Route path="/creator-profile" element={<CreatorProfile />} />
            <Route path="/creator-analytics" element={<CreatorAnalytics />} />
            <Route path="/brand-dashboard" element={<BrandDashboard />} />
            <Route path="/brand-analytics" element={<BrandAnalytics />} />
            <Route path="/browse-creators" element={<BrowseCreators />} />
            <Route path="/brand-campaigns" element={<BrandCampaigns />} />
            <Route path="/brand-profile" element={<BrandProfile />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
