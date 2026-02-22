'use client';

import React, { useRef, useEffect } from 'react';
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
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Divider,
  useBreakpointValue,
  useDisclosure,
  Drawer,
  DrawerContent,
  DrawerOverlay,
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
  FiUserCheck,
  FiChevronRight,
} from 'react-icons/fi';
import { FaTooth } from 'react-icons/fa';
import { gsap } from 'gsap';
import { useAuth } from '../contexts/AuthContext';
import { useRouter, usePathname } from 'next/navigation';
import { getMenuItemsForRole, hasPermission } from '../utils/permissions';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const iconMap: Record<string, React.ComponentType<{ size?: number; color?: string }>> = {
  FiHome, FiUsers, FiCalendar, FiDollarSign, FiPackage,
  FiFileText, FiBarChart, FiMessageSquare, FiUserCheck, FiSettings,
};

const colorAccents: Record<string, string> = {
  FiHome: 'cyan',
  FiUsers: 'violet',
  FiCalendar: 'amber',
  FiDollarSign: 'emerald',
  FiPackage: 'rose',
  FiFileText: 'cyan',
  FiBarChart: 'violet',
  FiMessageSquare: 'emerald',
  FiUserCheck: 'cyan',
  FiSettings: 'slate',
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const sidebarRef = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<(HTMLDivElement | null)[]>([]);

  const menuItems = getMenuItemsForRole(user?.role || 'patient');
  const sidebarWidth = '280px';
  const mainMarginLeft = useBreakpointValue({ base: '0', lg: sidebarWidth });

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  useEffect(() => {
    if (!sidebarRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(menuItemsRef.current.filter(Boolean), {
        x: -20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.06,
        ease: 'power3.out',
        delay: 0.3,
      });
    }, sidebarRef);
    return () => ctx.revert();
  }, []);

  const isActive = (href: string) => pathname === href;

  const SidebarContent = ({ onClose: onCloseDrawer }: { onClose?: () => void }) => (
    <Box
      ref={sidebarRef}
      w={sidebarWidth}
      h="100vh"
      bg="navy.900"
      borderRight="1px solid rgba(255,255,255,0.06)"
      display="flex"
      flexDir="column"
      position="fixed"
      left={0}
      top={0}
      zIndex={20}
      overflow="hidden"
    >
      {/* Ambient glow */}
      <Box
        position="absolute"
        top="-10%"
        left="-20%"
        w="300px"
        h="300px"
        borderRadius="full"
        bg="radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 70%)"
        pointerEvents="none"
      />

      {/* Logo */}
      <Box px={6} pt={6} pb={8} flexShrink={0}>
        <HStack spacing={3}>
          <Box
            w={10}
            h={10}
            borderRadius="xl"
            bg="linear-gradient(135deg, #06b6d4 0%, #8b5cf6 100%)"
            display="flex"
            alignItems="center"
            justifyContent="center"
            boxShadow="0 0 20px rgba(6,182,212,0.35)"
            flexShrink={0}
          >
            <FaTooth size={18} color="white" />
          </Box>
          <Box>
            <Text color="white" fontSize="md" fontWeight="700" lineHeight={1} letterSpacing="-0.02em">
              DentalCare
            </Text>
            <Text color="whiteAlpha.400" fontSize="xs" mt={0.5}>
              Management System
            </Text>
          </Box>
        </HStack>
      </Box>

      {/* Divider */}
      <Box mx={6} h="1px" bg="rgba(255,255,255,0.06)" mb={4} flexShrink={0} />

      {/* Nav section label */}
      <Text
        px={6}
        mb={2}
        fontSize="10px"
        fontWeight="700"
        letterSpacing="0.12em"
        color="whiteAlpha.300"
        textTransform="uppercase"
        flexShrink={0}
      >
        Navigation
      </Text>

      {/* Menu Items */}
      <Box flex={1} overflowY="auto" px={3} pb={4}>
        <VStack spacing={1} align="stretch">
          {menuItems.map((item, i) => {
            const active = isActive(item.href);
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const accent = colorAccents[item.icon] || 'cyan';
            return (
              <Box
                key={item.label}
                ref={(el) => { menuItemsRef.current[i] = el; }}
                px={4}
                py={3}
                borderRadius="xl"
                cursor="pointer"
                position="relative"
                overflow="hidden"
                bg={active
                  ? `rgba(6,182,212,0.12)`
                  : 'transparent'
                }
                border="1px solid"
                borderColor={active ? 'rgba(6,182,212,0.25)' : 'transparent'}
                _hover={{
                  bg: active ? `rgba(6,182,212,0.15)` : 'rgba(255,255,255,0.05)',
                  borderColor: active ? 'rgba(6,182,212,0.3)' : 'rgba(255,255,255,0.08)',
                }}
                onClick={() => {
                  router.push(item.href);
                  onCloseDrawer?.();
                }}
                transition="all 0.2s ease"
              >
                {active && (
                  <Box
                    position="absolute"
                    left={0}
                    top="15%"
                    bottom="15%"
                    w="3px"
                    borderRadius="full"
                    bg="linear-gradient(180deg, #06b6d4, #8b5cf6)"
                  />
                )}
                <HStack spacing={3} justify="space-between">
                  <HStack spacing={3}>
                    <Box
                      w={8}
                      h={8}
                      borderRadius="lg"
                      bg={active
                        ? `rgba(6,182,212,0.2)`
                        : 'rgba(255,255,255,0.05)'
                      }
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      flexShrink={0}
                      transition="all 0.2s"
                    >
                      <Icon
                        as={iconMap[item.icon]}
                        boxSize={4}
                        color={active ? 'cyan.400' : 'whiteAlpha.500'}
                        transition="color 0.2s"
                      />
                    </Box>
                    <Text
                      fontSize="sm"
                      fontWeight={active ? '600' : '500'}
                      color={active ? 'white' : 'whiteAlpha.600'}
                      transition="color 0.2s"
                    >
                      {item.label}
                    </Text>
                  </HStack>
                  {item.label === 'Notifications' && hasPermission(user?.role || 'patient', 'notifications', 'view') && (
                    <Badge
                      bg="rose.500"
                      color="white"
                      borderRadius="full"
                      fontSize="9px"
                      px={2}
                      py={0.5}
                      minW="18px"
                      textAlign="center"
                    >
                      12
                    </Badge>
                  )}
                  {active && (
                    <Icon as={FiChevronRight} color="cyan.400" boxSize={3.5} />
                  )}
                </HStack>
              </Box>
            );
          })}
        </VStack>
      </Box>

      {/* User Profile Card */}
      <Box px={3} pb={6} flexShrink={0}>
        <Box mx={0} h="1px" bg="rgba(255,255,255,0.06)" mb={4} />
        <Box
          px={4}
          py={3}
          borderRadius="xl"
          bg="rgba(255,255,255,0.04)"
          border="1px solid rgba(255,255,255,0.07)"
          cursor="pointer"
          _hover={{ bg: 'rgba(255,255,255,0.07)' }}
          transition="all 0.2s"
          onClick={handleLogout}
        >
          <HStack spacing={3}>
            <Avatar
              size="sm"
              name={user?.name}
              bg="linear-gradient(135deg, #06b6d4, #8b5cf6)"
              flexShrink={0}
            />
            <Box flex={1} minW={0}>
              <Text fontSize="sm" fontWeight="600" color="white" isTruncated>
                {user?.name || 'User'}
              </Text>
              <Text fontSize="xs" color="whiteAlpha.400" isTruncated>
                {user?.role === 'admin' ? 'Administrator' :
                 user?.role === 'dentist' ? 'Dentist' :
                 user?.role === 'staff' ? 'Staff' : 'Patient'}
              </Text>
            </Box>
            <Icon as={FiLogOut} color="whiteAlpha.400" boxSize={4} flexShrink={0} />
          </HStack>
        </Box>
      </Box>
    </Box>
  );

  return (
    <Box minH="100vh" bg="#080d1a">
      {/* Desktop Sidebar */}
      <Box display={{ base: 'none', lg: 'block' }}>
        <SidebarContent />
      </Box>

      {/* Main Content */}
      <Box ml={mainMarginLeft} minH="100vh">
        {/* Header */}
        <Box
          bg="rgba(8,13,26,0.92)"
          backdropFilter="blur(16px)"
          px={{ base: 4, md: 8 }}
          py={4}
          borderBottom="1px solid rgba(255,255,255,0.06)"
          position="sticky"
          top={0}
          zIndex={10}
          boxShadow="0 2px 16px rgba(0,0,0,0.3)"
        >
          <Flex justify="space-between" align="center" gap={4}>
            {/* Mobile menu */}
            <IconButton
              aria-label="Open menu"
              icon={<FiMenu />}
              display={{ base: 'flex', lg: 'none' }}
              variant="ghost"
              color="whiteAlpha.700"
              size="sm"
              borderRadius="xl"
              _hover={{ bg: 'rgba(255,255,255,0.07)', color: 'white' }}
              onClick={onOpen}
            />

            {/* Search */}
            <InputGroup maxW={{ base: '200px', md: '360px' }} display={{ base: 'none', sm: 'flex' }}>
              <InputLeftElement pointerEvents="none" h="full">
                <Icon as={FiSearch} color="whiteAlpha.400" boxSize={4} />
              </InputLeftElement>
              <Input
                placeholder="Search patients, appointments..."
                bg="rgba(255,255,255,0.05)"
                border="1.5px solid rgba(255,255,255,0.1)"
                borderRadius="xl"
                fontSize="sm"
                color="white"
                pl={10}
                h={10}
                _focus={{
                  bg: 'rgba(6,182,212,0.06)',
                  borderColor: 'cyan.500',
                  boxShadow: '0 0 0 3px rgba(6,182,212,0.15)',
                }}
                _hover={{ borderColor: 'rgba(255,255,255,0.2)' }}
                _placeholder={{ color: 'whiteAlpha.300' }}
              />
            </InputGroup>

            {/* Right Side */}
            <HStack spacing={2} ml="auto">
              {/* Notifications */}
              <Box position="relative">
                <IconButton
                  aria-label="Notifications"
                  icon={<FiBell />}
                  variant="ghost"
                  size="sm"
                  borderRadius="xl"
                  color="whiteAlpha.600"
                  _hover={{ bg: 'rgba(255,255,255,0.07)', color: 'white' }}
                />
                <Box
                  position="absolute"
                  top={1}
                  right={1}
                  w={2.5}
                  h={2.5}
                  borderRadius="full"
                  bg="rose.500"
                  border="2px solid #080d1a"
                />
              </Box>

              {/* User Menu */}
              <Menu>
                <MenuButton>
                  <HStack
                    spacing={3}
                    cursor="pointer"
                    px={3}
                    py={2}
                    borderRadius="xl"
                    border="1px solid rgba(255,255,255,0.1)"
                    bg="rgba(255,255,255,0.05)"
                    _hover={{ bg: 'rgba(255,255,255,0.08)', borderColor: 'rgba(255,255,255,0.15)' }}
                    transition="all 0.2s"
                  >
                    <Avatar
                      size="xs"
                      name={user?.name}
                      bg="linear-gradient(135deg, #06b6d4, #8b5cf6)"
                    />
                    <Box display={{ base: 'none', sm: 'block' }}>
                      <Text fontSize="sm" fontWeight="600" color="white" lineHeight={1}>
                        {user?.name?.split(' ')[0] || 'User'}
                      </Text>
                      <Text fontSize="xs" color="whiteAlpha.400" mt={0.5}>
                        {user?.role === 'admin' ? 'Admin' :
                         user?.role === 'dentist' ? 'Dentist' :
                         user?.role === 'staff' ? 'Staff' : 'Patient'}
                      </Text>
                    </Box>
                  </HStack>
                </MenuButton>
                <MenuList
                  minW="180px"
                  bg="#0f1629"
                  border="1px solid rgba(255,255,255,0.1)"
                  boxShadow="0 16px 48px rgba(0,0,0,0.5)"
                >
                  <MenuItem
                    icon={<Icon as={FiUser} boxSize={4} />}
                    fontSize="sm"
                    bg="transparent"
                    color="whiteAlpha.800"
                    _hover={{ bg: 'rgba(255,255,255,0.07)', color: 'white' }}
                  >
                    Profile
                  </MenuItem>
                  <MenuItem
                    icon={<Icon as={FiSettings} boxSize={4} />}
                    fontSize="sm"
                    bg="transparent"
                    color="whiteAlpha.800"
                    _hover={{ bg: 'rgba(255,255,255,0.07)', color: 'white' }}
                  >
                    Settings
                  </MenuItem>
                  <Divider my={1} borderColor="rgba(255,255,255,0.07)" />
                  <MenuItem
                    icon={<Icon as={FiLogOut} boxSize={4} color="rose.400" />}
                    onClick={handleLogout}
                    color="rose.400"
                    fontSize="sm"
                    bg="transparent"
                    _hover={{ bg: 'rgba(244,63,94,0.1)' }}
                  >
                    Logout
                  </MenuItem>
                </MenuList>
              </Menu>
            </HStack>
          </Flex>
        </Box>

        {/* Page Content */}
        <Box p={{ base: 4, md: 8 }}>
          {children}
        </Box>
      </Box>

      {/* Mobile Drawer */}
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay backdropFilter="blur(4px)" bg="blackAlpha.600" />
        <DrawerContent bg="transparent" boxShadow="none" maxW={sidebarWidth} p={0}>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
    </Box>
  );
}
