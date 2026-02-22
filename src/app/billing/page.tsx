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
  Divider,
  Textarea,
} from "@chakra-ui/react";
import {
  FiSearch,
  FiPlus,
  FiEdit,
  FiTrash2,
  FiEye,
  FiDollarSign,
  FiCreditCard,
  FiFileText,
} from "react-icons/fi";
import Layout from "../components/Layout";
import ProtectedRoute from "../components/ProtectedRoute";

interface Invoice {
  id: string;
  invoiceNumber: string;
  patientId: string;
  patientName: string;
  date: string;
  dueDate: string;
  items: InvoiceItem[];
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
  status: "draft" | "sent" | "paid" | "overdue" | "cancelled";
  paymentMethod?: string;
  paymentDate?: string;
  notes?: string;
}

interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

interface Payment {
  id: string;
  invoiceId: string;
  amount: number;
  method: "cash" | "card" | "gcash" | "bank_transfer" | "check";
  date: string;
  reference?: string;
  notes?: string;
}

const mockInvoices: Invoice[] = [
  {
    id: "1",
    invoiceNumber: "INV-2024-001",
    patientId: "1",
    patientName: "Maria Santos",
    date: "2024-01-15",
    dueDate: "2024-02-15",
    items: [
      {
        id: "1",
        description: "Dental Cleaning",
        quantity: 1,
        unitPrice: 1500,
        total: 1500,
      },
      {
        id: "2",
        description: "Fluoride Treatment",
        quantity: 1,
        unitPrice: 800,
        total: 800,
      },
    ],
    subtotal: 2300,
    discount: 0,
    tax: 276,
    total: 2576,
    status: "paid",
    paymentMethod: "cash",
    paymentDate: "2024-01-15",
    notes: "Payment received in full",
  },
  {
    id: "2",
    invoiceNumber: "INV-2024-002",
    patientId: "2",
    patientName: "Carlos Mendoza",
    date: "2024-01-16",
    dueDate: "2024-02-16",
    items: [
      {
        id: "3",
        description: "Cavity Filling",
        quantity: 1,
        unitPrice: 2500,
        total: 2500,
      },
      {
        id: "4",
        description: "X-Ray",
        quantity: 2,
        unitPrice: 300,
        total: 600,
      },
    ],
    subtotal: 3100,
    discount: 155, // 5% senior citizen discount
    tax: 353.25,
    total: 3298.25,
    status: "sent",
    notes: "Senior citizen discount applied",
  },
  {
    id: "3",
    invoiceNumber: "INV-2024-003",
    patientId: "3",
    patientName: "Ana Rodriguez",
    date: "2024-01-10",
    dueDate: "2024-02-10",
    items: [
      {
        id: "5",
        description: "Root Canal Treatment",
        quantity: 1,
        unitPrice: 8000,
        total: 8000,
      },
      {
        id: "6",
        description: "Crown",
        quantity: 1,
        unitPrice: 15000,
        total: 15000,
      },
    ],
    subtotal: 23000,
    discount: 0,
    tax: 2760,
    total: 25760,
    status: "overdue",
    notes: "Payment plan available",
  },
];

const mockPayments: Payment[] = [
  {
    id: "1",
    invoiceId: "1",
    amount: 2576,
    method: "cash",
    date: "2024-01-15",
    reference: "CASH-001",
    notes: "Full payment received",
  },
  {
    id: "2",
    invoiceId: "2",
    amount: 1000,
    method: "gcash",
    date: "2024-01-20",
    reference: "GCASH-123456",
    notes: "Partial payment via GCash",
  },
];

export default function BillingPage() {
  const [invoices, setInvoices] = useState<Invoice[]>(mockInvoices);
  const [payments, setPayments] = useState<Payment[]>(mockPayments);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isPaymentOpen,
    onOpen: onPaymentOpen,
    onClose: onPaymentClose,
  } = useDisclosure();

  const filteredInvoices = invoices.filter((invoice) => {
    const matchesSearch =
      invoice.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || invoice.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "green";
      case "sent":
        return "blue";
      case "overdue":
        return "red";
      case "draft":
        return "gray";
      case "cancelled":
        return "red";
      default:
        return "gray";
    }
  };

  const getPaymentMethodIcon = (method: string) => {
    switch (method) {
      case "cash":
        return FiDollarSign;
      case "card":
        return FiCreditCard;
      case "gcash":
        return FiCreditCard;
      case "bank_transfer":
        return FiCreditCard;
      case "check":
        return FiFileText;
      default:
        return FiDollarSign;
    }
  };

  const handleAddInvoice = (newInvoice: Omit<Invoice, "id">) => {
    const invoice: Invoice = {
      ...newInvoice,
      id: Date.now().toString(),
    };
    setInvoices([...invoices, invoice]);
    onClose();
  };

  const handleAddPayment = (newPayment: Omit<Payment, "id">) => {
    const payment: Payment = {
      ...newPayment,
      id: Date.now().toString(),
    };
    setPayments([...payments, payment]);

    // Update invoice status if fully paid
    const invoice = invoices.find((inv) => inv.id === newPayment.invoiceId);
    if (invoice) {
      const totalPaid =
        payments
          .filter((p) => p.invoiceId === newPayment.invoiceId)
          .reduce((sum, p) => sum + p.amount, 0) + newPayment.amount;

      if (totalPaid >= invoice.total) {
        setInvoices(
          invoices.map((inv) =>
            inv.id === newPayment.invoiceId
              ? {
                  ...inv,
                  status: "paid" as const,
                  paymentDate: newPayment.date,
                }
              : inv
          )
        );
      }
    }

    onPaymentClose();
  };

  const calculateOutstandingBalance = () => {
    return invoices
      .filter((inv) => inv.status !== "paid" && inv.status !== "cancelled")
      .reduce((sum, inv) => sum + inv.total, 0);
  };

  const calculateMonthlyRevenue = () => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    return invoices
      .filter((inv) => {
        const invoiceDate = new Date(inv.date);
        return (
          invoiceDate.getMonth() === currentMonth &&
          invoiceDate.getFullYear() === currentYear &&
          inv.status === "paid"
        );
      })
      .reduce((sum, inv) => sum + inv.total, 0);
  };

  return (
    <ProtectedRoute allowedRoles={["admin", "dentist", "staff"]}>
      <Layout>
        <Container maxW="7xl" py={8}>
          <VStack spacing={8} align="stretch">
            {/* Header */}
            <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={4}>
              <Box>
                <Heading size="lg" color="white">Billing & Payments</Heading>
                <Text color="whiteAlpha.700">
                  Manage invoices and payment processing
                </Text>
              </Box>
              <HStack spacing={4} justifyContent={"flex-end"}>
                <Button
                  leftIcon={<FiPlus />}
                  bgGradient="linear(135deg, cyan.500, violet.500)"
                  color="white"
                  _hover={{ bgGradient: "linear(135deg, cyan.400, violet.400)", boxShadow: "0 0 20px rgba(6,182,212,0.3)" }}
                  onClick={onOpen}
                >
                  Create Invoice
                </Button>
                <Button
                  leftIcon={<FiDollarSign />}
                  variant="ghost"
                  color="whiteAlpha.600"
                  _hover={{ bg: "rgba(255,255,255,0.07)" }}
                  onClick={onPaymentOpen}
                >
                  Record Payment
                </Button>
              </HStack>
            </Grid>

            {/* Stats Cards */}
            <Grid
              templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", xl: "repeat(3, 1fr)" }}
              gap={6}
            >
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
                        <Text fontSize="sm" color="whiteAlpha.500">
                          Outstanding Balance
                        </Text>
                        <Text fontSize="2xl" fontWeight="bold" color="red.500">
                          ₱{calculateOutstandingBalance().toLocaleString()}
                        </Text>
                      </Box>
                      <Icon as={FiDollarSign} boxSize={8} color="red.500" />
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
                        <Text fontSize="sm" color="whiteAlpha.500">
                          Monthly Revenue
                        </Text>
                        <Text
                          fontSize="2xl"
                          fontWeight="bold"
                          color="green.500"
                        >
                          ₱{calculateMonthlyRevenue().toLocaleString()}
                        </Text>
                      </Box>
                      <Icon as={FiDollarSign} boxSize={8} color="green.500" />
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
                        <Text fontSize="sm" color="whiteAlpha.500">
                          Total Invoices
                        </Text>
                        <Text fontSize="2xl" fontWeight="bold" color="white">
                          {invoices.length}
                        </Text>
                      </Box>
                      <Icon as={FiFileText} boxSize={8} color="dental.500" />
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
                <HStack spacing={4}>
                  <InputGroup flex={1}>
                    <InputLeftElement color="whiteAlpha.400">
                      <FiSearch />
                    </InputLeftElement>
                    <Input
                      placeholder="Search invoices by patient name or invoice number..."
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
                    <option value="draft">Draft</option>
                    <option value="sent">Sent</option>
                    <option value="paid">Paid</option>
                    <option value="overdue">Overdue</option>
                    <option value="cancelled">Cancelled</option>
                  </Select>
                </HStack>
              </CardBody>
            </Card>

            {/* Invoices Table */}
            <Card
              bg="rgba(15,22,41,0.7)"
              border="1px solid"
              borderColor="rgba(255,255,255,0.07)"
              backdropFilter="blur(12px)"
            >
              <CardHeader>
                <Heading size="md" color="white">
                  Invoices ({filteredInvoices.length})
                </Heading>
              </CardHeader>
              <CardBody overflow={"auto"}>
                <Table variant="unstyled">
                  <Thead>
                    <Tr>
                      <Th bg="rgba(255,255,255,0.03)" color="whiteAlpha.500" borderColor="rgba(255,255,255,0.06)" fontSize="xs" fontWeight="700" letterSpacing="0.08em">Invoice #</Th>
                      <Th bg="rgba(255,255,255,0.03)" color="whiteAlpha.500" borderColor="rgba(255,255,255,0.06)" fontSize="xs" fontWeight="700" letterSpacing="0.08em">Patient</Th>
                      <Th bg="rgba(255,255,255,0.03)" color="whiteAlpha.500" borderColor="rgba(255,255,255,0.06)" fontSize="xs" fontWeight="700" letterSpacing="0.08em">Date</Th>
                      <Th bg="rgba(255,255,255,0.03)" color="whiteAlpha.500" borderColor="rgba(255,255,255,0.06)" fontSize="xs" fontWeight="700" letterSpacing="0.08em">Due Date</Th>
                      <Th bg="rgba(255,255,255,0.03)" color="whiteAlpha.500" borderColor="rgba(255,255,255,0.06)" fontSize="xs" fontWeight="700" letterSpacing="0.08em">Amount</Th>
                      <Th bg="rgba(255,255,255,0.03)" color="whiteAlpha.500" borderColor="rgba(255,255,255,0.06)" fontSize="xs" fontWeight="700" letterSpacing="0.08em">Status</Th>
                      <Th bg="rgba(255,255,255,0.03)" color="whiteAlpha.500" borderColor="rgba(255,255,255,0.06)" fontSize="xs" fontWeight="700" letterSpacing="0.08em">Actions</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {filteredInvoices.map((invoice) => (
                      <Tr key={invoice.id} _hover={{ bg: "rgba(255,255,255,0.03)" }}>
                        <Td color="whiteAlpha.800" borderColor="rgba(255,255,255,0.05)">
                          <Text fontWeight="medium">
                            {invoice.invoiceNumber}
                          </Text>
                        </Td>
                        <Td color="whiteAlpha.800" borderColor="rgba(255,255,255,0.05)">
                          <HStack spacing={3}>
                            <Avatar size="sm" name={invoice.patientName} />
                            <Text>{invoice.patientName}</Text>
                          </HStack>
                        </Td>
                        <Td color="whiteAlpha.800" borderColor="rgba(255,255,255,0.05)">
                          <Text fontSize="sm">
                            {new Date(invoice.date).toLocaleDateString()}
                          </Text>
                        </Td>
                        <Td color="whiteAlpha.800" borderColor="rgba(255,255,255,0.05)">
                          <Text fontSize="sm">
                            {new Date(invoice.dueDate).toLocaleDateString()}
                          </Text>
                        </Td>
                        <Td color="whiteAlpha.800" borderColor="rgba(255,255,255,0.05)">
                          <Text fontWeight="medium">
                            ₱{invoice.total.toLocaleString()}
                          </Text>
                        </Td>
                        <Td borderColor="rgba(255,255,255,0.05)">
                          <Badge colorScheme={getStatusColor(invoice.status)}>
                            {invoice.status}
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
                                setSelectedInvoice(invoice);
                                // Open view modal
                              }}
                            >
                              <FiEye />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              color="whiteAlpha.600"
                              _hover={{ bg: "rgba(255,255,255,0.07)" }}
                              onClick={() => {
                                setSelectedInvoice(invoice);
                                onOpen();
                              }}
                            >
                              <FiEdit />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              color="red.400"
                              _hover={{ bg: "rgba(239,68,68,0.1)" }}
                              onClick={() => {
                                setInvoices(
                                  invoices.filter(
                                    (inv) => inv.id !== invoice.id
                                  )
                                );
                              }}
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

            {/* Recent Payments */}
            <Card
              bg="rgba(15,22,41,0.7)"
              border="1px solid"
              borderColor="rgba(255,255,255,0.07)"
              backdropFilter="blur(12px)"
            >
              <CardHeader>
                <Heading size="md" color="white">Recent Payments</Heading>
              </CardHeader>
              <CardBody>
                <VStack spacing={4} align="stretch">
                  {payments.slice(0, 5).map((payment) => {
                    const invoice = invoices.find(
                      (inv) => inv.id === payment.invoiceId
                    );
                    return (
                      <HStack
                        key={payment.id}
                        justify="space-between"
                        p={4}
                        bg="rgba(255,255,255,0.03)"
                        border="1px solid rgba(255,255,255,0.06)"
                        borderRadius="md"
                      >
                        <HStack spacing={4}>
                          <Icon
                            as={getPaymentMethodIcon(payment.method)}
                            color="dental.500"
                          />
                          <Box>
                            <Text fontWeight="medium" color="white">
                              {invoice?.patientName} - {invoice?.invoiceNumber}
                            </Text>
                            <Text fontSize="sm" color="whiteAlpha.500">
                              {new Date(payment.date).toLocaleDateString()} •{" "}
                              {payment.method.toUpperCase()}
                            </Text>
                          </Box>
                        </HStack>
                        <Text fontWeight="medium" color="green.500">
                          ₱{payment.amount.toLocaleString()}
                        </Text>
                      </HStack>
                    );
                  })}
                </VStack>
              </CardBody>
            </Card>
          </VStack>

          {/* Create/Edit Invoice Modal */}
          <InvoiceModal
            isOpen={isOpen}
            onClose={onClose}
            invoice={selectedInvoice}
            invoices={invoices}
            onSave={
              selectedInvoice
                ? (invoice: Invoice | Omit<Invoice, "id">) => {
                    const inv = invoice as Invoice;
                    setInvoices(
                      invoices.map((i) => (i.id === inv.id ? inv : i))
                    );
                    onClose();
                  }
                : handleAddInvoice
            }
          />

          {/* Record Payment Modal */}
          <PaymentModal
            isOpen={isPaymentOpen}
            onClose={onPaymentClose}
            invoices={invoices}
            onSave={handleAddPayment}
          />
        </Container>
      </Layout>
    </ProtectedRoute>
  );
}

