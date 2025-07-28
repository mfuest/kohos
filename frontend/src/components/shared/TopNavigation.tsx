import { useState } from 'react';
import { Button } from '../ui/button';
import { Menu, X } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const TopNavigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left - Menu */}
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex items-center space-x-2"
            >
              {isMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              <span>Menu</span>
            </Button>
          </div>

          {/* Center - Kohos */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <Button 
              variant="ghost" 
              className="text-xl font-heading font-bold text-coffee-dark tracking-wide hover:bg-transparent"
              onClick={() => navigate('/')}
            >
              kohos
            </Button>
          </div>

          {/* Right - About & User Actions */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={() => navigate('/about')}>
              About
            </Button>
            {user && (
              <Button variant="outline" size="sm" onClick={signOut}>
                Sign Out
              </Button>
            )}
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-background border-b border-border shadow-lg">
            <div className="container mx-auto px-4 py-4">
              <div className="flex flex-col space-y-2">
                <Button variant="ghost" className="justify-start">
                  For Brands
                </Button>
                <Button variant="ghost" className="justify-start">
                  For Creators
                </Button>
                <Button variant="ghost" className="justify-start">
                  How it Works
                </Button>
                <Button variant="ghost" className="justify-start">
                  Success Stories
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default TopNavigation;