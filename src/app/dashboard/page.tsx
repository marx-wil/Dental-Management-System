"use client";

import React from "react";
import {
  Box,
  Container,
  Grid,
  GridItem,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Text,
  VStack,
  HStack,
  Badge,
  Progress,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Avatar,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
} from "@chakra-ui/stat";
import {
  FiUsers,
  FiCalendar,
  FiDollarSign,
  FiActivity,
  FiTrendingUp,
  FiTrendingDown,
  FiClock,
  FiCheckCircle,
  FiAlertCircle,
  FiPackage,
  FiFileText,
} from "react-icons/fi";
import { useAuth } from "../contexts/AuthContext";
import Layout from "../components/Layout";
import ProtectedRoute from "../components/ProtectedRoute";
import RoleGuard from "../components/RoleGuard";
import { hasPermission } from "../utils/permissions";

// Type definitions
interface Appointment {
  patient: string;
  time: string;
  dentist?: string;
  type: string;
  status: string;
}

export default function DashboardPage() {
  const { user } = useAuth();
  const cardBg = useColorModeValue("white", "gray.800");

  // Mock data based on user role
  const getDashboardData = () => {
    const baseData = {
      admin: {
        stats: [
          {
            label: "Total Patients",
            value: "1,247",
            change: "+12%",
            trend: "up",
          },
          {
            label: "Monthly Revenue",
            value: "₱245,680",
            change: "+8%",
            trend: "up",
          },
          {
            label: "Active Appointments",
            value: "89",
            change: "+5%",
            trend: "up",
          },
          {
            label: "Staff Members",
            value: "12",
            change: "0%",
            trend: "neutral",
          },
        ],
        recentActivity: [
          {
            type: "New Patient",
            description: "Maria Santos registered",
            time: "2 hours ago",
          },
          {
            type: "Appointment",
            description: "Dr. Juan completed treatment",
            time: "3 hours ago",
          },
          {
            type: "Payment",
            description: "₱2,500 payment received",
            time: "4 hours ago",
          },
          {
            type: "Inventory",
            description: "Low stock alert: Dental gloves",
            time: "5 hours ago",
          },
        ],
        upcomingAppointments: [
          {
            patient: "Carlos Mendoza",
            time: "9:00 AM",
            dentist: "Dr. Juan",
            type: "Cleaning",
            status: "confirmed",
          },
          {
            patient: "Ana Rodriguez",
            time: "10:30 AM",
            dentist: "Dr. Maria",
            type: "Filling",
            status: "confirmed",
          },
          {
            patient: "Luis Garcia",
            time: "2:00 PM",
            dentist: "Dr. Juan",
            type: "Extraction",
            status: "pending",
          },
        ] as Appointment[],
      },
      dentist: {
        stats: [
          { label: "My Patients", value: "156", change: "+3%", trend: "up" },
          {
            label: "Today&apos;s Appointments",
            value: "8",
            change: "+1",
            trend: "up",
          },
          {
            label: "Completed Treatments",
            value: "23",
            change: "+5%",
            trend: "up",
          },
          { label: "Pending Charts", value: "4", change: "-2", trend: "down" },
        ],
        recentActivity: [
          {
            type: "Treatment",
            description: "Completed root canal for Patient #1234",
            time: "1 hour ago",
          },
          {
            type: "Chart Update",
            description: "Updated dental chart for Patient #1235",
            time: "2 hours ago",
          },
          {
            type: "Prescription",
            description: "Prescribed antibiotics for Patient #1236",
            time: "3 hours ago",
          },
        ],
        upcomingAppointments: [
          {
            patient: "Carlos Mendoza",
            time: "9:00 AM",
            dentist: "Dr. Juan",
            type: "Cleaning",
            status: "confirmed",
          },
          {
            patient: "Ana Rodriguez",
            time: "10:30 AM",
            dentist: "Dr. Maria",
            type: "Filling",
            status: "confirmed",
          },
          {
            patient: "Luis Garcia",
            time: "2:00 PM",
            dentist: "Dr. Juan",
            type: "Extraction",
            status: "pending",
          },
        ] as Appointment[],
      },
      staff: {
        stats: [
          { label: "Scheduled Today", value: "24", change: "+2", trend: "up" },
          { label: "Walk-ins", value: "3", change: "+1", trend: "up" },
          { label: "Completed", value: "18", change: "+4", trend: "up" },
          { label: "No-shows", value: "2", change: "-1", trend: "down" },
        ],
        recentActivity: [
          {
            type: "Scheduling",
            description: "Scheduled appointment for new patient",
            time: "30 min ago",
          },
          {
            type: "Payment",
            description: "Processed payment of ₱1,500",
            time: "1 hour ago",
          },
          {
            type: "Reminder",
            description: "Sent SMS reminder to 5 patients",
            time: "2 hours ago",
          },
        ],
        upcomingAppointments: [
          {
            patient: "Carlos Mendoza",
            time: "9:00 AM",
            dentist: "Dr. Juan",
            type: "Cleaning",
            status: "confirmed",
          },
          {
            patient: "Ana Rodriguez",
            time: "10:30 AM",
            dentist: "Dr. Maria",
            type: "Filling",
            status: "confirmed",
          },
          {
            patient: "Luis Garcia",
            time: "2:00 PM",
            dentist: "Dr. Juan",
            type: "Extraction",
            status: "pending",
          },
        ] as Appointment[],
      },
      patient: {
        stats: [
          {
            label: "Next Appointment",
            value: "Dec 15",
            change: "2 days",
            trend: "neutral",
          },
          { label: "Total Visits", value: "12", change: "+1", trend: "up" },
          {
            label: "Outstanding Balance",
            value: "₱0",
            change: "Paid",
            trend: "neutral",
          },
          {
            label: "Treatment Plan",
            value: "Active",
            change: "2 items",
            trend: "neutral",
          },
        ],
        recentActivity: [
          {
            type: "Appointment",
            description: "Cleaning appointment completed",
            time: "1 week ago",
          },
          {
            type: "Payment",
            description: "Payment of ₱800 processed",
            time: "1 week ago",
          },
          {
            type: "Prescription",
            description: "New prescription uploaded",
            time: "2 weeks ago",
          },
        ],
        upcomingAppointments: [
          {
            patient: "You",
            time: "Dec 15, 2:00 PM",
            dentist: "Dr. Juan",
            type: "Check-up",
            status: "confirmed",
          },
        ] as Appointment[],
      },
    };

    return baseData[user?.role || "patient"];
  };

  const data = getDashboardData();

  const getStatIcon = (label: string) => {
    if (label.includes("Patient")) return FiUsers;
    if (label.includes("Revenue") || label.includes("Payment"))
      return FiDollarSign;
    if (label.includes("Appointment")) return FiCalendar;
    if (label.includes("Treatment") || label.includes("Chart"))
      return FiActivity;
    return FiActivity;
  };

  const getActivityIcon = (type: string) => {
    if (type.includes("Patient") || type.includes("Appointment"))
      return FiUsers;
    if (type.includes("Payment")) return FiDollarSign;
    if (type.includes("Treatment") || type.includes("Chart")) return FiActivity;
    return FiActivity;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "green";
      case "pending":
        return "yellow";
      case "cancelled":
        return "red";
      default:
        return "blue";
    }
  };

  return (
    <ProtectedRoute>
      <Layout>
        <VStack spacing={8} align="stretch">
          {/* Welcome Header */}
          <Box>
            <Heading size="xl" mb={2} color="gray.800">
              Welcome back, {user?.name}!
            </Heading>
            <Text color="gray.600" fontSize="lg">
              Here&apos;s what&apos;s happening at your{" "}
              {user?.role === "patient" ? "appointments" : "clinic"} today.
            </Text>
          </Box>

          {/* Stats Grid */}
          <Grid
            templateColumns={{
              base: "1fr",
              md: "repeat(2, 1fr)",
              lg: "repeat(4, 1fr)",
            }}
            gap={6}
          >
            {data.stats.map((stat, index) => {
              // Hide certain stats based on role permissions
              const shouldHideStat = () => {
                if (stat.label.includes('Revenue') && !hasPermission(user?.role || 'patient', 'billing', 'view')) {
                  return true;
                }
                if (stat.label.includes('Staff') && !hasPermission(user?.role || 'patient', 'settings', 'view')) {
                  return true;
                }
                if (stat.label.includes('Inventory') && !hasPermission(user?.role || 'patient', 'inventory', 'view')) {
                  return true;
                }
                return false;
              };

              if (shouldHideStat()) {
                return null;
              }

              return (
              <GridItem key={index}>
                <Card
                  bg={cardBg}
                  borderRadius="2xl"
                  boxShadow="lg"
                  _hover={{ transform: "translateY(-2px)", boxShadow: "xl" }}
                  transition="all 0.3s ease"
                  border="1px"
                  borderColor="gray.100"
                >
                  <CardBody p={6}>
                    <HStack justify="space-between" align="start" mb={4}>
                      <Box
                        p={3}
                        borderRadius="xl"
                        bg={
                          stat.trend === "up"
                            ? "green.50"
                            : stat.trend === "down"
                            ? "red.50"
                            : "blue.50"
                        }
                      >
                        <Icon
                          as={getStatIcon(stat.label)}
                          boxSize={6}
                          color={
                            stat.trend === "up"
                              ? "green.500"
                              : stat.trend === "down"
                              ? "red.500"
                              : "blue.500"
                          }
                        />
                      </Box>
                      <Badge
                        colorScheme={
                          stat.trend === "up"
                            ? "green"
                            : stat.trend === "down"
                            ? "red"
                            : "blue"
                        }
                        borderRadius="full"
                        px={3}
                        py={1}
                        fontSize="xs"
                      >
                        <Stat>
                          <StatArrow
                            type={
                              stat.trend === "up"
                                ? "increase"
                                : stat.trend === "down"
                                ? "decrease"
                                : undefined
                            }
                          />
                        </Stat>
                      </Badge>
                    </HStack>
                    <VStack align="start" spacing={1}>
                      <Text fontSize="sm" color="gray.600" fontWeight="medium">
                        {stat.label}
                      </Text>
                      <Text fontSize="3xl" fontWeight="bold" color="gray.800">
                        {stat.value}
                      </Text>
                    </VStack>
                  </CardBody>
                </Card>
              </GridItem>
              );
            })}
          </Grid>

          <Grid 
            templateColumns={{ 
              base: "1fr", 
              lg: hasPermission(user?.role || 'patient', 'patients', 'view') && hasPermission(user?.role || 'patient', 'appointments', 'view') 
                ? "2fr 1fr" 
                : "1fr" 
            }} 
            gap={8}
          >
            {/* Recent Activity - Only show for users with access to view activity */}
            <RoleGuard requiredPermission={{ module: 'patients', action: 'view' }}>
              <GridItem>
                <Card
                  bg={cardBg}
                  borderRadius="2xl"
                  boxShadow="lg"
                  border="1px"
                  borderColor="gray.100"
                >
                  <CardHeader pb={4}>
                    <Heading size="lg" color="gray.800">
                      Recent Activity
                    </Heading>
                  </CardHeader>
                  <CardBody pt={0}>
                    <VStack spacing={4} align="stretch">
                      {data.recentActivity.map((activity, index) => (
                        <HStack
                          key={index}
                          spacing={4}
                          p={4}
                          bg="gray.50"
                          borderRadius="xl"
                          _hover={{ bg: "gray.100" }}
                          transition="all 0.2s"
                        >
                          <Box p={2} borderRadius="lg" bg="dental.50">
                            <Icon
                              as={getActivityIcon(activity.type)}
                              color="dental.500"
                              boxSize={5}
                            />
                          </Box>
                          <Box flex={1}>
                            <Text fontWeight="medium" color="gray.800">
                              {activity.description}
                            </Text>
                            <Text fontSize="sm" color="gray.500">
                              {activity.time}
                            </Text>
                          </Box>
                        </HStack>
                      ))}
                    </VStack>
                  </CardBody>
                </Card>
              </GridItem>
            </RoleGuard>

            {/* Upcoming Appointments - Only show for users with access to view appointments */}
            <RoleGuard requiredPermission={{ module: 'appointments', action: 'view' }}>
              <GridItem>
                <Card
                  bg={cardBg}
                  borderRadius="2xl"
                  boxShadow="lg"
                  border="1px"
                  borderColor="gray.100"
                >
                  <CardHeader pb={4}>
                    <Heading size="lg" color="gray.800">
                      Upcoming Appointments
                    </Heading>
                  </CardHeader>
                  <CardBody pt={0}>
                    <VStack spacing={4} align="stretch">
                      {data.upcomingAppointments.map((appointment, index) => (
                        <Box
                          key={index}
                          p={4}
                          border="1px"
                          borderColor="gray.200"
                          borderRadius="xl"
                          bg="white"
                          _hover={{
                            borderColor: "dental.300",
                            transform: "translateY(-1px)",
                          }}
                          transition="all 0.2s"
                        >
                          <HStack justify="space-between" mb={3}>
                            <Text fontWeight="semibold" color="gray.800">
                              {appointment.patient}
                            </Text>
                            {appointment.status && (
                              <Badge
                                colorScheme={getStatusColor(appointment.status)}
                                size="sm"
                                borderRadius="full"
                                px={3}
                                py={1}
                              >
                                {appointment.status}
                              </Badge>
                            )}
                          </HStack>
                          <VStack align="start" spacing={1}>
                            <Text
                              fontSize="sm"
                              color="gray.600"
                              fontWeight="medium"
                            >
                              {appointment.time}
                            </Text>
                            {appointment.dentist && (
                              <Text fontSize="sm" color="gray.500">
                                Dr. {appointment.dentist}
                              </Text>
                            )}
                            <Text
                              fontSize="sm"
                              color="dental.500"
                              fontWeight="semibold"
                            >
                              {appointment.type}
                            </Text>
                          </VStack>
                        </Box>
                      ))}
                    </VStack>
                  </CardBody>
                </Card>
              </GridItem>
            </RoleGuard>
          </Grid>

          {/* Quick Actions - Only show if user has any quick action permissions */}
          <RoleGuard 
            requiredPermission={{ module: 'patients', action: 'create' }}
            fallback={
              (hasPermission(user?.role || 'patient', 'appointments', 'create') || 
               hasPermission(user?.role || 'patient', 'billing', 'process') ||
               hasPermission(user?.role || 'patient', 'inventory', 'manage') ||
               hasPermission(user?.role || 'patient', 'charting', 'create')) ? (
                <Card
                  bg={cardBg}
                  borderRadius="2xl"
                  boxShadow="lg"
                  border="1px"
                  borderColor="gray.100"
                >
                  <CardHeader pb={4}>
                    <Heading size="lg" color="gray.800">
                      Quick Actions
                    </Heading>
                  </CardHeader>
                  <CardBody pt={0}>
                    <Grid
                      templateColumns={{ base: "1fr", md: "repeat(auto-fit, minmax(200px, 1fr))" }}
                      gap={6}
                    >
                      {hasPermission(user?.role || 'patient', 'appointments', 'create') && (
                        <Card
                          variant="outline"
                          borderRadius="xl"
                          border="2px"
                          borderColor="gray.200"
                          _hover={{
                            bg: "dental.50",
                            cursor: "pointer",
                            borderColor: "dental.300",
                            transform: "translateY(-2px)",
                            boxShadow: "lg",
                          }}
                          transition="all 0.3s ease"
                          onClick={() => window.location.href = '/appointments'}
                        >
                          <CardBody textAlign="center" p={6}>
                            <Box
                              p={4}
                              borderRadius="xl"
                              bg="dental.100"
                              display="inline-block"
                              mb={4}
                            >
                              <Icon as={FiCalendar} boxSize={8} color="dental.600" />
                            </Box>
                            <Text fontWeight="semibold" color="gray.800">
                              Schedule Appointment
                            </Text>
                          </CardBody>
                        </Card>
                      )}
                      
                      {hasPermission(user?.role || 'patient', 'billing', 'process') && (
                        <Card
                          variant="outline"
                          borderRadius="xl"
                          border="2px"
                          borderColor="gray.200"
                          _hover={{
                            bg: "dental.50",
                            cursor: "pointer",
                            borderColor: "dental.300",
                            transform: "translateY(-2px)",
                            boxShadow: "lg",
                          }}
                          transition="all 0.3s ease"
                          onClick={() => window.location.href = '/billing'}
                        >
                          <CardBody textAlign="center" p={6}>
                            <Box
                              p={4}
                              borderRadius="xl"
                              bg="dental.100"
                              display="inline-block"
                              mb={4}
                            >
                              <Icon
                                as={FiDollarSign}
                                boxSize={8}
                                color="dental.600"
                              />
                            </Box>
                            <Text fontWeight="semibold" color="gray.800">
                              Process Payment
                            </Text>
                          </CardBody>
                        </Card>
                      )}

                      {hasPermission(user?.role || 'patient', 'inventory', 'manage') && (
                        <Card
                          variant="outline"
                          borderRadius="xl"
                          border="2px"
                          borderColor="gray.200"
                          _hover={{
                            bg: "dental.50",
                            cursor: "pointer",
                            borderColor: "dental.300",
                            transform: "translateY(-2px)",
                            boxShadow: "lg",
                          }}
                          transition="all 0.3s ease"
                          onClick={() => window.location.href = '/inventory'}
                        >
                          <CardBody textAlign="center" p={6}>
                            <Box
                              p={4}
                              borderRadius="xl"
                              bg="dental.100"
                              display="inline-block"
                              mb={4}
                            >
                              <Icon as={FiPackage} boxSize={8} color="dental.600" />
                            </Box>
                            <Text fontWeight="semibold" color="gray.800">
                              Manage Inventory
                            </Text>
                          </CardBody>
                        </Card>
                      )}

                      {hasPermission(user?.role || 'patient', 'charting', 'create') && (
                        <Card
                          variant="outline"
                          borderRadius="xl"
                          border="2px"
                          borderColor="gray.200"
                          _hover={{
                            bg: "dental.50",
                            cursor: "pointer",
                            borderColor: "dental.300",
                            transform: "translateY(-2px)",
                            boxShadow: "lg",
                          }}
                          transition="all 0.3s ease"
                          onClick={() => window.location.href = '/charting'}
                        >
                          <CardBody textAlign="center" p={6}>
                            <Box
                              p={4}
                              borderRadius="xl"
                              bg="dental.100"
                              display="inline-block"
                              mb={4}
                            >
                              <Icon as={FiFileText} boxSize={8} color="dental.600" />
                            </Box>
                            <Text fontWeight="semibold" color="gray.800">
                              Create Treatment Plan
                            </Text>
                          </CardBody>
                        </Card>
                      )}
                    </Grid>
                  </CardBody>
                </Card>
              ) : null
            }
          >
            <Card
              bg={cardBg}
              borderRadius="2xl"
              boxShadow="lg"
              border="1px"
              borderColor="gray.100"
            >
              <CardHeader pb={4}>
                <Heading size="lg" color="gray.800">
                  Quick Actions
                </Heading>
              </CardHeader>
              <CardBody pt={0}>
                <Grid
                  templateColumns={{ base: "1fr", md: "repeat(auto-fit, minmax(200px, 1fr))" }}
                  gap={6}
                >
                  <Card
                    variant="outline"
                    borderRadius="xl"
                    border="2px"
                    borderColor="gray.200"
                    _hover={{
                      bg: "dental.50",
                      cursor: "pointer",
                      borderColor: "dental.300",
                      transform: "translateY(-2px)",
                      boxShadow: "lg",
                    }}
                    transition="all 0.3s ease"
                    onClick={() => window.location.href = '/patients'}
                  >
                    <CardBody textAlign="center" p={6}>
                      <Box
                        p={4}
                        borderRadius="xl"
                        bg="dental.100"
                        display="inline-block"
                        mb={4}
                      >
                        <Icon as={FiUsers} boxSize={8} color="dental.600" />
                      </Box>
                      <Text fontWeight="semibold" color="gray.800">
                        Add Patient
                      </Text>
                    </CardBody>
                  </Card>
                </Grid>
              </CardBody>
            </Card>
          </RoleGuard>
        </VStack>
      </Layout>
    </ProtectedRoute>
  );
}
