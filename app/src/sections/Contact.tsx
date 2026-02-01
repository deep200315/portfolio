import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Github, Linkedin, Mail, Phone, Copy, Check } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const [typedText, setTypedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [copied, setCopied] = useState<string | null>(null);

  const fullText = 'AWAITING INPUT...';
  const contactInfo = [
    {
      label: 'EMAIL',
      value: 'deeptanush.kapaka@gmail.com',
      icon: Mail,
      href: 'mailto:deeptanush.kapaka@gmail.com',
    },
    {
      label: 'PHONE',
      value: '+91 9393269274',
      icon: Phone,
      href: 'tel:+919393269274',
    },
    {
      label: 'GITHUB',
      value: 'github.com/deep200315',
      icon: Github,
      href: 'https://github.com/deep200315/deep200315',
    },
    {
      label: 'LINKEDIN',
      value: 'linkedin.com/in/deeptanush-kapaka',
      icon: Linkedin,
      href: 'https://www.linkedin.com/in/deeptanush-kapaka-5b6505214/',
    },
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const terminal = terminalRef.current;

    if (!section || !heading || !terminal) return;

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

      // Terminal animation
      gsap.fromTo(
        terminal,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.3,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
            onEnter: () => {
              // Start typing effect
              let index = 0;
              const typeInterval = setInterval(() => {
                if (index <= fullText.length) {
                  setTypedText(fullText.slice(0, index));
                  index++;
                } else {
                  clearInterval(typeInterval);
                  setShowCursor(false);
                }
              }, 100);
            },
          },
        }
      );

      // Contact items animation
      const items = terminal.querySelectorAll('.contact-item');
      gsap.fromTo(
        items,
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          stagger: 0.1,
          delay: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const handleCopy = (value: string, label: string) => {
    navigator.clipboard.writeText(value);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="section min-h-screen flex items-center py-20 relative"
    >
      {/* Grid background */}
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />

      <div className="container mx-auto px-8 md:px-16 lg:px-24 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="font-mono text-xs text-[#ff3333] mb-4">
            {'>'} SYSTEM.ESTABLISH_CONNECTION
          </div>
          <h2
            ref={headingRef}
            className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white"
          >
            GET IN <span className="text-outline">TOUCH</span>
          </h2>
        </div>

        {/* Terminal */}
        <div
          ref={terminalRef}
          className="max-w-2xl mx-auto"
        >
          <div className="bg-[#0a0a0a] border border-[#333] rounded-lg overflow-hidden">
            {/* Terminal header */}
            <div className="flex items-center gap-2 px-4 py-3 bg-[#111] border-b border-[#222]">
              <div className="w-3 h-3 rounded-full bg-[#ff3333]" />
              <div className="w-3 h-3 rounded-full bg-[#ffcc00]" />
              <div className="w-3 h-3 rounded-full bg-[#00ff00]" />
              <span className="ml-4 text-xs text-[#666] font-mono">
                contact_terminal.sh
              </span>
            </div>

            {/* Terminal content */}
            <div className="p-6 font-mono text-sm">
              {/* Typewriter intro */}
              <div className="mb-6 text-[#00ff00]">
                <span className="text-[#ff3333]">{'>'}</span>{' '}
                {typedText}
                {showCursor && <span className="terminal-cursor" />}
              </div>

              {/* Contact items */}
              <div className="space-y-4">
                {contactInfo.map((contact) => (
                  <div
                    key={contact.label}
                    className="contact-item flex items-center gap-4 p-3 bg-[#111] rounded border border-[#222] hover:border-[#444] transition-colors group"
                  >
                    <div className="w-10 h-10 bg-[#1a1a1a] rounded flex items-center justify-center group-hover:bg-[#ff3333]/10 transition-colors">
                      <contact.icon className="w-5 h-5 text-[#888] group-hover:text-[#ff3333] transition-colors" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs text-[#666] uppercase mb-1">
                        {contact.label}
                      </div>
                      <a
                        href={contact.href}
                        target={contact.href.startsWith('http') ? '_blank' : undefined}
                        rel={contact.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="text-[#ccc] hover:text-white transition-colors truncate block"
                        data-cursor-hover
                      >
                        {contact.value}
                      </a>
                    </div>
                    <button
                      onClick={() => handleCopy(contact.value, contact.label)}
                      className="w-8 h-8 bg-[#1a1a1a] rounded flex items-center justify-center hover:bg-[#333] transition-colors"
                      data-cursor-hover
                      title="Copy to clipboard"
                    >
                      {copied === contact.label ? (
                        <Check className="w-4 h-4 text-[#00ff00]" />
                      ) : (
                        <Copy className="w-4 h-4 text-[#888]" />
                      )}
                    </button>
                  </div>
                ))}
              </div>

              {/* Footer message */}
              <div className="mt-6 pt-4 border-t border-[#222] text-[#444] text-xs">
                <span className="text-[#ff3333]">{'>'}</span>{' '}
                Ready to collaborate on your next AI project.
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-20 pt-8 border-t border-[#1a1a1a]">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="font-mono text-xs text-[#444]">
              <span className="text-[#ff3333]">[</span>
              DK
              <span className="text-[#ff3333]">]</span>
              {' '}&copy; {new Date().getFullYear()} Deeptanush Kapaka
            </div>
            <div className="font-mono text-xs text-[#444]">
              Built with React + TypeScript + Tailwind
            </div>
            <div className="font-mono text-xs text-[#00ff00]">
              ● SYSTEM OPERATIONAL
            </div>
          </div>
        </footer>
      </div>
    </section>
  );
};

export default Contact;