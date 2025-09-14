'use client';

import React, { useRef, useEffect } from 'react';
import { Card, CardBody, CardHeader, Heading, Text, Icon, Box } from '@chakra-ui/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface AnimatedFeatureCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  index: number;
  color?: string;
}

export default function AnimatedFeatureCard({
  icon,
  title,
  description,
  index,
  color = 'dental.500',
}: AnimatedFeatureCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;

    const ctx = gsap.context(() => {
      // Initial state
      gsap.set([iconRef.current, titleRef.current, descriptionRef.current], {
        opacity: 0,
        y: 30,
      });

      gsap.set(cardRef.current, {
        y: 50,
        opacity: 0,
        scale: 0.9,
      });

      // Create scroll trigger animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
      });

      // Animate card entrance
      tl.to(cardRef.current, {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: 'power3.out',
        delay: index * 0.1, // Stagger animation
      });

      // Animate icon with bounce
      tl.to(iconRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'back.out(1.7)',
      }, '-=0.4');

      // Animate title
      tl.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power2.out',
      }, '-=0.3');

      // Animate description
      tl.to(descriptionRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power2.out',
      }, '-=0.2');

      // Hover animation
      const handleMouseEnter = () => {
        gsap.to(cardRef.current, {
          y: -10,
          scale: 1.02,
          duration: 0.3,
          ease: 'power2.out',
        });
        gsap.to(iconRef.current, {
          scale: 1.1,
          rotation: 5,
          duration: 0.3,
          ease: 'power2.out',
        });
      };

      const handleMouseLeave = () => {
        gsap.to(cardRef.current, {
          y: 0,
          scale: 1,
          duration: 0.3,
          ease: 'power2.out',
        });
        gsap.to(iconRef.current, {
          scale: 1,
          rotation: 0,
          duration: 0.3,
          ease: 'power2.out',
        });
      };

      const cardElement = cardRef.current;
      if (cardElement) {
        cardElement.addEventListener('mouseenter', handleMouseEnter);
        cardElement.addEventListener('mouseleave', handleMouseLeave);
      }

      return () => {
        if (cardElement) {
          cardElement.removeEventListener('mouseenter', handleMouseEnter);
          cardElement.removeEventListener('mouseleave', handleMouseLeave);
        }
      };
    }, cardRef);

    return () => ctx.revert();
  }, [index]);

  return (
    <Card
      ref={cardRef}
      h="full"
      borderRadius="2xl"
      boxShadow="xl"
      border="1px solid"
      borderColor="gray.100"
      bg="white"
      overflow="hidden"
      position="relative"
      _before={{
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '4px',
        bgGradient: `linear(90deg, ${color} 0%, ${color.replace('500', '300')} 100%)`,
      }}
    >
      <CardHeader pb={2}>
        <Box
          ref={iconRef}
          p={4}
          borderRadius="xl"
          bg={`${color.replace('500', '50')}`}
          display="inline-flex"
          alignItems="center"
          justifyContent="center"
        >
          <Icon as={icon} boxSize={8} color={color} />
        </Box>
      </CardHeader>
      <CardBody pt={0}>
        <Heading
          ref={titleRef}
          size="lg"
          mb={3}
          color="gray.800"
          fontWeight="bold"
        >
          {title}
        </Heading>
        <Text
          ref={descriptionRef}
          color="gray.600"
          lineHeight="tall"
          fontSize="md"
        >
          {description}
        </Text>
      </CardBody>
    </Card>
  );
}
