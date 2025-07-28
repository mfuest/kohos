import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Calendar, DollarSign, Users, MapPin } from "lucide-react";

interface CampaignCardProps {
  title: string;
  company: string;
  budget: string;
  deadline: string;
  category: string;
  location: string;
  description: string;
  requirements: string[];
  applicants?: number;
  showEditButton?: boolean;
}

const CampaignCard = ({ 
  title, 
  company, 
  budget, 
  deadline, 
  category, 
  location, 
  description, 
  requirements,
  applicants = 0,
  showEditButton = false
}: CampaignCardProps) => {
  return (
    <Card className="hover:shadow-elegant transition-all duration-300 border hover:border-primary/20">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <CardTitle className="text-lg font-semibold leading-tight">{title}</CardTitle>
            <CardDescription className="text-base font-medium text-foreground">{company}</CardDescription>
          </div>
          <Badge variant="secondary" className="bg-brand-light text-brand">
            {category}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-muted-foreground text-sm line-clamp-2">{description}</p>
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <DollarSign className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">{budget}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>{deadline}</span>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span>{location}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span>{applicants} applied</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Requirements:</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            {requirements.slice(0, 2).map((req, index) => (
              <li key={index} className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0"></div>
                <span>{req}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <Button variant={showEditButton ? "outline" : "gradient"} className="w-full">
          {showEditButton ? "Edit Campaign" : "Apply Now"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default CampaignCard;