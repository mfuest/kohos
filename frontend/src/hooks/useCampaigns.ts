import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { Tables } from '@/integrations/supabase/types';

export type Campaign = Tables<'campaigns'> & {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  brand_profile?: any;
  applications_count?: number;
};

export const useCampaigns = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCampaigns = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('campaigns')
        .select(
          `
          *,
          brand_profile:brand_profiles(*)
        `
        )
        .eq('status', 'active')
        .order('created_at', { ascending: false });

      if (fetchError) {
        throw fetchError;
      }

      // Get application counts for each campaign
      const campaignsWithCounts = await Promise.all(
        (data || []).map(async campaign => {
          const { count } = await supabase
            .from('campaign_applications')
            .select('*', { count: 'exact', head: true })
            .eq('campaign_id', campaign.id);

          return {
            ...campaign,
            applications_count: count || 0,
          };
        })
      );

      setCampaigns(campaignsWithCounts);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to fetch campaigns'
      );
    } finally {
      setLoading(false);
    }
  };

  const fetchCampaignsByBrand = async (brandUserId: string) => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('campaigns')
        .select(
          `
          *,
          brand_profile:brand_profiles(*)
        `
        )
        .eq('brand_user_id', brandUserId)
        .order('created_at', { ascending: false });

      if (fetchError) {
        throw fetchError;
      }

      // Get application counts for each campaign
      const campaignsWithCounts = await Promise.all(
        (data || []).map(async campaign => {
          const { count } = await supabase
            .from('campaign_applications')
            .select('*', { count: 'exact', head: true })
            .eq('campaign_id', campaign.id);

          return {
            ...campaign,
            applications_count: count || 0,
          };
        })
      );

      setCampaigns(campaignsWithCounts);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to fetch campaigns'
      );
    } finally {
      setLoading(false);
    }
  };

  const createCampaign = async (
    campaignData: Omit<
      Tables<'campaigns'>,
      'id' | 'created_at' | 'updated_at' | 'applicants_count'
    >
  ) => {
    try {
      const { data, error: createError } = await supabase
        .from('campaigns')
        .insert([campaignData])
        .select()
        .single();

      if (createError) {
        throw createError;
      }

      // Refresh campaigns list
      await fetchCampaigns();
      return { data, error: null };
    } catch (err) {
      return {
        data: null,
        error: err instanceof Error ? err.message : 'Failed to create campaign',
      };
    }
  };

  const updateCampaign = async (
    id: string,
    updates: Partial<Tables<'campaigns'>>
  ) => {
    try {
      const { data, error: updateError } = await supabase
        .from('campaigns')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (updateError) {
        throw updateError;
      }

      // Refresh campaigns list
      await fetchCampaigns();
      return { data, error: null };
    } catch (err) {
      return {
        data: null,
        error: err instanceof Error ? err.message : 'Failed to update campaign',
      };
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  return {
    campaigns,
    loading,
    error,
    fetchCampaigns,
    fetchCampaignsByBrand,
    createCampaign,
    updateCampaign,
  };
};
