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
  StackDivider,
  Stack,
  VStack,
} from '@chakra-ui/react';

export default function HomeView() {
  return (
    <div>
      <Navbar />
      <Flex style={{ marginTop: '80px', height: 'calc(100vh - 80px )' }}>
        <Box as="container" w="25%" bg="white" p={5}>
          <VStack
            divider={<StackDivider borderColor="gray.200" />}
            spacing={3}
            align="center"
          >
            <Box>
              <Text fontSize="lg">Welcome User!</Text>
            </Box>
            <Box as="a" href="/myTalis/profile">
              <Text fontSize="lg">Profile</Text>
            </Box>
            <Box as="a" href="/myTalis/favorite-listings">
              <Text fontSize="lg">Favorite Listings</Text>
            </Box>
          </VStack>
        </Box>
        <Box as="container" w="75%" bg="gray.100" p={5} overflowY="auto">
          <Text fontSize="3xl">Favorite Listings</Text>
          <Divider borderColor="black" />
          <Flex color="black">
            <Box w="100%" pt={5}>
              <Text>You have not saved any properties</Text>
            </Box>
          </Flex>
        </Box>
      </Flex>
    </div>
  );
}
