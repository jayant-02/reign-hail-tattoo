import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, CheckCircle, Calendar, Phone, Mail, User, MapPin, Ruler, Palette, UserCheck, MessageSquare } from 'lucide-react';

const PLACEMENTS = [
  'Forearm', 'Upper Arm', 'Full Sleeve', 'Half Sleeve',
  'Chest', 'Back', 'Shoulder', 'Neck', 'Rib / Torso',
  'Hand / Fingers', 'Leg', 'Calf / Shin', 'Thigh',
  'Foot / Ankle', 'Behind Ear', 'Other',
];

const STYLES = [
  '3D Photo-Real', '3D-Style', 'Fine Line',
  'Solid Black Work', 'Colour Ink', 'Custom Lettering',
  'Sleeve Tattoo', 'Memorial Tattoo', 'Cover-Up / Rework', 'Not Sure',
];

const ARTISTS = ['No Preference (Best Match)', 'Marcus Reid – Realism', 'Sofia Vega – Fine Line', 'Jay Okafor – Blackwork'];

const SIZES = [
  { value: 'xs', label: 'XS', sub: '< 3 cm' },
  { value: 's',  label: 'S',  sub: '3–6 cm' },
  { value: 'm',  label: 'M',  sub: '7–15 cm' },
  { value: 'l',  label: 'L',  sub: '15–25 cm' },
  { value: 'xl', label: 'XL', sub: '25+ cm / Sleeve' },
];

