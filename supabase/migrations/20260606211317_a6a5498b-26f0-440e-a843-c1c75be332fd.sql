ALTER TABLE public.projects
  ADD COLUMN IF NOT EXISTS category text,
  ADD COLUMN IF NOT EXISTS project_type text NOT NULL DEFAULT 'image',
  ADD COLUMN IF NOT EXISTS thumbnail_url text,
  ADD COLUMN IF NOT EXISTS video_url text,
  ADD COLUMN IF NOT EXISTS project_url text;

ALTER TABLE public.projects DROP CONSTRAINT IF EXISTS projects_project_type_check;
ALTER TABLE public.projects ADD CONSTRAINT projects_project_type_check
  CHECK (project_type IN ('image','video'));