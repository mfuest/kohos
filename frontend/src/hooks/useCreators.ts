import { useState, useEffect } from 'react';
import { supabase } from '../integrations/supabase/client';
import type { Tables } from '../integrations/supabase/types';

export type Creator = Tables<'creator_profiles'> & {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  profile?: any;
};

export const useCreators = () => {
  const [creators, setCreators] = useState<Creator[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCreators = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('creator_profiles')
        .select(
          `
          *,
          profile:profiles(*)
        `
        )
        .order('created_at', { ascending: false });

      if (fetchError) {
        throw fetchError;
      }

      setCreators(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch creators');
    } finally {
      setLoading(false);
    }
  };

  const fetchCreatorByUserId = async (userId: string) => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('creator_profiles')
        .select(
          `
          *,
          profile:profiles(*)
        `
        )
        .eq('user_id', userId)
        .single();

      if (fetchError) {
        throw fetchError;
      }

      return { data, error: null };
    } catch (err) {
      return {
        data: null,
        error:
          err instanceof Error
            ? err.message
            : 'Failed to fetch creator profile',
      };
    } finally {
      setLoading(false);
    }
  };

  const updateCreatorProfile = async (
    userId: string,
    updates: Partial<Tables<'creator_profiles'>>
  ) => {
    try {
      const { data, error: updateError } = await supabase
        .from('creator_profiles')
        .update(updates)
        .eq('user_id', userId)
        .select()
        .single();

      if (updateError) {
        throw updateError;
      }

      // Refresh creators list
      await fetchCreators();
      return { data, error: null };
    } catch (err) {
      return {
        data: null,
        error:
          err instanceof Error
            ? err.message
            : 'Failed to update creator profile',
      };
    }
  };

  useEffect(() => {
    fetchCreators();
  }, []);

  return {
    creators,
    loading,
    error,
    fetchCreators,
    fetchCreatorByUserId,
    updateCreatorProfile,
  };
};
