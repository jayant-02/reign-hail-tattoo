import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Calendar, Image as ImageIcon } from 'lucide-react';

const TITLE_WORDS = ['REIGN', '&', 'HAIL'];

const STATS = [
  { value: 8,    suffix: '+', label: 'Years of Craft' },
  { value: 4,    suffix: '',  label: 'Master Artists' },
  { value: 12,   suffix: '',  label: 'Styles Mastered' },
  { value: 3000, suffix: '+', label: 'Tattoos Completed' },
];

function AnimatedCounter({ value, suffix, duration = 2000 }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const start = performance.now();
        const tick = (now) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setDisplay(Math.round(eased * value));
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, duration]);

  return <span ref={ref}>{display.toLocaleString()}{suffix}</span>;
}

export default function Hero() {
  const handleScroll = (href) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.15, delayChildren: 0.3 } },
  };
  const wordVariants = {
    hidden: { opacity: 0, y: 60, skewY: 4 },
    show:   { opacity: 1, y: 0,  skewY: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-end overflow-hidden"
      aria-label="Hero – Reign & Hail Tattoo"
    >
      {/* ── Background Image ── */}
      <div className="absolute inset-0">
        <img
          src="/images/hero-bg.jpg"
          alt="Reign & Hail Tattoo Studio interior"
          className="w-full h-full object-cover object-center scale-105"
          style={{ filter: 'brightness(0.35) saturate(0.8)' }}
        />
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-rh-black via-rh-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-rh-black/60 via-transparent to-transparent" />
        {/* Red accent vignette */}
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-rh-accent/8 to-transparent pointer-events-none" />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pb-20 pt-32 w-full">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-12">

          {/* Left – Title */}
          <div className="flex-1">
            {/* Pre-tag */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="section-tag mb-6"
            >
              <span className="accent-line" />
              Manchester's Premier Studio
            </motion.div>

            {/* Animated headline */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="overflow-hidden"
            >
              {TITLE_WORDS.map((word, i) => (
                <motion.div key={i} variants={wordVariants} className="overflow-hidden">
                  <h1
                    className={`font-display font-black leading-[0.88] uppercase tracking-tight block ${
                      word === '&'
                        ? 'text-rh-accent text-7xl md:text-9xl lg:text-[11rem]'
                        : 'text-white text-7xl md:text-9xl lg:text-[11rem]'
                    }`}
                  >
                    {word}
                  </h1>
                </motion.div>
              ))}
            </motion.div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.7 }}
              className="mt-6 text-white/55 font-body text-base md:text-lg leading-relaxed max-w-md"
            >
              We don't just ink skin — we architect permanence. Custom realism,
              fine line, blackwork &amp; bespoke designs crafted for those who demand excellence.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.7 }}
              className="mt-8 flex flex-wrap gap-4"
            >
              <button
                onClick={() => handleScroll('#booking')}
                className="rh-btn-primary flex items-center gap-2 group"
                id="hero-book-cta"
              >
                <Calendar size={16} />
                Book Consultation
              </button>
              <button
                onClick={() => handleScroll('#portfolio')}
                className="rh-btn-ghost flex items-center gap-2"
                id="hero-portfolio-cta"
              >
                <ImageIcon size={16} />
                View Portfolio
              </button>
            </motion.div>
          </div>

          {/* Right – Stats Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.7 }}
            className="rh-glass p-6 md:p-8 rounded-2xl grid grid-cols-2 gap-6 lg:min-w-[300px]"
          >
            {STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-display text-3xl md:text-4xl font-bold text-rh-accent mb-1">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-white/40 font-body text-xs uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── Scroll Indicator ── */}
      <motion.button
        onClick={() => handleScroll('#artists')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 hover:text-white/60 transition-colors group"
        aria-label="Scroll down"
      >
        <span className="font-body text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown size={16} />
        </motion.div>
      </motion.button>

      {/* ── Ticker tape ── */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden py-3 bg-rh-accent/10 border-t border-rh-accent/20 backdrop-blur-sm">
        <div className="ticker-inner font-sans-display text-[10px] uppercase tracking-[0.25em] text-rh-accent/60">
          {Array(6).fill('Custom Tattoo · Realism · Fine Line · Blackwork · Colour Ink · Sleeve Work · Cover-Ups · Memorial Pieces · ').join('')}
        </div>
      </div>
    </section>
  );
}
