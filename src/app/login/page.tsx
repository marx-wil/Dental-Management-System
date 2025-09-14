'use client';

import React, { useState } from 'react';
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  HStack,
  Text,
  Alert,
  AlertIcon,
  Divider,
  InputGroup,
  InputRightElement,
  IconButton,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon, CheckIcon, ArrowBackIcon } from '@chakra-ui/icons';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../contexts/AuthContext';
import AuthLayout from '../components/AuthLayout';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const success = await login(email, password);
      if (success) {
        router.push('/dashboard');
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const demoAccounts = [
    { email: 'admin@clinic.com', password: 'password', role: 'Admin' },
    { email: 'dentist@clinic.com', password: 'password', role: 'Dentist' },
    { email: 'staff@clinic.com', password: 'password', role: 'Staff' },
    { email: 'patient@clinic.com', password: 'password', role: 'Patient' },
  ];

  return (
    <AuthLayout>
      <VStack spacing={8} align="stretch">
        <Box>
          <Link href="/">
            <Button
              variant="ghost"
              size="sm"
              leftIcon={<ArrowBackIcon />}
              color="gray.600"
              mb={4}
              _hover={{
                bg: "gray.100",
                color: "gray.800",
              }}
            >
              Back to Home
            </Button>
          </Link>
          <Heading size="xl" color="gray.800" mb={2}>
            Sign in to your account
          </Heading>
        </Box>

        <form onSubmit={handleSubmit}>
          <VStack spacing={6} align="stretch">
            {error && (
              <Alert status="error" borderRadius="md" fontSize="sm">
                <AlertIcon />
                {error}
              </Alert>
            )}

            <FormControl>
              <FormLabel fontSize="sm" color="gray.600" mb={2}>
                E-mail Address
              </FormLabel>
              <InputGroup>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  border="none"
                  borderBottom="2px solid"
                  borderBottomColor="gray.200"
                  borderRadius="0"
                  px={0}
                  py={3}
                  fontSize="md"
                  _focus={{
                    borderBottomColor: "#3182ce",
                    boxShadow: "none",
                  }}
                  _placeholder={{
                    color: "gray.400",
                  }}
                />
                <InputRightElement>
                  <CheckIcon color="green.500" />
                </InputRightElement>
              </InputGroup>
            </FormControl>

            <FormControl>
              <FormLabel fontSize="sm" color="gray.600" mb={2}>
                Password
              </FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  border="none"
                  borderBottom="2px solid"
                  borderBottomColor="gray.200"
                  borderRadius="0"
                  px={0}
                  py={3}
                  fontSize="md"
                  _focus={{
                    borderBottomColor: "#3182ce",
                    boxShadow: "none",
                  }}
                  _placeholder={{
                    color: "gray.400",
                  }}
                />
                <InputRightElement>
                  <IconButton
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowPassword(!showPassword)}
                    color="gray.500"
                  />
                </InputRightElement>
              </InputGroup>
            </FormControl>

            <HStack spacing={4} pt={4}>
              <Button
                type="submit"
                bg="#3182ce"
                color="white"
                size="lg"
                flex="1"
                borderRadius="full"
                fontSize="md"
                fontWeight="medium"
                isLoading={isLoading}
                loadingText="Signing In..."
                _hover={{
                  bg: "#2c5aa0",
                }}
                _active={{
                  bg: "#2c5aa0",
                }}
              >
                Sign In
              </Button>
              
              <Link href="/register">
                <Button
                  variant="outline"
                  size="lg"
                  borderRadius="full"
                  fontSize="md"
                  fontWeight="medium"
                  borderColor="gray.300"
                  color="gray.700"
                  _hover={{
                    bg: "gray.50",
                    borderColor: "gray.400",
                  }}
                >
                  Sign Up
                </Button>
              </Link>
            </HStack>
          </VStack>
        </form>

        {/* Demo Accounts Section */}
        <VStack spacing={4} mt={8}>
          <HStack w="full">
            <Divider />
            <Text fontSize="sm" color="gray.500" px={4}>
              Demo Accounts
            </Text>
            <Divider />
          </HStack>

          <VStack spacing={2} w="full">
            {demoAccounts.map((account, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                w="full"
                fontSize="xs"
                py={2}
                borderColor="gray.200"
                color="gray.600"
                _hover={{
                  bg: "gray.50",
                  borderColor: "gray.300",
                }}
                onClick={() => {
                  setEmail(account.email);
                  setPassword(account.password);
                }}
              >
                {account.role} - {account.email}
              </Button>
            ))}
          </VStack>
        </VStack>
      </VStack>
    </AuthLayout>
  );
}
