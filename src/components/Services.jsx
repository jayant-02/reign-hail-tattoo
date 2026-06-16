import { motion } from 'framer-motion';
import { Zap, Layers, Feather, Circle, Palette, Type, AlignJustify, Heart, UserCheck, RefreshCw, MessageSquare } from 'lucide-react';

const CATEGORIES = [
  {
    label: 'Styles',
    services: [
      {
        id: 'photo-real',
        icon: <Layers size={22} />,
        title: '3D Photo-Real',
        desc: 'Hyper-dimensional tattoos that appear to emerge from the skin. Unrivalled depth and lighting.',
      },
      {
        id: '3d-style',
        icon: <Zap size={22} />,
        title: '3D-Style',
        desc: 'Stylised three-dimensional designs with bold geometry and graphic impact.',
      },
      {
        id: 'fine-line',
        icon: <Feather size={22} />,
        title: 'Fine Line',
        desc: 'Delicate single-needle work with microscopic precision — minimal, timeless, feminine.',
      },
      {
        id: 'blackwork',
        icon: <Circle size={22} />,
        title: 'Solid Black Work',
        desc: 'Architectural blackwork and dotwork using bold contrast and negative space.',
      },
      {
        id: 'colour',
        icon: <Palette size={22} />,
        title: 'Colour Ink',
        desc: 'Vivid, saturated colour tattoos built to stay vibrant. Neo-trad, watercolour, and realism.',
      },
      {
        id: 'lettering',
        icon: <Type size={22} />,
        title: 'Custom Lettering',
        desc: 'Script, gothic, blackletter, and brushstroke styles crafted and balanced by hand.',
      },
    ],
  },
  {
    label: 'Placements & Types',
    services: [
      {
        id: 'sleeve',
        icon: <AlignJustify size={22} />,
        title: 'Sleeve Tattoos',
        desc: 'Full and half-sleeve compositions planned as a unified visual narrative across your arm.',
      },
      {
        id: 'memorial',
        icon: <Heart size={22} />,
        title: 'Memorial Tattoos',
        desc: "Sensitive, considered pieces that honour those we've lost with permanent dignity.",
      },
      {
        id: 'custom',
        icon: <UserCheck size={22} />,
        title: 'Female / Male Custom Designs',
        desc: 'Bespoke designs tailored to your body, style, and story — zero flash work.',
      },
      {
        id: 'coverup',
        icon: <RefreshCw size={22} />,
        title: 'Cover-Ups & Reworkings',
        desc: 'Transforming regrets into masterpieces. We assess every piece individually.',
      },
    ],
  },
  {
    label: 'Consultation',
    services: [
      {
        id: 'consultation',
        icon: <MessageSquare size={22} />,
        title: 'General Tattoos & Custom Design Requests',
        desc: "Not sure where to start? Book a free consultation — no commitment, no pressure. We'll guide you through concept, placement, size, and artist match.",
        featured: true,
      },
    ],
  },
];

export default function Services() {
  const handleBook = () => document.querySelector('#booking')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section
      id="services"
      className="py-24 md:py-32 bg-rh-surface relative overflow-hidden"
      aria-label="Our Services"
    >
      {/* Background accent */}
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-rh-accent/5 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-20"
        >
          <div className="section-tag"><span className="accent-line" />What We Do</div>
          <h2 className="section-title">Our Services</h2>
          <p className="mt-4 text-white/45 font-body text-base md:text-lg max-w-xl leading-relaxed">
            From intricate fine line botanicals to full sleeve compositions — every style
            executed with obsessive attention to detail.
          </p>
        </motion.div>

        {/* Service Categories */}
        <div className="space-y-16">
          {CATEGORIES.map((cat, ci) => (
            <div key={cat.label}>
              {/* Category label */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex items-center gap-4 mb-8"
              >
                <span className="font-sans-display text-xs uppercase tracking-[0.25em] text-white/30">
                  {cat.label}
                </span>
                <div className="flex-1 h-px bg-rh-border" />
              </motion.div>

              {/* Grid */}
              <div className={`grid gap-4 ${
                cat.services.length === 1
                  ? 'grid-cols-1'
                  : cat.services.length === 4
                  ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
                  : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
              }`}>
                {cat.services.map((svc, si) => (
                  <motion.article
                    key={svc.id}
                    id={`service-${svc.id}`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: si * 0.08, duration: 0.6 }}
                    onClick={handleBook}
                    className={`group cursor-pointer rounded-2xl border transition-all duration-400 p-6 ${
                      svc.featured
                        ? 'bg-rh-accent/8 border-rh-accent/30 hover:bg-rh-accent/15 hover:border-rh-accent/60 hover:shadow-glow-red'
                        : 'bg-rh-card border-rh-border hover:border-white/20 hover:bg-white/5'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-5 transition-colors duration-300 ${
                      svc.featured
                        ? 'bg-rh-accent/20 text-rh-accent group-hover:bg-rh-accent group-hover:text-white'
                        : 'bg-white/5 text-white/50 group-hover:bg-rh-accent/20 group-hover:text-rh-accent'
                    }`}>
                      {svc.icon}
                    </div>
                    <h3 className={`font-display text-lg font-bold mb-2 transition-colors duration-300 ${
                      svc.featured ? 'text-white group-hover:text-rh-accent' : 'text-white group-hover:text-white'
                    }`}>
                      {svc.title}
                    </h3>
                    <p className="text-white/45 font-body text-sm leading-relaxed">
                      {svc.desc}
                    </p>
                    <div className={`mt-5 flex items-center gap-2 text-xs font-sans-display uppercase tracking-widest transition-colors duration-300 ${
                      svc.featured ? 'text-rh-accent' : 'text-white/20 group-hover:text-rh-accent'
                    }`}>
                      Book This →
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
