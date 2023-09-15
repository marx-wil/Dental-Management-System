import {
  IconButton,
  SimpleGrid,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
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
    <MiniStatistics
      name={props.branchid + props.location}
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
            <DetailsButton branchname={props.branchname} />
          </MenuList>
        </Menu>
      }
    />
  );
}
