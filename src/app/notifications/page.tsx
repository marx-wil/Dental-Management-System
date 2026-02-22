'use client';

import React, { useState } from 'react';
import {
  Box,
  Container,
  VStack,
  HStack,
  Heading,
  Text,
  Button,
  Badge,
  Icon,
  Card,
  CardBody,
  CardHeader,
  Avatar,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Grid,
} from '@chakra-ui/react';
import {
  FiBell,
  FiMoreVertical,
  FiTrash2,
  FiCheck,
  FiClock,
  FiInfo,
  FiCalendar,
  FiDollarSign,
  FiPackage,
  FiUser,
} from 'react-icons/fi';
import Layout from '../components/Layout';
import ProtectedRoute from '../components/ProtectedRoute';

interface Notification {
  id: string;
  type: 'appointment' | 'payment' | 'inventory' | 'system' | 'patient';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  priority: 'low' | 'medium' | 'high';
  actionUrl?: string;
  avatar?: string;
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'appointment',
    title: 'Appointment Reminder',
    message: 'Maria Santos has an appointment tomorrow at 9:00 AM for dental cleaning.',
    timestamp: '2024-01-15T10:30:00Z',
    isRead: false,
    priority: 'high',
    actionUrl: '/appointments',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
  },
  {
    id: '2',
    type: 'payment',
    title: 'Payment Overdue',
    message: 'Carlos Mendoza has an overdue payment of ₱3,298.25 for invoice INV-2024-002.',
    timestamp: '2024-01-15T09:15:00Z',
    isRead: false,
    priority: 'high',
    actionUrl: '/billing',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
  },
  {
    id: '3',
    type: 'inventory',
    title: 'Low Stock Alert',
    message: 'Dental Gloves (Latex) are running low. Current stock: 5 boxes (minimum: 10).',
    timestamp: '2024-01-15T08:45:00Z',
    isRead: true,
    priority: 'medium',
    actionUrl: '/inventory',
  },
  {
    id: '4',
    type: 'patient',
    title: 'New Patient Registration',
    message: 'Luis Garcia has registered as a new patient and scheduled their first appointment.',
    timestamp: '2024-01-14T16:20:00Z',
    isRead: true,
    priority: 'low',
    actionUrl: '/patients',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
  },
  {
    id: '5',
    type: 'system',
    title: 'System Maintenance',
    message: 'Scheduled system maintenance will occur tonight from 11:00 PM to 1:00 AM.',
    timestamp: '2024-01-14T14:30:00Z',
    isRead: true,
    priority: 'medium',
  },
  {
    id: '6',
    type: 'appointment',
    title: 'Appointment Cancelled',
    message: 'Ana Rodriguez cancelled her appointment scheduled for today at 2:00 PM.',
    timestamp: '2024-01-14T11:15:00Z',
    isRead: true,
    priority: 'medium',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
  },
];

