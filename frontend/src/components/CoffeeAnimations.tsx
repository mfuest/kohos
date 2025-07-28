import { Coffee } from 'lucide-react';

const CoffeeAnimations = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Floating Coffee Beans */}
      <div className="coffee-bean coffee-bean-1">
        <div className="w-3 h-4 bg-gradient-to-br from-amber-800 to-amber-900 rounded-full relative">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-700 to-transparent rounded-full"></div>
        </div>
      </div>

      <div className="coffee-bean coffee-bean-2">
        <div className="w-2 h-3 bg-gradient-to-br from-amber-800 to-amber-900 rounded-full relative">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-700 to-transparent rounded-full"></div>
        </div>
      </div>

      <div className="coffee-bean coffee-bean-3">
        <div className="w-4 h-5 bg-gradient-to-br from-amber-800 to-amber-900 rounded-full relative">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-700 to-transparent rounded-full"></div>
        </div>
      </div>

      {/* Coffee Cup with Steam */}
      <div className="coffee-cup">
        <Coffee className="w-8 h-8 text-coffee-dark opacity-20" />
        <div className="steam-line steam-1"></div>
        <div className="steam-line steam-2"></div>
        <div className="steam-line steam-3"></div>
      </div>

      {/* More floating elements */}
      <div className="coffee-bean coffee-bean-4">
        <div className="w-2.5 h-3.5 bg-gradient-to-br from-amber-800 to-amber-900 rounded-full relative">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-700 to-transparent rounded-full"></div>
        </div>
      </div>

      <div className="coffee-bean coffee-bean-5">
        <div className="w-3.5 h-4.5 bg-gradient-to-br from-amber-800 to-amber-900 rounded-full relative">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-700 to-transparent rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default CoffeeAnimations;
