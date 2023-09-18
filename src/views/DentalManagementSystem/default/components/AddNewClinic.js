import {
    Button,
    Box,
    SimpleGrid,
    Flex,
    Spacer,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Input,
    FormControl,
    FormLabel,
    InputGroup,
    InputLeftAddon
} from "@chakra-ui/react";
import {
    MdAddBox,
    MdHome,
    MdLocationCity
} from "react-icons/md";

export default function AddNewClinic() {
    
  const { isOpen, onOpen, onClose } = useDisclosure()
    return (
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
                            <SimpleGrid
                                columns={{ base: 1, md: 1, lg: 1, "2xl": 1 }}
                                gap='20px'
                                mb='20px'>
                                <FormControl id="branchName">
                                    <FormLabel>Branch Name:</FormLabel>
                                    <InputGroup>
                                        <InputLeftAddon pointerEvents="none" children={<MdHome />} />
                                        <Input type="text" />
                                    </InputGroup>
                                </FormControl>
                            </SimpleGrid>
                            <SimpleGrid
                                columns={{ base: 1, md: 2, lg: 2, "2xl": 2 }}
                                gap='20px'
                                mb='20px'>
                                <FormControl id="branchMobile">
                                    <FormLabel>Mobile:</FormLabel>
                                    <InputGroup>
                                        <InputLeftAddon pointerEvents="none" children="+63" />
                                        <Input type="number" />
                                    </InputGroup>
                                </FormControl>
                                <FormControl id="branchTel">
                                    <FormLabel>Telephone:</FormLabel>
                                    <InputGroup>
                                        <InputLeftAddon pointerEvents="none" children="123" />
                                        <Input type="number" />
                                    </InputGroup>
                                </FormControl>
                            </SimpleGrid>
                            <SimpleGrid
                                columns={{ base: 1, md: 1, lg: 1, "2xl": 1 }}
                                gap='20px'
                                mb='20px'>
                                <FormControl id="branchAdd">
                                    <FormLabel>Branch Address:</FormLabel>
                                    <InputGroup>
                                        <InputLeftAddon pointerEvents="none" children={<MdLocationCity />} />
                                        <Input type="text" />
                                    </InputGroup>
                                </FormControl>
                            </SimpleGrid>
                        </ModalBody>
                        <ModalFooter>
                            <Button mr={3} colorScheme="green">Save</Button>
                            <Button mr={3} onClick={onClose} variant="ghost">Close</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </Box>
        </Flex>
    )
}