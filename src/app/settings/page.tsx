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
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Switch,
  Textarea,
  Grid,
  GridItem,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Avatar,
  Icon,
  useColorModeValue,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useToast,
} from '@chakra-ui/react';
import {
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiSave,
  FiBell,
  FiShield,
  FiGlobe,
  FiDatabase,
  FiCreditCard,
} from 'react-icons/fi';
import Layout from '../components/Layout';
import ProtectedRoute from '../components/ProtectedRoute';
import { useAuth } from '../contexts/AuthContext';

export default function SettingsPage() {
  const { user } = useAuth();
  const toast = useToast();
  const cardBg = useColorModeValue('white', 'gray.800');

  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '+63 912 345 6789',
    address: '123 Rizal Street, Manila, Philippines',
    specialization: 'General Dentistry',
    licenseNumber: 'DENT-2024-001',
    bio: 'Experienced dentist with over 10 years of practice in general dentistry.',
  });

  const [clinicData, setClinicData] = useState({
    name: 'Santos Dental Clinic',
    address: '123 Rizal Street, Manila, Philippines',
    phone: '+63 2 1234 5678',
    email: 'info@santosdental.com',
    website: 'www.santosdental.com',
    operatingHours: {
      monday: '8:00 AM - 6:00 PM',
      tuesday: '8:00 AM - 6:00 PM',
      wednesday: '8:00 AM - 6:00 PM',
      thursday: '8:00 AM - 6:00 PM',
      friday: '8:00 AM - 6:00 PM',
      saturday: '8:00 AM - 2:00 PM',
      sunday: 'Closed',
    },
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: true,
    appointmentReminders: true,
    paymentReminders: true,
    lowStockAlerts: true,
    systemUpdates: false,
    marketingEmails: false,
  });

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    sessionTimeout: 30,
    passwordExpiry: 90,
    loginNotifications: true,
  });

  const handleSaveProfile = () => {
    toast({
      title: 'Profile Updated',
      description: 'Your profile information has been saved successfully.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  const handleSaveClinic = () => {
    toast({
      title: 'Clinic Settings Updated',
      description: 'Your clinic information has been saved successfully.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  const handleSaveNotifications = () => {
    toast({
      title: 'Notification Settings Updated',
      description: 'Your notification preferences have been saved successfully.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  const handleSaveSecurity = () => {
    toast({
      title: 'Security Settings Updated',
      description: 'Your security settings have been saved successfully.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <ProtectedRoute>
      <Layout>
        <Container maxW="4xl" py={8}>
          <VStack spacing={8} align="stretch">
            {/* Header */}
            <Box>
              <Heading size="lg">Settings</Heading>
              <Text color="gray.600">Manage your account and clinic settings</Text>
            </Box>

            <Tabs variant="enclosed">
              <TabList>
                <Tab>Profile</Tab>
                <Tab>Clinic</Tab>
                <Tab>Notifications</Tab>
                <Tab>Security</Tab>
              </TabList>

              <TabPanels>
                {/* Profile Tab */}
                <TabPanel px={0}>
                  <Card bg={cardBg}>
                    <CardHeader>
                      <Heading size="md">Profile Information</Heading>
                    </CardHeader>
                    <CardBody>
                      <VStack spacing={6}>
                        <HStack spacing={6} w="full">
                          <Avatar size="xl" src={user?.avatar} name={user?.name} />
                          <VStack align="start" spacing={2}>
                            <Text fontWeight="medium" fontSize="lg">{user?.name}</Text>
                            <Text color="gray.600">{user?.role}</Text>
                            <Button size="sm" variant="outline">
                              Change Photo
                            </Button>
                          </VStack>
                        </HStack>

                        <Grid templateColumns="repeat(2, 1fr)" gap={6} w="full">
                          <GridItem>
                            <FormControl>
                              <FormLabel>Full Name</FormLabel>
                              <InputGroup>
                                <InputLeftElement>
                                  <FiUser />
                                </InputLeftElement>
                                <Input
                                  value={profileData.name}
                                  onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                                />
                              </InputGroup>
                            </FormControl>
                          </GridItem>
                          <GridItem>
                            <FormControl>
                              <FormLabel>Email Address</FormLabel>
                              <InputGroup>
                                <InputLeftElement>
                                  <FiMail />
                                </InputLeftElement>
                                <Input
                                  type="email"
                                  value={profileData.email}
                                  onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                                />
                              </InputGroup>
                            </FormControl>
                          </GridItem>
                          <GridItem>
                            <FormControl>
                              <FormLabel>Phone Number</FormLabel>
                              <InputGroup>
                                <InputLeftElement>
                                  <FiPhone />
                                </InputLeftElement>
                                <Input
                                  value={profileData.phone}
                                  onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                                />
                              </InputGroup>
                            </FormControl>
                          </GridItem>
                          <GridItem>
                            <FormControl>
                              <FormLabel>Specialization</FormLabel>
                              <Select
                                value={profileData.specialization}
                                onChange={(e) => setProfileData({ ...profileData, specialization: e.target.value })}
                              >
                                <option value="General Dentistry">General Dentistry</option>
                                <option value="Orthodontics">Orthodontics</option>
                                <option value="Oral Surgery">Oral Surgery</option>
                                <option value="Periodontics">Periodontics</option>
                                <option value="Endodontics">Endodontics</option>
                                <option value="Pediatric Dentistry">Pediatric Dentistry</option>
                              </Select>
                            </FormControl>
                          </GridItem>
                          <GridItem>
                            <FormControl>
                              <FormLabel>License Number</FormLabel>
                              <Input
                                value={profileData.licenseNumber}
                                onChange={(e) => setProfileData({ ...profileData, licenseNumber: e.target.value })}
                              />
                            </FormControl>
                          </GridItem>
                          <GridItem>
                            <FormControl>
                              <FormLabel>Address</FormLabel>
                              <InputGroup>
                                <InputLeftElement>
                                  <FiMapPin />
                                </InputLeftElement>
                                <Input
                                  value={profileData.address}
                                  onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                                />
                              </InputGroup>
                            </FormControl>
                          </GridItem>
                        </Grid>

                        <FormControl>
                          <FormLabel>Bio</FormLabel>
                          <Textarea
                            value={profileData.bio}
                            onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                            placeholder="Tell us about yourself..."
                            rows={4}
                          />
                        </FormControl>

                        <Button
                          leftIcon={<FiSave />}
                          colorScheme="dental"
                          onClick={handleSaveProfile}
                          alignSelf="flex-end"
                        >
                          Save Profile
                        </Button>
                      </VStack>
                    </CardBody>
                  </Card>
                </TabPanel>

                {/* Clinic Tab */}
                <TabPanel px={0}>
                  <Card bg={cardBg}>
                    <CardHeader>
                      <Heading size="md">Clinic Information</Heading>
                    </CardHeader>
                    <CardBody>
                      <VStack spacing={6}>
                        <Grid templateColumns="repeat(2, 1fr)" gap={6} w="full">
                          <GridItem>
                            <FormControl>
                              <FormLabel>Clinic Name</FormLabel>
                              <Input
                                value={clinicData.name}
                                onChange={(e) => setClinicData({ ...clinicData, name: e.target.value })}
                              />
                            </FormControl>
                          </GridItem>
                          <GridItem>
                            <FormControl>
                              <FormLabel>Phone Number</FormLabel>
                              <InputGroup>
                                <InputLeftElement>
                                  <FiPhone />
                                </InputLeftElement>
                                <Input
                                  value={clinicData.phone}
                                  onChange={(e) => setClinicData({ ...clinicData, phone: e.target.value })}
                                />
                              </InputGroup>
                            </FormControl>
                          </GridItem>
                          <GridItem>
                            <FormControl>
                              <FormLabel>Email Address</FormLabel>
                              <InputGroup>
                                <InputLeftElement>
                                  <FiMail />
                                </InputLeftElement>
                                <Input
                                  type="email"
                                  value={clinicData.email}
                                  onChange={(e) => setClinicData({ ...clinicData, email: e.target.value })}
                                />
                              </InputGroup>
                            </FormControl>
                          </GridItem>
                          <GridItem>
                            <FormControl>
                              <FormLabel>Website</FormLabel>
                              <InputGroup>
                                <InputLeftElement>
                                  <FiGlobe />
                                </InputLeftElement>
                                <Input
                                  value={clinicData.website}
                                  onChange={(e) => setClinicData({ ...clinicData, website: e.target.value })}
                                />
                              </InputGroup>
                            </FormControl>
                          </GridItem>
                          <GridItem colSpan={2}>
                            <FormControl>
                              <FormLabel>Address</FormLabel>
                              <InputGroup>
                                <InputLeftElement>
                                  <FiMapPin />
                                </InputLeftElement>
                                <Input
                                  value={clinicData.address}
                                  onChange={(e) => setClinicData({ ...clinicData, address: e.target.value })}
                                />
                              </InputGroup>
                            </FormControl>
                          </GridItem>
                        </Grid>

                        <Box w="full">
                          <Text fontWeight="medium" mb={4}>Operating Hours</Text>
                          <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                            {Object.entries(clinicData.operatingHours).map(([day, hours]) => (
                              <GridItem key={day}>
                                <FormControl>
                                  <FormLabel textTransform="capitalize">{day}</FormLabel>
                                  <Input
                                    value={hours}
                                    onChange={(e) => setClinicData({
                                      ...clinicData,
                                      operatingHours: {
                                        ...clinicData.operatingHours,
                                        [day]: e.target.value
                                      }
                                    })}
                                  />
                                </FormControl>
                              </GridItem>
                            ))}
                          </Grid>
                        </Box>

                        <Button
                          leftIcon={<FiSave />}
                          colorScheme="dental"
                          onClick={handleSaveClinic}
                          alignSelf="flex-end"
                        >
                          Save Clinic Settings
                        </Button>
                      </VStack>
                    </CardBody>
                  </Card>
                </TabPanel>

                {/* Notifications Tab */}
                <TabPanel px={0}>
                  <Card bg={cardBg}>
                    <CardHeader>
                      <Heading size="md">Notification Preferences</Heading>
                    </CardHeader>
                    <CardBody>
                      <VStack spacing={6}>
                        <VStack spacing={4} align="stretch" w="full">
                          <HStack justify="space-between">
                            <Box>
                              <Text fontWeight="medium">Email Notifications</Text>
                              <Text fontSize="sm" color="gray.600">
                                Receive notifications via email
                              </Text>
                            </Box>
                            <Switch
                              isChecked={notificationSettings.emailNotifications}
                              onChange={(e) => setNotificationSettings({
                                ...notificationSettings,
                                emailNotifications: e.target.checked
                              })}
                            />
                          </HStack>

                          <HStack justify="space-between">
                            <Box>
                              <Text fontWeight="medium">SMS Notifications</Text>
                              <Text fontSize="sm" color="gray.600">
                                Receive notifications via SMS
                              </Text>
                            </Box>
                            <Switch
                              isChecked={notificationSettings.smsNotifications}
                              onChange={(e) => setNotificationSettings({
                                ...notificationSettings,
                                smsNotifications: e.target.checked
                              })}
                            />
                          </HStack>

                          <HStack justify="space-between">
                            <Box>
                              <Text fontWeight="medium">Appointment Reminders</Text>
                              <Text fontSize="sm" color="gray.600">
                                Get reminded about upcoming appointments
                              </Text>
                            </Box>
                            <Switch
                              isChecked={notificationSettings.appointmentReminders}
                              onChange={(e) => setNotificationSettings({
                                ...notificationSettings,
                                appointmentReminders: e.target.checked
                              })}
                            />
                          </HStack>

                          <HStack justify="space-between">
                            <Box>
                              <Text fontWeight="medium">Payment Reminders</Text>
                              <Text fontSize="sm" color="gray.600">
                                Get reminded about overdue payments
                              </Text>
                            </Box>
                            <Switch
                              isChecked={notificationSettings.paymentReminders}
                              onChange={(e) => setNotificationSettings({
                                ...notificationSettings,
                                paymentReminders: e.target.checked
                              })}
                            />
                          </HStack>

                          <HStack justify="space-between">
                            <Box>
                              <Text fontWeight="medium">Low Stock Alerts</Text>
                              <Text fontSize="sm" color="gray.600">
                                Get notified when inventory is low
                              </Text>
                            </Box>
                            <Switch
                              isChecked={notificationSettings.lowStockAlerts}
                              onChange={(e) => setNotificationSettings({
                                ...notificationSettings,
                                lowStockAlerts: e.target.checked
                              })}
                            />
                          </HStack>

                          <HStack justify="space-between">
                            <Box>
                              <Text fontWeight="medium">System Updates</Text>
                              <Text fontSize="sm" color="gray.600">
                                Get notified about system updates and maintenance
                              </Text>
                            </Box>
                            <Switch
                              isChecked={notificationSettings.systemUpdates}
                              onChange={(e) => setNotificationSettings({
                                ...notificationSettings,
                                systemUpdates: e.target.checked
                              })}
                            />
                          </HStack>

                          <HStack justify="space-between">
                            <Box>
                              <Text fontWeight="medium">Marketing Emails</Text>
                              <Text fontSize="sm" color="gray.600">
                                Receive promotional emails and newsletters
                              </Text>
                            </Box>
                            <Switch
                              isChecked={notificationSettings.marketingEmails}
                              onChange={(e) => setNotificationSettings({
                                ...notificationSettings,
                                marketingEmails: e.target.checked
                              })}
                            />
                          </HStack>
                        </VStack>

                        <Button
                          leftIcon={<FiBell />}
                          colorScheme="dental"
                          onClick={handleSaveNotifications}
                          alignSelf="flex-end"
                        >
                          Save Notification Settings
                        </Button>
                      </VStack>
                    </CardBody>
                  </Card>
                </TabPanel>

                {/* Security Tab */}
                <TabPanel px={0}>
                  <Card bg={cardBg}>
                    <CardHeader>
                      <Heading size="md">Security Settings</Heading>
                    </CardHeader>
                    <CardBody>
                      <VStack spacing={6}>
                        <VStack spacing={4} align="stretch" w="full">
                          <HStack justify="space-between">
                            <Box>
                              <Text fontWeight="medium">Two-Factor Authentication</Text>
                              <Text fontSize="sm" color="gray.600">
                                Add an extra layer of security to your account
                              </Text>
                            </Box>
                            <Switch
                              isChecked={securitySettings.twoFactorAuth}
                              onChange={(e) => setSecuritySettings({
                                ...securitySettings,
                                twoFactorAuth: e.target.checked
                              })}
                            />
                          </HStack>

                          <HStack justify="space-between">
                            <Box>
                              <Text fontWeight="medium">Login Notifications</Text>
                              <Text fontSize="sm" color="gray.600">
                                Get notified when someone logs into your account
                              </Text>
                            </Box>
                            <Switch
                              isChecked={securitySettings.loginNotifications}
                              onChange={(e) => setSecuritySettings({
                                ...securitySettings,
                                loginNotifications: e.target.checked
                              })}
                            />
                          </HStack>

                          <FormControl>
                            <FormLabel>Session Timeout (minutes)</FormLabel>
                            <Select
                              value={securitySettings.sessionTimeout}
                              onChange={(e) => setSecuritySettings({
                                ...securitySettings,
                                sessionTimeout: parseInt(e.target.value)
                              })}
                            >
                              <option value={15}>15 minutes</option>
                              <option value={30}>30 minutes</option>
                              <option value={60}>1 hour</option>
                              <option value={120}>2 hours</option>
                              <option value={480}>8 hours</option>
                            </Select>
                          </FormControl>

                          <FormControl>
                            <FormLabel>Password Expiry (days)</FormLabel>
                            <Select
                              value={securitySettings.passwordExpiry}
                              onChange={(e) => setSecuritySettings({
                                ...securitySettings,
                                passwordExpiry: parseInt(e.target.value)
                              })}
                            >
                              <option value={30}>30 days</option>
                              <option value={60}>60 days</option>
                              <option value={90}>90 days</option>
                              <option value={180}>180 days</option>
                              <option value={365}>1 year</option>
                            </Select>
                          </FormControl>
                        </VStack>

                        <Divider />

                        <VStack spacing={4} align="stretch" w="full">
                          <Text fontWeight="medium">Change Password</Text>
                          <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                            <GridItem>
                              <FormControl>
                                <FormLabel>Current Password</FormLabel>
                                <Input type="password" />
                              </FormControl>
                            </GridItem>
                            <GridItem>
                              <FormControl>
                                <FormLabel>New Password</FormLabel>
                                <Input type="password" />
                              </FormControl>
                            </GridItem>
                            <GridItem>
                              <FormControl>
                                <FormLabel>Confirm New Password</FormLabel>
                                <Input type="password" />
                              </FormControl>
                            </GridItem>
                            <GridItem>
                              <Button colorScheme="dental" mt={6}>
                                Update Password
                              </Button>
                            </GridItem>
                          </Grid>
                        </VStack>

                        <Button
                          leftIcon={<FiShield />}
                          colorScheme="dental"
                          onClick={handleSaveSecurity}
                          alignSelf="flex-end"
                        >
                          Save Security Settings
                        </Button>
                      </VStack>
                    </CardBody>
                  </Card>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </VStack>
        </Container>
      </Layout>
    </ProtectedRoute>
  );
}
