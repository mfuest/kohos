import { useState, useEffect } from "react";
import { Input } from "../../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Search } from "lucide-react";
import CampaignCard from "../../components/CampaignCard";
import CreatorHeader from "../../components/creator/CreatorHeader";
import LoadingSpinner from "../../components/LoadingSpinner";
import EmptyState from "../../components/EmptyState";
import { useCampaigns } from "../../hooks/useCampaigns";
import { useToast } from "../../hooks/use-toast";

const CreatorMarketplace = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { campaigns, loading, error, fetchCampaigns } = useCampaigns();
  const { toast } = useToast();

  useEffect(() => {
    if (error) {
      toast({
        title: "Error loading campaigns",
        description: error,
        variant: "destructive",
      });
    }
  }, [error, toast]);

  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch = campaign.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (campaign.brand_profile?.company_name || "").toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || campaign.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <CreatorHeader />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-heading font-light mb-2">Campaign Marketplace</h1>
          <p className="text-muted-foreground">Discover brand partnerships</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search campaigns or brands..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="Food & Beverage">Food & Beverage</SelectItem>
              <SelectItem value="Fashion">Fashion</SelectItem>
              <SelectItem value="Technology">Technology</SelectItem>
              <SelectItem value="Beauty">Beauty</SelectItem>
              <SelectItem value="Lifestyle">Lifestyle</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {loading ? (
          <LoadingSpinner size="lg" text="Loading campaigns..." />
        ) : (
          <>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredCampaigns.map((campaign) => (
                <CampaignCard 
                  key={campaign.id} 
                  title={campaign.title}
                  company={campaign.brand_profile?.company_name || "Unknown Brand"}
                  budget={`$${campaign.budget_min?.toLocaleString()} - $${campaign.budget_max?.toLocaleString()}`}
                  deadline={campaign.deadline || "No deadline"}
                  category={campaign.category}
                  location={campaign.location || "Remote"}
                  description={campaign.description || "No description available"}
                  requirements={campaign.requirements || []}
                  applicants={campaign.applications_count || 0}
                />
              ))}
            </div>

            {filteredCampaigns.length === 0 && (
              <EmptyState
                title="No campaigns found"
                description="No campaigns match your current search criteria. Try adjusting your filters or check back later."
                icon="search"
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CreatorMarketplace;