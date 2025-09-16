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
  Input,
  InputGroup,
  InputLeftElement,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Select,
  Textarea,
  Grid,
  GridItem,
  Card,
  CardBody,
  CardHeader,
  useColorModeValue,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Flex,
} from "@chakra-ui/react";
import {
  FiSearch,
  FiPlus,
  FiMoreVertical,
  FiEdit,
  FiTrash2,
  FiEye,
  FiCalendar,
  FiPhone,
  FiMail,
  FiMapPin,
  FiUser,
  FiUpload,
} from "react-icons/fi";
import Layout from "../components/Layout";
import ProtectedRoute from "../components/ProtectedRoute";

interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  dateOfBirth: string;
  gender: "Male" | "Female";
  emergencyContact: string;
  medicalHistory: string;
  allergies: string;
  lastVisit: string;
  nextAppointment?: string;
  status: "Active" | "Inactive";
  avatar?: string;
}

const mockPatients: Patient[] = [
  {
    id: "1",
    name: "Maria Santos",
    email: "maria.santos@email.com",
    phone: "+63 912 345 6789",
    address: "123 Rizal Street, Manila",
    dateOfBirth: "1985-03-15",
    gender: "Female",
    emergencyContact: "Juan Santos - +63 912 345 6790",
    medicalHistory: "No significant medical history",
    allergies: "Penicillin",
    lastVisit: "2024-01-15",
    nextAppointment: "2024-02-15",
    status: "Active",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: "2",
    name: "Carlos Mendoza",
    email: "carlos.mendoza@email.com",
    phone: "+63 912 345 6788",
    address: "456 Quezon Avenue, Quezon City",
    dateOfBirth: "1978-07-22",
    gender: "Male",
    emergencyContact: "Ana Mendoza - +63 912 345 6787",
    medicalHistory: "Diabetes Type 2",
    allergies: "None",
    lastVisit: "2024-01-10",
    nextAppointment: "2024-02-10",
    status: "Active",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: "3",
    name: "Ana Rodriguez",
    email: "ana.rodriguez@email.com",
    phone: "+63 912 345 6787",
    address: "789 Makati Avenue, Makati",
    dateOfBirth: "1992-11-08",
    gender: "Female",
    emergencyContact: "Luis Rodriguez - +63 912 345 6786",
    medicalHistory: "Hypertension",
    allergies: "Latex",
    lastVisit: "2024-01-05",
    status: "Active",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
  },
];

