'use client';

import React from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Grid,
  GridItem,
  Icon,
  HStack,
  Flex,
} from '@chakra-ui/react';
import {
  FiUsers,
  FiCalendar,
  FiActivity,
  FiDollarSign,
  FiPackage,
  FiBarChart,
  FiCheckCircle,
  FiShield,
  FiSmartphone,
} from 'react-icons/fi';
import { FaTooth } from 'react-icons/fa';
import Layout from './components/Layout';
import AnimatedHero from './components/landing/AnimatedHero';
import AnimatedFeatureCard from './components/landing/AnimatedFeatureCard';
import AnimatedStats from './components/landing/AnimatedStats';
import AnimatedCTA from './components/landing/AnimatedCTA';
import AnimatedSection from './components/landing/AnimatedSection';

export default function Home() {
  const features = [
    {
      icon: FiUsers,
      title: 'Patient Management',
      description: 'Complete electronic health records with demographic info, medical history, and document uploads. Instant access to full patient profiles.',
      color: 'cyan.500',
    },
    {
      icon: FiCalendar,
      title: 'Appointment Scheduling',
      description: 'Smart calendar system with automated reminders via SMS and email. Reduce no-shows and optimize your dentist\'s schedule.',
      color: 'violet.500',
    },
    {
      icon: FiActivity,
      title: 'Dental Charting',
      description: 'Interactive dental charts with treatment planning and comprehensive treatment history tracking in a visual, intuitive format.',
      color: 'emerald.500',
    },
    {
      icon: FiDollarSign,
      title: 'Billing & Payments',
      description: 'Streamlined invoicing with PhilHealth/HMO integration and multiple payment options including GCash, Maya, and credit cards.',
      color: 'amber.500',
    },
    {
      icon: FiPackage,
      title: 'Inventory Management',
      description: 'Track dental supplies with real-time low stock alerts and automated reorder notifications before you run out.',
      color: 'rose.500',
    },
    {
      icon: FiBarChart,
      title: 'Analytics & Reports',
      description: 'Comprehensive reports on revenue, appointments, patient demographics, and inventory trends to make data-driven decisions.',
      color: 'violet.500',
    },
  ];

  const benefits = [
    'Compliant with Philippine Data Privacy Act (RA 10173)',
    'Multi-language support (English / Tagalog)',
    'Role-based access control for all staff',
    'Cloud-based with automatic daily backups',
    'Mobile-responsive on any device',
    '24/7 dedicated customer support',
  ];

  const ctaFeatures = [
    'Free 30-day trial',
    'No setup fees',
    '24/7 support',
    'Easy data migration',
  ];

  return (
    <Layout>
      <Box bg="navy.900">
        {/* Hero */}
        <AnimatedHero
          title="Dental Management System"
          subtitle="Transform Your Practice with Modern Technology"
          description="Streamline your dental clinic operations with our comprehensive management system. Designed specifically for Philippine dental practices to improve patient care and operational efficiency."
          primaryButtonText="Get Started Free"
          primaryButtonLink="/register"
          secondaryButtonText="Watch Demo"
          secondaryButtonLink="#features"
          badgeText="Made for Philippine Dental Clinics"
        />

        {/* Stats */}
        <AnimatedStats />

        {/* Features Section */}
        <Box py={24} bg="navy.900" id="features" position="relative">
          {/* Top divider */}
          <Box
            position="absolute"
            top={0}
            left="10%"
            right="10%"
            h="1px"
            bg="linear-gradient(90deg, transparent, rgba(255,255,255,0.07), transparent)"
          />

          <Container maxW="7xl">
            <VStack spacing={16}>
              {/* Header */}
              <AnimatedSection>
                <VStack spacing={5} textAlign="center">
                  <Text
                    fontSize="xs"
                    fontWeight="700"
                    color="cyan.400"
                    letterSpacing="0.15em"
                    textTransform="uppercase"
                  >
                    Features
                  </Text>
                  <Heading
                    fontSize={{ base: '3xl', md: '5xl' }}
                    fontWeight="800"
                    color="white"
                    letterSpacing="-0.03em"
                    maxW="3xl"
                    textAlign="center"
                  >
                    Everything You Need to{' '}
                    <Box
                      as="span"
                      bgGradient="linear(135deg, cyan.400, violet.400)"
                      bgClip="text"
                    >
                      Run Your Clinic
                    </Box>
                  </Heading>
                  <Text fontSize="lg" color="whiteAlpha.500" maxW="2xl" lineHeight="1.8">
                    Our comprehensive system covers all aspects of dental clinic management,
                    from patient records to inventory tracking — built for Philippine dental practices.
                  </Text>
                </VStack>
              </AnimatedSection>

              {/* Feature Grid */}
              <Grid
                templateColumns={{ base: '1fr', md: 'repeat(2,1fr)', lg: 'repeat(3,1fr)' }}
                gap={6}
                w="full"
              >
                {features.map((feature, index) => (
                  <GridItem key={index}>
                    <AnimatedFeatureCard
                      icon={feature.icon}
                      title={feature.title}
                      description={feature.description}
                      index={index}
                      color={feature.color}
                    />
                  </GridItem>
                ))}
              </Grid>
            </VStack>
          </Container>
        </Box>

        {/* Benefits Section */}
        <Box py={24} bg="navy.900" position="relative">
          <Box
            position="absolute"
            inset={0}
            bg="radial-gradient(ellipse at 50% 50%, rgba(139,92,246,0.05) 0%, transparent 70%)"
            pointerEvents="none"
          />
          <Container maxW="7xl" position="relative">
            <AnimatedSection>
              <Grid
                templateColumns={{ base: '1fr', lg: '1fr 1fr' }}
                gap={16}
                alignItems="center"
              >
                {/* Left */}
                <GridItem>
                  <VStack spacing={8} align="start">
                    <VStack spacing={4} align="start">
                      <Text
                        fontSize="xs"
                        fontWeight="700"
                        color="violet.400"
                        letterSpacing="0.15em"
                        textTransform="uppercase"
                      >
                        Why DentalCare?
                      </Text>
                      <Heading
                        fontSize={{ base: '3xl', md: '4xl' }}
                        fontWeight="800"
                        color="white"
                        letterSpacing="-0.03em"
                        lineHeight="1.1"
                      >
                        Built for{' '}
                        <Box as="span" bgGradient="linear(135deg, violet.400, cyan.400)" bgClip="text">
                          Philippine
                        </Box>
                        {' '}Clinics
                      </Heading>
                      <Text fontSize="lg" color="whiteAlpha.500" lineHeight="1.8">
                        Designed from the ground up with local compliance, language support,
                        and Philippine payment methods.
                      </Text>
                    </VStack>

                    <VStack spacing={3} align="stretch" w="full">
                      {benefits.map((benefit, i) => (
                        <HStack
                          key={i}
                          spacing={4}
                          px={4}
                          py={3.5}
                          borderRadius="xl"
                          bg="rgba(255,255,255,0.04)"
                          border="1px solid rgba(255,255,255,0.07)"
                          backdropFilter="blur(8px)"
                          _hover={{
                            bg: 'rgba(255,255,255,0.07)',
                            borderColor: 'rgba(16,185,129,0.3)',
                          }}
                          transition="all 0.2s"
                        >
                          <Box
                            w={7}
                            h={7}
                            borderRadius="full"
                            bg="rgba(16,185,129,0.12)"
                            border="1px solid rgba(16,185,129,0.3)"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            flexShrink={0}
                          >
                            <Icon as={FiCheckCircle} color="emerald.400" boxSize={4} />
                          </Box>
                          <Text fontSize="sm" color="whiteAlpha.700" fontWeight="500">
                            {benefit}
                          </Text>
                        </HStack>
                      ))}
                    </VStack>
                  </VStack>
                </GridItem>

                {/* Right */}
                <GridItem>
                  <VStack spacing={5}>
                    {[
                      {
                        icon: FiShield,
                        color: 'cyan',
                        title: 'Secure & PDPA Compliant',
                        desc: 'Enterprise-grade encryption protecting all patient data, fully compliant with the Philippine Data Privacy Act.',
                      },
                      {
                        icon: FiSmartphone,
                        color: 'violet',
                        title: 'Works on Any Device',
                        desc: 'Fully responsive on desktop, tablet, and mobile — manage your clinic from anywhere, anytime.',
                      },
                    ].map((card, i) => (
                      <Box
                        key={i}
                        p={7}
                        bg="rgba(15,22,41,0.5)"
                        border="1px solid rgba(255,255,255,0.07)"
                        borderRadius="2xl"
                        backdropFilter="blur(16px)"
                        w="full"
                        _hover={{
                          border: `1px solid rgba(${i === 0 ? '6,182,212' : '139,92,246'},0.25)`,
                          transform: 'translateY(-4px)',
                          boxShadow: `0 20px 50px rgba(${i === 0 ? '6,182,212' : '139,92,246'},0.15)`,
                        }}
                        transition="all 0.3s ease"
                        position="relative"
                        overflow="hidden"
                        _before={{
                          content: '""',
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          h: '2px',
                          bgGradient: `linear(90deg, ${card.color}.600, ${card.color}.400)`,
                          borderTopRadius: '2xl',
                        }}
                      >
                        <HStack spacing={5} align="start">
                          <Box
                            p={3}
                            borderRadius="xl"
                            bg={`rgba(${i === 0 ? '6,182,212' : '139,92,246'},0.1)`}
                            border="1px solid"
                            borderColor={`${card.color}.800`}
                            flexShrink={0}
                          >
                            <Icon as={card.icon} boxSize={6} color={`${card.color}.400`} />
                          </Box>
                          <Box>
                            <Heading
                              as="h3"
                              fontSize="lg"
                              fontWeight="700"
                              color="white"
                              mb={2}
                              letterSpacing="-0.02em"
                            >
                              {card.title}
                            </Heading>
                            <Text color="whiteAlpha.500" fontSize="sm" lineHeight="1.7">
                              {card.desc}
                            </Text>
                          </Box>
                        </HStack>
                      </Box>
                    ))}
                  </VStack>
                </GridItem>
              </Grid>
            </AnimatedSection>
          </Container>
        </Box>

        {/* CTA */}
        <AnimatedCTA
          title="Ready to Transform Your Dental Practice?"
          subtitle="Join hundreds of Philippine dental clinics already using our system to improve patient care and streamline clinic operations."
          primaryButtonText="Start Free Trial"
          primaryButtonLink="/register"
          secondaryButtonText="Schedule Demo"
          secondaryButtonLink="/login"
          features={ctaFeatures}
        />

        {/* Footer */}
        <Box py={14} bg="navy.950" borderTop="1px solid rgba(255,255,255,0.05)">
          <Container maxW="7xl">
            <Flex
              justify="space-between"
              align="center"
              wrap="wrap"
              gap={8}
            >
              <VStack align="start" spacing={3}>
                <HStack spacing={3}>
                  <Box
                    w={9}
                    h={9}
                    borderRadius="xl"
                    bg="linear-gradient(135deg, #06b6d4 0%, #8b5cf6 100%)"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <FaTooth size={16} color="white" />
                  </Box>
                  <Text color="white" fontSize="lg" fontWeight="700" letterSpacing="-0.02em">
                    DentalCare
                  </Text>
                </HStack>
                <Text fontSize="sm" color="whiteAlpha.400" maxW="xs" lineHeight="1.8">
                  Empowering Philippine dental clinics with modern technology
                  and comprehensive practice management solutions.
                </Text>
              </VStack>

              <VStack align="end" spacing={3}>
                <Text fontSize="sm" color="whiteAlpha.300">
                  © 2025 DentalCare. All rights reserved.
                </Text>
                <HStack spacing={6}>
                  {['Privacy Policy', 'Terms of Service', 'Support'].map((l) => (
                    <Text
                      key={l}
                      fontSize="sm"
                      color="whiteAlpha.300"
                      cursor="pointer"
                      _hover={{ color: 'cyan.400' }}
                      transition="color 0.2s"
                    >
                      {l}
                    </Text>
                  ))}
                </HStack>
              </VStack>
            </Flex>
          </Container>
        </Box>
      </Box>
    </Layout>
  );
}
