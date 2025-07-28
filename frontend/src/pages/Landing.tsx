import { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import UserTypeCard from "../components/shared/UserTypeCard";
import SignInDialog from "../components/shared/SignInDialog";
import TypewriterText from "../components/TypewriterText";
import TopNavigation from "../components/shared/TopNavigation";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
const Landing = () => {
  const [signInOpen, setSignInOpen] = useState(false);
  const [selectedUserType, setSelectedUserType] = useState<"Brand" | "Creator">("Creator");
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      // Redirect based on user type or default to creator marketplace
      navigate('/creator-marketplace');
    }
  }, [user, navigate]);
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-brand-light/20 relative overflow-hidden">
      <TopNavigation />
      
      {/* Large background typewriter text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <TypewriterText 
          text="kohos" 
          className="text-9xl md:text-[12rem] lg:text-[16rem] xl:text-[20rem] font-heading tracking-wide leading-none font-extrabold text-coffee-dark/10 select-none"
          typeSpeed={200}
          deleteSpeed={150}
          pauseDuration={3000}
        />
      </div>
      
      <div className="flex items-center justify-center min-h-screen pt-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            <UserTypeCard 
              title="Brand" 
              description="Find creators for your campaigns" 
              features={[]} 
              ctaText="Continue as Brand" 
              ctaLink="/brands" 
              variant="roaster" 
              onCtaClick={() => {
                setSelectedUserType("Brand");
                setSignInOpen(true);
              }} 
            />
            
            <UserTypeCard 
              title="Creator" 
              description="Discover brand partnerships" 
              features={[]} 
              ctaText="Continue as Creator" 
              ctaLink="/creators" 
              variant="creator" 
              onCtaClick={() => {
                setSelectedUserType("Creator");
                setSignInOpen(true);
              }} 
            />
          </div>
        </div>
      </div>

      <SignInDialog open={signInOpen} onOpenChange={setSignInOpen} userType={selectedUserType} />
    </div>
  );
};
export default Landing;