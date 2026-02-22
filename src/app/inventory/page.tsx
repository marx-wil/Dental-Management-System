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
  Icon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Select,
  Grid,
  GridItem,
  Card,
  CardBody,
  CardHeader,
  useDisclosure,
  Flex,
} from '@chakra-ui/react';
import {
  FiSearch,
  FiPlus,
  FiEdit,
  FiTrash2,
  FiPackage,
  FiAlertTriangle,
  FiTrendingDown,
  FiTrendingUp,
  FiShoppingCart,
} from 'react-icons/fi';
import Layout from '../components/Layout';
import ProtectedRoute from '../components/ProtectedRoute';

interface InventoryItem {
  id: string;
  name: string;
  category: string;
  currentStock: number;
  minimumStock: number;
  maximumStock: number;
  unit: string;
  unitPrice: number;
  supplier: string;
  lastRestocked: string;
  expiryDate?: string;
  status: 'in-stock' | 'low-stock' | 'out-of-stock' | 'expired';
}

const mockInventory: InventoryItem[] = [
  {
    id: '1',
    name: 'Dental Gloves (Latex)',
    category: 'Protective Equipment',
    currentStock: 5,
    minimumStock: 10,
    maximumStock: 100,
    unit: 'boxes',
    unitPrice: 250,
    supplier: 'MedSupply Philippines',
    lastRestocked: '2024-01-10',
    status: 'low-stock',
  },
  {
    id: '2',
    name: 'Composite Filling Material',
    category: 'Dental Materials',
    currentStock: 25,
    minimumStock: 5,
    maximumStock: 50,
    unit: 'tubes',
    unitPrice: 1200,
    supplier: 'Dental Depot',
    lastRestocked: '2024-01-15',
    status: 'in-stock',
  },
  {
    id: '3',
    name: 'Local Anesthetic (Lidocaine)',
    category: 'Medications',
    currentStock: 0,
    minimumStock: 5,
    maximumStock: 20,
    unit: 'vials',
    unitPrice: 150,
    supplier: 'PharmaCorp',
    lastRestocked: '2023-12-20',
    expiryDate: '2024-06-15',
    status: 'out-of-stock',
  },
  {
    id: '4',
    name: 'Dental X-Ray Film',
    category: 'Imaging Supplies',
    currentStock: 8,
    minimumStock: 15,
    maximumStock: 100,
    unit: 'boxes',
    unitPrice: 800,
    supplier: 'Imaging Solutions',
    lastRestocked: '2024-01-05',
    status: 'low-stock',
  },
  {
    id: '5',
    name: 'Disposable Syringes',
    category: 'Medical Supplies',
    currentStock: 50,
    minimumStock: 20,
    maximumStock: 200,
    unit: 'pieces',
    unitPrice: 15,
    supplier: 'MedSupply Philippines',
    lastRestocked: '2024-01-12',
    status: 'in-stock',
  },
];

