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
  Flex,
  Circle,
  Progress,
  Divider
} from '@chakra-ui/react';
import { 
  FiArrowRight, 
  FiPlay, 
  FiUsers, 
  FiFileText, 
  FiThumbsUp,
  FiStar,
  FiCheck,
  FiPlus,
  FiBarChart,
  FiClock,
  FiUser,
  FiSettings
} from 'react-icons/fi';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';

// Register GSAP plugins
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
  const backgroundRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const socialProofRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current) return;

    const ctx = gsap.context(() => {
      // Initial state - elements start hidden/transformed
      gsap.set([titleRef.current, descriptionRef.current, buttonsRef.current, badgeRef.current, featuresRef.current, socialProofRef.current], {
        opacity: 0,
        y: 50,
      });

      gsap.set(backgroundRef.current, {
        scale: 1.1,
        opacity: 0,
      });

      // Create timeline for hero animation
      const tl = gsap.timeline({ delay: 0.5 });

      // Animate background first
      tl.to(backgroundRef.current, {
        scale: 1,
        opacity: 1,
        duration: 1.5,
        ease: "power2.out",
      });

      // Animate badge
      tl.to(badgeRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "back.out(1.7)",
      }, "-=1");

      // Animate title
      tl.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
      }, "-=0.6");

      // Animate description
      tl.to(descriptionRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
      }, "-=0.4");

      // Animate features with stagger
      tl.to(featuresRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
      }, "-=0.3");

      // Animate individual feature icons with stagger
      if (featuresRef.current) {
        const featureIcons = featuresRef.current.querySelectorAll('.feature-icon');
        gsap.set(featureIcons, { opacity: 0, scale: 0.8, rotation: -10 });
        
        tl.to(featureIcons, {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 0.6,
          ease: "back.out(1.7)",
          stagger: 0.1,
        }, "-=0.5");
      }

      // Animate buttons with stagger
      tl.to(buttonsRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "back.out(1.7)",
      }, "-=0.2");

      // Animate social proof
      tl.to(socialProofRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
      }, "-=0.1");

      // Animate dashboard cards with stagger
      if (heroRef.current) {
        const dashboardCards = heroRef.current.querySelectorAll('[data-dashboard-card]');
        gsap.set(dashboardCards, { opacity: 0, y: 30, scale: 0.9 });
        
        tl.to(dashboardCards, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "back.out(1.7)",
          stagger: 0.2,
        }, "-=0.4");
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
      bg="gray.50"
    >
      {/* Animated Background */}
      <Box
        ref={backgroundRef}
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        bgGradient="linear(135deg, purple.50 0%, blue.50 50%, purple.100 100%)"
        _before={{
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 20% 20%, rgba(147, 51, 234, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)',
        }}
      />

      <Container maxW="7xl" position="relative" zIndex={1}>
        <Grid templateColumns={{ base: '1fr', lg: '1fr 1fr' }} gap={16} alignItems="center">
          {/* Left Column - Text Content */}
          <GridItem>
            <VStack spacing={8} align="start" textAlign="left">
              <Badge
                ref={badgeRef}
                colorScheme="purple"
                fontSize="sm"
                px={4}
                py={2}
                borderRadius="full"
                bg="white"
                color="purple.600"
                boxShadow="lg"
                border="1px solid"
                borderColor="purple.100"
              >
                {badgeText}
              </Badge>

              <Heading
                ref={titleRef}
                as="h1"
                size="4xl"
                color="gray.900"
                fontWeight="bold"
                lineHeight="shorter"
                maxW="2xl"
              >
                {title}
              </Heading>

              <Text
                ref={descriptionRef}
                fontSize="xl"
                color="gray.600"
                maxW="2xl"
                lineHeight="tall"
              >
                {description}
              </Text>

              {/* Feature Icons */}
              <HStack ref={featuresRef} spacing={8} pt={4} flexWrap="wrap">
                <HStack spacing={3} className="feature-icon">
                  <Circle size="12" bg="dental.100" color="dental.600">
                    <Icon as={FiUsers} boxSize={6} />
                  </Circle>
                  <Text fontSize="sm" fontWeight="medium" color="gray.700">
                    Manage patients efficiently
                  </Text>
                </HStack>
                <HStack spacing={3} className="feature-icon">
                  <Circle size="12" bg="brand.100" color="brand.600">
                    <Icon as={FiFileText} boxSize={6} />
                  </Circle>
                  <Text fontSize="sm" fontWeight="medium" color="gray.700">
                    Keep records organized
                  </Text>
                </HStack>
                <HStack spacing={3} className="feature-icon">
                  <Circle size="12" bg="green.100" color="green.600">
                    <Icon as={FiThumbsUp} boxSize={6} />
                  </Circle>
                  <Text fontSize="sm" fontWeight="medium" color="gray.700">
                    Improve patient care
                  </Text>
                </HStack>
              </HStack>

              <HStack
                ref={buttonsRef}
                spacing={4}
                pt={6}
                flexWrap="wrap"
              >
                <Link href={primaryButtonLink}>
                  <Button
                    size="lg"
                    bg="dental.500"
                    color="white"
                    rightIcon={<FiArrowRight />}
                    px={8}
                    py={6}
                    fontSize="lg"
                    fontWeight="semibold"
                    borderRadius="xl"
                    boxShadow="xl"
                    _hover={{
                      bg: 'dental.600',
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
                    borderColor="dental.200"
                    color="dental.600"
                    leftIcon={<FiPlay />}
                    px={8}
                    py={6}
                    fontSize="lg"
                    fontWeight="semibold"
                    borderRadius="xl"
                    borderWidth="2px"
                    _hover={{
                      bg: 'dental.50',
                      transform: 'translateY(-2px)',
                    }}
                    transition="all 0.3s ease"
                  >
                    {secondaryButtonText}
                  </Button>
                </Link>
              </HStack>

              {/* Social Proof */}
              <HStack ref={socialProofRef} spacing={4} pt={4}>
                <HStack spacing={1}>
                  {[...Array(5)].map((_, i) => (
                    <Icon key={i} as={FiStar} color="yellow.400" boxSize={4} />
                  ))}
                </HStack>
                <Text fontSize="sm" fontWeight="bold" color="gray.700">
                  5-STAR RATING
                </Text>
              </HStack>
            </VStack>
          </GridItem>

          {/* Right Column - Dashboard Mockups */}
          <GridItem>
            <Box position="relative" h="600px">
              {/* Main Dashboard Card */}
              <Box
                ref={backgroundRef}
                position="absolute"
                top={0}
                right={0}
                w="400px"
                bg="white"
                borderRadius="2xl"
                boxShadow="2xl"
                p={6}
                border="1px solid"
                borderColor="gray.100"
                data-dashboard-card
              >
                <VStack spacing={6} align="stretch">
                  {/* Header */}
                  <HStack justify="space-between" align="center">
                    <HStack spacing={3}>
                      <Circle size="8" bg="gray.100">
                        <Icon as={FiBarChart} color="gray.600" />
                      </Circle>
                      <Circle size="8" bg="gray.100">
                        <Icon as={FiClock} color="gray.600" />
                      </Circle>
                      <Circle size="8" bg="gray.100">
                        <Icon as={FiFileText} color="gray.600" />
                      </Circle>
                      <Circle size="8" bg="gray.100">
                        <Icon as={FiUser} color="gray.600" />
                      </Circle>
                    </HStack>
                    <Avatar size="sm" name="Dr. Smith" bg="yellow.400" />
                  </HStack>

                  {/* Stats */}
                  <VStack spacing={3} align="stretch">
                    <HStack justify="space-between">
                      <Text fontSize="sm" color="gray.500">Active Patients</Text>
                      <Text fontSize="lg" fontWeight="bold" color="gray.900">1,247</Text>
                    </HStack>
                    <HStack justify="space-between">
                      <Text fontSize="sm" color="gray.500">Appointments Today</Text>
                      <Text fontSize="lg" fontWeight="bold" color="gray.900">23</Text>
                    </HStack>
                    <HStack justify="space-between">
                      <Text fontSize="sm" color="gray.500">Monthly Revenue</Text>
                      <Text fontSize="lg" fontWeight="bold" color="gray.900">₱2.4M</Text>
                    </HStack>
                  </VStack>

                  {/* Chart Placeholder */}
                  <Box>
                    <Text fontSize="sm" fontWeight="semibold" color="gray.700" mb={3}>
                      Patient Demographics
                    </Text>
                    <Box h="120px" bg="gray.50" borderRadius="lg" p={4}>
                      <HStack spacing={4} h="full">
                        <VStack spacing={2} flex={1}>
                          <Box w="full" h="60px" bg="dental.400" borderRadius="md" />
                          <Text fontSize="xs" color="gray.500">Adults</Text>
                        </VStack>
                        <VStack spacing={2} flex={1}>
                          <Box w="full" h="40px" bg="brand.400" borderRadius="md" />
                          <Text fontSize="xs" color="gray.500">Children</Text>
                        </VStack>
                        <VStack spacing={2} flex={1}>
                          <Box w="full" h="80px" bg="green.400" borderRadius="md" />
                          <Text fontSize="xs" color="gray.500">Seniors</Text>
                        </VStack>
                      </HStack>
                    </Box>
                  </Box>

                  {/* Action Buttons */}
                  <HStack spacing={3}>
                    <Button size="sm" bg="dental.500" color="white" leftIcon={<FiPlus />}>
                      New Patient
                    </Button>
                    <Button size="sm" variant="outline" borderColor="dental.200" color="dental.600">
                      Schedule
                    </Button>
                    <Button size="sm" variant="outline" borderColor="dental.200" color="dental.600">
                      Reports
                    </Button>
                  </HStack>
                </VStack>
              </Box>

              {/* Top Patients Card */}
              <Box
                position="absolute"
                bottom={20}
                right={20}
                w="300px"
                bg="white"
                borderRadius="xl"
                boxShadow="xl"
                p={5}
                border="1px solid"
                borderColor="gray.100"
                data-dashboard-card
              >
                <VStack spacing={4} align="stretch">
                  <Text fontSize="sm" fontWeight="semibold" color="gray.700">
                    Recent Patients
                  </Text>
                  
                  <VStack spacing={3} align="stretch">
                    <HStack spacing={3}>
                      <Avatar size="sm" name="Maria Santos" bg="blue.400" />
                      <VStack spacing={0} align="start" flex={1}>
                        <Text fontSize="sm" fontWeight="medium" color="gray.900">Maria Santos</Text>
                        <Text fontSize="xs" color="gray.500">Regular Checkup</Text>
                      </VStack>
                      <Badge colorScheme="green" size="sm">Completed</Badge>
                    </HStack>
                    
                    <HStack spacing={3}>
                      <Avatar size="sm" name="Juan Cruz" bg="green.400" />
                      <VStack spacing={0} align="start" flex={1}>
                        <Text fontSize="sm" fontWeight="medium" color="gray.900">Juan Cruz</Text>
                        <Text fontSize="xs" color="gray.500">Dental Cleaning</Text>
                      </VStack>
                      <Badge colorScheme="blue" size="sm">Scheduled</Badge>
                    </HStack>
                  </VStack>
                </VStack>
              </Box>

              {/* Appointment Card */}
              <Box
                position="absolute"
                bottom={0}
                left={0}
                w="250px"
                bg="white"
                borderRadius="xl"
                boxShadow="xl"
                p={5}
                border="1px solid"
                borderColor="gray.100"
                data-dashboard-card
              >
                <VStack spacing={4} align="stretch">
                  <HStack justify="space-between" align="center">
                    <Text fontSize="sm" fontWeight="semibold" color="gray.700">
                      Today&apos;s Schedule
                    </Text>
                    <Button size="xs" bg="dental.500" color="white" leftIcon={<FiPlus />}>
                      Add
                    </Button>
                  </HStack>
                  
                  <VStack spacing={2} align="stretch">
                    <HStack spacing={2}>
                      <Circle size="2" bg="dental.400" />
                      <Text fontSize="xs" color="gray.600">9:00 AM - Maria Santos</Text>
                    </HStack>
                    <HStack spacing={2}>
                      <Circle size="2" bg="brand.400" />
                      <Text fontSize="xs" color="gray.600">10:30 AM - Juan Cruz</Text>
                    </HStack>
                    <HStack spacing={2}>
                      <Circle size="2" bg="green.400" />
                      <Text fontSize="xs" color="gray.600">2:00 PM - Ana Reyes</Text>
                    </HStack>
                  </VStack>
                </VStack>
              </Box>
            </Box>
          </GridItem>
        </Grid>
      </Container>
    </Box>
  );
}
