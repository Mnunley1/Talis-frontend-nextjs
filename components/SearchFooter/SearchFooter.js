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

function SearchFooter() {
  return (
    <Box
      w="100%"
      position="relative"
      bottom="0"
      left="0"
      bg="#111111"
      color="white"
      px={5}
      py={10}
      mt={5}
      borderRadius="20px"
    >
      <Container maxW="lg">
        <SimpleGrid columns={1} spacing={5}>
          <VStack w="100%" align="flex-start">
            <Image w="auto" height="35px" src={TalisLogo} alt="Talis Logo" />
            <Text textAlign="flex-start" fontSize="sm">
              Transparent, honest, and sincere property management services for
              residential and commercial properties
            </Text>
          </VStack>

          <VStack w="100%" spacing={1} align="flex-start">
            <Box as="a" href="#">
              <Text fontSize="sm">Airport</Text>
            </Box>
            <Box as="a" href="#">
              <Text fontSize="sm">Cantonments</Text>
            </Box>
            <Box as="a" href="#">
              <Text fontSize="sm">Dzorwulu</Text>
            </Box>
            <Box as="a" href="#">
              <Text fontSize="sm">East Legon</Text>
            </Box>
            <Box as="a" href="#">
              <Text fontSize="sm">Labone</Text>
            </Box>
            <Box as="a" href="#">
              <Text fontSize="sm">Roman Ridge</Text>
            </Box>
          </VStack>

          <VStack w="100%" align="flex-start">
            <Text textAlign="flex-start" fontSize="14px">
              <Text fontSize="sm">Location</Text>
              <Text fontSize="sm">8 Sir Arku Korsah Rd</Text>
              <Text fontSize="sm">Airport, Accra, Ghana</Text>
              <Text fontSize="sm">info@talispropertyservices.com</Text>
            </Text>
          </VStack>
        </SimpleGrid>
        <Divider mt={5} />
        <Text fontSize="sm">
          Copyright &copy; <span className="year"></span> TALIS Property
          Services
        </Text>
      </Container>
    </Box>
  );
}

export default SearchFooter;
