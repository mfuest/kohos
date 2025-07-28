import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import Link from 'next/link';
import { User } from 'lucide-react';

const BrandHeader = () => {
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/brand-dashboard" className="flex items-center">
            <span className="font-heading tracking-wide text-foreground font-bold text-xl">
              K
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href="/brand-analytics"
              className="text-muted-foreground hover:text-foreground transition-colors font-sans text-sm"
            >
              Analytics
            </Link>
            <Link
              href="/browse-creators"
              className="text-muted-foreground hover:text-foreground transition-colors font-sans text-sm"
            >
              Browse Creators
            </Link>
            <Link
              href="/brand-campaigns"
              className="text-muted-foreground hover:text-foreground transition-colors font-sans text-sm"
            >
              My Campaigns
            </Link>
          </nav>

          <div className="flex items-center space-x-3">
            <Link href="/brand-profile">
              <Avatar className="h-8 w-8 cursor-pointer hover:ring-2 hover:ring-coffee-light transition-all">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback className="text-xs">
                  <User className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default BrandHeader;
