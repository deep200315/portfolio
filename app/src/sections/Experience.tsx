import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Briefcase, Calendar, MapPin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ExperienceItem {
  title: string;
  company: string;
  location: string;
  period: string;
  description: string[];
  skills: string[];
}

const experiences: ExperienceItem[] = [
  {
    title: 'Machine Learning Associate',
    company: 'Observe.ai',
    location: 'Bengaluru',
    period: 'June 2025 - Nov 2025',
    description: [
      'Led the design and deployment of a model calibration platform that enabled systematic evaluation of in-house and third-party LLMs (AWS, Azure, GCP), helping users select the most suitable model for their specific use cases based on empirical performance.',
      'Designed and implemented an end-to-end feedback loop to automatically refine prompts using structured user feedback, improving the accuracy, consistency, and task alignment of LLM responses.',
      'Built a two-tier inference routing framework that dynamically escalated requests from smaller models (e.g., nova-lite) to larger models (e.g., nova-premier) on low-confidence predictions, achieving an optimal trade-off between response quality and cost.',
      'Developed a Streamlit-based decision support dashboard backed by a cost-forecasting model for end-to-end call processing across multiple infrastructures (Elasticsearch, SageMaker, EC2, MongoDB), enabling leadership to make data-driven decisions for ad-hoc high-compute customer workloads.',
    ],
    skills: ['LLM', 'AWS', 'Azure', 'GCP', 'Prompt Engineering', 'Streamlit', 'SageMaker', 'Elasticsearch', 'MongoDB', 'Cost Optimization'],
  },
  {
    title: 'AIML Intern',
    company: 'NIELIT',
    location: 'Rajasthan',
    period: 'Sept 2024 - Feb 2025',
    description: [
      'Collaborating on a computer vision project to enhance e-waste management, reducing sorting time by up to 30% through automated classification methods.',
      'Employing image processing algorithms to optimize recycling processes, aiming to increase recycling rates by improving e-waste classification accuracy by 25%.',
    ],
    skills: ['Computer Vision', 'Image Processing', 'Python', 'TensorFlow'],
  },
];

const Experience = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const timeline = timelineRef.current;

    if (!section || !heading || !timeline) return;

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

      // Timeline line draw animation
      const timelineLine = timeline.querySelector('.timeline-line');
      if (timelineLine) {
        gsap.fromTo(
          timelineLine,
          { scaleY: 0 },
          {
            scaleY: 1,
            duration: 1.5,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: timeline,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Experience cards animation
      const cards = timeline.querySelectorAll('.experience-card');
      cards.forEach((card, index) => {
        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: 50,
            rotateX: 15,
          },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.8,
            delay: index * 0.2,
            ease: 'back.out(1.2)',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      // Timeline nodes animation
      const nodes = timeline.querySelectorAll('.timeline-node');
      nodes.forEach((node, index) => {
        gsap.fromTo(
          node,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.4,
            delay: index * 0.2 + 0.3,
            ease: 'back.out(2)',
            scrollTrigger: {
              trigger: timeline,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="section min-h-screen py-20 relative"
    >
      {/* Grid background */}
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />

      <div className="container mx-auto px-8 md:px-16 lg:px-24 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="font-mono text-xs text-[#ff3333] mb-4">
            {'>'} SYSTEM.MISSION_LOG
          </div>
          <h2
            ref={headingRef}
            className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white"
          >
            WORK <span className="text-outline">EXPERIENCE</span>
          </h2>
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative max-w-4xl mx-auto">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-[#1a1a1a] transform md:-translate-x-1/2">
            <div className="timeline-line absolute inset-0 bg-gradient-to-b from-[#ff3333] via-[#ff6666] to-[#ff3333] origin-top" />
          </div>

          {/* Experience items */}
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div
                key={exp.title}
                className={`relative flex items-start gap-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
              >
                {/* Timeline node */}
                <div className="timeline-node absolute left-4 md:left-1/2 w-4 h-4 bg-[#050505] border-2 border-[#ff3333] rounded-full transform -translate-x-1/2 mt-6 z-10 pulse-glow" />

                {/* Content */}
                <div
                  className={`experience-card ml-12 md:ml-0 md:w-[calc(50%-2rem)] ${index % 2 === 0 ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'
                    }`}
                  style={{ perspective: '1000px' }}
                >
                  <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg p-6 hover:border-[#333] transition-all duration-300 group">
                    {/* Header */}
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-10 h-10 bg-[#1a1a1a] rounded-lg flex items-center justify-center group-hover:bg-[#ff3333]/10 transition-colors">
                        <Briefcase className="w-5 h-5 text-[#ff3333]" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-heading text-lg font-semibold text-white group-hover:text-[#ff3333] transition-colors">
                          {exp.title}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-[#888]">
                          <span className="font-medium">{exp.company}</span>
                          <span className="text-[#444]">•</span>
                          <span className="flex items-center gap-1 text-xs">
                            <MapPin className="w-3 h-3" />
                            {exp.location}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Period */}
                    <div className="flex items-center gap-2 text-xs text-[#666] mb-4 font-mono">
                      <Calendar className="w-3 h-3" />
                      {exp.period}
                    </div>

                    {/* Description */}
                    <ul className="space-y-2 mb-4">
                      {exp.description.map((item, i) => (
                        <li
                          key={i}
                          className="text-sm text-[#aaa] leading-relaxed flex items-start gap-2"
                        >
                          <span className="text-[#ff3333] mt-1">›</span>
                          {item}
                        </li>
                      ))}
                    </ul>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-2 pt-4 border-t border-[#1a1a1a]">
                      {exp.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-1 bg-[#1a1a1a] rounded text-xs font-mono text-[#888]"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;