export default function Booking() {
  const [size, setSize]         = useState('');
  const [submitted, setSubmit]  = useState(false);
  const [fileName, setFileName] = useState('');
  const [errors, setErrors]     = useState({});
  const fileRef = useRef(null);

  const validate = (data) => {
    const e = {};
    if (!data.name.trim())      e.name      = 'Name is required';
    if (!data.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Valid email required';
    if (!data.phone.trim())     e.phone     = 'Phone number is required';
    if (!data.placement)        e.placement = 'Please select a placement';
    if (!data.style)            e.style     = 'Please select a style';
    if (!size)                  e.size      = 'Please select a size';
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const data = {
      name:      fd.get('name')      || '',
      email:     fd.get('email')     || '',
      phone:     fd.get('phone')     || '',
      placement: fd.get('placement') || '',
      style:     fd.get('style')     || '',
      artist:    fd.get('artist')    || '',
      message:   fd.get('message')   || '',
      date:      fd.get('date')      || '',
    };
    const errs = validate(data);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setSubmit(true);
  };

  const fieldErr = (key) => errors[key]
    ? <p className="text-rh-accent text-xs mt-1 font-body">{errors[key]}</p>
    : null;

  if (submitted) {
    return (
      <section id="booking" className="py-24 md:py-32 bg-rh-black">
        <div className="max-w-xl mx-auto px-6 text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', duration: 0.6 }}
            className="flex flex-col items-center gap-6"
          >
            <div className="w-20 h-20 rounded-full bg-rh-accent/15 flex items-center justify-center animate-pulse-red">
              <CheckCircle size={40} className="text-rh-accent" />
            </div>
            <h2 className="font-display text-4xl font-bold text-white">Request Sent!</h2>
            <p className="text-white/50 font-body text-base leading-relaxed">
              We've received your consultation request and will be in touch within 24–48 hours
              to confirm your booking.
            </p>
            <button onClick={() => setSubmit(false)} className="rh-btn-ghost text-sm" id="booking-reset-btn">
              Submit Another Request
            </button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="booking"
      className="py-24 md:py-32 bg-rh-black relative overflow-hidden"
      aria-label="Book a Tattoo Consultation"
    >
      {/* BG accent */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] bg-rh-accent/4 blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">

          {/* Left – Info */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-2 flex flex-col justify-between gap-8"
          >
            <div>
              <div className="section-tag"><span className="accent-line" />Get Started</div>
              <h2 className="section-title mb-6">Book a Session</h2>
              <p className="text-white/45 font-body text-base leading-relaxed mb-8">
                Fill in the form and we'll reach out within 24–48 hours to confirm
                availability, discuss your design, and finalise a quote.
              </p>

              {/* Contact details */}
              <div className="space-y-4">
                {[
                  { icon: <Phone size={16} />, text: '+44 161 000 0000' },
                  { icon: <Mail  size={16} />, text: 'hello@reignandhail.co.uk' },
                  { icon: <MapPin size={16} />, text: '123 Ink Street, Manchester M1 1AA' },
                ].map(({ icon, text }) => (
                  <div key={text} className="flex items-center gap-3 text-white/50 font-body text-sm">
                    <span className="text-rh-accent">{icon}</span>
                    {text}
                  </div>
                ))}
              </div>
            </div>

            {/* Opening Hours */}
            <div className="rh-card p-6">
              <h3 className="font-display text-base font-bold text-white mb-4">Studio Hours</h3>
              <div className="space-y-2 font-body text-sm">
                {[
                  ['Tuesday – Friday', '10:00 – 19:00'],
                  ['Saturday',         '09:00 – 18:00'],
                  ['Sunday – Monday',  'Closed'],
                ].map(([day, hrs]) => (
                  <div key={day} className="flex justify-between">
                    <span className="text-white/40">{day}</span>
                    <span className={hrs === 'Closed' ? 'text-rh-accent/60' : 'text-white/70'}>{hrs}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right – Form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-3"
          >
            <form
              onSubmit={handleSubmit}
              noValidate
              className="rh-card p-6 md:p-8 space-y-6"
              aria-label="Booking inquiry form"
            >
              {/* Row 1: Name + Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="booking-name" className="rh-label flex items-center gap-1.5">
                    <User size={11} />Name
                  </label>
                  <input id="booking-name" name="name" type="text" placeholder="Your full name" className="rh-input" />
                  {fieldErr('name')}
                </div>
                <div>
                  <label htmlFor="booking-email" className="rh-label flex items-center gap-1.5">
                    <Mail size={11} />Email
                  </label>
                  <input id="booking-email" name="email" type="email" placeholder="you@example.com" className="rh-input" />
                  {fieldErr('email')}
                </div>
              </div>

              {/* Row 2: Phone + Preferred Date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="booking-phone" className="rh-label flex items-center gap-1.5">
                    <Phone size={11} />Phone
                  </label>
                  <input id="booking-phone" name="phone" type="tel" placeholder="+44 7700 000 000" className="rh-input" />
                  {fieldErr('phone')}
                </div>
                <div>
                  <label htmlFor="booking-date" className="rh-label flex items-center gap-1.5">
                    <Calendar size={11} />Preferred Date
                  </label>
                  <input
                    id="booking-date"
                    name="date"
                    type="date"
                    className="rh-input [color-scheme:dark]"
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
              </div>

              {/* Row 3: Placement + Style */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="booking-placement" className="rh-label flex items-center gap-1.5">
                    <MapPin size={11} />Placement Area
                  </label>
                  <select id="booking-placement" name="placement" className="rh-input appearance-none">
                    <option value="">Select placement…</option>
                    {PLACEMENTS.map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                  {fieldErr('placement')}
                </div>
                <div>
                  <label htmlFor="booking-style" className="rh-label flex items-center gap-1.5">
                    <Palette size={11} />Style Preference
                  </label>
                  <select id="booking-style" name="style" className="rh-input appearance-none">
                    <option value="">Select style…</option>
                    {STYLES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                  {fieldErr('style')}
                </div>
              </div>

              {/* Size Selector */}
              <div>
                <p className="rh-label flex items-center gap-1.5">
                  <Ruler size={11} />Estimated Size
                </p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {SIZES.map(s => (
                    <button
                      key={s.value}
                      type="button"
                      onClick={() => setSize(s.value)}
                      id={`size-${s.value}`}
                      className={`flex flex-col items-center px-4 py-2.5 rounded-xl border font-sans-display text-xs uppercase tracking-widest transition-all duration-300 ${
                        size === s.value
                          ? 'bg-rh-accent border-rh-accent text-white shadow-glow-red-sm'
                          : 'border-rh-border text-white/40 hover:border-white/30 hover:text-white'
                      }`}
                    >
                      <span className="text-sm font-bold">{s.label}</span>
                      <span className="text-[9px] mt-0.5 opacity-70 normal-case font-body tracking-normal">{s.sub}</span>
                    </button>
                  ))}
                </div>
                {fieldErr('size')}
              </div>

              {/* Artist */}
              <div>
                <label htmlFor="booking-artist" className="rh-label flex items-center gap-1.5">
                  <UserCheck size={11} />Artist Preference
                </label>
                <select id="booking-artist" name="artist" className="rh-input appearance-none">
                  {ARTISTS.map(a => <option key={a} value={a}>{a}</option>)}
                </select>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="booking-message" className="rh-label flex items-center gap-1.5">
                  <MessageSquare size={11} />Describe Your Idea
                </label>
                <textarea
                  id="booking-message"
                  name="message"
                  rows={4}
                  placeholder="Tell us about your tattoo concept — subject, mood, references, and anything else that matters to you…"
                  className="rh-input resize-none"
                />
              </div>

              {/* File Upload */}
              <div>
                <p className="rh-label flex items-center gap-1.5">
                  <Upload size={11} />Reference Images (optional)
                </p>
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  className="w-full border border-dashed border-rh-border rounded-xl p-6 text-center hover:border-white/30 hover:bg-white/3 transition-all duration-300 group"
                  id="booking-file-upload"
                >
                  <Upload size={20} className="mx-auto mb-2 text-white/20 group-hover:text-white/50 transition-colors" />
                  <p className="font-body text-sm text-white/30 group-hover:text-white/60 transition-colors">
                    {fileName || 'Drop images here or click to upload'}
                  </p>
                  <p className="font-body text-xs text-white/20 mt-1">JPG, PNG, GIF – Max 10MB</p>
                </button>
                <input
                  ref={fileRef}
                  type="file"
                  name="reference"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={e => {
                    const files = e.target.files;
                    setFileName(files.length > 1 ? `${files.length} files selected` : files[0]?.name || '');
                  }}
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="rh-btn-primary w-full flex items-center justify-center gap-2 text-base"
                id="booking-submit-btn"
              >
                <Calendar size={16} />
                Submit Consultation Request
              </button>

              <p className="text-white/25 font-body text-xs text-center leading-relaxed">
                We'll reply within 24–48 hours. No spam, no commitment required.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
