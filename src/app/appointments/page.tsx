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
  Select,
  Grid,
  GridItem,
  Card,
  CardBody,
  CardHeader,
  Badge,
  Avatar,
  Icon,
  useColorModeValue,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  useDisclosure,
} from '@chakra-ui/react';
import {
  FiCalendar,
  FiClock,
  FiUser,
  FiPlus,
  FiEdit,
  FiTrash2,
  FiChevronLeft,
  FiChevronRight,
  FiMapPin,
  FiPhone,
} from 'react-icons/fi';
import Layout from '../components/Layout';
import ProtectedRoute from '../components/ProtectedRoute';

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
    date: '2024-01-15',
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
    date: '2024-01-15',
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
    date: '2024-01-15',
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
    date: '2024-01-16',
    time: '09:00',
    duration: 45,
    type: 'Check-up',
    status: 'confirmed',
    notes: 'Annual check-up',
    patientPhone: '+63 912 345 6786',
    patientEmail: 'luis.garcia@email.com',
  },
];

const mockDentists = [
  { id: '1', name: 'Dr. Juan Dela Cruz' },
  { id: '2', name: 'Dr. Maria Santos' },
  { id: '3', name: 'Dr. Pedro Reyes' },
];

const mockPatients = [
  { id: '1', name: 'Maria Santos' },
  { id: '2', name: 'Carlos Mendoza' },
  { id: '3', name: 'Ana Rodriguez' },
  { id: '4', name: 'Luis Garcia' },
];

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'day' | 'week' | 'month'>('day');
  const [selectedDentist, setSelectedDentist] = useState('all');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  
  const cardBg = useColorModeValue('white', 'gray.800');

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

  const getAppointmentsForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return appointments.filter(apt => apt.date === dateStr);
  };

  const getAppointmentsForWeek = (date: Date) => {
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - date.getDay());
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    
    return appointments.filter(apt => {
      const aptDate = new Date(apt.date);
      return aptDate >= startOfWeek && aptDate <= endOfWeek;
    });
  };

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const handleAddAppointment = (newAppointment: Omit<Appointment, 'id'>) => {
    const appointment: Appointment = {
      ...newAppointment,
      id: Date.now().toString(),
    };
    setAppointments([...appointments, appointment]);
    onClose();
  };

  const handleUpdateAppointment = (updatedAppointment: Appointment | Omit<Appointment, 'id'>) => {
    if ('id' in updatedAppointment) {
      setAppointments(appointments.map(apt => 
        apt.id === updatedAppointment.id ? updatedAppointment : apt
      ));
    }
    onClose();
    setSelectedAppointment(null);
  };

  const handleDeleteAppointment = (appointmentId: string) => {
    setAppointments(appointments.filter(apt => apt.id !== appointmentId));
  };

  const renderDayView = () => {
    const dayAppointments = getAppointmentsForDate(selectedDate);
    
    return (
      <VStack spacing={4} align="stretch">
        {dayAppointments.length === 0 ? (
          <Card bg={cardBg}>
            <CardBody textAlign="center" py={8}>
              <Icon as={FiCalendar} boxSize={12} color="gray.400" mb={4} />
              <Text color="gray.600">No appointments scheduled for this day</Text>
            </CardBody>
          </Card>
        ) : (
          dayAppointments.map((appointment) => (
            <Card key={appointment.id} bg={cardBg}>
              <CardBody>
                <HStack justify="space-between" align="start">
                  <VStack align="start" spacing={2}>
                    <HStack spacing={3}>
                      <Avatar size="sm" name={appointment.patientName} />
                      <Box>
                        <Text fontWeight="medium">{appointment.patientName}</Text>
                        <Text fontSize="sm" color="gray.600">{appointment.dentistName}</Text>
                      </Box>
                    </HStack>
                    <HStack spacing={4}>
                      <HStack spacing={1}>
                        <Icon as={FiClock} />
                        <Text fontSize="sm">{formatTime(appointment.time)}</Text>
                      </HStack>
                      <Badge colorScheme={getStatusColor(appointment.status)}>
                        {appointment.status}
                      </Badge>
                    </HStack>
                    <Text fontSize="sm" color="gray.600">{appointment.type}</Text>
                  </VStack>
                  <HStack spacing={2}>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setSelectedAppointment(appointment);
                        onOpen();
                      }}
                    >
                      <FiEdit />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      colorScheme="red"
                      onClick={() => handleDeleteAppointment(appointment.id)}
                    >
                      <FiTrash2 />
                    </Button>
                  </HStack>
                </HStack>
              </CardBody>
            </Card>
          ))
        )}
      </VStack>
    );
  };

  const renderWeekView = () => {
    const weekAppointments = getAppointmentsForWeek(selectedDate);
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
    return (
      <Grid templateColumns="repeat(7, 1fr)" gap={4}>
        {days.map((day, index) => {
          const dayDate = new Date(selectedDate);
          dayDate.setDate(selectedDate.getDate() - selectedDate.getDay() + index);
          const dayAppointments = getAppointmentsForDate(dayDate);
          
          return (
            <GridItem key={day}>
              <Card bg={cardBg} h="full">
                <CardHeader pb={2}>
                  <Text fontWeight="medium" textAlign="center">{day}</Text>
                  <Text fontSize="sm" color="gray.600" textAlign="center">
                    {dayDate.getDate()}
                  </Text>
                </CardHeader>
                <CardBody pt={0}>
                  <VStack spacing={2} align="stretch">
                    {dayAppointments.map((appointment) => (
                      <Box
                        key={appointment.id}
                        p={2}
                        bg="dental.50"
                        borderRadius="md"
                        borderLeft="3px solid"
                        borderLeftColor="dental.500"
                        cursor="pointer"
                        onClick={() => {
                          setSelectedAppointment(appointment);
                          onOpen();
                        }}
                      >
                        <Text fontSize="xs" fontWeight="medium">
                          {formatTime(appointment.time)}
                        </Text>
                        <Text fontSize="xs" color="gray.600">
                          {appointment.patientName}
                        </Text>
                        <Text fontSize="xs" color="gray.500">
                          {appointment.type}
                        </Text>
                      </Box>
                    ))}
                  </VStack>
                </CardBody>
              </Card>
            </GridItem>
          );
        })}
      </Grid>
    );
  };

  return (
    <ProtectedRoute>
      <Layout>
        <Container maxW="7xl" py={8}>
          <VStack spacing={8} align="stretch">
            {/* Header */}
            <HStack justify="space-between">
              <Box>
                <Heading size="lg">Appointment Management</Heading>
                <Text color="gray.600">Schedule and manage patient appointments</Text>
              </Box>
              <Button
                leftIcon={<FiPlus />}
                colorScheme="dental"
                onClick={onOpen}
              >
                Schedule Appointment
              </Button>
            </HStack>

            {/* Controls */}
            <Card bg={cardBg}>
              <CardBody>
                <HStack spacing={4} wrap="wrap">
                  <HStack spacing={2}>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        const newDate = new Date(selectedDate);
                        newDate.setDate(selectedDate.getDate() - 1);
                        setSelectedDate(newDate);
                      }}
                    >
                      <FiChevronLeft />
                    </Button>
                    <Text minW="120px" textAlign="center">
                      {selectedDate.toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </Text>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        const newDate = new Date(selectedDate);
                        newDate.setDate(selectedDate.getDate() + 1);
                        setSelectedDate(newDate);
                      }}
                    >
                      <FiChevronRight />
                    </Button>
                  </HStack>
                  
                  <Select
                    value={viewMode}
                    onChange={(e) => setViewMode(e.target.value as 'day' | 'week' | 'month')}
                    w="120px"
                  >
                    <option value="day">Day</option>
                    <option value="week">Week</option>
                    <option value="month">Month</option>
                  </Select>
                  
                  <Select
                    value={selectedDentist}
                    onChange={(e) => setSelectedDentist(e.target.value)}
                    w="200px"
                  >
                    <option value="all">All Dentists</option>
                    {mockDentists.map((dentist) => (
                      <option key={dentist.id} value={dentist.id}>
                        {dentist.name}
                      </option>
                    ))}
                  </Select>
                </HStack>
              </CardBody>
            </Card>

            {/* Calendar View */}
            <Card bg={cardBg}>
              <CardHeader>
                <Heading size="md">
                  {viewMode === 'day' && 'Daily View'}
                  {viewMode === 'week' && 'Weekly View'}
                  {viewMode === 'month' && 'Monthly View'}
                </Heading>
              </CardHeader>
              <CardBody>
                {viewMode === 'day' && renderDayView()}
                {viewMode === 'week' && renderWeekView()}
                {viewMode === 'month' && (
                  <Text textAlign="center" color="gray.600" py={8}>
                    Monthly view coming soon...
                  </Text>
                )}
              </CardBody>
            </Card>
          </VStack>

          {/* Add/Edit Appointment Modal */}
          <AppointmentModal
            isOpen={isOpen}
            onClose={() => {
              onClose();
              setSelectedAppointment(null);
            }}
            appointment={selectedAppointment}
            onSave={selectedAppointment ? handleUpdateAppointment : handleAddAppointment}
          />
        </Container>
      </Layout>
    </ProtectedRoute>
  );
}

