'use client';

import BrandHeader from '@/components/brand/BrandHeader';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Edit, MapPin, Globe, Calendar } from 'lucide-react';

export default function BrandProfilePage() {
  return (
    <div className="min-h-screen bg-background">
      <BrandHeader />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback className="text-2xl">YB</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-2xl">Your Brand</CardTitle>
                    <CardDescription className="text-lg">
                      Premium Coffee & Lifestyle
                    </CardDescription>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-4 w-4" />
                        <span>San Francisco, CA</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Globe className="h-4 w-4" />
                        <span>yourbrand.com</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>Joined Dec 2023</span>
                      </div>
                    </div>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="flex items-center space-x-2"
                >
                  <Edit className="h-4 w-4" />
                  <span>Edit Profile</span>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2">About</h3>
                  <p className="text-muted-foreground">
                    We&apos;re a premium coffee brand focused on sustainability
                    and quality. We partner with content creators who share our
                    passion for authentic, high-quality content that resonates
                    with coffee lovers worldwide.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Brand Categories</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">Food & Beverage</Badge>
                    <Badge variant="secondary">Lifestyle</Badge>
                    <Badge variant="secondary">Sustainability</Badge>
                    <Badge variant="secondary">Coffee Culture</Badge>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-2">Campaign Stats</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Total Campaigns:
                        </span>
                        <span>12</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Active Partnerships:
                        </span>
                        <span>8</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Success Rate:
                        </span>
                        <span>94%</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">
                      Preferred Creator Types
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Follower Range:
                        </span>
                        <span>10K - 500K</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Engagement Rate:
                        </span>
                        <span>3%+</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Content Style:
                        </span>
                        <span>Authentic, Lifestyle</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export const dynamic = 'force-dynamic';
