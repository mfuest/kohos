import { useState, useEffect, useCallback } from 'react';

import { supabase } from '@/integrations/supabase/client';
import type { Tables } from '@/integrations/supabase/types';
import { useAuth } from './useAuth';

export type UserProfile = Tables<'profiles'> & {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  creator_profile?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  brand_profile?: any;
};

export const useProfile = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchProfile = useCallback(async (userId?: string) => {
    if (!userId && !user) return;

    const targetUserId = userId || user?.id;
    if (!targetUserId) return;

    try {
      setLoading(true);
      setError(null);

      // Fetch base profile
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', targetUserId)
        .single();

      if (profileError) {
        throw profileError;
      }

      // Fetch type-specific profile based on user_type
      let typeSpecificProfile = null;
      if (profileData.user_type === 'creator') {
        const { data: creatorData } = await supabase
          .from('creator_profiles')
          .select('*')
          .eq('user_id', targetUserId)
          .single();
        typeSpecificProfile = creatorData;
      } else if (profileData.user_type === 'brand') {
        const { data: brandData } = await supabase
          .from('brand_profiles')
          .select('*')
          .eq('user_id', targetUserId)
          .single();
        typeSpecificProfile = brandData;
      }

      const fullProfile: UserProfile = {
        ...profileData,
        ...(profileData.user_type === 'creator' &&
          typeSpecificProfile && { creator_profile: typeSpecificProfile }),
        ...(profileData.user_type === 'brand' &&
          typeSpecificProfile && { brand_profile: typeSpecificProfile }),
      };

      setProfile(fullProfile);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch profile');
    } finally {
      setLoading(false);
    }
  }, [user]);

  const updateProfile = async (updates: Partial<Tables<'profiles'>>) => {
    if (!user) return { data: null, error: 'No user authenticated' };

    try {
      const { data, error: updateError } = await supabase
        .from('profiles')
        .update(updates)
        .eq('user_id', user.id)
        .select()
        .single();

      if (updateError) {
        throw updateError;
      }

      // Refresh profile
      await fetchProfile();
      return { data, error: null };
    } catch (err) {
      return {
        data: null,
        error: err instanceof Error ? err.message : 'Failed to update profile',
      };
    }
  };

  const updateCreatorProfile = async (
    updates: Partial<Tables<'creator_profiles'>>
  ) => {
    if (!user) return { data: null, error: 'No user authenticated' };

    try {
      const { data, error: updateError } = await supabase
        .from('creator_profiles')
        .update(updates)
        .eq('user_id', user.id)
        .select()
        .single();

      if (updateError) {
        throw updateError;
      }

      // Refresh profile
      await fetchProfile();
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

  const updateBrandProfile = async (
    updates: Partial<Tables<'brand_profiles'>>
  ) => {
    if (!user) return { data: null, error: 'No user authenticated' };

    try {
      const { data, error: updateError } = await supabase
        .from('brand_profiles')
        .update(updates)
        .eq('user_id', user.id)
        .select()
        .single();

      if (updateError) {
        throw updateError;
      }

      // Refresh profile
      await fetchProfile();
      return { data, error: null };
    } catch (err) {
      return {
        data: null,
        error:
          err instanceof Error ? err.message : 'Failed to update brand profile',
      };
    }
  };

  const createCreatorProfile = async (
    profileData: Omit<
      Tables<'creator_profiles'>,
      'id' | 'created_at' | 'updated_at'
    >
  ) => {
    if (!user) return { data: null, error: 'No user authenticated' };

    try {
      const { data, error: createError } = await supabase
        .from('creator_profiles')
        .insert([profileData])
        .select()
        .single();

      if (createError) {
        throw createError;
      }

      // Refresh profile
      await fetchProfile();
      return { data, error: null };
    } catch (err) {
      return {
        data: null,
        error:
          err instanceof Error
            ? err.message
            : 'Failed to create creator profile',
      };
    }
  };

  const createBrandProfile = async (
    profileData: Omit<
      Tables<'brand_profiles'>,
      'id' | 'created_at' | 'updated_at'
    >
  ) => {
    if (!user) return { data: null, error: 'No user authenticated' };

    try {
      const { data, error: createError } = await supabase
        .from('brand_profiles')
        .insert([profileData])
        .select()
        .single();

      if (createError) {
        throw createError;
      }

      // Refresh profile
      await fetchProfile();
      return { data, error: null };
    } catch (err) {
      return {
        data: null,
        error:
          err instanceof Error ? err.message : 'Failed to create brand profile',
      };
    }
  };

  useEffect(() => {
    if (user) {
      fetchProfile();
    } else {
      setProfile(null);
      setLoading(false);
    }
  }, [user, fetchProfile]);

  return {
    profile,
    loading,
    error,
    fetchProfile,
    updateProfile,
    updateCreatorProfile,
    updateBrandProfile,
    createCreatorProfile,
    createBrandProfile,
  };
};
