'use client';

import React, { useRef, useEffect } from 'react';
import { Box, Container, VStack, HStack, Heading, Text, Button, Icon } from '@chakra-ui/react';
import { FiArrowRight, FiStar, FiZap } from 'react-icons/fi';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface AnimatedCTAProps {
  title: string;
  subtitle: string;
  primaryButtonText: string;
  primaryButtonLink: string;
  secondaryButtonText: string;
  secondaryButtonLink: string;
  features?: string[];
}

export default function AnimatedCTA({
  title,
  subtitle,
  primaryButtonText,
  primaryButtonLink,
  secondaryButtonText,
  secondaryButtonLink,
  features = [],
}: AnimatedCTAProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Initial state
      gsap.set([titleRef.current, subtitleRef.current, buttonsRef.current, featuresRef.current], {
        opacity: 0,
        y: 50,
      });

      gsap.set(backgroundRef.current, {
        scale: 1.1,
        opacity: 0,
      });

      // Create scroll trigger animation
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top 70%',
        end: 'bottom 30%',
        onEnter: () => {
          const tl = gsap.timeline();

          // Animate background
          tl.to(backgroundRef.current, {
            scale: 1,
            opacity: 1,
            duration: 1.5,
            ease: 'power2.out',
          });

          // Animate title
          tl.to(titleRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
          }, '-=1');

          // Animate subtitle
          tl.to(subtitleRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
          }, '-=0.4');

          // Animate features
          if (features.length > 0) {
            tl.to(featuresRef.current, {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: 'power2.out',
            }, '-=0.3');
          }

          // Animate buttons
          tl.to(buttonsRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'back.out(1.7)',
          }, '-=0.2');

          // Continuous floating animation for buttons
          if (buttonsRef.current?.children) {
            gsap.to(buttonsRef.current.children, {
              y: -5,
              duration: 2,
              ease: 'power1.inOut',
              yoyo: true,
              repeat: -1,
              stagger: 0.2,
            });
          }
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [features.length]);

  return (
    <Box
      ref={containerRef}
      position="relative"
      py={20}
      overflow="hidden"
    >
      {/* Animated Background */}
      <Box
        ref={backgroundRef}
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        bgGradient="linear(135deg, dental.500 0%, brand.500 50%, dental.600 100%)"
        _before={{
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 30% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(255, 255, 255, 0.05) 0%, transparent 50%)',
        }}
      />

      {/* Floating Elements */}
      <Box
        position="absolute"
        top="10%"
        left="5%"
        w="80px"
        h="80px"
        bg="white"
        borderRadius="full"
        opacity={0.1}
        animation="float 8s ease-in-out infinite"
      />
      <Box
        position="absolute"
        top="20%"
        right="10%"
        w="60px"
        h="60px"
        bg="white"
        borderRadius="full"
        opacity={0.15}
        animation="float 6s ease-in-out infinite reverse"
      />
      <Box
        position="absolute"
        bottom="15%"
        left="15%"
        w="40px"
        h="40px"
        bg="white"
        borderRadius="full"
        opacity={0.2}
        animation="float 4s ease-in-out infinite"
      />

      <Container maxW="4xl" position="relative" zIndex={1}>
        <VStack spacing={8} textAlign="center" color="white">
          <Heading
            ref={titleRef}
            size="2xl"
            fontWeight="bold"
            maxW="3xl"
            lineHeight="shorter"
          >
            {title}
          </Heading>

          <Text
            ref={subtitleRef}
            fontSize="xl"
            opacity={0.9}
            maxW="2xl"
            lineHeight="tall"
          >
            {subtitle}
          </Text>

          {features.length > 0 && (
            <HStack
              ref={featuresRef}
              spacing={8}
              flexWrap="wrap"
              justify="center"
              pt={4}
            >
              {features.map((feature, index) => (
                <HStack key={index} spacing={2} color="white">
                  <Icon as={FiStar} boxSize={5} color="yellow.300" />
                  <Text fontSize="md" fontWeight="medium">
                    {feature}
                  </Text>
                </HStack>
              ))}
            </HStack>
          )}

          <HStack
            ref={buttonsRef}
            spacing={6}
            pt={6}
            flexWrap="wrap"
            justify="center"
          >
            <Link href={primaryButtonLink}>
              <Button
                size="lg"
                bg="white"
                color="dental.600"
                rightIcon={<FiArrowRight />}
                px={8}
                py={6}
                fontSize="lg"
                fontWeight="bold"
                borderRadius="xl"
                boxShadow="xl"
                _hover={{
                  bg: 'gray.100',
                  transform: 'translateY(-2px)',
                  boxShadow: '2xl',
                }}
                transition="all 0.3s ease"
              >
                {primaryButtonText}
              </Button>
            </Link>
            <Link href={secondaryButtonLink}>
              <Button
                size="lg"
                variant="outline"
                borderColor="white"
                color="white"
                leftIcon={<FiZap />}
                px={8}
                py={6}
                fontSize="lg"
                fontWeight="bold"
                borderRadius="xl"
                borderWidth="2px"
                _hover={{
                  bg: 'white',
                  color: 'dental.600',
                  transform: 'translateY(-2px)',
                }}
                transition="all 0.3s ease"
              >
                {secondaryButtonText}
              </Button>
            </Link>
          </HStack>
        </VStack>
      </Container>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(180deg); }
        }
      `}</style>
    </Box>
  );
}
