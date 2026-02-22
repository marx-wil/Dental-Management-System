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
  Avatar,
  Icon,
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
  Flex,
} from "@chakra-ui/react";
import {
  FiClock,
  FiPlus,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import { useRouter } from "next/navigation";
import Layout from "../components/Layout";
import ProtectedRoute from "../components/ProtectedRoute";
import {
  darkCard,
  darkInput,
  darkModalContent,
  darkOverlay,
  darkLabel,
} from "../styles/dashboard";

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
  status: "scheduled" | "confirmed" | "completed" | "cancelled" | "no-show";
  notes?: string;
  patientPhone?: string;
  patientEmail?: string;
}

const mockAppointments: Appointment[] = [
  {
    id: "1",
    patientId: "1",
    patientName: "Maria Santos",
    dentistId: "1",
    dentistName: "Dr. Juan Dela Cruz",
    date: "2025-01-15",
    time: "09:00",
    duration: 60,
    type: "Cleaning",
    status: "confirmed",
    notes: "Regular cleaning appointment",
    patientPhone: "+63 912 345 6789",
    patientEmail: "maria.santos@email.com",
  },
  {
    id: "2",
    patientId: "2",
    patientName: "Carlos Mendoza",
    dentistId: "1",
    dentistName: "Dr. Juan Dela Cruz",
    date: "2025-01-15",
    time: "10:30",
    duration: 90,
    type: "Filling",
    status: "scheduled",
    notes: "Cavity filling on tooth #14",
    patientPhone: "+63 912 345 6788",
    patientEmail: "carlos.mendoza@email.com",
  },
  {
    id: "3",
    patientId: "3",
    patientName: "Ana Rodriguez",
    dentistId: "2",
    dentistName: "Dr. Maria Santos",
    date: "2025-01-15",
    time: "14:00",
    duration: 120,
    type: "Root Canal",
    status: "scheduled",
    notes: "Root canal treatment on tooth #16",
    patientPhone: "+63 912 345 6787",
    patientEmail: "ana.rodriguez@email.com",
  },
  {
    id: "4",
    patientId: "4",
    patientName: "Luis Garcia",
    dentistId: "1",
    dentistName: "Dr. Juan Dela Cruz",
    date: "2025-01-15",
    time: "15:30",
    duration: 45,
    type: "Check-up",
    status: "confirmed",
    notes: "Annual check-up",
    patientPhone: "+63 912 345 6786",
    patientEmail: "luis.garcia@email.com",
  },
  {
    id: "5",
    patientId: "5",
    patientName: "Elena Martinez",
    dentistId: "2",
    dentistName: "Dr. Maria Santos",
    date: "2025-01-16",
    time: "09:00",
    duration: 60,
    type: "Cleaning",
    status: "scheduled",
    notes: "Regular cleaning appointment",
    patientPhone: "+63 912 345 6785",
    patientEmail: "elena.martinez@email.com",
  },
  {
    id: "6",
    patientId: "6",
    patientName: "Roberto Silva",
    dentistId: "1",
    dentistName: "Dr. Juan Dela Cruz",
    date: "2025-01-16",
    time: "11:00",
    duration: 90,
    type: "Crown",
    status: "confirmed",
    notes: "Crown placement on tooth #12",
    patientPhone: "+63 912 345 6784",
    patientEmail: "roberto.silva@email.com",
  },
  {
    id: "7",
    patientId: "7",
    patientName: "Carmen Lopez",
    dentistId: "3",
    dentistName: "Dr. Pedro Reyes",
    date: "2025-01-17",
    time: "08:30",
    duration: 45,
    type: "Check-up",
    status: "scheduled",
    notes: "Routine check-up",
    patientPhone: "+63 912 345 6783",
    patientEmail: "carmen.lopez@email.com",
  },
  {
    id: "8",
    patientId: "8",
    patientName: "Miguel Torres",
    dentistId: "2",
    dentistName: "Dr. Maria Santos",
    date: "2025-01-17",
    time: "10:00",
    duration: 60,
    type: "Extraction",
    status: "confirmed",
    notes: "Wisdom tooth extraction",
    patientPhone: "+63 912 345 6782",
    patientEmail: "miguel.torres@email.com",
  },
  {
    id: "9",
    patientId: "9",
    patientName: "Isabella Cruz",
    dentistId: "1",
    dentistName: "Dr. Juan Dela Cruz",
    date: "2025-01-17",
    time: "14:00",
    duration: 120,
    type: "Root Canal",
    status: "scheduled",
    notes: "Root canal treatment on tooth #19",
    patientPhone: "+63 912 345 6781",
    patientEmail: "isabella.cruz@email.com",
  },
  {
    id: "10",
    patientId: "10",
    patientName: "Fernando Ramos",
    dentistId: "3",
    dentistName: "Dr. Pedro Reyes",
    date: "2025-01-17",
    time: "16:00",
    duration: 60,
    type: "Consultation",
    status: "confirmed",
    notes: "Initial consultation for orthodontic treatment",
    patientPhone: "+63 912 345 6780",
    patientEmail: "fernando.ramos@email.com",
  },
];

