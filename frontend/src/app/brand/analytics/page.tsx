'use client';

import BrandHeader from '@/components/brand/BrandHeader';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, DollarSign, Users, Package } from 'lucide-react';

export default function BrandAnalyticsPage() {
  return (
    <div className="min-h-screen bg-background">
      <BrandHeader />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-heading font-light mb-2">
            Brand Analytics
          </h1>
          <p className="text-muted-foreground">
            Track your campaign performance and spending
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Campaigns
              </CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">
                +2 from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$24,890</div>
              <p className="text-xs text-muted-foreground">
                +15% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active Partnerships
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">
                Ongoing collaborations
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">ROI</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">324%</div>
              <p className="text-xs text-muted-foreground">
                Average return on investment
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Recent Campaigns</CardTitle>
              <CardDescription>Your latest brand partnerships</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Summer Coffee Collection</p>
                    <p className="text-sm text-muted-foreground">
                      Blue Bottle Coffee
                    </p>
                  </div>
                  <Badge variant="default">Active</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Sustainable Fashion</p>
                    <p className="text-sm text-muted-foreground">Patagonia</p>
                  </div>
                  <Badge variant="outline">Completed</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Tech Product Launch</p>
                    <p className="text-sm text-muted-foreground">Apple</p>
                  </div>
                  <Badge variant="default">Active</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Top Performing Creators</CardTitle>
              <CardDescription>
                Creators delivering the best results
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">@coffeelover_jane</p>
                    <p className="text-sm text-muted-foreground">ROI: 450%</p>
                  </div>
                  <Badge variant="default">Top Performer</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">@techreviewer_mike</p>
                    <p className="text-sm text-muted-foreground">ROI: 380%</p>
                  </div>
                  <Badge variant="default">Excellent</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">@lifestyle_sara</p>
                    <p className="text-sm text-muted-foreground">ROI: 320%</p>
                  </div>
                  <Badge variant="outline">Good</Badge>
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
