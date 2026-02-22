"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  VStack,
  HStack,
  Heading,
  Text,
  Button,
  Badge,
  Avatar,
  Grid,
  GridItem,
  Card,
  CardBody,
  CardHeader,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Flex,
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
  Select,
  useDisclosure,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from "@chakra-ui/react";
import {
  FiArrowLeft,
  FiEdit,
  FiCalendar,
  FiPhone,
  FiMail,
  FiMapPin,
  FiUser,
  FiSave,
  FiTrash2,
  FiHeart,
  FiDroplet,
  FiBriefcase,
  FiUsers,
  FiShield,
  FiGlobe,
  FiMessageCircle,
  FiZap,
  FiCoffee,
  FiActivity as FiExercise,
  FiFileText,
  FiScissors,
  FiAlertTriangle,
  FiEye,
  FiMoreVertical,
} from "react-icons/fi";
import { useRouter, useParams } from "next/navigation";
import Layout from "../../components/Layout";
import ProtectedRoute from "../../components/ProtectedRoute";
import { useAuth } from "../../contexts/AuthContext";

interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  dateOfBirth: string;
  gender: "Male" | "Female";
  emergencyContact: string;
  emergencyPhone: string;
  medicalHistory: string;
  allergies: string;
  medications: string;
  bloodType: string;
  occupation: string;
  maritalStatus: "Single" | "Married" | "Divorced" | "Widowed";
  insuranceProvider: string;
  insuranceNumber: string;
  referringDoctor: string;
  lastVisit: string;
  nextAppointment?: string;
  status: "Active" | "Inactive";
  avatar?: string;
  // Additional fields
  nationality: string;
  language: string;
  preferredContactMethod: "Phone" | "Email" | "SMS";
  smokingStatus: "Non-smoker" | "Former smoker" | "Current smoker";
  alcoholConsumption: "None" | "Occasional" | "Regular";
  exerciseFrequency: "None" | "Light" | "Moderate" | "Heavy";
  familyHistory: string;
  previousSurgeries: string;
  chronicConditions: string;
}

interface ToothCondition {
  id: string;
  toothNumber: string;
  condition: string;
  date: string;
  notes: string;
  dentist: string;
}

interface TreatmentPlan {
  id: string;
  toothNumber: string;
  treatment: string;
  priority: "high" | "medium" | "low";
  estimatedCost: number;
  estimatedDuration: number;
  status: "planned" | "in-progress" | "completed";
  notes: string;
}

interface DentalProcedure {
  id: string;
  procedureName: string;
  toothNumber?: string;
  date: string;
  dentist: string;
  status: "Completed" | "In Progress" | "Cancelled";
  cost: number;
  notes: string;
  followUpRequired: boolean;
  followUpDate?: string;
}

// Mock data - in a real app, this would come from an API
const mockPatients: Patient[] = [
  {
    id: "1",
    name: "Maria Santos",
    email: "maria.santos@email.com",
    phone: "+63 912 345 6789",
    address: "123 Rizal Street, Manila, Philippines",
    dateOfBirth: "1985-03-15",
    gender: "Female",
    emergencyContact: "Juan Santos",
    emergencyPhone: "+63 912 345 6790",
    medicalHistory: "No significant medical history. Regular dental checkups since 2010.",
    allergies: "Penicillin, Latex",
    medications: "Multivitamins, Calcium supplements",
    bloodType: "O+",
    occupation: "Marketing Manager",
    maritalStatus: "Married",
    insuranceProvider: "PhilHealth",
    insuranceNumber: "PH-123456789",
    referringDoctor: "Dr. Sarah Johnson",
    lastVisit: "2024-01-15",
    nextAppointment: "2024-02-15",
    status: "Active",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    nationality: "Filipino",
    language: "English, Tagalog",
    preferredContactMethod: "Phone",
    smokingStatus: "Non-smoker",
    alcoholConsumption: "Occasional",
    exerciseFrequency: "Moderate",
    familyHistory: "Mother: Hypertension, Father: Diabetes Type 2",
    previousSurgeries: "Appendectomy (2010), Wisdom tooth extraction (2018)",
    chronicConditions: "None",
  },
  {
    id: "2",
    name: "Carlos Mendoza",
    email: "carlos.mendoza@email.com",
    phone: "+63 912 345 6788",
    address: "456 Quezon Avenue, Quezon City, Philippines",
    dateOfBirth: "1978-07-22",
    gender: "Male",
    emergencyContact: "Ana Mendoza",
    emergencyPhone: "+63 912 345 6787",
    medicalHistory: "Diabetes Type 2 (diagnosed 2015), Hypertension (diagnosed 2018)",
    allergies: "None",
    medications: "Metformin 500mg, Lisinopril 10mg, Atorvastatin 20mg",
    bloodType: "A+",
    occupation: "Software Engineer",
    maritalStatus: "Married",
    insuranceProvider: "Maxicare",
    insuranceNumber: "MC-987654321",
    referringDoctor: "Dr. Michael Chen",
    lastVisit: "2024-01-10",
    nextAppointment: "2024-02-10",
    status: "Active",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    nationality: "Filipino",
    language: "English, Tagalog, Spanish",
    preferredContactMethod: "Email",
    smokingStatus: "Former smoker",
    alcoholConsumption: "None",
    exerciseFrequency: "Light",
    familyHistory: "Father: Diabetes Type 2, Heart Disease. Mother: Hypertension",
    previousSurgeries: "Gallbladder removal (2012), Root canal treatment (2020)",
    chronicConditions: "Diabetes Type 2, Hypertension",
  },
  {
    id: "3",
    name: "Ana Rodriguez",
    email: "ana.rodriguez@email.com",
    phone: "+63 912 345 6787",
    address: "789 Makati Avenue, Makati, Philippines",
    dateOfBirth: "1992-11-08",
    gender: "Female",
    emergencyContact: "Luis Rodriguez",
    emergencyPhone: "+63 912 345 6786",
    medicalHistory: "Hypertension (diagnosed 2020), Anxiety disorder",
    allergies: "Latex, Shellfish",
    medications: "Amlodipine 5mg, Sertraline 50mg",
    bloodType: "B+",
    occupation: "Graphic Designer",
    maritalStatus: "Single",
    insuranceProvider: "Cigna",
    insuranceNumber: "CG-456789123",
    referringDoctor: "Dr. Lisa Wang",
    lastVisit: "2024-01-05",
    status: "Active",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    nationality: "Filipino",
    language: "English, Tagalog, Mandarin",
    preferredContactMethod: "SMS",
    smokingStatus: "Non-smoker",
    alcoholConsumption: "None",
    exerciseFrequency: "Light",
    familyHistory: "Mother: Anxiety disorder, Father: No significant history",
    previousSurgeries: "Tonsillectomy (2005), Dental implant (2021)",
    chronicConditions: "Hypertension, Anxiety disorder",
  },
];

const mockToothConditions: ToothCondition[] = [
  {
    id: "1",
    toothNumber: "18",
    condition: "Decayed",
    date: "2024-01-15",
    notes: "Cavity on the occlusal surface",
    dentist: "Dr. Juan Dela Cruz",
  },
  {
    id: "2",
    toothNumber: "21",
    condition: "Filled",
    date: "2024-01-10",
    notes: "Composite filling",
    dentist: "Dr. Juan Dela Cruz",
  },
];

const mockTreatmentPlans: TreatmentPlan[] = [
  {
    id: "1",
    toothNumber: "18",
    treatment: "Crown",
    priority: "high",
    estimatedCost: 15000,
    estimatedDuration: 120,
    status: "planned",
    notes: "Porcelain crown for damaged tooth",
  },
];

const mockDentalProcedures: DentalProcedure[] = [
  {
    id: "1",
    procedureName: "Dental Cleaning",
    date: "2024-01-15",
    dentist: "Dr. Maria Santos",
    status: "Completed",
    cost: 2000,
    notes: "Regular cleaning and checkup",
    followUpRequired: true,
    followUpDate: "2024-07-15",
  },
  {
    id: "2",
    procedureName: "Composite Filling",
    toothNumber: "16",
    date: "2024-02-10",
    dentist: "Dr. Juan Dela Cruz",
    status: "Completed",
    cost: 3500,
    notes: "Filled cavity on upper left molar",
    followUpRequired: false,
  },
  {
    id: "3",
    procedureName: "Root Canal Treatment",
    toothNumber: "25",
    date: "2024-03-05",
    dentist: "Dr. Maria Santos",
    status: "Completed",
    cost: 12000,
    notes: "Root canal on upper left premolar",
    followUpRequired: true,
    followUpDate: "2024-04-05",
  },
  {
    id: "4",
    procedureName: "Tooth Extraction",
    toothNumber: "75",
    date: "2024-03-20",
    dentist: "Dr. Juan Dela Cruz",
    status: "Completed",
    cost: 2500,
    notes: "Extracted decayed primary tooth",
    followUpRequired: true,
    followUpDate: "2024-04-20",
  },
  {
    id: "5",
    procedureName: "Dental Crown",
    toothNumber: "18",
    date: "2024-04-12",
    dentist: "Dr. Maria Santos",
    status: "In Progress",
    cost: 15000,
    notes: "Porcelain crown placement in progress",
    followUpRequired: true,
    followUpDate: "2024-05-12",
  },
  {
    id: "6",
    procedureName: "Teeth Whitening",
    date: "2024-01-30",
    dentist: "Dr. Maria Santos",
    status: "Completed",
    cost: 8000,
    notes: "Professional teeth whitening treatment",
    followUpRequired: false,
  },
];

// Dental chart tooth positions
const toothRows = [
  {
    label: "Labial",
    teeth: ["55", "54", "53", "52", "51", "61", "62", "63", "64", "65"],
    type: "primary",
  },
  {
    label: "",
    teeth: [
      "18", "17", "16", "15", "14", "13", "12", "11",
      "21", "22", "23", "24", "25", "26", "27", "28",
    ],
    type: "permanent",
  },
  {
    label: "Lingual",
    teeth: [
      "48", "47", "46", "45", "44", "43", "42", "41",
      "31", "32", "33", "34", "35", "36", "37", "38",
    ],
    type: "permanent",
  },
  {
    label: "Labial",
    teeth: ["85", "84", "83", "82", "81", "71", "72", "73", "74", "75"],
    type: "primary",
  },
];

// Dental conditions with colors
const dentalConditions = {
  Decayed: { color: "red.500", bg: "red.500" },
  Missing: { color: "gray.300", bg: "gray.300" },
  "Bridge Pontic": { color: "green.300", bg: "green.300" },
  Reset: { color: "gray.600", bg: "gray.600" },
  Attrition: { color: "pink.400", bg: "pink.400" },
  Mobile: { color: "orange.600", bg: "orange.600" },
  "Partially Impacted": { color: "yellow.600", bg: "yellow.600" },
  "For Extraction": { color: "red.300", bg: "red.300" },
  "Recurrent Caries": { color: "red.700", bg: "red.700" },
  Filled: { color: "blue.500", bg: "blue.500" },
  Implant: { color: "yellow.500", bg: "yellow.500" },
  "Crown/Bridge Abutment": { color: "green.400", bg: "green.400" },
  Abrasion: { color: "pink.300", bg: "pink.300" },
  Abfraction: { color: "pink.600", bg: "pink.600" },
  Impacted: { color: "orange.800", bg: "orange.800" },
  Unerupted: { color: "yellow.700", bg: "yellow.700" },
  "Root Canal Treated": { color: "cyan.500", bg: "cyan.500" },
  Healthy: { color: "gray.200", bg: "gray.200" },
};

const darkInput = {
  bg: "rgba(255,255,255,0.05)",
  border: "1.5px solid",
  borderColor: "rgba(255,255,255,0.1)",
  color: "white",
  _focus: { bg: "rgba(6,182,212,0.06)", borderColor: "cyan.500", boxShadow: "0 0 0 3px rgba(6,182,212,0.15)" },
  _hover: { borderColor: "rgba(255,255,255,0.2)" },
  _placeholder: { color: "whiteAlpha.300" },
};

const darkFlushedInput = {
  variant: "flushed" as const,
  color: "white",
  borderColor: "rgba(255,255,255,0.2)",
  _focus: { borderColor: "cyan.400" },
  _placeholder: { color: "whiteAlpha.300" },
};

