import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const LoadingScreen = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [lines, setLines] = useState<string[]>([]);

  const bootLines = [
    '> INITIALIZING KERNEL...',
    '> LOADING NEURAL NETWORK MODULES...',
    '> MOUNTING FILESYSTEM...',
    '> ESTABLISHING SECURE CONNECTION...',
    '> DECRYPTING PORTFOLIO DATA...',
    '> READY.',
  ];

  useEffect(() => {
    const container = containerRef.current;
    const textContainer = textRef.current;
    if (!container || !textContainer) return;

    // Type out lines one by one
    let currentLine = 0;
    const typeLine = () => {
      if (currentLine < bootLines.length) {
        setLines(prev => [...prev, bootLines[currentLine]]);
        currentLine++;
        setTimeout(typeLine, 300);
      }
    };

    typeLine();

    // Exit animation
    const exitTimer = setTimeout(() => {
      gsap.to(container, {
        clipPath: 'inset(50% 0 50% 0)',
        duration: 0.8,
        ease: 'power4.inOut',
      });
      gsap.to(container, {
        opacity: 0,
        duration: 0.3,
        delay: 0.5,
        onComplete: () => {
          container.style.display = 'none';
        },
      });
    }, 2200);

    return () => clearTimeout(exitTimer);
  }, []);

  return (
    <div
      ref={containerRef}
      className="loading-screen"
    >
      <div className="w-full max-w-2xl px-8">
        <div className="border border-[#333] bg-[#0a0a0a] p-6 rounded-sm">
          <div className="flex items-center gap-2 mb-4 border-b border-[#333] pb-2">
            <div className="w-3 h-3 rounded-full bg-[#ff3333]" />
            <div className="w-3 h-3 rounded-full bg-[#ffcc00]" />
            <div className="w-3 h-3 rounded-full bg-[#00ff00]" />
            <span className="ml-4 text-xs text-[#666] font-mono">SYSTEM_BOOT.exe</span>
          </div>
          <div ref={textRef} className="font-mono text-sm text-[#e0e0e0] space-y-1">
            {lines.map((line, index) => (
              <div
                key={index}
                className={`${index === lines.length - 1 && index === bootLines.length - 1 ? 'text-[#00ff00]' : ''}`}
              >
                {line}
                {index === lines.length - 1 && index !== bootLines.length - 1 && (
                  <span className="terminal-cursor" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;