'use client';

import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import ApplicationStatusBadge from '@/components/ApplicationStatusBadge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import BrandHeader from '@/components/brand/BrandHeader';
import LoadingSpinner from '@/components/LoadingSpinner';
import EmptyState from '@/components/EmptyState';
import { useAuth } from '@/hooks/useAuth';
import { useCampaigns } from '@/hooks/useCampaigns';
import { useApplications } from '@/hooks/useApplications';
import { useToast } from '@/hooks/use-toast';
import { Search, User, Calendar, MessageSquare, Check, X } from 'lucide-react';
import { formatDate, getInitials } from '@/lib/utils';

interface ApplicationWithDetails {
  id: string;
  campaign_id: string;
  creator_user_id: string;
  status: 'pending' | 'accepted' | 'rejected' | 'completed';
  message?: string;
  applied_at: string;
  updated_at: string;
  campaign?: {
    id: string;
    title: string;
    brand_user_id: string;
  };
  creator_profile?: {
    followers_count: number;
    engagement_rate: number;
  };
  profile?: {
    display_name: string;
    avatar_url?: string;
  };
}

export default function BrandApplicationsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedCampaign, setSelectedCampaign] = useState('all');
  const [applications, setApplications] = useState<ApplicationWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedApplication, setSelectedApplication] = useState<ApplicationWithDetails | null>(null);
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);
  const [reviewMessage, setReviewMessage] = useState('');

  const { user } = useAuth();
  const { campaigns } = useCampaigns();
  const { updateApplicationStatus } = useApplications();
  const { toast } = useToast();

  // Fetch all applications for the brand's campaigns
  const fetchApplications = useCallback(async () => {
    if (!user) return;

    try {
      setLoading(true);
      setError(null);

      // Get all campaigns for this brand
      const brandCampaigns = campaigns.filter(
        campaign => campaign.brand_user_id === user.id
      );

      if (brandCampaigns.length === 0) {
        setApplications([]);
        return;
      }

      // Fetch applications for all campaigns
      const { supabase } = await import('@/integrations/supabase/client');
      const campaignIds = brandCampaigns.map(campaign => campaign.id);

      const { data, error: fetchError } = await supabase
        .from('campaign_applications')
        .select(
          `
          *,
          campaign:campaigns(*),
          creator_profile:creator_profiles!creator_user_id(*),
          profile:profiles!creator_user_id(*)
        `
        )
        .in('campaign_id', campaignIds)
        .order('applied_at', { ascending: false });

      if (fetchError) {
        throw fetchError;
      }

      setApplications((data as unknown as ApplicationWithDetails[]) || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch applications');
    } finally {
      setLoading(false);
    }
  }, [user, campaigns]);

  useEffect(() => {
    if (user && campaigns.length > 0) {
      fetchApplications();
    }
  }, [fetchApplications, user, campaigns.length]);



  useEffect(() => {
    if (error) {
      toast({
        title: 'Error loading applications',
        description: error,
        variant: 'destructive',
      });
    }
  }, [error, toast]);

  const filteredApplications = applications.filter(application => {
    const matchesSearch =
      application.profile?.display_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      application.campaign?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      application.message?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = selectedStatus === 'all' || application.status === selectedStatus;
    const matchesCampaign = selectedCampaign === 'all' || application.campaign_id === selectedCampaign;
    
    return matchesSearch && matchesStatus && matchesCampaign;
  });

  const handleStatusUpdate = async (applicationId: string, newStatus: 'pending' | 'accepted' | 'rejected' | 'completed') => {
    try {
      const { error } = await updateApplicationStatus(applicationId, newStatus);
      
      if (error) {
        throw new Error(error);
      }

      // Update local state
      setApplications(prev => 
        prev.map(app => 
          app.id === applicationId 
            ? { ...app, status: newStatus }
            : app
        )
      );

      toast({
        title: 'Application updated',
        description: `Application ${newStatus} successfully`,
      });

      setIsReviewDialogOpen(false);
      setSelectedApplication(null);
      setReviewMessage('');
    } catch (err) {
      toast({
        title: 'Error updating application',
        description: err instanceof Error ? err.message : 'Failed to update application',
        variant: 'destructive',
      });
    }
  };



  return (
    <div className="min-h-screen bg-background">
      <BrandHeader />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-heading font-light mb-2">
            Application Review
          </h1>
          <p className="text-muted-foreground">
            Review and manage applications to your campaigns
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search applications..."
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
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="accepted">Accepted</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedCampaign} onValueChange={setSelectedCampaign}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Campaign" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Campaigns</SelectItem>
              {campaigns.map(campaign => (
                <SelectItem key={campaign.id} value={campaign.id}>
                  {campaign.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {loading ? (
          <LoadingSpinner size="lg" text="Loading applications..." />
        ) : (
          <>
            <div className="space-y-4">
              {filteredApplications.map(application => (
                <Card key={application.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={application.profile?.avatar_url} />
                          <AvatarFallback>
                            {getInitials(application.profile?.display_name || 'Unknown')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <CardTitle className="text-lg">
                            {application.profile?.display_name || 'Unknown Creator'}
                          </CardTitle>
                          <CardDescription className="text-base">
                            {application.campaign?.title}
                          </CardDescription>
                          <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                            <div className="flex items-center space-x-1">
                              <Calendar className="h-4 w-4" />
                              <span>Applied {formatDate(application.applied_at)}</span>
                            </div>
                            {application.creator_profile?.followers_count && (
                              <div className="flex items-center space-x-1">
                                <User className="h-4 w-4" />
                                <span>{application.creator_profile.followers_count.toLocaleString()} followers</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                                             <div className="flex items-center space-x-2">
                         <ApplicationStatusBadge status={application.status} />
                        {application.status === 'pending' && (
                          <Button
                            size="sm"
                            onClick={() => {
                              setSelectedApplication(application);
                              setIsReviewDialogOpen(true);
                            }}
                          >
                            Review
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardHeader>

                  {application.message && (
                    <CardContent>
                      <div className="flex items-start space-x-2">
                        <MessageSquare className="h-4 w-4 text-muted-foreground mt-0.5" />
                        <p className="text-sm text-muted-foreground">
                          {application.message}
                        </p>
                      </div>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>

            {filteredApplications.length === 0 && (
              <EmptyState
                title="No applications found"
                description="No applications match your current filters. Try adjusting your search criteria."
                icon="search"
              />
            )}
          </>
        )}
      </div>

      {/* Review Dialog */}
      <Dialog open={isReviewDialogOpen} onOpenChange={setIsReviewDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Review Application</DialogTitle>
            <DialogDescription>
              Review the application from{' '}
              <span className="font-medium">
                {selectedApplication?.profile?.display_name}
              </span>{' '}
              for{' '}
              <span className="font-medium">
                {selectedApplication?.campaign?.title}
              </span>
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {selectedApplication?.message && (
              <div>
                <label className="text-sm font-medium">Application Message</label>
                <p className="text-sm text-muted-foreground mt-1">
                  {selectedApplication.message}
                </p>
              </div>
            )}

            <div>
              <label className="text-sm font-medium">Your Response (Optional)</label>
              <Textarea
                placeholder="Add a message to the creator..."
                value={reviewMessage}
                onChange={e => setReviewMessage(e.target.value)}
                className="mt-1"
              />
            </div>
          </div>

          <DialogFooter className="flex space-x-2">
            <Button
              variant="outline"
              onClick={() => {
                setIsReviewDialogOpen(false);
                setSelectedApplication(null);
                setReviewMessage('');
              }}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => selectedApplication?.id && handleStatusUpdate(selectedApplication.id, 'rejected')}
            >
              <X className="h-4 w-4 mr-2" />
              Reject
            </Button>
            <Button
              onClick={() => selectedApplication?.id && handleStatusUpdate(selectedApplication.id, 'accepted')}
            >
              <Check className="h-4 w-4 mr-2" />
              Accept
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export const dynamic = 'force-dynamic'; 