export default function PatientDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const patientId = params.id as string;
  const { user } = useAuth();
  
  const [patient, setPatient] = useState<Patient | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedPatient, setEditedPatient] = useState<Patient | null>(null);
  const [toothConditions, setToothConditions] = useState<ToothCondition[]>(mockToothConditions);
  const [treatmentPlans, setTreatmentPlans] = useState<TreatmentPlan[]>(mockTreatmentPlans);
  const [dentalProcedures, setDentalProcedures] = useState<DentalProcedure[]>(mockDentalProcedures);
  const [selectedProcedure, setSelectedProcedure] = useState<DentalProcedure | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isEditingProcedure, setIsEditingProcedure] = useState(false);
  const [editedProcedure, setEditedProcedure] = useState<DentalProcedure | null>(null);
  const [selectedTooth, setSelectedTooth] = useState<string | null>(null);
  const [toothStates, setToothStates] = useState<Record<string, string>>({
    "18": "Decayed",
    "17": "Decayed",
    "16": "Decayed",
    "21": "Filled",
    "22": "Decayed",
    "25": "Root Canal Treated",
    "75": "Filled",
  });
  
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalType, setModalType] = useState<"condition" | "treatment">("condition");
  
  // Procedure modals
  const { isOpen: isViewModalOpen, onOpen: onViewModalOpen, onClose: onViewModalClose } = useDisclosure();
  const { isOpen: isEditModalOpen, onOpen: onEditModalOpen, onClose: onEditModalClose } = useDisclosure();
  const { isOpen: isDeleteModalOpen, onOpen: onDeleteModalOpen, onClose: onDeleteModalClose } = useDisclosure();

  useEffect(() => {
    // Find patient by ID
    const foundPatient = mockPatients.find(p => p.id === patientId);
    if (foundPatient) {
      setPatient(foundPatient);
      setEditedPatient(foundPatient);
    } else {
      // Patient not found, redirect to patients page
      router.push("/patients");
    }
  }, [patientId, router]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const getToothCondition = (toothNumber: string) => {
    return toothConditions.find(
      (condition) => condition.toothNumber === toothNumber
    );
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const getToothTreatment = (toothNumber: string) => {
    return treatmentPlans.find((plan) => plan.toothNumber === toothNumber);
  };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const getToothColor = (toothNumber: string) => {
    const state = toothStates[toothNumber];
    if (state && dentalConditions[state as keyof typeof dentalConditions]) {
      return dentalConditions[state as keyof typeof dentalConditions].bg;
    }
    return dentalConditions.Healthy.bg;
  };

  const handleToothClick = (toothNumber: string) => {
    setSelectedTooth(toothNumber);
    setModalType("condition");
    onOpen();
  };

  const handleAddCondition = (condition: Omit<ToothCondition, "id">) => {
    const newCondition: ToothCondition = {
      ...condition,
      id: Date.now().toString(),
    };
    setToothConditions([...toothConditions, newCondition]);
    setToothStates((prev) => ({
      ...prev,
      [condition.toothNumber]: condition.condition,
    }));
    onClose();
  };

  const handleAddTreatment = (treatment: Omit<TreatmentPlan, "id">) => {
    const newTreatment: TreatmentPlan = {
      ...treatment,
      id: Date.now().toString(),
    };
    setTreatmentPlans([...treatmentPlans, newTreatment]);
    onClose();
  };

  const resetAllTeeth = () => {
    setToothStates({});
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "red";
      case "medium":
        return "yellow";
      case "low":
        return "green";
      default:
        return "gray";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "planned":
        return "blue";
      case "in-progress":
        return "orange";
      case "completed":
        return "green";
      default:
        return "gray";
    }
  };

  const handleEditToggle = () => {
    if (isEditing) {
      // Save changes
      if (editedPatient) {
        setPatient(editedPatient);
        // In a real app, you would make an API call here to save the patient data
        console.log("Saving patient:", editedPatient);
      }
    } else {
      // Start editing - reset edited patient to current patient data
      if (patient) {
        setEditedPatient({ ...patient });
      }
    }
    setIsEditing(!isEditing);
  };

  const handleCancelEdit = () => {
    if (patient) {
      setEditedPatient({ ...patient });
    }
    setIsEditing(false);
  };

  const handleFieldChange = (field: keyof Patient, value: string) => {
    if (editedPatient) {
      setEditedPatient({
        ...editedPatient,
        [field]: value,
      });
    }
  };

  // Check if user can edit based on their role
  const canEditPersonalInfo = () => {
    return user?.role === "admin" || user?.role === "dentist" || user?.role === "staff" || user?.role === "patient";
  };

  const canEditMedicalHistory = () => {
    return user?.role === "admin" || user?.role === "dentist";
  };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const canEditDentalChart = () => {
    return user?.role === "admin" || user?.role === "dentist";
  };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const canEditAll = () => {
    return user?.role === "admin" || user?.role === "dentist";
  };

  // Procedure action handlers
  const handleViewProcedure = (procedure: DentalProcedure) => {
    setSelectedProcedure(procedure);
    onViewModalOpen();
  };

  const handleEditProcedure = (procedure: DentalProcedure) => {
    setSelectedProcedure(procedure);
    setEditedProcedure({ ...procedure });
    setIsEditingProcedure(true);
    onEditModalOpen();
  };

  const handleDeleteProcedure = (procedure: DentalProcedure) => {
    setSelectedProcedure(procedure);
    onDeleteModalOpen();
  };

  const handleSaveProcedure = () => {
    if (editedProcedure) {
      setDentalProcedures(prev => 
        prev.map(proc => 
          proc.id === editedProcedure.id ? editedProcedure : proc
        )
      );
      setIsEditingProcedure(false);
      setEditedProcedure(null);
      onEditModalClose();
    }
  };

  const handleConfirmDelete = () => {
    if (selectedProcedure) {
      setDentalProcedures(prev => 
        prev.filter(proc => proc.id !== selectedProcedure.id)
      );
      setSelectedProcedure(null);
      onDeleteModalClose();
    }
  };

  const handleProcedureFieldChange = (field: keyof DentalProcedure, value: string | boolean) => {
    if (editedProcedure) {
      setEditedProcedure({
        ...editedProcedure,
        [field]: value,
      });
    }
  };

  if (!patient) {
    return (
      <ProtectedRoute allowedRoles={["admin", "dentist", "staff"]}>
        <Layout>
          <Container maxW="7xl" py={8}>
            <Text color="whiteAlpha.700">Loading patient details...</Text>
          </Container>
        </Layout>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute allowedRoles={["admin", "dentist", "staff"]}>
      <Layout>
        <Container maxW="7xl" py={8}>
          <VStack spacing={8} align="stretch">
            {/* Header */}
            <VStack spacing={4} align="stretch">
              {/* Back Button - Always on top */}
              <Box>
                <Button
                  leftIcon={<FiArrowLeft />}
                  variant="ghost"
                  color="whiteAlpha.600"
                  _hover={{ bg: "rgba(255,255,255,0.07)", color: "white" }}
                  onClick={() => router.push("/patients")}
                >
                  Back to Patients
                </Button>
              </Box>

              {/* Main Header Content */}
              <Flex 
                justify="space-between" 
                align="center"
                direction={{ base: "column", md: "row" }}
                gap={4}
              >
                {/* Left Side - Profile Details */}
                <HStack spacing={4}>
                  <Avatar
                    size="lg"
                    src={isEditing ? editedPatient?.avatar : patient.avatar}
                    name={isEditing ? editedPatient?.name : patient.name}
                  />
                  <Box>
                    {isEditing && canEditPersonalInfo() ? (
                      <Input
                        value={editedPatient?.name || ""}
                        onChange={(e) => handleFieldChange("name", e.target.value)}
                        fontSize="lg"
                        fontWeight="bold"
                        {...darkFlushedInput}
                        mb={2}
                      />
                    ) : (
                      <Heading size="lg" color="white">{patient.name}</Heading>
                    )}
                    <Text color="whiteAlpha.700">
                      {isEditing && canEditPersonalInfo() ? (
                        <HStack spacing={2}>
                          <Select
                            value={editedPatient?.gender || ""}
                            onChange={(e) => handleFieldChange("gender", e.target.value)}
                            size="sm"
                            {...darkFlushedInput}
                            w="auto"
                          >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                          </Select>
                          <Text color="whiteAlpha.700">{new Date().getFullYear() - new Date(patient.dateOfBirth).getFullYear()} years old</Text>
                        </HStack>
                      ) : (
                        `${patient.gender}, ${new Date().getFullYear() - new Date(patient.dateOfBirth).getFullYear()} years old`
                      )}
                    </Text>
                    {isEditing && canEditPersonalInfo() ? (
                      <Select
                        value={editedPatient?.status || ""}
                        onChange={(e) => handleFieldChange("status", e.target.value)}
                        size="sm"
                        {...darkFlushedInput}
                        w="auto"
                        mt={1}
                      >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </Select>
                    ) : (
                      <Badge
                        colorScheme={patient.status === "Active" ? "green" : "gray"}
                        mt={1}
                      >
                        {patient.status}
                      </Badge>
                    )}
                  </Box>
                </HStack>

                {/* Right Side - Action Buttons */}
                <HStack spacing={2} w={{ base: "full", md: "auto" }}>
                  {isEditing ? (
                    <>
                      <Button 
                        leftIcon={<FiSave />} 
                        bgGradient="linear(135deg, emerald.500, cyan.500)"
                        color="white"
                        w={{ base: "full", md: "auto" }}
                        onClick={handleEditToggle}
                      >
                        Save
                      </Button>
                      <Button 
                        variant="ghost"
                        color="whiteAlpha.600"
                        _hover={{ bg: "rgba(255,255,255,0.07)" }}
                        w={{ base: "full", md: "auto" }}
                        onClick={handleCancelEdit}
                      >
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <>
                      {canEditPersonalInfo() && (
                        <Button 
                          leftIcon={<FiEdit />} 
                          variant="outline"
                          borderColor="rgba(255,255,255,0.15)"
                          color="whiteAlpha.700"
                          _hover={{ bg: "rgba(255,255,255,0.07)" }}
                          w={{ base: "full", md: "auto" }}
                          onClick={handleEditToggle}
                        >
                          Edit Patient
                        </Button>
                      )}
                      <Button 
                        leftIcon={<FiCalendar />} 
                        bgGradient="linear(135deg, cyan.500, purple.500)"
                        color="white"
                        _hover={{ bgGradient: "linear(135deg, cyan.400, purple.400)" }}
                        w={{ base: "full", md: "auto" }}
                      >
                        Schedule Appointment
                      </Button>
                    </>
                  )}
                </HStack>
              </Flex>
            </VStack>

            {/* Patient Information Tabs */}
            <Tabs>
               <TabList borderBottom="1px solid rgba(255,255,255,0.07)">
                 <Tab
                   color="whiteAlpha.500"
                   _selected={{ color: "white", borderColor: "cyan.400" }}
                   _hover={{ color: "whiteAlpha.800" }}
                 >
                   Personal Information
                 </Tab>
                 <Tab
                   color="whiteAlpha.500"
                   _selected={{ color: "white", borderColor: "cyan.400" }}
                   _hover={{ color: "whiteAlpha.800" }}
                 >
                   Medical History
                 </Tab>
                 <Tab
                   color="whiteAlpha.500"
                   _selected={{ color: "white", borderColor: "cyan.400" }}
                   _hover={{ color: "whiteAlpha.800" }}
                 >
                   Dental Chart
                 </Tab>
                 <Tab
                   color="whiteAlpha.500"
                   _selected={{ color: "white", borderColor: "cyan.400" }}
                   _hover={{ color: "whiteAlpha.800" }}
                 >
                   Dental Procedures
                 </Tab>
               </TabList>

              <TabPanels>
                 {/* Personal Information Tab */}
                 <TabPanel>
                   <VStack spacing={6} align="stretch">
                     {/* Basic Information */}
                     <Grid templateColumns={{ base: "1fr", lg: "repeat(2, 1fr)" }} gap={6}>
                       <GridItem>
                         <Card
                           bg="rgba(15,22,41,0.7)"
                           border="1px solid"
                           borderColor="rgba(255,255,255,0.07)"
                           backdropFilter="blur(12px)"
                           borderRadius="2xl"
                         >
                           <CardHeader>
                             <Heading size="md" color="white">Contact Information</Heading>
                           </CardHeader>
                           <CardBody>
                             <VStack align="stretch" spacing={4}>
                               <HStack spacing={3}>
                                 <Icon as={FiPhone} color="whiteAlpha.400" />
                                 {isEditing && canEditPersonalInfo() ? (
                                   <Input
                                     value={editedPatient?.phone || ""}
                                     onChange={(e) => handleFieldChange("phone", e.target.value)}
                                     {...darkFlushedInput}
                                     size="sm"
                                   />
                                 ) : (
                                   <Text color="whiteAlpha.700">{patient.phone}</Text>
                                 )}
                               </HStack>
                               <HStack spacing={3}>
                                 <Icon as={FiMail} color="whiteAlpha.400" />
                                 {isEditing && canEditPersonalInfo() ? (
                                   <Input
                                     value={editedPatient?.email || ""}
                                     onChange={(e) => handleFieldChange("email", e.target.value)}
                                     {...darkFlushedInput}
                                     size="sm"
                                     type="email"
                                   />
                                 ) : (
                                   <Text color="whiteAlpha.700">{patient.email}</Text>
                                 )}
                               </HStack>
                               <HStack spacing={3} align="start">
                                 <Icon as={FiMapPin} color="whiteAlpha.400" />
                                 {isEditing && canEditPersonalInfo() ? (
                                   <Input
                                     value={editedPatient?.address || ""}
                                     onChange={(e) => handleFieldChange("address", e.target.value)}
                                     {...darkFlushedInput}
                                     size="sm"
                                   />
                                 ) : (
                                   <Text color="whiteAlpha.700">{patient.address}</Text>
                                 )}
                               </HStack>
                               <HStack spacing={3}>
                                 <Icon as={FiMessageCircle} color="whiteAlpha.400" />
                                 {isEditing && canEditPersonalInfo() ? (
                                   <HStack spacing={2}>
                                     <Text color="whiteAlpha.700">Preferred:</Text>
                                     <Select
                                       value={editedPatient?.preferredContactMethod || ""}
                                       onChange={(e) => handleFieldChange("preferredContactMethod", e.target.value)}
                                       size="sm"
                                       {...darkFlushedInput}
                                       w="auto"
                                     >
                                       <option value="Phone">Phone</option>
                                       <option value="Email">Email</option>
                                       <option value="SMS">SMS</option>
                                     </Select>
                                   </HStack>
                                 ) : (
                                   <Text color="whiteAlpha.700">Preferred: {patient.preferredContactMethod}</Text>
                                 )}
                               </HStack>
                             </VStack>
                           </CardBody>
                         </Card>
                       </GridItem>
                       <GridItem>
                         <Card
                           bg="rgba(15,22,41,0.7)"
                           border="1px solid"
                           borderColor="rgba(255,255,255,0.07)"
                           backdropFilter="blur(12px)"
                           borderRadius="2xl"
                         >
                           <CardHeader>
                             <Heading size="md" color="white">Personal Details</Heading>
                           </CardHeader>
                           <CardBody>
                             <VStack align="stretch" spacing={4}>
                               <HStack spacing={3}>
                                 <Icon as={FiUser} color="whiteAlpha.400" />
                                 {isEditing && canEditPersonalInfo() ? (
                                   <HStack spacing={2}>
                                     <Select
                                       value={editedPatient?.gender || ""}
                                       onChange={(e) => handleFieldChange("gender", e.target.value)}
                                       size="sm"
                                       {...darkFlushedInput}
                                       w="auto"
                                     >
                                       <option value="Male">Male</option>
                                       <option value="Female">Female</option>
                                     </Select>
                                     <Text color="whiteAlpha.700">, {new Date().getFullYear() - new Date(patient.dateOfBirth).getFullYear()} years old</Text>
                                   </HStack>
                                 ) : (
                                   <Text color="whiteAlpha.700">{patient.gender}, {new Date().getFullYear() - new Date(patient.dateOfBirth).getFullYear()} years old</Text>
                                 )}
                               </HStack>
                               <HStack spacing={3}>
                                 <Icon as={FiGlobe} color="whiteAlpha.400" />
                                 {isEditing && canEditPersonalInfo() ? (
                                   <Input
                                     value={editedPatient?.nationality || ""}
                                     onChange={(e) => handleFieldChange("nationality", e.target.value)}
                                     {...darkFlushedInput}
                                     size="sm"
                                   />
                                 ) : (
                                   <Text color="whiteAlpha.700">{patient.nationality}</Text>
                                 )}
                               </HStack>
                               <HStack spacing={3}>
                                 <Icon as={FiMessageCircle} color="whiteAlpha.400" />
                                 {isEditing && canEditPersonalInfo() ? (
                                   <Input
                                     value={editedPatient?.language || ""}
                                     onChange={(e) => handleFieldChange("language", e.target.value)}
                                     {...darkFlushedInput}
                                     size="sm"
                                   />
                                 ) : (
                                   <Text color="whiteAlpha.700">Languages: {patient.language}</Text>
                                 )}
                               </HStack>
                               <HStack spacing={3}>
                                 <Icon as={FiUsers} color="whiteAlpha.400" />
                                 {isEditing && canEditPersonalInfo() ? (
                                   <Select
                                     value={editedPatient?.maritalStatus || ""}
                                     onChange={(e) => handleFieldChange("maritalStatus", e.target.value)}
                                     size="sm"
                                     {...darkFlushedInput}
                                     w="auto"
                                   >
                                     <option value="Single">Single</option>
                                     <option value="Married">Married</option>
                                     <option value="Divorced">Divorced</option>
                                     <option value="Widowed">Widowed</option>
                                   </Select>
                                 ) : (
                                   <Text color="whiteAlpha.700">{patient.maritalStatus}</Text>
                                 )}
                               </HStack>
                               <HStack spacing={3}>
                                 <Icon as={FiBriefcase} color="whiteAlpha.400" />
                                 {isEditing && canEditPersonalInfo() ? (
                                   <Input
                                     value={editedPatient?.occupation || ""}
                                     onChange={(e) => handleFieldChange("occupation", e.target.value)}
                                     {...darkFlushedInput}
                                     size="sm"
                                   />
                                 ) : (
                                   <Text color="whiteAlpha.700">{patient.occupation}</Text>
                                 )}
                               </HStack>
                             </VStack>
                           </CardBody>
                         </Card>
                       </GridItem>
                     </Grid>

                     {/* Emergency & Insurance Information */}
                     <Grid templateColumns={{ base: "1fr", lg: "repeat(2, 1fr)" }} gap={6}>
                       <GridItem>
                         <Card
                           bg="rgba(15,22,41,0.7)"
                           border="1px solid"
                           borderColor="rgba(255,255,255,0.07)"
                           backdropFilter="blur(12px)"
                           borderRadius="2xl"
                         >
                           <CardHeader>
                             <Heading size="md" color="white">Emergency Contact</Heading>
                           </CardHeader>
                           <CardBody>
                             <VStack align="stretch" spacing={4}>
                               <HStack spacing={3}>
                                 <Icon as={FiUser} color="whiteAlpha.400" />
                                 {isEditing && canEditPersonalInfo() ? (
                                   <Input
                                     value={editedPatient?.emergencyContact || ""}
                                     onChange={(e) => handleFieldChange("emergencyContact", e.target.value)}
                                     {...darkFlushedInput}
                                     size="sm"
                                   />
                                 ) : (
                                   <Text color="whiteAlpha.700">{patient.emergencyContact}</Text>
                                 )}
                               </HStack>
                               <HStack spacing={3}>
                                 <Icon as={FiPhone} color="whiteAlpha.400" />
                                 {isEditing && canEditPersonalInfo() ? (
                                   <Input
                                     value={editedPatient?.emergencyPhone || ""}
                                     onChange={(e) => handleFieldChange("emergencyPhone", e.target.value)}
                                     {...darkFlushedInput}
                                     size="sm"
                                   />
                                 ) : (
                                   <Text color="whiteAlpha.700">{patient.emergencyPhone}</Text>
                                 )}
                               </HStack>
                             </VStack>
                           </CardBody>
                         </Card>
                       </GridItem>
                       <GridItem>
                         <Card
                           bg="rgba(15,22,41,0.7)"
                           border="1px solid"
                           borderColor="rgba(255,255,255,0.07)"
                           backdropFilter="blur(12px)"
                           borderRadius="2xl"
                         >
                           <CardHeader>
                             <Heading size="md" color="white">Insurance Information</Heading>
                           </CardHeader>
                           <CardBody>
                             <VStack align="stretch" spacing={4}>
                               <HStack spacing={3}>
                                 <Icon as={FiShield} color="whiteAlpha.400" />
                                 {isEditing && canEditPersonalInfo() ? (
                                   <Input
                                     value={editedPatient?.insuranceProvider || ""}
                                     onChange={(e) => handleFieldChange("insuranceProvider", e.target.value)}
                                     {...darkFlushedInput}
                                     size="sm"
                                   />
                                 ) : (
                                   <Text color="whiteAlpha.700">{patient.insuranceProvider}</Text>
                                 )}
                               </HStack>
                               <HStack spacing={3}>
                                 <Icon as={FiFileText} color="whiteAlpha.400" />
                                 {isEditing && canEditPersonalInfo() ? (
                                   <Input
                                     value={editedPatient?.insuranceNumber || ""}
                                     onChange={(e) => handleFieldChange("insuranceNumber", e.target.value)}
                                     {...darkFlushedInput}
                                     size="sm"
                                   />
                                 ) : (
                                   <Text color="whiteAlpha.700">{patient.insuranceNumber}</Text>
                                 )}
                               </HStack>
                               <HStack spacing={3}>
                                 <Icon as={FiUser} color="whiteAlpha.400" />
                                 {isEditing && canEditPersonalInfo() ? (
                                   <HStack spacing={2}>
                                     <Text color="whiteAlpha.700">Referred by:</Text>
                                     <Input
                                       value={editedPatient?.referringDoctor || ""}
                                       onChange={(e) => handleFieldChange("referringDoctor", e.target.value)}
                                       {...darkFlushedInput}
                                       size="sm"
                                       w="auto"
                                     />
                                   </HStack>
                                 ) : (
                                   <Text color="whiteAlpha.700">Referred by: {patient.referringDoctor}</Text>
                                 )}
                               </HStack>
                             </VStack>
                           </CardBody>
                         </Card>
                       </GridItem>
                     </Grid>

                     {/* Medical & Lifestyle Information */}
                     <Grid templateColumns={{ base: "1fr", lg: "repeat(2, 1fr)" }} gap={6}>
                       <GridItem>
                         <Card
                           bg="rgba(15,22,41,0.7)"
                           border="1px solid"
                           borderColor="rgba(255,255,255,0.07)"
                           backdropFilter="blur(12px)"
                           borderRadius="2xl"
                         >
                           <CardHeader>
                             <Heading size="md" color="white">Medical Information</Heading>
                           </CardHeader>
                           <CardBody>
                             <VStack align="stretch" spacing={4}>
                               <HStack spacing={3}>
                                 <Icon as={FiDroplet} color="whiteAlpha.400" />
                                 {isEditing && canEditPersonalInfo() ? (
                                   <HStack spacing={2}>
                                     <Text color="whiteAlpha.700">Blood Type:</Text>
                                     <Input
                                       value={editedPatient?.bloodType || ""}
                                       onChange={(e) => handleFieldChange("bloodType", e.target.value)}
                                       {...darkFlushedInput}
                                       size="sm"
                                       w="auto"
                                     />
                                   </HStack>
                                 ) : (
                                   <Text color="whiteAlpha.700">Blood Type: {patient.bloodType}</Text>
                                 )}
                               </HStack>
                               <HStack spacing={3} align="start">
                                 <Icon as={FiHeart} color="whiteAlpha.400" />
                                 {isEditing && canEditPersonalInfo() ? (
                                   <HStack spacing={2}>
                                     <Text color="whiteAlpha.700">Medications:</Text>
                                     <Input
                                       value={editedPatient?.medications || ""}
                                       onChange={(e) => handleFieldChange("medications", e.target.value)}
                                       {...darkFlushedInput}
                                       size="sm"
                                       w="auto"
                                     />
                                   </HStack>
                                 ) : (
                                   <Text color="whiteAlpha.700">Medications: {patient.medications}</Text>
                                 )}
                               </HStack>
                               <HStack spacing={3} align="start">
                                 <Icon as={FiAlertTriangle} color="whiteAlpha.400" />
                                 {isEditing && canEditPersonalInfo() ? (
                                   <HStack spacing={2}>
                                     <Text color="whiteAlpha.700">Allergies:</Text>
                                     <Input
                                       value={editedPatient?.allergies || ""}
                                       onChange={(e) => handleFieldChange("allergies", e.target.value)}
                                       {...darkFlushedInput}
                                       size="sm"
                                       w="auto"
                                     />
                                   </HStack>
                                 ) : (
                                   <Text color="whiteAlpha.700">Allergies: {patient.allergies}</Text>
                                 )}
                               </HStack>
                             </VStack>
                           </CardBody>
                         </Card>
                       </GridItem>
                       <GridItem>
                         <Card
                           bg="rgba(15,22,41,0.7)"
                           border="1px solid"
                           borderColor="rgba(255,255,255,0.07)"
                           backdropFilter="blur(12px)"
                           borderRadius="2xl"
                         >
                           <CardHeader>
                             <Heading size="md" color="white">Lifestyle Information</Heading>
                           </CardHeader>
                           <CardBody>
                             <VStack align="stretch" spacing={4}>
                               <HStack spacing={3}>
                                 <Icon as={FiZap} color="whiteAlpha.400" />
                                 {isEditing && canEditPersonalInfo() ? (
                                   <HStack spacing={2}>
                                     <Text color="whiteAlpha.700">Smoking:</Text>
                                     <Select
                                       value={editedPatient?.smokingStatus || ""}
                                       onChange={(e) => handleFieldChange("smokingStatus", e.target.value)}
                                       size="sm"
                                       {...darkFlushedInput}
                                       w="auto"
                                     >
                                       <option value="Non-smoker">Non-smoker</option>
                                       <option value="Former smoker">Former smoker</option>
                                       <option value="Current smoker">Current smoker</option>
                                     </Select>
                                   </HStack>
                                 ) : (
                                   <Text color="whiteAlpha.700">Smoking: {patient.smokingStatus}</Text>
                                 )}
                               </HStack>
                               <HStack spacing={3}>
                                 <Icon as={FiCoffee} color="whiteAlpha.400" />
                                 {isEditing && canEditPersonalInfo() ? (
                                   <HStack spacing={2}>
                                     <Text color="whiteAlpha.700">Alcohol:</Text>
                                     <Select
                                       value={editedPatient?.alcoholConsumption || ""}
                                       onChange={(e) => handleFieldChange("alcoholConsumption", e.target.value)}
                                       size="sm"
                                       {...darkFlushedInput}
                                       w="auto"
                                     >
                                       <option value="None">None</option>
                                       <option value="Occasional">Occasional</option>
                                       <option value="Regular">Regular</option>
                                     </Select>
                                   </HStack>
                                 ) : (
                                   <Text color="whiteAlpha.700">Alcohol: {patient.alcoholConsumption}</Text>
                                 )}
                               </HStack>
                               <HStack spacing={3}>
                                 <Icon as={FiExercise} color="whiteAlpha.400" />
                                 {isEditing && canEditPersonalInfo() ? (
                                   <HStack spacing={2}>
                                     <Text color="whiteAlpha.700">Exercise:</Text>
                                     <Select
                                       value={editedPatient?.exerciseFrequency || ""}
                                       onChange={(e) => handleFieldChange("exerciseFrequency", e.target.value)}
                                       size="sm"
                                       {...darkFlushedInput}
                                       w="auto"
                                     >
                                       <option value="None">None</option>
                                       <option value="Light">Light</option>
                                       <option value="Moderate">Moderate</option>
                                       <option value="Heavy">Heavy</option>
                                     </Select>
                                   </HStack>
                                 ) : (
                                   <Text color="whiteAlpha.700">Exercise: {patient.exerciseFrequency}</Text>
                                 )}
                               </HStack>
                             </VStack>
                           </CardBody>
                         </Card>
                       </GridItem>
                     </Grid>

                     {/* Appointment Information */}
                     <Card
                       bg="rgba(15,22,41,0.7)"
                       border="1px solid"
                       borderColor="rgba(255,255,255,0.07)"
                       backdropFilter="blur(12px)"
                       borderRadius="2xl"
                     >
                       <CardHeader>
                         <Heading size="md" color="white">Appointment Information</Heading>
                       </CardHeader>
                       <CardBody>
                         <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={6}>
                           <GridItem>
                             <VStack align="start" spacing={2}>
                               <Text
                                 color="whiteAlpha.500"
                                 fontSize="xs"
                                 fontWeight="600"
                                 textTransform="uppercase"
                                 letterSpacing="0.06em"
                               >
                                 Last Visit
                               </Text>
                               <HStack spacing={2}>
                                 <Icon as={FiCalendar} color="whiteAlpha.400" />
                                 {isEditing && canEditPersonalInfo() ? (
                                   <Input
                                     type="date"
                                     value={editedPatient?.lastVisit ? new Date(editedPatient.lastVisit).toISOString().split('T')[0] : ""}
                                     onChange={(e) => handleFieldChange("lastVisit", e.target.value)}
                                     {...darkFlushedInput}
                                     size="sm"
                                     w="auto"
                                   />
                                 ) : (
                                   <Text color="whiteAlpha.700">{new Date(patient.lastVisit).toLocaleDateString()}</Text>
                                 )}
                               </HStack>
                             </VStack>
                           </GridItem>
                           <GridItem>
                             <VStack align="start" spacing={2}>
                               <Text
                                 color="whiteAlpha.500"
                                 fontSize="xs"
                                 fontWeight="600"
                                 textTransform="uppercase"
                                 letterSpacing="0.06em"
                               >
                                 Next Appointment
                               </Text>
                               <HStack spacing={2}>
                                 <Icon as={FiCalendar} color="whiteAlpha.400" />
                                 {isEditing && canEditPersonalInfo() ? (
                                   <Input
                                     type="date"
                                     value={editedPatient?.nextAppointment ? new Date(editedPatient.nextAppointment).toISOString().split('T')[0] : ""}
                                     onChange={(e) => handleFieldChange("nextAppointment", e.target.value)}
                                     {...darkFlushedInput}
                                     size="sm"
                                     w="auto"
                                   />
                                 ) : (
                                   <Text color="whiteAlpha.700">
                                     {patient.nextAppointment
                                       ? new Date(patient.nextAppointment).toLocaleDateString()
                                       : "None scheduled"}
                                   </Text>
                                 )}
                               </HStack>
                             </VStack>
                           </GridItem>
                           <GridItem>
                             <VStack align="start" spacing={2}>
                               <Text
                                 color="whiteAlpha.500"
                                 fontSize="xs"
                                 fontWeight="600"
                                 textTransform="uppercase"
                                 letterSpacing="0.06em"
                               >
                                 Status
                               </Text>
                               <Badge
                                 colorScheme={patient.status === "Active" ? "green" : "gray"}
                                 size="lg"
                               >
                                 {patient.status}
                               </Badge>
                             </VStack>
                           </GridItem>
                         </Grid>
                       </CardBody>
                     </Card>
                   </VStack>
                 </TabPanel>

                 {/* Medical History Tab */}
                 <TabPanel>
                   <VStack spacing={6} align="stretch">
                     {/* Current Medical Status */}
                     <Grid templateColumns={{ base: "1fr", lg: "repeat(2, 1fr)" }} gap={6}>
                       <GridItem>
                         <Card
                           bg="rgba(15,22,41,0.7)"
                           border="1px solid"
                           borderColor="rgba(255,255,255,0.07)"
                           backdropFilter="blur(12px)"
                           borderRadius="2xl"
                         >
                           <CardHeader>
                             <Heading size="md" color="white">Current Medical History</Heading>
                           </CardHeader>
                           <CardBody>
                             <VStack align="stretch" spacing={4}>
                               <Box>
                                 <Text
                                   color="whiteAlpha.500"
                                   fontSize="xs"
                                   fontWeight="600"
                                   textTransform="uppercase"
                                   letterSpacing="0.06em"
                                   mb={2}
                                 >
                                   Medical Conditions
                                 </Text>
                                 {isEditing && canEditMedicalHistory() ? (
                                   <Textarea
                                     value={editedPatient?.medicalHistory || ""}
                                     onChange={(e) => handleFieldChange("medicalHistory", e.target.value)}
                                     {...darkFlushedInput}
                                     size="sm"
                                     placeholder="Enter medical conditions..."
                                   />
                                 ) : (
                                   <Text color="whiteAlpha.700">
                                     {patient.medicalHistory || "No significant medical history recorded"}
                                   </Text>
                                 )}
                               </Box>
                               <Box>
                                 <Text
                                   color="whiteAlpha.500"
                                   fontSize="xs"
                                   fontWeight="600"
                                   textTransform="uppercase"
                                   letterSpacing="0.06em"
                                   mb={2}
                                 >
                                   Chronic Conditions
                                 </Text>
                                 {isEditing && canEditMedicalHistory() ? (
                                   <Textarea
                                     value={editedPatient?.chronicConditions || ""}
                                     onChange={(e) => handleFieldChange("chronicConditions", e.target.value)}
                                     {...darkFlushedInput}
                                     size="sm"
                                     placeholder="Enter chronic conditions..."
                                   />
                                 ) : (
                                   <Text color="whiteAlpha.700">
                                     {patient.chronicConditions || "None"}
                                   </Text>
                                 )}
                               </Box>
                             </VStack>
                           </CardBody>
                         </Card>
                       </GridItem>
                       <GridItem>
                         <Card
                           bg="rgba(15,22,41,0.7)"
                           border="1px solid"
                           borderColor="rgba(255,255,255,0.07)"
                           backdropFilter="blur(12px)"
                           borderRadius="2xl"
                         >
                           <CardHeader>
                             <Heading size="md" color="white">Allergies &amp; Medications</Heading>
                           </CardHeader>
                           <CardBody>
                             <VStack align="stretch" spacing={4}>
                               <Box>
                                 <Text
                                   color="whiteAlpha.500"
                                   fontSize="xs"
                                   fontWeight="600"
                                   textTransform="uppercase"
                                   letterSpacing="0.06em"
                                   mb={2}
                                 >
                                   Known Allergies
                                 </Text>
                                 <HStack spacing={2} align="start">
                                   <Icon as={FiAlertTriangle} color="red.500" />
                                   {isEditing && canEditMedicalHistory() ? (
                                     <Textarea
                                       value={editedPatient?.allergies || ""}
                                       onChange={(e) => handleFieldChange("allergies", e.target.value)}
                                       {...darkFlushedInput}
                                       size="sm"
                                       placeholder="Enter known allergies..."
                                       flex={1}
                                     />
                                   ) : (
                                     <Text color="whiteAlpha.700">{patient.allergies || "No known allergies"}</Text>
                                   )}
                                 </HStack>
                               </Box>
                               <Box>
                                 <Text
                                   color="whiteAlpha.500"
                                   fontSize="xs"
                                   fontWeight="600"
                                   textTransform="uppercase"
                                   letterSpacing="0.06em"
                                   mb={2}
                                 >
                                   Current Medications
                                 </Text>
                                 <HStack spacing={2} align="start">
                                   <Icon as={FiHeart} color="blue.500" />
                                   {isEditing && canEditMedicalHistory() ? (
                                     <Textarea
                                       value={editedPatient?.medications || ""}
                                       onChange={(e) => handleFieldChange("medications", e.target.value)}
                                       {...darkFlushedInput}
                                       size="sm"
                                       placeholder="Enter current medications..."
                                       flex={1}
                                     />
                                   ) : (
                                     <Text color="whiteAlpha.700">{patient.medications || "None"}</Text>
                                   )}
                                 </HStack>
                               </Box>
                             </VStack>
                           </CardBody>
                         </Card>
                       </GridItem>
                     </Grid>

                     {/* Family History & Previous Surgeries */}
                     <Grid templateColumns={{ base: "1fr", lg: "repeat(2, 1fr)" }} gap={6}>
                       <GridItem>
                         <Card
                           bg="rgba(15,22,41,0.7)"
                           border="1px solid"
                           borderColor="rgba(255,255,255,0.07)"
                           backdropFilter="blur(12px)"
                           borderRadius="2xl"
                         >
                           <CardHeader>
                             <Heading size="md" color="white">Family Medical History</Heading>
                           </CardHeader>
                           <CardBody>
                             <VStack align="stretch" spacing={4}>
                               <HStack spacing={3} align="start">
                                 <Icon as={FiUsers} color="whiteAlpha.400" />
                                 {isEditing && canEditMedicalHistory() ? (
                                   <Textarea
                                     value={editedPatient?.familyHistory || ""}
                                     onChange={(e) => handleFieldChange("familyHistory", e.target.value)}
                                     {...darkFlushedInput}
                                     size="sm"
                                     placeholder="Enter family medical history..."
                                     flex={1}
                                   />
                                 ) : (
                                   <Text color="whiteAlpha.700">
                                     {patient.familyHistory || "No significant family medical history recorded"}
                                   </Text>
                                 )}
                               </HStack>
                             </VStack>
                           </CardBody>
                         </Card>
                       </GridItem>
                       <GridItem>
                         <Card
                           bg="rgba(15,22,41,0.7)"
                           border="1px solid"
                           borderColor="rgba(255,255,255,0.07)"
                           backdropFilter="blur(12px)"
                           borderRadius="2xl"
                         >
                           <CardHeader>
                             <Heading size="md" color="white">Previous Surgeries &amp; Procedures</Heading>
                           </CardHeader>
                           <CardBody>
                             <VStack align="stretch" spacing={4}>
                               <HStack spacing={3} align="start">
                                 <Icon as={FiScissors} color="whiteAlpha.400" />
                                 {isEditing && canEditMedicalHistory() ? (
                                   <Textarea
                                     value={editedPatient?.previousSurgeries || ""}
                                     onChange={(e) => handleFieldChange("previousSurgeries", e.target.value)}
                                     {...darkFlushedInput}
                                     size="sm"
                                     placeholder="Enter previous surgeries..."
                                     flex={1}
                                   />
                                 ) : (
                                   <Text color="whiteAlpha.700">
                                     {patient.previousSurgeries || "No previous surgeries recorded"}
                                   </Text>
                                 )}
                               </HStack>
                             </VStack>
                           </CardBody>
                         </Card>
                       </GridItem>
                     </Grid>

                     {/* Lifestyle & Health Factors */}
                     <Card
                       bg="rgba(15,22,41,0.7)"
                       border="1px solid"
                       borderColor="rgba(255,255,255,0.07)"
                       backdropFilter="blur(12px)"
                       borderRadius="2xl"
                     >
                       <CardHeader>
                         <Heading size="md" color="white">Lifestyle &amp; Health Factors</Heading>
                       </CardHeader>
                       <CardBody>
                         <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }} gap={6}>
                           <GridItem>
                             <VStack align="start" spacing={2}>
                               <Text
                                 color="whiteAlpha.500"
                                 fontSize="xs"
                                 fontWeight="600"
                                 textTransform="uppercase"
                                 letterSpacing="0.06em"
                               >
                                 Smoking Status
                               </Text>
                               <HStack spacing={2}>
                                 <Icon as={FiZap} color="whiteAlpha.400" />
                                 {isEditing && canEditMedicalHistory() ? (
                                   <Select
                                     value={editedPatient?.smokingStatus || ""}
                                     onChange={(e) => handleFieldChange("smokingStatus", e.target.value)}
                                     size="sm"
                                     {...darkFlushedInput}
                                     w="auto"
                                   >
                                     <option value="Non-smoker">Non-smoker</option>
                                     <option value="Former smoker">Former smoker</option>
                                     <option value="Current smoker">Current smoker</option>
                                   </Select>
                                 ) : (
                                   <Text color="whiteAlpha.700">{patient.smokingStatus}</Text>
                                 )}
                               </HStack>
                             </VStack>
                           </GridItem>
                           <GridItem>
                             <VStack align="start" spacing={2}>
                               <Text
                                 color="whiteAlpha.500"
                                 fontSize="xs"
                                 fontWeight="600"
                                 textTransform="uppercase"
                                 letterSpacing="0.06em"
                               >
                                 Alcohol Consumption
                               </Text>
                               <HStack spacing={2}>
                                 <Icon as={FiCoffee} color="whiteAlpha.400" />
                                 {isEditing && canEditMedicalHistory() ? (
                                   <Select
                                     value={editedPatient?.alcoholConsumption || ""}
                                     onChange={(e) => handleFieldChange("alcoholConsumption", e.target.value)}
                                     size="sm"
                                     {...darkFlushedInput}
                                     w="auto"
                                   >
                                     <option value="None">None</option>
                                     <option value="Occasional">Occasional</option>
                                     <option value="Regular">Regular</option>
                                   </Select>
                                 ) : (
                                   <Text color="whiteAlpha.700">{patient.alcoholConsumption}</Text>
                                 )}
                               </HStack>
                             </VStack>
                           </GridItem>
                           <GridItem>
                             <VStack align="start" spacing={2}>
                               <Text
                                 color="whiteAlpha.500"
                                 fontSize="xs"
                                 fontWeight="600"
                                 textTransform="uppercase"
                                 letterSpacing="0.06em"
                               >
                                 Exercise Frequency
                               </Text>
                               <HStack spacing={2}>
                                 <Icon as={FiExercise} color="whiteAlpha.400" />
                                 {isEditing && canEditMedicalHistory() ? (
                                   <Select
                                     value={editedPatient?.exerciseFrequency || ""}
                                     onChange={(e) => handleFieldChange("exerciseFrequency", e.target.value)}
                                     size="sm"
                                     {...darkFlushedInput}
                                     w="auto"
                                   >
                                     <option value="None">None</option>
                                     <option value="Light">Light</option>
                                     <option value="Moderate">Moderate</option>
                                     <option value="Heavy">Heavy</option>
                                   </Select>
                                 ) : (
                                   <Text color="whiteAlpha.700">{patient.exerciseFrequency}</Text>
                                 )}
                               </HStack>
                             </VStack>
                           </GridItem>
                           <GridItem>
                             <VStack align="start" spacing={2}>
                               <Text
                                 color="whiteAlpha.500"
                                 fontSize="xs"
                                 fontWeight="600"
                                 textTransform="uppercase"
                                 letterSpacing="0.06em"
                               >
                                 Blood Type
                               </Text>
                               <HStack spacing={2}>
                                 <Icon as={FiDroplet} color="red.500" />
                                 {isEditing && canEditMedicalHistory() ? (
                                   <Input
                                     value={editedPatient?.bloodType || ""}
                                     onChange={(e) => handleFieldChange("bloodType", e.target.value)}
                                     {...darkFlushedInput}
                                     size="sm"
                                     w="auto"
                                   />
                                 ) : (
                                   <Text color="whiteAlpha.700">{patient.bloodType}</Text>
                                 )}
                               </HStack>
                             </VStack>
                           </GridItem>
                         </Grid>
                       </CardBody>
                     </Card>

                     {/* Dental-Specific Medical Information */}
                     <Card
                       bg="rgba(15,22,41,0.7)"
                       border="1px solid"
                       borderColor="rgba(255,255,255,0.07)"
                       backdropFilter="blur(12px)"
                       borderRadius="2xl"
                     >
                       <CardHeader>
                         <Heading size="md" color="white">Dental-Specific Medical Information</Heading>
                       </CardHeader>
                       <CardBody>
                         <VStack align="stretch" spacing={4}>
                           <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={6}>
                             <GridItem>
                               <Box>
                                 <Text
                                   color="whiteAlpha.500"
                                   fontSize="xs"
                                   fontWeight="600"
                                   textTransform="uppercase"
                                   letterSpacing="0.06em"
                                   mb={2}
                                 >
                                   Dental Allergies
                                 </Text>
                                 {isEditing && canEditMedicalHistory() ? (
                                   <Textarea
                                     value={editedPatient?.allergies || ""}
                                     onChange={(e) => handleFieldChange("allergies", e.target.value)}
                                     {...darkFlushedInput}
                                     size="sm"
                                     placeholder="Enter dental-specific allergies..."
                                   />
                                 ) : (
                                   <Text color="whiteAlpha.700">
                                     {patient.allergies.includes("Latex") || patient.allergies.includes("Penicillin") 
                                       ? patient.allergies 
                                       : "No dental-specific allergies noted"}
                                   </Text>
                                 )}
                               </Box>
                             </GridItem>
                             <GridItem>
                               <Box>
                                 <Text
                                   color="whiteAlpha.500"
                                   fontSize="xs"
                                   fontWeight="600"
                                   textTransform="uppercase"
                                   letterSpacing="0.06em"
                                   mb={2}
                                 >
                                   Medications Affecting Dental Care
                                 </Text>
                                 {isEditing && canEditMedicalHistory() ? (
                                   <Textarea
                                     value={editedPatient?.medications || ""}
                                     onChange={(e) => handleFieldChange("medications", e.target.value)}
                                     {...darkFlushedInput}
                                     size="sm"
                                     placeholder="Enter medications affecting dental care..."
                                   />
                                 ) : (
                                   <Text color="whiteAlpha.700">
                                     {patient.medications.includes("blood") || patient.medications.includes("anticoagulant")
                                       ? "Please consult with physician before dental procedures"
                                       : "No medications affecting dental care noted"}
                                   </Text>
                                 )}
                               </Box>
                             </GridItem>
                           </Grid>
                           <Box>
                             <Text
                               color="whiteAlpha.500"
                               fontSize="xs"
                               fontWeight="600"
                               textTransform="uppercase"
                               letterSpacing="0.06em"
                               mb={2}
                             >
                               Special Considerations
                             </Text>
                             {isEditing && canEditMedicalHistory() ? (
                               <Textarea
                                 value={editedPatient?.chronicConditions || ""}
                                 onChange={(e) => handleFieldChange("chronicConditions", e.target.value)}
                                 {...darkFlushedInput}
                                 size="sm"
                                 placeholder="Enter special considerations for dental care..."
                               />
                             ) : (
                               <Text color="whiteAlpha.700">
                                 {patient.chronicConditions.includes("Diabetes") || patient.chronicConditions.includes("Hypertension")
                                   ? "Patient has chronic conditions that may affect dental treatment. Monitor blood pressure and blood sugar levels during procedures."
                                   : "No special considerations noted"}
                               </Text>
                             )}
                           </Box>
                         </VStack>
                       </CardBody>
                     </Card>
                   </VStack>
                 </TabPanel>

                 {/* Dental Chart Tab */}
                 <TabPanel>
                   <VStack spacing={6} align="stretch">
                     {/* Dental Chart */}
                     <Card
                       bg="rgba(15,22,41,0.7)"
                       border="1px solid"
                       borderColor="rgba(255,255,255,0.07)"
                       backdropFilter="blur(12px)"
                       borderRadius="2xl"
                     >
                       <CardHeader pb={{ base: 2, sm: 4 }}>
                         <Heading size={{ base: "sm", sm: "md" }} color="white">
                           Dental Chart
                         </Heading>
                         <Text fontSize={{ base: "xs", sm: "sm" }} color="whiteAlpha.500">
                           Click on a tooth to add conditions or view details
                         </Text>
                       </CardHeader>
                       <CardBody pt={0}>
                         <VStack spacing={{ base: 2, sm: 3, md: 4 }} align="stretch">
                           {/* Chart Container */}
                           <Box
                             w="100%"
                             bg="rgba(255,255,255,0.04)"
                             border="1px solid rgba(255,255,255,0.07)"
                             borderRadius="md"
                             p={{ base: 1, sm: 2, md: 3, lg: 4 }}
                             position="relative"
                             overflow="hidden"
                           >
                             {/* Dental Chart Rows */}
                             <VStack
                               spacing={{ base: 2, sm: 3, md: 4, lg: 5 }}
                               align="stretch"
                             >
                               {toothRows.map((row, rowIndex) => (
                                 <HStack
                                   key={rowIndex}
                                   spacing={{ base: 0.5, sm: 1, md: 2 }}
                                   align="center"
                                 >
                                   {/* Row Label */}
                                   {row.label && (
                                     <Text
                                       fontSize={{
                                         base: "8px",
                                         sm: "10px",
                                         md: "xs",
                                         lg: "sm",
                                       }}
                                       fontWeight="bold"
                                       color="whiteAlpha.500"
                                       minW={{
                                         base: "25px",
                                         sm: "30px",
                                         md: "40px",
                                         lg: "50px",
                                       }}
                                       textAlign="left"
                                       display={{ base: "none", sm: "block" }}
                                     >
                                       {row.label}
                                     </Text>
                                   )}

                                   {/* Teeth in Row */}
                                   <HStack
                                     spacing={{
                                       base: "1px",
                                       sm: "2px",
                                       md: 1,
                                       lg: 2,
                                     }}
                                     justify="center"
                                     flex="1"
                                     wrap="nowrap"
                                     overflowX={{ base: "auto", sm: "visible" }}
                                     pb={{ base: 2, sm: 0 }}
                                     css={{
                                       "&::-webkit-scrollbar": {
                                         height: "4px",
                                       },
                                       "&::-webkit-scrollbar-track": {
                                         background: "#0f1629",
                                         borderRadius: "2px",
                                       },
                                       "&::-webkit-scrollbar-thumb": {
                                         background: "rgba(255,255,255,0.2)",
                                         borderRadius: "2px",
                                       },
                                       "&::-webkit-scrollbar-thumb:hover": {
                                         background: "rgba(255,255,255,0.35)",
                                       },
                                     }}
                                   >
                                     {row.teeth.map((toothNumber) => {
                                       const currentState =
                                         toothStates[toothNumber] || "Healthy";
                                       const isSelected =
                                         selectedTooth === toothNumber;
                                       const condition =
                                         dentalConditions[
                                           currentState as keyof typeof dentalConditions
                                         ];

                                       return (
                                         <Box
                                           key={toothNumber}
                                           w={{
                                             base: "16px",
                                             sm: "20px",
                                             md: "24px",
                                             lg: "28px",
                                           }}
                                           h={{
                                             base: "16px",
                                             sm: "20px",
                                             md: "24px",
                                             lg: "28px",
                                           }}
                                           bg={condition.bg}
                                           borderRadius="sm"
                                           display="flex"
                                           alignItems="center"
                                           justifyContent="center"
                                           cursor="pointer"
                                           border="1px solid"
                                           borderColor={
                                             isSelected ? "cyan.400" : "gray.300"
                                           }
                                           shadow="sm"
                                           _hover={{
                                             transform: "scale(1.05)",
                                             shadow: "md",
                                             borderColor: "cyan.400",
                                           }}
                                           transition="all 0.2s"
                                           onClick={() =>
                                             handleToothClick(toothNumber)
                                           }
                                           position="relative"
                                           flexShrink={0}
                                           minW={{
                                             base: "16px",
                                             sm: "20px",
                                             md: "24px",
                                             lg: "28px",
                                           }}
                                         >
                                           {/* Inner square for depth effect */}
                                           <Box
                                             position="absolute"
                                             top="0.5px"
                                             left="0.5px"
                                             right="0.5px"
                                             bottom="0.5px"
                                             bg="rgba(255,255,255,0.2)"
                                             borderRadius="sm"
                                           />
                                           <Text
                                             fontSize={{
                                               base: "6px",
                                               sm: "7px",
                                               md: "8px",
                                               lg: "9px",
                                             }}
                                             fontWeight="bold"
                                             color={
                                               currentState === "Healthy"
                                                 ? "gray.600"
                                                 : "white"
                                             }
                                             zIndex={1}
                                             lineHeight="1"
                                           >
                                             {toothNumber}
                                           </Text>
                                         </Box>
                                       );
                                     })}
                                   </HStack>
                                 </HStack>
                               ))}
                             </VStack>

                             {/* Reset All Button */}
                             <Box
                               position="absolute"
                               top={{ base: 0.5, sm: 1, md: 2 }}
                               right={{ base: 0.5, sm: 1, md: 2 }}
                             >
                               <Button
                                 size={{ base: "xs", sm: "sm" }}
                                 colorScheme="red"
                                 leftIcon={
                                   <Icon
                                     as={FiTrash2}
                                     boxSize={{ base: 2, sm: 3, md: 4 }}
                                   />
                                 }
                                 onClick={resetAllTeeth}
                                 px={{ base: 1.5, sm: 2, md: 3 }}
                                 py={{ base: 0.5, sm: 1, md: 2 }}
                                 minW="auto"
                               >
                                 <Text display={{ base: "none", sm: "inline" }} 
                                 color="white">
                                   Reset All
                                 </Text>
                                 <Text display={{ base: "inline", sm: "none" }}>
                                   Reset
                                 </Text>
                               </Button>
                             </Box>
                           </Box>

                           {/* Dental Chart Legend - Bottom Position (Normal Flow) */}
                           <Box
                             bg="rgba(255,255,255,0.04)"
                             p={{ base: 2, sm: 3, md: 4 }}
                             borderRadius="md"
                             border="1px solid rgba(255,255,255,0.07)"
                             w="100%"
                           >
                             <Text
                               fontSize={{ base: "xs", sm: "sm", md: "md" }}
                               fontWeight="bold"
                               color="whiteAlpha.700"
                               mb={{ base: 2, sm: 3 }}
                               textAlign="center"
                             >
                               Dental Chart Legend
                             </Text>
                             <Grid
                               templateColumns={{
                                 base: "repeat(1, 1fr)",
                                 sm: "repeat(2, 1fr)",
                                 md: "repeat(3, 1fr)",
                                 lg: "repeat(4, 1fr)",
                               }}
                               gap={{ base: 1, sm: 2 }}
                             >
                               {Object.entries(dentalConditions).map(
                                 ([condition, { bg }]) => (
                                   <HStack
                                     key={condition}
                                     spacing={{ base: 1, sm: 2 }}
                                   >
                                     <Box
                                       w={{ base: 2, sm: 3 }}
                                       h={{ base: 2, sm: 3 }}
                                       bg={bg}
                                       borderRadius="sm"
                                       flexShrink={0}
                                     />
                                     <Text
                                       fontSize={{
                                         base: "10px",
                                         sm: "xs",
                                         md: "sm",
                                       }}
                                       color="whiteAlpha.700"
                                       lineHeight="1.2"
                                       isTruncated
                                     >
                                       {condition}
                                     </Text>
                                   </HStack>
                                 )
                               )}
                             </Grid>
                           </Box>
                         </VStack>
                       </CardBody>
                     </Card>

                     {/* Treatment Plans and Tooth Conditions */}
                     <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }} gap={6}>
                       <GridItem>
                         <Card
                           bg="rgba(15,22,41,0.7)"
                           border="1px solid"
                           borderColor="rgba(255,255,255,0.07)"
                           backdropFilter="blur(12px)"
                           borderRadius="2xl"
                         >
                           <CardHeader>
                             <Heading size="md" color="white">Treatment Plans</Heading>
                           </CardHeader>
                           <CardBody>
                             <VStack spacing={4} align="stretch">
                               {treatmentPlans.map((plan) => (
                                 <Box
                                   key={plan.id}
                                   p={4}
                                   bg="rgba(255,255,255,0.04)"
                                   border="1px solid rgba(255,255,255,0.07)"
                                   borderRadius="xl"
                                 >
                                   <HStack justify="space-between" mb={2}>
                                     <Text fontWeight="medium" color="white">
                                       Tooth #{plan.toothNumber}
                                     </Text>
                                     <Badge
                                       colorScheme={getPriorityColor(plan.priority)}
                                       size="sm"
                                     >
                                       {plan.priority}
                                     </Badge>
                                   </HStack>
                                   <Text fontSize="sm" color="whiteAlpha.700" mb={2}>
                                     {plan.treatment}
                                   </Text>
                                   <HStack justify="space-between" mb={2}>
                                     <Text fontSize="sm" color="whiteAlpha.700">
                                       ₱{plan.estimatedCost.toLocaleString()}
                                     </Text>
                                     <Text fontSize="sm" color="whiteAlpha.700">
                                       {plan.estimatedDuration} min
                                     </Text>
                                   </HStack>
                                   <Badge
                                     colorScheme={getStatusColor(plan.status)}
                                     size="sm"
                                   >
                                     {plan.status}
                                   </Badge>
                                 </Box>
                               ))}
                             </VStack>
                           </CardBody>
                         </Card>
                       </GridItem>
                       <GridItem>
                         <Card
                           bg="rgba(15,22,41,0.7)"
                           border="1px solid"
                           borderColor="rgba(255,255,255,0.07)"
                           backdropFilter="blur(12px)"
                           borderRadius="2xl"
                         >
                           <CardHeader>
                             <Heading size="md" color="white">Tooth Conditions History</Heading>
                           </CardHeader>
                           <CardBody>
                             <VStack spacing={4} align="stretch">
                               {toothConditions.map((condition) => (
                                 <Box
                                   key={condition.id}
                                   p={4}
                                   bg="rgba(255,255,255,0.04)"
                                   border="1px solid rgba(255,255,255,0.07)"
                                   borderRadius="xl"
                                 >
                                   <HStack justify="space-between" mb={2}>
                                     <Text fontWeight="medium" color="white">
                                       Tooth #{condition.toothNumber}
                                     </Text>
                                     <Text fontSize="sm" color="whiteAlpha.500">
                                       {new Date(condition.date).toLocaleDateString()}
                                     </Text>
                                   </HStack>
                                   <Text fontSize="sm" color="whiteAlpha.700" mb={2}>
                                     {condition.condition} - {condition.dentist}
                                   </Text>
                                   <Text fontSize="sm" color="whiteAlpha.700">{condition.notes}</Text>
                                 </Box>
                               ))}
                             </VStack>
                           </CardBody>
                         </Card>
                       </GridItem>
                     </Grid>
                   </VStack>
                 </TabPanel>

                 {/* Dental Procedures Tab */}
                 <TabPanel>
                   <VStack spacing={6} align="stretch">
                     <Card
                       bg="rgba(15,22,41,0.7)"
                       border="1px solid"
                       borderColor="rgba(255,255,255,0.07)"
                       backdropFilter="blur(12px)"
                       borderRadius="2xl"
                     >
                       <CardHeader>
                         <Heading size="md" color="white">Dental Procedures History</Heading>
                         <Text fontSize="sm" color="whiteAlpha.500">
                           Complete history of dental procedures performed on this patient
                         </Text>
                       </CardHeader>
                       <CardBody>
                         <Box overflowX="auto">
                           <Table variant="unstyled" size="sm">
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
                                   Date
                                 </Th>
                                 <Th
                                   bg="rgba(255,255,255,0.03)"
                                   color="whiteAlpha.500"
                                   borderColor="rgba(255,255,255,0.06)"
                                   fontSize="xs"
                                   fontWeight="700"
                                   letterSpacing="0.08em"
                                 >
                                   Procedure
                                 </Th>
                                 <Th
                                   bg="rgba(255,255,255,0.03)"
                                   color="whiteAlpha.500"
                                   borderColor="rgba(255,255,255,0.06)"
                                   fontSize="xs"
                                   fontWeight="700"
                                   letterSpacing="0.08em"
                                 >
                                   Tooth
                                 </Th>
                                 <Th
                                   bg="rgba(255,255,255,0.03)"
                                   color="whiteAlpha.500"
                                   borderColor="rgba(255,255,255,0.06)"
                                   fontSize="xs"
                                   fontWeight="700"
                                   letterSpacing="0.08em"
                                 >
                                   Dentist
                                 </Th>
                                 <Th
                                   bg="rgba(255,255,255,0.03)"
                                   color="whiteAlpha.500"
                                   borderColor="rgba(255,255,255,0.06)"
                                   fontSize="xs"
                                   fontWeight="700"
                                   letterSpacing="0.08em"
                                 >
                                   Status
                                 </Th>
                                 <Th
                                   bg="rgba(255,255,255,0.03)"
                                   color="whiteAlpha.500"
                                   borderColor="rgba(255,255,255,0.06)"
                                   fontSize="xs"
                                   fontWeight="700"
                                   letterSpacing="0.08em"
                                 >
                                   Cost
                                 </Th>
                                 <Th
                                   bg="rgba(255,255,255,0.03)"
                                   color="whiteAlpha.500"
                                   borderColor="rgba(255,255,255,0.06)"
                                   fontSize="xs"
                                   fontWeight="700"
                                   letterSpacing="0.08em"
                                 >
                                   Follow-up
                                 </Th>
                                 <Th
                                   bg="rgba(255,255,255,0.03)"
                                   color="whiteAlpha.500"
                                   borderColor="rgba(255,255,255,0.06)"
                                   fontSize="xs"
                                   fontWeight="700"
                                   letterSpacing="0.08em"
                                 >
                                   Notes
                                 </Th>
                                 <Th
                                   bg="rgba(255,255,255,0.03)"
                                   color="whiteAlpha.500"
                                   borderColor="rgba(255,255,255,0.06)"
                                   fontSize="xs"
                                   fontWeight="700"
                                   letterSpacing="0.08em"
                                 >
                                   Actions
                                 </Th>
                               </Tr>
                             </Thead>
                             <Tbody>
                               {dentalProcedures
                                 .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                                 .map((procedure) => (
                                   <Tr
                                     key={procedure.id}
                                     _hover={{ bg: "rgba(255,255,255,0.03)" }}
                                   >
                                     <Td
                                       color="whiteAlpha.800"
                                       borderColor="rgba(255,255,255,0.05)"
                                     >
                                       <Text fontSize="sm">
                                         {new Date(procedure.date).toLocaleDateString()}
                                       </Text>
                                     </Td>
                                     <Td
                                       color="whiteAlpha.800"
                                       borderColor="rgba(255,255,255,0.05)"
                                     >
                                       <Text fontWeight="medium" fontSize="sm">
                                         {procedure.procedureName}
                                       </Text>
                                     </Td>
                                     <Td
                                       color="whiteAlpha.800"
                                       borderColor="rgba(255,255,255,0.05)"
                                     >
                                       {procedure.toothNumber ? (
                                         <Badge colorScheme="blue" variant="subtle" fontSize="xs">
                                           {procedure.toothNumber}
                                         </Badge>
                                       ) : (
                                         <Text fontSize="sm" color="whiteAlpha.500">N/A</Text>
                                       )}
                                     </Td>
                                     <Td
                                       color="whiteAlpha.800"
                                       borderColor="rgba(255,255,255,0.05)"
                                     >
                                       <Text fontSize="sm">{procedure.dentist}</Text>
                                     </Td>
                                     <Td
                                       color="whiteAlpha.800"
                                       borderColor="rgba(255,255,255,0.05)"
                                     >
                                       <Badge
                                         colorScheme={
                                           procedure.status === "Completed"
                                             ? "green"
                                             : procedure.status === "In Progress"
                                             ? "yellow"
                                             : "red"
                                         }
                                         variant="subtle"
                                         fontSize="xs"
                                       >
                                         {procedure.status}
                                       </Badge>
                                     </Td>
                                     <Td
                                       color="whiteAlpha.800"
                                       borderColor="rgba(255,255,255,0.05)"
                                     >
                                       <Text fontSize="sm" fontWeight="medium">
                                         ₱{procedure.cost.toLocaleString()}
                                       </Text>
                                     </Td>
                                     <Td
                                       color="whiteAlpha.800"
                                       borderColor="rgba(255,255,255,0.05)"
                                     >
                                       {procedure.followUpRequired ? (
                                         <VStack spacing={1} align="start">
                                           <Badge colorScheme="orange" variant="subtle" fontSize="xs">
                                             Required
                                           </Badge>
                                           {procedure.followUpDate && (
                                             <Text fontSize="xs" color="whiteAlpha.500">
                                               {new Date(procedure.followUpDate).toLocaleDateString()}
                                             </Text>
                                           )}
                                         </VStack>
                                       ) : (
                                         <Text fontSize="sm" color="whiteAlpha.500">None</Text>
                                       )}
                                     </Td>
                                     <Td
                                       color="whiteAlpha.800"
                                       borderColor="rgba(255,255,255,0.05)"
                                     >
                                       <Text fontSize="sm" color="whiteAlpha.700" maxW="200px" isTruncated>
                                         {procedure.notes}
                                       </Text>
                                     </Td>
                                     <Td
                                       color="whiteAlpha.800"
                                       borderColor="rgba(255,255,255,0.05)"
                                     >
                                       <Menu>
                                         <MenuButton
                                           as={IconButton}
                                           icon={<FiMoreVertical />}
                                           variant="ghost"
                                           color="whiteAlpha.600"
                                           _hover={{ bg: "rgba(255,255,255,0.07)", color: "white" }}
                                           size="sm"
                                         />
                                         <MenuList
                                           bg="#0f1629"
                                           border="1px solid rgba(255,255,255,0.1)"
                                           boxShadow="0 16px 40px rgba(0,0,0,0.5)"
                                         >
                                           <MenuItem
                                             icon={<FiEye />}
                                             bg="transparent"
                                             color="whiteAlpha.800"
                                             _hover={{ bg: "rgba(255,255,255,0.07)", color: "white" }}
                                             onClick={() => handleViewProcedure(procedure)}
                                           >
                                             View Details
                                           </MenuItem>
                                           <MenuItem
                                             icon={<FiEdit />}
                                             bg="transparent"
                                             color="whiteAlpha.800"
                                             _hover={{ bg: "rgba(255,255,255,0.07)", color: "white" }}
                                             onClick={() => handleEditProcedure(procedure)}
                                           >
                                             Edit Record
                                           </MenuItem>
                                           {user?.role === "admin" && (
                                             <MenuItem
                                               icon={<FiTrash2 />}
                                               bg="transparent"
                                               color="red.400"
                                               _hover={{ bg: "rgba(244,63,94,0.1)" }}
                                               onClick={() => handleDeleteProcedure(procedure)}
                                             >
                                               Delete Record
                                             </MenuItem>
                                           )}
                                         </MenuList>
                                       </Menu>
                                     </Td>
                                   </Tr>
                                 ))}
                             </Tbody>
                           </Table>
                         </Box>
                         
                         {/* Summary Statistics */}
                         <Box
                           mt={6}
                           p={4}
                           bg="rgba(255,255,255,0.04)"
                           border="1px solid rgba(255,255,255,0.07)"
                           borderRadius="xl"
                         >
                           <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={4}>
                             <GridItem>
                               <VStack align="start" spacing={1}>
                                 <Text fontSize="sm" color="whiteAlpha.500">Total Procedures</Text>
                                 <Text fontSize="lg" fontWeight="bold" color="white">
                                   {dentalProcedures.length}
                                 </Text>
                               </VStack>
                             </GridItem>
                             <GridItem>
                               <VStack align="start" spacing={1}>
                                 <Text fontSize="sm" color="whiteAlpha.500">Total Cost</Text>
                                 <Text fontSize="lg" fontWeight="bold" color="green.400">
                                   ₱{dentalProcedures.reduce((sum, proc) => sum + proc.cost, 0).toLocaleString()}
                                 </Text>
                               </VStack>
                             </GridItem>
                             <GridItem>
                               <VStack align="start" spacing={1}>
                                 <Text fontSize="sm" color="whiteAlpha.500">Completed</Text>
                                 <Text fontSize="lg" fontWeight="bold" color="green.400">
                                   {dentalProcedures.filter(proc => proc.status === "Completed").length}
                                 </Text>
                               </VStack>
                             </GridItem>
                           </Grid>
                         </Box>
                       </CardBody>
                     </Card>
                   </VStack>
                 </TabPanel>

              </TabPanels>
            </Tabs>
          </VStack>

          {/* Procedure Modals */}
          {/* View Procedure Modal */}
          <Modal isOpen={isViewModalOpen} onClose={onViewModalClose} size="lg">
            <ModalOverlay bg="blackAlpha.800" backdropFilter="blur(6px)" />
            <ModalContent
              bg="#0f1629"
              border="1px solid rgba(255,255,255,0.08)"
              boxShadow="0 24px 64px rgba(0,0,0,0.6)"
              borderRadius="2xl"
            >
              <ModalHeader color="white" borderBottom="1px solid rgba(255,255,255,0.07)">
                Procedure Details
              </ModalHeader>
              <ModalCloseButton color="whiteAlpha.600" />
              <ModalBody pb={6}>
                {selectedProcedure && (
                  <VStack spacing={4} align="stretch">
                    <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                      <Box>
                        <Text
                          fontSize="xs"
                          fontWeight="600"
                          color="whiteAlpha.500"
                          textTransform="uppercase"
                          letterSpacing="0.06em"
                        >
                          Procedure Name
                        </Text>
                        <Text color="white">{selectedProcedure.procedureName}</Text>
                      </Box>
                      <Box>
                        <Text
                          fontSize="xs"
                          fontWeight="600"
                          color="whiteAlpha.500"
                          textTransform="uppercase"
                          letterSpacing="0.06em"
                        >
                          Date
                        </Text>
                        <Text color="white">{new Date(selectedProcedure.date).toLocaleDateString()}</Text>
                      </Box>
                      <Box>
                        <Text
                          fontSize="xs"
                          fontWeight="600"
                          color="whiteAlpha.500"
                          textTransform="uppercase"
                          letterSpacing="0.06em"
                        >
                          Dentist
                        </Text>
                        <Text color="white">{selectedProcedure.dentist}</Text>
                      </Box>
                      <Box>
                        <Text
                          fontSize="xs"
                          fontWeight="600"
                          color="whiteAlpha.500"
                          textTransform="uppercase"
                          letterSpacing="0.06em"
                        >
                          Status
                        </Text>
                        <Badge
                          colorScheme={
                            selectedProcedure.status === "Completed"
                              ? "green"
                              : selectedProcedure.status === "In Progress"
                              ? "yellow"
                              : "red"
                          }
                          variant="subtle"
                        >
                          {selectedProcedure.status}
                        </Badge>
                      </Box>
                      <Box>
                        <Text
                          fontSize="xs"
                          fontWeight="600"
                          color="whiteAlpha.500"
                          textTransform="uppercase"
                          letterSpacing="0.06em"
                        >
                          Cost
                        </Text>
                        <Text fontWeight="bold" color="green.400">
                          ₱{selectedProcedure.cost.toLocaleString()}
                        </Text>
                      </Box>
                      <Box>
                        <Text
                          fontSize="xs"
                          fontWeight="600"
                          color="whiteAlpha.500"
                          textTransform="uppercase"
                          letterSpacing="0.06em"
                        >
                          Tooth Number
                        </Text>
                        <Text color="white">{selectedProcedure.toothNumber || "N/A"}</Text>
                      </Box>
                    </Grid>
                    <Box>
                      <Text
                        fontSize="xs"
                        fontWeight="600"
                        color="whiteAlpha.500"
                        textTransform="uppercase"
                        letterSpacing="0.06em"
                      >
                        Notes
                      </Text>
                      <Text color="white">{selectedProcedure.notes}</Text>
                    </Box>
                    {selectedProcedure.followUpRequired && (
                      <Box>
                        <Text
                          fontSize="xs"
                          fontWeight="600"
                          color="whiteAlpha.500"
                          textTransform="uppercase"
                          letterSpacing="0.06em"
                        >
                          Follow-up Information
                        </Text>
                        <VStack align="start" spacing={2}>
                          <Badge colorScheme="orange" variant="subtle">
                            Follow-up Required
                          </Badge>
                          {selectedProcedure.followUpDate && (
                            <Text color="white">Follow-up Date: {new Date(selectedProcedure.followUpDate).toLocaleDateString()}</Text>
                          )}
                        </VStack>
                      </Box>
                    )}
                  </VStack>
                )}
              </ModalBody>
            </ModalContent>
          </Modal>

          {/* Edit Procedure Modal */}
          <Modal isOpen={isEditModalOpen} onClose={onEditModalClose} size="lg">
            <ModalOverlay bg="blackAlpha.800" backdropFilter="blur(6px)" />
            <ModalContent
              bg="#0f1629"
              border="1px solid rgba(255,255,255,0.08)"
              boxShadow="0 24px 64px rgba(0,0,0,0.6)"
              borderRadius="2xl"
            >
              <ModalHeader color="white" borderBottom="1px solid rgba(255,255,255,0.07)">
                Edit Procedure
              </ModalHeader>
              <ModalCloseButton color="whiteAlpha.600" />
              <ModalBody pb={6}>
                {editedProcedure && (
                  <VStack spacing={4} align="stretch">
                    <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                      <FormControl>
                        <FormLabel
                          fontSize="xs"
                          fontWeight="600"
                          color="whiteAlpha.500"
                          textTransform="uppercase"
                          letterSpacing="0.06em"
                        >
                          Procedure Name
                        </FormLabel>
                        <Input
                          value={editedProcedure.procedureName}
                          onChange={(e) => handleProcedureFieldChange("procedureName", e.target.value)}
                          {...darkInput}
                        />
                      </FormControl>
                      <FormControl>
                        <FormLabel
                          fontSize="xs"
                          fontWeight="600"
                          color="whiteAlpha.500"
                          textTransform="uppercase"
                          letterSpacing="0.06em"
                        >
                          Date
                        </FormLabel>
                        <Input
                          type="date"
                          value={editedProcedure.date}
                          onChange={(e) => handleProcedureFieldChange("date", e.target.value)}
                          {...darkInput}
                        />
                      </FormControl>
                      <FormControl>
                        <FormLabel
                          fontSize="xs"
                          fontWeight="600"
                          color="whiteAlpha.500"
                          textTransform="uppercase"
                          letterSpacing="0.06em"
                        >
                          Dentist
                        </FormLabel>
                        <Input
                          value={editedProcedure.dentist}
                          onChange={(e) => handleProcedureFieldChange("dentist", e.target.value)}
                          {...darkInput}
                        />
                      </FormControl>
                      <FormControl>
                        <FormLabel
                          fontSize="xs"
                          fontWeight="600"
                          color="whiteAlpha.500"
                          textTransform="uppercase"
                          letterSpacing="0.06em"
                        >
                          Status
                        </FormLabel>
                        <Select
                          value={editedProcedure.status}
                          onChange={(e) => handleProcedureFieldChange("status", e.target.value)}
                          {...darkInput}
                        >
                          <option value="Completed">Completed</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Cancelled">Cancelled</option>
                        </Select>
                      </FormControl>
                      <FormControl>
                        <FormLabel
                          fontSize="xs"
                          fontWeight="600"
                          color="whiteAlpha.500"
                          textTransform="uppercase"
                          letterSpacing="0.06em"
                        >
                          Cost (₱)
                        </FormLabel>
                        <Input
                          type="number"
                          value={editedProcedure.cost}
                          onChange={(e) => handleProcedureFieldChange("cost", e.target.value)}
                          {...darkInput}
                        />
                      </FormControl>
                      <FormControl>
                        <FormLabel
                          fontSize="xs"
                          fontWeight="600"
                          color="whiteAlpha.500"
                          textTransform="uppercase"
                          letterSpacing="0.06em"
                        >
                          Tooth Number
                        </FormLabel>
                        <Input
                          value={editedProcedure.toothNumber || ""}
                          onChange={(e) => handleProcedureFieldChange("toothNumber", e.target.value)}
                          placeholder="Optional"
                          {...darkInput}
                        />
                      </FormControl>
                    </Grid>
                    <FormControl>
                      <FormLabel
                        fontSize="xs"
                        fontWeight="600"
                        color="whiteAlpha.500"
                        textTransform="uppercase"
                        letterSpacing="0.06em"
                      >
                        Notes
                      </FormLabel>
                      <Textarea
                        value={editedProcedure.notes}
                        onChange={(e) => handleProcedureFieldChange("notes", e.target.value)}
                        rows={3}
                        {...darkInput}
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel
                        fontSize="xs"
                        fontWeight="600"
                        color="whiteAlpha.500"
                        textTransform="uppercase"
                        letterSpacing="0.06em"
                      >
                        Follow-up Required
                      </FormLabel>
                      <Select
                        value={editedProcedure.followUpRequired ? "true" : "false"}
                        onChange={(e) => handleProcedureFieldChange("followUpRequired", e.target.value === "true")}
                        {...darkInput}
                      >
                        <option value="false">No</option>
                        <option value="true">Yes</option>
                      </Select>
                    </FormControl>
                    {editedProcedure.followUpRequired && (
                      <FormControl>
                        <FormLabel
                          fontSize="xs"
                          fontWeight="600"
                          color="whiteAlpha.500"
                          textTransform="uppercase"
                          letterSpacing="0.06em"
                        >
                          Follow-up Date
                        </FormLabel>
                        <Input
                          type="date"
                          value={editedProcedure.followUpDate || ""}
                          onChange={(e) => handleProcedureFieldChange("followUpDate", e.target.value)}
                          {...darkInput}
                        />
                      </FormControl>
                    )}
                    <HStack spacing={3} justify="flex-end">
                      <Button
                        variant="ghost"
                        color="whiteAlpha.600"
                        _hover={{ bg: "rgba(255,255,255,0.07)" }}
                        onClick={onEditModalClose}
                      >
                        Cancel
                      </Button>
                      <Button colorScheme="blue" onClick={handleSaveProcedure}>
                        Save Changes
                      </Button>
                    </HStack>
                  </VStack>
                )}
              </ModalBody>
            </ModalContent>
          </Modal>

          {/* Delete Procedure Modal */}
          <Modal isOpen={isDeleteModalOpen} onClose={onDeleteModalClose} size="md">
            <ModalOverlay bg="blackAlpha.800" backdropFilter="blur(6px)" />
            <ModalContent
              bg="#0f1629"
              border="1px solid rgba(255,255,255,0.08)"
              boxShadow="0 24px 64px rgba(0,0,0,0.6)"
              borderRadius="2xl"
            >
              <ModalHeader color="white" borderBottom="1px solid rgba(255,255,255,0.07)">
                Delete Procedure
              </ModalHeader>
              <ModalCloseButton color="whiteAlpha.600" />
              <ModalBody pb={6}>
                {selectedProcedure && (
                  <VStack spacing={4} align="stretch">
                    <Text color="whiteAlpha.700">
                      Are you sure you want to delete the procedure &quot;{selectedProcedure.procedureName}&quot; 
                      performed on {new Date(selectedProcedure.date).toLocaleDateString()}?
                    </Text>
                    <Text color="red.400" fontSize="sm">
                      This action cannot be undone.
                    </Text>
                    <HStack spacing={3} justify="flex-end">
                      <Button
                        variant="ghost"
                        color="whiteAlpha.600"
                        _hover={{ bg: "rgba(255,255,255,0.07)" }}
                        onClick={onDeleteModalClose}
                      >
                        Cancel
                      </Button>
                      <Button colorScheme="red" onClick={handleConfirmDelete}>
                        Delete
                      </Button>
                    </HStack>
                  </VStack>
                )}
              </ModalBody>
            </ModalContent>
          </Modal>

          {/* Tooth Modal */}
          <ToothModal
            isOpen={isOpen}
            onClose={onClose}
            toothNumber={selectedTooth}
            type={modalType}
            onAddCondition={handleAddCondition}
            onAddTreatment={handleAddTreatment}
          />
        </Container>
      </Layout>
    </ProtectedRoute>
  );
}

