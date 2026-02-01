import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const isTouch = useRef(false);

  useEffect(() => {
    // Check if touch device
    isTouch.current = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch.current) return;

    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;
    if (!cursor || !cursorDot) return;

    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.08,
        ease: 'power2.out',
      });
      gsap.to(cursorDot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.02,
        ease: 'none',
      });
    };

    const handleMouseEnter = () => {
      gsap.to(cursor, { opacity: 1, scale: 1, duration: 0.2 });
      gsap.to(cursorDot, { opacity: 1, duration: 0.2 });
    };

    const handleMouseLeave = () => {
      gsap.to(cursor, { opacity: 0, scale: 0.5, duration: 0.2 });
      gsap.to(cursorDot, { opacity: 0, duration: 0.2 });
    };

    // Handle hover on interactive elements
    const handleElementHover = () => {
      gsap.to(cursor, { scale: 2, duration: 0.2 });
    };

    const handleElementLeave = () => {
      gsap.to(cursor, { scale: 1, duration: 0.2 });
    };

    document.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Add hover effects to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, [data-cursor-hover]');
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleElementHover);
      el.addEventListener('mouseleave', handleElementLeave);
    });

    return () => {
      document.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleElementHover);
        el.removeEventListener('mouseleave', handleElementLeave);
      });
    };
  }, []);

  // Don't render on touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-5 h-5 border border-white rounded-full pointer-events-none z-[9999] mix-blend-difference opacity-0 -translate-x-1/2 -translate-y-1/2"
        style={{ willChange: 'transform' }}
      />
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 w-1 h-1 bg-white rounded-full pointer-events-none z-[9999] opacity-0 -translate-x-1/2 -translate-y-1/2"
        style={{ willChange: 'transform' }}
      />
    </>
  );
};

export default CustomCursor;