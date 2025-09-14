'use client';

import React, { useRef, useEffect, ReactNode } from 'react';
import { Box } from '@chakra-ui/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface AnimatedSectionProps {
  children: ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
  duration?: number;
  trigger?: string;
  className?: string;
}

export default function AnimatedSection({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.8,
  trigger = 'top 80%',
  className,
}: AnimatedSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Set initial position based on direction
      const initialPositions = {
        up: { y: 50, opacity: 0 },
        down: { y: -50, opacity: 0 },
        left: { x: 50, opacity: 0 },
        right: { x: -50, opacity: 0 },
      };

      gsap.set(sectionRef.current, initialPositions[direction]);

      // Create scroll trigger animation
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: trigger,
        onEnter: () => {
          gsap.to(sectionRef.current, {
            x: 0,
            y: 0,
            opacity: 1,
            duration,
            delay,
            ease: 'power3.out',
          });
        },
        onLeave: () => {
          gsap.to(sectionRef.current, {
            ...initialPositions[direction],
            duration: 0.3,
            ease: 'power2.in',
          });
        },
        onEnterBack: () => {
          gsap.to(sectionRef.current, {
            x: 0,
            y: 0,
            opacity: 1,
            duration,
            delay,
            ease: 'power3.out',
          });
        },
        onLeaveBack: () => {
          gsap.to(sectionRef.current, {
            ...initialPositions[direction],
            duration: 0.3,
            ease: 'power2.in',
          });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [direction, delay, duration, trigger]);

  return (
    <Box ref={sectionRef} className={className}>
      {children}
    </Box>
  );
}
