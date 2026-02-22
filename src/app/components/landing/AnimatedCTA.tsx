'use client';

import React, { useRef, useEffect } from 'react';
import {
  Box,
  Container,
  VStack,
  HStack,
  Heading,
  Text,
  Button,
  Icon,
} from '@chakra-ui/react';
import { FiArrowRight, FiCheck, FiZap } from 'react-icons/fi';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';

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
  const cardRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Orbs floating
      gsap.to(orb1Ref.current, {
        x: 20, y: -15, scale: 1.08,
        duration: 7, repeat: -1, yoyo: true, ease: 'sine.inOut',
      });
      gsap.to(orb2Ref.current, {
        x: -15, y: 20, scale: 0.92,
        duration: 9, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 1.5,
      });

      // Initial states
      gsap.set(cardRef.current, { opacity: 0, y: 60, scale: 0.97 });
      gsap.set([titleRef.current, subtitleRef.current, featuresRef.current, buttonsRef.current], {
        opacity: 0, y: 30,
      });

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top 72%',
        onEnter: () => {
          const tl = gsap.timeline();
          tl.to(cardRef.current, {
            opacity: 1, y: 0, scale: 1,
            duration: 0.9, ease: 'power3.out',
          })
          .to(titleRef.current, {
            opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
          }, '-=0.6')
          .to(subtitleRef.current, {
            opacity: 1, y: 0, duration: 0.6, ease: 'power2.out',
          }, '-=0.4')
          .to(featuresRef.current, {
            opacity: 1, y: 0, duration: 0.6, ease: 'power2.out',
          }, '-=0.3')
          .to(buttonsRef.current, {
            opacity: 1, y: 0, duration: 0.7, ease: 'back.out(1.5)',
          }, '-=0.3');
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <Box
      ref={containerRef}
      py={24}
      bg="navy.900"
      position="relative"
      overflow="hidden"
    >
      {/* Orbs */}
      <Box
        ref={orb1Ref}
        position="absolute"
        top="-20%"
        left="-10%"
        w="500px"
        h="500px"
        borderRadius="full"
        bg="radial-gradient(circle, rgba(6,182,212,0.1) 0%, transparent 70%)"
        pointerEvents="none"
      />
      <Box
        ref={orb2Ref}
        position="absolute"
        bottom="-20%"
        right="-5%"
        w="400px"
        h="400px"
        borderRadius="full"
        bg="radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)"
        pointerEvents="none"
      />

      <Container maxW="4xl" position="relative" zIndex={1}>
        {/* Glass card */}
        <Box
          ref={cardRef}
          position="relative"
          overflow="hidden"
          borderRadius="3xl"
          p={{ base: 10, md: 16 }}
          textAlign="center"
          bg="rgba(15,22,41,0.5)"
          border="1px solid rgba(255,255,255,0.08)"
          backdropFilter="blur(20px)"
          boxShadow="0 40px 80px rgba(0,0,0,0.4)"
        >
          {/* Gradient top border */}
          <Box
            position="absolute"
            top={0}
            left={0}
            right={0}
            h="2px"
            bgGradient="linear(90deg, transparent, cyan.400, violet.400, transparent)"
          />

          {/* Inner glow */}
          <Box
            position="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%,-50%)"
            w="300px"
            h="300px"
            borderRadius="full"
            bg="radial-gradient(circle, rgba(6,182,212,0.06) 0%, transparent 70%)"
            pointerEvents="none"
          />

          <VStack spacing={8} position="relative">
            {/* Label */}
            <Box
              px={4}
              py={1.5}
              borderRadius="full"
              bg="rgba(6,182,212,0.1)"
              border="1px solid rgba(6,182,212,0.25)"
              display="inline-flex"
              alignItems="center"
              gap={2}
            >
              <Icon as={FiZap} color="cyan.400" boxSize={3.5} />
              <Text fontSize="xs" fontWeight="700" color="cyan.300" letterSpacing="0.1em" textTransform="uppercase">
                Get Started Today
              </Text>
            </Box>

            {/* Title */}
            <Heading
              ref={titleRef}
              as="h2"
              fontSize={{ base: '3xl', md: '5xl' }}
              fontWeight="800"
              color="white"
              letterSpacing="-0.03em"
              lineHeight="1.1"
              maxW="2xl"
            >
              {title.split(' ').slice(0, -2).join(' ')}{' '}
              <Box as="span" bgGradient="linear(135deg, cyan.400, violet.400)" bgClip="text">
                {title.split(' ').slice(-2).join(' ')}
              </Box>
            </Heading>

            {/* Subtitle */}
            <Text
              ref={subtitleRef}
              fontSize={{ base: 'md', md: 'lg' }}
              color="whiteAlpha.500"
              maxW="2xl"
              lineHeight="1.8"
            >
              {subtitle}
            </Text>

            {/* Feature pills */}
            {features.length > 0 && (
              <HStack
                ref={featuresRef}
                spacing={{ base: 3, md: 6 }}
                flexWrap="wrap"
                justify="center"
              >
                {features.map((feature, i) => (
                  <HStack key={i} spacing={2}>
                    <Box
                      w={5}
                      h={5}
                      borderRadius="full"
                      bg="rgba(16,185,129,0.15)"
                      border="1px solid rgba(16,185,129,0.4)"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Icon as={FiCheck} color="emerald.400" boxSize={3} />
                    </Box>
                    <Text fontSize="sm" color="whiteAlpha.700" fontWeight="500">
                      {feature}
                    </Text>
                  </HStack>
                ))}
              </HStack>
            )}

            {/* Buttons */}
            <HStack
              ref={buttonsRef}
              spacing={4}
              flexWrap="wrap"
              justify="center"
              pt={2}
            >
              <Link href={primaryButtonLink}>
                <Button
                  size="lg"
                  px={10}
                  py={7}
                  fontSize="md"
                  fontWeight="700"
                  borderRadius="2xl"
                  bg="linear-gradient(135deg, #06b6d4 0%, #8b5cf6 100%)"
                  color="white"
                  rightIcon={<FiArrowRight />}
                  boxShadow="0 8px 32px rgba(6,182,212,0.4)"
                  _hover={{
                    bg: 'linear-gradient(135deg, #0891b2 0%, #7c3aed 100%)',
                    transform: 'translateY(-3px)',
                    boxShadow: '0 16px 48px rgba(6,182,212,0.55)',
                  }}
                  transition="all 0.3s ease"
                >
                  {primaryButtonText}
                </Button>
              </Link>
              <Link href={secondaryButtonLink}>
                <Button
                  size="lg"
                  px={10}
                  py={7}
                  fontSize="md"
                  fontWeight="600"
                  borderRadius="2xl"
                  variant="outline"
                  borderColor="whiteAlpha.200"
                  color="whiteAlpha.800"
                  _hover={{
                    bg: 'whiteAlpha.100',
                    borderColor: 'cyan.400',
                    color: 'white',
                    transform: 'translateY(-3px)',
                  }}
                  transition="all 0.3s ease"
                >
                  {secondaryButtonText}
                </Button>
              </Link>
            </HStack>
          </VStack>
        </Box>
      </Container>
    </Box>
  );
}
