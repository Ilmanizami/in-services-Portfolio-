
DROP POLICY IF EXISTS "Public read brochures" ON storage.objects;

CREATE POLICY "Public read brochure file"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'brochures' AND name = 'catalog.pdf');
