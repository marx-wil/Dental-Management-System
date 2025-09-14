'use client';

import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface GSAPProviderProps {
  children: React.ReactNode;
}

export default function GSAPProvider({ children }: GSAPProviderProps) {
  useEffect(() => {
    // Global GSAP settings for better performance
    gsap.config({
      nullTargetWarn: false,
    });

    // Set default ease for better performance
    gsap.defaults({
      ease: 'power2.out',
      duration: 0.6,
    });

    // Optimize ScrollTrigger for mobile
    ScrollTrigger.config({
      ignoreMobileResize: true,
      syncInterval: 16, // 60fps
    });

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return <>{children}</>;
}