export default function PatientsPage() {
  const [patients, setPatients] = useState<Patient[]>(mockPatients);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const cardBg = useColorModeValue("white", "gray.800");

  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.phone.includes(searchTerm)
  );

  const handleAddPatient = (newPatient: Omit<Patient, "id">) => {
    const patient: Patient = {
      ...newPatient,
      id: Date.now().toString(),
    };
    setPatients([...patients, patient]);
    setIsAddModalOpen(false);
  };

  const handleEditPatient = (updatedPatient: Patient) => {
    setPatients(
      patients.map((p) => (p.id === updatedPatient.id ? updatedPatient : p))
    );
    setIsEditModalOpen(false);
    setSelectedPatient(null);
  };

  const handleDeletePatient = (patientId: string) => {
    setPatients(patients.filter((p) => p.id !== patientId));
  };

  const getStatusColor = (status: string) => {
    return status === "Active" ? "green" : "gray";
  };

  return (
    <ProtectedRoute allowedRoles={["admin", "dentist", "staff"]}>
      <Layout>
        <Container maxW="7xl" py={8}>
          <VStack spacing={8} align="stretch">
            {/* Header */}
            <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={4}>
              <Box>
                <Heading size="lg">Patient Management</Heading>
                <Text color="gray.600">
                  Manage patient records and information
                </Text>
              </Box>
              <Flex justifyContent={"flex-end"}>
                <Button
                  leftIcon={<FiPlus />}
                  colorScheme="dental"
                  onClick={() => setIsAddModalOpen(true)}
                  px={6}
                  w={{base: "full", md: "fit-content"}}
                >
                  Add Patient
                </Button>
              </Flex>
            </Grid>

            {/* Search and Filters */}
            <Card bg={cardBg}>
              <CardBody>
                <HStack spacing={4}>
                  <InputGroup flex={1}>
                    <InputLeftElement>
                      <FiSearch />
                    </InputLeftElement>
                    <Input
                      placeholder="Search patients by name, email, or phone..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </InputGroup>
                  <Select placeholder="Filter by status" w="200px">
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </Select>
                </HStack>
              </CardBody>
            </Card>

            {/* Patients Table */}
            <Card bg={cardBg}>
              <CardHeader>
                <Heading size="md">
                  Patients ({filteredPatients.length})
                </Heading>
              </CardHeader>
              <CardBody overflowX="auto">
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th>Patient</Th>
                      <Th>Contact</Th>
                      <Th>Last Visit</Th>
                      <Th>Next Appointment</Th>
                      <Th>Status</Th>
                      <Th>Actions</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {filteredPatients.map((patient) => (
                      <Tr key={patient.id}>
                        <Td>
                          <HStack spacing={3}>
                            <Avatar
                              size="sm"
                              src={patient.avatar}
                              name={patient.name}
                            />
                            <Box>
                              <Text fontWeight="medium">{patient.name}</Text>
                              <Text fontSize="sm" color="gray.600">
                                {patient.gender},{" "}
                                {new Date().getFullYear() -
                                  new Date(
                                    patient.dateOfBirth
                                  ).getFullYear()}{" "}
                                years old
                              </Text>
                            </Box>
                          </HStack>
                        </Td>
                        <Td>
                          <VStack align="start" spacing={1}>
                            <HStack spacing={2}>
                              <FiPhone size={12} />
                              <Text fontSize="sm">{patient.phone}</Text>
                            </HStack>
                            <HStack spacing={2}>
                              <FiMail size={12} />
                              <Text fontSize="sm">{patient.email}</Text>
                            </HStack>
                          </VStack>
                        </Td>
                        <Td>
                          <Text fontSize="sm">
                            {new Date(patient.lastVisit).toLocaleDateString()}
                          </Text>
                        </Td>
                        <Td>
                          <Text fontSize="sm">
                            {patient.nextAppointment
                              ? new Date(
                                  patient.nextAppointment
                                ).toLocaleDateString()
                              : "None scheduled"}
                          </Text>
                        </Td>
                        <Td>
                          <Badge colorScheme={getStatusColor(patient.status)}>
                            {patient.status}
                          </Badge>
                        </Td>
                        <Td>
                          <Menu>
                            <MenuButton
                              as={IconButton}
                              icon={<FiMoreVertical />}
                              variant="ghost"
                              size="sm"
                            />
                            <MenuList>
                              <MenuItem
                                icon={<FiEye />}
                                onClick={() => {
                                  setSelectedPatient(patient);
                                  setIsViewModalOpen(true);
                                }}
                              >
                                View Details
                              </MenuItem>
                              <MenuItem
                                icon={<FiEdit />}
                                onClick={() => {
                                  setSelectedPatient(patient);
                                  setIsEditModalOpen(true);
                                }}
                              >
                                Edit
                              </MenuItem>
                              <MenuItem
                                icon={<FiCalendar />}
                                onClick={() => {
                                  // Navigate to appointment booking
                                }}
                              >
                                Schedule Appointment
                              </MenuItem>
                              <MenuItem
                                icon={<FiTrash2 />}
                                color="red.500"
                                onClick={() => handleDeletePatient(patient.id)}
                              >
                                Delete
                              </MenuItem>
                            </MenuList>
                          </Menu>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </CardBody>
            </Card>
          </VStack>

          {/* Add Patient Modal */}
          <AddPatientModal
            isOpen={isAddModalOpen}
            onClose={() => setIsAddModalOpen(false)}
            onSave={handleAddPatient}
          />

          {/* View Patient Modal */}
          <ViewPatientModal
            isOpen={isViewModalOpen}
            onClose={() => setIsViewModalOpen(false)}
            patient={selectedPatient}
          />

          {/* Edit Patient Modal */}
          <EditPatientModal
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            patient={selectedPatient}
            onSave={handleEditPatient}
          />
        </Container>
      </Layout>
    </ProtectedRoute>
  );
}

// Add Patient Modal Component
function AddPatientModal({
  isOpen,
  onClose,
  onSave,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSave: (patient: Omit<Patient, "id">) => void;
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    dateOfBirth: "",
    gender: "Male" as "Male" | "Female",
    emergencyContact: "",
    medicalHistory: "",
    allergies: "",
    lastVisit: new Date().toISOString().split("T")[0],
    status: "Active" as "Active" | "Inactive",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setFormData({
      name: "",
      email: "",
      phone: "",
      address: "",
      dateOfBirth: "",
      gender: "Male",
      emergencyContact: "",
      medicalHistory: "",
      allergies: "",
      lastVisit: new Date().toISOString().split("T")[0],
      status: "Active",
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add New Patient</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <form onSubmit={handleSubmit}>
            <Grid templateColumns="repeat(2, 1fr)" gap={4}>
              <GridItem>
                <FormControl isRequired>
                  <FormLabel>Full Name</FormLabel>
                  <Input
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="Enter full name"
                  />
                </FormControl>
              </GridItem>
              <GridItem>
                <FormControl isRequired>
                  <FormLabel>Email</FormLabel>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="Enter email address"
                  />
                </FormControl>
              </GridItem>
              <GridItem>
                <FormControl isRequired>
                  <FormLabel>Phone Number</FormLabel>
                  <Input
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    placeholder="Enter phone number"
                  />
                </FormControl>
              </GridItem>
              <GridItem>
                <FormControl isRequired>
                  <FormLabel>Date of Birth</FormLabel>
                  <Input
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) =>
                      setFormData({ ...formData, dateOfBirth: e.target.value })
                    }
                  />
                </FormControl>
              </GridItem>
              <GridItem>
                <FormControl isRequired>
                  <FormLabel>Gender</FormLabel>
                  <Select
                    value={formData.gender}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        gender: e.target.value as "Male" | "Female",
                      })
                    }
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
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
                        status: e.target.value as "Active" | "Inactive",
                      })
                    }
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </Select>
                </FormControl>
              </GridItem>
              <GridItem colSpan={2}>
                <FormControl>
                  <FormLabel>Address</FormLabel>
                  <Input
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                    placeholder="Enter address"
                  />
                </FormControl>
              </GridItem>
              <GridItem colSpan={2}>
                <FormControl>
                  <FormLabel>Emergency Contact</FormLabel>
                  <Input
                    value={formData.emergencyContact}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        emergencyContact: e.target.value,
                      })
                    }
                    placeholder="Name and phone number"
                  />
                </FormControl>
              </GridItem>
              <GridItem colSpan={2}>
                <FormControl>
                  <FormLabel>Medical History</FormLabel>
                  <Textarea
                    value={formData.medicalHistory}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        medicalHistory: e.target.value,
                      })
                    }
                    placeholder="Enter medical history"
                  />
                </FormControl>
              </GridItem>
              <GridItem colSpan={2}>
                <FormControl>
                  <FormLabel>Allergies</FormLabel>
                  <Input
                    value={formData.allergies}
                    onChange={(e) =>
                      setFormData({ ...formData, allergies: e.target.value })
                    }
                    placeholder="Enter known allergies"
                  />
                </FormControl>
              </GridItem>
            </Grid>
            <HStack spacing={4} mt={6} justify="flex-end">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" colorScheme="dental">
                Add Patient
              </Button>
            </HStack>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

