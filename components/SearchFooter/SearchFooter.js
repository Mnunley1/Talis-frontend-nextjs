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
import Link from 'next/link';

function SearchFooter() {
  return (
    <Box
      w="100%"
      position="relative"
      bottom="0"
      left="0"
      bg="#111111"
      color="#8C8C88"
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
              We want to make finding a home in Ghana seamless, transparent and
              enjoyable
            </Text>
          </VStack>

          <VStack w="100%" spacing={1} align="flex-start">
            <Link
              href={{
                pathname: '/listings/search',
                query: { query: 'airport', page: 1 },
              }}
            >
              Airport
            </Link>
            <Link
              href={{
                pathname: '/listings/search',
                query: { query: 'cantonments', page: 1 },
              }}
            >
              Cantonments
            </Link>
            <Link
              href={{
                pathname: '/listings/search',
                query: { query: 'Dzorwulu', page: 1 },
              }}
            >
              Dzorwulu
            </Link>
            <Link
              href={{
                pathname: '/listings/search',
                query: { query: 'east%20lagon', page: 1 },
              }}
            >
              East Legon
            </Link>
            <Link
              href={{
                pathname: '/listings/search',
                query: { query: 'Labone', page: 1 },
              }}
            >
              Labone
            </Link>
            <Link
              href={{
                pathname: '/listings/search',
                query: { query: 'roman%20ridge', page: 1 },
              }}
            >
              Roman Ridge
            </Link>
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
