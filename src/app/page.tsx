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
  FiShield,
  FiSmartphone,
  FiGlobe,
  FiCheckCircle,
  FiHeart,
  FiTrendingUp,
  FiClock,
  FiAward,
} from 'react-icons/fi';
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
      description: 'Complete electronic health records with demographic info, medical history, and document uploads.',
      color: 'dental.500',
    },
    {
      icon: FiCalendar,
      title: 'Appointment Scheduling',
      description: 'Smart calendar system with automated reminders via SMS and email for better patient engagement.',
      color: 'brand.500',
    },
    {
      icon: FiActivity,
      title: 'Dental Charting',
      description: 'Interactive dental charts with treatment planning and comprehensive treatment history tracking.',
      color: 'accent.500',
    },
    {
      icon: FiDollarSign,
      title: 'Billing & Payments',
      description: 'Streamlined invoicing with PhilHealth/HMO integration and multiple payment options including GCash.',
      color: 'success.500',
    },
    {
      icon: FiPackage,
      title: 'Inventory Management',
      description: 'Track dental supplies with low stock alerts and automated reorder reports.',
      color: 'orange.500',
    },
    {
      icon: FiBarChart,
      title: 'Analytics & Reports',
      description: 'Comprehensive reports on revenue, appointments, patient demographics, and inventory trends.',
      color: 'purple.500',
    },
  ];

  const benefits = [
    'Compliant with Philippine Data Privacy Act (RA 10173)',
    'Multi-language support (English/Tagalog)',
    'Role-based access control',
    'Cloud-based with daily backups',
    'Mobile-responsive design',
    '24/7 customer support',
  ];

  const ctaFeatures = [
    'Free 30-day trial',
    'No setup fees',
    '24/7 support',
    'Easy migration',
  ];

  return (
    <Layout>
      <Box>
        {/* Hero Section */}
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

        {/* Stats Section */}
        <AnimatedStats />

        {/* Features Section */}
        <AnimatedSection>
          <Box py={20} id="features">
            <Container maxW="6xl">
              <VStack spacing={16}>
                <VStack spacing={6} textAlign="center">
                  <Heading size="3xl" color="gray.800">
                    Everything You Need to Manage Your Clinic
                  </Heading>
                  <Text fontSize="xl" color="gray.600" maxW="3xl" lineHeight="tall">
                    Our comprehensive system covers all aspects of dental clinic management, 
                    from patient records to inventory tracking. Built with modern technology 
                    and designed for Philippine dental practices.
                  </Text>
                </VStack>
                
                <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }} gap={8}>
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
        </AnimatedSection>

        {/* Benefits Section */}
        <AnimatedSection direction="left">
          <Box py={20} bg="gray.50" position="relative" overflow="hidden">
            {/* Background Pattern */}
            <Box
              position="absolute"
              top={0}
              left={0}
              right={0}
              bottom={0}
              opacity={0.03}
              _before={{
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'radial-gradient(circle at 20% 20%, dental.400 0%, transparent 50%), radial-gradient(circle at 80% 80%, brand.400 0%, transparent 50%)',
              }}
            />

            <Container maxW="6xl" position="relative" zIndex={1}>
              <Grid templateColumns={{ base: '1fr', lg: '1fr 1fr' }} gap={16} alignItems="center">
                <GridItem>
                  <VStack spacing={8} align="start">
                    <VStack spacing={4} align="start">
                      <Heading size="3xl" color="gray.800">
                        Why Choose Our DMS?
                      </Heading>
                      <Text fontSize="xl" color="gray.600" lineHeight="tall">
                        Built specifically for Philippine dental clinics with local compliance, 
                        language support, and payment methods in mind.
                      </Text>
                    </VStack>
                    
                    <VStack spacing={4} align="stretch" w="full">
                      {benefits.map((benefit, index) => (
                        <HStack key={index} spacing={4} p={4} bg="white" borderRadius="xl" boxShadow="sm">
                          <Icon as={FiCheckCircle} color="success.500" boxSize={6} />
                          <Text fontSize="lg" fontWeight="medium" color="gray.700">
                            {benefit}
                          </Text>
                        </HStack>
                      ))}
                    </VStack>
                  </VStack>
                </GridItem>
                
                <GridItem>
                  <VStack spacing={8}>
                    <Box
                      p={8}
                      bg="white"
                      borderRadius="2xl"
                      boxShadow="xl"
                      border="1px solid"
                      borderColor="gray.100"
                      textAlign="center"
                    >
                      <VStack spacing={6}>
                        <Box
                          p={6}
                          borderRadius="xl"
                          bg="dental.50"
                          display="inline-flex"
                          alignItems="center"
                          justifyContent="center"
                        >
                          <Icon as={FiShield} boxSize={12} color="dental.500" />
                        </Box>
                        <Heading size="lg" color="gray.800">
                          Secure & Compliant
                        </Heading>
                        <Text color="gray.600" lineHeight="tall">
                          Your patient data is protected with enterprise-grade encryption and 
                          complies with Philippine Data Privacy Act requirements.
                        </Text>
                      </VStack>
                    </Box>
                    
                    <Box
                      p={8}
                      bg="white"
                      borderRadius="2xl"
                      boxShadow="xl"
                      border="1px solid"
                      borderColor="gray.100"
                      textAlign="center"
                    >
                      <VStack spacing={6}>
                        <Box
                          p={6}
                          borderRadius="xl"
                          bg="brand.50"
                          display="inline-flex"
                          alignItems="center"
                          justifyContent="center"
                        >
                          <Icon as={FiSmartphone} boxSize={12} color="brand.500" />
                        </Box>
                        <Heading size="lg" color="gray.800">
                          Mobile Ready
                        </Heading>
                        <Text color="gray.600" lineHeight="tall">
                          Access your clinic management system from any device, 
                          anywhere with our responsive design and mobile app.
                        </Text>
                      </VStack>
                    </Box>
                  </VStack>
                </GridItem>
              </Grid>
            </Container>
          </Box>
        </AnimatedSection>

        {/* CTA Section */}
        <AnimatedCTA
          title="Ready to Transform Your Dental Practice?"
          subtitle="Join hundreds of Philippine dental clinics already using our system to improve patient care and streamline operations."
          primaryButtonText="Start Free Trial"
          primaryButtonLink="/register"
          secondaryButtonText="Schedule Demo"
          secondaryButtonLink="/login"
          features={ctaFeatures}
        />

        {/* Footer */}
        <AnimatedSection>
          <Box py={12} bg="gray.800" color="white">
            <Container maxW="6xl">
              <Flex justify="space-between" align="center" wrap="wrap" gap={8}>
                <VStack align="start" spacing={3}>
                  <Heading size="lg" color="dental.300">
                    Dental Management System
                  </Heading>
                  <Text fontSize="md" opacity={0.8} maxW="md">
                    Empowering Philippine dental clinics with modern technology and 
                    comprehensive practice management solutions.
                  </Text>
                </VStack>
                <VStack align="end" spacing={2}>
                  <Text fontSize="sm" opacity={0.8}>
                    © 2024 DMS. All rights reserved.
                  </Text>
                  <HStack spacing={6} fontSize="sm" opacity={0.7}>
                    <Text>Privacy Policy</Text>
                    <Text>Terms of Service</Text>
                    <Text>Support</Text>
                  </HStack>
                </VStack>
              </Flex>
            </Container>
          </Box>
        </AnimatedSection>
      </Box>
    </Layout>
  );
}