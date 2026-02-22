'use client';

import React, { useState } from 'react';
import {
  Box,
  Container,
  VStack,
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
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useToast,
  Stack,
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
} from 'react-icons/fi';
import Layout from '../components/Layout';
import ProtectedRoute from '../components/ProtectedRoute';
import { useAuth } from '../contexts/AuthContext';

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

const labelStyle = {
  fontSize: "xs" as const,
  fontWeight: "600" as const,
  color: "whiteAlpha.500",
  textTransform: "uppercase" as const,
  letterSpacing: "0.06em",
};

export default function SettingsPage() {
  const { user } = useAuth();
  const toast = useToast();

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
        <Container maxW="4xl" py={{ base: 4, md: 8 }}>
          <VStack spacing={{ base: 4, md: 8 }} align="stretch">
            {/* Header */}
            <Box>
              <Heading size="lg" color="white">Settings</Heading>
              <Text color="whiteAlpha.700">Manage your account and clinic settings</Text>
            </Box>

            <Tabs>
              <TabList
                borderBottom="1px solid rgba(255,255,255,0.07)"
                overflowX="auto"
                overflowY="hidden"
              >
                <Tab
                  whiteSpace="nowrap"
                  color="whiteAlpha.500"
                  _selected={{ color: "white", borderColor: "cyan.400" }}
                  _hover={{ color: "whiteAlpha.800" }}
                >
                  Profile
                </Tab>
                <Tab
                  whiteSpace="nowrap"
                  color="whiteAlpha.500"
                  _selected={{ color: "white", borderColor: "cyan.400" }}
                  _hover={{ color: "whiteAlpha.800" }}
                >
                  Clinic
                </Tab>
                <Tab
                  whiteSpace="nowrap"
                  color="whiteAlpha.500"
                  _selected={{ color: "white", borderColor: "cyan.400" }}
                  _hover={{ color: "whiteAlpha.800" }}
                >
                  Notifications
                </Tab>
                <Tab
                  whiteSpace="nowrap"
                  color="whiteAlpha.500"
                  _selected={{ color: "white", borderColor: "cyan.400" }}
                  _hover={{ color: "whiteAlpha.800" }}
                >
                  Security
                </Tab>
              </TabList>

              <TabPanels>
                {/* Profile Tab */}
                <TabPanel px={0}>
                  <Card {...cardStyle}>
                    <CardHeader>
                      <Heading size="md" color="white">Profile Information</Heading>
                    </CardHeader>
                    <CardBody>
                      <VStack spacing={6}>
                        <Stack
                          direction={{ base: 'column', md: 'row' }}
                          spacing={6}
                          w="full"
                          align={{ base: 'center', md: 'flex-start' }}
                        >
                          <Avatar size="xl" src={user?.avatar} name={user?.name} />
                          <VStack align={{ base: 'center', md: 'start' }} spacing={2}>
                            <Text fontWeight="medium" fontSize="lg" color="white">{user?.name}</Text>
                            <Text color="whiteAlpha.500">{user?.role}</Text>
                            <Button size="sm" variant="outline" colorScheme="cyan">
                              Change Photo
                            </Button>
                          </VStack>
                        </Stack>

                        <Grid
                          templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
                          gap={6}
                          w="full"
                        >
                          <GridItem>
                            <FormControl>
                              <FormLabel {...labelStyle}>Full Name</FormLabel>
                              <InputGroup>
                                <InputLeftElement color="whiteAlpha.400">
                                  <FiUser />
                                </InputLeftElement>
                                <Input
                                  value={profileData.name}
                                  onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                                  {...inputStyle}
                                />
                              </InputGroup>
                            </FormControl>
                          </GridItem>
                          <GridItem>
                            <FormControl>
                              <FormLabel {...labelStyle}>Email Address</FormLabel>
                              <InputGroup>
                                <InputLeftElement color="whiteAlpha.400">
                                  <FiMail />
                                </InputLeftElement>
                                <Input
                                  type="email"
                                  value={profileData.email}
                                  onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                                  {...inputStyle}
                                />
                              </InputGroup>
                            </FormControl>
                          </GridItem>
                          <GridItem>
                            <FormControl>
                              <FormLabel {...labelStyle}>Phone Number</FormLabel>
                              <InputGroup>
                                <InputLeftElement color="whiteAlpha.400">
                                  <FiPhone />
                                </InputLeftElement>
                                <Input
                                  value={profileData.phone}
                                  onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                                  {...inputStyle}
                                />
                              </InputGroup>
                            </FormControl>
                          </GridItem>
                          <GridItem>
                            <FormControl>
                              <FormLabel {...labelStyle}>Specialization</FormLabel>
                              <Select
                                value={profileData.specialization}
                                onChange={(e) => setProfileData({ ...profileData, specialization: e.target.value })}
                                {...inputStyle}
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
                              <FormLabel {...labelStyle}>License Number</FormLabel>
                              <Input
                                value={profileData.licenseNumber}
                                onChange={(e) => setProfileData({ ...profileData, licenseNumber: e.target.value })}
                                {...inputStyle}
                              />
                            </FormControl>
                          </GridItem>
                          <GridItem>
                            <FormControl>
                              <FormLabel {...labelStyle}>Address</FormLabel>
                              <InputGroup>
                                <InputLeftElement color="whiteAlpha.400">
                                  <FiMapPin />
                                </InputLeftElement>
                                <Input
                                  value={profileData.address}
                                  onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                                  {...inputStyle}
                                />
                              </InputGroup>
                            </FormControl>
                          </GridItem>
                        </Grid>

                        <FormControl>
                          <FormLabel {...labelStyle}>Bio</FormLabel>
                          <Textarea
                            value={profileData.bio}
                            onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                            placeholder="Tell us about yourself..."
                            rows={4}
                            bg="rgba(255,255,255,0.05)"
                            border="1.5px solid"
                            borderColor="rgba(255,255,255,0.1)"
                            color="white"
                            _focus={{ bg: "rgba(6,182,212,0.06)", borderColor: "cyan.500", boxShadow: "0 0 0 3px rgba(6,182,212,0.15)" }}
                            _hover={{ borderColor: "rgba(255,255,255,0.2)" }}
                            _placeholder={{ color: "whiteAlpha.300" }}
                          />
                        </FormControl>

                        <Button
                          leftIcon={<FiSave />}
                          bgGradient="linear(135deg, cyan.500, violet.500)"
                          color="white"
                          _hover={{ bgGradient: "linear(135deg, cyan.400, violet.400)", boxShadow: "0 0 20px rgba(6,182,212,0.3)" }}
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
                  <Card {...cardStyle}>
                    <CardHeader>
                      <Heading size="md" color="white">Clinic Information</Heading>
                    </CardHeader>
                    <CardBody>
                      <VStack spacing={6}>
                        <Grid
                          templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
                          gap={6}
                          w="full"
                        >
                          <GridItem>
                            <FormControl>
                              <FormLabel {...labelStyle}>Clinic Name</FormLabel>
                              <Input
                                value={clinicData.name}
                                onChange={(e) => setClinicData({ ...clinicData, name: e.target.value })}
                                {...inputStyle}
                              />
                            </FormControl>
                          </GridItem>
                          <GridItem>
                            <FormControl>
                              <FormLabel {...labelStyle}>Phone Number</FormLabel>
                              <InputGroup>
                                <InputLeftElement color="whiteAlpha.400">
                                  <FiPhone />
                                </InputLeftElement>
                                <Input
                                  value={clinicData.phone}
                                  onChange={(e) => setClinicData({ ...clinicData, phone: e.target.value })}
                                  {...inputStyle}
                                />
                              </InputGroup>
                            </FormControl>
                          </GridItem>
                          <GridItem>
                            <FormControl>
                              <FormLabel {...labelStyle}>Email Address</FormLabel>
                              <InputGroup>
                                <InputLeftElement color="whiteAlpha.400">
                                  <FiMail />
                                </InputLeftElement>
                                <Input
                                  type="email"
                                  value={clinicData.email}
                                  onChange={(e) => setClinicData({ ...clinicData, email: e.target.value })}
                                  {...inputStyle}
                                />
                              </InputGroup>
                            </FormControl>
                          </GridItem>
                          <GridItem>
                            <FormControl>
                              <FormLabel {...labelStyle}>Website</FormLabel>
                              <InputGroup>
                                <InputLeftElement color="whiteAlpha.400">
                                  <FiGlobe />
                                </InputLeftElement>
                                <Input
                                  value={clinicData.website}
                                  onChange={(e) => setClinicData({ ...clinicData, website: e.target.value })}
                                  {...inputStyle}
                                />
                              </InputGroup>
                            </FormControl>
                          </GridItem>
                          <GridItem colSpan={2}>
                            <FormControl>
                              <FormLabel {...labelStyle}>Address</FormLabel>
                              <InputGroup>
                                <InputLeftElement color="whiteAlpha.400">
                                  <FiMapPin />
                                </InputLeftElement>
                                <Input
                                  value={clinicData.address}
                                  onChange={(e) => setClinicData({ ...clinicData, address: e.target.value })}
                                  {...inputStyle}
                                />
                              </InputGroup>
                            </FormControl>
                          </GridItem>
                        </Grid>

                        <Box w="full">
                          <Text fontWeight="medium" mb={4} color="white">Operating Hours</Text>
                          <Grid
                            templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
                            gap={4}
                          >
                            {Object.entries(clinicData.operatingHours).map(([day, hours]) => (
                              <GridItem key={day}>
                                <FormControl>
                                  <FormLabel {...labelStyle} textTransform="capitalize">{day}</FormLabel>
                                  <Input
                                    value={hours}
                                    onChange={(e) => setClinicData({
                                      ...clinicData,
                                      operatingHours: {
                                        ...clinicData.operatingHours,
                                        [day]: e.target.value
                                      }
                                    })}
                                    {...inputStyle}
                                  />
                                </FormControl>
                              </GridItem>
                            ))}
                          </Grid>
                        </Box>

                        <Button
                          leftIcon={<FiSave />}
                          bgGradient="linear(135deg, cyan.500, violet.500)"
                          color="white"
                          _hover={{ bgGradient: "linear(135deg, cyan.400, violet.400)", boxShadow: "0 0 20px rgba(6,182,212,0.3)" }}
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
                  <Card {...cardStyle}>
                    <CardHeader>
                      <Heading size="md" color="white">Notification Preferences</Heading>
                    </CardHeader>
                    <CardBody>
                      <VStack spacing={6}>
                        <VStack spacing={4} align="stretch" w="full">
                          <Stack
                            direction={{ base: 'column', sm: 'row' }}
                            justify="space-between"
                            align={{ base: 'flex-start', sm: 'center' }}
                            spacing={{ base: 2, sm: 4 }}
                          >
                            <Box>
                              <Text fontWeight="medium" color="white">Email Notifications</Text>
                              <Text fontSize="sm" color="whiteAlpha.500">
                                Receive notifications via email
                              </Text>
                            </Box>
                            <Switch
                              colorScheme="cyan"
                              isChecked={notificationSettings.emailNotifications}
                              onChange={(e) => setNotificationSettings({
                                ...notificationSettings,
                                emailNotifications: e.target.checked
                              })}
                            />
                          </Stack>

                          <Stack
                            direction={{ base: 'column', sm: 'row' }}
                            justify="space-between"
                            align={{ base: 'flex-start', sm: 'center' }}
                            spacing={{ base: 2, sm: 4 }}
                          >
                            <Box>
                              <Text fontWeight="medium" color="white">SMS Notifications</Text>
                              <Text fontSize="sm" color="whiteAlpha.500">
                                Receive notifications via SMS
                              </Text>
                            </Box>
                            <Switch
                              colorScheme="cyan"
                              isChecked={notificationSettings.smsNotifications}
                              onChange={(e) => setNotificationSettings({
                                ...notificationSettings,
                                smsNotifications: e.target.checked
                              })}
                            />
                          </Stack>

                          <Stack
                            direction={{ base: 'column', sm: 'row' }}
                            justify="space-between"
                            align={{ base: 'flex-start', sm: 'center' }}
                            spacing={{ base: 2, sm: 4 }}
                          >
                            <Box>
                              <Text fontWeight="medium" color="white">Appointment Reminders</Text>
                              <Text fontSize="sm" color="whiteAlpha.500">
                                Get reminded about upcoming appointments
                              </Text>
                            </Box>
                            <Switch
                              colorScheme="cyan"
                              isChecked={notificationSettings.appointmentReminders}
                              onChange={(e) => setNotificationSettings({
                                ...notificationSettings,
                                appointmentReminders: e.target.checked
                              })}
                            />
                          </Stack>

                          <Stack
                            direction={{ base: 'column', sm: 'row' }}
                            justify="space-between"
                            align={{ base: 'flex-start', sm: 'center' }}
                            spacing={{ base: 2, sm: 4 }}
                          >
                            <Box>
                              <Text fontWeight="medium" color="white">Payment Reminders</Text>
                              <Text fontSize="sm" color="whiteAlpha.500">
                                Get reminded about overdue payments
                              </Text>
                            </Box>
                            <Switch
                              colorScheme="cyan"
                              isChecked={notificationSettings.paymentReminders}
                              onChange={(e) => setNotificationSettings({
                                ...notificationSettings,
                                paymentReminders: e.target.checked
                              })}
                            />
                          </Stack>

                          <Stack
                            direction={{ base: 'column', sm: 'row' }}
                            justify="space-between"
                            align={{ base: 'flex-start', sm: 'center' }}
                            spacing={{ base: 2, sm: 4 }}
                          >
                            <Box>
                              <Text fontWeight="medium" color="white">Low Stock Alerts</Text>
                              <Text fontSize="sm" color="whiteAlpha.500">
                                Get notified when inventory is low
                              </Text>
                            </Box>
                            <Switch
                              colorScheme="cyan"
                              isChecked={notificationSettings.lowStockAlerts}
                              onChange={(e) => setNotificationSettings({
                                ...notificationSettings,
                                lowStockAlerts: e.target.checked
                              })}
                            />
                          </Stack>

                          <Stack
                            direction={{ base: 'column', sm: 'row' }}
                            justify="space-between"
                            align={{ base: 'flex-start', sm: 'center' }}
                            spacing={{ base: 2, sm: 4 }}
                          >
                            <Box>
                              <Text fontWeight="medium" color="white">System Updates</Text>
                              <Text fontSize="sm" color="whiteAlpha.500">
                                Get notified about system updates and maintenance
                              </Text>
                            </Box>
                            <Switch
                              colorScheme="cyan"
                              isChecked={notificationSettings.systemUpdates}
                              onChange={(e) => setNotificationSettings({
                                ...notificationSettings,
                                systemUpdates: e.target.checked
                              })}
                            />
                          </Stack>

                          <Stack
                            direction={{ base: 'column', sm: 'row' }}
                            justify="space-between"
                            align={{ base: 'flex-start', sm: 'center' }}
                            spacing={{ base: 2, sm: 4 }}
                          >
                            <Box>
                              <Text fontWeight="medium" color="white">Marketing Emails</Text>
                              <Text fontSize="sm" color="whiteAlpha.500">
                                Receive promotional emails and newsletters
                              </Text>
                            </Box>
                            <Switch
                              colorScheme="cyan"
                              isChecked={notificationSettings.marketingEmails}
                              onChange={(e) => setNotificationSettings({
                                ...notificationSettings,
                                marketingEmails: e.target.checked
                              })}
                            />
                          </Stack>
                        </VStack>

                        <Button
                          leftIcon={<FiBell />}
                          bgGradient="linear(135deg, cyan.500, violet.500)"
                          color="white"
                          _hover={{ bgGradient: "linear(135deg, cyan.400, violet.400)", boxShadow: "0 0 20px rgba(6,182,212,0.3)" }}
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
                  <Card {...cardStyle}>
                    <CardHeader>
                      <Heading size="md" color="white">Security Settings</Heading>
                    </CardHeader>
                    <CardBody>
                      <VStack spacing={6}>
                        <VStack spacing={4} align="stretch" w="full">
                          <Stack
                            direction={{ base: 'column', sm: 'row' }}
                            justify="space-between"
                            align={{ base: 'flex-start', sm: 'center' }}
                            spacing={{ base: 2, sm: 4 }}
                          >
                            <Box>
                              <Text fontWeight="medium" color="white">Two-Factor Authentication</Text>
                              <Text fontSize="sm" color="whiteAlpha.500">
                                Add an extra layer of security to your account
                              </Text>
                            </Box>
                            <Switch
                              colorScheme="cyan"
                              isChecked={securitySettings.twoFactorAuth}
                              onChange={(e) => setSecuritySettings({
                                ...securitySettings,
                                twoFactorAuth: e.target.checked
                              })}
                            />
                          </Stack>

                          <Stack
                            direction={{ base: 'column', sm: 'row' }}
                            justify="space-between"
                            align={{ base: 'flex-start', sm: 'center' }}
                            spacing={{ base: 2, sm: 4 }}
                          >
                            <Box>
                              <Text fontWeight="medium" color="white">Login Notifications</Text>
                              <Text fontSize="sm" color="whiteAlpha.500">
                                Get notified when someone logs into your account
                              </Text>
                            </Box>
                            <Switch
                              colorScheme="cyan"
                              isChecked={securitySettings.loginNotifications}
                              onChange={(e) => setSecuritySettings({
                                ...securitySettings,
                                loginNotifications: e.target.checked
                              })}
                            />
                          </Stack>

                          <FormControl>
                            <FormLabel {...labelStyle}>Session Timeout (minutes)</FormLabel>
                            <Select
                              value={securitySettings.sessionTimeout}
                              onChange={(e) => setSecuritySettings({
                                ...securitySettings,
                                sessionTimeout: parseInt(e.target.value)
                              })}
                              {...inputStyle}
                            >
                              <option value={15}>15 minutes</option>
                              <option value={30}>30 minutes</option>
                              <option value={60}>1 hour</option>
                              <option value={120}>2 hours</option>
                              <option value={480}>8 hours</option>
                            </Select>
                          </FormControl>

                          <FormControl>
                            <FormLabel {...labelStyle}>Password Expiry (days)</FormLabel>
                            <Select
                              value={securitySettings.passwordExpiry}
                              onChange={(e) => setSecuritySettings({
                                ...securitySettings,
                                passwordExpiry: parseInt(e.target.value)
                              })}
                              {...inputStyle}
                            >
                              <option value={30}>30 days</option>
                              <option value={60}>60 days</option>
                              <option value={90}>90 days</option>
                              <option value={180}>180 days</option>
                              <option value={365}>1 year</option>
                            </Select>
                          </FormControl>
                        </VStack>

                        <Divider borderColor="rgba(255,255,255,0.07)" />

                        <VStack spacing={4} align="stretch" w="full">
                          <Text fontWeight="medium" color="white">Change Password</Text>
                          <Grid
                            templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
                            gap={4}
                          >
                            <GridItem>
                              <FormControl>
                                <FormLabel {...labelStyle}>Current Password</FormLabel>
                                <Input type="password" {...inputStyle} />
                              </FormControl>
                            </GridItem>
                            <GridItem>
                              <FormControl>
                                <FormLabel {...labelStyle}>New Password</FormLabel>
                                <Input type="password" {...inputStyle} />
                              </FormControl>
                            </GridItem>
                            <GridItem>
                              <FormControl>
                                <FormLabel {...labelStyle}>Confirm New Password</FormLabel>
                                <Input type="password" {...inputStyle} />
                              </FormControl>
                            </GridItem>
                            <GridItem>
                              <Button
                                bgGradient="linear(135deg, cyan.500, violet.500)"
                                color="white"
                                _hover={{ bgGradient: "linear(135deg, cyan.400, violet.400)", boxShadow: "0 0 20px rgba(6,182,212,0.3)" }}
                                mt={6}
                              >
                                Update Password
                              </Button>
                            </GridItem>
                          </Grid>
                        </VStack>

                        <Button
                          leftIcon={<FiShield />}
                          bgGradient="linear(135deg, cyan.500, violet.500)"
                          color="white"
                          _hover={{ bgGradient: "linear(135deg, cyan.400, violet.400)", boxShadow: "0 0 20px rgba(6,182,212,0.3)" }}
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
