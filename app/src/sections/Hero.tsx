import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import NeuralNetwork from '../components/NeuralNetwork';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subheadingRef = useRef<HTMLParagraphElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const subheading = subheadingRef.current;
    const scrollHint = scrollHintRef.current;
    const nav = navRef.current;

    if (!section || !heading || !subheading || !scrollHint || !nav) return;

    const ctx = gsap.context(() => {
      // Text scramble effect for heading
      const originalText = 'AI ENGINEER';
      const chars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
      let iteration = 0;

      const scrambleText = () => {
        heading.innerText = originalText
          .split('')
          .map((_char, index) => {
            if (index < iteration) {
              return originalText[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('');

        if (iteration < originalText.length) {
          iteration += 1 / 3;
          setTimeout(scrambleText, 50);
        } else {
          heading.innerText = originalText;
        }
      };

      // Initial animations
      const tl = gsap.timeline({ delay: 2.5 });

      tl.add(() => scrambleText())
        .fromTo(
          subheading,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
          '+=0.5'
        )
        .fromTo(
          scrollHint,
          { opacity: 0 },
          { opacity: 1, duration: 0.5 },
          '-=0.3'
        )
        .fromTo(
          nav,
          { opacity: 0, y: -20 },
          { opacity: 1, y: 0, duration: 0.5 },
          '-=0.5'
        );

      // Scroll-triggered fade out
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress;
          gsap.set(heading, {
            opacity: 1 - progress * 2,
            y: progress * -100,
          });
          gsap.set(subheading, {
            opacity: 1 - progress * 2,
            y: progress * -50,
          });
          gsap.set(scrollHint, {
            opacity: 1 - progress * 3,
          });
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section min-h-screen flex flex-col relative overflow-hidden"
    >
      {/* Neural Network Background */}
      <NeuralNetwork />

      {/* Grid overlay */}
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />

      {/* Noise overlay */}
      <div className="absolute inset-0 noise-overlay pointer-events-none" />

      {/* Navigation */}
      <nav
        ref={navRef}
        className="relative z-20 flex items-center justify-between px-8 py-6 opacity-0"
      >
        <div className="font-mono text-sm text-[#e0e0e0]">
          <span className="text-[#ff3333]">[</span>
          DK
          <span className="text-[#ff3333]">]</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          <a href="#profile" className="font-mono text-xs text-[#888] hover:text-white transition-colors glitch-text" data-text="PROFILE">
            PROFILE
          </a>
          <a href="#skills" className="font-mono text-xs text-[#888] hover:text-white transition-colors glitch-text" data-text="SKILLS">
            SKILLS
          </a>
          <a href="#experience" className="font-mono text-xs text-[#888] hover:text-white transition-colors glitch-text" data-text="EXPERIENCE">
            EXPERIENCE
          </a>
          <a href="#projects" className="font-mono text-xs text-[#888] hover:text-white transition-colors glitch-text" data-text="PROJECTS">
            PROJECTS
          </a>
        </div>
        <div className="font-mono text-xs text-[#00ff00]">
          ● ONLINE
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center relative z-10 px-4">
        <h1
          ref={headingRef}
          className="font-heading text-[12vw] md:text-[10vw] lg:text-[8vw] font-bold text-white tracking-tighter leading-none text-center"
        >
          AI/ML ENGINEER
        </h1>
        <p
          ref={subheadingRef}
          className="font-mono text-lg md:text-xl text-[#888] mt-4 opacity-0"
        >
          <span className="text-[#ff3333]">&lt;</span>
          Deeptanush Kapaka
          <span className="text-[#ff3333]">/&gt;</span>
        </p>
      </div>

      {/* Scroll Hint */}
      <div
        ref={scrollHintRef}
        className="relative z-10 pb-8 text-center opacity-0"
      >
        <span className="font-mono text-xs text-[#666] blink">
          [ SCROLL TO INITIATE ]
        </span>
      </div>

      {/* Vignette */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(5,5,5,0.8) 100%)'
        }}
      />
    </section>
  );
};

export default Hero;