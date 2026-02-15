-- Add qualifying lead fields to contact_submissions
ALTER TABLE public.contact_submissions
ADD COLUMN IF NOT EXISTS budget text,
ADD COLUMN IF NOT EXISTS timeline text,
ADD COLUMN IF NOT EXISTS property_type text,
ADD COLUMN IF NOT EXISTS num_floors text,
ADD COLUMN IF NOT EXISTS material_preference text,
ADD COLUMN IF NOT EXISTS lead_source text DEFAULT 'contact_form';