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
      bg="#111111"
      color="#8C8C88"
      p={8}
    >
      <Container maxW="lg">
        <SimpleGrid columns={[1, 1, 3]} spacing={10}>
          <VStack
            w={['90%', '70%', '100%']}
            mt={10}
            align={['flex-start', 'flex-start', 'center']}
          >
            <Image w="auto" height="35px" src={TalisLogo} alt="Talis Logo" />
            <Text
              textAlign={['flex-start', 'flex-start', 'center']}
              fontSize="sm"
            >
              Transparent, honest, and sincere property management services for
              residential and commercial properties
            </Text>
          </VStack>

          <VStack
            w="100%"
            spacing={1}
            align={['flex-start', 'flex-start', 'center']}
          >
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

          <VStack w="100%" align={['flex-start', 'flex-start', 'center']}>
            <Text
              textAlign={['flex-start', 'flex-start', 'center']}
              mt={10}
              fontSize="14px"
            >
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

export default Footer;
