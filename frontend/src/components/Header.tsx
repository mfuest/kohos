import { Button } from './ui/button';
import Link from 'next/link';
const Header = () => {
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center">
            <span className="font-heading tracking-wide text-foreground text-left font-bold text-xl">
              K
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href="/brands"
              className="text-muted-foreground hover:text-foreground transition-colors font-sans text-sm"
            >
              Brands
            </Link>
            <Link
              href="/creators"
              className="text-muted-foreground hover:text-foreground transition-colors font-sans text-sm"
            >
              Creators
            </Link>
            <Link
              href="/campaigns"
              className="text-muted-foreground hover:text-foreground transition-colors font-sans text-sm"
            >
              Campaigns
            </Link>
          </nav>

          <div className="flex items-center space-x-3">
            <Button variant="ghost" asChild>
              <Link href="/login" className="font-sans text-sm">
                Sign In
              </Link>
            </Button>
            <Button variant="coffee" asChild>
              <Link href="/signup" className="font-sans text-sm">
                Join
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;
