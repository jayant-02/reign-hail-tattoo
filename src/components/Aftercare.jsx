import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, CheckCircle, Clock, Calendar, Droplets, Sun, Shield, Ban } from 'lucide-react';

const PRE_CARE = [
  {
    step: '1',
    icon: <Shield size={18} />,
    title: 'Stay Hydrated',
    desc: 'Drink plenty of water in the 48 hours before your appointment. Well-hydrated skin accepts ink more evenly and heals faster.',
  },
  {
    step: '2',
    icon: <Sun size={18} />,
    title: 'Avoid Sun Exposure',
    desc: 'Keep the planned tattoo area out of direct sunlight for at least 2 weeks prior. Sunburned or tanned skin cannot be tattooed.',
  },
  {
    step: '3',
    icon: <Ban size={18} />,
    title: 'No Alcohol',
    desc: 'Do not drink alcohol for 24 hours before your session. Alcohol thins the blood, causing excessive bleeding and poor ink retention.',
  },
  {
    step: '4',
    icon: <CheckCircle size={18} />,
    title: 'Eat Beforehand',
    desc: 'Have a full, nutritious meal 1–2 hours before your appointment. Low blood sugar during a session can cause light-headedness and fainting.',
  },
  {
    step: '5',
    icon: <Droplets size={18} />,
    title: 'Moisturise the Area',
    desc: 'Apply unscented moisturiser to the tattoo area for 5–7 days leading up to your session. Supple skin is easier to work with.',
  },
  {
    step: '6',
    icon: <Shield size={18} />,
    title: 'Wear Appropriate Clothing',
    desc: 'Wear or bring loose-fitting clothing that provides easy access to the tattoo area. Dark colours are recommended in case of ink splatter.',
  },
];

const POST_CARE_TIMELINE = [
  {
    period: 'First 2–4 Hours',
    icon: <Clock size={16} />,
    steps: [
      'Keep the initial wrap or second skin bandage intact.',
      'Do not touch, pick, or re-wrap with cling film.',
      'Keep it dry and out of sunlight.',
    ],
  },
  {
    period: 'Day 1–3',
    icon: <Droplets size={16} />,
    steps: [
      'Wash gently with lukewarm water and antibacterial, unscented soap — twice daily.',
      'Pat dry with a clean paper towel. Never rub.',
      'Apply a paper-thin layer of unscented tattoo aftercare balm or coconut oil.',
      'Let the tattoo breathe — no cling film, no tight clothing over it.',
    ],
  },
  {
    period: 'Days 4–14',
    icon: <CheckCircle size={16} />,
    steps: [
      'Peeling and slight itching is completely normal — do NOT scratch or pick.',
      'Continue washing and moisturising 2–3 times daily.',
      'Avoid soaking in baths, swimming pools, or hot tubs.',
      'Wear SPF 50 if the area is exposed to sun.',
    ],
  },
  {
    period: 'Weeks 2–4',
    icon: <Calendar size={16} />,
    steps: [
      'The outer skin will heal but deeper layers are still settling.',
      'Continue using SPF 30+ on the healed area whenever outdoors.',
      'Avoid heavy gym sessions that stretch or sweat over the fresh tattoo excessively.',
      'Book your free touch-up check within 6–8 weeks if needed.',
    ],
  },
];

const AVOID_LIST = [
  'Direct sunlight and sunbeds',
  'Swimming pools, sea, and hot tubs',
  'Picking at scabs or peeling skin',
  'Tight clothing rubbing the area',
  'Shaving over a healing tattoo',
  'Applying petroleum jelly (Vaseline)',
  'Strong perfumed products on the area',
  'Excessive gym/cardio for 2 weeks',
];

