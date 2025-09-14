"use client";

import React, { useState } from "react";
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
  InputGroup,
  InputRightElement,
  IconButton,
  Checkbox,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon, CheckIcon, ArrowBackIcon } from "@chakra-ui/icons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth, UserRole } from "../contexts/AuthContext";
import AuthLayout from "../components/AuthLayout";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const { register } = useAuth();
  const router = useRouter();

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!formData.name || !formData.email || !formData.password) {
      setError("All fields are required");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    if (!agreedToTerms) {
      setError("You must agree to the Terms & Conditions");
      return;
    }

    setIsLoading(true);

    try {
      const success = await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: "patient" as UserRole,
        phone: "",
        address: "",
        dateOfBirth: "",
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
            Create your account
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
                Name
              </FormLabel>
              <InputGroup>
                <Input
                  type="text"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
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
                E-mail Address
              </FormLabel>
              <InputGroup>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
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
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
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
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowPassword(!showPassword)}
                    color="gray.500"
                  />
                </InputRightElement>
              </InputGroup>
            </FormControl>

            <Checkbox
              isChecked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
              colorScheme="blue"
              size="md"
            >
              <Text fontSize="sm" color="gray.600">
                By Signing Up, I Agree with{" "}
                <ChakraLink color="#3182ce" textDecoration="underline">
                  Terms & Conditions
                </ChakraLink>
              </Text>
            </Checkbox>

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
                loadingText="Signing Up..."
                _hover={{
                  bg: "#2c5aa0",
                }}
                _active={{
                  bg: "#2c5aa0",
                }}
              >
                Sign Up
              </Button>
              
              <Link href="/login">
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
                  Sign In
                </Button>
              </Link>
            </HStack>
          </VStack>
        </form>
      </VStack>
    </AuthLayout>
  );
}
