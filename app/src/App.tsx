import { useEffect, useRef, useState } from 'react';
import { Analytics } from "@vercel/analytics/react"
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// ============================================
// LENIS SMOOTH SCROLL - TOGGLE SECTION
// ============================================
// To enable smooth scrolling: Uncomment the import below and 
// the Lenis initialization code in useEffect
// To disable (current): Keep import commented out
// ============================================
// import Lenis from '@studio-freight/lenis';

import Hero from './sections/Hero';
import Profile from './sections/Profile';
import Skills from './sections/Skills';
import Experience from './sections/Experience';
import Projects from './sections/Projects';
import Contact from './sections/Contact';
import LoadingScreen from './sections/LoadingScreen';
import CustomCursor from './components/CustomCursor';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // ============================================
    // SMOOTH SCROLLING (LENIS) - TOGGLE SECTION
    // ============================================
    // To enable: Uncomment the code block below
    // To disable: Keep commented (uses native browser scrolling)
    // ============================================
    /*
    // Initialize Lenis smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);
    */

    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => {
      clearTimeout(timer);
      // ============================================
      // Uncomment the line below when enabling Lenis
      // ============================================
      // lenis.destroy();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <>
      {isLoading && <LoadingScreen />}
      <CustomCursor />
      <main
        ref={mainRef}
        className={`relative bg-[#050505] min-h-screen transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
      >
        <Hero />
        <Profile />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <Analytics />
    </>
  );
}

export default App;