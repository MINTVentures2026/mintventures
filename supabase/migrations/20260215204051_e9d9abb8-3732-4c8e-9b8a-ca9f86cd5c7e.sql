
-- Table for contact form submissions (public-facing, no auth required)
CREATE TABLE public.contact_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  parent_name TEXT NOT NULL,
  email TEXT NOT NULL,
  child_age TEXT NOT NULL,
  location TEXT NOT NULL,
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.contact_requests ENABLE ROW LEVEL SECURITY;

-- Allow anyone to INSERT (public contact form)
CREATE POLICY "Anyone can submit a contact request"
  ON public.contact_requests
  FOR INSERT
  WITH CHECK (true);

-- Only authenticated users (admin) can read submissions
CREATE POLICY "Only authenticated users can read contact requests"
  ON public.contact_requests
  FOR SELECT
  USING (auth.uid() IS NOT NULL);