export default function InventoryPage() {
  const [inventory, setInventory] = useState<InventoryItem[]>(mockInventory);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const filteredInventory = inventory.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in-stock': return 'green';
      case 'low-stock': return 'yellow';
      case 'out-of-stock': return 'red';
      case 'expired': return 'red';
      default: return 'gray';
    }
  };

  const getStockStatus = (item: InventoryItem): 'in-stock' | 'low-stock' | 'out-of-stock' | 'expired' => {
    if (item.currentStock === 0) return 'out-of-stock';
    if (item.currentStock <= item.minimumStock) return 'low-stock';
    if (item.expiryDate && new Date(item.expiryDate) < new Date()) return 'expired';
    return 'in-stock';
  };

  const lowStockItems = inventory.filter(item => item.status === 'low-stock' || item.status === 'out-of-stock');
  const totalValue = inventory.reduce((sum, item) => sum + (item.currentStock * item.unitPrice), 0);

  const handleAddItem = (newItem: Omit<InventoryItem, 'id'>) => {
    const item: InventoryItem = {
      ...newItem,
      id: Date.now().toString(),
      status: getStockStatus(newItem as InventoryItem),
    };
    setInventory([...inventory, item]);
    onClose();
  };

  const handleUpdateItem = (updatedItem: InventoryItem) => {
    const itemWithStatus = {
      ...updatedItem,
      status: getStockStatus(updatedItem),
    };
    setInventory(inventory.map(item => item.id === updatedItem.id ? itemWithStatus : item));
    onClose();
    setSelectedItem(null);
  };

  const handleSaveItem = (item: InventoryItem | Omit<InventoryItem, 'id'>) => {
    if ('id' in item) {
      // This is an update operation
      handleUpdateItem(item as InventoryItem);
    } else {
      // This is an add operation
      handleAddItem(item);
    }
  };

  const handleDeleteItem = (itemId: string) => {
    setInventory(inventory.filter(item => item.id !== itemId));
  };

  const categories = Array.from(new Set(inventory.map(item => item.category)));

  return (
    <ProtectedRoute allowedRoles={['admin', 'staff']}>
      <Layout>
        <Container maxW="7xl" py={8}>
          <VStack spacing={8} align="stretch">
            {/* Header */}
            <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={4}>
              <Box>
                <Heading size="lg" color="white">Inventory Management</Heading>
                <Text color="whiteAlpha.700">Track dental supplies and equipment</Text>
              </Box>
              <Flex justifyContent={"flex-end"}>
                <Button
                  w={{ base: "full", md: "fit-content" }}
                  leftIcon={<FiPlus />}
                  bgGradient="linear(135deg, cyan.500, violet.500)"
                  color="white"
                  _hover={{ bgGradient: "linear(135deg, cyan.400, violet.400)", boxShadow: "0 0 20px rgba(6,182,212,0.3)" }}
                  onClick={onOpen}
                  size={{ base: "sm", md: "md" }}
                  minW={{ base: "full", md: "fit-content" }}
                >
                  Add Item
                </Button>
              </Flex>
            </Grid>

            {/* Alerts */}
            {lowStockItems.length > 0 && (
              <Box
                p={4}
                bg="rgba(245,158,11,0.1)"
                border="1px solid rgba(245,158,11,0.25)"
                borderRadius="md"
              >
                <HStack spacing={3} align="flex-start">
                  <Icon as={FiAlertTriangle} color="amber.300" mt={0.5} flexShrink={0} />
                  <Box>
                    <Text fontWeight="bold" color="amber.300">Low Stock Alert!</Text>
                    <Text fontSize="sm" color="amber.300">
                      {lowStockItems.length} item(s) need restocking: {lowStockItems.map(item => item.name).join(', ')}
                    </Text>
                  </Box>
                </HStack>
              </Box>
            )}

            {/* Stats Cards */}
            <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', xl: 'repeat(4, 1fr)' }} gap={6}>
              <GridItem>
                <Card
                  bg="rgba(15,22,41,0.7)"
                  border="1px solid"
                  borderColor="rgba(255,255,255,0.07)"
                  backdropFilter="blur(12px)"
                  _hover={{ borderColor: "rgba(255,255,255,0.12)" }}
                >
                  <CardBody>
                    <HStack justify="space-between">
                      <Box>
                        <Text fontSize="sm" color="whiteAlpha.500">Total Items</Text>
                        <Text fontSize="2xl" fontWeight="bold" color="white">
                          {inventory.length}
                        </Text>
                      </Box>
                      <Icon as={FiPackage} boxSize={8} color="dental.500" />
                    </HStack>
                  </CardBody>
                </Card>
              </GridItem>
              <GridItem>
                <Card
                  bg="rgba(15,22,41,0.7)"
                  border="1px solid"
                  borderColor="rgba(255,255,255,0.07)"
                  backdropFilter="blur(12px)"
                  _hover={{ borderColor: "rgba(255,255,255,0.12)" }}
                >
                  <CardBody>
                    <HStack justify="space-between">
                      <Box>
                        <Text fontSize="sm" color="whiteAlpha.500">Low Stock</Text>
                        <Text fontSize="2xl" fontWeight="bold" color="yellow.500">
                          {lowStockItems.length}
                        </Text>
                      </Box>
                      <Icon as={FiAlertTriangle} boxSize={8} color="yellow.500" />
                    </HStack>
                  </CardBody>
                </Card>
              </GridItem>
              <GridItem>
                <Card
                  bg="rgba(15,22,41,0.7)"
                  border="1px solid"
                  borderColor="rgba(255,255,255,0.07)"
                  backdropFilter="blur(12px)"
                  _hover={{ borderColor: "rgba(255,255,255,0.12)" }}
                >
                  <CardBody>
                    <HStack justify="space-between">
                      <Box>
                        <Text fontSize="sm" color="whiteAlpha.500">Out of Stock</Text>
                        <Text fontSize="2xl" fontWeight="bold" color="red.500">
                          {inventory.filter(item => item.status === 'out-of-stock').length}
                        </Text>
                      </Box>
                      <Icon as={FiTrendingDown} boxSize={8} color="red.500" />
                    </HStack>
                  </CardBody>
                </Card>
              </GridItem>
              <GridItem>
                <Card
                  bg="rgba(15,22,41,0.7)"
                  border="1px solid"
                  borderColor="rgba(255,255,255,0.07)"
                  backdropFilter="blur(12px)"
                  _hover={{ borderColor: "rgba(255,255,255,0.12)" }}
                >
                  <CardBody>
                    <HStack justify="space-between">
                      <Box>
                        <Text fontSize="sm" color="whiteAlpha.500">Total Value</Text>
                        <Text fontSize="2xl" fontWeight="bold" color="green.500">
                          ₱{totalValue.toLocaleString()}
                        </Text>
                      </Box>
                      <Icon as={FiTrendingUp} boxSize={8} color="green.500" />
                    </HStack>
                  </CardBody>
                </Card>
              </GridItem>
            </Grid>

            {/* Search and Filters */}
            <Card
              bg="rgba(15,22,41,0.7)"
              border="1px solid"
              borderColor="rgba(255,255,255,0.07)"
              backdropFilter="blur(12px)"
            >
              <CardBody>
                <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', xl: 'repeat(2, 1fr)' }} gap={6}>
                  <InputGroup flex={1}>
                    <InputLeftElement color="whiteAlpha.400">
                      <FiSearch />
                    </InputLeftElement>
                    <Input
                      placeholder="Search inventory by name or category..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      bg="rgba(255,255,255,0.05)"
                      border="1.5px solid"
                      borderColor="rgba(255,255,255,0.1)"
                      color="white"
                      _focus={{ bg: "rgba(6,182,212,0.06)", borderColor: "cyan.500", boxShadow: "0 0 0 3px rgba(6,182,212,0.15)" }}
                      _hover={{ borderColor: "rgba(255,255,255,0.2)" }}
                      _placeholder={{ color: "whiteAlpha.300" }}
                    />
                  </InputGroup>
                  <Select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    w="200px"
                    bg="rgba(255,255,255,0.05)"
                    border="1.5px solid"
                    borderColor="rgba(255,255,255,0.1)"
                    color="white"
                    _focus={{ bg: "rgba(6,182,212,0.06)", borderColor: "cyan.500", boxShadow: "0 0 0 3px rgba(6,182,212,0.15)" }}
                    _hover={{ borderColor: "rgba(255,255,255,0.2)" }}
                  >
                    <option value="all">All Categories</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </Select>
                  <Select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    w="150px"
                    bg="rgba(255,255,255,0.05)"
                    border="1.5px solid"
                    borderColor="rgba(255,255,255,0.1)"
                    color="white"
                    _focus={{ bg: "rgba(6,182,212,0.06)", borderColor: "cyan.500", boxShadow: "0 0 0 3px rgba(6,182,212,0.15)" }}
                    _hover={{ borderColor: "rgba(255,255,255,0.2)" }}
                  >
                    <option value="all">All Status</option>
                    <option value="in-stock">In Stock</option>
                    <option value="low-stock">Low Stock</option>
                    <option value="out-of-stock">Out of Stock</option>
                    <option value="expired">Expired</option>
                  </Select>
                </Grid>
              </CardBody>
            </Card>

            {/* Inventory Table */}
            <Card
              bg="rgba(15,22,41,0.7)"
              border="1px solid"
              borderColor="rgba(255,255,255,0.07)"
              backdropFilter="blur(12px)"
            >
              <CardHeader>
                <Heading size="md" color="white">Inventory Items ({filteredInventory.length})</Heading>
              </CardHeader>
              <CardBody overflow={"auto"}>
                <Table variant="unstyled">
                  <Thead>
                    <Tr>
                      <Th bg="rgba(255,255,255,0.03)" color="whiteAlpha.500" borderColor="rgba(255,255,255,0.06)" fontSize="xs" fontWeight="700" letterSpacing="0.08em">Item Name</Th>
                      <Th bg="rgba(255,255,255,0.03)" color="whiteAlpha.500" borderColor="rgba(255,255,255,0.06)" fontSize="xs" fontWeight="700" letterSpacing="0.08em">Category</Th>
                      <Th bg="rgba(255,255,255,0.03)" color="whiteAlpha.500" borderColor="rgba(255,255,255,0.06)" fontSize="xs" fontWeight="700" letterSpacing="0.08em">Current Stock</Th>
                      <Th bg="rgba(255,255,255,0.03)" color="whiteAlpha.500" borderColor="rgba(255,255,255,0.06)" fontSize="xs" fontWeight="700" letterSpacing="0.08em">Min/Max</Th>
                      <Th bg="rgba(255,255,255,0.03)" color="whiteAlpha.500" borderColor="rgba(255,255,255,0.06)" fontSize="xs" fontWeight="700" letterSpacing="0.08em">Unit Price</Th>
                      <Th bg="rgba(255,255,255,0.03)" color="whiteAlpha.500" borderColor="rgba(255,255,255,0.06)" fontSize="xs" fontWeight="700" letterSpacing="0.08em">Supplier</Th>
                      <Th bg="rgba(255,255,255,0.03)" color="whiteAlpha.500" borderColor="rgba(255,255,255,0.06)" fontSize="xs" fontWeight="700" letterSpacing="0.08em">Status</Th>
                      <Th bg="rgba(255,255,255,0.03)" color="whiteAlpha.500" borderColor="rgba(255,255,255,0.06)" fontSize="xs" fontWeight="700" letterSpacing="0.08em">Actions</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {filteredInventory.map((item) => (
                      <Tr key={item.id} _hover={{ bg: "rgba(255,255,255,0.03)" }}>
                        <Td color="whiteAlpha.800" borderColor="rgba(255,255,255,0.05)">
                          <Box>
                            <Text fontWeight="medium">{item.name}</Text>
                            {item.expiryDate && (
                              <Text fontSize="sm" color="whiteAlpha.500">
                                Expires: {new Date(item.expiryDate).toLocaleDateString()}
                              </Text>
                            )}
                          </Box>
                        </Td>
                        <Td color="whiteAlpha.800" borderColor="rgba(255,255,255,0.05)">
                          <Text fontSize="sm">{item.category}</Text>
                        </Td>
                        <Td color="whiteAlpha.800" borderColor="rgba(255,255,255,0.05)">
                          <Text fontWeight="medium">{item.currentStock} {item.unit}</Text>
                        </Td>
                        <Td color="whiteAlpha.800" borderColor="rgba(255,255,255,0.05)">
                          <Text fontSize="sm">{item.minimumStock}/{item.maximumStock}</Text>
                        </Td>
                        <Td color="whiteAlpha.800" borderColor="rgba(255,255,255,0.05)">
                          <Text>₱{item.unitPrice.toLocaleString()}</Text>
                        </Td>
                        <Td color="whiteAlpha.800" borderColor="rgba(255,255,255,0.05)">
                          <Text fontSize="sm">{item.supplier}</Text>
                        </Td>
                        <Td borderColor="rgba(255,255,255,0.05)">
                          <Badge colorScheme={getStatusColor(item.status)}>
                            {item.status.replace('-', ' ')}
                          </Badge>
                        </Td>
                        <Td borderColor="rgba(255,255,255,0.05)">
                          <HStack spacing={2}>
                            <Button
                              size="sm"
                              variant="ghost"
                              color="whiteAlpha.600"
                              _hover={{ bg: "rgba(255,255,255,0.07)" }}
                              onClick={() => {
                                setSelectedItem(item);
                                onOpen();
                              }}
                            >
                              <FiEdit />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              color="green.400"
                              _hover={{ bg: "rgba(34,197,94,0.1)" }}
                              onClick={() => {
                                // Restock action
                                const updatedItem = {
                                  ...item,
                                  currentStock: item.maximumStock,
                                  lastRestocked: new Date().toISOString().split('T')[0],
                                };
                                handleUpdateItem(updatedItem);
                              }}
                            >
                              <FiShoppingCart />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              color="red.400"
                              _hover={{ bg: "rgba(239,68,68,0.1)" }}
                              onClick={() => handleDeleteItem(item.id)}
                            >
                              <FiTrash2 />
                            </Button>
                          </HStack>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </CardBody>
            </Card>
          </VStack>

          {/* Add/Edit Item Modal */}
          <InventoryModal
            isOpen={isOpen}
            onClose={() => {
              onClose();
              setSelectedItem(null);
            }}
            item={selectedItem}
            onSave={handleSaveItem}
          />
        </Container>
      </Layout>
    </ProtectedRoute>
  );
}

// Inventory Modal Component
function InventoryModal({ isOpen, onClose, item, onSave }: {
  isOpen: boolean;
  onClose: () => void;
  item: InventoryItem | null;
  onSave: (item: InventoryItem | Omit<InventoryItem, 'id'>) => void;
}) {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    currentStock: 0,
    minimumStock: 0,
    maximumStock: 0,
    unit: '',
    unitPrice: 0,
    supplier: '',
    lastRestocked: new Date().toISOString().split('T')[0],
    expiryDate: '',
  });

  React.useEffect(() => {
    if (item) {
      setFormData({
        name: item.name,
        category: item.category,
        currentStock: item.currentStock,
        minimumStock: item.minimumStock,
        maximumStock: item.maximumStock,
        unit: item.unit,
        unitPrice: item.unitPrice,
        supplier: item.supplier,
        lastRestocked: item.lastRestocked,
        expiryDate: item.expiryDate || '',
      });
    } else {
      setFormData({
        name: '',
        category: '',
        currentStock: 0,
        minimumStock: 0,
        maximumStock: 0,
        unit: '',
        unitPrice: 0,
        supplier: '',
        lastRestocked: new Date().toISOString().split('T')[0],
        expiryDate: '',
      });
    }
  }, [item]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const itemData = {
      ...formData,
      status: item ? item.status : 'in-stock' as const,
    };
    onSave(itemData);
  };

  const categories = [
    'Protective Equipment',
    'Dental Materials',
    'Medications',
    'Imaging Supplies',
    'Medical Supplies',
    'Instruments',
    'Disposables',
  ];

  const units = [
    'pieces',
    'boxes',
    'tubes',
    'vials',
    'bottles',
    'packs',
    'rolls',
    'sheets',
  ];

  const inputStyles = {
    bg: 'rgba(255,255,255,0.05)',
    border: '1.5px solid',
    borderColor: 'rgba(255,255,255,0.1)',
    color: 'white',
    _focus: { bg: 'rgba(6,182,212,0.06)', borderColor: 'cyan.500', boxShadow: '0 0 0 3px rgba(6,182,212,0.15)' },
    _hover: { borderColor: 'rgba(255,255,255,0.2)' },
    _placeholder: { color: 'whiteAlpha.300' },
  };

  const labelStyles = {
    fontSize: 'xs' as const,
    fontWeight: 600,
    color: 'whiteAlpha.500',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.06em',
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay bg="blackAlpha.800" backdropFilter="blur(6px)" />
      <ModalContent bg="#0f1629" border="1px solid rgba(255,255,255,0.08)" boxShadow="0 24px 64px rgba(0,0,0,0.6)" borderRadius="2xl">
        <ModalHeader color="white" borderBottom="1px solid rgba(255,255,255,0.07)">
          {item ? 'Edit Inventory Item' : 'Add New Inventory Item'}
        </ModalHeader>
        <ModalCloseButton color="whiteAlpha.600" />
        <ModalBody pb={6}>
          <form onSubmit={handleSubmit}>
            <VStack spacing={4}>
              <Grid templateColumns="repeat(2, 1fr)" gap={4} w="full">
                <GridItem>
                  <FormControl isRequired>
                    <FormLabel {...labelStyles}>Item Name</FormLabel>
                    <Input
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Enter item name"
                      {...inputStyles}
                    />
                  </FormControl>
                </GridItem>
                <GridItem>
                  <FormControl isRequired>
                    <FormLabel {...labelStyles}>Category</FormLabel>
                    <Select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      {...inputStyles}
                    >
                      <option value="">Select Category</option>
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                </GridItem>
                <GridItem>
                  <FormControl isRequired>
                    <FormLabel {...labelStyles}>Current Stock</FormLabel>
                    <Input
                      type="number"
                      value={formData.currentStock}
                      onChange={(e) => setFormData({ ...formData, currentStock: parseInt(e.target.value) || 0 })}
                      {...inputStyles}
                    />
                  </FormControl>
                </GridItem>
                <GridItem>
                  <FormControl isRequired>
                    <FormLabel {...labelStyles}>Unit</FormLabel>
                    <Select
                      value={formData.unit}
                      onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                      {...inputStyles}
                    >
                      <option value="">Select Unit</option>
                      {units.map((unit) => (
                        <option key={unit} value={unit}>
                          {unit}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                </GridItem>
                <GridItem>
                  <FormControl isRequired>
                    <FormLabel {...labelStyles}>Minimum Stock</FormLabel>
                    <Input
                      type="number"
                      value={formData.minimumStock}
                      onChange={(e) => setFormData({ ...formData, minimumStock: parseInt(e.target.value) || 0 })}
                      {...inputStyles}
                    />
                  </FormControl>
                </GridItem>
                <GridItem>
                  <FormControl isRequired>
                    <FormLabel {...labelStyles}>Maximum Stock</FormLabel>
                    <Input
                      type="number"
                      value={formData.maximumStock}
                      onChange={(e) => setFormData({ ...formData, maximumStock: parseInt(e.target.value) || 0 })}
                      {...inputStyles}
                    />
                  </FormControl>
                </GridItem>
                <GridItem>
                  <FormControl isRequired>
                    <FormLabel {...labelStyles}>Unit Price (₱)</FormLabel>
                    <Input
                      type="number"
                      value={formData.unitPrice}
                      onChange={(e) => setFormData({ ...formData, unitPrice: parseFloat(e.target.value) || 0 })}
                      {...inputStyles}
                    />
                  </FormControl>
                </GridItem>
                <GridItem>
                  <FormControl isRequired>
                    <FormLabel {...labelStyles}>Supplier</FormLabel>
                    <Input
                      value={formData.supplier}
                      onChange={(e) => setFormData({ ...formData, supplier: e.target.value })}
                      placeholder="Enter supplier name"
                      {...inputStyles}
                    />
                  </FormControl>
                </GridItem>
                <GridItem>
                  <FormControl isRequired>
                    <FormLabel {...labelStyles}>Last Restocked</FormLabel>
                    <Input
                      type="date"
                      value={formData.lastRestocked}
                      onChange={(e) => setFormData({ ...formData, lastRestocked: e.target.value })}
                      {...inputStyles}
                    />
                  </FormControl>
                </GridItem>
                <GridItem>
                  <FormControl>
                    <FormLabel {...labelStyles}>Expiry Date (Optional)</FormLabel>
                    <Input
                      type="date"
                      value={formData.expiryDate}
                      onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                      {...inputStyles}
                    />
                  </FormControl>
                </GridItem>
              </Grid>

              <HStack spacing={4} w="full" justify="flex-end">
                <Button
                  variant="ghost"
                  color="whiteAlpha.600"
                  _hover={{ bg: 'rgba(255,255,255,0.07)' }}
                  onClick={onClose}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  bgGradient="linear(135deg, cyan.500, violet.500)"
                  color="white"
                  _hover={{ bgGradient: 'linear(135deg, cyan.400, violet.400)', boxShadow: '0 0 20px rgba(6,182,212,0.3)' }}
                >
                  {item ? 'Update Item' : 'Add Item'}
                </Button>
              </HStack>
            </VStack>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
