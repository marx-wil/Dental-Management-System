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
} from '@chakra-ui/react';
import {
  FiUser,
  FiPlus,
  FiEdit,
  FiSave,
  FiTrash2,
  FiCalendar,
  FiActivity,
} from 'react-icons/fi';
import Layout from '../components/Layout';
import ProtectedRoute from '../components/ProtectedRoute';

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
  priority: 'high' | 'medium' | 'low';
  estimatedCost: number;
  estimatedDuration: number;
  status: 'planned' | 'in-progress' | 'completed';
  notes: string;
}

interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  avatar?: string;
}

const mockPatients = [
  { id: '1', name: 'Maria Santos', dateOfBirth: '1985-03-15', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face' },
  { id: '2', name: 'Carlos Mendoza', dateOfBirth: '1978-07-22', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face' },
  { id: '3', name: 'Ana Rodriguez', dateOfBirth: '1992-11-08', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face' },
];

const mockToothConditions: ToothCondition[] = [
  {
    id: '1',
    toothNumber: '14',
    condition: 'Cavity',
    date: '2024-01-10',
    notes: 'Small cavity on occlusal surface',
    dentist: 'Dr. Juan Dela Cruz',
  },
  {
    id: '2',
    toothNumber: '16',
    condition: 'Root Canal',
    date: '2024-01-05',
    notes: 'Completed root canal treatment',
    dentist: 'Dr. Maria Santos',
  },
  {
    id: '3',
    toothNumber: '21',
    condition: 'Filling',
    date: '2023-12-20',
    notes: 'Composite filling on mesial surface',
    dentist: 'Dr. Juan Dela Cruz',
  },
];

const mockTreatmentPlans: TreatmentPlan[] = [
  {
    id: '1',
    toothNumber: '14',
    treatment: 'Filling',
    priority: 'high',
    estimatedCost: 2500,
    estimatedDuration: 60,
    status: 'planned',
    notes: 'Composite filling for cavity',
  },
  {
    id: '2',
    toothNumber: '18',
    treatment: 'Extraction',
    priority: 'medium',
    estimatedCost: 3000,
    estimatedDuration: 45,
    status: 'planned',
    notes: 'Wisdom tooth extraction',
  },
  {
    id: '3',
    toothNumber: '11',
    treatment: 'Crown',
    priority: 'low',
    estimatedCost: 15000,
    estimatedDuration: 120,
    status: 'planned',
    notes: 'Porcelain crown for damaged tooth',
  },
];

// Dental chart tooth positions (Universal Numbering System)
const toothPositions = [
  // Upper teeth (maxillary)
  { number: '18', position: { x: 50, y: 20 }, type: 'molar' },
  { number: '17', position: { x: 100, y: 20 }, type: 'molar' },
  { number: '16', position: { x: 150, y: 20 }, type: 'molar' },
  { number: '15', position: { x: 200, y: 20 }, type: 'premolar' },
  { number: '14', position: { x: 250, y: 20 }, type: 'premolar' },
  { number: '13', position: { x: 300, y: 20 }, type: 'canine' },
  { number: '12', position: { x: 350, y: 20 }, type: 'incisor' },
  { number: '11', position: { x: 400, y: 20 }, type: 'incisor' },
  { number: '21', position: { x: 450, y: 20 }, type: 'incisor' },
  { number: '22', position: { x: 500, y: 20 }, type: 'incisor' },
  { number: '23', position: { x: 550, y: 20 }, type: 'canine' },
  { number: '24', position: { x: 600, y: 20 }, type: 'premolar' },
  { number: '25', position: { x: 650, y: 20 }, type: 'premolar' },
  { number: '26', position: { x: 700, y: 20 }, type: 'molar' },
  { number: '27', position: { x: 750, y: 20 }, type: 'molar' },
  { number: '28', position: { x: 800, y: 20 }, type: 'molar' },
  
  // Lower teeth (mandibular)
  { number: '48', position: { x: 50, y: 80 }, type: 'molar' },
  { number: '47', position: { x: 100, y: 80 }, type: 'molar' },
  { number: '46', position: { x: 150, y: 80 }, type: 'molar' },
  { number: '45', position: { x: 200, y: 80 }, type: 'premolar' },
  { number: '44', position: { x: 250, y: 80 }, type: 'premolar' },
  { number: '43', position: { x: 300, y: 80 }, type: 'canine' },
  { number: '42', position: { x: 350, y: 80 }, type: 'incisor' },
  { number: '41', position: { x: 400, y: 80 }, type: 'incisor' },
  { number: '31', position: { x: 450, y: 80 }, type: 'incisor' },
  { number: '32', position: { x: 500, y: 80 }, type: 'incisor' },
  { number: '33', position: { x: 550, y: 80 }, type: 'canine' },
  { number: '34', position: { x: 600, y: 80 }, type: 'premolar' },
  { number: '35', position: { x: 650, y: 80 }, type: 'premolar' },
  { number: '36', position: { x: 700, y: 80 }, type: 'molar' },
  { number: '37', position: { x: 750, y: 80 }, type: 'molar' },
  { number: '38', position: { x: 800, y: 80 }, type: 'molar' },
];

export default function ChartingPage() {
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(mockPatients[0]);
  const [toothConditions, setToothConditions] = useState<ToothCondition[]>(mockToothConditions);
  const [treatmentPlans, setTreatmentPlans] = useState<TreatmentPlan[]>(mockTreatmentPlans);
  const [selectedTooth, setSelectedTooth] = useState<string | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalType, setModalType] = useState<'condition' | 'treatment'>('condition');
  
  const cardBg = useColorModeValue('white', 'gray.800');

  const getToothCondition = (toothNumber: string) => {
    return toothConditions.find(condition => condition.toothNumber === toothNumber);
  };

  const getToothTreatment = (toothNumber: string) => {
    return treatmentPlans.find(plan => plan.toothNumber === toothNumber);
  };

  const getToothColor = (toothNumber: string) => {
    const condition = getToothCondition(toothNumber);
    const treatment = getToothTreatment(toothNumber);
    
    if (treatment?.status === 'completed') return 'green.500';
    if (treatment?.status === 'in-progress') return 'yellow.500';
    if (treatment?.priority === 'high') return 'red.500';
    if (condition?.condition === 'Cavity') return 'orange.500';
    if (condition?.condition === 'Root Canal') return 'purple.500';
    if (condition?.condition === 'Filling') return 'blue.500';
    
    return 'gray.300';
  };

  const handleToothClick = (toothNumber: string) => {
    setSelectedTooth(toothNumber);
    setModalType('condition');
    onOpen();
  };

  const handleAddCondition = (condition: Omit<ToothCondition, 'id'>) => {
    const newCondition: ToothCondition = {
      ...condition,
      id: Date.now().toString(),
    };
    setToothConditions([...toothConditions, newCondition]);
    onClose();
  };

  const handleAddTreatment = (treatment: Omit<TreatmentPlan, 'id'>) => {
    const newTreatment: TreatmentPlan = {
      ...treatment,
      id: Date.now().toString(),
    };
    setTreatmentPlans([...treatmentPlans, newTreatment]);
    onClose();
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'red';
      case 'medium': return 'yellow';
      case 'low': return 'green';
      default: return 'gray';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'green';
      case 'in-progress': return 'yellow';
      case 'planned': return 'blue';
      default: return 'gray';
    }
  };

  return (
    <ProtectedRoute allowedRoles={['admin', 'dentist']}>
      <Layout>
        <Container maxW="7xl" py={8}>
          <VStack spacing={8} align="stretch">
            {/* Header */}
            <HStack justify="space-between">
              <Box>
                <Heading size="lg">Dental Charting</Heading>
                <Text color="gray.600">Interactive dental chart and treatment planning</Text>
              </Box>
              <HStack spacing={4}>
                <Select
                  value={selectedPatient?.id || ''}
                  onChange={(e) => {
                    const patient = mockPatients.find(p => p.id === e.target.value);
                    setSelectedPatient(patient || null);
                  }}
                  w="200px"
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
                    setModalType('treatment');
                    onOpen();
                  }}
                >
                  Add Treatment Plan
                </Button>
              </HStack>
            </HStack>

            {/* Patient Info */}
            {selectedPatient && (
              <Card bg={cardBg}>
                <CardBody>
                  <HStack spacing={4}>
                    <Icon as={FiUser} boxSize={8} color="dental.500" />
                    <Box>
                      <Heading size="md">{selectedPatient.name}</Heading>
                      <Text color="gray.600">
                        Born: {new Date(selectedPatient.dateOfBirth).toLocaleDateString()}
                      </Text>
                    </Box>
                  </HStack>
                </CardBody>
              </Card>
            )}

            <Grid templateColumns={{ base: '1fr', lg: '2fr 1fr' }} gap={8}>
              {/* Dental Chart */}
              <GridItem>
                <Card bg={cardBg}>
                  <CardHeader>
                    <Heading size="md">Dental Chart</Heading>
                    <Text fontSize="sm" color="gray.600">
                      Click on a tooth to add conditions or view details
                    </Text>
                  </CardHeader>
                  <CardBody>
                    <Box position="relative" h="400px" bg="gray.50" borderRadius="md" overflow="hidden">
                      {/* Chart Legend */}
                      <Box position="absolute" top={4} right={4} bg="white" p={3} borderRadius="md" shadow="sm">
                        <VStack spacing={2} align="start">
                          <HStack spacing={2}>
                            <Box w={3} h={3} bg="red.500" borderRadius="sm" />
                            <Text fontSize="xs">High Priority</Text>
                          </HStack>
                          <HStack spacing={2}>
                            <Box w={3} h={3} bg="orange.500" borderRadius="sm" />
                            <Text fontSize="xs">Cavity</Text>
                          </HStack>
                          <HStack spacing={2}>
                            <Box w={3} h={3} bg="blue.500" borderRadius="sm" />
                            <Text fontSize="xs">Filling</Text>
                          </HStack>
                          <HStack spacing={2}>
                            <Box w={3} h={3} bg="purple.500" borderRadius="sm" />
                            <Text fontSize="xs">Root Canal</Text>
                          </HStack>
                          <HStack spacing={2}>
                            <Box w={3} h={3} bg="green.500" borderRadius="sm" />
                            <Text fontSize="xs">Completed</Text>
                          </HStack>
                        </VStack>
                      </Box>

                      {/* Teeth */}
                      {toothPositions.map((tooth) => (
                        <Box
                          key={tooth.number}
                          position="absolute"
                          left={`${tooth.position.x}px`}
                          top={`${tooth.position.y}px`}
                          w="40px"
                          h="40px"
                          bg={getToothColor(tooth.number)}
                          borderRadius="full"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          cursor="pointer"
                          border="2px solid"
                          borderColor="white"
                          shadow="sm"
                          _hover={{
                            transform: 'scale(1.1)',
                            shadow: 'md',
                          }}
                          transition="all 0.2s"
                          onClick={() => handleToothClick(tooth.number)}
                        >
                          <Text fontSize="xs" fontWeight="bold" color="white">
                            {tooth.number}
                          </Text>
                        </Box>
                      ))}

                      {/* Chart Labels */}
                      <Text position="absolute" top={2} left={2} fontSize="sm" fontWeight="bold">
                        Upper (Maxillary)
                      </Text>
                      <Text position="absolute" bottom={2} left={2} fontSize="sm" fontWeight="bold">
                        Lower (Mandibular)
                      </Text>
                    </Box>
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
                            <Text fontWeight="medium">Tooth #{plan.toothNumber}</Text>
                            <Badge colorScheme={getPriorityColor(plan.priority)} size="sm">
                              {plan.priority}
                            </Badge>
                          </HStack>
                          <Text fontSize="sm" color="gray.600" mb={2}>
                            {plan.treatment}
                          </Text>
                          <HStack justify="space-between" mb={2}>
                            <Text fontSize="sm">₱{plan.estimatedCost.toLocaleString()}</Text>
                            <Text fontSize="sm">{plan.estimatedDuration} min</Text>
                          </HStack>
                          <Badge colorScheme={getStatusColor(plan.status)} size="sm">
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
                        <Text fontWeight="medium">Tooth #{condition.toothNumber}</Text>
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
function ToothModal({ isOpen, onClose, toothNumber, type, onAddCondition, onAddTreatment }: {
  isOpen: boolean;
  onClose: () => void;
  toothNumber: string | null;
  type: 'condition' | 'treatment';
  onAddCondition: (condition: Omit<ToothCondition, 'id'>) => void;
  onAddTreatment: (treatment: Omit<TreatmentPlan, 'id'>) => void;
}) {
  const [formData, setFormData] = useState({
    condition: '',
    treatment: '',
    priority: 'medium' as 'high' | 'medium' | 'low',
    estimatedCost: 0,
    estimatedDuration: 60,
    status: 'planned' as 'planned' | 'in-progress' | 'completed',
    notes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (type === 'condition' && toothNumber) {
      onAddCondition({
        toothNumber,
        condition: formData.condition,
        date: new Date().toISOString().split('T')[0],
        notes: formData.notes,
        dentist: 'Dr. Juan Dela Cruz', // Mock dentist
      });
    } else if (type === 'treatment' && toothNumber) {
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
      condition: '',
      treatment: '',
      priority: 'medium',
      estimatedCost: 0,
      estimatedDuration: 60,
      status: 'planned',
      notes: '',
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {type === 'condition' ? 'Add Tooth Condition' : 'Add Treatment Plan'} - Tooth #{toothNumber}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <form onSubmit={handleSubmit}>
            <VStack spacing={4}>
              {type === 'condition' ? (
                <>
                  <FormControl isRequired>
                    <FormLabel>Condition</FormLabel>
                    <Select
                      value={formData.condition}
                      onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
                    >
                      <option value="">Select Condition</option>
                      <option value="Cavity">Cavity</option>
                      <option value="Filling">Filling</option>
                      <option value="Root Canal">Root Canal</option>
                      <option value="Crown">Crown</option>
                      <option value="Extraction">Extraction</option>
                      <option value="Healthy">Healthy</option>
                    </Select>
                  </FormControl>
                </>
              ) : (
                <>
                  <FormControl isRequired>
                    <FormLabel>Treatment</FormLabel>
                    <Select
                      value={formData.treatment}
                      onChange={(e) => setFormData({ ...formData, treatment: e.target.value })}
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
                          onChange={(e) => setFormData({ ...formData, priority: e.target.value as 'high' | 'medium' | 'low' })}
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
                          onChange={(e) => setFormData({ ...formData, status: e.target.value as 'planned' | 'in-progress' | 'completed' })}
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
                          onChange={(e) => setFormData({ ...formData, estimatedCost: parseInt(e.target.value) || 0 })}
                        />
                      </FormControl>
                    </GridItem>
                    <GridItem>
                      <FormControl>
                        <FormLabel>Duration (minutes)</FormLabel>
                        <Input
                          type="number"
                          value={formData.estimatedDuration}
                          onChange={(e) => setFormData({ ...formData, estimatedDuration: parseInt(e.target.value) || 60 })}
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
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Additional notes or observations..."
                />
              </FormControl>

              <HStack spacing={4} w="full" justify="flex-end">
                <Button variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button type="submit" colorScheme="dental">
                  {type === 'condition' ? 'Add Condition' : 'Add Treatment Plan'}
                </Button>
              </HStack>
            </VStack>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
