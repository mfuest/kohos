'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { MapPin, Users, TrendingUp, Calendar } from 'lucide-react';
import CreatorHeader from '@/components/creator/CreatorHeader';

interface CreatorData {
  name: string;
  username: string;
  bio: string;
  followers: string;
  engagement: string;
  location: string;
  categories: string[];
  profileImage: string;
  stats: {
    totalCampaigns: number;
    activeCampaigns: number;
    completedCampaigns: number;
    averageRating: number;
  };
}

interface ActiveCampaign {
  title: string;
  company: string;
  status: string;
  deadline: string;
}

export default function CreatorProfilePage() {
  // Mock creator data
  const creator: CreatorData = {
    name: 'Sarah Johnson',
    username: '@sarahjohnson',
    bio: 'Lifestyle & wellness creator sharing authentic moments. Coffee enthusiast and travel lover.',
    followers: '125K',
    engagement: '4.2%',
    location: 'Los Angeles, CA',
    categories: ['Lifestyle', 'Wellness', 'Travel', 'Food'],
    profileImage: '',
    stats: {
      totalCampaigns: 24,
      activeCampaigns: 3,
      completedCampaigns: 21,
      averageRating: 4.8,
    },
  };

  const activeCampaigns: ActiveCampaign[] = [
    {
      title: 'Summer Coffee Collection',
      company: 'Blue Bottle Coffee',
      status: 'In Progress',
      deadline: '2024-02-15',
    },
    {
      title: 'Sustainable Fashion Campaign',
      company: 'Patagonia',
      status: 'Review',
      deadline: '2024-02-20',
    },
    {
      title: 'Wellness Product Launch',
      company: 'Goop',
      status: 'Planning',
      deadline: '2024-02-25',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <CreatorHeader />

      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Profile Overview */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader className="text-center">
                <Avatar className="h-24 w-24 mx-auto mb-4">
                  <AvatarImage src={creator.profileImage} />
                  <AvatarFallback className="text-lg">
                    {creator.name
                      .split(' ')
                      .map(n => n[0])
                      .join('')}
                  </AvatarFallback>
                </Avatar>
                <CardTitle className="text-xl">{creator.name}</CardTitle>
                <p className="text-muted-foreground">{creator.username}</p>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-sm text-center">{creator.bio}</p>

                <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{creator.location}</span>
                </div>

                <Separator />

                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="flex items-center justify-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span className="font-semibold">{creator.followers}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Followers</p>
                  </div>
                  <div>
                    <div className="flex items-center justify-center space-x-1">
                      <TrendingUp className="h-4 w-4" />
                      <span className="font-semibold">
                        {creator.engagement}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">Engagement</p>
                  </div>
                </div>

                <Separator />

                <div>
                  <p className="text-sm font-medium mb-2">Categories</p>
                  <div className="flex flex-wrap gap-2">
                    {creator.categories.map((category, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="text-xs"
                      >
                        {category}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Button className="w-full" variant="outline">
                  Edit Profile
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Stats and Campaigns */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold text-coffee-dark">
                    {creator.stats.totalCampaigns}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Total Campaigns
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold text-green-600">
                    {creator.stats.activeCampaigns}
                  </div>
                  <p className="text-xs text-muted-foreground">Active</p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold text-blue-600">
                    {creator.stats.completedCampaigns}
                  </div>
                  <p className="text-xs text-muted-foreground">Completed</p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold text-yellow-600">
                    {creator.stats.averageRating}
                  </div>
                  <p className="text-xs text-muted-foreground">Avg Rating</p>
                </CardContent>
              </Card>
            </div>

            {/* Active Campaigns */}
            <Card>
              <CardHeader>
                <CardTitle>Active Campaigns</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activeCampaigns.map((campaign, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex-1">
                        <h4 className="font-medium">{campaign.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {campaign.company}
                        </p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Badge
                          variant={
                            campaign.status === 'In Progress'
                              ? 'default'
                              : campaign.status === 'Review'
                                ? 'secondary'
                                : 'outline'
                          }
                        >
                          {campaign.status}
                        </Badge>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4 mr-1" />
                          {campaign.deadline}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export const dynamic = 'force-dynamic';
