import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';

interface SignInDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userType?: 'Brand' | 'Creator';
}

const SignInDialog = ({ open, onOpenChange, userType }: SignInDialogProps) => {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push('/auth');
    onOpenChange(false);
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-inter text-center mb-2">
            Sign In
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Button
            className="w-full justify-center space-x-3"
            size="lg"
            onClick={handleGetStarted}
          >
            <span>Get Started as {userType}</span>
          </Button>
        </div>

        <div className="text-center mt-6">
          <p className="text-sm text-muted-foreground">
            Create an account or sign in to access your dashboard.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SignInDialog;
