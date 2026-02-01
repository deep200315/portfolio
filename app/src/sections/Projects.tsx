import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Github, Cpu } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  title: string;
  description: string;
  image: string;
  tech: string[];
  metrics: { label: string; value: string }[];
  links?: { github?: string; demo?: string };
}

const projects: Project[] = [
  {
    title: 'Annual Income Prediction',
    description:
      'A machine learning system that predicts income levels using K-Nearest Neighbors algorithm with optimized data processing pipelines and comprehensive visualizations.',
    image: '/project-income.jpg',
    tech: ['Python', 'NumPy', 'Pandas', 'KNN', 'Matplotlib', 'Seaborn'],
    metrics: [
      { label: 'Accuracy', value: '87%' },
      { label: 'Time Reduction', value: '30%' },
    ],
    links: { github: '#' },
  },
  {
    title: 'Q&A Bot',
    description:
      'An AI-driven customer support bot powered by LangChain and OpenAI GPT with RAG techniques, featuring Pinecone vector database for efficient information retrieval.',
    image: '/project-chatbot.jpg',
    tech: ['LangChain', 'OpenAI', 'Pinecone', 'RAG', 'Python'],
    metrics: [
      { label: 'Response Time', value: '-30%' },
      { label: 'Query Resolution', value: '80%' },
    ],
    links: { github: '#' },
  },
];

const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  // HOLOGRAPHIC BORDER TOGGLE: Set to true to enable, false to disable
  const [holographicBorderEnabled] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const grid = gridRef.current;

    if (!section || !heading || !grid) return;

    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        heading,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Project cards animation
      const cards = grid.querySelectorAll('.project-card');
      cards.forEach((card, index) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: index * 0.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  // 3D tilt effect handler
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;

    gsap.to(card, {
      rotateX,
      rotateY,
      duration: 0.3,
      ease: 'power2.out',
      transformPerspective: 1000,
    });

    setHoveredIndex(index);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: 'power2.out',
    });
    setHoveredIndex(null);
  };

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="section min-h-screen py-20 relative"
    >
      {/* Grid background */}
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />

      <div className="container mx-auto px-8 md:px-16 lg:px-24 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="font-mono text-xs text-[#ff3333] mb-4">
            {'>'} SYSTEM.DEPLOYED_SYSTEMS
          </div>
          <h2
            ref={headingRef}
            className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white"
          >
            FEATURED <span className="text-outline">PROJECTS</span>
          </h2>
        </div>

        {/* Projects Grid */}
        <div
          ref={gridRef}
          className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto"
        >
          {projects.map((project, index) => (
            <div
              key={project.title}
              className="project-card group relative"
              style={{ transformStyle: 'preserve-3d' }}
              onMouseMove={(e) => handleMouseMove(e, index)}
              onMouseLeave={handleMouseLeave}
            >
              {/* 
                ============================================
                HOLOGRAPHIC BORDER EFFECT - TOGGLE SECTION
                ============================================
                To enable: Change holographicBorderEnabled to true above
                To disable: Set holographicBorderEnabled to false (current)
                
                The effect creates an animated gradient border (red → cyan)
                that appears on hover with a rotating animation.
                ============================================
              */}
              {holographicBorderEnabled && (
                <div
                  className={`absolute -inset-[2px] rounded-lg bg-gradient-to-r from-[#ff3333] via-[#00ffff] to-[#ff3333] bg-[length:300%_300%] opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                    hoveredIndex === index ? 'animate-[holographic_3s_ease_infinite]' : ''
                  }`}
                  style={{ zIndex: -1 }}
                />
              )}

              <div className="relative bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg overflow-hidden group-hover:border-transparent transition-colors">
                {/* Image */}
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
                  
                  {/* Overlay metrics */}
                  <div className="absolute bottom-4 left-4 right-4 flex gap-4">
                    {project.metrics.map((metric) => (
                      <div
                        key={metric.label}
                        className="bg-[#0a0a0a]/80 backdrop-blur-sm border border-[#333] rounded px-3 py-2"
                      >
                        <div className="font-heading text-lg font-bold text-white">
                          {metric.value}
                        </div>
                        <div className="font-mono text-[10px] text-[#666] uppercase">
                          {metric.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-heading text-xl font-semibold text-white group-hover:text-[#ff3333] transition-colors">
                      {project.title}
                    </h3>
                    <div className="flex gap-2">
                      {project.links?.github && (
                        <a
                          href={project.links.github}
                          className="w-8 h-8 bg-[#1a1a1a] rounded flex items-center justify-center hover:bg-[#333] transition-colors"
                          data-cursor-hover
                        >
                          <Github className="w-4 h-4 text-[#888]" />
                        </a>
                      )}
                      {project.links?.demo && (
                        <a
                          href={project.links.demo}
                          className="w-8 h-8 bg-[#1a1a1a] rounded flex items-center justify-center hover:bg-[#333] transition-colors"
                          data-cursor-hover
                        >
                          <ExternalLink className="w-4 h-4 text-[#888]" />
                        </a>
                      )}
                    </div>
                  </div>

                  <p className="text-sm text-[#888] leading-relaxed mb-4">
                    {project.description}
                  </p>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="inline-flex items-center gap-1 px-2 py-1 bg-[#1a1a1a] rounded text-xs font-mono text-[#666]"
                      >
                        <Cpu className="w-3 h-3" />
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View more hint */}
        <div className="text-center mt-12">
          <p className="font-mono text-xs text-[#444]">
            {'>'} More projects available on{' '}
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#888] hover:text-[#ff3333] transition-colors"
              data-cursor-hover
            >
              GitHub
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Projects;