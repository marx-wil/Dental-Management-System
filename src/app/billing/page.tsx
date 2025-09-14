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
  useColorModeValue,
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
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
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
  FiPrinter,
  FiDownload,
  FiCalendar,
  FiUser,
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

  const cardBg = useColorModeValue("white", "gray.800");

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
            <HStack justify="space-between">
              <Box>
                <Heading size="lg">Billing & Payments</Heading>
                <Text color="gray.600">
                  Manage invoices and payment processing
                </Text>
              </Box>
              <HStack spacing={4}>
                <Button
                  leftIcon={<FiPlus />}
                  colorScheme="dental"
                  onClick={onOpen}
                >
                  Create Invoice
                </Button>
                <Button
                  leftIcon={<FiDollarSign />}
                  variant="outline"
                  onClick={onPaymentOpen}
                >
                  Record Payment
                </Button>
              </HStack>
            </HStack>

            {/* Stats Cards */}
            <Grid
              templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }}
              gap={6}
            >
              <GridItem>
                <Card bg={cardBg}>
                  <CardBody>
                    <HStack justify="space-between">
                      <Box>
                        <Text fontSize="sm" color="gray.600">
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
                <Card bg={cardBg}>
                  <CardBody>
                    <HStack justify="space-between">
                      <Box>
                        <Text fontSize="sm" color="gray.600">
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
                <Card bg={cardBg}>
                  <CardBody>
                    <HStack justify="space-between">
                      <Box>
                        <Text fontSize="sm" color="gray.600">
                          Total Invoices
                        </Text>
                        <Text fontSize="2xl" fontWeight="bold">
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
            <Card bg={cardBg}>
              <CardBody>
                <HStack spacing={4}>
                  <InputGroup flex={1}>
                    <InputLeftElement>
                      <FiSearch />
                    </InputLeftElement>
                    <Input
                      placeholder="Search invoices by patient name or invoice number..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </InputGroup>
                  <Select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    w="150px"
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
            <Card bg={cardBg}>
              <CardHeader>
                <Heading size="md">
                  Invoices ({filteredInvoices.length})
                </Heading>
              </CardHeader>
              <CardBody>
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th>Invoice #</Th>
                      <Th>Patient</Th>
                      <Th>Date</Th>
                      <Th>Due Date</Th>
                      <Th>Amount</Th>
                      <Th>Status</Th>
                      <Th>Actions</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {filteredInvoices.map((invoice) => (
                      <Tr key={invoice.id}>
                        <Td>
                          <Text fontWeight="medium">
                            {invoice.invoiceNumber}
                          </Text>
                        </Td>
                        <Td>
                          <HStack spacing={3}>
                            <Avatar size="sm" name={invoice.patientName} />
                            <Text>{invoice.patientName}</Text>
                          </HStack>
                        </Td>
                        <Td>
                          <Text fontSize="sm">
                            {new Date(invoice.date).toLocaleDateString()}
                          </Text>
                        </Td>
                        <Td>
                          <Text fontSize="sm">
                            {new Date(invoice.dueDate).toLocaleDateString()}
                          </Text>
                        </Td>
                        <Td>
                          <Text fontWeight="medium">
                            ₱{invoice.total.toLocaleString()}
                          </Text>
                        </Td>
                        <Td>
                          <Badge colorScheme={getStatusColor(invoice.status)}>
                            {invoice.status}
                          </Badge>
                        </Td>
                        <Td>
                          <HStack spacing={2}>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                setSelectedInvoice(invoice);
                                // Open view modal
                              }}
                            >
                              <FiEye />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                setSelectedInvoice(invoice);
                                onOpen();
                              }}
                            >
                              <FiEdit />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              colorScheme="red"
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
            <Card bg={cardBg}>
              <CardHeader>
                <Heading size="md">Recent Payments</Heading>
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
                        bg="gray.50"
                        borderRadius="md"
                      >
                        <HStack spacing={4}>
                          <Icon
                            as={getPaymentMethodIcon(payment.method)}
                            color="dental.500"
                          />
                          <Box>
                            <Text fontWeight="medium">
                              {invoice?.patientName} - {invoice?.invoiceNumber}
                            </Text>
                            <Text fontSize="sm" color="gray.600">
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

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {invoice ? "Edit Invoice" : "Create New Invoice"}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <form onSubmit={handleSubmit}>
            <VStack spacing={6}>
              <Grid templateColumns="repeat(2, 1fr)" gap={4} w="full">
                <GridItem>
                  <FormControl isRequired>
                    <FormLabel>Patient</FormLabel>
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
                    <FormLabel>Status</FormLabel>
                    <Select
                      value={formData.status}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          status: e.target.value as Invoice["status"],
                        })
                      }
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
                    <FormLabel>Invoice Date</FormLabel>
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
                    <FormLabel>Due Date</FormLabel>
                    <Input
                      type="date"
                      value={formData.dueDate}
                      onChange={(e) =>
                        setFormData({ ...formData, dueDate: e.target.value })
                      }
                    />
                  </FormControl>
                </GridItem>
              </Grid>

              {/* Invoice Items */}
              <Box w="full">
                <HStack justify="space-between" mb={4}>
                  <Text fontWeight="medium">Invoice Items</Text>
                  <Button size="sm" onClick={addItem}>
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
                          <FormLabel fontSize="sm">Description</FormLabel>
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
                          />
                        </FormControl>
                      </GridItem>
                      <GridItem>
                        <FormControl>
                          <FormLabel fontSize="sm">Quantity</FormLabel>
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
                          />
                        </FormControl>
                      </GridItem>
                      <GridItem>
                        <FormControl>
                          <FormLabel fontSize="sm">Unit Price</FormLabel>
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
                          />
                        </FormControl>
                      </GridItem>
                      <GridItem>
                        <FormControl>
                          <FormLabel fontSize="sm">Total</FormLabel>
                          <Input
                            type="number"
                            value={item.total}
                            isReadOnly
                            bg="gray.50"
                          />
                        </FormControl>
                      </GridItem>
                      <GridItem>
                        <Button
                          size="sm"
                          colorScheme="red"
                          variant="outline"
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
              <Box w="full" p={4} bg="gray.50" borderRadius="md">
                <VStack spacing={2} align="stretch">
                  <HStack justify="space-between">
                    <Text>Subtotal:</Text>
                    <Text>₱{calculateSubtotal().toLocaleString()}</Text>
                  </HStack>
                  <HStack justify="space-between">
                    <Text>Discount:</Text>
                    <Text>-₱{formData.discount.toLocaleString()}</Text>
                  </HStack>
                  <HStack justify="space-between">
                    <Text>Tax (12%):</Text>
                    <Text>₱{formData.tax.toLocaleString()}</Text>
                  </HStack>
                  <Divider />
                  <HStack justify="space-between" fontWeight="bold">
                    <Text>Total:</Text>
                    <Text>₱{calculateTotal().toLocaleString()}</Text>
                  </HStack>
                </VStack>
              </Box>

              <FormControl>
                <FormLabel>Notes</FormLabel>
                <Textarea
                  value={formData.notes}
                  onChange={(e) =>
                    setFormData({ ...formData, notes: e.target.value })
                  }
                  placeholder="Additional notes or terms..."
                />
              </FormControl>

              <HStack spacing={4} w="full" justify="flex-end">
                <Button variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button type="submit" colorScheme="dental">
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

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Record Payment</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <form onSubmit={handleSubmit}>
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Invoice</FormLabel>
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
                <Box w="full" p={3} bg="blue.50" borderRadius="md">
                  <Text fontSize="sm" color="blue.700">
                    Invoice Total: ₱{selectedInvoice.total.toLocaleString()}
                  </Text>
                  <Text fontSize="sm" color="blue.700">
                    Remaining Balance: ₱{remainingBalance.toLocaleString()}
                  </Text>
                </Box>
              )}

              <Grid templateColumns="repeat(2, 1fr)" gap={4} w="full">
                <GridItem>
                  <FormControl isRequired>
                    <FormLabel>Amount</FormLabel>
                    <Input
                      type="number"
                      value={formData.amount}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          amount: parseFloat(e.target.value) || 0,
                        })
                      }
                    />
                  </FormControl>
                </GridItem>
                <GridItem>
                  <FormControl isRequired>
                    <FormLabel>Payment Method</FormLabel>
                    <Select
                      value={formData.method}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          method: e.target.value as Payment["method"],
                        })
                      }
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
                    <FormLabel>Payment Date</FormLabel>
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
                  <FormControl>
                    <FormLabel>Reference Number</FormLabel>
                    <Input
                      value={formData.reference}
                      onChange={(e) =>
                        setFormData({ ...formData, reference: e.target.value })
                      }
                      placeholder="Transaction reference"
                    />
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
                  placeholder="Payment notes or comments..."
                />
              </FormControl>

              <HStack spacing={4} w="full" justify="flex-end">
                <Button variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button type="submit" colorScheme="dental">
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
