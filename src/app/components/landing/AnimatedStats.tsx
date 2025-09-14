'use client';

import React, { useRef, useEffect } from 'react';
import { Box, Container, Grid, GridItem, VStack, HStack, Text, Heading, Icon } from '@chakra-ui/react';
import { FiUsers, FiCalendar, FiDollarSign, FiShield } from 'react-icons/fi';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface StatItem {
  icon: React.ElementType;
  value: string;
  label: string;
  color: string;
}

const stats: StatItem[] = [
  {
    icon: FiUsers,
    value: '500+',
    label: 'Active Clinics',
    color: 'dental.500',
  },
  {
    icon: FiCalendar,
    value: '50K+',
    label: 'Appointments Monthly',
    color: 'brand.500',
  },
  {
    icon: FiDollarSign,
    value: '₱2M+',
    label: 'Revenue Processed',
    color: 'green.500',
  },
  {
    icon: FiShield,
    value: '99.9%',
    label: 'Uptime Guarantee',
    color: 'purple.500',
  },
];

export default function AnimatedStats() {
  const containerRef = useRef<HTMLDivElement>(null);
  const statRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Initial state
      gsap.set(statRefs.current, {
        opacity: 0,
        y: 50,
        scale: 0.8,
      });

      // Create scroll trigger animation
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top 70%',
        end: 'bottom 30%',
        onEnter: () => {
          gsap.to(statRefs.current, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: 'back.out(1.7)',
            stagger: 0.2,
          });

          // Animate numbers
          statRefs.current.forEach((ref, index) => {
            if (ref) {
              const numberElement = ref.querySelector('.stat-number');
              if (numberElement) {
                const finalValue = stats[index].value;
                const isNumber = /^\d+/.test(finalValue);
                
                if (isNumber) {
                  const numericValue = parseInt(finalValue.replace(/[^\d]/g, ''));
                  gsap.fromTo(numberElement, 
                    { textContent: 0 },
                    {
                      textContent: numericValue,
                      duration: 2,
                      ease: 'power2.out',
                      snap: { textContent: 1 },
                      onUpdate: function() {
                        const currentValue = Math.round(this.targets()[0].textContent);
                        if (finalValue.includes('K')) {
                          numberElement.textContent = `${currentValue}K+`;
                        } else if (finalValue.includes('M')) {
                          numberElement.textContent = `₱${currentValue}M+`;
                        } else if (finalValue.includes('%')) {
                          numberElement.textContent = `${currentValue}%`;
                        } else {
                          numberElement.textContent = `${currentValue}+`;
                        }
                      }
                    }
                  );
                }
              }
            }
          });
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <Box py={20} bg="gray.50" position="relative" overflow="hidden">
      {/* Background Pattern */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        opacity={0.05}
        _before={{
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 25% 25%, dental.300 0%, transparent 50%), radial-gradient(circle at 75% 75%, brand.300 0%, transparent 50%)',
        }}
      />

      <Container maxW="6xl" position="relative" zIndex={1}>
        <VStack spacing={12}>
          <VStack spacing={4} textAlign="center">
            <Heading size="2xl" color="gray.800">
              Trusted by Dental Professionals
            </Heading>
            <Text fontSize="lg" color="gray.600" maxW="2xl">
              Join hundreds of dental clinics across the Philippines who trust our system
              to manage their practice efficiently and securely.
            </Text>
          </VStack>

          <Grid
            ref={containerRef}
            templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }}
            gap={8}
            w="full"
          >
            {stats.map((stat, index) => (
              <GridItem key={index}>
                <Box
                  ref={(el) => (statRefs.current[index] = el)}
                  p={8}
                  bg="white"
                  borderRadius="2xl"
                  boxShadow="xl"
                  textAlign="center"
                  border="1px solid"
                  borderColor="gray.100"
                  position="relative"
                  overflow="hidden"
                  _before={{
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '4px',
                    bg: stat.color,
                  }}
                >
                  <VStack spacing={4}>
                    <Box
                      p={4}
                      borderRadius="xl"
                      bg={`${stat.color.replace('500', '50')}`}
                      display="inline-flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Icon as={stat.icon} boxSize={8} color={stat.color} />
                    </Box>
                    
                    <Heading
                      size="3xl"
                      color="gray.800"
                      fontWeight="bold"
                      className="stat-number"
                    >
                      {stat.value}
                    </Heading>
                    
                    <Text
                      fontSize="lg"
                      color="gray.600"
                      fontWeight="medium"
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
