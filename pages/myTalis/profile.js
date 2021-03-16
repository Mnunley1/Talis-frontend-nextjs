import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
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
  HStack,
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
  Spacer,
  StackDivider,
  Stack,
  VStack,
} from '@chakra-ui/react';

export default function profilePage() {
  const router = useRouter();
  const { register, handleSubmit, watch, errors } = useForm();
  const { currentUser, updateEmail, updatePassword } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!currentUser) {
      router.push('/account/login');
    } else {
      setLoading(false);
    }
  }, [currentUser]);

  async function onInfoSubmit(data) {
    try {
      setError('');
      //setLoading(true);
      await currentUser.updateProfile({ displayName: data.name });
      alert(currentUser.displayName);
    } catch (error) {
      setError(error.message);
      alert(error);
    }
  }

  async function onEmailSubmit(data) {
    try {
      setError('');
      //setLoading(true);
      await updateEmail(data.email);
    } catch (error) {
      setError(error.message);
    }

    //setLoading(false);
  }

  async function onPasswordSubmit(data) {
    if (data.newPassword === data.confirmPassword) {
      try {
        setError('');
        //setLoading(true);
        await updatePassword(data.newPassword);
      } catch (error) {
        setError(error.message);
      }
    }
    setError('Passwords do not match');
    alert(error);
    //setLoading(false);
  }

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
                  <VStack spacing={5} align="stretch">
                    <Box>
                      <form onSubmit={handleSubmit(onInfoSubmit)}>
                        <Text fontSize="xl">Edit User Info</Text>
                        <VStack align="stretch" spacing={2}>
                          <Box>
                            <Input
                              color="black"
                              bg="white"
                              name="name"
                              defaultValue={currentUser.displayName}
                              placeholder="Enter name"
                              ref={register}
                            />
                          </Box>
                          <Button
                            w="25%"
                            size="sm"
                            variant="solid"
                            colorScheme="teal"
                            type="submit"
                          >
                            Save
                          </Button>
                        </VStack>
                      </form>
                    </Box>

                    <Box>
                      <form onSubmit={handleSubmit(onEmailSubmit)}>
                        <Text fontSize="xl">Update Email</Text>
                        <VStack align="stretch" spacing={2}>
                          <Box>
                            <Input
                              color="black"
                              bg="white"
                              name="email"
                              defaultValue={currentUser.email}
                              placeholder="Enter email"
                              ref={register}
                            />
                          </Box>
                          <Button
                            w="25%"
                            size="sm"
                            variant="solid"
                            colorScheme="teal"
                          >
                            Save
                          </Button>
                        </VStack>
                      </form>
                    </Box>

                    <Box>
                      <form onSubmit={handleSubmit(onPasswordSubmit)}>
                        <Text fontSize="xl">Change Password</Text>
                        <VStack align="stretch" spacing={2}>
                          <Box>
                            <Input
                              bg="white"
                              name="newPassword"
                              placeholder="Enter new password"
                              ref={register}
                            />
                          </Box>
                          <Box>
                            <Input
                              bg="white"
                              name="confirmPassword"
                              placeholder="Confirm new password"
                              ref={register}
                            />
                          </Box>
                          <Button
                            w="25%"
                            size="sm"
                            variant="solid"
                            colorScheme="teal"
                            type="submit"
                          >
                            Save
                          </Button>
                        </VStack>
                      </form>
                    </Box>
                  </VStack>
                </Box>
              </Flex>
            </Box>{' '}
          </>
        )}
      </Flex>
    </div>
  );
}