const cardStyle = {
  bg: "rgba(15,22,41,0.7)",
  border: "1px solid",
  borderColor: "rgba(255,255,255,0.07)",
  backdropFilter: "blur(12px)",
  borderRadius: "2xl",
  _hover: { borderColor: "rgba(255,255,255,0.12)" },
} as const;

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [activeTab, setActiveTab] = useState(0);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'appointment': return FiCalendar;
      case 'payment': return FiDollarSign;
      case 'inventory': return FiPackage;
      case 'system': return FiInfo;
      case 'patient': return FiUser;
      default: return FiBell;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'red';
      case 'medium': return 'yellow';
      case 'low': return 'green';
      default: return 'gray';
    }
  };

  const markAsRead = (notificationId: string) => {
    setNotifications(notifications.map(notif =>
      notif.id === notificationId ? { ...notif, isRead: true } : notif
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, isRead: true })));
  };

  const deleteNotification = (notificationId: string) => {
    setNotifications(notifications.filter(notif => notif.id !== notificationId));
  };

  const getFilteredNotifications = () => {
    switch (activeTab) {
      case 0: return notifications; // All
      case 1: return notifications.filter(notif => !notif.isRead); // Unread
      case 2: return notifications.filter(notif => notif.type === 'appointment'); // Appointments
      case 3: return notifications.filter(notif => notif.type === 'payment'); // Payments
      case 4: return notifications.filter(notif => notif.type === 'inventory'); // Inventory
      case 5: return notifications.filter(notif => notif.type === 'system'); // System
      default: return notifications;
    }
  };

  const unreadCount = notifications.filter(notif => !notif.isRead).length;

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    if (diffInHours < 48) return 'Yesterday';
    return date.toLocaleDateString();
  };

  return (
    <ProtectedRoute>
      <Layout>
        <Container maxW="4xl" py={8}>
          <VStack spacing={8} align="stretch">
            {/* Header */}
            <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={4}>
              <Box>
                <Heading size="lg" color="white">Notifications</Heading>
                <Text color="whiteAlpha.700">
                  Stay updated with clinic activities and important alerts
                  {unreadCount > 0 && (
                    <Badge ml={2} colorScheme="red" variant="solid">
                      {unreadCount} unread
                    </Badge>
                  )}
                </Text>
              </Box>
              <HStack spacing={2}>
                {unreadCount > 0 && (
                  <Button
                    size="sm"
                    variant="ghost"
                    color="whiteAlpha.600"
                    _hover={{ bg: "rgba(255,255,255,0.07)" }}
                    onClick={markAllAsRead}
                  >
                    Mark All as Read
                  </Button>
                )}
                <Button
                  size="sm"
                  bgGradient="linear(135deg, cyan.500, violet.500)"
                  color="white"
                  _hover={{ bgGradient: "linear(135deg, cyan.400, violet.400)", boxShadow: "0 0 20px rgba(6,182,212,0.3)" }}
                  leftIcon={<FiBell />}
                >
                  Notification Settings
                </Button>
              </HStack>
            </Grid>

            <Tabs index={activeTab} onChange={setActiveTab}>
              <TabList borderBottom="1px solid rgba(255,255,255,0.07)">
                <Tab
                  color="whiteAlpha.500"
                  _selected={{ color: "white", borderColor: "cyan.400" }}
                  _hover={{ color: "whiteAlpha.800" }}
                >
                  All
                </Tab>
                <Tab
                  color="whiteAlpha.500"
                  _selected={{ color: "white", borderColor: "cyan.400" }}
                  _hover={{ color: "whiteAlpha.800" }}
                >
                  Unread
                  {unreadCount > 0 && (
                    <Badge ml={2} colorScheme="red" variant="solid" size="sm">
                      {unreadCount}
                    </Badge>
                  )}
                </Tab>
                <Tab
                  color="whiteAlpha.500"
                  _selected={{ color: "white", borderColor: "cyan.400" }}
                  _hover={{ color: "whiteAlpha.800" }}
                >
                  Appointments
                </Tab>
                <Tab
                  color="whiteAlpha.500"
                  _selected={{ color: "white", borderColor: "cyan.400" }}
                  _hover={{ color: "whiteAlpha.800" }}
                >
                  Payments
                </Tab>
                <Tab
                  color="whiteAlpha.500"
                  _selected={{ color: "white", borderColor: "cyan.400" }}
                  _hover={{ color: "whiteAlpha.800" }}
                >
                  Inventory
                </Tab>
                <Tab
                  color="whiteAlpha.500"
                  _selected={{ color: "white", borderColor: "cyan.400" }}
                  _hover={{ color: "whiteAlpha.800" }}
                >
                  System
                </Tab>
              </TabList>

              <TabPanels>
                <TabPanel px={0}>
                  <VStack spacing={4} align="stretch">
                    {getFilteredNotifications().length === 0 ? (
                      <Card {...cardStyle}>
                        <CardBody textAlign="center" py={12}>
                          <Icon as={FiBell} boxSize={12} color="whiteAlpha.300" mb={4} />
                          <Text color="whiteAlpha.700">No notifications found</Text>
                        </CardBody>
                      </Card>
                    ) : (
                      getFilteredNotifications().map((notification) => (
                        <Card
                          key={notification.id}
                          bg="rgba(15,22,41,0.7)"
                          border="1px solid"
                          borderColor="rgba(255,255,255,0.07)"
                          backdropFilter="blur(12px)"
                          borderRadius="2xl"
                          borderLeft={!notification.isRead ? '4px solid' : undefined}
                          borderLeftColor={!notification.isRead ? 'cyan.500' : undefined}
                          _hover={{ borderColor: "rgba(255,255,255,0.12)" }}
                          transition="all 0.2s"
                        >
                          <CardBody>
                            <HStack spacing={4} align="start">
                              {notification.avatar ? (
                                <Avatar size="sm" src={notification.avatar} />
                              ) : (
                                <Box
                                  p={2}
                                  bg="rgba(6,182,212,0.12)"
                                  borderRadius="full"
                                  color="cyan.400"
                                >
                                  <Icon as={getNotificationIcon(notification.type)} />
                                </Box>
                              )}

                              <Box flex={1}>
                                <HStack justify="space-between" mb={2}>
                                  <HStack spacing={2}>
                                    <Text fontWeight="medium" fontSize="sm" color="white">
                                      {notification.title}
                                    </Text>
                                    <Badge
                                      colorScheme={getPriorityColor(notification.priority)}
                                      size="sm"
                                    >
                                      {notification.priority}
                                    </Badge>
                                    {!notification.isRead && (
                                      <Badge colorScheme="blue" variant="solid" size="sm">
                                        New
                                      </Badge>
                                    )}
                                  </HStack>
                                  <Menu>
                                    <MenuButton
                                      as={IconButton}
                                      icon={<FiMoreVertical />}
                                      variant="ghost"
                                      size="sm"
                                      color="whiteAlpha.600"
                                      _hover={{ bg: "rgba(255,255,255,0.07)" }}
                                    />
                                    <MenuList
                                      bg="#0f1629"
                                      border="1px solid rgba(255,255,255,0.1)"
                                      boxShadow="0 16px 40px rgba(0,0,0,0.5)"
                                    >
                                      {!notification.isRead && (
                                        <MenuItem
                                          icon={<FiCheck />}
                                          bg="transparent"
                                          color="whiteAlpha.800"
                                          _hover={{ bg: "rgba(255,255,255,0.07)", color: "white" }}
                                          onClick={() => markAsRead(notification.id)}
                                        >
                                          Mark as Read
                                        </MenuItem>
                                      )}
                                      <MenuItem
                                        icon={<FiTrash2 />}
                                        color="red.400"
                                        bg="transparent"
                                        _hover={{ bg: "rgba(255,255,255,0.07)", color: "red.300" }}
                                        onClick={() => deleteNotification(notification.id)}
                                      >
                                        Delete
                                      </MenuItem>
                                    </MenuList>
                                  </Menu>
                                </HStack>

                                <Text fontSize="sm" color="whiteAlpha.700" mb={2}>
                                  {notification.message}
                                </Text>

                                <HStack justify="space-between">
                                  <HStack spacing={4}>
                                    <HStack spacing={1}>
                                      <Icon as={FiClock} boxSize={3} color="whiteAlpha.400" />
                                      <Text fontSize="xs" color="whiteAlpha.400">
                                        {formatTimestamp(notification.timestamp)}
                                      </Text>
                                    </HStack>
                                    {notification.actionUrl && (
                                      <Button
                                        size="xs"
                                        variant="outline"
                                        colorScheme="cyan"
                                      >
                                        View Details
                                      </Button>
                                    )}
                                  </HStack>
                                </HStack>
                              </Box>
                            </HStack>
                          </CardBody>
                        </Card>
                      ))
                    )}
                  </VStack>
                </TabPanel>
              </TabPanels>
            </Tabs>

            {/* Quick Actions */}
            <Card {...cardStyle}>
              <CardHeader>
                <Heading size="md" color="white">Quick Actions</Heading>
              </CardHeader>
              <CardBody>
                <HStack spacing={4} wrap="wrap">
                  <Button
                    leftIcon={<FiCalendar />}
                    variant="outline"
                    colorScheme="cyan"
                  >
                    Schedule Appointment
                  </Button>
                  <Button
                    leftIcon={<FiDollarSign />}
                    variant="outline"
                    colorScheme="cyan"
                  >
                    Process Payment
                  </Button>
                  <Button
                    leftIcon={<FiPackage />}
                    variant="outline"
                    colorScheme="cyan"
                  >
                    Check Inventory
                  </Button>
                  <Button
                    leftIcon={<FiUser />}
                    variant="outline"
                    colorScheme="cyan"
                  >
                    Add Patient
                  </Button>
                </HStack>
              </CardBody>
            </Card>
          </VStack>
        </Container>
      </Layout>
    </ProtectedRoute>
  );
}
