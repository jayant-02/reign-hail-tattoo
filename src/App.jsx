import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Artists from './components/Artists';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Aftercare from './components/Aftercare';
import Booking from './components/Booking';
import Footer from './components/Footer';

/**
 * App root – single-page application with semantic section wrappers.
 * Navigation uses smooth-scroll anchor links (#section-id).
 */
export default function App() {
  return (
    <>
      {/* Fixed navigation – renders above everything */}
      <Navbar />

      {/* Main content */}
      <main>
        <Hero />
        <Artists />
        <Services />
        <Portfolio />
        <Aftercare />
        <Booking />
      </main>

      <Footer />
    </>
  );
}