// Appointment Modal Component
function AppointmentModal({ isOpen, onClose, appointment, onSave }: {
  isOpen: boolean;
  onClose: () => void;
  appointment: Appointment | null;
  onSave: (appointment: Appointment | Omit<Appointment, 'id'>) => void;
}) {
  const [formData, setFormData] = useState({
    patientId: '',
    dentistId: '',
    date: '',
    time: '',
    duration: 60,
    type: '',
    status: 'scheduled' as Appointment['status'],
    notes: '',
  });

  React.useEffect(() => {
    if (appointment) {
      setFormData({
        patientId: appointment.patientId,
        dentistId: appointment.dentistId,
        date: appointment.date,
        time: appointment.time,
        duration: appointment.duration,
        type: appointment.type,
        status: appointment.status,
        notes: appointment.notes || '',
      });
    } else {
      setFormData({
        patientId: '',
        dentistId: '',
        date: '',
        time: '',
        duration: 60,
        type: '',
        status: 'scheduled',
        notes: '',
      });
    }
  }, [appointment]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const appointmentData = {
      ...formData,
      patientName: mockPatients.find(p => p.id === formData.patientId)?.name || '',
      dentistName: mockDentists.find(d => d.id === formData.dentistId)?.name || '',
    };

    if (appointment) {
      onSave({ ...appointment, ...appointmentData });
    } else {
      onSave(appointmentData);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {appointment ? 'Edit Appointment' : 'Schedule New Appointment'}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <form onSubmit={handleSubmit}>
            <VStack spacing={4}>
              <Grid templateColumns="repeat(2, 1fr)" gap={4} w="full">
                <GridItem>
                  <FormControl isRequired>
                    <FormLabel>Patient</FormLabel>
                    <Select
                      value={formData.patientId}
                      onChange={(e) => setFormData({ ...formData, patientId: e.target.value })}
                    >
                      <option value="">Select Patient</option>
                      {mockPatients.map((patient) => (
                        <option key={patient.id} value={patient.id}>
                          {patient.name}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                </GridItem>
                <GridItem>
                  <FormControl isRequired>
                    <FormLabel>Dentist</FormLabel>
                    <Select
                      value={formData.dentistId}
                      onChange={(e) => setFormData({ ...formData, dentistId: e.target.value })}
                    >
                      <option value="">Select Dentist</option>
                      {mockDentists.map((dentist) => (
                        <option key={dentist.id} value={dentist.id}>
                          {dentist.name}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                </GridItem>
                <GridItem>
                  <FormControl isRequired>
                    <FormLabel>Date</FormLabel>
                    <Input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    />
                  </FormControl>
                </GridItem>
                <GridItem>
                  <FormControl isRequired>
                    <FormLabel>Time</FormLabel>
                    <Input
                      type="time"
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    />
                  </FormControl>
                </GridItem>
                <GridItem>
                  <FormControl isRequired>
                    <FormLabel>Duration (minutes)</FormLabel>
                    <Select
                      value={formData.duration}
                      onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
                    >
                      <option value={30}>30 minutes</option>
                      <option value={45}>45 minutes</option>
                      <option value={60}>1 hour</option>
                      <option value={90}>1.5 hours</option>
                      <option value={120}>2 hours</option>
                    </Select>
                  </FormControl>
                </GridItem>
                <GridItem>
                  <FormControl isRequired>
                    <FormLabel>Type</FormLabel>
                    <Select
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    >
                      <option value="">Select Type</option>
                      <option value="Check-up">Check-up</option>
                      <option value="Cleaning">Cleaning</option>
                      <option value="Filling">Filling</option>
                      <option value="Extraction">Extraction</option>
                      <option value="Root Canal">Root Canal</option>
                      <option value="Crown">Crown</option>
                      <option value="Consultation">Consultation</option>
                    </Select>
                  </FormControl>
                </GridItem>
                <GridItem>
                  <FormControl>
                    <FormLabel>Status</FormLabel>
                    <Select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value as Appointment['status'] })}
                    >
                      <option value="scheduled">Scheduled</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                      <option value="no-show">No Show</option>
                    </Select>
                  </FormControl>
                </GridItem>
              </Grid>
              
              <FormControl>
                <FormLabel>Notes</FormLabel>
                <Textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Additional notes or instructions..."
                />
              </FormControl>

              <HStack spacing={4} w="full" justify="flex-end">
                <Button variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button type="submit" colorScheme="dental">
                  {appointment ? 'Update Appointment' : 'Schedule Appointment'}
                </Button>
              </HStack>
            </VStack>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
