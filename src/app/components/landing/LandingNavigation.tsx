'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Flex,
  HStack,
  VStack,
  Text,
  IconButton,
  Button,
  useDisclosure,
  useColorModeValue,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Container,
} from '@chakra-ui/react';
import {
  HamburgerIcon,
  CloseIcon,
} from '@chakra-ui/icons';
import {
  FiHome,
  FiUsers,
  FiCalendar,
  FiActivity,
  FiDollarSign,
  FiLogIn,
  FiUserPlus,
} from 'react-icons/fi';
import Link from 'next/link';
import { gsap } from 'gsap';

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
}

const navItems: NavItem[] = [
  { label: 'Home', href: '#', icon: FiHome },
  { label: 'Features', href: '#features', icon: FiActivity },
  { label: 'Pricing', href: '#pricing', icon: FiDollarSign },
  { label: 'About', href: '#about', icon: FiUsers },
  { label: 'Contact', href: '#contact', icon: FiCalendar },
];

export default function LandingNavigation() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isScrolled, setIsScrolled] = useState(false);
  const navRef = React.useRef<HTMLDivElement>(null);

  const bg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const textColor = useColorModeValue('gray.800', 'white');

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // GSAP animation for nav entrance
  useEffect(() => {
    if (navRef.current) {
      gsap.fromTo(
        navRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }
      );
    }
  }, []);

  // Handle smooth scrolling to sections
  const handleSmoothScroll = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <Box
        ref={navRef}
        position="fixed"
        top={0}
        left={0}
        right={0}
        zIndex={1000}
        bg={isScrolled ? bg : 'transparent'}
        borderBottom={isScrolled ? '1px' : 'none'}
        borderColor={borderColor}
        backdropFilter={isScrolled ? 'blur(10px)' : 'none'}
        transition="all 0.3s ease"
      >
        <Container maxW="7xl">
          <Flex h={16} alignItems="center" justifyContent="space-between">
            {/* Logo */}
            <Link href="/">
              <HStack spacing={3} cursor="pointer">
                <Box
                  p={2}
                  borderRadius="lg"
                  bg="dental.500"
                  color="white"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <FiActivity size={20} />
                </Box>
                <VStack spacing={0} align="start">
                  <Text fontSize="lg" fontWeight="bold" color={textColor}>
                    DMS
                  </Text>
                  <Text fontSize="xs" color="gray.500" fontWeight="medium">
                    Dental Management
                  </Text>
                </VStack>
              </HStack>
            </Link>

            {/* Desktop Navigation */}
            <HStack
              as="nav"
              spacing={8}
              display={{ base: 'none', lg: 'flex' }}
              alignItems="center"
            >
              {navItems.map((item) => (
                <Button
                  key={item.href}
                  variant="ghost"
                  size="sm"
                  color={textColor}
                  _hover={{
                    bg: 'dental.50',
                    color: 'dental.600',
                  }}
                  fontWeight="medium"
                  transition="all 0.2s ease"
                  onClick={() => handleSmoothScroll(item.href)}
                  cursor="pointer"
                >
                  {item.label}
                </Button>
              ))}
            </HStack>

            {/* Desktop Actions */}
            <HStack spacing={4} display={{ base: 'none', md: 'flex' }}>
              <Link href="/login">
                <Button
                  variant="ghost"
                  size="sm"
                  leftIcon={<FiLogIn />}
                  color={textColor}
                  _hover={{ bg: 'dental.50' }}
                >
                  Login
                </Button>
              </Link>
              <Link href="/register">
                <Button
                  size="sm"
                  bg="dental.500"
                  color="white"
                  leftIcon={<FiUserPlus />}
                  _hover={{
                    bg: 'dental.600',
                    transform: 'translateY(-1px)',
                  }}
                  transition="all 0.2s ease"
                >
                  Get Started
                </Button>
              </Link>
            </HStack>

            {/* Mobile Menu Button */}
            <IconButton
              size="md"
              icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
              aria-label="Open Menu"
              display={{ base: 'flex', lg: 'none' }}
              onClick={isOpen ? onClose : onOpen}
              variant="ghost"
              color={textColor}
              _hover={{ bg: 'dental.50' }}
            />
          </Flex>
        </Container>
      </Box>

      {/* Mobile Drawer */}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="sm">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">
            <VStack spacing={2} align="start">
              <Text fontSize="lg" fontWeight="bold" color="gray.800">
                Navigation
              </Text>
              <Text fontSize="sm" color="gray.500">
                Explore our dental management system
              </Text>
            </VStack>
          </DrawerHeader>
          <DrawerBody>
            <VStack spacing={2} align="stretch" pt={6}>
              {/* Mobile Navigation Items */}
              {navItems.map((item) => (
                <Button
                  key={item.href}
                  variant="ghost"
                  leftIcon={<item.icon />}
                  justifyContent="flex-start"
                  w="full"
                  h={12}
                  fontSize="md"
                  fontWeight="medium"
                  color="gray.700"
                  _hover={{
                    bg: 'dental.50',
                    color: 'dental.600',
                  }}
                  onClick={() => {
                    handleSmoothScroll(item.href);
                    onClose();
                  }}
                >
                  {item.label}
                </Button>
              ))}

              <Box h={6} />

              {/* Mobile Actions */}
              <VStack spacing={3} align="stretch" pt={4} borderTop="1px" borderColor="gray.100">
                <Link href="/login" onClick={onClose}>
                  <Button
                    variant="outline"
                    leftIcon={<FiLogIn />}
                    justifyContent="flex-start"
                    w="full"
                    h={12}
                    fontSize="md"
                    fontWeight="medium"
                    borderColor="dental.200"
                    color="dental.600"
                    _hover={{
                      bg: 'dental.50',
                      borderColor: 'dental.300',
                    }}
                  >
                    Login
                  </Button>
                </Link>
                
                <Link href="/register" onClick={onClose}>
                  <Button
                    bg="dental.500"
                    color="white"
                    leftIcon={<FiUserPlus />}
                    justifyContent="flex-start"
                    w="full"
                    h={12}
                    fontSize="md"
                    fontWeight="medium"
                    _hover={{
                      bg: 'dental.600',
                    }}
                  >
                    Get Started Free
                  </Button>
                </Link>
              </VStack>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
