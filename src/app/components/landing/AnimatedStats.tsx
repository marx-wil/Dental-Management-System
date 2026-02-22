'use client';

import React, { useRef, useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  GridItem,
  VStack,
  Text,
  Heading,
  Icon,
} from '@chakra-ui/react';
import { FiUsers, FiCalendar, FiDollarSign, FiShield } from 'react-icons/fi';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface StatItem {
  icon: React.ElementType;
  value: string;
  label: string;
  gradient: string;
  glow: string;
  textColor: string;
}

const stats: StatItem[] = [
  {
    icon: FiUsers,
    value: '500+',
    label: 'Active Clinics',
    gradient: 'linear(135deg, cyan.500, cyan.700)',
    glow: 'rgba(6,182,212,0.25)',
    textColor: 'cyan.400',
  },
  {
    icon: FiCalendar,
    value: '50K+',
    label: 'Monthly Appointments',
    gradient: 'linear(135deg, violet.500, violet.700)',
    glow: 'rgba(139,92,246,0.25)',
    textColor: 'violet.400',
  },
  {
    icon: FiDollarSign,
    value: '₱2M+',
    label: 'Revenue Processed',
    gradient: 'linear(135deg, emerald.500, emerald.700)',
    glow: 'rgba(16,185,129,0.25)',
    textColor: 'emerald.400',
  },
  {
    icon: FiShield,
    value: '99.9%',
    label: 'Uptime Guarantee',
    gradient: 'linear(135deg, amber.500, amber.700)',
    glow: 'rgba(245,158,11,0.25)',
    textColor: 'amber.400',
  },
];

export default function AnimatedStats() {
  const containerRef = useRef<HTMLDivElement>(null);
  const statRefs = useRef<(HTMLDivElement | null)[]>([]);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set(headerRef.current, { opacity: 0, y: 30 });
      gsap.set(statRefs.current, { opacity: 0, y: 50, scale: 0.9 });

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top 75%',
        onEnter: () => {
          gsap.to(headerRef.current, {
            opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          });

          gsap.to(statRefs.current, {
            opacity: 1, y: 0, scale: 1,
            duration: 0.8,
            ease: 'back.out(1.7)',
            stagger: 0.15,
            delay: 0.2,
          });

          // Counter animation
          statRefs.current.forEach((ref, index) => {
            if (!ref) return;
            const numberEl = ref.querySelector('.stat-number');
            if (!numberEl) return;

            const finalValue = stats[index].value;
            const numericValue = parseInt(finalValue.replace(/[^\d]/g, ''));
            if (!numericValue) return;

            gsap.fromTo(numberEl,
              { textContent: 0 },
              {
                textContent: numericValue,
                duration: 2.5,
                ease: 'power2.out',
                snap: { textContent: 1 },
                delay: 0.4 + index * 0.15,
                onUpdate() {
                  const val = Math.round(Number(this.targets()[0].textContent));
                  if (finalValue.includes('K')) numberEl.textContent = `${val}K+`;
                  else if (finalValue.includes('M')) numberEl.textContent = `₱${val}M+`;
                  else if (finalValue.includes('%')) numberEl.textContent = `${val}%`;
                  else numberEl.textContent = `${val}+`;
                },
              }
            );
          });
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
      {/* Subtle divider gradient from hero */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        h="1px"
        bg="linear-gradient(90deg, transparent 0%, rgba(6,182,212,0.3) 50%, transparent 100%)"
      />
      <Box
        position="absolute"
        bottom={0}
        left={0}
        right={0}
        h="1px"
        bg="linear-gradient(90deg, transparent 0%, rgba(139,92,246,0.3) 50%, transparent 100%)"
      />

      <Container maxW="6xl">
        <VStack spacing={16}>
          {/* Header */}
          <Box ref={headerRef} textAlign="center">
            <Text
              fontSize="xs"
              fontWeight="700"
              color="cyan.400"
              letterSpacing="0.15em"
              textTransform="uppercase"
              mb={3}
            >
              Proven Results
            </Text>
            <Heading
              fontSize={{ base: '3xl', md: '4xl' }}
              fontWeight="800"
              color="white"
              letterSpacing="-0.02em"
              mb={4}
            >
              Trusted by Dental Professionals
            </Heading>
            <Text fontSize="lg" color="whiteAlpha.500" maxW="2xl" mx="auto">
              Join hundreds of clinics across the Philippines who trust our system
              to manage their practice efficiently and securely.
            </Text>
          </Box>

          {/* Stats Grid */}
          <Grid
            templateColumns={{ base: '1fr', sm: 'repeat(2,1fr)', lg: 'repeat(4,1fr)' }}
            gap={6}
            w="full"
          >
            {stats.map((stat, index) => (
              <GridItem key={index}>
                <Box
                  ref={(el) => { statRefs.current[index] = el; }}
                  position="relative"
                  p={8}
                  bg="rgba(15,22,41,0.6)"
                  border="1px solid rgba(255,255,255,0.07)"
                  borderRadius="2xl"
                  backdropFilter="blur(16px)"
                  textAlign="center"
                  overflow="hidden"
                  cursor="default"
                  transition="all 0.3s ease"
                  _hover={{
                    transform: 'translateY(-6px)',
                    border: '1px solid rgba(255,255,255,0.14)',
                    boxShadow: `0 20px 60px ${stat.glow}`,
                  }}
                  _before={{
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    h: '3px',
                    bgGradient: stat.gradient,
                    borderTopRadius: '2xl',
                  }}
                >
                  {/* Glow dot */}
                  <Box
                    position="absolute"
                    top="30%"
                    left="50%"
                    transform="translate(-50%,-50%)"
                    w="120px"
                    h="120px"
                    borderRadius="full"
                    bg={stat.glow}
                    filter="blur(40px)"
                    pointerEvents="none"
                  />

                  <VStack spacing={4} position="relative">
                    {/* Icon */}
                    <Box
                      p={3}
                      borderRadius="xl"
                      bg={`rgba(${stat.glow.replace('rgba(', '').replace(/,\d+\.\d+\)/, ',0.15)')}`}
                      border="1px solid"
                      borderColor="whiteAlpha.100"
                    >
                      <Icon as={stat.icon} boxSize={6} color={stat.textColor} />
                    </Box>

                    {/* Number */}
                    <Text
                      className="stat-number"
                      fontSize="4xl"
                      fontWeight="800"
                      color={stat.textColor}
                      lineHeight={1}
                      letterSpacing="-0.03em"
                    >
                      {stat.value}
                    </Text>

                    {/* Label */}
                    <Text
                      fontSize="sm"
                      color="whiteAlpha.500"
                      fontWeight="500"
                      lineHeight={1.4}
                    >
                      {stat.label}
                    </Text>
                  </VStack>
                </Box>
              </GridItem>
            ))}
          </Grid>
        </VStack>
      </Container>
    </Box>
  );
}
