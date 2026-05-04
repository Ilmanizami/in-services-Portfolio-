-- Allow public submissions to appear instantly (no approval barrier)
DROP POLICY IF EXISTS "Anyone can submit feedback" ON public.testimonials;

CREATE POLICY "Anyone can submit feedback"
ON public.testimonials
FOR INSERT
TO anon, authenticated
WITH CHECK (
  length(client_name) BETWEEN 1 AND 100
  AND length(feedback_text) BETWEEN 1 AND 1000
  AND length(service_provided) BETWEEN 1 AND 100
  AND rating BETWEEN 1 AND 5
  AND (client_type IS NULL OR client_type IN ('Project-based','Permanent/Retainer'))
  AND (duration IS NULL OR length(duration) <= 50)
);

-- Default new testimonials to approved so they appear instantly
ALTER TABLE public.testimonials ALTER COLUMN is_approved SET DEFAULT true;

-- Backfill any pending ones to visible
UPDATE public.testimonials SET is_approved = true WHERE is_approved = false;