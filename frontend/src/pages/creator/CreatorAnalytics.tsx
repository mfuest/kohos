import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CalendarDays, DollarSign, TrendingUp, Users, Eye, ThumbsUp, MessageCircle, Target } from "lucide-react";
import CreatorHeader from "@/components/creator/CreatorHeader";

const CreatorAnalytics = () => {
  // Mock analytics data
  const analytics = {
    totalEarnings: 45680,
    totalCampaigns: 24,
    activeCampaigns: 3,
    completedCampaigns: 21,
    averageRating: 4.8,
    totalViews: 2450000,
    totalEngagement: 185000,
    conversionRate: 7.5
  };

  const monthlyEarnings = [
    { month: "Jan", amount: 3200 },
    { month: "Feb", amount: 4100 },
    { month: "Mar", amount: 3800 },
    { month: "Apr", amount: 5200 },
    { month: "May", amount: 4900 },
    { month: "Jun", amount: 6100 },
    { month: "Jul", amount: 5800 },
    { month: "Aug", amount: 6800 },
    { month: "Sep", amount: 7200 },
    { month: "Oct", amount: 6900 },
    { month: "Nov", amount: 8100 },
    { month: "Dec", amount: 7500 }
  ];

  const recentCampaigns = [
    {
      title: "Summer Coffee Collection",
      company: "Blue Bottle Coffee",
      earnings: 2500,
      performance: 94,
      views: 145000,
      engagement: 12500,
      status: "Completed"
    },
    {
      title: "Sustainable Fashion",
      company: "Patagonia",
      earnings: 4200,
      performance: 88,
      views: 220000,
      engagement: 18900,
      status: "Completed"
    },
    {
      title: "Tech Product Launch",
      company: "Apple",
      earnings: 8500,
      performance: 96,
      views: 380000,
      engagement: 32100,
      status: "Completed"
    }
  ];

  const maxEarnings = Math.max(...monthlyEarnings.map(m => m.amount));

  return (
    <div className="min-h-screen bg-background">
      <CreatorHeader />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-heading font-light mb-2">Analytics Dashboard</h1>
          <p className="text-muted-foreground">Track your performance and earnings</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <DollarSign className="h-5 w-5 text-green-600" />
                <span className="text-sm font-medium text-muted-foreground">Total Earnings</span>
              </div>
              <div className="text-2xl font-bold text-green-600 mt-2">
                ${analytics.totalEarnings.toLocaleString()}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <Target className="h-5 w-5 text-coffee-dark" />
                <span className="text-sm font-medium text-muted-foreground">Total Campaigns</span>
              </div>
              <div className="text-2xl font-bold mt-2">{analytics.totalCampaigns}</div>
              <div className="text-xs text-muted-foreground">
                {analytics.activeCampaigns} active, {analytics.completedCampaigns} completed
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <Eye className="h-5 w-5 text-blue-600" />
                <span className="text-sm font-medium text-muted-foreground">Total Views</span>
              </div>
              <div className="text-2xl font-bold mt-2">{(analytics.totalViews / 1000000).toFixed(1)}M</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <ThumbsUp className="h-5 w-5 text-purple-600" />
                <span className="text-sm font-medium text-muted-foreground">Engagement Rate</span>
              </div>
              <div className="text-2xl font-bold mt-2">{analytics.conversionRate}%</div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row */}
        <div className="grid gap-8 lg:grid-cols-2 mb-8">
          {/* Monthly Earnings Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Monthly Earnings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {monthlyEarnings.slice(-6).map((data, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="w-8 text-sm font-medium">{data.month}</div>
                    <div className="flex-1">
                      <Progress 
                        value={(data.amount / maxEarnings) * 100} 
                        className="h-2"
                      />
                    </div>
                    <div className="w-16 text-sm font-medium text-right">
                      ${data.amount.toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Performance Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Performance Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Average Rating</span>
                  <span className="text-2xl font-bold text-yellow-600">{analytics.averageRating}/5</span>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Campaign Success Rate</span>
                    <span>94%</span>
                  </div>
                  <Progress value={94} className="h-2" />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>On-time Delivery</span>
                    <span>98%</span>
                  </div>
                  <Progress value={98} className="h-2" />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Brand Satisfaction</span>
                    <span>96%</span>
                  </div>
                  <Progress value={96} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Campaign Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Campaign Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentCampaigns.map((campaign, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium">{campaign.title}</h4>
                    <p className="text-sm text-muted-foreground">{campaign.company}</p>
                  </div>
                  
                  <div className="flex items-center space-x-6">
                    <div className="text-center">
                      <div className="text-sm font-medium text-green-600">
                        ${campaign.earnings.toLocaleString()}
                      </div>
                      <div className="text-xs text-muted-foreground">Earnings</div>
                    </div>
                    
                    <div className="text-center">
                      <div className="text-sm font-medium">
                        {(campaign.views / 1000).toFixed(0)}K
                      </div>
                      <div className="text-xs text-muted-foreground">Views</div>
                    </div>
                    
                    <div className="text-center">
                      <div className="text-sm font-medium">
                        {(campaign.engagement / 1000).toFixed(1)}K
                      </div>
                      <div className="text-xs text-muted-foreground">Engagement</div>
                    </div>
                    
                    <div className="text-center">
                      <div className="text-sm font-medium">{campaign.performance}%</div>
                      <div className="text-xs text-muted-foreground">Performance</div>
                    </div>
                    
                    <Badge variant="secondary">{campaign.status}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreatorAnalytics;