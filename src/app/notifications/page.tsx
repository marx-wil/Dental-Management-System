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
  useColorModeValue,
  Card,
  CardBody,
  CardHeader,
  Avatar,
  Divider,
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
} from '@chakra-ui/react';
import {
  FiBell,
  FiMoreVertical,
  FiTrash2,
  FiCheck,
  FiClock,
  FiAlertCircle,
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

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [activeTab, setActiveTab] = useState(0);
  
  const cardBg = useColorModeValue('white', 'gray.800');

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
            <HStack justify="space-between">
              <Box>
                <Heading size="lg">Notifications</Heading>
                <Text color="gray.600">
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
                    variant="outline"
                    onClick={markAllAsRead}
                  >
                    Mark All as Read
                  </Button>
                )}
                <Button
                  size="sm"
                  colorScheme="dental"
                  leftIcon={<FiBell />}
                >
                  Notification Settings
                </Button>
              </HStack>
            </HStack>

            <Tabs index={activeTab} onChange={setActiveTab}>
              <TabList>
                <Tab>All</Tab>
                <Tab>
                  Unread
                  {unreadCount > 0 && (
                    <Badge ml={2} colorScheme="red" variant="solid" size="sm">
                      {unreadCount}
                    </Badge>
                  )}
                </Tab>
                <Tab>Appointments</Tab>
                <Tab>Payments</Tab>
                <Tab>Inventory</Tab>
                <Tab>System</Tab>
              </TabList>

              <TabPanels>
                <TabPanel px={0}>
                  <VStack spacing={4} align="stretch">
                    {getFilteredNotifications().length === 0 ? (
                      <Card bg={cardBg}>
                        <CardBody textAlign="center" py={12}>
                          <Icon as={FiBell} boxSize={12} color="gray.400" mb={4} />
                          <Text color="gray.600">No notifications found</Text>
                        </CardBody>
                      </Card>
                    ) : (
                      getFilteredNotifications().map((notification) => (
                        <Card
                          key={notification.id}
                          bg={cardBg}
                          borderLeft={!notification.isRead ? '4px solid' : 'none'}
                          borderLeftColor="dental.500"
                          _hover={{ shadow: 'md' }}
                          transition="all 0.2s"
                        >
                          <CardBody>
                            <HStack spacing={4} align="start">
                              {notification.avatar ? (
                                <Avatar size="sm" src={notification.avatar} />
                              ) : (
                                <Box
                                  p={2}
                                  bg="dental.100"
                                  borderRadius="full"
                                  color="dental.500"
                                >
                                  <Icon as={getNotificationIcon(notification.type)} />
                                </Box>
                              )}
                              
                              <Box flex={1}>
                                <HStack justify="space-between" mb={2}>
                                  <HStack spacing={2}>
                                    <Text fontWeight="medium" fontSize="sm">
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
                                    />
                                    <MenuList>
                                      {!notification.isRead && (
                                        <MenuItem
                                          icon={<FiCheck />}
                                          onClick={() => markAsRead(notification.id)}
                                        >
                                          Mark as Read
                                        </MenuItem>
                                      )}
                                      <MenuItem
                                        icon={<FiTrash2 />}
                                        color="red.500"
                                        onClick={() => deleteNotification(notification.id)}
                                      >
                                        Delete
                                      </MenuItem>
                                    </MenuList>
                                  </Menu>
                                </HStack>
                                
                                <Text fontSize="sm" color="gray.600" mb={2}>
                                  {notification.message}
                                </Text>
                                
                                <HStack justify="space-between">
                                  <HStack spacing={4}>
                                    <HStack spacing={1}>
                                      <Icon as={FiClock} boxSize={3} color="gray.400" />
                                      <Text fontSize="xs" color="gray.500">
                                        {formatTimestamp(notification.timestamp)}
                                      </Text>
                                    </HStack>
                                    {notification.actionUrl && (
                                      <Button
                                        size="xs"
                                        variant="outline"
                                        colorScheme="dental"
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
            <Card bg={cardBg}>
              <CardHeader>
                <Heading size="md">Quick Actions</Heading>
              </CardHeader>
              <CardBody>
                <HStack spacing={4} wrap="wrap">
                  <Button
                    leftIcon={<FiCalendar />}
                    variant="outline"
                    colorScheme="dental"
                  >
                    Schedule Appointment
                  </Button>
                  <Button
                    leftIcon={<FiDollarSign />}
                    variant="outline"
                    colorScheme="dental"
                  >
                    Process Payment
                  </Button>
                  <Button
                    leftIcon={<FiPackage />}
                    variant="outline"
                    colorScheme="dental"
                  >
                    Check Inventory
                  </Button>
                  <Button
                    leftIcon={<FiUser />}
                    variant="outline"
                    colorScheme="dental"
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
