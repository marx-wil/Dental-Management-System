"use client";

import React, { useState } from "react";
import {
  Box,
  Container,
  VStack,
  HStack,
  Heading,
  Text,
  Button,
  Select,
  Grid,
  GridItem,
  Card,
  CardBody,
  CardHeader,
  Badge,
  Icon,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Progress,
  Flex,
} from "@chakra-ui/react";
import {
  FiBarChart,
  FiTrendingUp,
  FiTrendingDown,
  FiUsers,
  FiCalendar,
  FiDollarSign,
  FiDownload,
} from "react-icons/fi";
import Layout from "../components/Layout";
import ProtectedRoute from "../components/ProtectedRoute";

interface ReportData {
  period: string;
  revenue: number;
  patients: number;
  appointments: number;
  treatments: number;
}

const mockReportData: ReportData[] = [
  {
    period: "January 2024",
    revenue: 125000,
    patients: 45,
    appointments: 78,
    treatments: 65,
  },
  {
    period: "February 2024",
    revenue: 142000,
    patients: 52,
    appointments: 89,
    treatments: 72,
  },
  {
    period: "March 2024",
    revenue: 138000,
    patients: 48,
    appointments: 85,
    treatments: 68,
  },
  {
    period: "April 2024",
    revenue: 156000,
    patients: 58,
    appointments: 95,
    treatments: 82,
  },
  {
    period: "May 2024",
    revenue: 149000,
    patients: 55,
    appointments: 92,
    treatments: 75,
  },
  {
    period: "June 2024",
    revenue: 167000,
    patients: 62,
    appointments: 108,
    treatments: 89,
  },
];

const mockTreatmentStats = [
  { treatment: "Cleaning", count: 45, revenue: 67500 },
  { treatment: "Filling", count: 32, revenue: 80000 },
  { treatment: "Root Canal", count: 8, revenue: 64000 },
  { treatment: "Extraction", count: 15, revenue: 45000 },
  { treatment: "Crown", count: 12, revenue: 180000 },
  { treatment: "Check-up", count: 28, revenue: 28000 },
];

const mockPatientDemographics = [
  { ageGroup: "0-18", count: 25, percentage: 20 },
  { ageGroup: "19-35", count: 45, percentage: 36 },
  { ageGroup: "36-50", count: 35, percentage: 28 },
  { ageGroup: "51-65", count: 15, percentage: 12 },
  { ageGroup: "65+", count: 5, percentage: 4 },
];

const cardStyle = {
  bg: "rgba(15,22,41,0.7)",
  border: "1px solid",
  borderColor: "rgba(255,255,255,0.07)",
  backdropFilter: "blur(12px)",
  borderRadius: "2xl",
  _hover: { borderColor: "rgba(255,255,255,0.12)" },
} as const;

