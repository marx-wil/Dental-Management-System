import {
  IconButton,
  Button,
  Box,
  SimpleGrid,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
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
import {
  MdSettings,
} from "react-icons/md";
import MiniStatistics from "components/card/MiniStatistics";
import DetailsButton from "./ClinicCardComponents/Details"
export default function ClinicCard(props) {
  const { ...rest } = props;

  // Chakra Color Mode
  return (
    <SimpleGrid
      columns={{ base: 1, md: 2, lg: 3, "2xl": 4 }}
      gap='20px'
      mb='20px'>
      <MiniStatistics
        name={props.branchid+props.location}
        value={props.branchname}
        endContent={
          <Menu>
            <MenuButton as={IconButton}
              w='64px'
              h='64px'
              icon={<MdSettings />}
              ariaLabel="Options"
              colorScheme="purple">
            </MenuButton>
            <MenuList>
              <MenuItem>Details</MenuItem>
              <MenuItem>Modify</MenuItem>
              <MenuItem>Delete</MenuItem>
            </MenuList>
          </Menu>
        }
      />
    </SimpleGrid>
  );
}