// Invoice Modal Component
function InvoiceModal({
  isOpen,
  onClose,
  invoice,
  invoices,
  onSave,
}: {
  isOpen: boolean;
  onClose: () => void;
  invoice: Invoice | null;
  invoices: Invoice[];
  onSave: (invoice: Invoice | Omit<Invoice, "id">) => void;
}) {
  const [formData, setFormData] = useState({
    patientId: "",
    patientName: "",
    date: new Date().toISOString().split("T")[0],
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    items: [{ id: "1", description: "", quantity: 1, unitPrice: 0, total: 0 }],
    discount: 0,
    tax: 0,
    status: "draft" as Invoice["status"],
    notes: "",
  });

  React.useEffect(() => {
    if (invoice) {
      setFormData({
        patientId: invoice.patientId,
        patientName: invoice.patientName,
        date: invoice.date,
        dueDate: invoice.dueDate,
        items: invoice.items,
        discount: invoice.discount,
        tax: invoice.tax,
        status: invoice.status,
        notes: invoice.notes || "",
      });
    }
  }, [invoice]);

  const calculateSubtotal = () => {
    return formData.items.reduce((sum, item) => sum + item.total, 0);
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const afterDiscount = subtotal - formData.discount;
    const afterTax = afterDiscount + formData.tax;
    return afterTax;
  };

  const handleItemChange = (index: number, field: string, value: string | number) => {
    const newItems = [...formData.items];
    newItems[index] = { ...newItems[index], [field]: value };

    if (field === "quantity" || field === "unitPrice") {
      newItems[index].total =
        newItems[index].quantity * newItems[index].unitPrice;
    }

    setFormData({ ...formData, items: newItems });
  };

  const addItem = () => {
    setFormData({
      ...formData,
      items: [
        ...formData.items,
        {
          id: Date.now().toString(),
          description: "",
          quantity: 1,
          unitPrice: 0,
          total: 0,
        },
      ],
    });
  };

  const removeItem = (index: number) => {
    const newItems = formData.items.filter((_, i) => i !== index);
    setFormData({ ...formData, items: newItems });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (invoice) {
      // Editing existing invoice
      const invoiceData: Invoice = {
        ...invoice,
        ...formData,
        subtotal: calculateSubtotal(),
        total: calculateTotal(),
      };
      onSave(invoiceData);
    } else {
      // Creating new invoice
      const invoiceData = {
        ...formData,
        invoiceNumber: `INV-2024-${String(invoices.length + 1).padStart(3, "0")}`,
        subtotal: calculateSubtotal(),
        total: calculateTotal(),
      };
      onSave(invoiceData);
    }
  };

  const inputStyles = {
    bg: "rgba(255,255,255,0.05)",
    border: "1.5px solid",
    borderColor: "rgba(255,255,255,0.1)",
    color: "white",
    _focus: { bg: "rgba(6,182,212,0.06)", borderColor: "cyan.500", boxShadow: "0 0 0 3px rgba(6,182,212,0.15)" },
    _hover: { borderColor: "rgba(255,255,255,0.2)" },
    _placeholder: { color: "whiteAlpha.300" },
  };

  const labelStyles = {
    fontSize: "xs" as const,
    fontWeight: 600,
    color: "whiteAlpha.500",
    textTransform: "uppercase" as const,
    letterSpacing: "0.06em",
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay bg="blackAlpha.800" backdropFilter="blur(6px)" />
      <ModalContent bg="#0f1629" border="1px solid rgba(255,255,255,0.08)" boxShadow="0 24px 64px rgba(0,0,0,0.6)" borderRadius="2xl">
        <ModalHeader color="white" borderBottom="1px solid rgba(255,255,255,0.07)">
          {invoice ? "Edit Invoice" : "Create New Invoice"}
        </ModalHeader>
        <ModalCloseButton color="whiteAlpha.600" />
        <ModalBody pb={6}>
          <form onSubmit={handleSubmit}>
            <VStack spacing={6}>
              <Grid templateColumns="repeat(2, 1fr)" gap={4} w="full">
                <GridItem>
                  <FormControl isRequired>
                    <FormLabel {...labelStyles}>Patient</FormLabel>
                    <Select
                      value={formData.patientId}
                      onChange={(e) => {
                        const patient = mockPatients.find(
                          (p) => p.id === e.target.value
                        );
                        setFormData({
                          ...formData,
                          patientId: e.target.value,
                          patientName: patient?.name || "",
                        });
                      }}
                      {...inputStyles}
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
                    <FormLabel {...labelStyles}>Status</FormLabel>
                    <Select
                      value={formData.status}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          status: e.target.value as Invoice["status"],
                        })
                      }
                      {...inputStyles}
                    >
                      <option value="draft">Draft</option>
                      <option value="sent">Sent</option>
                      <option value="paid">Paid</option>
                      <option value="overdue">Overdue</option>
                    </Select>
                  </FormControl>
                </GridItem>
                <GridItem>
                  <FormControl isRequired>
                    <FormLabel {...labelStyles}>Invoice Date</FormLabel>
                    <Input
                      type="date"
                      value={formData.date}
                      onChange={(e) =>
                        setFormData({ ...formData, date: e.target.value })
                      }
                      {...inputStyles}
                    />
                  </FormControl>
                </GridItem>
                <GridItem>
                  <FormControl isRequired>
                    <FormLabel {...labelStyles}>Due Date</FormLabel>
                    <Input
                      type="date"
                      value={formData.dueDate}
                      onChange={(e) =>
                        setFormData({ ...formData, dueDate: e.target.value })
                      }
                      {...inputStyles}
                    />
                  </FormControl>
                </GridItem>
              </Grid>

              {/* Invoice Items */}
              <Box w="full">
                <HStack justify="space-between" mb={4}>
                  <Text fontWeight="medium" color="white">Invoice Items</Text>
                  <Button
                    size="sm"
                    variant="ghost"
                    color="whiteAlpha.600"
                    _hover={{ bg: "rgba(255,255,255,0.07)" }}
                    onClick={addItem}
                  >
                    <FiPlus />
                  </Button>
                </HStack>

                <VStack spacing={4} align="stretch">
                  {formData.items.map((item, index) => (
                    <Grid
                      key={item.id}
                      templateColumns="2fr 1fr 1fr 1fr auto"
                      gap={4}
                      alignItems="end"
                    >
                      <GridItem>
                        <FormControl>
                          <FormLabel {...labelStyles}>Description</FormLabel>
                          <Input
                            value={item.description}
                            onChange={(e) =>
                              handleItemChange(
                                index,
                                "description",
                                e.target.value
                              )
                            }
                            placeholder="Service or item description"
                            {...inputStyles}
                          />
                        </FormControl>
                      </GridItem>
                      <GridItem>
                        <FormControl>
                          <FormLabel {...labelStyles}>Quantity</FormLabel>
                          <Input
                            type="number"
                            value={item.quantity}
                            onChange={(e) =>
                              handleItemChange(
                                index,
                                "quantity",
                                parseInt(e.target.value) || 0
                              )
                            }
                            {...inputStyles}
                          />
                        </FormControl>
                      </GridItem>
                      <GridItem>
                        <FormControl>
                          <FormLabel {...labelStyles}>Unit Price</FormLabel>
                          <Input
                            type="number"
                            value={item.unitPrice}
                            onChange={(e) =>
                              handleItemChange(
                                index,
                                "unitPrice",
                                parseFloat(e.target.value) || 0
                              )
                            }
                            {...inputStyles}
                          />
                        </FormControl>
                      </GridItem>
                      <GridItem>
                        <FormControl>
                          <FormLabel {...labelStyles}>Total</FormLabel>
                          <Input
                            type="number"
                            value={item.total}
                            isReadOnly
                            bg="rgba(255,255,255,0.04)"
                            border="1.5px solid"
                            borderColor="rgba(255,255,255,0.08)"
                            color="whiteAlpha.700"
                            cursor="default"
                          />
                        </FormControl>
                      </GridItem>
                      <GridItem>
                        <Button
                          size="sm"
                          variant="ghost"
                          color="red.400"
                          _hover={{ bg: "rgba(239,68,68,0.1)" }}
                          onClick={() => removeItem(index)}
                          isDisabled={formData.items.length === 1}
                        >
                          <FiTrash2 />
                        </Button>
                      </GridItem>
                    </Grid>
                  ))}
                </VStack>
              </Box>

              {/* Totals */}
              <Box w="full" p={4} bg="rgba(255,255,255,0.04)" border="1px solid rgba(255,255,255,0.08)" borderRadius="md">
                <VStack spacing={2} align="stretch">
                  <HStack justify="space-between">
                    <Text color="whiteAlpha.700">Subtotal:</Text>
                    <Text color="whiteAlpha.700">₱{calculateSubtotal().toLocaleString()}</Text>
                  </HStack>
                  <HStack justify="space-between">
                    <Text color="whiteAlpha.700">Discount:</Text>
                    <Text color="whiteAlpha.700">-₱{formData.discount.toLocaleString()}</Text>
                  </HStack>
                  <HStack justify="space-between">
                    <Text color="whiteAlpha.700">Tax (12%):</Text>
                    <Text color="whiteAlpha.700">₱{formData.tax.toLocaleString()}</Text>
                  </HStack>
                  <Divider borderColor="rgba(255,255,255,0.08)" />
                  <HStack justify="space-between" fontWeight="bold">
                    <Text color="white">Total:</Text>
                    <Text color="white">₱{calculateTotal().toLocaleString()}</Text>
                  </HStack>
                </VStack>
              </Box>

              <FormControl>
                <FormLabel {...labelStyles}>Notes</FormLabel>
                <Textarea
                  value={formData.notes}
                  onChange={(e) =>
                    setFormData({ ...formData, notes: e.target.value })
                  }
                  placeholder="Additional notes or terms..."
                  bg="rgba(255,255,255,0.05)"
                  border="1.5px solid"
                  borderColor="rgba(255,255,255,0.1)"
                  color="white"
                  _focus={{ bg: "rgba(6,182,212,0.06)", borderColor: "cyan.500", boxShadow: "0 0 0 3px rgba(6,182,212,0.15)" }}
                  _hover={{ borderColor: "rgba(255,255,255,0.2)" }}
                  _placeholder={{ color: "whiteAlpha.300" }}
                />
              </FormControl>

              <HStack spacing={4} w="full" justify="flex-end">
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
                  bgGradient="linear(135deg, cyan.500, violet.500)"
                  color="white"
                  _hover={{ bgGradient: "linear(135deg, cyan.400, violet.400)", boxShadow: "0 0 20px rgba(6,182,212,0.3)" }}
                >
                  {invoice ? "Update Invoice" : "Create Invoice"}
                </Button>
              </HStack>
            </VStack>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

