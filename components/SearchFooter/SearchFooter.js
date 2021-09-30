import React from 'react';
import Image from 'next/image';
import {
  Box,
  Button,
  Container,
  Divider,
  Flex,
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
            <Image width={100} height={35} src={TalisLogo} alt="Talis Logo" />
            <Text textAlign="flex-start" fontSize="sm">
              We want to make finding a home in Ghana seamless, transparent and
              enjoyable
            </Text>
          </VStack>

          <VStack w="100%" spacing={1} align="flex-start">
            <Link
              href={{
                pathname: '/listings/search',
                query: { query: 'Airport', page: 1 },
              }}
            >
              Airport
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
                query: { query: 'East Lagon', page: 1 },
              }}
            >
              East Lagon
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
                query: { query: 'Roman Ridge', page: 1 },
              }}
            >
              Roman Ridge
            </Link>
          </VStack>

          <VStack w="100%" align="flex-start">
            <Box textAlign="flex-start" fontSize="14px">
              <Text fontSize="sm">Location</Text>
              <Text fontSize="sm">8 Sir Arku Korsah Rd</Text>
              <Text fontSize="sm">Airport, Accra, Ghana</Text>
              <Text fontSize="sm">info@talisafrica.com</Text>
            </Box>
          </VStack>
        </SimpleGrid>
        <Divider mt={5} />
        <Text fontSize="sm">
          Copyright &copy; <span className="year"></span> Talis Africa{' '}
          {new Date().getFullYear()}
        </Text>
      </Container>
    </Box>
  );
}

export default SearchFooter;
