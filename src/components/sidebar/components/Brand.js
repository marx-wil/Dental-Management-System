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
      {/* <Heading as="h2" size="lg" py="25px"><Icon as={MdLocalHospital} color={logoColor} /> DEMS</Heading > */}
      {/* <Icon as={MdLocalHospital} w={32} h={32} color={logoColor} mb='20px'/> */}
      <HSeparator mb='20px' />
    </Flex>
  );
}

export default SidebarBrand;