export default function Aftercare() {
  const [tab, setTab] = useState('post');

  return (
    <section
      id="aftercare"
      className="py-24 md:py-32 bg-rh-surface"
      aria-label="Tattoo Aftercare Guide"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-12"
        >
          <div className="section-tag"><span className="accent-line" />Care Guide</div>
          <h2 className="section-title">Aftercare Hub</h2>
          <p className="mt-4 text-white/45 font-body text-base md:text-lg max-w-2xl leading-relaxed">
            A tattoo is a lifelong investment. How you care for it in the weeks following your
            session determines 50% of the final result. Follow this guide carefully.
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-2 mb-10" role="tablist" aria-label="Aftercare sections">
          {['pre', 'post'].map(t => (
            <button
              key={t}
              role="tab"
              aria-selected={tab === t}
              id={`aftercare-tab-${t}`}
              onClick={() => setTab(t)}
              className={`px-6 py-3 rounded-full font-sans-display text-xs uppercase tracking-widest border transition-all duration-300 ${
                tab === t
                  ? 'bg-rh-accent border-rh-accent text-white shadow-glow-red-sm'
                  : 'border-rh-border text-white/50 hover:text-white hover:border-white/30'
              }`}
            >
              {t === 'pre' ? 'Pre-Care' : 'Post-Care'}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {/* ── PRE-CARE ── */}
          {tab === 'pre' && (
            <motion.div
              key="pre"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4 }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {PRE_CARE.map((item, i) => (
                  <motion.article
                    key={item.step}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="rh-card p-6 hover:border-white/20 transition-colors duration-300"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-9 h-9 rounded-full bg-rh-accent/15 text-rh-accent flex items-center justify-center">
                        {item.icon}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-sans-display text-[10px] uppercase tracking-widest text-rh-accent">Step {item.step}</span>
                        </div>
                        <h3 className="font-display text-base font-bold text-white mb-2">{item.title}</h3>
                        <p className="font-body text-sm text-white/50 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            </motion.div>
          )}

          {/* ── POST-CARE ── */}
          {tab === 'post' && (
            <motion.div
              key="post"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              {/* Timeline */}
              <div className="relative">
                {/* Vertical line */}
                <div className="absolute left-4 md:left-6 top-0 bottom-0 w-px bg-rh-border hidden md:block" />

                <div className="space-y-4">
                  {POST_CARE_TIMELINE.map((period, i) => (
                    <motion.article
                      key={period.period}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="md:pl-16 relative"
                    >
                      {/* Dot */}
                      <div className="hidden md:flex absolute left-0 top-6 w-12 h-12 rounded-full bg-rh-surface border border-rh-border items-center justify-center text-rh-accent">
                        {period.icon}
                      </div>

                      <div className="rh-card p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <span className="md:hidden flex-shrink-0 w-8 h-8 rounded-full bg-rh-accent/15 text-rh-accent flex items-center justify-center">
                            {period.icon}
                          </span>
                          <h3 className="font-display text-lg font-bold text-rh-accent">{period.period}</h3>
                        </div>
                        <ul className="space-y-2">
                          {period.steps.map((step, si) => (
                            <li key={si} className="flex items-start gap-3 font-body text-sm text-white/60 leading-relaxed">
                              <CheckCircle size={14} className="flex-shrink-0 mt-0.5 text-rh-accent/50" />
                              {step}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.article>
                  ))}
                </div>
              </div>

              {/* Avoid box */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="rounded-2xl border border-rh-accent/30 bg-rh-accent/5 p-6 md:p-8"
              >
                <div className="flex items-center gap-3 mb-6">
                  <AlertTriangle size={20} className="text-rh-accent flex-shrink-0" />
                  <h3 className="font-display text-xl font-bold text-white">Always Avoid</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                  {AVOID_LIST.map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-white/55 font-body text-sm">
                      <Ban size={12} className="text-rh-accent/60 flex-shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* PDF CTA */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="flex flex-col sm:flex-row items-center justify-between gap-4 rh-card p-6"
              >
                <div>
                  <h4 className="font-display text-base font-bold text-white">Download Aftercare PDF</h4>
                  <p className="text-white/40 font-body text-sm mt-1">Printable aftercare guide to keep near you during healing.</p>
                </div>
                <button
                  className="rh-btn-ghost text-sm flex-shrink-0"
                  id="aftercare-download-btn"
                  onClick={() => alert('PDF download will be available in the full launch version.')}
                >
                  Download PDF
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
