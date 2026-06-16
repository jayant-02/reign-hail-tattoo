import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronRight } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Home',      href: '#home' },
  { label: 'Artists',   href: '#artists' },
  { label: 'Services',  href: '#services' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Aftercare', href: '#aftercare' },
  { label: 'Book',      href: '#booking' },
];

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [active,   setActive]     = useState('home');
  const [mobileOpen, setMobile]   = useState(false);

  // Scroll position → solid nav bg
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // IntersectionObserver → active section highlight
  useEffect(() => {
    const ids = NAV_LINKS.map(l => l.href.slice(1));
    const observers = ids.map(id => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { rootMargin: '-40% 0px -50% 0px' }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach(o => o?.disconnect());
  }, []);

  const handleNav = (href) => {
    setMobile(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* ── Top Bar ── */}
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0,   opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-rh-black/90 backdrop-blur-xl border-b border-rh-border shadow-card'
            : 'bg-transparent'
        }`}
        role="banner"
      >
        <div className="max-w-7xl mx-auto px-6 h-16 md:h-20 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            onClick={e => { e.preventDefault(); handleNav('#home'); }}
            className="flex flex-col leading-none group"
            aria-label="Reign & Hail Tattoo – home"
          >
            <span className="font-display text-xl md:text-2xl font-bold text-white tracking-wider group-hover:text-rh-accent transition-colors duration-300">
              REIGN<span className="text-rh-accent">&</span>HAIL
            </span>
            <span className="font-body text-[9px] uppercase tracking-[0.3em] text-white/30 mt-0.5">
              Tattoo Studio · Manchester
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
            {NAV_LINKS.slice(0, -1).map(link => (
              <a
                key={link.href}
                href={link.href}
                onClick={e => { e.preventDefault(); handleNav(link.href); }}
                className={`relative px-4 py-2 font-sans-display text-xs uppercase tracking-[0.15em] transition-colors duration-300 group ${
                  active === link.href.slice(1)
                    ? 'text-white'
                    : 'text-white/50 hover:text-white'
                }`}
              >
                {link.label}
                {active === link.href.slice(1) && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute bottom-0 left-0 right-0 h-px bg-rh-accent"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </a>
            ))}
          </nav>

          {/* CTA + Burger */}
          <div className="flex items-center gap-3">
            <a
              href="#booking"
              onClick={e => { e.preventDefault(); handleNav('#booking'); }}
              className="hidden md:flex rh-btn-primary text-sm py-2.5 px-6"
            >
              Book Now
            </a>
            <button
              className="md:hidden p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
              onClick={() => setMobile(v => !v)}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* ── Mobile Drawer ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm md:hidden"
              onClick={() => setMobile(false)}
            />
            <motion.nav
              key="drawer"
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 260 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-72 bg-rh-surface border-l border-rh-border flex flex-col pt-24 pb-10 px-8 md:hidden"
              aria-label="Mobile navigation"
            >
              <div className="flex flex-col gap-1">
                {NAV_LINKS.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={e => { e.preventDefault(); handleNav(link.href); }}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                    className={`flex items-center justify-between py-4 border-b border-rh-border font-sans-display text-sm uppercase tracking-widest transition-colors ${
                      active === link.href.slice(1) ? 'text-rh-accent' : 'text-white/70 hover:text-white'
                    }`}
                  >
                    {link.label}
                    <ChevronRight size={14} className="text-white/20" />
                  </motion.a>
                ))}
              </div>
              <div className="mt-auto">
                <a
                  href="#booking"
                  onClick={e => { e.preventDefault(); handleNav('#booking'); }}
                  className="rh-btn-primary w-full flex items-center justify-center text-sm"
                >
                  Book a Session
                </a>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
