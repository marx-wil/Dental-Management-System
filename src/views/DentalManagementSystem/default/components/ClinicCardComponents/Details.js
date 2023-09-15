import {
    MenuItem,
    useDisclosure
} from "@chakra-ui/react";
export default function ClinicCard(props) {
    const { ...rest } = props;
    const { isOpen, onOpen, onClose } = useDisclosure()
    // Chakra Color Mode
    return (
        <MenuItem>Details</MenuItem>
    );
}
