import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';

export default function Lightbox({ images, current, onClose, onPrev, onNext }) {
  const image = images[current];

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape')     onClose();
      if (e.key === 'ArrowLeft')  onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose, onPrev, onNext]);

  return (
    <AnimatePresence>
      <motion.div
        className="lightbox-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-label={`Portfolio image ${current + 1} of ${images.length}`}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          aria-label="Close lightbox"
        >
          <X size={20} />
        </button>

        {/* Counter */}
        <div className="absolute top-5 left-5 z-10 font-sans-display text-xs uppercase tracking-widest text-white/50">
          {current + 1} / {images.length}
        </div>

        {/* Prev */}
        <button
          onClick={e => { e.stopPropagation(); onPrev(); }}
          className="absolute left-4 md:left-8 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          aria-label="Previous image"
        >
          <ChevronLeft size={24} />
        </button>

        {/* Image */}
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.94 }}
          transition={{ duration: 0.25 }}
          className="max-w-4xl max-h-[85vh] mx-16 flex flex-col items-center gap-4"
          onClick={e => e.stopPropagation()}
        >
          <img
            src={image.src}
            alt={image.alt}
            className="max-h-[75vh] max-w-full object-contain rounded-xl shadow-2xl"
          />
          {image.alt && (
            <p className="text-white/50 font-body text-sm text-center">{image.alt}</p>
          )}
          {image.style && (
            <span className="text-rh-accent font-sans-display text-xs uppercase tracking-widest border border-rh-accent/30 px-3 py-1 rounded-full">
              {image.style}
            </span>
          )}
        </motion.div>

        {/* Next */}
        <button
          onClick={e => { e.stopPropagation(); onNext(); }}
          className="absolute right-4 md:right-8 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          aria-label="Next image"
        >
          <ChevronRight size={24} />
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
