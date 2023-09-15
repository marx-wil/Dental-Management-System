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
export default function Modify(props) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
            <MenuItem onClick={onOpen}>Modify</MenuItem>
            <Modal
                isCentered
                onClose={onClose}
                isOpen={isOpen}
                motionPreset="slideInBottom"
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Modify details of {props.branchname}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {props.branchname}
                    </ModalBody>
                    <ModalFooter>
                        <Button mr={3} colorScheme="green">Save</Button>
                        <Button tye="ghost" mr={3} onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}
