
-- Applications table
CREATE TABLE public.applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text NOT NULL,
  role_type text NOT NULL CHECK (role_type IN ('Internship','Volunteership','Paid Project')),
  skills text NOT NULL,
  portfolio_link text,
  message text,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit applications"
  ON public.applications FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    length(full_name) BETWEEN 1 AND 100
    AND length(email) BETWEEN 3 AND 255
    AND length(skills) BETWEEN 1 AND 1000
    AND (portfolio_link IS NULL OR length(portfolio_link) <= 500)
    AND (message IS NULL OR length(message) <= 2000)
  );

CREATE POLICY "Admins read applications"
  ON public.applications FOR SELECT
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins manage applications"
  ON public.applications FOR ALL
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Brochures storage bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('brochures','brochures', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public read brochures"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'brochures');

CREATE POLICY "Admins write brochures"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'brochures' AND has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins update brochures"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'brochures' AND has_role(auth.uid(), 'admin'::app_role));