// View Patient Modal Component
function ViewPatientModal({
  isOpen,
  onClose,
  patient,
}: {
  isOpen: boolean;
  onClose: () => void;
  patient: Patient | null;
}) {
  if (!patient) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Patient Details</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Tabs>
            <TabList>
              <Tab>Personal Info</Tab>
              <Tab>Medical History</Tab>
              <Tab>Documents</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                  <GridItem>
                    <VStack align="start" spacing={4}>
                      <HStack spacing={4}>
                        <Avatar
                          size="lg"
                          src={patient.avatar}
                          name={patient.name}
                        />
                        <Box>
                          <Heading size="md">{patient.name}</Heading>
                          <Text color="gray.600">
                            {patient.gender},{" "}
                            {new Date().getFullYear() -
                              new Date(patient.dateOfBirth).getFullYear()}{" "}
                            years old
                          </Text>
                          <Badge
                            colorScheme={
                              patient.status === "Active" ? "green" : "gray"
                            }
                            mt={2}
                          >
                            {patient.status}
                          </Badge>
                        </Box>
                      </HStack>
                    </VStack>
                  </GridItem>
                  <GridItem>
                    <VStack align="start" spacing={3}>
                      <HStack spacing={3}>
                        <FiPhone />
                        <Text>{patient.phone}</Text>
                      </HStack>
                      <HStack spacing={3}>
                        <FiMail />
                        <Text>{patient.email}</Text>
                      </HStack>
                      <HStack spacing={3} align="start">
                        <FiMapPin />
                        <Text>{patient.address}</Text>
                      </HStack>
                    </VStack>
                  </GridItem>
                </Grid>
              </TabPanel>
              <TabPanel>
                <VStack align="stretch" spacing={4}>
                  <Box>
                    <Text fontWeight="medium" mb={2}>
                      Medical History
                    </Text>
                    <Text>
                      {patient.medicalHistory || "No medical history recorded"}
                    </Text>
                  </Box>
                  <Box>
                    <Text fontWeight="medium" mb={2}>
                      Allergies
                    </Text>
                    <Text>{patient.allergies || "No known allergies"}</Text>
                  </Box>
                  <Box>
                    <Text fontWeight="medium" mb={2}>
                      Emergency Contact
                    </Text>
                    <Text>
                      {patient.emergencyContact ||
                        "No emergency contact recorded"}
                    </Text>
                  </Box>
                </VStack>
              </TabPanel>
              <TabPanel>
                <VStack spacing={4}>
                  <Button leftIcon={<FiUpload />} variant="outline" w="full">
                    Upload Document
                  </Button>
                  <Text color="gray.600" textAlign="center">
                    No documents uploaded yet
                  </Text>
                </VStack>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

// Edit Patient Modal Component
function EditPatientModal({
  isOpen,
  onClose,
  patient,
  onSave,
}: {
  isOpen: boolean;
  onClose: () => void;
  patient: Patient | null;
  onSave: (patient: Patient) => void;
}) {
  const [formData, setFormData] = useState<Patient | null>(null);

  React.useEffect(() => {
    if (patient) {
      setFormData(patient);
    }
  }, [patient]);

  if (!formData) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Patient</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <form onSubmit={handleSubmit}>
            <Grid templateColumns="repeat(2, 1fr)" gap={4}>
              <GridItem>
                <FormControl isRequired>
                  <FormLabel>Full Name</FormLabel>
                  <Input
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </FormControl>
              </GridItem>
              <GridItem>
                <FormControl isRequired>
                  <FormLabel>Email</FormLabel>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </FormControl>
              </GridItem>
              <GridItem>
                <FormControl isRequired>
                  <FormLabel>Phone Number</FormLabel>
                  <Input
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                  />
                </FormControl>
              </GridItem>
              <GridItem>
                <FormControl isRequired>
                  <FormLabel>Date of Birth</FormLabel>
                  <Input
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) =>
                      setFormData({ ...formData, dateOfBirth: e.target.value })
                    }
                  />
                </FormControl>
              </GridItem>
              <GridItem>
                <FormControl isRequired>
                  <FormLabel>Gender</FormLabel>
                  <Select
                    value={formData.gender}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        gender: e.target.value as "Male" | "Female",
                      })
                    }
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
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
                        status: e.target.value as "Active" | "Inactive",
                      })
                    }
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </Select>
                </FormControl>
              </GridItem>
              <GridItem colSpan={2}>
                <FormControl>
                  <FormLabel>Address</FormLabel>
                  <Input
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                  />
                </FormControl>
              </GridItem>
              <GridItem colSpan={2}>
                <FormControl>
                  <FormLabel>Emergency Contact</FormLabel>
                  <Input
                    value={formData.emergencyContact}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        emergencyContact: e.target.value,
                      })
                    }
                  />
                </FormControl>
              </GridItem>
              <GridItem colSpan={2}>
                <FormControl>
                  <FormLabel>Medical History</FormLabel>
                  <Textarea
                    value={formData.medicalHistory}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        medicalHistory: e.target.value,
                      })
                    }
                  />
                </FormControl>
              </GridItem>
              <GridItem colSpan={2}>
                <FormControl>
                  <FormLabel>Allergies</FormLabel>
                  <Input
                    value={formData.allergies}
                    onChange={(e) =>
                      setFormData({ ...formData, allergies: e.target.value })
                    }
                  />
                </FormControl>
              </GridItem>
            </Grid>
            <HStack spacing={4} mt={6} justify="flex-end">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" colorScheme="dental">
                Save Changes
              </Button>
            </HStack>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
