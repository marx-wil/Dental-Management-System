"use client";

import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { FaTooth } from "react-icons/fa";

interface AuthLayoutProps {
  children: React.ReactNode;
  showWelcome?: boolean;
}

export default function AuthLayout({ children, showWelcome = true }: AuthLayoutProps) {
  return (
    <Box minH="100vh" bg="white">
      <Flex minH="100vh">
        {/* Welcome Section - Hidden on mobile */}
        {showWelcome && (
          <Box
            display={{ base: "none", lg: "flex" }}
            flex="1"
            bgGradient="linear(to-br, #3182ce, #63b3ed)"
            position="relative"
            alignItems="center"
            justifyContent="center"
            overflow="hidden"
          >
            {/* Cloud-like decorative elements */}
            <Box
              position="absolute"
              top="-50px"
              right="-50px"
              width="200px"
              height="200px"
              borderRadius="50%"
              bg="white"
              opacity="0.1"
            />
            <Box
              position="absolute"
              bottom="-100px"
              left="-100px"
              width="300px"
              height="300px"
              borderRadius="50%"
              bg="white"
              opacity="0.05"
            />
            <Box
              position="absolute"
              top="20%"
              left="10%"
              width="150px"
              height="150px"
              borderRadius="50%"
              bg="white"
              opacity="0.08"
            />
            
            {/* Content */}
            <Box textAlign="center" color="white" zIndex="1">
              <Text fontSize="2xl" fontWeight="300" mb={4}>
                Welcome to
              </Text>
              
              {/* Logo */}
              <Box
                width="80px"
                height="80px"
                borderRadius="50%"
                bg="white"
                display="flex"
                alignItems="center"
                justifyContent="center"
                mx="auto"
                mb={6}
                boxShadow="0 4px 20px rgba(0,0,0,0.1)"
              >
                <FaTooth size="40" color="#3182ce" />
              </Box>
              
              <Text fontSize="4xl" fontWeight="bold" mb={6}>
                DentalCare
              </Text>
              
              <Text fontSize="lg" opacity="0.9" maxW="400px" mx="auto" lineHeight="1.6">
                Your comprehensive dental management system designed to streamline 
                patient care, appointments, and practice operations for modern dental clinics.
              </Text>
              
              <Box mt={12} fontSize="sm" opacity="0.7">
                <Text>DEVELOPED BY</Text>
                <Text mt={1}>DENTAL MANAGEMENT TEAM</Text>
              </Box>
            </Box>
          </Box>
        )}

        {/* Form Section */}
        <Box
          flex={{ base: "1", lg: showWelcome ? "1" : "1" }}
          display="flex"
          alignItems="center"
          justifyContent="center"
          position="relative"
        >
          {/* Mobile Welcome Section */}
          {showWelcome && (
            <Box
              display={{ base: "block", lg: "none" }}
              position="absolute"
              top="0"
              left="0"
              right="0"
              height="300px"
              bgGradient="linear(to-br, #3182ce, #63b3ed)"
              zIndex="0"
            >
              {/* Cloud decorations */}
              <Box
                position="absolute"
                top="-30px"
                right="-30px"
                width="120px"
                height="120px"
                borderRadius="50%"
                bg="white"
                opacity="0.1"
              />
              <Box
                position="absolute"
                bottom="-50px"
                left="-50px"
                width="150px"
                height="150px"
                borderRadius="50%"
                bg="white"
                opacity="0.05"
              />
              
              <Box
                position="relative"
                zIndex="1"
                textAlign="center"
                color="white"
                pt="60px"
              >
                <Text fontSize="lg" fontWeight="300" mb={3}>
                  Welcome to
                </Text>
                
                <Box
                  width="60px"
                  height="60px"
                  borderRadius="50%"
                  bg="white"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  mx="auto"
                  mb={4}
                  boxShadow="0 4px 20px rgba(0,0,0,0.1)"
                >
                  <FaTooth size="30" color="#3182ce" />
                </Box>
                
                <Text fontSize="2xl" fontWeight="bold" mb={3}>
                  DentalCare
                </Text>
                
                <Text fontSize="sm" opacity="0.9" px={8} lineHeight="1.5">
                  Your comprehensive dental management system
                </Text>
              </Box>
            </Box>
          )}

          {/* Form Content */}
          <Box
            width="100%"
            maxW="400px"
            px={8}
            position="relative"
            zIndex="1"
            mt={{ base: showWelcome ? "200px" : "0", lg: "0" }}
            mb={{ base: "40px", lg: "0" }}
          >
            {children}
          </Box>
        </Box>
      </Flex>
    </Box>
  );
}
