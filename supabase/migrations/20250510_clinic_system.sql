-- ============================================================
-- CLINIC SYSTEM — Access codes, patient tracking, clinic profiles
-- ============================================================

-- Clinics table
CREATE TABLE IF NOT EXISTS clinics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug VARCHAR(50) NOT NULL UNIQUE,
  name VARCHAR(255) NOT NULL,
  access_code VARCHAR(20) NOT NULL UNIQUE,
  logo_url TEXT,
  brand_color VARCHAR(7), -- hex color e.g. #5ba89d
  welcome_message TEXT,
  plan_duration VARCHAR(10) DEFAULT '30' CHECK (plan_duration IN ('30', '90', 'unlimited')),
  contact_email VARCHAR(255),
  contact_name VARCHAR(255),
  country VARCHAR(100),
  patients_count INTEGER DEFAULT 0,
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_clinics_slug ON clinics(slug);
CREATE INDEX IF NOT EXISTS idx_clinics_access_code ON clinics(access_code);

-- Clinic patients (which users belong to which clinic)
CREATE TABLE IF NOT EXISTS clinic_patients (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  clinic_id UUID NOT NULL REFERENCES clinics(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  activated_at TIMESTAMPTZ DEFAULT NOW(),
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'paused', 'expired')),
  UNIQUE(clinic_id, user_id)
);

CREATE INDEX IF NOT EXISTS idx_clinic_patients_clinic ON clinic_patients(clinic_id);
CREATE INDEX IF NOT EXISTS idx_clinic_patients_user ON clinic_patients(user_id);

-- Add clinic_id to profiles table (create profiles if not exists)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  quiz_data JSONB,
  plan VARCHAR(20) DEFAULT 'free',
  premium BOOLEAN DEFAULT FALSE,
  current_day INTEGER DEFAULT 1,
  purchase_date DATE,
  expiry_date DATE,
  clinic_id UUID REFERENCES clinics(id) ON DELETE SET NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- If profiles already exists but doesn't have clinic_id
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS clinic_id UUID REFERENCES clinics(id) ON DELETE SET NULL;

-- Function to increment patient count
CREATE OR REPLACE FUNCTION increment_clinic_patients(clinic_id_input UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE clinics SET patients_count = patients_count + 1, updated_at = NOW()
  WHERE id = clinic_id_input;
END;
$$ LANGUAGE plpgsql;

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

ALTER TABLE clinics ENABLE ROW LEVEL SECURITY;
ALTER TABLE clinic_patients ENABLE ROW LEVEL SECURITY;

-- Clinics: anyone can read active clinics (for /clinic/[slug] page)
CREATE POLICY "Anyone can view active clinics" ON clinics
  FOR SELECT USING (active = true);

-- Clinic patients: users can see their own records
CREATE POLICY "Users can view own clinic membership" ON clinic_patients
  FOR SELECT USING (auth.uid() = user_id);

-- Clinic patients: authenticated users can insert (activate code)
CREATE POLICY "Users can activate clinic code" ON clinic_patients
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- ============================================================
-- SEED: Example clinic for testing
-- ============================================================

INSERT INTO clinics (slug, name, access_code, brand_color, welcome_message, plan_duration, contact_email, country)
VALUES (
  'demo-clinic',
  'Demo Fertility Clinic',
  'DEMO2025',
  '#5ba89d',
  'Welcome! Your clinic has partnered with Veronica Bloom to support your fertility journey with evidence-based lifestyle optimization.',
  '90',
  'demo@example.com',
  'Serbia'
) ON CONFLICT (slug) DO NOTHING;
