import React from 'react';
import {
  Box,
  Button,
  Container,
  Divider,
  Flex,
  Image,
  Text,
  SimpleGrid,
  Spacer,
  VStack,
  Center,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import TalisLogo from '../../public/images/talis-white-logo.svg';

function Footer() {
  return (
    <Box
      w="100%"
      position="relative"
      bottom="0"
      left="0"
      bg="black"
      color="white"
      p={10}
    >
      <Container maxW="lg">
        <Wrap spacing={5} justify="center">
          <WrapItem w="30%">
            <VStack w="100%" align="flex-start" mt={10}>
              <Image w="auto" height="35px" src={TalisLogo} alt="Talis Logo" />
              <Text textAlign="left" fontSize="12px">
                Transparent, honest, and sincere property management services
                for residential and commercial properties
              </Text>
            </VStack>
          </WrapItem>
          <WrapItem w="30%">
            <VStack w="100%" spacing={1} align="flex-start" ml={20}>
              <Box as="a" href="#">
                <Text>Airport</Text>
              </Box>
              <Box as="a" href="#">
                <Text>Cantonments</Text>
              </Box>
              <Box as="a" href="#">
                <Text>Dzorwulu</Text>
              </Box>
              <Box as="a" href="#">
                <Text>East Legon</Text>
              </Box>
              <Box as="a" href="#">
                <Text>Labone</Text>
              </Box>
              <Box as="a" href="#">
                <Text>Roman Ridge</Text>
              </Box>
            </VStack>
          </WrapItem>
          <WrapItem w="30%">
            <VStack w="100%">
              <Text textAlign="flex-start" mt={10} fontSize="14px">
                <Text>Location</Text>
                <Text>8 Sir Arku Korsah Rd</Text>
                <Text>Airport, Accra, Ghana</Text>
                <Text>info@talispropertyservices.com</Text>
              </Text>
            </VStack>
          </WrapItem>
        </Wrap>
        <Divider mt={5} />
        <Text>
          Copyright &copy; <span className="year"></span> TALIS Property
          Services
        </Text>
      </Container>
    </Box>
  );
}

export default Footer;
