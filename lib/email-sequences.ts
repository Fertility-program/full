// ============================================================
// EMAIL NURTURE SEQUENCES
// 5-email sequence sent after free guide download.
// Provides additional value and guides toward paid plan.
// ============================================================

export type EmailSequenceItem = {
  day: number; // days after signup
  subject: string;
  preheader: string;
  body: string; // HTML content
};

export const GUIDE_DOWNLOAD_SEQUENCE: EmailSequenceItem[] = [
  {
    day: 0,
    subject: "Your Fertility Guide is Ready 📖",
    preheader: "Plus: the #1 mistake couples make when timing intercourse",
    body: `
      <h2>Welcome to Veronica Bloom!</h2>
      <p>Your Complete Fertility Wellness Guide is ready. <a href="{{guideUrl}}">Open it here</a> (or save as PDF with Ctrl+P).</p>
      
      <h3>Quick Win: The #1 Timing Mistake</h3>
      <p>Most couples time intercourse ON ovulation day. But research shows the best days are actually <strong>1-2 days BEFORE ovulation</strong> (O-1 and O-2). Sperm needs time to travel and capacitate.</p>
      
      <p><strong>Action step:</strong> Start using OPK strips from Day 10 of your cycle. When you get a positive, that's your signal — the next 24-36 hours are peak fertility.</p>
      
      <p>Tomorrow I'll share the supplement that improved sperm count by 74% in clinical trials.</p>
    `,
  },
  {
    day: 1,
    subject: "The supplement that improved sperm count 74% 🛡️",
    preheader: "Simple, cheap, and backed by multiple studies",
    body: `
      <h2>Day 2: His Quick Win</h2>
      <p>If your partner does ONE thing for his fertility, it should be this:</p>
      
      <h3>Zinc + Folate = 74% More Sperm</h3>
      <p>A landmark study (Wong et al., 2002) found that men taking <strong>30mg Zinc + 400mcg Folate</strong> daily for 26 weeks had 74% more normal sperm.</p>
      
      <p>Why it works:</p>
      <ul>
        <li>Zinc is required for testosterone synthesis and sperm maturation</li>
        <li>Folate is essential for DNA replication in rapidly dividing sperm cells</li>
        <li>Together they support the entire 74-day spermatogenesis cycle</li>
      </ul>
      
      <p><strong>Action step:</strong> Get a Zinc supplement (30mg) and a B-complex with Folate. Take with breakfast. Results show in semen analysis after 2-3 months.</p>
      
      <p>Want to track his daily supplements and habits? <a href="{{partnerUrl}}">Try the free Partner Dashboard</a>.</p>
    `,
  },
  {
    day: 3,
    subject: "The 3 foods that boost egg quality 🥚",
    preheader: "CoQ10-rich foods your mitochondria will thank you for",
    body: `
      <h2>Day 3: Her Nutrition Focus</h2>
      <p>Egg quality is largely determined by mitochondrial health. Here are 3 foods that directly support your eggs:</p>
      
      <h3>1. Wild Salmon (2-3x/week)</h3>
      <p>Rich in Omega-3 DHA + Astaxanthin — the most powerful antioxidant for reproductive cells. Also provides Vitamin D which supports implantation.</p>
      
      <h3>2. Spinach (daily)</h3>
      <p>Packed with Folate (natural form), Iron, and Magnesium. One cup provides 65% of daily folate needs. Iron supports ovulation — the Nurses' Health Study found adequate iron reduces ovulatory infertility by 40%.</p>
      
      <h3>3. Walnuts (handful daily)</h3>
      <p>The only nut with significant ALA Omega-3. Also provides L-Arginine (improves blood flow to uterus) and antioxidants that protect egg DNA.</p>
      
      <p><strong>Action step:</strong> Add one of these to today's meal. Our <a href="{{nutritionUrl}}">7-day meal plan</a> includes all three in delicious, budget-friendly recipes.</p>
    `,
  },
  {
    day: 5,
    subject: "Why your fertile window might be wrong ⏰",
    preheader: "The calendar method fails 20% of women. Here's what works.",
    body: `
      <h2>Day 5: Timing Precision</h2>
      <p>The "Day 14 ovulation" rule is a myth for many women. Studies show:</p>
      
      <ul>
        <li>Only 30% of women ovulate on Day 14</li>
        <li>Ovulation can range from Day 11 to Day 21</li>
        <li>Cycle length varies — ovulation is always 14 days BEFORE your next period, not 14 days after your last</li>
        <li>Stress, travel, illness can delay ovulation by days or weeks</li>
      </ul>
      
      <h3>The Solution: Triple Confirmation</h3>
      <ol>
        <li><strong>OPK strips</strong> — detects LH surge 24-36 hours before ovulation (most reliable)</li>
        <li><strong>Cervical mucus</strong> — egg-white consistency = peak fertility</li>
        <li><strong>BBT tracking</strong> — confirms ovulation happened (retrospective)</li>
      </ol>
      
      <p><strong>Action step:</strong> Our <a href="{{cycleUrl}}">Cycle Tracker</a> combines all three methods and predicts your personal fertile window. Set it up in 2 minutes.</p>
    `,
  },
  {
    day: 7,
    subject: "Your personalized fertility plan is waiting 🌸",
    preheader: "Cycle-synced exercises, meal plans, and tracking — all in one place",
    body: `
      <h2>Day 7: Putting It All Together</h2>
      <p>Over the past week you've learned about:</p>
      <ul>
        <li>✅ Optimal intercourse timing (O-2 and O-1 are best)</li>
        <li>✅ His supplement protocol (Zinc + Folate = 74% improvement)</li>
        <li>✅ Egg quality nutrition (salmon, spinach, walnuts)</li>
        <li>✅ Precise fertile window tracking (OPK + CM + BBT)</li>
      </ul>
      
      <p>But knowing isn't enough — <strong>consistency is what creates results</strong>.</p>
      
      <h3>What the Full Program Gives You:</h3>
      <ul>
        <li>📅 Daily cycle-synced exercises (adapts to your phase)</li>
        <li>🥗 Rotating meal plans with shopping lists</li>
        <li>💊 Supplement reminders with tracking</li>
        <li>📊 Progress analytics and weekly summaries</li>
        <li>💑 Couple Mode — sync with your partner</li>
        <li>🔬 Spermiogram tracking for him</li>
        <li>🎯 Fertile window alerts for both</li>
      </ul>
      
      <p>The free plan gives you 7 days. Ready for the full journey?</p>
      
      <p><a href="{{quizUrl}}"><strong>Take the Free Assessment →</strong></a></p>
      <p><small>Or continue with the free plan — no pressure. We're here whenever you're ready.</small></p>
    `,
  },
];

// Helper to get the email for a specific day
export function getSequenceEmail(day: number): EmailSequenceItem | undefined {
  return GUIDE_DOWNLOAD_SEQUENCE.find((e) => e.day === day);
}

// Helper to replace template variables
export function renderEmail(
  email: EmailSequenceItem,
  vars: Record<string, string>
): { subject: string; body: string } {
  let body = email.body;
  for (const [key, value] of Object.entries(vars)) {
    body = body.replace(new RegExp(`{{${key}}}`, "g"), value);
  }
  return { subject: email.subject, body };
}
