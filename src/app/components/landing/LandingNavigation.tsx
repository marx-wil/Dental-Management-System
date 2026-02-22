'use client';

import React, { useRef, useEffect, useState } from 'react';
import {
  Box,
  Flex,
  HStack,
  Text,
  Button,
  IconButton,
  useDisclosure,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  DrawerCloseButton,
  DrawerBody,
  VStack,
} from '@chakra-ui/react';
import { FiMenu } from 'react-icons/fi';
import { FaTooth } from 'react-icons/fa';
import Link from 'next/link';
import { gsap } from 'gsap';

export default function LandingNavigation() {
  const navRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!navRef.current) return;

    // Use gsap.to() — element starts hidden via inline style on the Box,
    // so ctx.revert() correctly restores the hidden state in Strict Mode
    const ctx = gsap.context(() => {
      gsap.to(navRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.15,
        clearProps: 'transform', // clean up inline transform after animation
      });
    }, navRef);

    return () => ctx.revert();
  }, []);

  const navLinks = [
    { label: 'Features', href: '#features' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'About', href: '#about' },
  ];

  return (
    <Box
      ref={navRef}
      as="nav"
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex={1000}
      px={{ base: 4, md: 8 }}
      py={4}
      transition="background 0.4s ease, border-color 0.4s ease, backdrop-filter 0.4s ease"
      bg={scrolled ? 'rgba(8, 13, 26, 0.90)' : 'rgba(8, 13, 26, 0.4)'}
      backdropFilter="blur(16px)"
      borderBottom="1px solid"
      borderColor={scrolled ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.03)'}
      style={{ opacity: 0, transform: 'translateY(-80px)' }}
    >

      <Flex maxW="7xl" mx="auto" align="center" justify="space-between">
        {/* Logo */}
        <Link href="/">
          <HStack spacing={3} cursor="pointer">
            <Box
              w={9}
              h={9}
              borderRadius="xl"
              bg="linear-gradient(135deg, #06b6d4 0%, #8b5cf6 100%)"
              display="flex"
              alignItems="center"
              justifyContent="center"
              boxShadow="0 0 20px rgba(6,182,212,0.4)"
              flexShrink={0}
            >
              <FaTooth size={16} color="white" />
            </Box>
            <Text
              fontSize="lg"
              fontWeight="700"
              color="white"
              letterSpacing="-0.02em"
            >
              DentalCare
            </Text>
          </HStack>
        </Link>

        {/* Desktop Nav Links */}
        <HStack spacing={8} display={{ base: 'none', md: 'flex' }}>
          {navLinks.map((link) => (
            <Link key={link.label} href={link.href}>
              <Text
                fontSize="sm"
                fontWeight="500"
                color="whiteAlpha.700"
                cursor="pointer"
                transition="color 0.2s"
                _hover={{ color: 'white' }}
              >
                {link.label}
              </Text>
            </Link>
          ))}
        </HStack>

        {/* CTA Buttons */}
        <HStack spacing={3} display={{ base: 'none', md: 'flex' }}>
          <Link href="/login">
            <Button
              size="sm"
              variant="ghost"
              color="whiteAlpha.800"
              _hover={{ bg: 'whiteAlpha.100', color: 'white' }}
              borderRadius="xl"
            >
              Sign in
            </Button>
          </Link>
          <Link href="/register">
            <Button
              size="sm"
              bg="linear-gradient(135deg, #06b6d4 0%, #8b5cf6 100%)"
              color="white"
              borderRadius="xl"
              fontWeight="600"
              px={5}
              _hover={{
                opacity: 0.9,
                transform: 'translateY(-1px)',
                boxShadow: '0 8px 24px rgba(6,182,212,0.35)',
              }}
              transition="all 0.25s ease"
            >
              Get Started
            </Button>
          </Link>
        </HStack>

        {/* Mobile Hamburger */}
        <IconButton
          aria-label="Open menu"
          icon={<FiMenu size={20} />}
          display={{ base: 'flex', md: 'none' }}
          variant="ghost"
          color="white"
          _hover={{ bg: 'whiteAlpha.100' }}
          onClick={onOpen}
        />
      </Flex>

      {/* Mobile Drawer */}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay backdropFilter="blur(8px)" bg="blackAlpha.700" />
        <DrawerContent bg="navy.900" border="none" maxW="280px">
          <DrawerCloseButton color="white" mt={2} />
          <DrawerBody pt={16} px={6}>
            <VStack spacing={2} align="stretch">
              {navLinks.map((link) => (
                <Link key={link.label} href={link.href}>
                  <Box
                    py={3}
                    px={4}
                    borderRadius="xl"
                    cursor="pointer"
                    onClick={onClose}
                    _hover={{ bg: 'whiteAlpha.100' }}
                    transition="all 0.2s"
                  >
                    <Text color="whiteAlpha.900" fontWeight="500" fontSize="md">
                      {link.label}
                    </Text>
                  </Box>
                </Link>
              ))}
              <Box mt={4}>
                <Link href="/login">
                  <Button
                    w="full"
                    variant="outline"
                    borderColor="whiteAlpha.200"
                    color="white"
                    borderRadius="xl"
                    mb={3}
                    onClick={onClose}
                    _hover={{ bg: 'whiteAlpha.100' }}
                  >
                    Sign in
                  </Button>
                </Link>
                <Link href="/register">
                  <Button
                    w="full"
                    bg="linear-gradient(135deg, #06b6d4 0%, #8b5cf6 100%)"
                    color="white"
                    borderRadius="xl"
                    onClick={onClose}
                    _hover={{ opacity: 0.9 }}
                  >
                    Get Started
                  </Button>
                </Link>
              </Box>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}
