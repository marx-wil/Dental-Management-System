"use client";

import React from "react";
import {
  Box,
  Grid,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Text,
  VStack,
  HStack,
  Badge,
  Icon,
  GridItem,
} from "@chakra-ui/react";
import {
  FiUsers,
  FiCalendar,
  FiDollarSign,
  FiActivity,
  FiPackage,
  FiFileText,
} from "react-icons/fi";
import { useAuth } from "../contexts/AuthContext";
import Layout from "../components/Layout";
import ProtectedRoute from "../components/ProtectedRoute";
import RoleGuard from "../components/RoleGuard";
import { hasPermission } from "../utils/permissions";
import { darkCard } from "../styles/dashboard";

// Type definitions
interface Appointment {
  patient: string;
  time: string;
  dentist?: string;
  type: string;
  status: string;
}

const cardStyle = {
  ...darkCard,
  borderRadius: "2xl",
};

export default function DashboardPage() {
  const { user } = useAuth();

  // Mock data based on user role
  const getDashboardData = () => {
    const baseData = {
      admin: {
        stats: [
          { label: "Total Patients", value: "1,247", change: "+12%", trend: "up" },
          { label: "Monthly Revenue", value: "₱245,680", change: "+8%", trend: "up" },
          { label: "Active Appointments", value: "89", change: "+5%", trend: "up" },
          { label: "Staff Members", value: "12", change: "0%", trend: "neutral" },
        ],
        recentActivity: [
          { type: "New Patient", description: "Maria Santos registered", time: "2 hours ago" },
          { type: "Appointment", description: "Dr. Juan completed treatment", time: "3 hours ago" },
          { type: "Payment", description: "₱2,500 payment received", time: "4 hours ago" },
          { type: "Inventory", description: "Low stock alert: Dental gloves", time: "5 hours ago" },
        ],
        upcomingAppointments: [
          { patient: "Carlos Mendoza", time: "9:00 AM", dentist: "Dr. Juan", type: "Cleaning", status: "confirmed" },
          { patient: "Ana Rodriguez", time: "10:30 AM", dentist: "Dr. Maria", type: "Filling", status: "confirmed" },
          { patient: "Luis Garcia", time: "2:00 PM", dentist: "Dr. Juan", type: "Extraction", status: "pending" },
        ] as Appointment[],
      },
      dentist: {
        stats: [
          { label: "My Patients", value: "156", change: "+3%", trend: "up" },
          { label: "Today's Appointments", value: "8", change: "+1", trend: "up" },
          { label: "Completed Treatments", value: "23", change: "+5%", trend: "up" },
          { label: "Pending Charts", value: "4", change: "-2", trend: "down" },
        ],
        recentActivity: [
          { type: "Treatment", description: "Completed root canal for Patient #1234", time: "1 hour ago" },
          { type: "Chart Update", description: "Updated dental chart for Patient #1235", time: "2 hours ago" },
          { type: "Prescription", description: "Prescribed antibiotics for Patient #1236", time: "3 hours ago" },
        ],
        upcomingAppointments: [
          { patient: "Carlos Mendoza", time: "9:00 AM", dentist: "Dr. Juan", type: "Cleaning", status: "confirmed" },
          { patient: "Ana Rodriguez", time: "10:30 AM", dentist: "Dr. Maria", type: "Filling", status: "confirmed" },
          { patient: "Luis Garcia", time: "2:00 PM", dentist: "Dr. Juan", type: "Extraction", status: "pending" },
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
          { type: "Scheduling", description: "Scheduled appointment for new patient", time: "30 min ago" },
          { type: "Payment", description: "Processed payment of ₱1,500", time: "1 hour ago" },
          { type: "Reminder", description: "Sent SMS reminder to 5 patients", time: "2 hours ago" },
        ],
        upcomingAppointments: [
          { patient: "Carlos Mendoza", time: "9:00 AM", dentist: "Dr. Juan", type: "Cleaning", status: "confirmed" },
          { patient: "Ana Rodriguez", time: "10:30 AM", dentist: "Dr. Maria", type: "Filling", status: "confirmed" },
          { patient: "Luis Garcia", time: "2:00 PM", dentist: "Dr. Juan", type: "Extraction", status: "pending" },
        ] as Appointment[],
      },
      patient: {
        stats: [
          { label: "Next Appointment", value: "Dec 15", change: "2 days", trend: "neutral" },
          { label: "Total Visits", value: "12", change: "+1", trend: "up" },
          { label: "Outstanding Balance", value: "₱0", change: "Paid", trend: "neutral" },
          { label: "Treatment Plan", value: "Active", change: "2 items", trend: "neutral" },
        ],
        recentActivity: [
          { type: "Appointment", description: "Cleaning appointment completed", time: "1 week ago" },
          { type: "Payment", description: "Payment of ₱800 processed", time: "1 week ago" },
          { type: "Prescription", description: "New prescription uploaded", time: "2 weeks ago" },
        ],
        upcomingAppointments: [
          { patient: "You", time: "Dec 15, 2:00 PM", dentist: "Dr. Juan", type: "Check-up", status: "confirmed" },
        ] as Appointment[],
      },
    };

    return baseData[user?.role || "patient"];
  };

  const data = getDashboardData();

  const getStatIcon = (label: string) => {
    if (label.includes("Patient")) return FiUsers;
    if (label.includes("Revenue") || label.includes("Payment")) return FiDollarSign;
    if (label.includes("Appointment")) return FiCalendar;
    if (label.includes("Treatment") || label.includes("Chart")) return FiActivity;
    return FiActivity;
  };

  const getActivityIcon = (type: string) => {
    if (type.includes("Patient") || type.includes("Appointment")) return FiUsers;
    if (type.includes("Payment")) return FiDollarSign;
    if (type.includes("Treatment") || type.includes("Chart")) return FiActivity;
    return FiActivity;
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed": return "green";
      case "pending": return "yellow";
      case "cancelled": return "red";
      default: return "blue";
    }
  };

  const statAccent = (trend: string) => {
    if (trend === "up") return { icon: "rgba(16,185,129,0.15)", color: "emerald.400", badge: "rgba(16,185,129,0.12)", badgeText: "emerald.300" };
    if (trend === "down") return { icon: "rgba(244,63,94,0.15)", color: "rose.400", badge: "rgba(244,63,94,0.12)", badgeText: "rose.300" };
    return { icon: "rgba(6,182,212,0.15)", color: "cyan.400", badge: "rgba(6,182,212,0.12)", badgeText: "cyan.300" };
  };

  return (
    <ProtectedRoute>
      <Layout>
        <VStack spacing={8} align="stretch">
          {/* Welcome Header */}
          <Box>
            <Heading
              fontSize={{ base: "2xl", md: "3xl" }}
              mb={2}
              color="white"
              fontWeight="800"
              letterSpacing="-0.02em"
            >
              Welcome back,{" "}
              <Box as="span" bgGradient="linear(135deg, cyan.400, violet.400)" bgClip="text">
                {user?.name}
              </Box>
              !
            </Heading>
            <Text color="whiteAlpha.500" fontSize="md">
              Here&apos;s what&apos;s happening at your{" "}
              {user?.role === "patient" ? "appointments" : "clinic"} today.
            </Text>
          </Box>

          {/* Stats Grid */}
          <Grid
            templateColumns={{ base: "1fr", lg: "repeat(2, 1fr)", xl: "repeat(4, 1fr)" }}
            gap={6}
          >
            {data.stats.map((stat, index) => {
              const shouldHideStat = () => {
                if (stat.label.includes("Revenue") && !hasPermission(user?.role || "patient", "billing", "view")) return true;
                if (stat.label.includes("Staff") && !hasPermission(user?.role || "patient", "settings", "view")) return true;
                if (stat.label.includes("Inventory") && !hasPermission(user?.role || "patient", "inventory", "view")) return true;
                return false;
              };
              if (shouldHideStat()) return null;

              const accent = statAccent(stat.trend);
              return (
                <GridItem key={index}>
                  <Card {...cardStyle}>
                    <CardBody p={6}>
                      <HStack justify="space-between" align="start" mb={4}>
                        <Box p={3} borderRadius="xl" bg={accent.icon}>
                          <Icon as={getStatIcon(stat.label)} boxSize={5} color={accent.color} />
                        </Box>
                        <Badge
                          px={3} py={1} borderRadius="full" fontSize="xs" fontWeight="700"
                          bg={accent.badge} color={accent.badgeText}
                          border="1px solid" borderColor={accent.badge}
                        >
                          {stat.change}
                        </Badge>
                      </HStack>
                      <VStack align="start" spacing={1}>
                        <Text fontSize="xs" color="whiteAlpha.500" fontWeight="600" textTransform="uppercase" letterSpacing="0.06em">
                          {stat.label}
                        </Text>
                        <Text fontSize="3xl" fontWeight="800" color="white" letterSpacing="-0.03em">
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
              xl: hasPermission(user?.role || "patient", "patients", "view") && hasPermission(user?.role || "patient", "appointments", "view")
                ? "2fr 1fr"
                : "1fr",
            }}
            gap={8}
          >
            {/* Recent Activity */}
            <RoleGuard requiredPermission={{ module: "patients", action: "view" }}>
              <GridItem>
                <Card {...cardStyle}>
                  <CardHeader pb={4}>
                    <Heading fontSize="lg" fontWeight="700" color="white" letterSpacing="-0.01em">
                      Recent Activity
                    </Heading>
                  </CardHeader>
                  <CardBody pt={0}>
                    <VStack spacing={3} align="stretch">
                      {data.recentActivity.map((activity, index) => (
                        <HStack
                          key={index}
                          spacing={4}
                          p={4}
                          bg="rgba(255,255,255,0.03)"
                          borderRadius="xl"
                          border="1px solid rgba(255,255,255,0.05)"
                          _hover={{ bg: "rgba(255,255,255,0.06)", borderColor: "rgba(255,255,255,0.09)" }}
                          transition="all 0.2s"
                        >
                          <Box p={2.5} borderRadius="lg" bg="rgba(6,182,212,0.12)" flexShrink={0}>
                            <Icon as={getActivityIcon(activity.type)} color="cyan.400" boxSize={4} />
                          </Box>
                          <Box flex={1}>
                            <Text fontWeight="600" color="whiteAlpha.900" fontSize="sm">
                              {activity.description}
                            </Text>
                            <Text fontSize="xs" color="whiteAlpha.400" mt={0.5}>
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

            {/* Upcoming Appointments */}
            <RoleGuard requiredPermission={{ module: "appointments", action: "view" }}>
              <GridItem>
                <Card {...cardStyle}>
                  <CardHeader pb={4}>
                    <Heading fontSize="lg" fontWeight="700" color="white" letterSpacing="-0.01em">
                      Upcoming Appointments
                    </Heading>
                  </CardHeader>
                  <CardBody pt={0}>
                    <VStack spacing={3} align="stretch">
                      {data.upcomingAppointments.map((appointment, index) => (
                        <Box
                          key={index}
                          p={4}
                          border="1px solid rgba(255,255,255,0.07)"
                          borderRadius="xl"
                          bg="rgba(255,255,255,0.03)"
                          _hover={{ borderColor: "rgba(6,182,212,0.3)", bg: "rgba(6,182,212,0.05)", transform: "translateY(-1px)" }}
                          transition="all 0.2s"
                        >
                          <HStack justify="space-between" mb={2}>
                            <Text fontWeight="700" color="white" fontSize="sm">
                              {appointment.patient}
                            </Text>
                            {appointment.status && (
                              <Badge
                                px={2} py={0.5} borderRadius="full" fontSize="xs" fontWeight="700"
                                bg={appointment.status === "confirmed" ? "rgba(16,185,129,0.15)" : appointment.status === "pending" ? "rgba(245,158,11,0.15)" : "rgba(244,63,94,0.15)"}
                                color={appointment.status === "confirmed" ? "emerald.300" : appointment.status === "pending" ? "amber.300" : "rose.300"}
                              >
                                {appointment.status}
                              </Badge>
                            )}
                          </HStack>
                          <VStack align="start" spacing={0.5}>
                            <Text fontSize="sm" color="whiteAlpha.700" fontWeight="600">
                              {appointment.time}
                            </Text>
                            {appointment.dentist && (
                              <Text fontSize="xs" color="whiteAlpha.400">{appointment.dentist}</Text>
                            )}
                            <Text fontSize="xs" color="cyan.400" fontWeight="600">
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

          {/* Quick Actions */}
          <RoleGuard
            requiredPermission={{ module: "patients", action: "create" }}
            fallback={
              (hasPermission(user?.role || "patient", "appointments", "create") ||
               hasPermission(user?.role || "patient", "billing", "process") ||
               hasPermission(user?.role || "patient", "inventory", "manage") ||
               hasPermission(user?.role || "patient", "charting", "create")) ? (
                <Card {...cardStyle}>
                  <CardHeader pb={4}>
                    <Heading fontSize="lg" fontWeight="700" color="white" letterSpacing="-0.01em">
                      Quick Actions
                    </Heading>
                  </CardHeader>
                  <CardBody pt={0}>
                    <Grid templateColumns={{ base: "1fr", md: "repeat(auto-fit, minmax(180px, 1fr))" }} gap={4}>
                      {hasPermission(user?.role || "patient", "appointments", "create") && (
                        <QuickActionCard icon={FiCalendar} label="Schedule Appointment" href="/appointments" accent="cyan" />
                      )}
                      {hasPermission(user?.role || "patient", "billing", "process") && (
                        <QuickActionCard icon={FiDollarSign} label="Process Payment" href="/billing" accent="emerald" />
                      )}
                      {hasPermission(user?.role || "patient", "inventory", "manage") && (
                        <QuickActionCard icon={FiPackage} label="Manage Inventory" href="/inventory" accent="amber" />
                      )}
                      {hasPermission(user?.role || "patient", "charting", "create") && (
                        <QuickActionCard icon={FiFileText} label="Treatment Plan" href="/charting" accent="violet" />
                      )}
                    </Grid>
                  </CardBody>
                </Card>
              ) : null
            }
          >
            <Card {...cardStyle}>
              <CardHeader pb={4}>
                <Heading fontSize="lg" fontWeight="700" color="white" letterSpacing="-0.01em">
                  Quick Actions
                </Heading>
              </CardHeader>
              <CardBody pt={0}>
                <Grid templateColumns={{ base: "1fr", md: "repeat(auto-fit, minmax(180px, 1fr))" }} gap={4}>
                  <QuickActionCard icon={FiUsers} label="Add Patient" href="/patients" accent="cyan" />
                </Grid>
              </CardBody>
            </Card>
          </RoleGuard>
        </VStack>
      </Layout>
    </ProtectedRoute>
  );
}

function QuickActionCard({
  icon,
  label,
  href,
  accent,
}: {
  icon: React.ComponentType;
  label: string;
  href: string;
  accent: string;
}) {
  const accentMap: Record<string, { bg: string; hover: string; border: string; iconBg: string; color: string }> = {
    cyan:    { bg: "rgba(6,182,212,0.06)",    hover: "rgba(6,182,212,0.12)",    border: "rgba(6,182,212,0.2)",    iconBg: "rgba(6,182,212,0.15)",    color: "#22d3ee" },
    emerald: { bg: "rgba(16,185,129,0.06)",   hover: "rgba(16,185,129,0.12)",   border: "rgba(16,185,129,0.2)",   iconBg: "rgba(16,185,129,0.15)",   color: "#34d399" },
    amber:   { bg: "rgba(245,158,11,0.06)",   hover: "rgba(245,158,11,0.12)",   border: "rgba(245,158,11,0.2)",   iconBg: "rgba(245,158,11,0.15)",   color: "#fbbf24" },
    violet:  { bg: "rgba(139,92,246,0.06)",   hover: "rgba(139,92,246,0.12)",   border: "rgba(139,92,246,0.2)",   iconBg: "rgba(139,92,246,0.15)",   color: "#c4b5fd" },
  };
  const a = accentMap[accent] || accentMap.cyan;
  return (
    <Box
      p={5}
      borderRadius="xl"
      border="1px solid rgba(255,255,255,0.07)"
      cursor="pointer"
      textAlign="center"
      bg="rgba(255,255,255,0.03)"
      _hover={{ borderColor: a.border, bg: a.hover, transform: "translateY(-3px)", boxShadow: `0 8px 24px rgba(0,0,0,0.3)` }}
      transition="all 0.25s ease"
      onClick={() => (window.location.href = href)}
    >
      <Box
        p={3}
        borderRadius="xl"
        bg={a.iconBg}
        display="inline-flex"
        mb={3}
        border="1px solid"
        borderColor={a.border}
      >
        <Icon as={icon} boxSize={6} color={a.color} />
      </Box>
      <Text fontWeight="700" color="whiteAlpha.800" fontSize="sm">
        {label}
      </Text>
    </Box>
  );
}
