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
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Flex,
} from "@chakra-ui/react";
import {
  FiSearch,
  FiPlus,
  FiEdit,
  FiTrash2,
  FiEye,
  FiMoreVertical,
  FiUser,
  FiShield,
  FiUsers,
} from "react-icons/fi";
import Layout from "../components/Layout";
import ProtectedRoute from "../components/ProtectedRoute";
import { UserRole } from "../contexts/AuthContext";

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  clinicId?: string;
  avatar?: string;
  isActive: boolean;
  createdAt: string;
  lastLogin?: string;
}

const mockUsers: User[] = [
  {
    id: "1",
    name: "Dr. Maria Santos",
    email: "admin@clinic.com",
    role: "admin",
    clinicId: "clinic-1",
    avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face",
    isActive: true,
    createdAt: "2024-01-01",
    lastLogin: "2024-01-20",
  },
  {
    id: "2",
    name: "Dr. Juan Dela Cruz",
    email: "dentist@clinic.com",
    role: "dentist",
    clinicId: "clinic-1",
    avatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face",
    isActive: true,
    createdAt: "2024-01-02",
    lastLogin: "2024-01-19",
  },
  {
    id: "3",
    name: "Ana Rodriguez",
    email: "staff@clinic.com",
    role: "staff",
    clinicId: "clinic-1",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    isActive: true,
    createdAt: "2024-01-03",
    lastLogin: "2024-01-18",
  },
  {
    id: "4",
    name: "Luis Garcia",
    email: "luis.garcia@clinic.com",
    role: "staff",
    clinicId: "clinic-1",
    isActive: false,
    createdAt: "2024-01-10",
    lastLogin: "2024-01-15",
  },
];

const cardStyle = {
  bg: "rgba(15,22,41,0.7)",
  border: "1px solid",
  borderColor: "rgba(255,255,255,0.07)",
  backdropFilter: "blur(12px)",
  borderRadius: "2xl",
  _hover: { borderColor: "rgba(255,255,255,0.12)" },
} as const;

