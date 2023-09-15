import {
  IconButton,
  Menu,
  MenuButton,
  MenuList,
} from "@chakra-ui/react";
import {
  MdSettings,
} from "react-icons/md";
import MiniStatistics from "components/card/MiniStatistics";
import DetailsButton from "./ClinicCardComponents/Details"
import ModifyButton from "./ClinicCardComponents/Modify"
import DeleteButton from "./ClinicCardComponents/Delete"
export default function ClinicCard(props) {
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
            <ModifyButton branchname={props.branchname} />
            <DeleteButton branchname={props.branchname} />
          </MenuList>
        </Menu>
      }
    />
  );
}
