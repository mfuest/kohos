'use client';

import TopNavigation from '@/components/shared/TopNavigation';
import { Button } from '@/components/ui/button';
import { Coffee, Users, Heart, MapPin, Camera, Circle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function AboutPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-brand-light/5 relative overflow-hidden">
      <TopNavigation />

      {/* Floating geometric elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-primary/10 blur-xl animate-pulse"></div>
        <div className="absolute top-1/3 right-16 w-24 h-24 rotate-45 bg-brand-light/20 blur-lg"></div>
        <div className="absolute bottom-1/4 left-1/4 w-40 h-40 rounded-full bg-coffee-medium/5 blur-2xl"></div>
        <Circle className="absolute top-1/2 right-1/3 w-16 h-16 text-primary/20 animate-[spin_20s_linear_infinite]" />
      </div>

      <div className="relative z-10 pt-16">
        {/* Hero Section - Ultra Modern */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[80vh]">
            {/* Left - Text Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full text-sm text-primary font-medium">
                  <MapPin className="w-4 h-4 mr-2" />
                  Munich Coffee Culture
                </div>
                <h1 className="text-5xl md:text-7xl font-heading font-bold leading-tight">
                  More than{' '}
                  <span className="relative">
                    coffee
                    <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-primary rounded-full"></div>
                  </span>
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-primary">
                    It&apos;s connection
                  </span>
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed max-w-xl">
                  In Munich, every cup tells a story. Every café is a meeting
                  place. Every conversation over coffee creates something
                  extraordinary.
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <Button
                  size="lg"
                  className="bg-gradient-primary text-white hover:scale-105 transition-all duration-300 shadow-glow"
                  onClick={() => router.push('/auth')}
                >
                  <Camera className="w-5 h-5 mr-2" />
                  Start Creating
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-primary/20 hover:bg-primary/5 transition-all duration-300"
                >
                  Explore Culture
                </Button>
              </div>
            </div>

            {/* Right - Hero Image */}
            <div className="relative">
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-card to-card/50 backdrop-blur-sm border border-border shadow-elegant">
                <Image
                  src="/lovable-uploads/d00fcc8a-0ba1-49e8-85ed-f91920a5b3e7.png"
                  alt="Munich architecture and community spaces"
                  width={800}
                  height={500}
                  className="w-full h-[500px] object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-2xl font-semibold mb-2">
                    Munich&apos;s Heart
                  </h3>
                  <p className="text-white/80">Where stories begin</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mission Section - Minimalist */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-32">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <h2 className="text-4xl md:text-6xl font-heading font-bold leading-tight">
                  Where{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-primary">
                    stories
                  </span>
                  <br />
                  come alive
                </h2>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Munich&apos;s specialty coffee culture isn&apos;t just about
                  the perfect extraction or artisan roasting. It&apos;s about
                  the conversations that happen between strangers, the ideas
                  born over shared tables, and the community that forms around
                  something as simple as a cup of coffee.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-2 h-2 rounded-full bg-primary mt-3 flex-shrink-0"></div>
                  <p className="text-muted-foreground">
                    Authentic connections over exceptional coffee
                  </p>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-2 h-2 rounded-full bg-primary mt-3 flex-shrink-0"></div>
                  <p className="text-muted-foreground">
                    Creators sharing genuine Munich experiences
                  </p>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-2 h-2 rounded-full bg-primary mt-3 flex-shrink-0"></div>
                  <p className="text-muted-foreground">
                    Community-driven storytelling that matters
                  </p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent rounded-3xl blur-3xl"></div>
              <div className="relative bg-card/30 backdrop-blur-sm rounded-3xl border border-border p-8">
                <div className="text-center space-y-6">
                  <div className="w-16 h-16 bg-gradient-primary rounded-2xl mx-auto flex items-center justify-center">
                    <Coffee className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-semibold">The Kohos Way</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    We believe the best brand stories aren&apos;t scripted.
                    They&apos;re discovered in the authentic moments between
                    people, places, and shared experiences.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Creator CTA Section - Ultra Modern */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl pb-24">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary/10 via-brand-light/20 to-primary/5 p-12 md:p-16 border border-primary/20">
            <div className="absolute inset-0 bg-[url('/lovable-uploads/d00fcc8a-0ba1-49e8-85ed-f91920a5b3e7.png')] bg-cover bg-center opacity-5"></div>
            <div className="relative z-10 text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center px-6 py-3 bg-primary/20 rounded-full text-primary font-medium mb-8">
                <Users className="w-5 h-5 mr-2" />
                Join the Movement
              </div>

              <h2 className="text-4xl md:text-6xl font-heading font-bold text-coffee-dark mb-6">
                Become a{' '}
                <span className="text-transparent bg-clip-text bg-gradient-primary">
                  Coffee Storyteller
                </span>
              </h2>

              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Are you a creator who understands that the best content comes
                from authentic experiences? Join Kohos and become part of
                Munich&apos;s coffee storytelling community.
              </p>

              <div className="grid md:grid-cols-3 gap-6 mb-10">
                <div className="bg-background/60 backdrop-blur-sm rounded-2xl p-6 border border-border">
                  <Coffee className="w-8 h-8 text-primary mx-auto mb-3" />
                  <h4 className="font-semibold text-coffee-dark mb-2">
                    Free Coffee
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Premium beans, artisan preparation
                  </p>
                </div>
                <div className="bg-background/60 backdrop-blur-sm rounded-2xl p-6 border border-border">
                  <Camera className="w-8 h-8 text-primary mx-auto mb-3" />
                  <h4 className="font-semibold text-coffee-dark mb-2">
                    Creative Freedom
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Authentic brand partnerships
                  </p>
                </div>
                <div className="bg-background/60 backdrop-blur-sm rounded-2xl p-6 border border-border">
                  <Heart className="w-8 h-8 text-primary mx-auto mb-3" />
                  <h4 className="font-semibold text-coffee-dark mb-2">
                    Community
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Be part of something bigger
                  </p>
                </div>
              </div>

              <Button
                size="lg"
                className="bg-gradient-primary text-white hover:scale-105 transition-all duration-300 shadow-glow text-lg px-8 py-6"
                onClick={() => router.push('/auth')}
              >
                Start Your Coffee Story
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const dynamic = 'force-dynamic';
