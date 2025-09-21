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
  useColorModeValue,
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
  SimpleGrid,
  Flex,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  IconButton,
} from "@chakra-ui/react";
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
  FiGrid,
  FiList,
  FiEye,
} from "react-icons/fi";
import { useRouter } from "next/navigation";
import Layout from "../components/Layout";
import ProtectedRoute from "../components/ProtectedRoute";

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
  const [viewMode, setViewMode] = useState<"calendar" | "table" | "cards">(
    "calendar"
  );

  const cardBg = useColorModeValue("white", "gray.800");
  const calendarDayBorderColor = useColorModeValue("gray.200", "gray.600");
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

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add all days of the month
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
      // Single appointment - redirect to details page
      router.push(`/appointments/${dayAppointments[0].id}`);
    } else if (dayAppointments.length >= 3) {
      // Multiple appointments - show modal
      setSelectedDayAppointments(dayAppointments);
      setSelectedDayDate(date);
      onModalOpen();
    } else {
      // 2 appointments - still show modal for consistency
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
        <Heading size="md" textAlign="center">
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
                  borderColor={calendarDayBorderColor}
                  borderRadius="md"
                  cursor="pointer"
                  bg={
                    isToday
                      ? "dental.50"
                      : isSelected
                      ? "dental.100"
                      : dayAppointments.length > 0
                      ? "blue.50"
                      : "transparent"
                  }
                  _hover={{
                    bg: dayAppointments.length > 0 ? "blue.100" : "dental.50",
                  }}
                  position="relative"
                  onClick={() => handleDateClick(day)}
                >
                  <Text
                    fontSize={{ base: "xs", md: "sm" }}
                    fontWeight={
                      isToday
                        ? "bold"
                        : dayAppointments.length > 0
                        ? "semibold"
                        : "normal"
                    }
                    color={dayAppointments.length > 0 ? "blue.600" : "inherit"}
                  >
                    {day.getDate()}
                  </Text>

                  {/* Appointment indicators */}
                  {dayAppointments.length > 0 && (
                    <VStack spacing={0.5} align="stretch" mt={0.5}>
                      {dayAppointments.slice(0, 2).map((appointment, idx) => (
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
                      border="1px solid white"
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
                <Heading size={{ base: "md", md: "lg" }}>
                  Appointment Management
                </Heading>
                <Text color="gray.600" fontSize={{ base: "sm", md: "md" }}>
                  Schedule and manage patient appointments
                </Text>
              </Box>
              <Flex justifyContent={"flex-end"} gap={2}>
                {/* View Toggle */}
                <HStack spacing={1} bg="gray.100" p={1} borderRadius="md">
                  <Button
                    size="sm"
                    variant={viewMode === "calendar" ? "solid" : "ghost"}
                    colorScheme={viewMode === "calendar" ? "dental" : "gray"}
                    onClick={() => setViewMode("calendar")}
                    leftIcon={<FiCalendar />}
                    display={{ base: "none", sm: "flex" }}
                  >
                    Calendar
                  </Button>
                  <Button
                    size="sm"
                    variant={viewMode === "table" ? "solid" : "ghost"}
                    colorScheme={viewMode === "table" ? "dental" : "gray"}
                    onClick={() => setViewMode("table")}
                    leftIcon={<FiList />}
                  >
                    Table
                  </Button>
                  <Button
                    size="sm"
                    variant={viewMode === "cards" ? "solid" : "ghost"}
                    colorScheme={viewMode === "cards" ? "dental" : "gray"}
                    onClick={() => setViewMode("cards")}
                    leftIcon={<FiGrid />}
                  >
                    Cards
                  </Button>
                </HStack>
                <Button
                  w={{ base: "full", md: "fit-content" }}
                  leftIcon={<FiPlus />}
                  colorScheme="dental"
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
            <Card bg={cardBg}>
              <CardBody>
                <VStack spacing={4} align="stretch">
                  {/* Month Navigation */}
                  <HStack spacing={2} justify="center">
                    <Button
                      size="sm"
                      variant="outline"
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
                    >
                      {selectedDate.toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                      })}
                    </Text>
                    <Button
                      size="sm"
                      variant="outline"
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
                      onClick={() => setSelectedDate(new Date())}
                      minW="80px"
                      w={{ base: "full", lg: "auto" }}
                    >
                      Today
                    </Button>

                    <Select
                      value={selectedDentist}
                      onChange={(e) => setSelectedDentist(e.target.value)}
                      w={{ base: "full", sm: "200px" }}
                      // maxW=""
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

            {/* Main Content View */}
            {viewMode === "calendar" && (
              <Card bg={cardBg}>
                <CardHeader>
                  <Heading size="md">Appointment Calendar</Heading>
                  <Text fontSize="sm" color="gray.600">
                    Click on a date to view appointments. Days with appointments
                    are highlighted in blue.
                  </Text>
                </CardHeader>
                <CardBody>{renderCalendarView()}</CardBody>
              </Card>
            )}

            {viewMode === "table" && (
              <Card bg={cardBg}>
                <CardHeader>
                  <Heading size="md">Appointments Table</Heading>
                  <Text fontSize="sm" color="gray.600">
                    All appointments in a tabular format
                  </Text>
                </CardHeader>
                <CardBody p={0}>
                  <TableContainer>
                    <Table variant="simple" size="sm">
                      <Thead>
                        <Tr>
                          <Th>Patient</Th>
                          <Th>Dentist</Th>
                          <Th>Date & Time</Th>
                          <Th>Type</Th>
                          <Th>Status</Th>
                          <Th>Actions</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {appointments.map((appointment) => (
                          <Tr key={appointment.id} _hover={{ bg: "gray.50" }}>
                            <Td>
                              <HStack spacing={2}>
                                <Avatar
                                  size="sm"
                                  name={appointment.patientName}
                                />
                                <VStack align="start" spacing={0}>
                                  <Text fontSize="sm" fontWeight="medium">
                                    {appointment.patientName}
                                  </Text>
                                  <Text fontSize="xs" color="gray.600">
                                    {appointment.patientPhone}
                                  </Text>
                                </VStack>
                              </HStack>
                            </Td>
                            <Td>
                              <Text fontSize="sm">
                                {appointment.dentistName}
                              </Text>
                            </Td>
                            <Td>
                              <VStack align="start" spacing={0}>
                                <Text fontSize="sm">
                                  {new Date(
                                    appointment.date
                                  ).toLocaleDateString()}
                                </Text>
                                <Text fontSize="xs" color="gray.600">
                                  {formatTime(appointment.time)}
                                </Text>
                              </VStack>
                            </Td>
                            <Td>
                              <Text fontSize="sm">{appointment.type}</Text>
                            </Td>
                            <Td>
                              <Badge
                                colorScheme={getStatusColor(appointment.status)}
                                size="sm"
                              >
                                {appointment.status}
                              </Badge>
                            </Td>
                            <Td>
                              <HStack spacing={1}>
                                <IconButton
                                  aria-label="View appointment"
                                  icon={<FiEye />}
                                  size="sm"
                                  variant="ghost"
                                  onClick={() =>
                                    handleAppointmentClick(appointment)
                                  }
                                />
                                <IconButton
                                  aria-label="Edit appointment"
                                  icon={<FiEdit />}
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => {
                                    setSelectedAppointment(appointment);
                                    onOpen();
                                  }}
                                />
                                <IconButton
                                  aria-label="Delete appointment"
                                  icon={<FiTrash2 />}
                                  size="sm"
                                  variant="ghost"
                                  colorScheme="red"
                                  onClick={() =>
                                    handleDeleteAppointment(appointment.id)
                                  }
                                />
                              </HStack>
                            </Td>
                          </Tr>
                        ))}
                      </Tbody>
                    </Table>
                  </TableContainer>
                </CardBody>
              </Card>
            )}

            {viewMode === "cards" && (
              <Card bg={cardBg}>
                <CardHeader>
                  <Heading size="md">Appointments Cards</Heading>
                  <Text fontSize="sm" color="gray.600">
                    All appointments in a card layout
                  </Text>
                </CardHeader>
                <CardBody>
                  <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
                    {appointments.map((appointment) => (
                      <Card
                        key={appointment.id}
                        bg={cardBg}
                        border="1px"
                        borderColor="gray.200"
                        cursor="pointer"
                        _hover={{
                          borderColor: "dental.300",
                          boxShadow: "md",
                          transform: "translateY(-2px)",
                        }}
                        transition="all 0.2s"
                        onClick={() => handleAppointmentClick(appointment)}
                      >
                        <CardBody p={4}>
                          <VStack align="stretch" spacing={3}>
                            <HStack justify="space-between" align="start">
                              <HStack spacing={3}>
                                <Avatar
                                  size="md"
                                  name={appointment.patientName}
                                />
                                <VStack align="start" spacing={0}>
                                  <Text fontWeight="medium" fontSize="sm">
                                    {appointment.patientName}
                                  </Text>
                                  <Text fontSize="xs" color="gray.600">
                                    {appointment.dentistName}
                                  </Text>
                                </VStack>
                              </HStack>
                              <Badge
                                colorScheme={getStatusColor(appointment.status)}
                                size="sm"
                              >
                                {appointment.status}
                              </Badge>
                            </HStack>

                            <VStack align="stretch" spacing={2}>
                              <HStack spacing={2}>
                                <Icon
                                  as={FiCalendar}
                                  boxSize={4}
                                  color="gray.500"
                                />
                                <Text fontSize="sm">
                                  {new Date(
                                    appointment.date
                                  ).toLocaleDateString("en-US", {
                                    weekday: "short",
                                    month: "short",
                                    day: "numeric",
                                  })}
                                </Text>
                              </HStack>
                              <HStack spacing={2}>
                                <Icon
                                  as={FiClock}
                                  boxSize={4}
                                  color="gray.500"
                                />
                                <Text fontSize="sm">
                                  {formatTime(appointment.time)}
                                </Text>
                              </HStack>
                              <HStack spacing={2}>
                                <Icon
                                  as={FiUser}
                                  boxSize={4}
                                  color="gray.500"
                                />
                                <Text fontSize="sm">{appointment.type}</Text>
                              </HStack>
                            </VStack>

                            {appointment.notes && (
                              <Text
                                fontSize="xs"
                                color="gray.600"
                                noOfLines={2}
                              >
                                {appointment.notes}
                              </Text>
                            )}

                            <HStack justify="flex-end" spacing={1}>
                              <IconButton
                                aria-label="Edit appointment"
                                icon={<FiEdit />}
                                size="sm"
                                variant="ghost"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedAppointment(appointment);
                                  onOpen();
                                }}
                              />
                              <IconButton
                                aria-label="Delete appointment"
                                icon={<FiTrash2 />}
                                size="sm"
                                variant="ghost"
                                colorScheme="red"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteAppointment(appointment.id);
                                }}
                              />
                            </HStack>
                          </VStack>
                        </CardBody>
                      </Card>
                    ))}
                  </SimpleGrid>
                </CardBody>
              </Card>
            )}
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
            <ModalOverlay />
            <ModalContent mx={{ base: 0, md: 4 }} my={{ base: 0, md: 4 }}>
              <ModalHeader>
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
              <ModalCloseButton />
              <ModalBody pb={6}>
                <VStack spacing={3} align="stretch">
                  {selectedDayAppointments.map((appointment) => (
                    <Card
                      key={appointment.id}
                      bg={cardBg}
                      cursor="pointer"
                      onClick={() => handleAppointmentClick(appointment)}
                      _hover={{ bg: "dental.50" }}
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
                                >
                                  {appointment.patientName}
                                </Text>
                                <Text
                                  fontSize={{ base: "xs", md: "sm" }}
                                  color="gray.600"
                                >
                                  {appointment.dentistName}
                                </Text>
                              </Box>
                            </HStack>
                            <HStack spacing={4} wrap="wrap">
                              <HStack spacing={1}>
                                <Icon as={FiClock} boxSize={3} />
                                <Text fontSize={{ base: "xs", md: "sm" }}>
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
                              color="gray.600"
                            >
                              {appointment.type}
                            </Text>
                          </VStack>
                          <Icon
                            as={FiChevronRight}
                            color="gray.400"
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
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {appointment ? "Edit Appointment" : "Schedule New Appointment"}
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
                    <FormLabel>Dentist</FormLabel>
                    <Select
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
                    <FormLabel>Date</FormLabel>
                    <Input
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
                    <FormLabel>Time</FormLabel>
                    <Input
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
                    <FormLabel>Duration (minutes)</FormLabel>
                    <Select
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
                    <FormLabel>Type</FormLabel>
                    <Select
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
                    <FormLabel>Status</FormLabel>
                    <Select
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
                <FormLabel>Notes</FormLabel>
                <Textarea
                  value={formData.notes}
                  onChange={(e) =>
                    setFormData({ ...formData, notes: e.target.value })
                  }
                  placeholder="Additional notes or instructions..."
                />
              </FormControl>

              <HStack spacing={4} w="full" justify="flex-end">
                <Button variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button type="submit" colorScheme="dental">
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
