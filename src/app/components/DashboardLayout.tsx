'use client';

import React, { useState } from 'react';
import {
  Box,
  Flex,
  VStack,
  HStack,
  Text,
  Icon,
  Avatar,
  Badge,
  Input,
  InputGroup,
  InputLeftElement,
  useColorModeValue,
  useDisclosure,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Divider,
} from '@chakra-ui/react';
import {
  FiMenu,
  FiSearch,
  FiBell,
  FiSettings,
  FiUser,
  FiLogOut,
  FiHome,
  FiUsers,
  FiCalendar,
  FiDollarSign,
  FiBarChart,
  FiPackage,
  FiFileText,
  FiMessageSquare,
  FiTrendingUp,
  FiUserCheck,
} from 'react-icons/fi';
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { getMenuItemsForRole, hasPermission } from '../utils/permissions';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

// Icon mapping for dynamic menu items
const iconMap: Record<string, React.ComponentType<{ size?: number; color?: string }>> = {
  FiHome,
  FiUsers,
  FiCalendar,
  FiDollarSign,
  FiPackage,
  FiFileText,
  FiBarChart,
  FiMessageSquare,
  FiUserCheck,
  FiSettings,
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user, logout } = useAuth();
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  const sidebarBg = useColorModeValue('purple.600', 'purple.700');
  const headerBg = useColorModeValue('white', 'gray.800');
  const mainBg = useColorModeValue('gray.50', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.800');

  // Get menu items based on user role
  const menuItems = getMenuItemsForRole(user?.role || 'patient');

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const SidebarContent = () => (
    <VStack
      w="280px"
      h="100vh"
      bg={sidebarBg}
      bgGradient="linear(to-b, purple.500, purple.700)"
      p={6}
      spacing={6}
      align="stretch"
      position="fixed"
      left={0}
      top={0}
      zIndex={10}
    >
      {/* Logo Section */}
      <VStack spacing={3} align="center" mb={8}>
        <Box
          w={12}
          h={12}
          bg="white"
          borderRadius="xl"
          display="flex"
          alignItems="center"
          justifyContent="center"
          fontSize="2xl"
          fontWeight="bold"
          color="purple.600"
        >
          D
        </Box>
        <Text color="white" fontSize="lg" fontWeight="bold">
          Dental Management
        </Text>
      </VStack>

      {/* Navigation Menu */}
      <VStack spacing={2} align="stretch" flex={1}>
        {menuItems.map((item) => (
          <Box
            key={item.label}
            p={3}
            borderRadius="lg"
            cursor="pointer"
            _hover={{ bg: 'whiteAlpha.200' }}
            onClick={() => router.push(item.href)}
            transition="all 0.2s"
          >
            <HStack spacing={3}>
              <Icon as={iconMap[item.icon]} color="white" boxSize={5} />
              <Text color="white" fontSize="sm" fontWeight="medium">
                {item.label}
              </Text>
              {item.label === 'Notifications' && hasPermission(user?.role || 'patient', 'notifications', 'view') && (
                <Badge colorScheme="red" borderRadius="full" fontSize="xs">
                  12
                </Badge>
              )}
            </HStack>
          </Box>
        ))}
      </VStack>

      {/* Bottom Card */}
      <Box
        bg="whiteAlpha.200"
        p={4}
        borderRadius="xl"
        backdropFilter="blur(10px)"
      >
        <HStack spacing={3} mb={2}>
          <Icon as={FiTrendingUp} color="white" boxSize={5} />
          <Text color="white" fontSize="sm" fontWeight="medium">
            Weekly Reports
          </Text>
        </HStack>
        <Text color="whiteAlpha.800" fontSize="xs">
          Check your weekly transaction reports and analytics
        </Text>
      </Box>
    </VStack>
  );

  return (
    <Box minH="100vh" bg={mainBg}>
      {/* Sidebar */}
      <SidebarContent />

      {/* Main Content Area */}
      <Box ml="280px" minH="100vh">
        {/* Header */}
        <Box
          bg={headerBg}
          px={8}
          py={4}
          borderBottom="1px"
          borderColor="gray.200"
          position="sticky"
          top={0}
          zIndex={5}
          boxShadow="sm"
        >
          <Flex justify="space-between" align="center">
            {/* Search Bar */}
            <InputGroup maxW="400px">
              <InputLeftElement pointerEvents="none">
                <Icon as={FiSearch} color="gray.400" />
              </InputLeftElement>
              <Input
                placeholder="Search patients, appointments..."
                bg="gray.50"
                border="none"
                borderRadius="lg"
                _focus={{ bg: 'white', boxShadow: 'md' }}
              />
            </InputGroup>

            {/* Right Side - User Info */}
            <HStack spacing={4}>
              <IconButton
                aria-label="Notifications"
                icon={<FiBell />}
                variant="ghost"
                size="sm"
                position="relative"
              >
                <Badge
                  position="absolute"
                  top="-1"
                  right="-1"
                  colorScheme="red"
                  borderRadius="full"
                  fontSize="xs"
                >
                  3
                </Badge>
              </IconButton>

              <Menu>
                <MenuButton>
                  <HStack spacing={3} cursor="pointer">
                    <Avatar
                      size="sm"
                      name={user?.name}
                      src={user?.avatar}
                      bg="purple.500"
                    />
                    <VStack spacing={0} align="start">
                      <Text fontSize="sm" fontWeight="medium">
                        {user?.name || 'User'}
                      </Text>
                      <Text fontSize="xs" color="gray.500">
                        {user?.role === 'admin' ? 'Administrator' : 
                         user?.role === 'dentist' ? 'Dentist' :
                         user?.role === 'staff' ? 'Staff' : 'Patient'}
                      </Text>
                    </VStack>
                  </HStack>
                </MenuButton>
                <MenuList>
                  <MenuItem icon={<FiUser />}>Profile</MenuItem>
                  <MenuItem icon={<FiSettings />}>Settings</MenuItem>
                  <Divider />
                  <MenuItem icon={<FiLogOut />} onClick={handleLogout}>
                    Logout
                  </MenuItem>
                </MenuList>
              </Menu>
            </HStack>
          </Flex>
        </Box>

        {/* Page Content */}
        <Box p={8}>
          {children}
        </Box>
      </Box>

      {/* Mobile Drawer */}
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <SidebarContent />
        </DrawerContent>
      </Drawer>
    </Box>
  );
}
