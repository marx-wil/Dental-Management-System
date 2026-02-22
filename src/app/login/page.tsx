'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  VStack,
  HStack,
  Heading,
  Text,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Alert,
  AlertIcon,
  Divider,
  IconButton,
  Badge,
  Icon,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon, ArrowBackIcon } from '@chakra-ui/icons';
import { FiLock, FiMail } from 'react-icons/fi';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../contexts/AuthContext';
import AuthLayout from '../components/AuthLayout';
import { gsap } from 'gsap';

export default function LoginPage() {
  const [email, setEmail]               = useState('');
  const [password, setPassword]         = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError]               = useState('');
  const [isLoading, setIsLoading]       = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  const { login } = useAuth();
  const router    = useRouter();

  useEffect(() => {
    if (!formRef.current) return;
    const ctx = gsap.context(() => {
      gsap.to(formRef.current, {
        y: 0, opacity: 1,
        duration: 0.7, ease: 'power3.out', delay: 0.25,
      });
    }, formRef);
    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      const success = await login(email, password);
      if (success) {
        router.push('/dashboard');
      } else {
        setError('Invalid email or password. Try a demo account below.');
      }
    } catch {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const demoAccounts = [
    { email: 'admin@clinic.com',   password: 'password', role: 'Admin',   color: '#8b5cf6' },
    { email: 'dentist@clinic.com', password: 'password', role: 'Dentist', color: '#06b6d4' },
    { email: 'staff@clinic.com',   password: 'password', role: 'Staff',   color: '#10b981' },
    { email: 'patient@clinic.com', password: 'password', role: 'Patient', color: '#f59e0b' },
  ];

  /* ── shared dark input styles ── */
  const inputStyles = {
    bg: 'rgba(255,255,255,0.05)',
    border: '1.5px solid',
    borderColor: 'rgba(255,255,255,0.1)',
    color: 'white',
    borderRadius: 'xl',
    fontSize: 'sm',
    h: 12,
    _focus: {
      bg: 'rgba(6,182,212,0.06)',
      borderColor: 'cyan.500',
      boxShadow: '0 0 0 3px rgba(6,182,212,0.15)',
    },
    _hover: { borderColor: 'rgba(255,255,255,0.2)' },
    _placeholder: { color: 'whiteAlpha.300' },
  };

  return (
    <AuthLayout>
      <Box
        ref={formRef}
        style={{ opacity: 0, transform: 'translateY(24px)' }}
      >
        <VStack spacing={8} align="stretch">
          {/* Back link */}
          <Link href="/">
            <Button
              variant="ghost"
              size="sm"
              leftIcon={<ArrowBackIcon />}
              color="whiteAlpha.500"
              px={0}
              _hover={{ color: 'white', bg: 'transparent' }}
            >
              Back to home
            </Button>
          </Link>

          {/* Header */}
          <Box>
            <Heading
              fontSize="3xl"
              fontWeight="800"
              color="white"
              letterSpacing="-0.03em"
              mb={2}
            >
              Sign in
            </Heading>
            <Text fontSize="sm" color="whiteAlpha.400">
              Welcome back. Enter your credentials to continue.
            </Text>
          </Box>

          {/* Error */}
          {error && (
            <Alert
              status="error"
              borderRadius="xl"
              fontSize="sm"
              bg="rgba(244,63,94,0.1)"
              border="1px solid rgba(244,63,94,0.25)"
            >
              <AlertIcon color="rose.400" />
              <Text color="rose.300">{error}</Text>
            </Alert>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <VStack spacing={5} align="stretch">
              {/* Email */}
              <FormControl>
                <FormLabel fontSize="xs" fontWeight="600" color="whiteAlpha.500" mb={2} letterSpacing="0.06em" textTransform="uppercase">
                  Email address
                </FormLabel>
                <InputGroup>
                  <Input
                    type="email"
                    placeholder="you@clinic.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    {...inputStyles}
                    pl={10}
                  />
                  <Box
                    position="absolute"
                    left={3}
                    top="50%"
                    transform="translateY(-50%)"
                    zIndex={1}
                    pointerEvents="none"
                  >
                    <Icon as={FiMail} color="whiteAlpha.300" boxSize={4} />
                  </Box>
                </InputGroup>
              </FormControl>

              {/* Password */}
              <FormControl>
                <HStack justify="space-between" mb={2}>
                  <FormLabel fontSize="xs" fontWeight="600" color="whiteAlpha.500" mb={0} letterSpacing="0.06em" textTransform="uppercase">
                    Password
                  </FormLabel>
                  <Text
                    fontSize="xs"
                    color="cyan.500"
                    fontWeight="600"
                    cursor="pointer"
                    _hover={{ color: 'cyan.300' }}
                    transition="color 0.2s"
                  >
                    Forgot password?
                  </Text>
                </HStack>
                <InputGroup>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    {...inputStyles}
                    pl={10}
                    pr={12}
                  />
                  <Box
                    position="absolute"
                    left={3}
                    top="50%"
                    transform="translateY(-50%)"
                    zIndex={1}
                    pointerEvents="none"
                  >
                    <Icon as={FiLock} color="whiteAlpha.300" boxSize={4} />
                  </Box>
                  <InputRightElement h="full" pr={1}>
                    <IconButton
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                      icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                      variant="ghost"
                      size="sm"
                      borderRadius="lg"
                      color="whiteAlpha.400"
                      _hover={{ color: 'white', bg: 'whiteAlpha.100' }}
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  </InputRightElement>
                </InputGroup>
              </FormControl>

              {/* Submit */}
              <Button
                type="submit"
                size="lg"
                h={12}
                fontWeight="700"
                fontSize="sm"
                borderRadius="xl"
                bg="linear-gradient(135deg, #06b6d4 0%, #8b5cf6 100%)"
                color="white"
                mt={2}
                isLoading={isLoading}
                loadingText="Signing in..."
                boxShadow="0 4px 20px rgba(6,182,212,0.25)"
                _hover={{
                  opacity: 0.9,
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 32px rgba(6,182,212,0.4)',
                }}
                _active={{ transform: 'translateY(0)' }}
                transition="all 0.25s ease"
              >
                Sign in
              </Button>
            </VStack>
          </form>

          {/* Register link */}
          <Text textAlign="center" fontSize="sm" color="whiteAlpha.400">
            Don&apos;t have an account?{' '}
            <Link href="/register">
              <Text
                as="span"
                color="cyan.400"
                fontWeight="700"
                cursor="pointer"
                _hover={{ color: 'cyan.300' }}
                transition="color 0.2s"
              >
                Create account
              </Text>
            </Link>
          </Text>

          {/* Divider */}
          <HStack>
            <Divider borderColor="rgba(255,255,255,0.07)" />
            <Text fontSize="xs" color="whiteAlpha.300" whiteSpace="nowrap" px={3} fontWeight="500">
              Demo accounts
            </Text>
            <Divider borderColor="rgba(255,255,255,0.07)" />
          </HStack>

          {/* Demo account cards */}
          <VStack spacing={2}>
            {demoAccounts.map((account, i) => (
              <Box
                key={i}
                w="full"
                px={4}
                py={3}
                borderRadius="xl"
                border="1.5px solid rgba(255,255,255,0.07)"
                cursor="pointer"
                bg="rgba(255,255,255,0.03)"
                onClick={() => {
                  setEmail(account.email);
                  setPassword(account.password);
                }}
                _hover={{
                  bg: 'rgba(255,255,255,0.06)',
                  borderColor: `${account.color}4D`,
                }}
                transition="all 0.2s ease"
              >
                <HStack justify="space-between">
                  <VStack spacing={0} align="start">
                    <Text fontSize="sm" fontWeight="600" color="whiteAlpha.800">
                      {account.email}
                    </Text>
                    <Text fontSize="xs" color="whiteAlpha.300">
                      password: {account.password}
                    </Text>
                  </VStack>
                  <Badge
                    px={3}
                    py={1}
                    borderRadius="full"
                    fontSize="xs"
                    fontWeight="700"
                    color="white"
                    style={{ background: account.color }}
                  >
                    {account.role}
                  </Badge>
                </HStack>
              </Box>
            ))}
          </VStack>
        </VStack>
      </Box>
    </AuthLayout>
  );
}
