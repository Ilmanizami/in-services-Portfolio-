
ALTER TABLE public.testimonials
  ADD COLUMN IF NOT EXISTS client_type text,
  ADD COLUMN IF NOT EXISTS duration text;

-- Lockdown: only the owner email can ever become admin
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.email = 'ilmanizami2k23@gmail.com' THEN
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, 'admin')
    ON CONFLICT DO NOTHING;
  ELSE
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, 'user')
    ON CONFLICT DO NOTHING;
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Revoke any previously granted admin roles from non-owner accounts
DELETE FROM public.user_roles
WHERE role = 'admin'
  AND user_id NOT IN (
    SELECT id FROM auth.users WHERE email = 'ilmanizami2k23@gmail.com'
  );

-- Ensure owner (if already signed up) has admin role
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'::app_role FROM auth.users WHERE email = 'ilmanizami2k23@gmail.com'
ON CONFLICT DO NOTHING;

-- Refresh public insert policy to keep validation, accept new optional fields
DROP POLICY IF EXISTS "Anyone can submit feedback" ON public.testimonials;
CREATE POLICY "Anyone can submit feedback"
ON public.testimonials
FOR INSERT
TO anon, authenticated
WITH CHECK (
  is_approved = false
  AND length(client_name) BETWEEN 1 AND 100
  AND length(feedback_text) BETWEEN 1 AND 1000
  AND length(service_provided) BETWEEN 1 AND 100
  AND rating BETWEEN 1 AND 5
  AND (client_type IS NULL OR client_type IN ('Project-based','Permanent/Retainer'))
  AND (duration IS NULL OR length(duration) <= 50)
);
