import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Skill {
  name: string;
  level: number;
}

interface SkillCategory {
  title: string;
  skills: Skill[];
}

const skillData: SkillCategory[] = [
  {
    title: 'LANGUAGES',
    skills: [
      { name: 'PYTHON', level: 95 },
      { name: 'R', level: 75 },
      { name: 'SQL', level: 85 },
    ],
  },
  {
    title: 'FRAMEWORKS',
    skills: [
      { name: 'PYTORCH', level: 90 },
      { name: 'TENSORFLOW', level: 85 },
      { name: 'LANGCHAIN', level: 88 },
      { name: 'HUGGINGFACE', level: 82 },
    ],
  },
  {
    title: 'CLOUD & DEVOPS',
    skills: [
      { name: 'AWS', level: 80 },
      { name: 'DOCKER', level: 85 },
      { name: 'KUBERNETES', level: 75 },
      { name: 'GCP', level: 70 },
    ],
  },
];

const Skills = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);
  const [decryptedSkills, setDecryptedSkills] = useState<Set<string>>(new Set());

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const categories = categoriesRef.current;

    if (!section || !heading || !categories) return;

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

      // Category cards animation
      const cards = categories.querySelectorAll('.skill-category');
      cards.forEach((card, index) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: index * 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
              onEnter: () => {
                // Trigger skill decryption for this category
                const skillNames = card.querySelectorAll('.skill-name');
                skillNames.forEach((skill, skillIndex) => {
                  setTimeout(() => {
                    const skillName = skill.getAttribute('data-skill') || '';
                    setDecryptedSkills(prev => new Set([...prev, skillName]));
                  }, skillIndex * 200);
                });
              },
            },
          }
        );
      });

      // Progress bars animation
      const progressBars = categories.querySelectorAll('.progress-bar');
      progressBars.forEach((bar) => {
        const target = bar.getAttribute('data-level') || '0';
        gsap.fromTo(
          bar,
          { width: '0%' },
          {
            width: `${target}%`,
            duration: 1.5,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: bar,
              start: 'top 90%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  // Text scramble component
  const ScrambleText = ({ text, isDecrypted }: { text: string; isDecrypted: boolean }) => {
    const [displayText, setDisplayText] = useState(text.replace(/./g, '#'));
    const chars = '!@#$%^&*()_+-=[]{}|;:,.<>?';

    useEffect(() => {
      if (isDecrypted) {
        let iteration = 0;
        const interval = setInterval(() => {
          setDisplayText(
            text
              .split('')
              .map((_char, index) => {
                if (index < iteration) {
                  return text[index];
                }
                return chars[Math.floor(Math.random() * chars.length)];
              })
              .join('')
          );

          if (iteration >= text.length) {
            clearInterval(interval);
            setDisplayText(text);
          }
          iteration += 1 / 2;
        }, 30);

        return () => clearInterval(interval);
      }
    }, [isDecrypted, text]);

    return <span>{displayText}</span>;
  };

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="section min-h-screen flex items-center py-20 relative"
    >
      {/* Grid background */}
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />

      <div className="container mx-auto px-8 md:px-16 lg:px-24 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="font-mono text-xs text-[#ff3333] mb-4">
            {'>'} SYSTEM.CAPABILITIES
          </div>
          <h2
            ref={headingRef}
            className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white"
          >
            TECHNICAL <span className="text-outline">ARSENAL</span>
          </h2>
        </div>

        {/* Skills Grid */}
        <div
          ref={categoriesRef}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {skillData.map((category, catIndex) => (
            <div
              key={category.title}
              className="skill-category bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg p-6 hover:border-[#333] transition-colors"
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="font-mono text-xs text-[#ff3333]">
                  [{String(catIndex + 1).padStart(2, '0')}]
                </span>
                <h3 className="font-heading text-lg font-semibold text-white">
                  {category.title}
                </h3>
              </div>

              <div className="space-y-4">
                {category.skills.map((skill) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span
                        className="skill-name font-mono text-sm text-[#ccc]"
                        data-skill={skill.name}
                      >
                        <ScrambleText
                          text={skill.name}
                          isDecrypted={decryptedSkills.has(skill.name)}
                        />
                      </span>
                      <span className="font-mono text-xs text-[#666]">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="h-1 bg-[#1a1a1a] rounded-full overflow-hidden">
                      <div
                        className="progress-bar h-full bg-gradient-to-r from-[#ff3333] to-[#ff6666] rounded-full"
                        data-level={skill.level}
                        style={{ width: '0%' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Skills Tags */}
        <div className="mt-16 text-center">
          <div className="font-mono text-xs text-[#666] mb-4">
            {'>'} ADDITIONAL_MODULES
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              'MLOps',
              'RAG',
              'LLMs',
              'Fine-tuning',
              'Pinecone',
              'Pydantic',
              'CI/CD',
              'Git',
            ].map((skill) => (
              <span
                key={skill}
                className="px-4 py-2 bg-[#0a0a0a] border border-[#222] rounded font-mono text-xs text-[#888] hover:border-[#ff3333] hover:text-white transition-colors cursor-default"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;