import {
    Button,
    Flex,
    Image,
    Link,
    Text,
    useColorModeValue,
    Heading
} from "@chakra-ui/react";
import logoWhite from "assets/img/layout/logoWhite.png";
import React from "react";

export default function Logo() {
    // const bgColor = "linear-gradient(135deg, #868CFF 0%, #4318FF 100%)";
    // const borderColor = useColorModeValue("white", "navy.800");

    return (
        <Flex
            justify='center'
            direction='column'
            align='center'
            // bg={bgColor}
            borderRadius='30px'
            position='relative'>
            <Flex
                direction='column'
                mb='12px'
                align='center'
                justify='center'
                px='15px'
                pt='55px'>
                <Text
                    fontSize={{ base: "lg", xl: "18px" }}
                    color='#000'
                    fontWeight='bold'
                    lineHeight='150%'
                    textAlign='center'
                    px='10px'
                    mt="10px"
                    mb='6px'>
                    DENTAL MANAGEMENT
                </Text>
            </Flex>
        </Flex>
    );
}
