import { Badge } from './ui/badge';

interface ApplicationStatusBadgeProps {
  status: 'pending' | 'accepted' | 'rejected' | 'completed';
  className?: string;
}

export default function ApplicationStatusBadge({ 
  status, 
  className = '' 
}: ApplicationStatusBadgeProps) {
  const getVariant = () => {
    switch (status) {
      case 'pending':
        return 'secondary';
      case 'accepted':
        return 'default';
      case 'rejected':
        return 'destructive';
      case 'completed':
        return 'outline';
      default:
        return 'secondary';
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'pending':
        return 'Pending';
      case 'accepted':
        return 'Accepted';
      case 'rejected':
        return 'Rejected';
      case 'completed':
        return 'Completed';
      default:
        return status;
    }
  };

  return (
    <Badge variant={getVariant()} className={className}>
      {getStatusText()}
    </Badge>
  );
} 