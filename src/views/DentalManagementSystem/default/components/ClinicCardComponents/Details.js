import {
    MenuItem,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button
} from "@chakra-ui/react";
export default function Details(props) {
    const { ...rest } = props;
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
            <MenuItem onClick={onOpen}>Details</MenuItem>
            <Modal
                isCentered
                onClose={onClose}
                isOpen={isOpen}
                motionPreset="slideInBottom"
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>View details of {props.branchname}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {props.branchname}
                    </ModalBody>
                    <ModalFooter>
                        <Button type="ghost" mr={3} onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}
