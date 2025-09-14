"use client";

import React, { useState } from "react";
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
  Select,
  useColorModeValue,
  InputGroup,
  InputRightElement,
  IconButton,
  RadioGroup,
  Radio,
  Stack,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { FiMail, FiLock, FiUser } from "react-icons/fi";
import { FaBuilding } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth, UserRole } from "../contexts/AuthContext";
import Layout from "../components/Layout";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: "",
    dateOfBirth: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { register } = useAuth();
  const router = useRouter();

  const bg = useColorModeValue("gray.50", "gray.900");
  const cardBg = useColorModeValue("white", "gray.800");

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    if (!formData.phone) {
      setError("Phone number is required");
      return;
    }

    if (!formData.address) {
      setError("Address is required");
      return;
    }

    if (!formData.dateOfBirth) {
      setError("Date of birth is required");
      return;
    }

    setIsLoading(true);

    try {
      const success = await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: "patient" as UserRole,
        phone: formData.phone,
        address: formData.address,
        dateOfBirth: formData.dateOfBirth,
      });

      if (success) {
        router.push("/dashboard");
      } else {
        setError("Registration failed. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <Box minH="100vh" bg={bg} py={12}>
        <Container maxW="md">
          <VStack spacing={8}>
            <VStack spacing={4} textAlign="center">
              <Heading size="2xl" color="dental.500">
                Patient Registration
              </Heading>
              <Text color="gray.600">
                Create your patient account to access your dental records and appointments
              </Text>
            </VStack>

            <Card w="full" bg={cardBg}>
              <CardHeader>
                <Heading size="md">Sign Up</Heading>
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
                      <FormLabel>Full Name</FormLabel>
                      <Input
                        type="text"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={(e) =>
                          handleInputChange("name", e.target.value)
                        }
                        // leftIcon={<FiUser />}
                      />
                    </FormControl>

                    <FormControl isRequired>
                      <FormLabel>Email Address</FormLabel>
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        // leftIcon={<FiMail />}
                      />
                    </FormControl>

                    <FormControl isRequired>
                      <FormLabel>Phone Number</FormLabel>
                      <Input
                        type="tel"
                        placeholder="Enter your phone number"
                        value={formData.phone}
                        onChange={(e) =>
                          handleInputChange("phone", e.target.value)
                        }
                      />
                    </FormControl>

                    <FormControl isRequired>
                      <FormLabel>Address</FormLabel>
                      <Input
                        type="text"
                        placeholder="Enter your address"
                        value={formData.address}
                        onChange={(e) =>
                          handleInputChange("address", e.target.value)
                        }
                      />
                    </FormControl>

                    <FormControl isRequired>
                      <FormLabel>Date of Birth</FormLabel>
                      <Input
                        type="date"
                        value={formData.dateOfBirth}
                        onChange={(e) =>
                          handleInputChange("dateOfBirth", e.target.value)
                        }
                      />
                    </FormControl>

                    <FormControl isRequired>
                      <FormLabel>Password</FormLabel>
                      <InputGroup>
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Create a password"
                          value={formData.password}
                          onChange={(e) =>
                            handleInputChange("password", e.target.value)
                          }
                          // leftIcon={<FiLock />}
                        />
                        <InputRightElement>
                          <IconButton
                            aria-label={
                              showPassword ? "Hide password" : "Show password"
                            }
                            icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                            variant="ghost"
                            size="sm"
                            onClick={() => setShowPassword(!showPassword)}
                          />
                        </InputRightElement>
                      </InputGroup>
                    </FormControl>

                    <FormControl isRequired>
                      <FormLabel>Confirm Password</FormLabel>
                      <InputGroup>
                        <Input
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Confirm your password"
                          value={formData.confirmPassword}
                          onChange={(e) =>
                            handleInputChange("confirmPassword", e.target.value)
                          }
                          // leftIcon={<FiLock />}
                        />
                        <InputRightElement>
                          <IconButton
                            aria-label={
                              showConfirmPassword
                                ? "Hide password"
                                : "Show password"
                            }
                            icon={
                              showConfirmPassword ? (
                                <ViewOffIcon />
                              ) : (
                                <ViewIcon />
                              )
                            }
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
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
                      loadingText="Creating account..."
                    >
                      Create Account
                    </Button>
                  </VStack>
                </form>
              </CardBody>
            </Card>

            <HStack spacing={1}>
              <Text color="gray.600">Already have an account?</Text>
              <Link href="/login">
                <Text
                  color="dental.500"
                  fontWeight="medium"
                  _hover={{ textDecoration: "underline" }}
                >
                  Sign in
                </Text>
              </Link>
            </HStack>
          </VStack>
        </Container>
      </Box>
    </Layout>
  );
}
