import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);

const ARTISTS = [
  {
    id: 'marcus-reid',
    name: 'Marcus Reid',
    title: 'Lead Artist',
    specialty: '3D Realism & Photo-Real',
    experience: '9 Years',
    bio: 'Marcus blends hyper-detailed photorealism with sculptural depth. His 3D biomechanical and portrait work is unmatched in the North.',
    image: `${import.meta.env.BASE_URL}images/artist-1.jpg`,
    styles: ['3D Realism', 'Portrait', 'Biomechanical'],
    instagram: '#',
  },
  {
    id: 'sofia-vega',
    name: 'Sofia Vega',
    title: 'Fine Line Specialist',
    specialty: 'Fine Line & Botanical',
    experience: '6 Years',
    bio: "Sofia's single-needle precision creates botanical illustrations and geometric designs that sit on the skin like breathable art.",
    image: `${import.meta.env.BASE_URL}images/artist-2.jpg`,
    styles: ['Fine Line', 'Botanical', 'Geometric'],
    instagram: '#',
  },
  {
    id: 'jay-okafor',
    name: 'Jay Okafor',
    title: 'Blackwork Architect',
    specialty: 'Blackwork & Custom Lettering',
    experience: '7 Years',
    bio: "Jay's mastery of solid blackwork and ornamental design transforms sleeves and back pieces into full architectural compositions.",
    image: `${import.meta.env.BASE_URL}images/artist-3.jpg`,
    styles: ['Blackwork', 'Lettering', 'Sleeve Work'],
    instagram: '#',
  },
];

export default function Artists() {
  return (
    <section
      id="artists"
      className="py-24 md:py-32 bg-rh-black relative overflow-hidden"
      aria-label="Our Artists"
    >
      {/* Background texture accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-rh-accent/4 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <div className="section-tag"><span className="accent-line" />The Artists</div>
          <h2 className="section-title">Masters of<br />Their Craft</h2>
          <p className="mt-4 text-white/45 font-body text-base md:text-lg max-w-xl leading-relaxed">
            Every artist at Reign &amp; Hail has been hand-selected for their technical
            excellence and creative vision. Your skin deserves only the best.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ARTISTS.map((artist, i) => (
            <motion.article
              key={artist.id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.7 }}
              className="rh-card group cursor-pointer"
            >
              {/* Portrait */}
              <div className="relative h-80 overflow-hidden">
                <img
                  src={artist.image}
                  alt={`${artist.name} – tattoo artist at Reign & Hail`}
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-rh-surface via-rh-surface/20 to-transparent" />
                {/* Experience badge */}
                <div className="absolute top-4 right-4 bg-rh-accent text-white font-sans-display text-xs uppercase tracking-widest px-3 py-1.5 rounded-full">
                  {artist.experience}
                </div>
              </div>

              {/* Info */}
              <div className="p-6">
                <p className="text-rh-accent font-sans-display text-xs uppercase tracking-widest mb-1">
                  {artist.title}
                </p>
                <h3 className="font-display text-2xl font-bold text-white mb-1">
                  {artist.name}
                </h3>
                <p className="text-white/40 font-body text-sm mb-4">
                  {artist.specialty}
                </p>

                {/* Bio – revealed on hover */}
                <p className="text-white/55 font-body text-sm leading-relaxed mb-5 hidden md:block opacity-0 group-hover:opacity-100 transition-opacity duration-500 -mt-2">
                  {artist.bio}
                </p>
                <p className="text-white/55 font-body text-sm leading-relaxed mb-5 md:hidden">
                  {artist.bio}
                </p>

                {/* Style tags */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {artist.styles.map(s => (
                    <span
                      key={s}
                      className="text-[10px] font-sans-display uppercase tracking-widest border border-rh-border text-white/40 px-3 py-1 rounded-full"
                    >
                      {s}
                    </span>
                  ))}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between border-t border-rh-border pt-4">
                  <a href={artist.instagram} className="flex items-center gap-2 text-white/40 hover:text-white transition-colors text-xs font-sans-display uppercase tracking-widest">
                    <InstagramIcon />
                    Instagram
                  </a>
                  <a
                    href="#booking"
                    onClick={e => { e.preventDefault(); document.querySelector('#booking')?.scrollIntoView({ behavior: 'smooth' }); }}
                    className="flex items-center gap-1.5 text-rh-accent hover:text-rh-accent2 transition-colors text-xs font-sans-display uppercase tracking-widest"
                  >
                    Book Artist
                    <ExternalLink size={12} />
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
