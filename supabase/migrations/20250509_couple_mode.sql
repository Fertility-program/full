-- ============================================================
-- COUPLE MODE — Links two users for shared fertility journey
-- ============================================================

-- Couples table
CREATE TABLE IF NOT EXISTS couples (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  partner_a UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  partner_b UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  invite_code VARCHAR(6) NOT NULL UNIQUE,
  status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'paused')),
  start_date DATE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Unique constraint: one active couple per user
CREATE UNIQUE INDEX IF NOT EXISTS idx_couples_partner_a ON couples(partner_a);
CREATE INDEX IF NOT EXISTS idx_couples_partner_b ON couples(partner_b);
CREATE INDEX IF NOT EXISTS idx_couples_invite_code ON couples(invite_code);

-- Partner daily habits tracking
CREATE TABLE IF NOT EXISTS partner_habits (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  habits JSONB DEFAULT '{}',
  supplements JSONB DEFAULT '{}',
  habits_completed INTEGER DEFAULT 0,
  streak INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, date)
);

CREATE INDEX IF NOT EXISTS idx_partner_habits_user_date ON partner_habits(user_id, date);

-- Partner daily check-ins (male-specific)
CREATE TABLE IF NOT EXISTS partner_checkins (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  sleep INTEGER CHECK (sleep >= 1 AND sleep <= 10),
  energy INTEGER CHECK (energy >= 1 AND energy <= 10),
  stress INTEGER CHECK (stress >= 1 AND stress <= 10),
  exercise BOOLEAN DEFAULT FALSE,
  alcohol BOOLEAN DEFAULT FALSE,
  heat_exposure BOOLEAN DEFAULT FALSE,
  notes TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, date)
);

CREATE INDEX IF NOT EXISTS idx_partner_checkins_user_date ON partner_checkins(user_id, date);

-- Spermiogram entries
CREATE TABLE IF NOT EXISTS spermiogram_entries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  entry_id VARCHAR(64) NOT NULL,
  date DATE NOT NULL,
  volume DECIMAL(4,2),
  concentration DECIMAL(6,2),
  total_count DECIMAL(8,2),
  motility DECIMAL(5,2),
  total_motility DECIMAL(5,2),
  morphology DECIMAL(5,2),
  vitality DECIMAL(5,2),
  ph DECIMAL(3,1),
  white_blood_cells DECIMAL(4,2),
  lab VARCHAR(255),
  notes TEXT,
  abstinence_days INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, entry_id)
);

CREATE INDEX IF NOT EXISTS idx_spermiogram_user_date ON spermiogram_entries(user_id, date);

-- Couple achievements
CREATE TABLE IF NOT EXISTS couple_achievements (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  couple_id UUID NOT NULL REFERENCES couples(id) ON DELETE CASCADE,
  achievement_id VARCHAR(64) NOT NULL,
  unlocked_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(couple_id, achievement_id)
);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

ALTER TABLE couples ENABLE ROW LEVEL SECURITY;
ALTER TABLE partner_habits ENABLE ROW LEVEL SECURITY;
ALTER TABLE partner_checkins ENABLE ROW LEVEL SECURITY;
ALTER TABLE spermiogram_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE couple_achievements ENABLE ROW LEVEL SECURITY;

-- Couples: users can see their own couple
CREATE POLICY "Users can view own couple" ON couples
  FOR SELECT USING (auth.uid() = partner_a OR auth.uid() = partner_b);

CREATE POLICY "Users can insert couple" ON couples
  FOR INSERT WITH CHECK (auth.uid() = partner_a);

CREATE POLICY "Users can update own couple" ON couples
  FOR UPDATE USING (auth.uid() = partner_a OR auth.uid() = partner_b);

-- Partner habits: users can manage their own
CREATE POLICY "Users can manage own partner habits" ON partner_habits
  FOR ALL USING (auth.uid() = user_id);

-- Allow partner to view habits (for couple dashboard)
CREATE POLICY "Partner can view habits" ON partner_habits
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM couples
      WHERE status = 'active'
      AND ((partner_a = auth.uid() AND partner_b = user_id)
        OR (partner_b = auth.uid() AND partner_a = user_id))
    )
  );

-- Partner checkins: users can manage their own
CREATE POLICY "Users can manage own partner checkins" ON partner_checkins
  FOR ALL USING (auth.uid() = user_id);

-- Spermiogram: users can manage their own
CREATE POLICY "Users can manage own spermiogram" ON spermiogram_entries
  FOR ALL USING (auth.uid() = user_id);

-- Allow partner to view spermiogram
CREATE POLICY "Partner can view spermiogram" ON spermiogram_entries
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM couples
      WHERE status = 'active'
      AND ((partner_a = auth.uid() AND partner_b = user_id)
        OR (partner_b = auth.uid() AND partner_a = user_id))
    )
  );

-- Couple achievements: both partners can view
CREATE POLICY "Couple members can view achievements" ON couple_achievements
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM couples
      WHERE id = couple_id
      AND (partner_a = auth.uid() OR partner_b = auth.uid())
    )
  );

CREATE POLICY "Couple members can insert achievements" ON couple_achievements
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM couples
      WHERE id = couple_id
      AND (partner_a = auth.uid() OR partner_b = auth.uid())
    )
  );
