// Inline SVG social icons (no lucide dependency for social brands)
const InstagramIcon = ({ size = 18 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);

const FacebookIcon = ({ size = 18 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

const TikTokIcon = ({ size = 18 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.28 8.28 0 0 0 4.77 1.5V6.73a4.85 4.85 0 0 1-1-.04z"/>
  </svg>
);

import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const NAV_COLS = [
  {
    title: 'Studio',
    links: [
      { label: 'Our Artists', href: '#artists' },
      { label: 'Services',    href: '#services' },
      { label: 'Portfolio',   href: '#portfolio' },
      { label: 'Aftercare',   href: '#aftercare' },
    ],
  },
  {
    title: 'Book',
    links: [
      { label: 'Book a Consultation', href: '#booking' },
      { label: 'Cover-Up Assessment', href: '#booking' },
      { label: 'Custom Design Brief', href: '#booking' },
      { label: 'Sleeve Planning',     href: '#booking' },
    ],
  },
];

const SOCIALS = [
  { icon: <InstagramIcon size={18} />, label: 'Instagram', href: 'https://instagram.com' },
  { icon: <FacebookIcon  size={18} />, label: 'Facebook',  href: 'https://facebook.com' },
  { icon: <TikTokIcon    size={18} />, label: 'TikTok',    href: 'https://tiktok.com' },
];

export default function Footer() {
  const handleNav = (href) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer
      className="bg-rh-surface border-t border-rh-border"
      aria-label="Site footer"
    >
      {/* Red divider */}
      <div className="red-divider" />

      {/* Main footer grid */}
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <h2 className="font-display text-2xl font-bold text-white tracking-wider">
                REIGN<span className="text-rh-accent">&</span>HAIL
              </h2>
              <p className="font-body text-[10px] uppercase tracking-[0.3em] text-white/25 mt-1">
                Tattoo Studio · Manchester
              </p>
            </div>
            <p className="font-body text-sm text-white/40 leading-relaxed mb-6">
              Manchester's premier destination for custom tattoo art. We architect permanence
              through craft, precision, and creative vision.
            </p>
            {/* Socials */}
            <div className="flex gap-3">
              {SOCIALS.map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 rounded-full bg-white/5 border border-rh-border flex items-center justify-center text-white/40 hover:bg-rh-accent hover:border-rh-accent hover:text-white transition-all duration-300"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Nav cols */}
          {NAV_COLS.map(col => (
            <div key={col.title}>
              <h3 className="font-sans-display text-xs uppercase tracking-[0.2em] text-white/30 mb-5">
                {col.title}
              </h3>
              <ul className="space-y-3">
                {col.links.map(link => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={e => { e.preventDefault(); handleNav(link.href); }}
                      className="font-body text-sm text-white/50 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div>
            <h3 className="font-sans-display text-xs uppercase tracking-[0.2em] text-white/30 mb-5">
              Find Us
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3 text-sm">
                <MapPin size={14} className="text-rh-accent mt-0.5 flex-shrink-0" />
                <span className="font-body text-white/50 leading-relaxed">
                  123 Ink Street<br />Northern Quarter<br />Manchester, M1 1AA
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone size={14} className="text-rh-accent flex-shrink-0" />
                <a href="tel:+441610000000" className="font-body text-white/50 hover:text-white transition-colors">
                  +44 161 000 0000
                </a>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Mail size={14} className="text-rh-accent flex-shrink-0" />
                <a href="mailto:hello@reignandhail.co.uk" className="font-body text-white/50 hover:text-white transition-colors">
                  hello@reignandhail.co.uk
                </a>
              </div>
              <div className="flex items-start gap-3 text-sm">
                <Clock size={14} className="text-rh-accent mt-0.5 flex-shrink-0" />
                <div className="font-body text-white/50 leading-relaxed">
                  Tue–Fri: 10:00–19:00<br />
                  Sat: 09:00–18:00<br />
                  <span className="text-rh-accent/60">Sun–Mon: Closed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-rh-border">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="font-body text-xs text-white/25">
            © {new Date().getFullYear()} Reign &amp; Hail Tattoo Studio. All rights reserved.
          </p>
          <div className="flex gap-6">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map(item => (
              <a key={item} href="#" className="font-body text-xs text-white/25 hover:text-white/60 transition-colors">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
