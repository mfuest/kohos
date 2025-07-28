'use client';

import { useState } from 'react';
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
import Header from '@/components/Header';
import CampaignCard from '@/components/CampaignCard';
import { Search, Filter, TrendingUp } from 'lucide-react';

export default function CampaignsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedBudget, setSelectedBudget] = useState('all');

  // Mock coffee campaign data
  const campaigns = [
    {
      title: 'Single-Origin Ethiopian Review',
      company: 'Blue Mountain Brands',
      budget: '$50 - $150',
      deadline: 'Dec 15, 2024',
      category: 'Single Origin',
      location: 'Remote',
      description:
        'Looking for coffee reviewers to feature our new Ethiopian Yirgacheffe beans. Must understand flavor notes and brewing methods.',
      requirements: [
        'Coffee review experience',
        'Understanding of flavor profiles',
        'Instagram presence',
        'Basic photography skills',
      ],
      applicants: 6,
    },
    {
      title: 'Latte Art Tutorial Series',
      company: 'Café Artisan',
      budget: '$100 - $300',
      deadline: 'Jan 20, 2025',
      category: 'Latte Art',
      location: 'Portland, OR',
      description:
        'Seeking barista creators to showcase our premium milk and latte art techniques in a tutorial series.',
      requirements: [
        'Barista experience',
        'Latte art skills',
        'Video content creation',
        'Available for filming',
      ],
      applicants: 4,
    },
    {
      title: 'Home Brewing Challenge',
      company: 'Bean & Brew Co',
      budget: '$75 - $200',
      deadline: 'Dec 30, 2024',
      category: 'Home Brewing',
      location: 'Remote',
      description:
        'Partner with us for a 3-day home brewing challenge featuring our coffee equipment and beans.',
      requirements: [
        'Home brewing enthusiast',
        'Content creation',
        'Instagram or TikTok active',
        'Passionate about coffee',
      ],
      applicants: 8,
    },
  ];

  const categories = [
    'all',
    'Single Origin',
    'Latte Art',
    'Home Brewing',
    'Cold Brew',
    'Equipment Review',
    'Café Culture',
  ];

  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch =
      campaign.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      campaign.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      campaign.category.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === 'all' || campaign.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-inter font-semibold mb-2">
                Campaigns
              </h1>
              <p className="text-muted-foreground font-serif">
                Discover coffee partnerships that match your passion
              </p>
            </div>
            <Badge
              variant="secondary"
              className="bg-coffee-light text-coffee-dark flex items-center space-x-2"
            >
              <TrendingUp className="h-4 w-4" />
              <span>{campaigns.length} Active</span>
            </Badge>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search campaigns, brands, or categories..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="w-full sm:w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedBudget} onValueChange={setSelectedBudget}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Budget Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Budgets</SelectItem>
                <SelectItem value="0-100">$0 - $100</SelectItem>
                <SelectItem value="100-300">$100 - $300</SelectItem>
                <SelectItem value="300-500">$300 - $500</SelectItem>
                <SelectItem value="500+">$500+</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            Showing {filteredCampaigns.length} of {campaigns.length} campaigns
          </p>
        </div>

        {/* Campaign Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCampaigns.map((campaign, index) => (
            <CampaignCard key={index} {...campaign} />
          ))}
        </div>

        {filteredCampaigns.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No campaigns found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search terms or filters
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                setSelectedBudget('all');
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}

        {/* Load More */}
        {filteredCampaigns.length > 0 && (
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Load More Campaigns
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export const dynamic = 'force-dynamic';
