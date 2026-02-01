import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Profile = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const content = contentRef.current;
    const stats = statsRef.current;
    const heading = headingRef.current;

    if (!section || !image || !content || !stats || !heading) return;

    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        heading,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Image reveal with clip-path
      gsap.fromTo(
        image,
        { clipPath: 'inset(0 100% 0 0)', opacity: 0 },
        {
          clipPath: 'inset(0 0% 0 0)',
          opacity: 1,
          duration: 1.2,
          ease: 'power4.inOut',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Content fade in
      gsap.fromTo(
        content.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 60%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Stats counter animation
      const statNumbers = stats.querySelectorAll('.stat-number');
      statNumbers.forEach((stat) => {
        const target = parseInt(stat.getAttribute('data-target') || '0');
        gsap.fromTo(
          stat,
          { innerText: 0 },
          {
            innerText: target,
            duration: 2,
            ease: 'power2.out',
            snap: { innerText: 1 },
            scrollTrigger: {
              trigger: stats,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      // Stats fade in
      gsap.fromTo(
        stats.children,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: stats,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="profile"
      className="section min-h-screen flex items-center py-20 relative"
    >
      {/* Grid background */}
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />

      {/* Vertical heading */}
      <h2
        ref={headingRef}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 font-heading text-6xl md:text-8xl font-bold text-outline text-[#333] opacity-20 writing-mode-vertical hidden lg:block"
        style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
      >
        PROFILE
      </h2>

      <div className="container mx-auto px-8 md:px-16 lg:px-24 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <div
            ref={imageRef}
            className="relative aspect-[3/4] max-w-md mx-auto lg:mx-0"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#ff3333]/20 to-[#00ffff]/20 rounded-lg" />
            {/* Profile image/avatar is commented out to show only background
            <img
              src="/profile.png"
              alt="Deeptanush Kapaka"
              className="w-full h-full object-cover rounded-lg grayscale contrast-125"
            />
            */}
            {/* Glitch overlay effect */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-50" />
            {/* Corner accents */}
            <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-[#ff3333]" />
            <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-[#00ffff]" />
          </div>

          {/* Content */}
          <div ref={contentRef} className="space-y-6">
            <div className="font-mono text-xs text-[#ff3333]">
              {'>'} SYSTEM.IDENTITY
            </div>
            <h3 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white">
              Building the Future with
              <span className="block text-[#888]">Intelligent Systems</span>
            </h3>
            <p className="font-mono text-sm md:text-base text-[#aaa] leading-relaxed">
              AI Engineer with experience in machine learning, agentic AI, and
              retrieval-augmented generation (RAG) systems. Skilled in building
              and deploying tool-using LLM applications with function calling,
              memory, and structured outputs.
            </p>
            <p className="font-mono text-sm md:text-base text-[#aaa] leading-relaxed">
              Focused on driving efficiency through data pipelines, model optimization,
              and scalable deployment workflows. Passionate about creating AI solutions
              that make a real impact.
            </p>

            {/* Stats */}
            <div
              ref={statsRef}
              className="grid grid-cols-3 gap-6 pt-8 border-t border-[#222]"
            >
              <div className="text-center lg:text-left">
                <div className="font-heading text-3xl md:text-4xl font-bold text-white">
                  <span className="stat-number" data-target="2">0</span>+
                </div>
                <div className="font-mono text-xs text-[#666] mt-1">YEARS EXP</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="font-heading text-3xl md:text-4xl font-bold text-white">
                  <span className="stat-number" data-target="5">0</span>+
                </div>
                <div className="font-mono text-xs text-[#666] mt-1">PROJECTS</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="font-heading text-3xl md:text-4xl font-bold text-white">
                  <span className="stat-number" data-target="10">0</span>+
                </div>
                <div className="font-mono text-xs text-[#666] mt-1">SKILLS</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;