const mockDentists = [
  { id: "1", name: "Dr. Juan Dela Cruz" },
  { id: "2", name: "Dr. Maria Santos" },
  { id: "3", name: "Dr. Pedro Reyes" },
];

const mockPatients = [
  { id: "1", name: "Maria Santos" },
  { id: "2", name: "Carlos Mendoza" },
  { id: "3", name: "Ana Rodriguez" },
  { id: "4", name: "Luis Garcia" },
  { id: "5", name: "Elena Martinez" },
  { id: "6", name: "Roberto Silva" },
  { id: "7", name: "Carmen Lopez" },
  { id: "8", name: "Miguel Torres" },
  { id: "9", name: "Isabella Cruz" },
  { id: "10", name: "Fernando Ramos" },
];

export default function AppointmentsPage() {
  const router = useRouter();
  const [appointments, setAppointments] =
    useState<Appointment[]>(mockAppointments);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedDentist, setSelectedDentist] = useState("all");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure();
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);
  const [selectedDayAppointments, setSelectedDayAppointments] = useState<
    Appointment[]
  >([]);
  const [selectedDayDate, setSelectedDayDate] = useState<Date | null>(null);

  const calendarDayBorderColor = "rgba(255,255,255,0.07)";

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "green";
      case "scheduled":
        return "blue";
      case "completed":
        return "gray";
      case "cancelled":
        return "red";
      case "no-show":
        return "orange";
      default:
        return "gray";
    }
  };

  const getAppointmentsForDate = (date: Date) => {
    const dateStr = date.toISOString().split("T")[0];
    return appointments.filter((apt) => apt.date === dateStr);
  };

  const getAppointmentsForWeek = (date: Date) => {
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - date.getDay());
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    return appointments.filter((apt) => {
      const aptDate = new Date(apt.date);
      return aptDate >= startOfWeek && aptDate <= endOfWeek;
    });
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  };

  const handleDateClick = (date: Date) => {
    const dayAppointments = getAppointmentsForDate(date);

    if (dayAppointments.length === 0) {
      return;
    } else if (dayAppointments.length === 1) {
      router.push(`/appointments/${dayAppointments[0].id}`);
    } else if (dayAppointments.length >= 3) {
      setSelectedDayAppointments(dayAppointments);
      setSelectedDayDate(date);
      onModalOpen();
    } else {
      setSelectedDayAppointments(dayAppointments);
      setSelectedDayDate(date);
      onModalOpen();
    }
  };

  const handleAppointmentClick = (appointment: Appointment) => {
    router.push(`/appointments/${appointment.id}`);
  };

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(":");
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? "PM" : "AM";
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const handleAddAppointment = (newAppointment: Omit<Appointment, "id">) => {
    const appointment: Appointment = {
      ...newAppointment,
      id: Date.now().toString(),
    };
    setAppointments([...appointments, appointment]);
    onClose();
  };

  const handleUpdateAppointment = (
    updatedAppointment: Appointment | Omit<Appointment, "id">
  ) => {
    if ("id" in updatedAppointment) {
      setAppointments(
        appointments.map((apt) =>
          apt.id === updatedAppointment.id ? updatedAppointment : apt
        )
      );
    }
    onClose();
    setSelectedAppointment(null);
  };

  const handleDeleteAppointment = (appointmentId: string) => {
    setAppointments(appointments.filter((apt) => apt.id !== appointmentId));
  };

  const renderCalendarView = () => {
    const days = getDaysInMonth(selectedDate);
    const monthName = selectedDate.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return (
      <VStack spacing={4} align="stretch">
        <Heading size="md" textAlign="center" color="white">
          {monthName}
        </Heading>

        {/* Day headers */}
        <Grid templateColumns="repeat(7, 1fr)" gap={{ base: 0.5, md: 1 }}>
          {dayNames.map((day) => (
            <GridItem key={day}>
              <Text
                fontSize={{ base: "xs", md: "sm" }}
                fontWeight="bold"
                textAlign="center"
                py={{ base: 1, md: 2 }}
                color="whiteAlpha.500"
              >
                {day}
              </Text>
            </GridItem>
          ))}
        </Grid>

        {/* Calendar days */}
        <Grid templateColumns="repeat(7, 1fr)" gap={{ base: 0.5, md: 1 }}>
          {days.map((day, index) => {
            if (!day) {
              return <GridItem key={index} h={{ base: "60px", md: "80px" }} />;
            }

            const dayAppointments = getAppointmentsForDate(day);
            const isToday = day.toDateString() === new Date().toDateString();
            const isSelected =
              day.toDateString() === selectedDate.toDateString();

            return (
              <GridItem key={day.getTime()}>
                <Box
                  h={{ base: "60px", md: "80px" }}
                  p={{ base: 1, md: 2 }}
                  border="1px solid"
                  borderColor={
                    isToday
                      ? "cyan.500"
                      : calendarDayBorderColor
                  }
                  borderRadius="md"
                  cursor="pointer"
                  bg={
                    isToday
                      ? "rgba(6,182,212,0.12)"
                      : isSelected
                      ? "rgba(6,182,212,0.08)"
                      : "transparent"
                  }
                  _hover={{ bg: "rgba(255,255,255,0.04)" }}
                  position="relative"
                  onClick={() => handleDateClick(day)}
                >
                  <Text
                    fontSize={{ base: "xs", md: "sm" }}
                    fontWeight={isToday ? "bold" : "normal"}
                    color="white"
                  >
                    {day.getDate()}
                  </Text>

                  {/* Appointment indicators */}
                  {dayAppointments.length > 0 && (
                    <VStack spacing={0.5} align="stretch" mt={0.5}>
                      {dayAppointments.slice(0, 2).map((appointment) => (
                        <Box
                          key={appointment.id}
                          h={{ base: "3px", md: "4px" }}
                          bg={
                            getStatusColor(appointment.status) === "green"
                              ? "green.400"
                              : getStatusColor(appointment.status) === "blue"
                              ? "blue.400"
                              : getStatusColor(appointment.status) === "red"
                              ? "red.400"
                              : getStatusColor(appointment.status) === "orange"
                              ? "orange.400"
                              : "gray.400"
                          }
                          borderRadius="full"
                          title={`${formatTime(appointment.time)} - ${
                            appointment.patientName
                          }`}
                        />
                      ))}
                      {dayAppointments.length > 2 && (
                        <Box
                          h={{ base: "3px", md: "4px" }}
                          bg="orange.400"
                          borderRadius="full"
                          title={`${
                            dayAppointments.length - 2
                          } more appointments`}
                        />
                      )}
                    </VStack>
                  )}

                  {/* Orange circle for 3+ appointments */}
                  {dayAppointments.length >= 3 && (
                    <Box
                      position="absolute"
                      top={0.5}
                      right={0.5}
                      w={{ base: "6px", md: "8px" }}
                      h={{ base: "6px", md: "8px" }}
                      bg="orange.500"
                      borderRadius="full"
                      border="1px solid"
                      borderColor="rgba(255,255,255,0.2)"
                    />
                  )}
                </Box>
              </GridItem>
            );
          })}
        </Grid>
      </VStack>
    );
  };

  return (
    <ProtectedRoute>
      <Layout>
        <Container maxW="7xl" py={8}>
          <VStack spacing={8} align="stretch">
            {/* Header */}
            <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={4}>
              <Box flex="1" minW="200px">
                <Heading size={{ base: "md", md: "lg" }} color="white">
                  Appointment Management
                </Heading>
                <Text color="whiteAlpha.500" fontSize={{ base: "sm", md: "md" }}>
                  Schedule and manage patient appointments
                </Text>
              </Box>
              <Flex justifyContent="flex-end">
                <Button
                  w={{ base: "full", md: "fit-content" }}
                  leftIcon={<FiPlus />}
                  bgGradient="linear(135deg, cyan.500, violet.500)"
                  color="white"
                  _hover={{
                    bgGradient: "linear(135deg, cyan.400, violet.400)",
                    boxShadow: "0 0 20px rgba(6,182,212,0.3)",
                  }}
                  onClick={onOpen}
                  size={{ base: "sm", md: "md" }}
                  minW={{ base: "full", md: "fit-content" }}
                >
                  <Text display={{ base: "none", sm: "inline" }}>
                    Schedule Appointment
                  </Text>
                  <Text display={{ base: "inline", sm: "none" }}>Schedule</Text>
                </Button>
              </Flex>
            </Grid>

            {/* Controls */}
            <Card {...darkCard}>
              <CardBody>
                <VStack spacing={4} align="stretch">
                  {/* Month Navigation */}
                  <HStack spacing={2} justify="center">
                    <Button
                      size="sm"
                      variant="outline"
                      borderColor="rgba(255,255,255,0.15)"
                      color="whiteAlpha.700"
                      _hover={{ bg: "rgba(255,255,255,0.07)" }}
                      onClick={() => {
                        const newDate = new Date(selectedDate);
                        newDate.setMonth(selectedDate.getMonth() - 1);
                        setSelectedDate(newDate);
                      }}
                    >
                      <FiChevronLeft />
                    </Button>
                    <Text
                      minW={{ base: "150px", md: "200px" }}
                      textAlign="center"
                      fontWeight="medium"
                      fontSize={{ base: "sm", md: "md" }}
                      color="white"
                    >
                      {selectedDate.toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                      })}
                    </Text>
                    <Button
                      size="sm"
                      variant="outline"
                      borderColor="rgba(255,255,255,0.15)"
                      color="whiteAlpha.700"
                      _hover={{ bg: "rgba(255,255,255,0.07)" }}
                      onClick={() => {
                        const newDate = new Date(selectedDate);
                        newDate.setMonth(selectedDate.getMonth() + 1);
                        setSelectedDate(newDate);
                      }}
                    >
                      <FiChevronRight />
                    </Button>
                  </HStack>

                  {/* Action Buttons */}
                  <HStack
                    spacing={4}
                    justify={{ base: "center", md: "flex-end" }}
                    wrap="wrap"
                  >
                    <Button
                      size="sm"
                      variant="outline"
                      borderColor="rgba(255,255,255,0.15)"
                      color="whiteAlpha.700"
                      _hover={{ bg: "rgba(255,255,255,0.07)" }}
                      onClick={() => setSelectedDate(new Date())}
                      minW="80px"
                      w={{ base: "full", lg: "auto" }}
                    >
                      Today
                    </Button>

                    <Select
                      {...darkInput}
                      value={selectedDentist}
                      onChange={(e) => setSelectedDentist(e.target.value)}
                      w={{ base: "full", sm: "200px" }}
                    >
                      <option value="all">All Dentists</option>
                      {mockDentists.map((dentist) => (
                        <option key={dentist.id} value={dentist.id}>
                          {dentist.name}
                        </option>
                      ))}
                    </Select>
                  </HStack>
                </VStack>
              </CardBody>
            </Card>

            {/* Calendar View */}
            <Card {...darkCard}>
              <CardHeader>
                <Heading size="md" color="white">Appointment Calendar</Heading>
                <Text fontSize="sm" color="whiteAlpha.500">
                  Click on a date to view appointments. Days with 3+
                  appointments show an orange indicator.
                </Text>
              </CardHeader>
              <CardBody>{renderCalendarView()}</CardBody>
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
            onSave={
              selectedAppointment
                ? handleUpdateAppointment
                : handleAddAppointment
            }
          />

          {/* Multiple Appointments Modal */}
          <Modal
            isOpen={isModalOpen}
            onClose={onModalClose}
            size={{ base: "full", md: "lg" }}
          >
            <ModalOverlay {...darkOverlay} />
            <ModalContent
              {...darkModalContent}
              mx={{ base: 0, md: 4 }}
              my={{ base: 0, md: 4 }}
            >
              <ModalHeader
                color="white"
                borderBottom="1px solid rgba(255,255,255,0.07)"
              >
                <Text fontSize={{ base: "sm", md: "md" }}>
                  Appointments for{" "}
                  {selectedDayDate?.toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </Text>
              </ModalHeader>
              <ModalCloseButton color="whiteAlpha.700" />
              <ModalBody pb={6}>
                <VStack spacing={3} align="stretch">
                  {selectedDayAppointments.map((appointment) => (
                    <Card
                      key={appointment.id}
                      bg="rgba(255,255,255,0.04)"
                      border="1px solid"
                      borderColor="rgba(255,255,255,0.07)"
                      borderRadius="xl"
                      cursor="pointer"
                      onClick={() => handleAppointmentClick(appointment)}
                      _hover={{ bg: "rgba(255,255,255,0.07)", borderColor: "rgba(255,255,255,0.12)" }}
                      transition="all 0.15s ease"
                    >
                      <CardBody p={{ base: 3, md: 4 }}>
                        <HStack
                          justify="space-between"
                          align="start"
                          spacing={3}
                        >
                          <VStack align="start" spacing={2} flex="1">
                            <HStack spacing={3}>
                              <Avatar
                                size="sm"
                                name={appointment.patientName}
                              />
                              <Box>
                                <Text
                                  fontWeight="medium"
                                  fontSize={{ base: "sm", md: "md" }}
                                  color="white"
                                >
                                  {appointment.patientName}
                                </Text>
                                <Text
                                  fontSize={{ base: "xs", md: "sm" }}
                                  color="whiteAlpha.500"
                                >
                                  {appointment.dentistName}
                                </Text>
                              </Box>
                            </HStack>
                            <HStack spacing={4} wrap="wrap">
                              <HStack spacing={1}>
                                <Icon as={FiClock} boxSize={3} color="whiteAlpha.500" />
                                <Text fontSize={{ base: "xs", md: "sm" }} color="whiteAlpha.700">
                                  {formatTime(appointment.time)}
                                </Text>
                              </HStack>
                              <Badge
                                colorScheme={getStatusColor(appointment.status)}
                                fontSize={{ base: "xs", md: "sm" }}
                                px={2}
                                py={1}
                              >
                                {appointment.status}
                              </Badge>
                            </HStack>
                            <Text
                              fontSize={{ base: "xs", md: "sm" }}
                              color="whiteAlpha.500"
                            >
                              {appointment.type}
                            </Text>
                          </VStack>
                          <Icon
                            as={FiChevronRight}
                            color="whiteAlpha.400"
                            boxSize={4}
                          />
                        </HStack>
                      </CardBody>
                    </Card>
                  ))}
                </VStack>
              </ModalBody>
            </ModalContent>
          </Modal>
        </Container>
      </Layout>
    </ProtectedRoute>
  );
}