export default function ReportsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("6months");

  const currentData = mockReportData[mockReportData.length - 1];
  const previousData = mockReportData[mockReportData.length - 2];

  const calculateGrowth = (current: number, previous: number) => {
    return (((current - previous) / previous) * 100).toFixed(1);
  };

  const revenueGrowth = calculateGrowth(
    currentData.revenue,
    previousData.revenue
  );
  const patientGrowth = calculateGrowth(
    currentData.patients,
    previousData.patients
  );
  const appointmentGrowth = calculateGrowth(
    currentData.appointments,
    previousData.appointments
  );

  const totalRevenue = mockReportData.reduce(
    (sum, data) => sum + data.revenue,
    0
  );
  const totalPatients = mockReportData.reduce(
    (sum, data) => sum + data.patients,
    0
  );
  const totalAppointments = mockReportData.reduce(
    (sum, data) => sum + data.appointments,
    0
  );

  return (
    <ProtectedRoute allowedRoles={["admin", "dentist"]}>
      <Layout>
        <Container maxW="7xl" py={8}>
          <VStack spacing={8} align="stretch">
            {/* Header */}
            <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={4}>
              <Box>
                <Heading size="lg" color="white">Reports & Analytics</Heading>
                <Text color="whiteAlpha.700">
                  Comprehensive clinic performance insights
                </Text>
              </Box>
              <Flex justifyContent={"flex-end"} gap={4}>
                <Select
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                  w="150px"
                  bg="rgba(255,255,255,0.05)"
                  border="1.5px solid"
                  borderColor="rgba(255,255,255,0.1)"
                  color="white"
                  _focus={{ bg: "rgba(6,182,212,0.06)", borderColor: "cyan.500", boxShadow: "0 0 0 3px rgba(6,182,212,0.15)" }}
                  _hover={{ borderColor: "rgba(255,255,255,0.2)" }}
                >
                  <option value="1month">Last Month</option>
                  <option value="3months">Last 3 Months</option>
                  <option value="6months">Last 6 Months</option>
                  <option value="1year">Last Year</option>
                </Select>
                <Button
                  w={{ base: "full", md: "fit-content" }}
                  leftIcon={<FiDownload />}
                  variant="outline"
                  colorScheme="cyan"
                  size={{ base: "sm", md: "md" }}
                  minW={{ base: "full", md: "fit-content" }}
                >
                  Export Report
                </Button>
              </Flex>
            </Grid>

            {/* Key Metrics */}
            <Grid
              templateColumns={{ base: "1fr", md: "repeat(4, 1fr)" }}
              gap={6}
            >
              <GridItem>
                <Card {...cardStyle}>
                  <CardBody>
                    <HStack justify="space-between">
                      <Box>
                        <Text fontSize="sm" color="whiteAlpha.700">
                          Total Revenue
                        </Text>
                        <Text
                          fontSize="2xl"
                          fontWeight="bold"
                          color="green.400"
                        >
                          ₱{totalRevenue.toLocaleString()}
                        </Text>
                        <HStack spacing={1}>
                          <Icon
                            as={
                              parseFloat(revenueGrowth) >= 0
                                ? FiTrendingUp
                                : FiTrendingDown
                            }
                            color={
                              parseFloat(revenueGrowth) >= 0
                                ? "green.400"
                                : "red.400"
                            }
                          />
                          <Text
                            fontSize="sm"
                            color={
                              parseFloat(revenueGrowth) >= 0
                                ? "green.400"
                                : "red.400"
                            }
                          >
                            {revenueGrowth}%
                          </Text>
                        </HStack>
                      </Box>
                      <Icon as={FiDollarSign} boxSize={8} color="green.400" />
                    </HStack>
                  </CardBody>
                </Card>
              </GridItem>
              <GridItem>
                <Card {...cardStyle}>
                  <CardBody>
                    <HStack justify="space-between">
                      <Box>
                        <Text fontSize="sm" color="whiteAlpha.700">
                          Total Patients
                        </Text>
                        <Text fontSize="2xl" fontWeight="bold" color="white">
                          {totalPatients}
                        </Text>
                        <HStack spacing={1}>
                          <Icon
                            as={
                              parseFloat(patientGrowth) >= 0
                                ? FiTrendingUp
                                : FiTrendingDown
                            }
                            color={
                              parseFloat(patientGrowth) >= 0
                                ? "green.400"
                                : "red.400"
                            }
                          />
                          <Text
                            fontSize="sm"
                            color={
                              parseFloat(patientGrowth) >= 0
                                ? "green.400"
                                : "red.400"
                            }
                          >
                            {patientGrowth}%
                          </Text>
                        </HStack>
                      </Box>
                      <Icon as={FiUsers} boxSize={8} color="cyan.400" />
                    </HStack>
                  </CardBody>
                </Card>
              </GridItem>
              <GridItem>
                <Card {...cardStyle}>
                  <CardBody>
                    <HStack justify="space-between">
                      <Box>
                        <Text fontSize="sm" color="whiteAlpha.700">
                          Total Appointments
                        </Text>
                        <Text fontSize="2xl" fontWeight="bold" color="white">
                          {totalAppointments}
                        </Text>
                        <HStack spacing={1}>
                          <Icon
                            as={
                              parseFloat(appointmentGrowth) >= 0
                                ? FiTrendingUp
                                : FiTrendingDown
                            }
                            color={
                              parseFloat(appointmentGrowth) >= 0
                                ? "green.400"
                                : "red.400"
                            }
                          />
                          <Text
                            fontSize="sm"
                            color={
                              parseFloat(appointmentGrowth) >= 0
                                ? "green.400"
                                : "red.400"
                            }
                          >
                            {appointmentGrowth}%
                          </Text>
                        </HStack>
                      </Box>
                      <Icon as={FiCalendar} boxSize={8} color="blue.400" />
                    </HStack>
                  </CardBody>
                </Card>
              </GridItem>
              <GridItem>
                <Card {...cardStyle}>
                  <CardBody>
                    <HStack justify="space-between">
                      <Box>
                        <Text fontSize="sm" color="whiteAlpha.700">
                          Avg. Revenue/Patient
                        </Text>
                        <Text
                          fontSize="2xl"
                          fontWeight="bold"
                          color="purple.400"
                        >
                          ₱
                          {Math.round(
                            totalRevenue / totalPatients
                          ).toLocaleString()}
                        </Text>
                        <Text fontSize="sm" color="whiteAlpha.400">
                          Last 6 months
                        </Text>
                      </Box>
                      <Icon as={FiBarChart} boxSize={8} color="purple.400" />
                    </HStack>
                  </CardBody>
                </Card>
              </GridItem>
            </Grid>

            <Grid templateColumns={{ base: "1fr", lg: "2fr 1fr" }} gap={8}>
              {/* Revenue Trend */}
              <GridItem>
                <Card {...cardStyle}>
                  <CardHeader>
                    <Heading size="md" color="white">Revenue Trend</Heading>
                  </CardHeader>
                  <CardBody>
                    <VStack spacing={4} align="stretch">
                      {mockReportData.map((data) => (
                        <Box key={data.period}>
                          <HStack justify="space-between" mb={2}>
                            <Text fontWeight="medium" color="whiteAlpha.800">{data.period}</Text>
                            <Text fontWeight="bold" color="white">
                              ₱{data.revenue.toLocaleString()}
                            </Text>
                          </HStack>
                          <Progress
                            value={
                              (data.revenue /
                                Math.max(
                                  ...mockReportData.map((d) => d.revenue)
                                )) *
                              100
                            }
                            colorScheme="emerald"
                            size="sm"
                            borderRadius="md"
                          />
                        </Box>
                      ))}
                    </VStack>
                  </CardBody>
                </Card>
              </GridItem>

              {/* Patient Demographics */}
              <GridItem>
                <Card {...cardStyle}>
                  <CardHeader>
                    <Heading size="md" color="white">Patient Demographics</Heading>
                  </CardHeader>
                  <CardBody>
                    <VStack spacing={4} align="stretch">
                      {mockPatientDemographics.map((demo) => (
                        <Box key={demo.ageGroup}>
                          <HStack justify="space-between" mb={2}>
                            <Text fontSize="sm" color="whiteAlpha.800">{demo.ageGroup} years</Text>
                            <Text fontSize="sm" fontWeight="medium" color="whiteAlpha.800">
                              {demo.count} ({demo.percentage}%)
                            </Text>
                          </HStack>
                          <Progress
                            value={demo.percentage}
                            colorScheme="cyan"
                            size="sm"
                            borderRadius="md"
                          />
                        </Box>
                      ))}
                    </VStack>
                  </CardBody>
                </Card>
              </GridItem>
            </Grid>

            {/* Treatment Statistics */}
            <Card {...cardStyle}>
              <CardHeader>
                <Heading size="md" color="white">Treatment Statistics</Heading>
              </CardHeader>
              <CardBody overflowX="auto">
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th
                        bg="rgba(255,255,255,0.03)"
                        color="whiteAlpha.500"
                        borderColor="rgba(255,255,255,0.06)"
                        fontSize="xs"
                        fontWeight="700"
                        letterSpacing="0.08em"
                      >
                        Treatment Type
                      </Th>
                      <Th
                        bg="rgba(255,255,255,0.03)"
                        color="whiteAlpha.500"
                        borderColor="rgba(255,255,255,0.06)"
                        fontSize="xs"
                        fontWeight="700"
                        letterSpacing="0.08em"
                      >
                        Count
                      </Th>
                      <Th
                        bg="rgba(255,255,255,0.03)"
                        color="whiteAlpha.500"
                        borderColor="rgba(255,255,255,0.06)"
                        fontSize="xs"
                        fontWeight="700"
                        letterSpacing="0.08em"
                      >
                        Revenue
                      </Th>
                      <Th
                        bg="rgba(255,255,255,0.03)"
                        color="whiteAlpha.500"
                        borderColor="rgba(255,255,255,0.06)"
                        fontSize="xs"
                        fontWeight="700"
                        letterSpacing="0.08em"
                      >
                        Avg. Price
                      </Th>
                      <Th
                        bg="rgba(255,255,255,0.03)"
                        color="whiteAlpha.500"
                        borderColor="rgba(255,255,255,0.06)"
                        fontSize="xs"
                        fontWeight="700"
                        letterSpacing="0.08em"
                      >
                        Percentage
                      </Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {mockTreatmentStats.map((treatment) => {
                      const avgPrice = treatment.revenue / treatment.count;
                      const percentage = (
                        (treatment.revenue / totalRevenue) *
                        100
                      ).toFixed(1);

                      return (
                        <Tr
                          key={treatment.treatment}
                          _hover={{ bg: "rgba(255,255,255,0.03)" }}
                        >
                          <Td borderColor="rgba(255,255,255,0.05)">
                            <Text fontWeight="medium" color="whiteAlpha.800">
                              {treatment.treatment}
                            </Text>
                          </Td>
                          <Td borderColor="rgba(255,255,255,0.05)" color="whiteAlpha.800">
                            <Badge colorScheme="blue" variant="subtle">
                              {treatment.count}
                            </Badge>
                          </Td>
                          <Td borderColor="rgba(255,255,255,0.05)">
                            <Text fontWeight="medium" color="whiteAlpha.800">
                              ₱{treatment.revenue.toLocaleString()}
                            </Text>
                          </Td>
                          <Td borderColor="rgba(255,255,255,0.05)" color="whiteAlpha.800">
                            <Text>₱{avgPrice.toLocaleString()}</Text>
                          </Td>
                          <Td borderColor="rgba(255,255,255,0.05)" color="whiteAlpha.800">
                            <HStack spacing={2}>
                              <Text fontSize="sm">{percentage}%</Text>
                              <Progress
                                value={parseFloat(percentage)}
                                colorScheme="cyan"
                                size="sm"
                                w="60px"
                                borderRadius="md"
                              />
                            </HStack>
                          </Td>
                        </Tr>
                      );
                    })}
                  </Tbody>
                </Table>
              </CardBody>
            </Card>

            {/* Monthly Performance */}
            <Card {...cardStyle}>
              <CardHeader>
                <Heading size="md" color="white">Monthly Performance</Heading>
              </CardHeader>
              <CardBody overflowX="auto">
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th
                        bg="rgba(255,255,255,0.03)"
                        color="whiteAlpha.500"
                        borderColor="rgba(255,255,255,0.06)"
                        fontSize="xs"
                        fontWeight="700"
                        letterSpacing="0.08em"
                      >
                        Period
                      </Th>
                      <Th
                        bg="rgba(255,255,255,0.03)"
                        color="whiteAlpha.500"
                        borderColor="rgba(255,255,255,0.06)"
                        fontSize="xs"
                        fontWeight="700"
                        letterSpacing="0.08em"
                      >
                        Revenue
                      </Th>
                      <Th
                        bg="rgba(255,255,255,0.03)"
                        color="whiteAlpha.500"
                        borderColor="rgba(255,255,255,0.06)"
                        fontSize="xs"
                        fontWeight="700"
                        letterSpacing="0.08em"
                      >
                        Patients
                      </Th>
                      <Th
                        bg="rgba(255,255,255,0.03)"
                        color="whiteAlpha.500"
                        borderColor="rgba(255,255,255,0.06)"
                        fontSize="xs"
                        fontWeight="700"
                        letterSpacing="0.08em"
                      >
                        Appointments
                      </Th>
                      <Th
                        bg="rgba(255,255,255,0.03)"
                        color="whiteAlpha.500"
                        borderColor="rgba(255,255,255,0.06)"
                        fontSize="xs"
                        fontWeight="700"
                        letterSpacing="0.08em"
                      >
                        Treatments
                      </Th>
                      <Th
                        bg="rgba(255,255,255,0.03)"
                        color="whiteAlpha.500"
                        borderColor="rgba(255,255,255,0.06)"
                        fontSize="xs"
                        fontWeight="700"
                        letterSpacing="0.08em"
                      >
                        Avg. Revenue/Patient
                      </Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {mockReportData.map((data) => (
                      <Tr
                        key={data.period}
                        _hover={{ bg: "rgba(255,255,255,0.03)" }}
                      >
                        <Td borderColor="rgba(255,255,255,0.05)">
                          <Text fontWeight="medium" color="whiteAlpha.800">{data.period}</Text>
                        </Td>
                        <Td borderColor="rgba(255,255,255,0.05)">
                          <Text fontWeight="medium" color="whiteAlpha.800">
                            ₱{data.revenue.toLocaleString()}
                          </Text>
                        </Td>
                        <Td borderColor="rgba(255,255,255,0.05)" color="whiteAlpha.800">
                          <Text>{data.patients}</Text>
                        </Td>
                        <Td borderColor="rgba(255,255,255,0.05)" color="whiteAlpha.800">
                          <Text>{data.appointments}</Text>
                        </Td>
                        <Td borderColor="rgba(255,255,255,0.05)" color="whiteAlpha.800">
                          <Text>{data.treatments}</Text>
                        </Td>
                        <Td borderColor="rgba(255,255,255,0.05)" color="whiteAlpha.800">
                          <Text>
                            ₱
                            {Math.round(
                              data.revenue / data.patients
                            ).toLocaleString()}
                          </Text>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </CardBody>
            </Card>

            {/* Quick Insights */}
            <Grid
              templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
              gap={6}
            >
              <GridItem>
                <Card {...cardStyle}>
                  <CardHeader>
                    <Heading size="md" color="white">Top Performing Treatments</Heading>
                  </CardHeader>
                  <CardBody>
                    <VStack spacing={3} align="stretch">
                      {mockTreatmentStats
                        .sort((a, b) => b.revenue - a.revenue)
                        .slice(0, 3)
                        .map((treatment, index) => (
                          <HStack
                            key={treatment.treatment}
                            justify="space-between"
                            p={3}
                            bg="rgba(255,255,255,0.04)"
                            border="1px solid rgba(255,255,255,0.06)"
                            borderRadius="md"
                          >
                            <HStack spacing={3}>
                              <Badge colorScheme="green" variant="solid">
                                #{index + 1}
                              </Badge>
                              <Text fontWeight="medium" color="whiteAlpha.800">
                                {treatment.treatment}
                              </Text>
                            </HStack>
                            <Text fontWeight="bold" color="green.400">
                              ₱{treatment.revenue.toLocaleString()}
                            </Text>
                          </HStack>
                        ))}
                    </VStack>
                  </CardBody>
                </Card>
              </GridItem>

              <GridItem>
                <Card {...cardStyle}>
                  <CardHeader>
                    <Heading size="md" color="white">Growth Insights</Heading>
                  </CardHeader>
                  <CardBody>
                    <VStack spacing={4} align="stretch">
                      <Box p={3} bg="rgba(72,187,120,0.1)" borderRadius="md">
                        <HStack justify="space-between">
                          <Text fontWeight="medium" color="whiteAlpha.800">Revenue Growth</Text>
                          <Text fontWeight="bold" color="green.400">
                            +{revenueGrowth}%
                          </Text>
                        </HStack>
                        <Text fontSize="sm" color="whiteAlpha.500">
                          Compared to previous month
                        </Text>
                      </Box>

                      <Box p={3} bg="rgba(66,153,225,0.1)" borderRadius="md">
                        <HStack justify="space-between">
                          <Text fontWeight="medium" color="whiteAlpha.800">Patient Growth</Text>
                          <Text fontWeight="bold" color="blue.400">
                            +{patientGrowth}%
                          </Text>
                        </HStack>
                        <Text fontSize="sm" color="whiteAlpha.500">
                          New patients this month
                        </Text>
                      </Box>

                      <Box p={3} bg="rgba(159,122,234,0.1)" borderRadius="md">
                        <HStack justify="space-between">
                          <Text fontWeight="medium" color="whiteAlpha.800">Appointment Growth</Text>
                          <Text fontWeight="bold" color="purple.400">
                            +{appointmentGrowth}%
                          </Text>
                        </HStack>
                        <Text fontSize="sm" color="whiteAlpha.500">
                          More appointments scheduled
                        </Text>
                      </Box>
                    </VStack>
                  </CardBody>
                </Card>
              </GridItem>
            </Grid>
          </VStack>
        </Container>
      </Layout>
    </ProtectedRoute>
  );
}
