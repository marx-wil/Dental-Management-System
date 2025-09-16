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
  Divider,
  Flex,
} from "@chakra-ui/react";
import {
  FiUser,
  FiPlus,
  FiEdit,
  FiSave,
  FiTrash2,
  FiCalendar,
  FiActivity,
} from "react-icons/fi";
import Layout from "../components/Layout";
import ProtectedRoute from "../components/ProtectedRoute";

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

interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  avatar?: string;
}

const mockPatients = [
  {
    id: "1",
    name: "Maria Santos",
    dateOfBirth: "1985-03-15",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: "2",
    name: "Carlos Mendoza",
    dateOfBirth: "1978-07-22",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: "3",
    name: "Ana Rodriguez",
    dateOfBirth: "1992-11-08",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
  },
];

const mockToothConditions: ToothCondition[] = [
  {
    id: "1",
    toothNumber: "14",
    condition: "Cavity",
    date: "2024-01-10",
    notes: "Small cavity on occlusal surface",
    dentist: "Dr. Juan Dela Cruz",
  },
  {
    id: "2",
    toothNumber: "16",
    condition: "Root Canal",
    date: "2024-01-05",
    notes: "Completed root canal treatment",
    dentist: "Dr. Maria Santos",
  },
  {
    id: "3",
    toothNumber: "21",
    condition: "Filling",
    date: "2023-12-20",
    notes: "Composite filling on mesial surface",
    dentist: "Dr. Juan Dela Cruz",
  },
];

const mockTreatmentPlans: TreatmentPlan[] = [
  {
    id: "1",
    toothNumber: "14",
    treatment: "Filling",
    priority: "high",
    estimatedCost: 2500,
    estimatedDuration: 60,
    status: "planned",
    notes: "Composite filling for cavity",
  },
  {
    id: "2",
    toothNumber: "18",
    treatment: "Extraction",
    priority: "medium",
    estimatedCost: 3000,
    estimatedDuration: 45,
    status: "planned",
    notes: "Wisdom tooth extraction",
  },
  {
    id: "3",
    toothNumber: "11",
    treatment: "Crown",
    priority: "low",
    estimatedCost: 15000,
    estimatedDuration: 120,
    status: "planned",
    notes: "Porcelain crown for damaged tooth",
  },
];

