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
  Badge,
  Grid,
  GridItem,
  Icon,
  Avatar,
} from '@chakra-ui/react';
import {
  FiArrowRight,
  FiPlay,
  FiUsers,
  FiCalendar,
  FiThumbsUp,
  FiStar,
  FiPlus,
  FiTrendingUp,
} from 'react-icons/fi';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface AnimatedHeroProps {
  title: string;
  subtitle: string;
  description: string;
  primaryButtonText: string;
  primaryButtonLink: string;
  secondaryButtonText: string;
  secondaryButtonLink: string;
  badgeText: string;
}

export default function AnimatedHero({
  title,
  subtitle,
  description,
  primaryButtonText,
  primaryButtonLink,
  secondaryButtonText,
  secondaryButtonLink,
  badgeText,
}: AnimatedHeroProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const socialProofRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);
  const orb3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current) return;

    const ctx = gsap.context(() => {
      // Animate orbs continuously
      gsap.to(orb1Ref.current, {
        x: 30,
        y: -20,
        scale: 1.1,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
      gsap.to(orb2Ref.current, {
        x: -20,
        y: 30,
        scale: 0.9,
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 1,
      });
      gsap.to(orb3Ref.current, {
        x: 15,
        y: 25,
        scale: 1.05,
        duration: 7,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 2,
      });

      // Animate particles
      if (particlesRef.current) {
        const particles = particlesRef.current.querySelectorAll('.hero-particle');
        particles.forEach((p) => {
          gsap.to(p, {
            y: `random(-30, 30)`,
            x: `random(-20, 20)`,
            opacity: `random(0.3, 0.8)`,
            duration: `random(4, 8)`,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: `random(0, 3)`,
          });
        });
      }

      // Initial state
      gsap.set([badgeRef.current, titleRef.current, subtitleRef.current, descriptionRef.current, featuresRef.current, buttonsRef.current, socialProofRef.current], {
        opacity: 0,
        y: 40,
      });
      gsap.set(mockupRef.current, {
        opacity: 0,
        x: 60,
        scale: 0.95,
      });

      const tl = gsap.timeline({ delay: 0.3 });

      tl.to(badgeRef.current, {
        opacity: 1, y: 0, duration: 0.7, ease: 'back.out(2)',
      })
      .to(titleRef.current, {
        opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
      }, '-=0.4')
      .to(subtitleRef.current, {
        opacity: 1, y: 0, duration: 0.7, ease: 'power2.out',
      }, '-=0.5')
      .to(descriptionRef.current, {
        opacity: 1, y: 0, duration: 0.7, ease: 'power2.out',
      }, '-=0.4')
      .to(featuresRef.current, {
        opacity: 1, y: 0, duration: 0.6, ease: 'power2.out',
      }, '-=0.3')
      .to(buttonsRef.current, {
        opacity: 1, y: 0, duration: 0.7, ease: 'back.out(1.5)',
      }, '-=0.4')
      .to(socialProofRef.current, {
        opacity: 1, y: 0, duration: 0.5, ease: 'power2.out',
      }, '-=0.3')
      .to(mockupRef.current, {
        opacity: 1, x: 0, scale: 1, duration: 1.2, ease: 'power3.out',
      }, '-=1.2');

      // Floating mockup
      gsap.to(mockupRef.current, {
        y: -12,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
        delay: 2,
      });

      // Stagger dashboard cards
      const cards = heroRef.current?.querySelectorAll('[data-card]');
      if (cards) {
        gsap.set(cards, { opacity: 0, y: 20, scale: 0.95 });
        gsap.to(cards, {
          opacity: 1, y: 0, scale: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: 'back.out(1.7)',
          delay: 1.5,
        });
      }

    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <Box
      ref={heroRef}
      position="relative"
      minH="100vh"
      display="flex"
      alignItems="center"
      overflow="hidden"
      bg="navy.900"
      pt={20}
    >
      {/* Mesh gradient orbs */}
      <Box
        ref={orb1Ref}
        position="absolute"
        top="-10%"
        left="-5%"
        w="600px"
        h="600px"
        borderRadius="full"
        bg="radial-gradient(circle, rgba(6,182,212,0.12) 0%, transparent 70%)"
        pointerEvents="none"
      />
      <Box
        ref={orb2Ref}
        position="absolute"
        top="30%"
        right="-10%"
        w="500px"
        h="500px"
        borderRadius="full"
        bg="radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)"
        pointerEvents="none"
      />
      <Box
        ref={orb3Ref}
        position="absolute"
        bottom="-10%"
        left="30%"
        w="400px"
        h="400px"
        borderRadius="full"
        bg="radial-gradient(circle, rgba(16,185,129,0.08) 0%, transparent 70%)"
        pointerEvents="none"
      />

      {/* Grid lines background */}
      <Box
        position="absolute"
        inset={0}
        opacity={0.04}
        backgroundImage="linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)"
        backgroundSize="60px 60px"
        pointerEvents="none"
      />

      {/* Floating particles */}
      <Box ref={particlesRef} position="absolute" inset={0} pointerEvents="none">
        {[...Array(12)].map((_, i) => (
          <Box
            key={i}
            className="hero-particle"
            position="absolute"
            borderRadius="full"
            bg={i % 3 === 0 ? 'cyan.400' : i % 3 === 1 ? 'violet.400' : 'emerald.400'}
            opacity={0.4}
            w={`${Math.random() * 6 + 2}px`}
            h={`${Math.random() * 6 + 2}px`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </Box>

      <Container maxW="7xl" position="relative" zIndex={1} py={16}>
        <Grid templateColumns={{ base: '1fr', lg: '1fr 1fr' }} gap={{ base: 12, lg: 16 }} alignItems="center">
          {/* Left — Text Content */}
          <GridItem>
            <VStack spacing={7} align="start">
              {/* Badge */}
              <Box ref={badgeRef}>
                <Badge
                  px={4}
                  py={2}
                  borderRadius="full"
                  bg="rgba(6,182,212,0.1)"
                  color="cyan.300"
                  border="1px solid rgba(6,182,212,0.3)"
                  fontSize="xs"
                  fontWeight="600"
                  letterSpacing="0.05em"
                  textTransform="uppercase"
                >
                  ✦ {badgeText}
                </Badge>
              </Box>

              {/* Title */}
              <Box ref={titleRef}>
                <Heading
                  as="h1"
                  fontSize={{ base: '4xl', md: '5xl', lg: '6xl' }}
                  fontWeight="800"
                  color="white"
                  lineHeight="1.1"
                  letterSpacing="-0.03em"
                >
                  {title.split(' ').slice(0, 2).join(' ')}{' '}
                  <Box
                    as="span"
                    bgGradient="linear(135deg, cyan.400, violet.400)"
                    bgClip="text"
                  >
                    {title.split(' ').slice(2).join(' ')}
                  </Box>
                </Heading>
              </Box>

              {/* Subtitle */}
              <Box ref={subtitleRef}>
                <Text
                  fontSize={{ base: 'lg', md: 'xl' }}
                  color="cyan.300"
                  fontWeight="600"
                  letterSpacing="-0.01em"
                >
                  {subtitle}
                </Text>
              </Box>

              {/* Description */}
              <Box ref={descriptionRef}>
                <Text
                  fontSize={{ base: 'md', md: 'lg' }}
                  color="whiteAlpha.600"
                  lineHeight="1.8"
                  maxW="lg"
                >
                  {description}
                </Text>
              </Box>

              {/* Feature Pills */}
              <HStack ref={featuresRef} spacing={4} flexWrap="wrap">
                {[
                  { icon: FiUsers, text: 'Patient Records' },
                  { icon: FiCalendar, text: 'Smart Scheduling' },
                  { icon: FiThumbsUp, text: 'Better Care' },
                ].map((f, i) => (
                  <HStack
                    key={i}
                    spacing={2}
                    px={4}
                    py={2}
                    borderRadius="full"
                    bg="whiteAlpha.50"
                    border="1px solid"
                    borderColor="whiteAlpha.100"
                    backdropFilter="blur(10px)"
                  >
                    <Icon as={f.icon} color="cyan.400" boxSize={4} />
                    <Text fontSize="sm" color="whiteAlpha.800" fontWeight="500">
                      {f.text}
                    </Text>
                  </HStack>
                ))}
              </HStack>

              {/* Buttons */}
              <HStack ref={buttonsRef} spacing={4} flexWrap="wrap" pt={2}>
                <Link href={primaryButtonLink}>
                  <Button
                    size="lg"
                    px={8}
                    py={7}
                    fontSize="md"
                    fontWeight="700"
                    borderRadius="2xl"
                    bg="linear-gradient(135deg, #06b6d4 0%, #8b5cf6 100%)"
                    color="white"
                    rightIcon={<FiArrowRight />}
                    boxShadow="0 8px 32px rgba(6,182,212,0.35)"
                    _hover={{
                      bg: 'linear-gradient(135deg, #0891b2 0%, #7c3aed 100%)',
                      transform: 'translateY(-3px)',
                      boxShadow: '0 16px 40px rgba(6,182,212,0.5)',
                    }}
                    transition="all 0.3s ease"
                  >
                    {primaryButtonText}
                  </Button>
                </Link>
                <Link href={secondaryButtonLink}>
                  <Button
                    size="lg"
                    px={8}
                    py={7}
                    fontSize="md"
                    fontWeight="600"
                    borderRadius="2xl"
                    variant="outline"
                    borderColor="whiteAlpha.200"
                    color="whiteAlpha.900"
                    leftIcon={<FiPlay />}
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

              {/* Social Proof */}
              <HStack ref={socialProofRef} spacing={4} pt={2}>
                <HStack spacing={-3}>
                  {['#0891b2', '#8b5cf6', '#10b981', '#f59e0b'].map((color, i) => (
                    <Avatar
                      key={i}
                      size="sm"
                      bg={color}
                      border="2px solid"
                      borderColor="navy.900"
                      name={`User ${i}`}
                    />
                  ))}
                </HStack>
                <Box>
                  <HStack spacing={1} mb={0.5}>
                    {[...Array(5)].map((_, i) => (
                      <Icon key={i} as={FiStar} color="amber.400" boxSize={3} />
                    ))}
                  </HStack>
                  <Text fontSize="xs" color="whiteAlpha.500">
                    Trusted by <Text as="span" color="cyan.400" fontWeight="700">500+</Text> dental clinics
                  </Text>
                </Box>
              </HStack>
            </VStack>
          </GridItem>

          {/* Right — Dashboard Mockup */}
          <GridItem display={{ base: 'none', lg: 'block' }}>
            <Box ref={mockupRef} position="relative" h="580px">
              {/* Main Dashboard Card */}
              <Box
                data-card
                position="absolute"
                top={0}
                right={0}
                w="380px"
                bg="rgba(15,22,41,0.8)"
                border="1px solid rgba(255,255,255,0.08)"
                borderRadius="2xl"
                boxShadow="0 24px 64px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)"
                p={5}
                backdropFilter="blur(20px)"
              >
                {/* Card Header */}
                <HStack justify="space-between" mb={5}>
                  <HStack spacing={2}>
                    <Box w={2} h={2} borderRadius="full" bg="rose.400" />
                    <Box w={2} h={2} borderRadius="full" bg="amber.400" />
                    <Box w={2} h={2} borderRadius="full" bg="emerald.400" />
                  </HStack>
                  <Text fontSize="xs" color="whiteAlpha.400" fontWeight="500">
                    Dashboard Overview
                  </Text>
                  <Avatar size="xs" name="Dr. Cruz" bg="cyan.500" />
                </HStack>

                {/* Stats Row */}
                <Grid templateColumns="repeat(3,1fr)" gap={3} mb={5}>
                  {[
                    { label: 'Patients', value: '1,247', color: 'cyan' },
                    { label: 'Today', value: '23', color: 'violet' },
                    { label: 'Revenue', value: '₱2.4M', color: 'emerald' },
                  ].map((s, i) => (
                    <Box
                      key={i}
                      bg="whiteAlpha.50"
                      border="1px solid rgba(255,255,255,0.06)"
                      borderRadius="xl"
                      p={3}
                    >
                      <Text fontSize="xs" color="whiteAlpha.500" mb={1}>{s.label}</Text>
                      <Text
                        fontSize="lg"
                        fontWeight="700"
                        color={`${s.color}.300`}
                        lineHeight={1}
                      >
                        {s.value}
                      </Text>
                    </Box>
                  ))}
                </Grid>

                {/* Mini Chart */}
                <Box
                  bg="whiteAlpha.50"
                  border="1px solid rgba(255,255,255,0.06)"
                  borderRadius="xl"
                  p={4}
                  mb={4}
                >
                  <HStack justify="space-between" mb={3}>
                    <Text fontSize="xs" fontWeight="600" color="whiteAlpha.700">
                      Patient Demographics
                    </Text>
                    <Icon as={FiTrendingUp} color="emerald.400" boxSize={4} />
                  </HStack>
                  <HStack spacing={2} align="end" h="60px">
                    {[45, 70, 35, 85, 55, 90, 65].map((h, i) => (
                      <Box
                        key={i}
                        flex={1}
                        h={`${h}%`}
                        borderRadius="sm"
                        bg={i === 5
                          ? 'linear-gradient(180deg, #06b6d4 0%, #8b5cf6 100%)'
                          : 'rgba(255,255,255,0.08)'
                        }
                        transition="all 0.3s"
                      />
                    ))}
                  </HStack>
                </Box>

                {/* Action Buttons Row */}
                <HStack spacing={2}>
                  <Button size="xs" flex={1} bg="cyan.600" color="white" borderRadius="lg" leftIcon={<FiPlus />} _hover={{ bg: 'cyan.500' }}>
                    New Patient
                  </Button>
                  <Button size="xs" flex={1} bg="whiteAlpha.100" color="whiteAlpha.800" borderRadius="lg" border="1px solid rgba(255,255,255,0.1)" _hover={{ bg: 'whiteAlpha.200' }}>
                    Schedule
                  </Button>
                  <Button size="xs" flex={1} bg="whiteAlpha.100" color="whiteAlpha.800" borderRadius="lg" border="1px solid rgba(255,255,255,0.1)" _hover={{ bg: 'whiteAlpha.200' }}>
                    Reports
                  </Button>
                </HStack>
              </Box>

              {/* Recent Patients Card */}
              <Box
                data-card
                position="absolute"
                bottom={24}
                right={24}
                w="260px"
                bg="rgba(15,22,41,0.85)"
                border="1px solid rgba(255,255,255,0.08)"
                borderRadius="2xl"
                boxShadow="0 24px 48px rgba(0,0,0,0.4)"
                p={4}
                backdropFilter="blur(20px)"
              >
                <Text fontSize="xs" fontWeight="600" color="whiteAlpha.700" mb={3}>
                  Recent Patients
                </Text>
                <VStack spacing={3} align="stretch">
                  {[
                    { name: 'Maria Santos', type: 'Checkup', status: 'Done', statusColor: 'emerald' },
                    { name: 'Juan Cruz', type: 'Cleaning', status: 'Today', statusColor: 'cyan' },
                  ].map((p, i) => (
                    <HStack key={i} spacing={3}>
                      <Avatar size="xs" name={p.name} bg={i === 0 ? 'cyan.500' : 'violet.500'} />
                      <Box flex={1}>
                        <Text fontSize="xs" fontWeight="600" color="white">{p.name}</Text>
                        <Text fontSize="xs" color="whiteAlpha.400">{p.type}</Text>
                      </Box>
                      <Badge
                        fontSize="9px"
                        px={2}
                        py={0.5}
                        borderRadius="full"
                        bg={`${p.statusColor}.900`}
                        color={`${p.statusColor}.300`}
                        border="1px solid"
                        borderColor={`${p.statusColor}.700`}
                      >
                        {p.status}
                      </Badge>
                    </HStack>
                  ))}
                </VStack>
              </Box>

              {/* Schedule Card */}
              <Box
                data-card
                position="absolute"
                bottom={0}
                left={0}
                w="220px"
                bg="rgba(6,182,212,0.1)"
                border="1px solid rgba(6,182,212,0.2)"
                borderRadius="2xl"
                boxShadow="0 0 40px rgba(6,182,212,0.15)"
                p={4}
                backdropFilter="blur(20px)"
              >
                <HStack justify="space-between" mb={3}>
                  <Text fontSize="xs" fontWeight="600" color="cyan.300">Today&apos;s Schedule</Text>
                  <Icon as={FiCalendar} color="cyan.400" boxSize={3.5} />
                </HStack>
                <VStack spacing={2} align="stretch">
                  {[
                    { time: '9:00 AM', name: 'Maria S.', color: 'cyan.400' },
                    { time: '10:30 AM', name: 'Juan C.', color: 'violet.400' },
                    { time: '2:00 PM', name: 'Ana R.', color: 'emerald.400' },
                  ].map((a, i) => (
                    <HStack key={i} spacing={2}>
                      <Box w={1.5} h={1.5} borderRadius="full" bg={a.color} flexShrink={0} />
                      <Text fontSize="xs" color="whiteAlpha.500">{a.time}</Text>
                      <Text fontSize="xs" color="whiteAlpha.800" fontWeight="500">{a.name}</Text>
                    </HStack>
                  ))}
                </VStack>
              </Box>
            </Box>
          </GridItem>
        </Grid>
      </Container>

      {/* Bottom gradient fade */}
      <Box
        position="absolute"
        bottom={0}
        left={0}
        right={0}
        h="200px"
        bgGradient="linear(to-t, navy.900, transparent)"
        pointerEvents="none"
      />
    </Box>
  );
}
