'use client';

import React from 'react';
import {
  Box,
  Flex,
  HStack,
  VStack,
  Text,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useColorModeValue,
  useDisclosure,
  useColorMode,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Link as ChakraLink,
  Badge,
} from '@chakra-ui/react';
import {
  HamburgerIcon,
  CloseIcon,
  MoonIcon,
  SunIcon,
  ChevronDownIcon,
  BellIcon,
} from '@chakra-ui/icons';
import {
  FiHome,
  FiUsers,
  FiCalendar,
  FiActivity,
  FiDollarSign,
  FiPackage,
  FiBarChart,
  FiSettings,
  FiLogOut,
  FiUser,
  FiUserCheck,
} from 'react-icons/fi';
import Link from 'next/link';
import { useAuth, UserRole } from '../contexts/AuthContext';

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
  roles: UserRole[];
}

const navItems: NavItem[] = [
  { label: 'Dashboard', href: '/dashboard', icon: FiHome, roles: ['admin', 'dentist', 'staff', 'patient'] },
  { label: 'Patients', href: '/patients', icon: FiUsers, roles: ['admin', 'dentist', 'staff'] },
  { label: 'Appointments', href: '/appointments', icon: FiCalendar, roles: ['admin', 'dentist', 'staff', 'patient'] },
  { label: 'Billing', href: '/billing', icon: FiDollarSign, roles: ['admin', 'dentist', 'staff'] },
  { label: 'Inventory', href: '/inventory', icon: FiPackage, roles: ['admin', 'staff'] },
  { label: 'Reports', href: '/reports', icon: FiBarChart, roles: ['admin', 'dentist'] },
  { label: 'User Management', href: '/users', icon: FiUserCheck, roles: ['admin'] },
  { label: 'Settings', href: '/settings', icon: FiSettings, roles: ['admin', 'dentist', 'staff', 'patient'] },
];

export default function Navigation() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const { user, logout } = useAuth();

  const bg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  if (!user) return null;

  const filteredNavItems = navItems.filter(item => 
    item.roles.includes(user.role)
  );

  const getRoleBadgeColor = (role: UserRole) => {
    switch (role) {
      case 'admin': return 'red';
      case 'dentist': return 'blue';
      case 'staff': return 'green';
      case 'patient': return 'purple';
      default: return 'gray';
    }
  };

  return (
    <>
      <Box bg={bg} px={4} borderBottom="1px" borderColor={borderColor}>
        <Flex h={16} alignItems="center" justifyContent="space-between">  
          <IconButton
            size="md"
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label="Open Menu"
            display={{ lg: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems="center">
            <Link href="/dashboard">
              <Text fontSize="xl" fontWeight="bold" color="dental.500">
                DMS
              </Text>
            </Link>
            <HStack as="nav" spacing={4} display={{ base: 'none', lg: 'flex' }}>
              {filteredNavItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant="ghost"
                    leftIcon={<item.icon />}
                    size="sm"
                    _hover={{ bg: 'dental.50' }}
                  >
                    {item.label}
                  </Button>
                </Link>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems="center" gap={2}>
            <IconButton
              aria-label="Toggle notifications"
              icon={<BellIcon />}
              variant="ghost"
              size="sm"
            />
            <IconButton
              aria-label="Toggle color mode"
              icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              onClick={toggleColorMode}
              variant="ghost"
              size="sm"
            />
            <Menu>
              <MenuButton
                as={Button}
                variant="ghost"
                rightIcon={<ChevronDownIcon />}
                leftIcon={<FiUser />}
                size="sm"
              >
                <VStack spacing={0} align="start">
                  <Text fontSize="sm" fontWeight="medium">
                    {user.name}
                  </Text>
                  <Badge size="sm" colorScheme={getRoleBadgeColor(user.role)}>
                    {user.role}
                  </Badge>
                </VStack>
              </MenuButton>
              <MenuList>
                <MenuItem icon={<FiUser />}>
                  Profile
                </MenuItem>
                <MenuItem icon={<FiSettings />}>
                  Settings
                </MenuItem>
                <MenuDivider />
                <MenuItem icon={<FiLogOut />} onClick={logout}>
                  Logout
                </MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>
      </Box>

      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Navigation</DrawerHeader>
          <DrawerBody>
            <VStack spacing={4} align="stretch">
              {filteredNavItems.map((item) => (
                <Link key={item.href} href={item.href} onClick={onClose}>
                  <Button
                    variant="ghost"
                    leftIcon={<item.icon />}
                    justifyContent="flex-start"
                    w="full"
                  >
                    {item.label}
                  </Button>
                </Link>
              ))}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
