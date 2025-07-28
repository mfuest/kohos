import BrandHeader from "../../components/brand/BrandHeader";

const BrandDashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <BrandHeader />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-heading font-light mb-2">Brand Dashboard</h1>
          <p className="text-muted-foreground">Manage your campaigns and partnerships</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="p-6 rounded-lg border bg-card">
            <h3 className="text-lg font-semibold mb-2">Quick Stats</h3>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Active Campaigns: 5</p>
              <p className="text-sm text-muted-foreground">Total Partnerships: 23</p>
              <p className="text-sm text-muted-foreground">This Month Spend: $12,450</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandDashboard;