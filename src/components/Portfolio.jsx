import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ZoomIn } from 'lucide-react';
import Lightbox from './Lightbox';

// Portfolio images — 3 real generated images + CSS gradient placeholders for the rest
const ALL_IMAGES = [
  {
    id: 1,
    src: `${import.meta.env.BASE_URL}images/portfolio-1.jpg`,
    alt: 'Hyper-realistic 3D lion portrait tattoo on forearm',
    style: 'Realism',
    artist: 'Marcus Reid',
    span: 'col-span-1 row-span-2',
    gradient: null,
  },
  {
    id: 2,
    src: `${import.meta.env.BASE_URL}images/portfolio-2.jpg`,
    alt: 'Fine line botanical floral tattoo – roses and ferns',
    style: 'Fine Line',
    artist: 'Sofia Vega',
    span: 'col-span-1 row-span-1',
    gradient: null,
  },
  {
    id: 3,
    src: `${import.meta.env.BASE_URL}images/portfolio-3.jpg`,
    alt: 'Geometric mandala blackwork tattoo on shoulder',
    style: 'Blackwork',
    artist: 'Jay Okafor',
    span: 'col-span-1 row-span-1',
    gradient: null,
  },
  {
    id: 4,
    src: null,
    alt: 'Vibrant Japanese koi fish colour tattoo',
    style: 'Colour',
    artist: 'Sofia Vega',
    span: 'col-span-1 row-span-2',
    gradient: 'linear-gradient(135deg, #1a0a2e 0%, #16213e 30%, #0f3460 60%, #e94560 100%)',
    label: 'Colour Ink – Koi Sleeve',
  },
  {
    id: 5,
    src: null,
    alt: 'Full Japanese sleeve tattoo with waves and cherry blossoms',
    style: 'Sleeve',
    artist: 'Marcus Reid',
    span: 'col-span-1 md:col-span-2 row-span-1',
    gradient: 'linear-gradient(160deg, #0a0a0a 0%, #1a1a2e 40%, #16213e 70%, #C8102E22 100%)',
    label: 'Full Sleeve – Japanese Traditional',
  },
  {
    id: 6,
    src: null,
    alt: 'Custom gothic lettering tattoo on collarbone',
    style: 'Lettering',
    artist: 'Jay Okafor',
    span: 'col-span-1 row-span-1',
    gradient: 'linear-gradient(135deg, #111 0%, #1e1e1e 100%)',
    label: 'Custom Gothic Script',
  },
  {
    id: 7,
    src: null,
    alt: '3D biomechanical photo-real upper arm tattoo',
    style: 'Realism',
    artist: 'Marcus Reid',
    span: 'col-span-1 row-span-1',
    gradient: 'linear-gradient(135deg, #0d0d0d 0%, #1a1a1a 50%, #2d1010 100%)',
    label: '3D Biomechanical – Photo Real',
  },
  {
    id: 8,
    src: null,
    alt: 'Memorial portrait tattoo – fine line realism',
    style: 'Fine Line',
    artist: 'Sofia Vega',
    span: 'col-span-1 row-span-1',
    gradient: 'linear-gradient(145deg, #0e0e0e 0%, #181818 60%, #1a1210 100%)',
    label: 'Memorial – Fine Line Portrait',
  },
  {
    id: 9,
    src: null,
    alt: 'Old tattoo cover-up reworked into blackwork masterpiece',
    style: 'Blackwork',
    artist: 'Jay Okafor',
    span: 'col-span-1 row-span-1',
    gradient: 'linear-gradient(135deg, #080808 0%, #161616 100%)',
    label: 'Cover-Up Reworking – Blackwork',
  },
];

const FILTERS = ['All', 'Realism', 'Fine Line', 'Blackwork', 'Colour', 'Sleeve', 'Lettering'];

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [lightboxIdx, setLightboxIdx]   = useState(null);

  const filtered = useMemo(() =>
    activeFilter === 'All'
      ? ALL_IMAGES
      : ALL_IMAGES.filter(img => img.style === activeFilter),
    [activeFilter]
  );

  const openLightbox = (idx) => setLightboxIdx(idx);
  const closeLightbox = () => setLightboxIdx(null);
  const prevImage = () => setLightboxIdx(i => (i - 1 + filtered.length) % filtered.length);
  const nextImage = () => setLightboxIdx(i => (i + 1) % filtered.length);

  return (
    <section
      id="portfolio"
      className="py-24 md:py-32 bg-rh-black"
      aria-label="Portfolio Gallery"
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
          <div className="section-tag"><span className="accent-line" />Our Work</div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2 className="section-title">The Archive</h2>
            <p className="text-white/40 font-body text-sm max-w-xs leading-relaxed text-right hidden md:block">
              Click any piece to view full resolution. Use arrow keys to navigate.
            </p>
          </div>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap gap-2 mb-10"
          role="tablist"
          aria-label="Filter portfolio by style"
        >
          {FILTERS.map(f => (
            <button
              key={f}
              role="tab"
              aria-selected={activeFilter === f}
              onClick={() => setActiveFilter(f)}
              className={`filter-btn ${activeFilter === f ? 'active' : ''}`}
              id={`filter-${f.toLowerCase().replace(' ', '-')}`}
            >
              {f}
            </button>
          ))}
        </motion.div>

        {/* Masonry Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 auto-rows-[160px] md:auto-rows-[200px]"
          >
            {filtered.map((img, idx) => (
              <motion.button
                key={img.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05, duration: 0.5 }}
                className={`relative rounded-2xl overflow-hidden group cursor-pointer ${img.span} focus:outline-none focus:ring-2 focus:ring-rh-accent`}
                onClick={() => openLightbox(idx)}
                aria-label={`View: ${img.alt}`}
                id={`portfolio-item-${img.id}`}
              >
                {/* Image or gradient placeholder */}
                {img.src ? (
                  <img
                    src={img.src}
                    alt={img.alt}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                ) : (
                  <div
                    className="w-full h-full flex items-end p-4"
                    style={{ background: img.gradient }}
                  >
                    <div className="text-left">
                      <p className="font-sans-display text-[10px] uppercase tracking-widest text-rh-accent mb-1">{img.style}</p>
                      <p className="font-display text-xs md:text-sm text-white/70">{img.label}</p>
                    </div>
                  </div>
                )}

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2">
                  <ZoomIn size={24} className="text-white" />
                  <div className="text-center px-3">
                    <p className="font-sans-display text-[10px] uppercase tracking-widest text-rh-accent">{img.style}</p>
                    <p className="font-body text-xs text-white/80 mt-0.5">{img.artist}</p>
                  </div>
                </div>

                {/* Style badge */}
                <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="bg-rh-accent text-white font-sans-display text-[9px] uppercase tracking-widest px-2 py-1 rounded-full">
                    {img.style}
                  </span>
                </div>
              </motion.button>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* View more CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 text-center"
        >
          <p className="text-white/30 font-body text-sm mb-4">Follow us for daily work</p>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="rh-btn-ghost inline-flex items-center gap-2 text-sm"
            id="portfolio-instagram-link"
          >
            @reignandhail
          </a>
        </motion.div>
      </div>

      {/* Lightbox */}
      {lightboxIdx !== null && (
        <Lightbox
          images={filtered}
          current={lightboxIdx}
          onClose={closeLightbox}
          onPrev={prevImage}
          onNext={nextImage}
        />
      )}
    </section>
  );
}
