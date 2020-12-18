import { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import { useRouter } from 'next/router';
import { useAuth } from '../../contexts/AuthContext';
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
              bg="gray.100"
              p={5}
              overflowY="auto"
            >
              <Text fontSize="3xl">Profile</Text>
              <Divider borderColor="black" />
              <Flex color="black" flexWrap="wrap">
                <Box w={['100%', '30%']} py={[3, 5]} pr={5}>
                  <Text>Who can see my profile?</Text>
                  <Text>
                    Your profile is private. Any information stored here will
                    only be seen by you.
                  </Text>
                </Box>
                <Box w={['100%', '70%']} py={5} pl={[0, 5]}>
                  <Stack spacing="24px">
                    <Box>
                      <FormLabel htmlFor="username">Email</FormLabel>
                      <Text>test@email.com</Text>
                    </Box>
                    <Box>
                      <FormLabel htmlFor="username">Password</FormLabel>
                      <Text>********</Text>
                    </Box>
                    <Box>
                      <FormLabel htmlFor="username">Name</FormLabel>
                      <Input
                        id="username"
                        placeholder="Please enter your name"
                        borderColor="black"
                      />
                    </Box>
                    <Box>
                      <FormLabel htmlFor="username">Phone Number</FormLabel>
                      <Input
                        id="username"
                        placeholder="Please enter your number"
                        borderColor="black"
                      />
                    </Box>
                    <Box>
                      <FormLabel htmlFor="username">Location</FormLabel>
                      <Input
                        id="username"
                        placeholder="Accra, Chana"
                        borderColor="black"
                      />
                    </Box>
                  </Stack>
                </Box>
              </Flex>
              <Divider borderColor="black" />
            </Box>{' '}
          </>
        )}
      </Flex>
    </div>
  );
}
