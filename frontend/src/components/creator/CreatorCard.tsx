import { Card, CardContent, CardHeader } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { MapPin, Users } from 'lucide-react';

interface CreatorCardProps {
  name: string;
  bio: string;
  location: string;
  followers: string;
  engagement: string;
  specialty: string[];
  rate: string;
  avatar?: string;
}

const CreatorCard = ({
  name,
  bio,
  location,
  followers,
  engagement,
  specialty,
  rate,
}: CreatorCardProps) => {
  return (
    <Card className="hover:shadow-lg transition-all duration-300 bg-card/50">
      <CardHeader className="pb-4">
        <div className="flex items-start space-x-4">
          <div className="w-16 h-16 bg-coffee-light rounded-full flex items-center justify-center">
            <span className="text-coffee-dark font-inter font-medium text-lg">
              {name
                .split(' ')
                .map(n => n[0])
                .join('')
                .slice(0, 2)}
            </span>
          </div>
          <div className="flex-1">
            <h3 className="font-inter font-semibold text-lg mb-1">{name}</h3>
            <div className="flex items-center text-muted-foreground text-sm mb-2">
              <MapPin className="h-4 w-4 mr-1" />
              {location}
            </div>
            <p className="text-sm text-muted-foreground font-serif leading-relaxed">
              {bio}
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">{followers} followers</span>
          </div>
          <div className="text-muted-foreground">{engagement} engagement</div>
        </div>

        <div className="flex flex-wrap gap-2">
          {specialty.map((spec, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {spec}
            </Badge>
          ))}
        </div>

        <div className="flex items-center justify-between pt-2">
          <div>
            <span className="text-sm text-muted-foreground">Rate from</span>
            <div className="font-inter font-semibold text-lg">{rate}</div>
          </div>
          <Button variant="outline" size="sm">
            View Profile
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CreatorCard;
