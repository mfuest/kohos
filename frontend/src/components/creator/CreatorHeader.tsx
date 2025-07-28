import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { User } from 'lucide-react';
import Link from 'next/link';

const CreatorHeader = () => {
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link
          href="/creator-marketplace"
          className="text-xl font-heading font-light"
        >
          <span className="text-coffee-dark font-extrabold">K</span>
        </Link>

        <nav className="flex items-center space-x-6">
          <Link
            href="/creator-marketplace"
            className="text-sm hover:text-coffee-dark transition-colors"
          >
            Campaigns
          </Link>
          <Link
            href="/creator-analytics"
            className="text-sm hover:text-coffee-dark transition-colors"
          >
            Analytics
          </Link>
        </nav>

        <Link href="/creator-profile">
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center space-x-2"
          >
            <Avatar className="h-8 w-8">
              <AvatarImage src="" />
              <AvatarFallback>
                <User className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
            <span className="hidden sm:inline">My Profile</span>
          </Button>
        </Link>
      </div>
    </header>
  );
};

export default CreatorHeader;
