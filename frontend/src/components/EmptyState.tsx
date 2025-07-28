import { Button } from "./ui/button";
import { Search, Plus } from "lucide-react";

interface EmptyStateProps {
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
  icon?: "search" | "create";
}

const EmptyState = ({ 
  title, 
  description, 
  actionText, 
  onAction, 
  icon = "search" 
}: EmptyStateProps) => {
  const IconComponent = icon === "search" ? Search : Plus;

  return (
    <div className="text-center py-12">
      <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
        <IconComponent className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground mb-6 max-w-md mx-auto">{description}</p>
      {actionText && onAction && (
        <Button onClick={onAction} variant="outline">
          {actionText}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;