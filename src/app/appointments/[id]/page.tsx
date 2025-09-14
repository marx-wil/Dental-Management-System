'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  VStack,
  HStack,
  Heading,
  Text,
  Button,
  Card,
  CardBody,
  CardHeader,
  Badge,
  Avatar,
  Icon,
  useColorModeValue,
  Divider,
  Grid,
  GridItem,
  SimpleGrid,
  useToast,
} from '@chakra-ui/react';
import {
  FiCalendar,
  FiClock,
  FiUser,
  FiArrowLeft,
  FiEdit,
  FiTrash2,
  FiMapPin,
  FiPhone,
  FiMail,
  FiActivity,
} from 'react-icons/fi';
import { useRouter, useParams } from 'next/navigation';
import Layout from '../../components/Layout';
import ProtectedRoute from '../../components/ProtectedRoute';

interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  dentistId: string;
  dentistName: string;
  date: string;
  time: string;
  duration: number;
  type: string;
  status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled' | 'no-show';
  notes?: string;
  patientPhone?: string;
  patientEmail?: string;
}

const mockAppointments: Appointment[] = [
  {
    id: '1',
    patientId: '1',
    patientName: 'Maria Santos',
    dentistId: '1',
    dentistName: 'Dr. Juan Dela Cruz',
    date: '2025-01-15',
    time: '09:00',
    duration: 60,
    type: 'Cleaning',
    status: 'confirmed',
    notes: 'Regular cleaning appointment',
    patientPhone: '+63 912 345 6789',
    patientEmail: 'maria.santos@email.com',
  },
  {
    id: '2',
    patientId: '2',
    patientName: 'Carlos Mendoza',
    dentistId: '1',
    dentistName: 'Dr. Juan Dela Cruz',
    date: '2025-01-15',
    time: '10:30',
    duration: 90,
    type: 'Filling',
    status: 'scheduled',
    notes: 'Cavity filling on tooth #14',
    patientPhone: '+63 912 345 6788',
    patientEmail: 'carlos.mendoza@email.com',
  },
  {
    id: '3',
    patientId: '3',
    patientName: 'Ana Rodriguez',
    dentistId: '2',
    dentistName: 'Dr. Maria Santos',
    date: '2025-01-15',
    time: '14:00',
    duration: 120,
    type: 'Root Canal',
    status: 'scheduled',
    notes: 'Root canal treatment on tooth #16',
    patientPhone: '+63 912 345 6787',
    patientEmail: 'ana.rodriguez@email.com',
  },
  {
    id: '4',
    patientId: '4',
    patientName: 'Luis Garcia',
    dentistId: '1',
    dentistName: 'Dr. Juan Dela Cruz',
    date: '2025-01-15',
    time: '15:30',
    duration: 45,
    type: 'Check-up',
    status: 'confirmed',
    notes: 'Annual check-up',
    patientPhone: '+63 912 345 6786',
    patientEmail: 'luis.garcia@email.com',
  },
  {
    id: '5',
    patientId: '5',
    patientName: 'Elena Martinez',
    dentistId: '2',
    dentistName: 'Dr. Maria Santos',
    date: '2025-01-16',
    time: '09:00',
    duration: 60,
    type: 'Cleaning',
    status: 'scheduled',
    notes: 'Regular cleaning appointment',
    patientPhone: '+63 912 345 6785',
    patientEmail: 'elena.martinez@email.com',
  },
  {
    id: '6',
    patientId: '6',
    patientName: 'Roberto Silva',
    dentistId: '1',
    dentistName: 'Dr. Juan Dela Cruz',
    date: '2025-01-16',
    time: '11:00',
    duration: 90,
    type: 'Crown',
    status: 'confirmed',
    notes: 'Crown placement on tooth #12',
    patientPhone: '+63 912 345 6784',
    patientEmail: 'roberto.silva@email.com',
  },
  {
    id: '7',
    patientId: '7',
    patientName: 'Carmen Lopez',
    dentistId: '3',
    dentistName: 'Dr. Pedro Reyes',
    date: '2025-01-17',
    time: '08:30',
    duration: 45,
    type: 'Check-up',
    status: 'scheduled',
    notes: 'Routine check-up',
    patientPhone: '+63 912 345 6783',
    patientEmail: 'carmen.lopez@email.com',
  },
  {
    id: '8',
    patientId: '8',
    patientName: 'Miguel Torres',
    dentistId: '2',
    dentistName: 'Dr. Maria Santos',
    date: '2025-01-17',
    time: '10:00',
    duration: 60,
    type: 'Extraction',
    status: 'confirmed',
    notes: 'Wisdom tooth extraction',
    patientPhone: '+63 912 345 6782',
    patientEmail: 'miguel.torres@email.com',
  },
  {
    id: '9',
    patientId: '9',
    patientName: 'Isabella Cruz',
    dentistId: '1',
    dentistName: 'Dr. Juan Dela Cruz',
    date: '2025-01-17',
    time: '14:00',
    duration: 120,
    type: 'Root Canal',
    status: 'scheduled',
    notes: 'Root canal treatment on tooth #19',
    patientPhone: '+63 912 345 6781',
    patientEmail: 'isabella.cruz@email.com',
  },
  {
    id: '10',
    patientId: '10',
    patientName: 'Fernando Ramos',
    dentistId: '3',
    dentistName: 'Dr. Pedro Reyes',
    date: '2025-01-17',
    time: '16:00',
    duration: 60,
    type: 'Consultation',
    status: 'confirmed',
    notes: 'Initial consultation for orthodontic treatment',
    patientPhone: '+63 912 345 6780',
    patientEmail: 'fernando.ramos@email.com',
  },
];

export default function AppointmentDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const appointmentId = params.id as string;
  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const toast = useToast();
  
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  useEffect(() => {
    const foundAppointment = mockAppointments.find(apt => apt.id === appointmentId);
    if (foundAppointment) {
      setAppointment(foundAppointment);
    } else {
      toast({
        title: 'Appointment not found',
        description: 'The requested appointment could not be found.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      router.push('/appointments');
    }
  }, [appointmentId, router, toast]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'green';
      case 'scheduled': return 'blue';
      case 'completed': return 'gray';
      case 'cancelled': return 'red';
      case 'no-show': return 'orange';
      default: return 'gray';
    }
  };

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleDeleteAppointment = () => {
    if (window.confirm('Are you sure you want to delete this appointment?')) {
      toast({
        title: 'Appointment deleted',
        description: 'The appointment has been successfully deleted.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      router.push('/appointments');
    }
  };

  if (!appointment) {
    return (
      <ProtectedRoute>
        <Layout>
          <Container maxW="4xl" py={8}>
            <Text>Loading appointment details...</Text>
          </Container>
        </Layout>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <Layout>
        <Container maxW="4xl" py={8}>
          <VStack spacing={6} align="stretch">
            {/* Header */}
            <VStack spacing={4} align="stretch">
              <HStack spacing={4} wrap="wrap">
                <Button
                  leftIcon={<FiArrowLeft />}
                  variant="outline"
                  onClick={() => router.push('/appointments')}
                  size={{ base: "sm", md: "md" }}
                >
                  <Text display={{ base: "none", sm: "inline" }}>Back to Calendar</Text>
                  <Text display={{ base: "inline", sm: "none" }}>Back</Text>
                </Button>
                <Box flex="1" minW="200px">
                  <Heading size={{ base: "md", md: "lg" }}>Appointment Details</Heading>
                  <Text color="gray.600" fontSize={{ base: "sm", md: "md" }}>
                    View and manage appointment information
                  </Text>
                </Box>
              </HStack>
              <HStack spacing={2} justify={{ base: "center", md: "flex-end" }} wrap="wrap">
                <Button
                  leftIcon={<FiEdit />}
                  colorScheme="dental"
                  variant="outline"
                  size={{ base: "sm", md: "md" }}
                >
                  Edit
                </Button>
                <Button
                  leftIcon={<FiTrash2 />}
                  colorScheme="red"
                  variant="outline"
                  onClick={handleDeleteAppointment}
                  size={{ base: "sm", md: "md" }}
                >
                  Delete
                </Button>
              </HStack>
            </VStack>

            {/* Appointment Overview */}
            <Card bg={cardBg}>
              <CardHeader>
                <VStack spacing={4} align="stretch">
                  <HStack justify="space-between" wrap="wrap" spacing={4}>
                    <HStack spacing={4}>
                      <Avatar size={{ base: "md", md: "lg" }} name={appointment.patientName} />
                      <Box>
                        <Heading size={{ base: "sm", md: "md" }}>{appointment.patientName}</Heading>
                        <Text color="gray.600" fontSize={{ base: "xs", md: "sm" }}>
                          {appointment.dentistName}
                        </Text>
                      </Box>
                    </HStack>
                    <Badge
                      colorScheme={getStatusColor(appointment.status)}
                      fontSize={{ base: "xs", md: "sm" }}
                      px={3}
                      py={1}
                      borderRadius="full"
                    >
                      {appointment.status.toUpperCase()}
                    </Badge>
                  </HStack>
                </VStack>
              </CardHeader>
              <CardBody pt={0}>
                <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={6}>
                  <GridItem>
                    <VStack spacing={4} align="stretch">
                      <HStack spacing={3}>
                        <Icon as={FiCalendar} color="dental.500" boxSize={{ base: 4, md: 5 }} />
                        <Box>
                          <Text fontSize={{ base: "xs", md: "sm" }} color="gray.600">Date</Text>
                          <Text fontWeight="medium" fontSize={{ base: "sm", md: "md" }}>
                            {formatDate(appointment.date)}
                          </Text>
                        </Box>
                      </HStack>
                      <HStack spacing={3}>
                        <Icon as={FiClock} color="dental.500" boxSize={{ base: 4, md: 5 }} />
                        <Box>
                          <Text fontSize={{ base: "xs", md: "sm" }} color="gray.600">Time</Text>
                          <Text fontWeight="medium" fontSize={{ base: "sm", md: "md" }}>
                            {formatTime(appointment.time)}
                          </Text>
                        </Box>
                      </HStack>
                      <HStack spacing={3}>
                        <Icon as={FiActivity} color="dental.500" boxSize={{ base: 4, md: 5 }} />
                        <Box>
                          <Text fontSize={{ base: "xs", md: "sm" }} color="gray.600">Duration</Text>
                          <Text fontWeight="medium" fontSize={{ base: "sm", md: "md" }}>
                            {appointment.duration} minutes
                          </Text>
                        </Box>
                      </HStack>
                    </VStack>
                  </GridItem>
                  <GridItem>
                    <VStack spacing={4} align="stretch">
                      <HStack spacing={3}>
                        <Icon as={FiUser} color="dental.500" boxSize={{ base: 4, md: 5 }} />
                        <Box>
                          <Text fontSize={{ base: "xs", md: "sm" }} color="gray.600">Treatment Type</Text>
                          <Text fontWeight="medium" fontSize={{ base: "sm", md: "md" }}>
                            {appointment.type}
                          </Text>
                        </Box>
                      </HStack>
                      <HStack spacing={3}>
                        <Icon as={FiPhone} color="dental.500" boxSize={{ base: 4, md: 5 }} />
                        <Box>
                          <Text fontSize={{ base: "xs", md: "sm" }} color="gray.600">Phone</Text>
                          <Text fontWeight="medium" fontSize={{ base: "sm", md: "md" }}>
                            {appointment.patientPhone}
                          </Text>
                        </Box>
                      </HStack>
                      <HStack spacing={3}>
                        <Icon as={FiMail} color="dental.500" boxSize={{ base: 4, md: 5 }} />
                        <Box>
                          <Text fontSize={{ base: "xs", md: "sm" }} color="gray.600">Email</Text>
                          <Text fontWeight="medium" fontSize={{ base: "sm", md: "md" }}>
                            {appointment.patientEmail}
                          </Text>
                        </Box>
                      </HStack>
                    </VStack>
                  </GridItem>
                </Grid>
              </CardBody>
            </Card>

            {/* Notes Section */}
            {appointment.notes && (
              <Card bg={cardBg}>
                <CardHeader>
                  <Heading size="sm">Notes</Heading>
                </CardHeader>
                <CardBody pt={0}>
                  <Text>{appointment.notes}</Text>
                </CardBody>
              </Card>
            )}

            {/* Quick Actions */}
            <Card bg={cardBg}>
              <CardHeader>
                <Heading size="sm">Quick Actions</Heading>
              </CardHeader>
              <CardBody pt={0}>
                <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={3}>
                  <Button colorScheme="green" size="sm" w="full">
                    Mark as Completed
                  </Button>
                  <Button colorScheme="blue" size="sm" w="full">
                    Send Reminder
                  </Button>
                  <Button colorScheme="orange" size="sm" w="full">
                    Reschedule
                  </Button>
                  <Button colorScheme="red" size="sm" variant="outline" w="full">
                    Cancel Appointment
                  </Button>
                </SimpleGrid>
              </CardBody>
            </Card>
          </VStack>
        </Container>
      </Layout>
    </ProtectedRoute>
  );
}
