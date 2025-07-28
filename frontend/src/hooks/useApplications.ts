import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { Tables } from '@/integrations/supabase/types';

export type Application = Tables<'campaign_applications'> & {
  campaign?: Tables<'campaigns'>;
  creator_profile?: Tables<'creator_profiles'>;
};

export const useApplications = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createApplication = async (applicationData: Omit<Tables<'campaign_applications'>, 'id' | 'applied_at' | 'updated_at'>) => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: createError } = await supabase
        .from('campaign_applications')
        .insert([applicationData])
        .select()
        .single();

      if (createError) {
        throw createError;
      }

      return { data, error: null };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create application';
      setError(errorMessage);
      return { data: null, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const getApplicationsByCampaign = async (campaignId: string) => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('campaign_applications')
        .select(`
          *,
          creator_profile:creator_profiles(*)
        `)
        .eq('campaign_id', campaignId)
        .order('applied_at', { ascending: false });

      if (fetchError) {
        throw fetchError;
      }

      return { data: data || [], error: null };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch applications';
      setError(errorMessage);
      return { data: [], error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const getApplicationsByCreator = async (creatorUserId: string) => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('campaign_applications')
        .select(`
          *,
          campaign:campaigns(*)
        `)
        .eq('creator_user_id', creatorUserId)
        .order('applied_at', { ascending: false });

      if (fetchError) {
        throw fetchError;
      }

      return { data: data || [], error: null };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch applications';
      setError(errorMessage);
      return { data: [], error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const updateApplicationStatus = async (applicationId: string, status: Tables<'campaign_applications'>['status']) => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: updateError } = await supabase
        .from('campaign_applications')
        .update({ status })
        .eq('id', applicationId)
        .select()
        .single();

      if (updateError) {
        throw updateError;
      }

      return { data, error: null };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update application';
      setError(errorMessage);
      return { data: null, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    createApplication,
    getApplicationsByCampaign,
    getApplicationsByCreator,
    updateApplicationStatus,
  };
}; 