// Payment Modal Component
function PaymentModal({
  isOpen,
  onClose,
  invoices,
  onSave,
}: {
  isOpen: boolean;
  onClose: () => void;
  invoices: Invoice[];
  onSave: (payment: Omit<Payment, "id">) => void;
}) {
  const [formData, setFormData] = useState({
    invoiceId: "",
    amount: 0,
    method: "cash" as Payment["method"],
    date: new Date().toISOString().split("T")[0],
    reference: "",
    notes: "",
  });

  const selectedInvoice = invoices.find((inv) => inv.id === formData.invoiceId);
  const remainingBalance = selectedInvoice
    ? selectedInvoice.total - formData.amount
    : 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setFormData({
      invoiceId: "",
      amount: 0,
      method: "cash",
      date: new Date().toISOString().split("T")[0],
      reference: "",
      notes: "",
    });
  };

  const inputStyles = {
    bg: "rgba(255,255,255,0.05)",
    border: "1.5px solid",
    borderColor: "rgba(255,255,255,0.1)",
    color: "white",
    _focus: { bg: "rgba(6,182,212,0.06)", borderColor: "cyan.500", boxShadow: "0 0 0 3px rgba(6,182,212,0.15)" },
    _hover: { borderColor: "rgba(255,255,255,0.2)" },
    _placeholder: { color: "whiteAlpha.300" },
  };

  const labelStyles = {
    fontSize: "xs" as const,
    fontWeight: 600,
    color: "whiteAlpha.500",
    textTransform: "uppercase" as const,
    letterSpacing: "0.06em",
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <ModalOverlay bg="blackAlpha.800" backdropFilter="blur(6px)" />
      <ModalContent bg="#0f1629" border="1px solid rgba(255,255,255,0.08)" boxShadow="0 24px 64px rgba(0,0,0,0.6)" borderRadius="2xl">
        <ModalHeader color="white" borderBottom="1px solid rgba(255,255,255,0.07)">Record Payment</ModalHeader>
        <ModalCloseButton color="whiteAlpha.600" />
        <ModalBody pb={6}>
          <form onSubmit={handleSubmit}>
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel {...labelStyles}>Invoice</FormLabel>
                <Select
                  value={formData.invoiceId}
                  onChange={(e) => {
                    const invoice = invoices.find(
                      (inv) => inv.id === e.target.value
                    );
                    setFormData({
                      ...formData,
                      invoiceId: e.target.value,
                      amount: invoice?.total || 0,
                    });
                  }}
                  {...inputStyles}
                >
                  <option value="">Select Invoice</option>
                  {invoices
                    .filter(
                      (inv) =>
                        inv.status !== "paid" && inv.status !== "cancelled"
                    )
                    .map((invoice) => (
                      <option key={invoice.id} value={invoice.id}>
                        {invoice.invoiceNumber} - {invoice.patientName} (₱
                        {invoice.total.toLocaleString()})
                      </option>
                    ))}
                </Select>
              </FormControl>

              {selectedInvoice && (
                <Box w="full" p={3} bg="rgba(6,182,212,0.08)" border="1px solid rgba(6,182,212,0.2)" borderRadius="md">
                  <Text fontSize="sm" color="cyan.300">
                    Invoice Total: ₱{selectedInvoice.total.toLocaleString()}
                  </Text>
                  <Text fontSize="sm" color="cyan.300">
                    Remaining Balance: ₱{remainingBalance.toLocaleString()}
                  </Text>
                </Box>
              )}

              <Grid templateColumns="repeat(2, 1fr)" gap={4} w="full">
                <GridItem>
                  <FormControl isRequired>
                    <FormLabel {...labelStyles}>Amount</FormLabel>
                    <Input
                      type="number"
                      value={formData.amount}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          amount: parseFloat(e.target.value) || 0,
                        })
                      }
                      {...inputStyles}
                    />
                  </FormControl>
                </GridItem>
                <GridItem>
                  <FormControl isRequired>
                    <FormLabel {...labelStyles}>Payment Method</FormLabel>
                    <Select
                      value={formData.method}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          method: e.target.value as Payment["method"],
                        })
                      }
                      {...inputStyles}
                    >
                      <option value="cash">Cash</option>
                      <option value="card">Credit/Debit Card</option>
                      <option value="gcash">GCash</option>
                      <option value="bank_transfer">Bank Transfer</option>
                      <option value="check">Check</option>
                    </Select>
                  </FormControl>
                </GridItem>
                <GridItem>
                  <FormControl isRequired>
                    <FormLabel {...labelStyles}>Payment Date</FormLabel>
                    <Input
                      type="date"
                      value={formData.date}
                      onChange={(e) =>
                        setFormData({ ...formData, date: e.target.value })
                      }
                      {...inputStyles}
                    />
                  </FormControl>
                </GridItem>
                <GridItem>
                  <FormControl>
                    <FormLabel {...labelStyles}>Reference Number</FormLabel>
                    <Input
                      value={formData.reference}
                      onChange={(e) =>
                        setFormData({ ...formData, reference: e.target.value })
                      }
                      placeholder="Transaction reference"
                      {...inputStyles}
                    />
                  </FormControl>
                </GridItem>
              </Grid>

              <FormControl>
                <FormLabel {...labelStyles}>Notes</FormLabel>
                <Textarea
                  value={formData.notes}
                  onChange={(e) =>
                    setFormData({ ...formData, notes: e.target.value })
                  }
                  placeholder="Payment notes or comments..."
                  bg="rgba(255,255,255,0.05)"
                  border="1.5px solid"
                  borderColor="rgba(255,255,255,0.1)"
                  color="white"
                  _focus={{ bg: "rgba(6,182,212,0.06)", borderColor: "cyan.500", boxShadow: "0 0 0 3px rgba(6,182,212,0.15)" }}
                  _hover={{ borderColor: "rgba(255,255,255,0.2)" }}
                  _placeholder={{ color: "whiteAlpha.300" }}
                />
              </FormControl>

              <HStack spacing={4} w="full" justify="flex-end">
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
                  bgGradient="linear(135deg, cyan.500, violet.500)"
                  color="white"
                  _hover={{ bgGradient: "linear(135deg, cyan.400, violet.400)", boxShadow: "0 0 20px rgba(6,182,212,0.3)" }}
                >
                  Record Payment
                </Button>
              </HStack>
            </VStack>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

// Mock patients data (should be imported from a shared location)
const mockPatients = [
  { id: "1", name: "Maria Santos" },
  { id: "2", name: "Carlos Mendoza" },
  { id: "3", name: "Ana Rodriguez" },
  { id: "4", name: "Luis Garcia" },
];
