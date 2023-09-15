/*!
  _   _  ___  ____  ___ ________  _   _   _   _ ___   
 | | | |/ _ \|  _ \|_ _|__  / _ \| \ | | | | | |_ _| 
 | |_| | | | | |_) || |  / / | | |  \| | | | | || | 
 |  _  | |_| |  _ < | | / /| |_| | |\  | | |_| || |
 |_| |_|\___/|_| \_\___/____\___/|_| \_|  \___/|___|
                                                                                                                                                                                                                                                                                                                                       
=========================================================
* Horizon UI - v1.1.0
=========================================================

* Product Page: https://www.horizon-ui.com/
* Copyright 2023 Horizon UI (https://www.horizon-ui.com/)

* Designed and Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// Chakra imports
import {
  Button,
  Box,
  SimpleGrid,
  Flex,
  Spacer,
  Grid,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Heading
} from "@chakra-ui/react";
import CardBannerDems from "./components/CardBannerDems"
import CardBannerSysGo from "./components/CardBannerSysGo"
import ClinicCard from "./components/ClinicCard"
// Custom components
import React from "react";
import {
  MdAddBox
} from "react-icons/md";
export default function UserReports() {
  // Chakra Color Mode
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <Flex py='20px'>
        <Spacer />
        <Box>
          <Button leftIcon={<MdAddBox />} variant="brand" onClick={onOpen}>
            New clinic
          </Button>
          <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Add new clinic</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Heading>Hello World</Heading>
              </ModalBody>
              <ModalFooter>
                <Button mr={3} colorScheme="green">Save</Button>
                <Button mr={3} onClick={onClose} variant="ghost">Close</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Box>
      </Flex>
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3, "2xl": 4 }}
        gap='20px'
        mb='20px'>
        <ClinicCard location="Philippines, Laguna" branchname="DMS-Laguna" branchid="15" />
        <ClinicCard location="Philippines, Manila" branchname="DMS-Manila" branchid="16" />
        <ClinicCard location="Philippines, Cavite" branchname="DMS-Cavite" branchid="17" />
        <ClinicCard location="Philippines, Camsur" branchname="DMS-Camsur" branchid="18" />
        <ClinicCard location="Japan, Ohayo" branchname="DMSJ-Ohayo" branchid="19" />
        <ClinicCard location="Korea, Gangnam" branchname="DMSK-Gangnam" branchid="20" />
      </SimpleGrid>
      <Grid
        templateColumns={{
          base: "1fr",
          lg: "2fr 1fr",
        }}
        templateRows={{
          base: "repeat(2, 1fr)",
          lg: "1fr",
        }}
        gap={{ base: "20px", xl: "20px" }}>
        <CardBannerDems />
        <CardBannerSysGo />
      </Grid>
    </Box>
  );
}
