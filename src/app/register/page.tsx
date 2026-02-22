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
  IconButton,
  Checkbox,
  Icon,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon, ArrowBackIcon } from '@chakra-ui/icons';
import { FiUser, FiMail, FiLock, FiCheck } from 'react-icons/fi';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth, UserRole } from '../contexts/AuthContext';
import AuthLayout from '../components/AuthLayout';
import { gsap } from 'gsap';

export default function RegisterPage() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [showPassword, setShowPassword]   = useState(false);
  const [error, setError]                 = useState('');
  const [isLoading, setIsLoading]         = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  const { register } = useAuth();
  const router = useRouter();

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

  const handleChange = (field: string, value: string) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.name || !formData.email || !formData.password) {
      setError('All fields are required.');
      return;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    if (!agreedToTerms) {
      setError('You must agree to the Terms & Conditions.');
      return;
    }

    setIsLoading(true);
    try {
      const success = await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: 'patient' as UserRole,
        phone: '',
        address: '',
        dateOfBirth: '',
      });
      if (success) {
        router.push('/dashboard');
      } else {
        setError('Registration failed. Please try again.');
      }
    } catch {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

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

  const fields = [
    { id: 'name',     label: 'Full name',       type: 'text',     icon: FiUser,  placeholder: 'Dr. Juan dela Cruz' },
    { id: 'email',    label: 'Email address',   type: 'email',    icon: FiMail,  placeholder: 'you@clinic.com' },
    { id: 'password', label: 'Password',        type: 'password', icon: FiLock,  placeholder: 'Min. 6 characters' },
  ];

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
              Create account
            </Heading>
            <Text fontSize="sm" color="whiteAlpha.400">
              Get started free — no credit card required.
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
              {fields.map((f) => (
                <FormControl key={f.id}>
                  <FormLabel
                    fontSize="xs"
                    fontWeight="600"
                    color="whiteAlpha.500"
                    mb={2}
                    letterSpacing="0.06em"
                    textTransform="uppercase"
                  >
                    {f.label}
                  </FormLabel>
                  <InputGroup>
                    <Input
                      type={f.id === 'password' ? (showPassword ? 'text' : 'password') : f.type}
                      placeholder={f.placeholder}
                      value={formData[f.id as keyof typeof formData]}
                      onChange={(e) => handleChange(f.id, e.target.value)}
                      {...inputStyles}
                      pl={10}
                      pr={f.id === 'password' ? 12 : undefined}
                    />
                    {/* Left icon */}
                    <Box
                      position="absolute"
                      left={3}
                      top="50%"
                      transform="translateY(-50%)"
                      zIndex={1}
                      pointerEvents="none"
                    >
                      <Icon as={f.icon} color="whiteAlpha.300" boxSize={4} />
                    </Box>
                    {/* Password toggle */}
                    {f.id === 'password' && (
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
                    )}
                  </InputGroup>
                </FormControl>
              ))}

              {/* Terms checkbox */}
              <Checkbox
                isChecked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                colorScheme="cyan"
                size="md"
                sx={{
                  '.chakra-checkbox__control': {
                    bg: 'rgba(255,255,255,0.05)',
                    border: '1.5px solid rgba(255,255,255,0.15)',
                    borderRadius: 'md',
                    _checked: {
                      bg: 'cyan.500',
                      borderColor: 'cyan.500',
                    },
                  },
                }}
              >
                <Text fontSize="sm" color="whiteAlpha.500">
                  I agree to the{' '}
                  <Text
                    as="span"
                    color="cyan.400"
                    fontWeight="600"
                    cursor="pointer"
                    _hover={{ color: 'cyan.300' }}
                  >
                    Terms & Conditions
                  </Text>
                </Text>
              </Checkbox>

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
                loadingText="Creating account..."
                boxShadow="0 4px 20px rgba(6,182,212,0.25)"
                _hover={{
                  opacity: 0.9,
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 32px rgba(6,182,212,0.4)',
                }}
                _active={{ transform: 'translateY(0)' }}
                transition="all 0.25s ease"
              >
                Create account
              </Button>
            </VStack>
          </form>

          {/* Sign in link */}
          <Text textAlign="center" fontSize="sm" color="whiteAlpha.400">
            Already have an account?{' '}
            <Link href="/login">
              <Text
                as="span"
                color="cyan.400"
                fontWeight="700"
                cursor="pointer"
                _hover={{ color: 'cyan.300' }}
                transition="color 0.2s"
              >
                Sign in
              </Text>
            </Link>
          </Text>

          {/* Trust badges */}
          <HStack justify="center" spacing={6} pt={2}>
            {[
              { icon: FiCheck, label: 'Free 30-day trial' },
              { icon: FiCheck, label: 'No credit card' },
              { icon: FiCheck, label: 'Cancel anytime' },
            ].map((b, i) => (
              <HStack key={i} spacing={1.5}>
                <Icon as={b.icon} color="emerald.400" boxSize={3.5} />
                <Text fontSize="xs" color="whiteAlpha.300" fontWeight="500">
                  {b.label}
                </Text>
              </HStack>
            ))}
          </HStack>
        </VStack>
      </Box>
    </AuthLayout>
  );
}
