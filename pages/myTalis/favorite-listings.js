import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useRouter } from 'next/router';
import Navbar from '../../components/Navbar/Navbar';
import {
  Box,
  Button,
  Center,
  Container,
  Divider,
  Flex,
  FormLabel,
  Image,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Text,
  Textarea,
  Select,
  SimpleGrid,
  Spinner,
  StackDivider,
  Stack,
  VStack,
} from '@chakra-ui/react';

export default function HomeView() {
  const router = useRouter();
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) {
      router.push('/account/login');
    } else {
      setLoading(false);
    }
  }, [currentUser]);

  return (
    <div>
      <Navbar />
      <Flex marginTop="64px" width="100%" height="calc(100vh - 64px )">
        {loading ? (
          <Box h="100%" width="100%">
            <Center h="100%">
              <VStack>
                <Text fontSize="5xl">Almost there...</Text>
                <Text fontSize="2xl">This may take a few moments</Text>
                <Spinner
                  thickness="5px"
                  speed="0.65s"
                  emptyColor="gray.200"
                  color="#00A3B0"
                  size="xl"
                />
              </VStack>
            </Center>
          </Box>
        ) : (
          <>
            <Box
              as="container"
              w="25%"
              bg="white"
              p={5}
              display={['none', 'none', 'block']}
            >
              <VStack
                divider={<StackDivider borderColor="gray.200" />}
                spacing={3}
                align="center"
              >
                <Box>
                  <Text fontSize="lg">Welcome User!</Text>
                </Box>
                <Box as="a" href="/MyTalis/profile">
                  <Text fontSize="lg">Profile</Text>
                </Box>
                <Box as="a" href="/MyTalis/favorite-listings">
                  <Text fontSize="lg">Favorite Listings</Text>
                </Box>
              </VStack>
            </Box>
            <Box
              as="container"
              w={['100%', '100%', '75%']}
              bg="gray.200"
              p={5}
              overflowY="auto"
            >
              <Text fontSize="3xl">Favorite Listings</Text>
              <Divider borderColor="black" />
              <Flex color="black">
                <Box w="100%" pt={5}>
                  <Text>You have not saved any properties</Text>
                </Box>
              </Flex>
            </Box>
          </>
        )}
      </Flex>
    </div>
  );
}