// Tooth Modal Component
function ToothModal({
  isOpen,
  onClose,
  toothNumber,
  type,
  onAddCondition,
  onAddTreatment,
}: {
  isOpen: boolean;
  onClose: () => void;
  toothNumber: string | null;
  type: "condition" | "treatment";
  onAddCondition: (condition: Omit<ToothCondition, "id">) => void;
  onAddTreatment: (treatment: Omit<TreatmentPlan, "id">) => void;
}) {
  const [formData, setFormData] = useState({
    condition: "",
    treatment: "",
    priority: "medium" as "high" | "medium" | "low",
    estimatedCost: 0,
    estimatedDuration: 60,
    status: "planned" as "planned" | "in-progress" | "completed",
    notes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (type === "condition" && toothNumber) {
      onAddCondition({
        toothNumber,
        condition: formData.condition,
        date: new Date().toISOString().split("T")[0],
        notes: formData.notes,
        dentist: "Dr. Juan Dela Cruz", // Mock dentist
      });
    } else if (type === "treatment" && toothNumber) {
      onAddTreatment({
        toothNumber,
        treatment: formData.treatment,
        priority: formData.priority,
        estimatedCost: formData.estimatedCost,
        estimatedDuration: formData.estimatedDuration,
        status: formData.status,
        notes: formData.notes,
      });
    }

    setFormData({
      condition: "",
      treatment: "",
      priority: "medium",
      estimatedCost: 0,
      estimatedDuration: 60,
      status: "planned",
      notes: "",
    });
  };

  const darkInputModal = {
    bg: "rgba(255,255,255,0.05)",
    border: "1.5px solid",
    borderColor: "rgba(255,255,255,0.1)",
    color: "white",
    _focus: { bg: "rgba(6,182,212,0.06)", borderColor: "cyan.500", boxShadow: "0 0 0 3px rgba(6,182,212,0.15)" },
    _hover: { borderColor: "rgba(255,255,255,0.2)" },
    _placeholder: { color: "whiteAlpha.300" },
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <ModalOverlay bg="blackAlpha.800" backdropFilter="blur(6px)" />
      <ModalContent
        bg="#0f1629"
        border="1px solid rgba(255,255,255,0.08)"
        boxShadow="0 24px 64px rgba(0,0,0,0.6)"
        borderRadius="2xl"
      >
        <ModalHeader color="white" borderBottom="1px solid rgba(255,255,255,0.07)">
          {type === "condition" ? "Add Tooth Condition" : "Add Treatment Plan"} - Tooth {toothNumber}
        </ModalHeader>
        <ModalCloseButton color="whiteAlpha.600" />
        <ModalBody pb={6}>
          <form onSubmit={handleSubmit}>
            <VStack spacing={4}>
              {type === "condition" ? (
                <>
                  <FormControl isRequired>
                    <FormLabel
                      fontSize="xs"
                      fontWeight="600"
                      color="whiteAlpha.500"
                      textTransform="uppercase"
                      letterSpacing="0.06em"
                    >
                      Condition
                    </FormLabel>
                    <Select
                      value={formData.condition}
                      onChange={(e) =>
                        setFormData({ ...formData, condition: e.target.value })
                      }
                      {...darkInputModal}
                      backgroundColor="#0f1629"
                    >
                      <option value="">Select condition</option>
                      <option value="Decayed">Decayed</option>
                      <option value="Filled">Filled</option>
                      <option value="Root Canal Treated">Root Canal Treated</option>
                      <option value="Crown">Crown</option>
                      <option value="Bridge">Bridge</option>
                      <option value="Implant">Implant</option>
                      <option value="Missing">Missing</option>
                      <option value="Healthy">Healthy</option>
                    </Select>
                  </FormControl>
                </>
              ) : (
                <>
                  <FormControl isRequired>
                    <FormLabel
                      fontSize="xs"
                      fontWeight="600"
                      color="whiteAlpha.500"
                      textTransform="uppercase"
                      letterSpacing="0.06em"
                    >
                      Treatment
                    </FormLabel>
                    <Input
                      value={formData.treatment}
                      onChange={(e) =>
                        setFormData({ ...formData, treatment: e.target.value })
                      }
                      placeholder="Enter treatment"
                      {...darkInputModal}
                    />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel
                      fontSize="xs"
                      fontWeight="600"
                      color="whiteAlpha.500"
                      textTransform="uppercase"
                      letterSpacing="0.06em"
                    >
                      Priority
                    </FormLabel>
                    <Select
                      value={formData.priority}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          priority: e.target.value as "high" | "medium" | "low",
                        })
                      }
                      {...darkInputModal}
                    >
                      <option value="high">High</option>
                      <option value="medium">Medium</option>
                      <option value="low">Low</option>
                    </Select>
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel
                      fontSize="xs"
                      fontWeight="600"
                      color="whiteAlpha.500"
                      textTransform="uppercase"
                      letterSpacing="0.06em"
                    >
                      Estimated Cost (₱)
                    </FormLabel>
                    <Input
                      type="number"
                      value={formData.estimatedCost}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          estimatedCost: parseInt(e.target.value) || 0,
                        })
                      }
                      {...darkInputModal}
                    />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel
                      fontSize="xs"
                      fontWeight="600"
                      color="whiteAlpha.500"
                      textTransform="uppercase"
                      letterSpacing="0.06em"
                    >
                      Estimated Duration (minutes)
                    </FormLabel>
                    <Input
                      type="number"
                      value={formData.estimatedDuration}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          estimatedDuration: parseInt(e.target.value) || 60,
                        })
                      }
                      {...darkInputModal}
                    />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel
                      fontSize="xs"
                      fontWeight="600"
                      color="whiteAlpha.500"
                      textTransform="uppercase"
                      letterSpacing="0.06em"
                    >
                      Status
                    </FormLabel>
                    <Select
                      value={formData.status}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          status: e.target.value as "planned" | "in-progress" | "completed",
                        })
                      }
                      {...darkInputModal}
                    >
                      <option value="planned">Planned</option>
                      <option value="in-progress">In Progress</option>
                      <option value="completed">Completed</option>
                    </Select>
                  </FormControl>
                </>
              )}
              <FormControl>
                <FormLabel
                  fontSize="xs"
                  fontWeight="600"
                  color="whiteAlpha.500"
                  textTransform="uppercase"
                  letterSpacing="0.06em"
                >
                  Notes
                </FormLabel>
                <Textarea
                  value={formData.notes}
                  onChange={(e) =>
                    setFormData({ ...formData, notes: e.target.value })
                  }
                  placeholder="Enter notes"
                  {...darkInputModal}
                />
              </FormControl>
            </VStack>
            <Flex justify="flex-end" mt={6} gap={3}>
              <Button
                variant="ghost"
                color="whiteAlpha.600"
                _hover={{ bg: "rgba(255,255,255,0.07)" }}
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                bgGradient="linear(135deg, cyan.500, purple.500)"
                color="white"
                _hover={{ bgGradient: "linear(135deg, cyan.400, purple.400)" }}
                leftIcon={<FiSave />}
              >
                Save
              </Button>
            </Flex>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