// Appointment Modal Component
function AppointmentModal({
  isOpen,
  onClose,
  appointment,
  onSave,
}: {
  isOpen: boolean;
  onClose: () => void;
  appointment: Appointment | null;
  onSave: (appointment: Appointment | Omit<Appointment, "id">) => void;
}) {
  const [formData, setFormData] = useState({
    patientId: "",
    dentistId: "",
    date: "",
    time: "",
    duration: 60,
    type: "",
    status: "scheduled" as Appointment["status"],
    notes: "",
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
        notes: appointment.notes || "",
      });
    } else {
      setFormData({
        patientId: "",
        dentistId: "",
        date: "",
        time: "",
        duration: 60,
        type: "",
        status: "scheduled",
        notes: "",
      });
    }
  }, [appointment]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const appointmentData = {
      ...formData,
      patientName:
        mockPatients.find((p) => p.id === formData.patientId)?.name || "",
      dentistName:
        mockDentists.find((d) => d.id === formData.dentistId)?.name || "",
    };

    if (appointment) {
      onSave({ ...appointment, ...appointmentData });
    } else {
      onSave(appointmentData);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay {...darkOverlay} />
      <ModalContent {...darkModalContent}>
        <ModalHeader color="white" borderBottom="1px solid rgba(255,255,255,0.07)">
          {appointment ? "Edit Appointment" : "Schedule New Appointment"}
        </ModalHeader>
        <ModalCloseButton color="whiteAlpha.700" />
        <ModalBody pb={6}>
          <form onSubmit={handleSubmit}>
            <VStack spacing={4}>
              <Grid templateColumns="repeat(2, 1fr)" gap={4} w="full">
                <GridItem>
                  <FormControl isRequired>
                    <FormLabel {...darkLabel}>Patient</FormLabel>
                    <Select
                      {...darkInput}
                      value={formData.patientId}
                      onChange={(e) =>
                        setFormData({ ...formData, patientId: e.target.value })
                      }
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
                    <FormLabel {...darkLabel}>Dentist</FormLabel>
                    <Select
                      {...darkInput}
                      value={formData.dentistId}
                      onChange={(e) =>
                        setFormData({ ...formData, dentistId: e.target.value })
                      }
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
                    <FormLabel {...darkLabel}>Date</FormLabel>
                    <Input
                      {...darkInput}
                      type="date"
                      value={formData.date}
                      onChange={(e) =>
                        setFormData({ ...formData, date: e.target.value })
                      }
                    />
                  </FormControl>
                </GridItem>
                <GridItem>
                  <FormControl isRequired>
                    <FormLabel {...darkLabel}>Time</FormLabel>
                    <Input
                      {...darkInput}
                      type="time"
                      value={formData.time}
                      onChange={(e) =>
                        setFormData({ ...formData, time: e.target.value })
                      }
                    />
                  </FormControl>
                </GridItem>
                <GridItem>
                  <FormControl isRequired>
                    <FormLabel {...darkLabel}>Duration (minutes)</FormLabel>
                    <Select
                      {...darkInput}
                      value={formData.duration}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          duration: parseInt(e.target.value),
                        })
                      }
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
                    <FormLabel {...darkLabel}>Type</FormLabel>
                    <Select
                      {...darkInput}
                      value={formData.type}
                      onChange={(e) =>
                        setFormData({ ...formData, type: e.target.value })
                      }
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
                    <FormLabel {...darkLabel}>Status</FormLabel>
                    <Select
                      {...darkInput}
                      value={formData.status}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          status: e.target.value as Appointment["status"],
                        })
                      }
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
                <FormLabel {...darkLabel}>Notes</FormLabel>
                <Textarea
                  {...darkInput}
                  value={formData.notes}
                  onChange={(e) =>
                    setFormData({ ...formData, notes: e.target.value })
                  }
                  placeholder="Additional notes or instructions..."
                />
              </FormControl>

              <HStack spacing={4} w="full" justify="flex-end">
                <Button
                  variant="outline"
                  onClick={onClose}
                  borderColor="rgba(255,255,255,0.15)"
                  color="whiteAlpha.700"
                  _hover={{ bg: "rgba(255,255,255,0.07)" }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  bgGradient="linear(135deg, cyan.500, violet.500)"
                  color="white"
                  _hover={{
                    bgGradient: "linear(135deg, cyan.400, violet.400)",
                    boxShadow: "0 0 20px rgba(6,182,212,0.3)",
                  }}
                >
                  {appointment ? "Update Appointment" : "Schedule Appointment"}
                </Button>
              </HStack>
            </VStack>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