const inputStyle = {
  bg: "rgba(255,255,255,0.05)",
  border: "1.5px solid",
  borderColor: "rgba(255,255,255,0.1)",
  color: "white",
  _focus: { bg: "rgba(6,182,212,0.06)", borderColor: "cyan.500", boxShadow: "0 0 0 3px rgba(6,182,212,0.15)" },
  _hover: { borderColor: "rgba(255,255,255,0.2)" },
  _placeholder: { color: "whiteAlpha.300" },
} as const;

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && user.isActive) ||
      (statusFilter === "inactive" && !user.isActive);
    return matchesSearch && matchesRole && matchesStatus;
  });

  const getRoleColor = (role: UserRole) => {
    switch (role) {
      case "admin":
        return "red";
      case "dentist":
        return "blue";
      case "staff":
        return "green";
      case "patient":
        return "gray";
      default:
        return "gray";
    }
  };

  const getRoleIcon = (role: UserRole) => {
    switch (role) {
      case "admin":
        return FiShield;
      case "dentist":
        return FiUser;
      case "staff":
        return FiUsers;
      case "patient":
        return FiUser;
      default:
        return FiUser;
    }
  };

  const handleAddUser = (newUser: User | Omit<User, "id">) => {
    if (!('id' in newUser)) {
      const user: User = {
        ...newUser,
        id: Date.now().toString(),
      };
      setUsers([...users, user]);
    }
    onClose();
  };

  const handleUpdateUser = (updatedUser: User | Omit<User, "id">) => {
    if ('id' in updatedUser) {
      setUsers(users.map((user) => (user.id === updatedUser.id ? updatedUser : user)));
    }
    onClose();
  };

  const handleDeleteUser = (userId: string) => {
    setUsers(users.filter((user) => user.id !== userId));
  };

  const handleToggleStatus = (userId: string) => {
    setUsers(
      users.map((user) =>
        user.id === userId ? { ...user, isActive: !user.isActive } : user
      )
    );
  };

  const getRoleStats = () => {
    const stats = {
      admin: users.filter((u) => u.role === "admin").length,
      dentist: users.filter((u) => u.role === "dentist").length,
      staff: users.filter((u) => u.role === "staff").length,
      total: users.length,
    };
    return stats;
  };

  const stats = getRoleStats();

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <Layout>
        <Container maxW="7xl" py={8}>
          <VStack spacing={8} align="stretch">
            {/* Header */}
            <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={4}>
              <Box>
                <Heading size="lg" color="white">User Management</Heading>
                <Text color="whiteAlpha.700">
                  Manage clinic staff, dentists, and administrators
                </Text>
              </Box>
              <Flex justifyContent={"flex-end"}>
                <Button
                  w={{ base: "full", md: "fit-content" }}
                  leftIcon={<FiPlus />}
                  bgGradient="linear(135deg, cyan.500, violet.500)"
                  color="white"
                  _hover={{ bgGradient: "linear(135deg, cyan.400, violet.400)", boxShadow: "0 0 20px rgba(6,182,212,0.3)" }}
                  onClick={() => {
                    setSelectedUser(null);
                    onOpen();
                  }}
                  size={{ base: "sm", md: "md" }}
                  minW={{ base: "full", md: "fit-content" }}
                >
                  Add User
                </Button>
              </Flex>
            </Grid>

            {/* Stats Cards */}
            <Grid
              templateColumns={{ base: "1fr", md: "repeat(4, 1fr)" }}
              gap={6}
            >
              <GridItem>
                <Card {...cardStyle}>
                  <CardBody>
                    <HStack justify="space-between">
                      <Box>
                        <Text fontSize="sm" color="whiteAlpha.700">
                          Total Users
                        </Text>
                        <Text fontSize="2xl" fontWeight="bold" color="white">
                          {stats.total}
                        </Text>
                      </Box>
                      <Icon as={FiUsers} boxSize={8} color="cyan.400" />
                    </HStack>
                  </CardBody>
                </Card>
              </GridItem>
              <GridItem>
                <Card {...cardStyle}>
                  <CardBody>
                    <HStack justify="space-between">
                      <Box>
                        <Text fontSize="sm" color="whiteAlpha.700">
                          Administrators
                        </Text>
                        <Text fontSize="2xl" fontWeight="bold" color="red.400">
                          {stats.admin}
                        </Text>
                      </Box>
                      <Icon as={FiShield} boxSize={8} color="red.400" />
                    </HStack>
                  </CardBody>
                </Card>
              </GridItem>
              <GridItem>
                <Card {...cardStyle}>
                  <CardBody>
                    <HStack justify="space-between">
                      <Box>
                        <Text fontSize="sm" color="whiteAlpha.700">
                          Dentists
                        </Text>
                        <Text fontSize="2xl" fontWeight="bold" color="blue.400">
                          {stats.dentist}
                        </Text>
                      </Box>
                      <Icon as={FiUser} boxSize={8} color="blue.400" />
                    </HStack>
                  </CardBody>
                </Card>
              </GridItem>
              <GridItem>
                <Card {...cardStyle}>
                  <CardBody>
                    <HStack justify="space-between">
                      <Box>
                        <Text fontSize="sm" color="whiteAlpha.700">
                          Staff
                        </Text>
                        <Text fontSize="2xl" fontWeight="bold" color="green.400">
                          {stats.staff}
                        </Text>
                      </Box>
                      <Icon as={FiUsers} boxSize={8} color="green.400" />
                    </HStack>
                  </CardBody>
                </Card>
              </GridItem>
            </Grid>

            {/* Search and Filters */}
            <Card {...cardStyle}>
              <CardBody>
                <HStack spacing={4}>
                  <InputGroup flex={1}>
                    <InputLeftElement color="whiteAlpha.400">
                      <FiSearch />
                    </InputLeftElement>
                    <Input
                      placeholder="Search users by name or email..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      {...inputStyle}
                    />
                  </InputGroup>
                  <Select
                    value={roleFilter}
                    onChange={(e) => setRoleFilter(e.target.value)}
                    w="150px"
                    {...inputStyle}
                  >
                    <option value="all">All Roles</option>
                    <option value="admin">Admin</option>
                    <option value="dentist">Dentist</option>
                    <option value="staff">Staff</option>
                  </Select>
                  <Select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    w="150px"
                    {...inputStyle}
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </Select>
                </HStack>
              </CardBody>
            </Card>

            {/* Users Table */}
            <Card {...cardStyle}>
              <CardHeader>
                <Heading size="md" color="white">
                  Users ({filteredUsers.length})
                </Heading>
              </CardHeader>
              <CardBody overflow={"auto"}>
                <Table variant="unstyled">
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
                        User
                      </Th>
                      <Th
                        bg="rgba(255,255,255,0.03)"
                        color="whiteAlpha.500"
                        borderColor="rgba(255,255,255,0.06)"
                        fontSize="xs"
                        fontWeight="700"
                        letterSpacing="0.08em"
                      >
                        Role
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
                        Created
                      </Th>
                      <Th
                        bg="rgba(255,255,255,0.03)"
                        color="whiteAlpha.500"
                        borderColor="rgba(255,255,255,0.06)"
                        fontSize="xs"
                        fontWeight="700"
                        letterSpacing="0.08em"
                      >
                        Last Login
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
                    {filteredUsers.map((user) => (
                      <Tr key={user.id} _hover={{ bg: "rgba(255,255,255,0.03)" }}>
                        <Td borderColor="rgba(255,255,255,0.05)">
                          <HStack spacing={3}>
                            <Avatar
                              size="sm"
                              name={user.name}
                              src={user.avatar}
                            />
                            <Box>
                              <Text fontWeight="medium" color="whiteAlpha.800">{user.name}</Text>
                              <Text fontSize="sm" color="whiteAlpha.500">
                                {user.email}
                              </Text>
                            </Box>
                          </HStack>
                        </Td>
                        <Td borderColor="rgba(255,255,255,0.05)" color="whiteAlpha.800">
                          <HStack spacing={2}>
                            <Icon
                              as={getRoleIcon(user.role)}
                              color={`${getRoleColor(user.role)}.400`}
                            />
                            <Badge colorScheme={getRoleColor(user.role)}>
                              {user.role}
                            </Badge>
                          </HStack>
                        </Td>
                        <Td borderColor="rgba(255,255,255,0.05)" color="whiteAlpha.800">
                          <Badge
                            colorScheme={user.isActive ? "green" : "red"}
                            variant="subtle"
                          >
                            {user.isActive ? "Active" : "Inactive"}
                          </Badge>
                        </Td>
                        <Td borderColor="rgba(255,255,255,0.05)">
                          <Text fontSize="sm" color="whiteAlpha.800">
                            {new Date(user.createdAt).toLocaleDateString()}
                          </Text>
                        </Td>
                        <Td borderColor="rgba(255,255,255,0.05)">
                          <Text fontSize="sm" color="whiteAlpha.800">
                            {user.lastLogin
                              ? new Date(user.lastLogin).toLocaleDateString()
                              : "Never"}
                          </Text>
                        </Td>
                        <Td borderColor="rgba(255,255,255,0.05)">
                          <HStack spacing={2}>
                            <Button
                              size="sm"
                              variant="outline"
                              colorScheme="cyan"
                              onClick={() => {
                                setSelectedUser(user);
                                onOpen();
                              }}
                            >
                              <FiEdit />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              colorScheme={user.isActive ? "red" : "green"}
                              onClick={() => handleToggleStatus(user.id)}
                            >
                              {user.isActive ? "Deactivate" : "Activate"}
                            </Button>
                            <Menu>
                              <MenuButton
                                as={IconButton}
                                icon={<FiMoreVertical />}
                                size="sm"
                                variant="outline"
                                colorScheme="whiteAlpha"
                                color="whiteAlpha.600"
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
                                  onClick={() => {
                                    // View user details
                                  }}
                                >
                                  View Details
                                </MenuItem>
                                <MenuItem
                                  icon={<FiTrash2 />}
                                  color="red.400"
                                  bg="transparent"
                                  _hover={{ bg: "rgba(255,255,255,0.07)", color: "red.300" }}
                                  onClick={() => handleDeleteUser(user.id)}
                                >
                                  Delete User
                                </MenuItem>
                              </MenuList>
                            </Menu>
                          </HStack>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </CardBody>
            </Card>
          </VStack>

          {/* Add/Edit User Modal */}
          <UserModal
            isOpen={isOpen}
            onClose={onClose}
            user={selectedUser}
            onSave={selectedUser ? handleUpdateUser : handleAddUser}
          />
        </Container>
      </Layout>
    </ProtectedRoute>
  );
}

// User Modal Component
function UserModal({
  isOpen,
  onClose,
  user,
  onSave,
}: {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
  onSave: (user: User | Omit<User, "id">) => void;
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "staff" as UserRole,
    password: "",
    confirmPassword: "",
    isActive: true,
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const inputStyle = {
    bg: "rgba(255,255,255,0.05)",
    border: "1.5px solid",
    borderColor: "rgba(255,255,255,0.1)",
    color: "white",
    _focus: { bg: "rgba(6,182,212,0.06)", borderColor: "cyan.500", boxShadow: "0 0 0 3px rgba(6,182,212,0.15)" },
    _hover: { borderColor: "rgba(255,255,255,0.2)" },
    _placeholder: { color: "whiteAlpha.300" },
  };

  const labelStyle = {
    fontSize: "xs",
    fontWeight: "600",
    color: "whiteAlpha.500",
    textTransform: "uppercase" as const,
    letterSpacing: "0.06em",
  };

  React.useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        role: user.role,
        password: "",
        confirmPassword: "",
        isActive: user.isActive,
      });
    } else {
      setFormData({
        name: "",
        email: "",
        role: "staff",
        password: "",
        confirmPassword: "",
        isActive: true,
      });
    }
    setError("");
  }, [user, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!user && formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!user && formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    setIsLoading(true);

    try {
      if (user) {
        // Updating existing user
        const updatedUser: User = {
          ...user,
          ...formData,
        };
        onSave(updatedUser);
      } else {
        // Creating new user
        const newUser = {
          ...formData,
          clinicId: "clinic-1",
          createdAt: new Date().toISOString().split("T")[0],
        };
        onSave(newUser);
      }
    } catch (err) {
      setError("An error occurred. Please try again." + err);
    } finally {
      setIsLoading(false);
    }
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
          {user ? "Edit User" : "Add New User"}
        </ModalHeader>
        <ModalCloseButton color="whiteAlpha.600" />
        <ModalBody pb={6}>
          <form onSubmit={handleSubmit}>
            <VStack spacing={4}>
              {error && (
                <Box
                  bg="rgba(244,63,94,0.1)"
                  border="1px solid rgba(244,63,94,0.2)"
                  color="rose.300"
                  borderRadius="md"
                  p={3}
                  fontSize="sm"
                  w="full"
                >
                  {error}
                </Box>
              )}

              <FormControl isRequired>
                <FormLabel {...labelStyle}>Full Name</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter full name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  {...inputStyle}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel {...labelStyle}>Email Address</FormLabel>
                <Input
                  type="email"
                  placeholder="Enter email address"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  {...inputStyle}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel {...labelStyle}>Role</FormLabel>
                <Select
                  value={formData.role}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      role: e.target.value as UserRole,
                    })
                  }
                  {...inputStyle}
                >
                  <option value="admin">Administrator</option>
                  <option value="dentist">Dentist</option>
                  <option value="staff">Staff</option>
                </Select>
              </FormControl>

              {!user && (
                <>
                  <FormControl isRequired>
                    <FormLabel {...labelStyle}>Password</FormLabel>
                    <Input
                      type="password"
                      placeholder="Enter password"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                      {...inputStyle}
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel {...labelStyle}>Confirm Password</FormLabel>
                    <Input
                      type="password"
                      placeholder="Confirm password"
                      value={formData.confirmPassword}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          confirmPassword: e.target.value,
                        })
                      }
                      {...inputStyle}
                    />
                  </FormControl>
                </>
              )}

              <FormControl>
                <FormLabel {...labelStyle}>Status</FormLabel>
                <Select
                  value={formData.isActive ? "active" : "inactive"}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      isActive: e.target.value === "active",
                    })
                  }
                  {...inputStyle}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </Select>
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
                  isLoading={isLoading}
                  loadingText={user ? "Updating..." : "Creating..."}
                >
                  {user ? "Update User" : "Create User"}
                </Button>
              </HStack>
            </VStack>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
