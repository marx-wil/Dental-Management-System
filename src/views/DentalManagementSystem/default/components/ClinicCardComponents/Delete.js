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
export default function Delete(props) {
    const { ...rest } = props;
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
            <MenuItem onClick={onOpen}>Delete</MenuItem>
            <Modal
                isCentered
                onClose={onClose}
                isOpen={isOpen}
                motionPreset="slideInBottom"
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Delete {props.branchname}?</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {props.branchname}
                    </ModalBody>
                    <ModalFooter>
                        <Button mr={3} colorScheme="red">Delete</Button>
                        <Button type="ghost" mr={3} onClick={onClose}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}
