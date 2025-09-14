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
  Alert,
  AlertIcon,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import {
  FiSearch,
  FiPlus,
  FiEdit,
  FiTrash2,
  FiEye,
  FiMoreVertical,
  FiUser,
  FiMail,
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

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const cardBg = useColorModeValue("white", "gray.800");

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
            <HStack justify="space-between">
              <Box>
                <Heading size="lg">User Management</Heading>
                <Text color="gray.600">
                  Manage clinic staff, dentists, and administrators
                </Text>
              </Box>
              <Button
                leftIcon={<FiPlus />}
                colorScheme="dental"
                onClick={() => {
                  setSelectedUser(null);
                  onOpen();
                }}
              >
                Add User
              </Button>
            </HStack>

            {/* Stats Cards */}
            <Grid
              templateColumns={{ base: "1fr", md: "repeat(4, 1fr)" }}
              gap={6}
            >
              <GridItem>
                <Card bg={cardBg}>
                  <CardBody>
                    <HStack justify="space-between">
                      <Box>
                        <Text fontSize="sm" color="gray.600">
                          Total Users
                        </Text>
                        <Text fontSize="2xl" fontWeight="bold">
                          {stats.total}
                        </Text>
                      </Box>
                      <Icon as={FiUsers} boxSize={8} color="dental.500" />
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
                          Administrators
                        </Text>
                        <Text fontSize="2xl" fontWeight="bold" color="red.500">
                          {stats.admin}
                        </Text>
                      </Box>
                      <Icon as={FiShield} boxSize={8} color="red.500" />
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
                          Dentists
                        </Text>
                        <Text fontSize="2xl" fontWeight="bold" color="blue.500">
                          {stats.dentist}
                        </Text>
                      </Box>
                      <Icon as={FiUser} boxSize={8} color="blue.500" />
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
                          Staff
                        </Text>
                        <Text fontSize="2xl" fontWeight="bold" color="green.500">
                          {stats.staff}
                        </Text>
                      </Box>
                      <Icon as={FiUsers} boxSize={8} color="green.500" />
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
                      placeholder="Search users by name or email..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </InputGroup>
                  <Select
                    value={roleFilter}
                    onChange={(e) => setRoleFilter(e.target.value)}
                    w="150px"
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
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </Select>
                </HStack>
              </CardBody>
            </Card>

            {/* Users Table */}
            <Card bg={cardBg}>
              <CardHeader>
                <Heading size="md">
                  Users ({filteredUsers.length})
                </Heading>
              </CardHeader>
              <CardBody>
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th>User</Th>
                      <Th>Role</Th>
                      <Th>Status</Th>
                      <Th>Created</Th>
                      <Th>Last Login</Th>
                      <Th>Actions</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {filteredUsers.map((user) => (
                      <Tr key={user.id}>
                        <Td>
                          <HStack spacing={3}>
                            <Avatar
                              size="sm"
                              name={user.name}
                              src={user.avatar}
                            />
                            <Box>
                              <Text fontWeight="medium">{user.name}</Text>
                              <Text fontSize="sm" color="gray.600">
                                {user.email}
                              </Text>
                            </Box>
                          </HStack>
                        </Td>
                        <Td>
                          <HStack spacing={2}>
                            <Icon
                              as={getRoleIcon(user.role)}
                              color={`${getRoleColor(user.role)}.500`}
                            />
                            <Badge colorScheme={getRoleColor(user.role)}>
                              {user.role}
                            </Badge>
                          </HStack>
                        </Td>
                        <Td>
                          <Badge
                            colorScheme={user.isActive ? "green" : "red"}
                            variant="subtle"
                          >
                            {user.isActive ? "Active" : "Inactive"}
                          </Badge>
                        </Td>
                        <Td>
                          <Text fontSize="sm">
                            {new Date(user.createdAt).toLocaleDateString()}
                          </Text>
                        </Td>
                        <Td>
                          <Text fontSize="sm">
                            {user.lastLogin
                              ? new Date(user.lastLogin).toLocaleDateString()
                              : "Never"}
                          </Text>
                        </Td>
                        <Td>
                          <HStack spacing={2}>
                            <Button
                              size="sm"
                              variant="outline"
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
                              />
                              <MenuList>
                                <MenuItem
                                  icon={<FiEye />}
                                  onClick={() => {
                                    // View user details
                                  }}
                                >
                                  View Details
                                </MenuItem>
                                <MenuItem
                                  icon={<FiTrash2 />}
                                  color="red.500"
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
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {user ? "Edit User" : "Add New User"}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <form onSubmit={handleSubmit}>
            <VStack spacing={4}>
              {error && (
                <Alert status="error" borderRadius="md">
                  <AlertIcon />
                  {error}
                </Alert>
              )}

              <FormControl isRequired>
                <FormLabel>Full Name</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter full name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Email Address</FormLabel>
                <Input
                  type="email"
                  placeholder="Enter email address"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Role</FormLabel>
                <Select
                  value={formData.role}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      role: e.target.value as UserRole,
                    })
                  }
                >
                  <option value="admin">Administrator</option>
                  <option value="dentist">Dentist</option>
                  <option value="staff">Staff</option>
                </Select>
              </FormControl>

              {!user && (
                <>
                  <FormControl isRequired>
                    <FormLabel>Password</FormLabel>
                    <Input
                      type="password"
                      placeholder="Enter password"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>Confirm Password</FormLabel>
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
                    />
                  </FormControl>
                </>
              )}

              <FormControl>
                <FormLabel>Status</FormLabel>
                <Select
                  value={formData.isActive ? "active" : "inactive"}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      isActive: e.target.value === "active",
                    })
                  }
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </Select>
              </FormControl>

              <HStack spacing={4} w="full" justify="flex-end">
                <Button variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  colorScheme="dental"
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
