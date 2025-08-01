-- Create user profiles table
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  user_type TEXT NOT NULL CHECK (user_type IN ('brand', 'creator')),
  display_name TEXT,
  bio TEXT,
  location TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "Users can view all profiles" 
ON public.profiles 
FOR SELECT 
USING (true);

CREATE POLICY "Users can update their own profile" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" 
ON public.profiles 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Create creator profiles table for additional creator-specific data
CREATE TABLE public.creator_profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE,
  followers_count INTEGER DEFAULT 0,
  engagement_rate DECIMAL(5,2) DEFAULT 0.00,
  categories TEXT[] DEFAULT '{}',
  instagram_handle TEXT,
  tiktok_handle TEXT,
  youtube_handle TEXT,
  average_rating DECIMAL(3,2) DEFAULT 0.00,
  total_campaigns INTEGER DEFAULT 0,
  completed_campaigns INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on creator profiles
ALTER TABLE public.creator_profiles ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for creator profiles
CREATE POLICY "Creator profiles are viewable by everyone" 
ON public.creator_profiles 
FOR SELECT 
USING (true);

CREATE POLICY "Creators can update their own profile" 
ON public.creator_profiles 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Creators can insert their own profile" 
ON public.creator_profiles 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Create brand profiles table for brand-specific data
CREATE TABLE public.brand_profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  company_name TEXT NOT NULL,
  website_url TEXT,
  industry TEXT,
  company_size TEXT,
  total_campaigns INTEGER DEFAULT 0,
  active_campaigns INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on brand profiles
ALTER TABLE public.brand_profiles ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for brand profiles
CREATE POLICY "Brand profiles are viewable by everyone" 
ON public.brand_profiles 
FOR SELECT 
USING (true);

CREATE POLICY "Brands can update their own profile" 
ON public.brand_profiles 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Brands can insert their own profile" 
ON public.brand_profiles 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Create campaigns table
CREATE TABLE public.campaigns (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  brand_user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  budget_min INTEGER,
  budget_max INTEGER,
  deadline DATE,
  location TEXT,
  category TEXT NOT NULL,
  requirements TEXT[] DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'draft', 'completed', 'cancelled')),
  applicants_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on campaigns
ALTER TABLE public.campaigns ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for campaigns
CREATE POLICY "Campaigns are viewable by everyone" 
ON public.campaigns 
FOR SELECT 
USING (true);

CREATE POLICY "Brands can manage their own campaigns" 
ON public.campaigns 
FOR ALL 
USING (auth.uid() = brand_user_id);

-- Create campaign applications table
CREATE TABLE public.campaign_applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  campaign_id UUID NOT NULL REFERENCES public.campaigns(id) ON DELETE CASCADE,
  creator_user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected', 'completed')),
  message TEXT,
  applied_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(campaign_id, creator_user_id)
);

-- Enable RLS on campaign applications
ALTER TABLE public.campaign_applications ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for campaign applications
CREATE POLICY "Creators can view their own applications" 
ON public.campaign_applications 
FOR SELECT 
USING (auth.uid() = creator_user_id);

CREATE POLICY "Brands can view applications for their campaigns" 
ON public.campaign_applications 
FOR SELECT 
USING (auth.uid() IN (SELECT brand_user_id FROM public.campaigns WHERE id = campaign_id));

CREATE POLICY "Creators can create applications" 
ON public.campaign_applications 
FOR INSERT 
WITH CHECK (auth.uid() = creator_user_id);

CREATE POLICY "Creators can update their own applications" 
ON public.campaign_applications 
FOR UPDATE 
USING (auth.uid() = creator_user_id);

CREATE POLICY "Brands can update applications for their campaigns" 
ON public.campaign_applications 
FOR UPDATE 
USING (auth.uid() IN (SELECT brand_user_id FROM public.campaigns WHERE id = campaign_id));

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_creator_profiles_updated_at
  BEFORE UPDATE ON public.creator_profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_brand_profiles_updated_at
  BEFORE UPDATE ON public.brand_profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_campaigns_updated_at
  BEFORE UPDATE ON public.campaigns
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_campaign_applications_updated_at
  BEFORE UPDATE ON public.campaign_applications
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, user_type, display_name)
  VALUES (
    NEW.id, 
    COALESCE(NEW.raw_user_meta_data ->> 'user_type', 'creator'),
    COALESCE(NEW.raw_user_meta_data ->> 'display_name', NEW.email)
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();