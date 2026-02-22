'use client';

import React, { useRef, useEffect } from 'react';
import { Box, Flex, VStack, HStack, Text, Icon } from '@chakra-ui/react';
import { FaTooth } from 'react-icons/fa';
import {
  FiUsers,
  FiCalendar,
  FiShield,
  FiTrendingUp,
  FiStar,
} from 'react-icons/fi';
import { gsap } from 'gsap';
import Link from 'next/link';

interface AuthLayoutProps {
  children: React.ReactNode;
  showWelcome?: boolean;
}

export default function AuthLayout({ children, showWelcome = true }: AuthLayoutProps) {
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Orb ambient animations — gsap.to() safe with strict mode
      if (orb1Ref.current) {
        gsap.to(orb1Ref.current, {
          x: 20, y: -15, scale: 1.08,
          duration: 8, repeat: -1, yoyo: true, ease: 'sine.inOut',
        });
      }
      if (orb2Ref.current) {
        gsap.to(orb2Ref.current, {
          x: -15, y: 20, scale: 0.92,
          duration: 10, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 2,
        });
      }

      // Panel entrances — gsap.to() with inline style initial state on the elements
      if (leftRef.current && showWelcome) {
        gsap.to(leftRef.current, {
          x: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
        });
      }
      if (rightRef.current) {
        gsap.to(rightRef.current, {
          x: 0, opacity: 1, duration: 0.9, ease: 'power3.out', delay: 0.1,
        });
      }
    });

    return () => ctx.revert();
  }, [showWelcome]);

  const features = [
    { icon: FiUsers,      label: '1,247+ Patients managed' },
    { icon: FiCalendar,   label: '50K+ Monthly appointments' },
    { icon: FiShield,     label: 'PDPA compliant & secure' },
    { icon: FiTrendingUp, label: '40% revenue increase avg.' },
  ];

  return (
    <Flex minH="100vh" bg="navy.900">
      {/* ── Left panel ── */}
      {showWelcome && (
        <Box
          ref={leftRef}
          display={{ base: 'none', lg: 'flex' }}
          flexDir="column"
          justifyContent="center"
          flex="0 0 45%"
          maxW="45%"
          bg="rgba(4, 6, 15, 0.6)"
          position="relative"
          overflow="hidden"
          px={12}
          py={12}
          style={{ opacity: 0, transform: 'translateX(-40px)' }}
        >
          {/* Grid lines */}
          <Box
            position="absolute"
            inset={0}
            opacity={0.04}
            backgroundImage="linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)"
            backgroundSize="50px 50px"
            pointerEvents="none"
          />

          {/* Glow orbs */}
          <Box
            ref={orb1Ref}
            position="absolute"
            top="-15%"
            left="-15%"
            w="400px"
            h="400px"
            borderRadius="full"
            bg="radial-gradient(circle, rgba(6,182,212,0.12) 0%, transparent 70%)"
            pointerEvents="none"
          />
          <Box
            ref={orb2Ref}
            position="absolute"
            bottom="-15%"
            right="-10%"
            w="350px"
            h="350px"
            borderRadius="full"
            bg="radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)"
            pointerEvents="none"
          />

          {/* Right-edge gradient divider */}
          <Box
            position="absolute"
            right={0}
            top="15%"
            bottom="15%"
            w="1px"
            bg="linear-gradient(180deg, transparent, rgba(6,182,212,0.25), transparent)"
          />

          <VStack spacing={10} align="start" position="relative">
            {/* Logo */}
            <Link href="/">
              <HStack spacing={3} cursor="pointer">
                <Box
                  w={11}
                  h={11}
                  borderRadius="xl"
                  bg="linear-gradient(135deg, #06b6d4 0%, #8b5cf6 100%)"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  boxShadow="0 0 24px rgba(6,182,212,0.4)"
                  flexShrink={0}
                >
                  <FaTooth size={20} color="white" />
                </Box>
                <Text color="white" fontSize="xl" fontWeight="700" letterSpacing="-0.02em">
                  DentalCare
                </Text>
              </HStack>
            </Link>

            {/* Headline */}
            <VStack spacing={4} align="start">
              <Text
                fontSize="xs"
                fontWeight="700"
                color="cyan.400"
                letterSpacing="0.15em"
                textTransform="uppercase"
              >
                Welcome back
              </Text>
              <Text
                fontSize={{ lg: '3xl', xl: '4xl' }}
                fontWeight="800"
                color="white"
                lineHeight="1.1"
                letterSpacing="-0.03em"
              >
                Manage your{' '}
                <Box as="span" bgGradient="linear(135deg, cyan.400, violet.400)" bgClip="text">
                  dental clinic
                </Box>
                {' '}smarter
              </Text>
              <Text fontSize="sm" color="whiteAlpha.400" maxW="sm" lineHeight="1.8">
                The all-in-one platform built for Philippine dental professionals.
                Streamline operations, improve patient care.
              </Text>
            </VStack>

            {/* Feature list */}
            <VStack spacing={3} align="stretch" w="full">
              {features.map((f, i) => (
                <HStack
                  key={i}
                  spacing={3}
                  px={4}
                  py={3}
                  borderRadius="xl"
                  bg="rgba(255,255,255,0.03)"
                  border="1px solid rgba(255,255,255,0.06)"
                >
                  <Box
                    w={8}
                    h={8}
                    borderRadius="lg"
                    bg="rgba(6,182,212,0.1)"
                    border="1px solid rgba(6,182,212,0.2)"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    flexShrink={0}
                  >
                    <Icon as={f.icon} color="cyan.400" boxSize={4} />
                  </Box>
                  <Text fontSize="sm" color="whiteAlpha.600" fontWeight="500">
                    {f.label}
                  </Text>
                </HStack>
              ))}
            </VStack>

            {/* Star rating */}
            <HStack spacing={3}>
              <HStack spacing={1}>
                {[...Array(5)].map((_, i) => (
                  <Icon key={i} as={FiStar} color="amber.400" boxSize={3.5} />
                ))}
              </HStack>
              <Text fontSize="sm" color="whiteAlpha.400">
                <Text as="span" color="white" fontWeight="700">5.0</Text> from 200+ reviews
              </Text>
            </HStack>
          </VStack>
        </Box>
      )}

      {/* ── Right panel — form ── */}
      <Flex
        ref={rightRef}
        flex={1}
        alignItems="center"
        justifyContent="center"
        bg="navy.900"
        position="relative"
        px={{ base: 6, sm: 10 }}
        py={12}
        minH="100vh"
        style={{ opacity: 0, transform: 'translateX(40px)' }}
      >
        {/* Ambient glow top-right */}
        <Box
          position="absolute"
          top="-10%"
          right="-10%"
          w="400px"
          h="400px"
          borderRadius="full"
          bg="radial-gradient(circle, rgba(6,182,212,0.05) 0%, transparent 70%)"
          pointerEvents="none"
        />
        {/* Ambient glow bottom-left */}
        <Box
          position="absolute"
          bottom="-10%"
          left="-5%"
          w="300px"
          h="300px"
          borderRadius="full"
          bg="radial-gradient(circle, rgba(139,92,246,0.05) 0%, transparent 70%)"
          pointerEvents="none"
        />

        <Box w="full" maxW="420px" position="relative">
          {/* Mobile logo */}
          <Box display={{ base: 'block', lg: 'none' }} mb={10} textAlign="center">
            <Link href="/">
              <HStack spacing={3} cursor="pointer" justify="center">
                <Box
                  w={10}
                  h={10}
                  borderRadius="xl"
                  bg="linear-gradient(135deg, #06b6d4 0%, #8b5cf6 100%)"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  boxShadow="0 0 20px rgba(6,182,212,0.35)"
                >
                  <FaTooth size={18} color="white" />
                </Box>
                <Text fontSize="lg" fontWeight="700" color="white" letterSpacing="-0.02em">
                  DentalCare
                </Text>
              </HStack>
            </Link>
          </Box>

          {children}
        </Box>
      </Flex>
    </Flex>
  );
}
