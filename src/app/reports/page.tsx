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
  useColorModeValue,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Progress,
  Divider,
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
  FiFilter,
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

export default function ReportsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("6months");
  const [selectedReport, setSelectedReport] = useState("revenue");

  const cardBg = useColorModeValue("white", "gray.800");

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
                <Heading size="lg">Reports & Analytics</Heading>
                <Text color="gray.600">
                  Comprehensive clinic performance insights
                </Text>
              </Box>
              <Flex justifyContent={"flex-end"} gap={4}>
                <Select
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                  w="150px"
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
                  colorScheme="dental"
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
                <Card bg={cardBg}>
                  <CardBody>
                    <HStack justify="space-between">
                      <Box>
                        <Text fontSize="sm" color="gray.600">
                          Total Revenue
                        </Text>
                        <Text
                          fontSize="2xl"
                          fontWeight="bold"
                          color="green.500"
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
                                ? "green.500"
                                : "red.500"
                            }
                          />
                          <Text
                            fontSize="sm"
                            color={
                              parseFloat(revenueGrowth) >= 0
                                ? "green.500"
                                : "red.500"
                            }
                          >
                            {revenueGrowth}%
                          </Text>
                        </HStack>
                      </Box>
                      <Icon as={FiDollarSign} boxSize={8} color="green.500" />
                    </HStack>
                  </CardBody>
                </Card>
              </GridItem>
              <GridItem>
                <Card bg={cardBg}>
                  <CardBody>
                    <HStack justify="space-between">
                      <Box>
                        <Text fontSize="sm" color="gray.600">
                          Total Patients
                        </Text>
                        <Text fontSize="2xl" fontWeight="bold">
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
                                ? "green.500"
                                : "red.500"
                            }
                          />
                          <Text
                            fontSize="sm"
                            color={
                              parseFloat(patientGrowth) >= 0
                                ? "green.500"
                                : "red.500"
                            }
                          >
                            {patientGrowth}%
                          </Text>
                        </HStack>
                      </Box>
                      <Icon as={FiUsers} boxSize={8} color="dental.500" />
                    </HStack>
                  </CardBody>
                </Card>
              </GridItem>
              <GridItem>
                <Card bg={cardBg}>
                  <CardBody>
                    <HStack justify="space-between">
                      <Box>
                        <Text fontSize="sm" color="gray.600">
                          Total Appointments
                        </Text>
                        <Text fontSize="2xl" fontWeight="bold">
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
                                ? "green.500"
                                : "red.500"
                            }
                          />
                          <Text
                            fontSize="sm"
                            color={
                              parseFloat(appointmentGrowth) >= 0
                                ? "green.500"
                                : "red.500"
                            }
                          >
                            {appointmentGrowth}%
                          </Text>
                        </HStack>
                      </Box>
                      <Icon as={FiCalendar} boxSize={8} color="blue.500" />
                    </HStack>
                  </CardBody>
                </Card>
              </GridItem>
              <GridItem>
                <Card bg={cardBg}>
                  <CardBody>
                    <HStack justify="space-between">
                      <Box>
                        <Text fontSize="sm" color="gray.600">
                          Avg. Revenue/Patient
                        </Text>
                        <Text
                          fontSize="2xl"
                          fontWeight="bold"
                          color="purple.500"
                        >
                          ₱
                          {Math.round(
                            totalRevenue / totalPatients
                          ).toLocaleString()}
                        </Text>
                        <Text fontSize="sm" color="gray.600">
                          Last 6 months
                        </Text>
                      </Box>
                      <Icon as={FiBarChart} boxSize={8} color="purple.500" />
                    </HStack>
                  </CardBody>
                </Card>
              </GridItem>
            </Grid>

            <Grid templateColumns={{ base: "1fr", lg: "2fr 1fr" }} gap={8}>
              {/* Revenue Trend */}
              <GridItem>
                <Card bg={cardBg}>
                  <CardHeader>
                    <Heading size="md">Revenue Trend</Heading>
                  </CardHeader>
                  <CardBody>
                    <VStack spacing={4} align="stretch">
                      {mockReportData.map((data, index) => (
                        <Box key={data.period}>
                          <HStack justify="space-between" mb={2}>
                            <Text fontWeight="medium">{data.period}</Text>
                            <Text fontWeight="bold">
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
                            colorScheme="green"
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
                <Card bg={cardBg}>
                  <CardHeader>
                    <Heading size="md">Patient Demographics</Heading>
                  </CardHeader>
                  <CardBody>
                    <VStack spacing={4} align="stretch">
                      {mockPatientDemographics.map((demo) => (
                        <Box key={demo.ageGroup}>
                          <HStack justify="space-between" mb={2}>
                            <Text fontSize="sm">{demo.ageGroup} years</Text>
                            <Text fontSize="sm" fontWeight="medium">
                              {demo.count} ({demo.percentage}%)
                            </Text>
                          </HStack>
                          <Progress
                            value={demo.percentage}
                            colorScheme="dental"
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
            <Card bg={cardBg}>
              <CardHeader>
                <Heading size="md">Treatment Statistics</Heading>
              </CardHeader>
              <CardBody overflowX="auto">
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th>Treatment Type</Th>
                      <Th>Count</Th>
                      <Th>Revenue</Th>
                      <Th>Avg. Price</Th>
                      <Th>Percentage</Th>
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
                        <Tr key={treatment.treatment}>
                          <Td>
                            <Text fontWeight="medium">
                              {treatment.treatment}
                            </Text>
                          </Td>
                          <Td>
                            <Badge colorScheme="blue" variant="subtle">
                              {treatment.count}
                            </Badge>
                          </Td>
                          <Td>
                            <Text fontWeight="medium">
                              ₱{treatment.revenue.toLocaleString()}
                            </Text>
                          </Td>
                          <Td>
                            <Text>₱{avgPrice.toLocaleString()}</Text>
                          </Td>
                          <Td>
                            <HStack spacing={2}>
                              <Text fontSize="sm">{percentage}%</Text>
                              <Progress
                                value={parseFloat(percentage)}
                                colorScheme="green"
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
            <Card bg={cardBg}>
              <CardHeader>
                <Heading size="md">Monthly Performance</Heading>
              </CardHeader>
              <CardBody overflowX="auto">
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th>Period</Th>
                      <Th>Revenue</Th>
                      <Th>Patients</Th>
                      <Th>Appointments</Th>
                      <Th>Treatments</Th>
                      <Th>Avg. Revenue/Patient</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {mockReportData.map((data) => (
                      <Tr key={data.period}>
                        <Td>
                          <Text fontWeight="medium">{data.period}</Text>
                        </Td>
                        <Td>
                          <Text fontWeight="medium">
                            ₱{data.revenue.toLocaleString()}
                          </Text>
                        </Td>
                        <Td>
                          <Text>{data.patients}</Text>
                        </Td>
                        <Td>
                          <Text>{data.appointments}</Text>
                        </Td>
                        <Td>
                          <Text>{data.treatments}</Text>
                        </Td>
                        <Td>
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
                <Card bg={cardBg}>
                  <CardHeader>
                    <Heading size="md">Top Performing Treatments</Heading>
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
                            bg="gray.50"
                            borderRadius="md"
                          >
                            <HStack spacing={3}>
                              <Badge colorScheme="green" variant="solid">
                                #{index + 1}
                              </Badge>
                              <Text fontWeight="medium">
                                {treatment.treatment}
                              </Text>
                            </HStack>
                            <Text fontWeight="bold" color="green.500">
                              ₱{treatment.revenue.toLocaleString()}
                            </Text>
                          </HStack>
                        ))}
                    </VStack>
                  </CardBody>
                </Card>
              </GridItem>

              <GridItem>
                <Card bg={cardBg}>
                  <CardHeader>
                    <Heading size="md">Growth Insights</Heading>
                  </CardHeader>
                  <CardBody>
                    <VStack spacing={4} align="stretch">
                      <Box p={3} bg="green.50" borderRadius="md">
                        <HStack justify="space-between">
                          <Text fontWeight="medium">Revenue Growth</Text>
                          <Text fontWeight="bold" color="green.500">
                            +{revenueGrowth}%
                          </Text>
                        </HStack>
                        <Text fontSize="sm" color="gray.600">
                          Compared to previous month
                        </Text>
                      </Box>

                      <Box p={3} bg="blue.50" borderRadius="md">
                        <HStack justify="space-between">
                          <Text fontWeight="medium">Patient Growth</Text>
                          <Text fontWeight="bold" color="blue.500">
                            +{patientGrowth}%
                          </Text>
                        </HStack>
                        <Text fontSize="sm" color="gray.600">
                          New patients this month
                        </Text>
                      </Box>

                      <Box p={3} bg="purple.50" borderRadius="md">
                        <HStack justify="space-between">
                          <Text fontWeight="medium">Appointment Growth</Text>
                          <Text fontWeight="bold" color="purple.500">
                            +{appointmentGrowth}%
                          </Text>
                        </HStack>
                        <Text fontSize="sm" color="gray.600">
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