// Dental chart tooth positions - 4 rows layout with even spacing
const toothRows = [
  // Upper Primary Teeth (Row 1) - Labial
  {
    label: "Labial",
    teeth: ["55", "54", "53", "52", "51", "61", "62", "63", "64", "65"],
    type: "primary",
  },
  // Upper Permanent Teeth (Row 2)
  {
    label: "",
    teeth: [
      "18",
      "17",
      "16",
      "15",
      "14",
      "13",
      "12",
      "11",
      "21",
      "22",
      "23",
      "24",
      "25",
      "26",
      "27",
      "28",
    ],
    type: "permanent",
  },
  // Lower Permanent Teeth (Row 3) - Lingual
  {
    label: "Lingual",
    teeth: [
      "48",
      "47",
      "46",
      "45",
      "44",
      "43",
      "42",
      "41",
      "31",
      "32",
      "33",
      "34",
      "35",
      "36",
      "37",
      "38",
    ],
    type: "permanent",
  },
  // Lower Primary Teeth (Row 4) - Labial
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

export default function ChartingPage() {
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(
    mockPatients[0]
  );
  const [toothConditions, setToothConditions] =
    useState<ToothCondition[]>(mockToothConditions);
  const [treatmentPlans, setTreatmentPlans] =
    useState<TreatmentPlan[]>(mockTreatmentPlans);
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
  const [modalType, setModalType] = useState<"condition" | "treatment">(
    "condition"
  );

  const cardBg = useColorModeValue("white", "gray.800");

  const getToothCondition = (toothNumber: string) => {
    return toothConditions.find(
      (condition) => condition.toothNumber === toothNumber
    );
  };

  const getToothTreatment = (toothNumber: string) => {
    return treatmentPlans.find((plan) => plan.toothNumber === toothNumber);
  };

  const getToothColor = (toothNumber: string) => {
    const state = toothStates[toothNumber];
    if (state && dentalConditions[state as keyof typeof dentalConditions]) {
      return dentalConditions[state as keyof typeof dentalConditions].bg;
    }
    return dentalConditions.Healthy.bg;
  };

  const handleToothStateChange = (toothNumber: string, condition: string) => {
    setToothStates((prev) => ({
      ...prev,
      [toothNumber]: condition,
    }));
  };

  const resetAllTeeth = () => {
    setToothStates({});
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

    // Update tooth state
    if (selectedTooth) {
      handleToothStateChange(selectedTooth, condition.condition);
    }

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
      case "completed":
        return "green";
      case "in-progress":
        return "yellow";
      case "planned":
        return "blue";
      default:
        return "gray";
    }
  };

  return (
    <ProtectedRoute allowedRoles={["admin", "dentist"]}>
      <Layout>
        <Container maxW="7xl" py={8}>
          <VStack spacing={8} align="stretch">
            {/* Header */}
            <Grid
              templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
              gap={6}
            >
              <Box>
                <Heading size="lg">Dental Charting</Heading>
                <Text color="gray.600">
                  Interactive dental chart and treatment planning
                </Text>
              </Box>
              <Flex justify="flex-end" gap={4}>
                  <Select
                    w={{ base: "full", md: "fit-content" }}
                    value={selectedPatient?.id || ""}
                    onChange={(e) => {
                      const patient = mockPatients.find(
                        (p) => p.id === e.target.value
                      );
                      setSelectedPatient(patient || null);
                    }}
                  >
                    {mockPatients.map((patient) => (
                      <option key={patient.id} value={patient.id}>
                        {patient.name}
                      </option>
                    ))}
                  </Select>
                  <Button
                    leftIcon={<FiPlus />}
                    colorScheme="dental"
                    onClick={() => {
                      setModalType("treatment");
                      onOpen();
                    }}
                    w={{ base: "full", md: "fit-content" }}
                  >
                    New <Text display={{ base: "none", md: "inline" }}>Treatment</Text>
                  </Button>
              </Flex>
            </Grid>

            {/* Patient Info */}
            {selectedPatient && (
              <Card bg={cardBg}>
                <CardBody>
                  <HStack spacing={4}>
                    <Icon as={FiUser} boxSize={8} color="dental.500" />
                    <Box>
                      <Heading size="md">{selectedPatient.name}</Heading>
                      <Text color="gray.600">
                        Born:{" "}
                        {new Date(
                          selectedPatient.dateOfBirth
                        ).toLocaleDateString()}
                      </Text>
                    </Box>
                  </HStack>
                </CardBody>
              </Card>
            )}

            <Grid
              templateColumns={{ base: "1fr", lg: "2fr 1fr" }}
              gap={{ base: 4, sm: 6, lg: 8 }}
            >
              {/* Dental Chart */}
              <GridItem>
                <Card bg={cardBg}>
                  <CardHeader pb={{ base: 2, sm: 4 }}>
                    <Heading size={{ base: "sm", sm: "md" }}>
                      Dental Chart
                    </Heading>
                    <Text fontSize={{ base: "xs", sm: "sm" }} color="gray.600">
                      Click on a tooth to add conditions or view details
                    </Text>
                  </CardHeader>
                  <CardBody pt={0}>
                    <VStack spacing={{ base: 2, sm: 3, md: 4 }} align="stretch">
                      {/* Chart Container */}
                      <Box
                        w="100%"
                        bg="white"
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
                                  color="gray.600"
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
                                    background: "#F7FAFC",
                                    borderRadius: "2px",
                                  },
                                  "&::-webkit-scrollbar-thumb": {
                                    background: "#A0AEC0",
                                    borderRadius: "2px",
                                  },
                                  "&::-webkit-scrollbar-thumb:hover": {
                                    background: "#718096",
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
                                        isSelected ? "blue.500" : "gray.300"
                                      }
                                      shadow="sm"
                                      _hover={{
                                        transform: "scale(1.05)",
                                        shadow: "md",
                                        borderColor: "blue.400",
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
                            fontSize={{ base: "8px", sm: "xs", md: "sm" }}
                            px={{ base: 1, sm: 2, md: 3 }}
                            py={{ base: 0.5, sm: 1, md: 2 }}
                            minW="auto"
                          >
                            <Text display={{ base: "none", sm: "inline" }}>
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
                        bg="white"
                        p={{ base: 2, sm: 3, md: 4 }}
                        borderRadius="md"
                        shadow="md"
                        border="1px solid"
                        borderColor="gray.200"
                        w="100%"
                      >
                        <Text
                          fontSize={{ base: "xs", sm: "sm", md: "md" }}
                          fontWeight="bold"
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
              </GridItem>

              {/* Treatment Plans */}
              <GridItem>
                <Card bg={cardBg}>
                  <CardHeader>
                    <Heading size="md">Treatment Plans</Heading>
                  </CardHeader>
                  <CardBody>
                    <VStack spacing={4} align="stretch">
                      {treatmentPlans.map((plan) => (
                        <Box
                          key={plan.id}
                          p={4}
                          border="1px solid"
                          borderColor="gray.200"
                          borderRadius="md"
                        >
                          <HStack justify="space-between" mb={2}>
                            <Text fontWeight="medium">
                              Tooth #{plan.toothNumber}
                            </Text>
                            <Badge
                              colorScheme={getPriorityColor(plan.priority)}
                              size="sm"
                            >
                              {plan.priority}
                            </Badge>
                          </HStack>
                          <Text fontSize="sm" color="gray.600" mb={2}>
                            {plan.treatment}
                          </Text>
                          <HStack justify="space-between" mb={2}>
                            <Text fontSize="sm">
                              ₱{plan.estimatedCost.toLocaleString()}
                            </Text>
                            <Text fontSize="sm">
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
            </Grid>

            {/* Tooth Conditions History */}
            <Card bg={cardBg}>
              <CardHeader>
                <Heading size="md">Tooth Conditions History</Heading>
              </CardHeader>
              <CardBody>
                <VStack spacing={4} align="stretch">
                  {toothConditions.map((condition) => (
                    <Box
                      key={condition.id}
                      p={4}
                      border="1px solid"
                      borderColor="gray.200"
                      borderRadius="md"
                    >
                      <HStack justify="space-between" mb={2}>
                        <Text fontWeight="medium">
                          Tooth #{condition.toothNumber}
                        </Text>
                        <Text fontSize="sm" color="gray.600">
                          {new Date(condition.date).toLocaleDateString()}
                        </Text>
                      </HStack>
                      <Text fontSize="sm" color="gray.600" mb={2}>
                        {condition.condition} - {condition.dentist}
                      </Text>
                      <Text fontSize="sm">{condition.notes}</Text>
                    </Box>
                  ))}
                </VStack>
              </CardBody>
            </Card>
          </VStack>

          {/* Add Condition/Treatment Modal */}
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

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {type === "condition" ? "Add Tooth Condition" : "Add Treatment Plan"}{" "}
          - Tooth #{toothNumber}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <form onSubmit={handleSubmit}>
            <VStack spacing={4}>
              {type === "condition" ? (
                <>
                  <FormControl isRequired>
                    <FormLabel>Condition</FormLabel>
                    <Select
                      value={formData.condition}
                      onChange={(e) =>
                        setFormData({ ...formData, condition: e.target.value })
                      }
                    >
                      <option value="">Select Condition</option>
                      {Object.keys(dentalConditions).map((condition) => (
                        <option key={condition} value={condition}>
                          {condition}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                </>
              ) : (
                <>
                  <FormControl isRequired>
                    <FormLabel>Treatment</FormLabel>
                    <Select
                      value={formData.treatment}
                      onChange={(e) =>
                        setFormData({ ...formData, treatment: e.target.value })
                      }
                    >
                      <option value="">Select Treatment</option>
                      <option value="Filling">Filling</option>
                      <option value="Root Canal">Root Canal</option>
                      <option value="Crown">Crown</option>
                      <option value="Extraction">Extraction</option>
                      <option value="Cleaning">Cleaning</option>
                      <option value="Consultation">Consultation</option>
                    </Select>
                  </FormControl>

                  <Grid templateColumns="repeat(2, 1fr)" gap={4} w="full">
                    <GridItem>
                      <FormControl>
                        <FormLabel>Priority</FormLabel>
                        <Select
                          value={formData.priority}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              priority: e.target.value as
                                | "high"
                                | "medium"
                                | "low",
                            })
                          }
                        >
                          <option value="low">Low</option>
                          <option value="medium">Medium</option>
                          <option value="high">High</option>
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
                              status: e.target.value as
                                | "planned"
                                | "in-progress"
                                | "completed",
                            })
                          }
                        >
                          <option value="planned">Planned</option>
                          <option value="in-progress">In Progress</option>
                          <option value="completed">Completed</option>
                        </Select>
                      </FormControl>
                    </GridItem>
                    <GridItem>
                      <FormControl>
                        <FormLabel>Estimated Cost (₱)</FormLabel>
                        <Input
                          type="number"
                          value={formData.estimatedCost}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              estimatedCost: parseInt(e.target.value) || 0,
                            })
                          }
                        />
                      </FormControl>
                    </GridItem>
                    <GridItem>
                      <FormControl>
                        <FormLabel>Duration (minutes)</FormLabel>
                        <Input
                          type="number"
                          value={formData.estimatedDuration}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              estimatedDuration: parseInt(e.target.value) || 60,
                            })
                          }
                        />
                      </FormControl>
                    </GridItem>
                  </Grid>
                </>
              )}

              <FormControl>
                <FormLabel>Notes</FormLabel>
                <Textarea
                  value={formData.notes}
                  onChange={(e) =>
                    setFormData({ ...formData, notes: e.target.value })
                  }
                  placeholder="Additional notes or observations..."
                />
              </FormControl>

              <HStack spacing={4} w="full" justify="flex-end">
                <Button variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button type="submit" colorScheme="dental">
                  {type === "condition"
                    ? "Add Condition"
                    : "Add Treatment Plan"}
                </Button>
              </HStack>
            </VStack>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
