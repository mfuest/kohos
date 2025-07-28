'use client';

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search } from 'lucide-react';
import CreatorCard from '@/components/creator/CreatorCard';
import BrandHeader from '@/components/brand/BrandHeader';
import LoadingSpinner from '@/components/LoadingSpinner';
import EmptyState from '@/components/EmptyState';
import { useCreators } from '@/hooks/useCreators';
import { useToast } from '@/hooks/use-toast';

export default function BrowseCreatorsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedNiche, setSelectedNiche] = useState('all');
  const { creators, loading, error } = useCreators();
  const { toast } = useToast();

  useEffect(() => {
    if (error) {
      toast({
        title: 'Error loading creators',
        description: error,
        variant: 'destructive',
      });
    }
  }, [error, toast]);

  const filteredCreators = creators.filter(creator => {
    const matchesSearch =
      (creator.profile?.display_name || '')
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      (creator.profile?.bio || '')
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      (creator.categories?.join(', ') || '')
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    const matchesNiche =
      selectedNiche === 'all' ||
      creator.categories?.some(cat => cat === selectedNiche);
    return matchesSearch && matchesNiche;
  });

  return (
    <div className="min-h-screen bg-background">
      <BrandHeader />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-heading font-light mb-2">
            Browse Creators
          </h1>
          <p className="text-muted-foreground">
            Find the perfect creators for your campaigns
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search creators by name, bio, or niche..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <Select value={selectedNiche} onValueChange={setSelectedNiche}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Niche" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Niches</SelectItem>
              <SelectItem value="Food & Beverage">Food & Beverage</SelectItem>
              <SelectItem value="Fashion">Fashion</SelectItem>
              <SelectItem value="Technology">Technology</SelectItem>
              <SelectItem value="Beauty">Beauty</SelectItem>
              <SelectItem value="Lifestyle">Lifestyle</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {loading ? (
          <LoadingSpinner size="lg" text="Loading creators..." />
        ) : (
          <>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredCreators.map(creator => (
                <CreatorCard
                  key={creator.id}
                  name={creator.profile?.display_name || 'Unknown Creator'}
                  bio={creator.profile?.bio || 'No bio available'}
                  location={
                    creator.profile?.location || 'Location not specified'
                  }
                  followers={`${(creator.followers_count || 0).toLocaleString()}`}
                  engagement={`${(creator.engagement_rate || 0).toFixed(1)}%`}
                  specialty={creator.categories || []}
                  rate="$500-1000"
                  avatar={creator.profile?.avatar_url || ''}
                />
              ))}
            </div>

            {filteredCreators.length === 0 && (
              <EmptyState
                title="No creators found"
                description="No creators match your current search criteria. Try adjusting your filters or check back later."
                icon="search"
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}

export const dynamic = 'force-dynamic';
