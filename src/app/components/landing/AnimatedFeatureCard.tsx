'use client';

import React, { useRef, useEffect } from 'react';
import { Box, Heading, Text, Icon } from '@chakra-ui/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface AnimatedFeatureCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  index: number;
  color?: string;
  gradient?: string;
  glowColor?: string;
}

const colorMap: Record<string, { icon: string; glow: string; gradient: string; border: string; bg: string }> = {
  'cyan.500': {
    icon: 'cyan.400',
    glow: 'rgba(6,182,212,0.2)',
    gradient: 'linear(135deg, cyan.600, cyan.400)',
    border: 'rgba(6,182,212,0.2)',
    bg: 'rgba(6,182,212,0.06)',
  },
  'violet.500': {
    icon: 'violet.400',
    glow: 'rgba(139,92,246,0.2)',
    gradient: 'linear(135deg, violet.600, violet.400)',
    border: 'rgba(139,92,246,0.2)',
    bg: 'rgba(139,92,246,0.06)',
  },
  'emerald.500': {
    icon: 'emerald.400',
    glow: 'rgba(16,185,129,0.2)',
    gradient: 'linear(135deg, emerald.600, emerald.400)',
    border: 'rgba(16,185,129,0.2)',
    bg: 'rgba(16,185,129,0.06)',
  },
  'amber.500': {
    icon: 'amber.400',
    glow: 'rgba(245,158,11,0.2)',
    gradient: 'linear(135deg, amber.600, amber.400)',
    border: 'rgba(245,158,11,0.2)',
    bg: 'rgba(245,158,11,0.06)',
  },
  'rose.500': {
    icon: 'rose.400',
    glow: 'rgba(244,63,94,0.2)',
    gradient: 'linear(135deg, rose.600, rose.400)',
    border: 'rgba(244,63,94,0.2)',
    bg: 'rgba(244,63,94,0.06)',
  },
};

// Cycle through palette when color doesn't match
const palette = Object.keys(colorMap);

export default function AnimatedFeatureCard({
  icon,
  title,
  description,
  index,
  color = 'cyan.500',
}: AnimatedFeatureCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const iconBoxRef = useRef<HTMLDivElement>(null);

  const colorKey = colorMap[color] ? color : palette[index % palette.length];
  const colors = colorMap[colorKey];

  useEffect(() => {
    if (!cardRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set(cardRef.current, { opacity: 0, y: 50, scale: 0.95 });

      const st = ScrollTrigger.create({
        trigger: cardRef.current,
        start: 'top 85%',
        onEnter: () => {
          gsap.to(cardRef.current, {
            opacity: 1, y: 0, scale: 1,
            duration: 0.8,
            ease: 'power3.out',
            delay: index * 0.08,
          });
        },
      });

      // Hover: 3D tilt + icon scale
      const card = cardRef.current;
      const iconBox = iconBoxRef.current;

      const handleMove = (e: MouseEvent) => {
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * -12;
        gsap.to(card, {
          rotateY: x,
          rotateX: y,
          duration: 0.4,
          ease: 'power2.out',
          transformPerspective: 800,
        });
      };

      const handleEnter = () => {
        gsap.to(card, { y: -8, scale: 1.02, duration: 0.3, ease: 'power2.out' });
        gsap.to(iconBox, { scale: 1.15, rotation: 5, duration: 0.3, ease: 'back.out(2)' });
      };

      const handleLeave = () => {
        gsap.to(card, {
          y: 0, scale: 1, rotateX: 0, rotateY: 0,
          duration: 0.5, ease: 'power2.out',
        });
        gsap.to(iconBox, { scale: 1, rotation: 0, duration: 0.3, ease: 'power2.out' });
      };

      card?.addEventListener('mousemove', handleMove);
      card?.addEventListener('mouseenter', handleEnter);
      card?.addEventListener('mouseleave', handleLeave);

      return () => {
        card?.removeEventListener('mousemove', handleMove);
        card?.removeEventListener('mouseenter', handleEnter);
        card?.removeEventListener('mouseleave', handleLeave);
        st.kill();
      };
    }, cardRef);

    return () => ctx.revert();
  }, [index]);

  return (
    <Box
      ref={cardRef}
      h="full"
      p={7}
      position="relative"
      borderRadius="2xl"
      bg="rgba(15,22,41,0.5)"
      border="1px solid rgba(255,255,255,0.07)"
      backdropFilter="blur(16px)"
      overflow="hidden"
      cursor="default"
      style={{ transformStyle: 'preserve-3d' }}
      _before={{
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        h: '2px',
        bgGradient: colors.gradient,
        borderTopRadius: '2xl',
      }}
      transition="border-color 0.3s ease, box-shadow 0.3s ease"
      _hover={{
        borderColor: colors.border,
        boxShadow: `0 24px 60px ${colors.glow}, 0 0 0 1px ${colors.border}`,
      }}
    >
      {/* Glow blob */}
      <Box
        position="absolute"
        top="-40%"
        right="-20%"
        w="200px"
        h="200px"
        borderRadius="full"
        bg={colors.glow}
        filter="blur(50px)"
        pointerEvents="none"
        opacity={0.8}
      />

      {/* Icon */}
      <Box
        ref={iconBoxRef}
        display="inline-flex"
        alignItems="center"
        justifyContent="center"
        p={4}
        borderRadius="xl"
        bg={colors.bg}
        border="1px solid"
        borderColor={colors.border}
        mb={5}
        position="relative"
      >
        <Icon as={icon} boxSize={7} color={colors.icon} />
      </Box>

      {/* Content */}
      <Heading
        as="h3"
        fontSize="xl"
        fontWeight="700"
        color="white"
        mb={3}
        letterSpacing="-0.02em"
        position="relative"
      >
        {title}
      </Heading>
      <Text
        color="whiteAlpha.500"
        lineHeight="1.75"
        fontSize="sm"
        position="relative"
      >
        {description}
      </Text>
    </Box>
  );
}
