-- ============================================================
-- FIX RLS POLICIES — ensure clinic code activation works
-- ============================================================

-- Allow any authenticated user to read active clinics (for code validation)
DROP POLICY IF EXISTS "Anyone can view active clinics" ON clinics;
CREATE POLICY "Anyone can view active clinics" ON clinics
  FOR SELECT USING (active = true);

-- Allow anon users too (for /clinic/[slug] page before login)
ALTER TABLE clinics FORCE ROW LEVEL SECURITY;
CREATE POLICY "Anon can view active clinics" ON clinics
  FOR SELECT TO anon USING (active = true);

-- Profiles: allow users to insert their own profile
CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Profiles: allow users to update their own profile
CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Profiles: allow users to read their own profile
CREATE POLICY "Users can read own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

-- Clinic patients: ensure insert works for authenticated users
DROP POLICY IF EXISTS "Users can activate clinic code" ON clinic_patients;
CREATE POLICY "Users can activate clinic code" ON clinic_patients
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Clinic patients: allow upsert (for re-activation)
CREATE POLICY "Users can update own clinic membership" ON clinic_patients
  FOR UPDATE USING (auth.uid() = user_id);
