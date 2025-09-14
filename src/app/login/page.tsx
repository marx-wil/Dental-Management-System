'use client';

import React, { useState } from 'react';
import {
  Box,
  Container,
  Card,
  CardBody,
  CardHeader,
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
  useColorModeValue,
  InputGroup,
  InputRightElement,
  IconButton,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { FiMail, FiLock } from 'react-icons/fi';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../contexts/AuthContext';
import Layout from '../components/Layout';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const router = useRouter();
  
  const bg = useColorModeValue('gray.50', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.800');

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
    <Layout>
      <Box minH="100vh" bg={bg} py={12}>
        <Container maxW="md">
          <VStack spacing={8}>
            <VStack spacing={4} textAlign="center">
              <Heading size="2xl" color="dental.500">
                Welcome Back
              </Heading>
              <Text color="gray.600">
                Sign in to your Dental Management System account
              </Text>
            </VStack>

            <Card w="full" bg={cardBg}>
              <CardHeader>
                <Heading size="md">Sign In</Heading>
              </CardHeader>
              <CardBody>
                <form onSubmit={handleSubmit}>
                  <VStack spacing={4}>
                    {error && (
                      <Alert status="error" borderRadius="md">
                        <AlertIcon />
                        {error}
                      </Alert>
                    )}

                    <FormControl isRequired>
                      <FormLabel>Email Address</FormLabel>
                      <InputGroup>
                        <Input
                          type="email"
                          placeholder="Enter your email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          // leftIcon={<FiMail />}
                        />
                      </InputGroup>
                    </FormControl>

                    <FormControl isRequired>
                      <FormLabel>Password</FormLabel>
                      <InputGroup>
                        <Input
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Enter your password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          // leftIcon={<FiLock />}
                        />
                        <InputRightElement>
                          <IconButton
                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                            icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                            variant="ghost"
                            size="sm"
                            onClick={() => setShowPassword(!showPassword)}
                          />
                        </InputRightElement>
                      </InputGroup>
                    </FormControl>

                    <Button
                      type="submit"
                      colorScheme="dental"
                      size="lg"
                      w="full"
                      isLoading={isLoading}
                      loadingText="Signing in..."
                    >
                      Sign In
                    </Button>
                  </VStack>
                </form>

                <VStack spacing={4} mt={6}>
                  <HStack>
                    <Divider />
                    <Text fontSize="sm" color="gray.500">Demo Accounts</Text>
                    <Divider />
                  </HStack>

                  <VStack spacing={2} w="full">
                    {demoAccounts.map((account, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        w="full"
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
              </CardBody>
            </Card>

            <HStack spacing={1}>
              <Text color="gray.600">Don't have an account?</Text>
              <Link href="/register">
                <Text color="dental.500" fontWeight="medium" _hover={{ textDecoration: 'underline' }}>
                  Sign up
                </Text>
              </Link>
            </HStack>
          </VStack>
        </Container>
      </Box>
    </Layout>
  );
}
