import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Link } from "react-router-dom";
interface UserTypeCardProps {
  title: string;
  description: string;
  features: string[];
  ctaText: string;
  ctaLink: string;
  variant: "roaster" | "creator";
  onCtaClick?: () => void;
}
const UserTypeCard = ({
  title,
  description,
  features,
  ctaText,
  ctaLink,
  variant,
  onCtaClick
}: UserTypeCardProps) => {
  return <Card className="h-full hover:shadow-elegant transition-all duration-300 border-0 bg-card/50 text-center p-12">
      <CardHeader className="pb-8">
        <CardTitle className="text-2xl font-heading mb-4 font-bold">{title}</CardTitle>
        <CardDescription className="text-base font-serif leading-relaxed">{description}</CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-8">
        <ul className="space-y-2">
          {features.map((feature, index) => <li key={index} className="text-sm text-muted-foreground font-sans">
              {feature}
            </li>)}
        </ul>
        
        <Button variant="outline" size="lg" className="w-full font-sans text-sm tracking-wide" onClick={onCtaClick}>
          {ctaText}
        </Button>
      </CardContent>
    </Card>;
};
export default UserTypeCard;