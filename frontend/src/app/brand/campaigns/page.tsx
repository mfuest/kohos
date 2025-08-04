'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Search, Plus } from 'lucide-react';
import BrandHeader from '@/components/brand/BrandHeader';
import CampaignCard from '@/components/CampaignCard';
import LoadingSpinner from '@/components/LoadingSpinner';
import EmptyState from '@/components/EmptyState';
import { useCampaigns } from '@/hooks/useCampaigns';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

export default function BrandCampaignsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newCampaign, setNewCampaign] = useState({
    title: '',
    budget_min: '',
    budget_max: '',
    location: '',
    description: '',
    requirements: '',
    category: '',
  });

  const { user } = useAuth();
  const { campaigns, loading, error, fetchCampaignsByBrand, createCampaign } =
    useCampaigns();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      fetchCampaignsByBrand(user.id);
    }
  }, [user, fetchCampaignsByBrand]);

  useEffect(() => {
    if (error) {
      toast({
        title: 'Error loading campaigns',
        description: error,
        variant: 'destructive',
      });
    }
  }, [error, toast]);

  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch =
      campaign.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      campaign.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      selectedStatus === 'all' ||
      campaign.status.toLowerCase() === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const handleCreateCampaign = async () => {
    if (!user) {
      toast({
        title: 'Error',
        description: 'You must be logged in to create a campaign',
        variant: 'destructive',
      });
      return;
    }

    const requirementsArray = newCampaign.requirements
      .split(',')
      .map(req => req.trim())
      .filter(req => req.length > 0);

    const campaignData = {
      brand_user_id: user.id,
      title: newCampaign.title,
      description: newCampaign.description,
      budget_min: parseInt(newCampaign.budget_min) || null,
      budget_max: parseInt(newCampaign.budget_max) || null,
      location: newCampaign.location,
      category: newCampaign.category,
      requirements: requirementsArray,
      status: 'active' as const,
      deadline: null,
    };

    const { error } = await createCampaign(campaignData);

    if (error) {
      toast({
        title: 'Error creating campaign',
        description: error,
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Campaign created!',
        description: 'Your campaign has been successfully created.',
      });
      setIsCreateDialogOpen(false);
      setNewCampaign({
        title: '',
        budget_min: '',
        budget_max: '',
        location: '',
        description: '',
        requirements: '',
        category: '',
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <BrandHeader />
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-heading font-light mb-2">
              My Campaigns
            </h1>
            <p className="text-muted-foreground">
              Manage your brand campaigns and partnerships
            </p>
          </div>
          <Dialog
            open={isCreateDialogOpen}
            onOpenChange={setIsCreateDialogOpen}
          >
            <DialogTrigger asChild>
              <Button className="flex items-center space-x-2">
                <Plus className="h-4 w-4" />
                <span>Create Campaign</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
              <DialogHeader>
                <DialogTitle>Create New Campaign</DialogTitle>
                <DialogDescription>
                  Create a new campaign to connect with creators.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="title" className="text-right">
                    Title
                  </Label>
                  <Input
                    id="title"
                    value={newCampaign.title}
                    onChange={e =>
                      setNewCampaign({ ...newCampaign, title: e.target.value })
                    }
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="budget_min" className="text-right">
                    Min Budget
                  </Label>
                  <Input
                    id="budget_min"
                    type="number"
                    value={newCampaign.budget_min}
                    onChange={e =>
                      setNewCampaign({
                        ...newCampaign,
                        budget_min: e.target.value,
                      })
                    }
                    className="col-span-3"
                    placeholder="1000"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="budget_max" className="text-right">
                    Max Budget
                  </Label>
                  <Input
                    id="budget_max"
                    type="number"
                    value={newCampaign.budget_max}
                    onChange={e =>
                      setNewCampaign({
                        ...newCampaign,
                        budget_max: e.target.value,
                      })
                    }
                    className="col-span-3"
                    placeholder="5000"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="location" className="text-right">
                    Location
                  </Label>
                  <Input
                    id="location"
                    value={newCampaign.location}
                    onChange={e =>
                      setNewCampaign({
                        ...newCampaign,
                        location: e.target.value,
                      })
                    }
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="category" className="text-right">
                    Category
                  </Label>
                  <Select
                    value={newCampaign.category}
                    onValueChange={value =>
                      setNewCampaign({ ...newCampaign, category: value })
                    }
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fashion">Fashion</SelectItem>
                      <SelectItem value="beauty">Beauty</SelectItem>
                      <SelectItem value="food">Food & Beverage</SelectItem>
                      <SelectItem value="tech">Technology</SelectItem>
                      <SelectItem value="lifestyle">Lifestyle</SelectItem>
                      <SelectItem value="fitness">Fitness</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    value={newCampaign.description}
                    onChange={e =>
                      setNewCampaign({
                        ...newCampaign,
                        description: e.target.value,
                      })
                    }
                    className="col-span-3"
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="requirements" className="text-right">
                    Requirements
                  </Label>
                  <Textarea
                    id="requirements"
                    value={newCampaign.requirements}
                    onChange={e =>
                      setNewCampaign({
                        ...newCampaign,
                        requirements: e.target.value,
                      })
                    }
                    className="col-span-3"
                    rows={2}
                    placeholder="Separate with commas"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsCreateDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button onClick={handleCreateCampaign}>Create Campaign</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search your campaigns..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {loading ? (
          <LoadingSpinner size="lg" text="Loading campaigns..." />
        ) : (
          <>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredCampaigns.map(campaign => (
                <div key={campaign.id} className="relative">
                  <CampaignCard
                    title={campaign.title}
                    company={
                      campaign.brand_profile?.company_name || 'Your Brand'
                    }
                    budget={`$${campaign.budget_min?.toLocaleString()} - $${campaign.budget_max?.toLocaleString()}`}
                    deadline={campaign.deadline || 'No deadline'}
                    category={campaign.category}
                    location={campaign.location || 'Remote'}
                    description={
                      campaign.description || 'No description available'
                    }
                    requirements={campaign.requirements || []}
                    applicants={campaign.applications_count || 0}
                    showEditButton={true}
                    campaignId={campaign.id}
                    showViewApplications={true}
                  />
                  <div className="absolute top-4 right-4">
                    <Badge
                      variant={
                        campaign.status === 'active'
                          ? 'default'
                          : campaign.status === 'draft'
                            ? 'secondary'
                            : 'outline'
                      }
                    >
                      {campaign.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>

            {filteredCampaigns.length === 0 && (
              <EmptyState
                title="No campaigns found"
                description="You haven't created any campaigns yet. Create your first campaign to get started."
                actionText="Create Your First Campaign"
                onAction={() => setIsCreateDialogOpen(true)}
                icon="create"
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}

export const dynamic = 'force-dynamic';
