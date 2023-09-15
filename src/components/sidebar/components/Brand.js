import React from "react";
import { Icon, Text, Heading  } from "@chakra-ui/react";
import { MdLocalHospital } from "react-icons/md"
// Chakra imports
import { Flex, useColorModeValue } from "@chakra-ui/react";

// Custom components
import { HorizonLogo } from "components/icons/Icons";
import { HSeparator } from "components/separator/Separator";
import { FaTooth } from "react-icons/fa";

export function SidebarBrand() {
  //   Chakra color mode
  let logoColor = useColorModeValue("navy.700", "white");

  return (
    <Flex align='center' direction='column'>
      <Heading as="h6" size="md" py="25px">Dental Management</Heading >
      <HSeparator mb='20px' />
    </Flex>
  );
}

export default SidebarBrand;
