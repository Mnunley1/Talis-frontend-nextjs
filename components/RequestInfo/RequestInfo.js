import {
  Box,
  Button,
  Container,
  Flex,
  FormLabel,
  Image,
  Input,
  Text,
  SimpleGrid,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  VStack,
  Center,
  Textarea,
} from '@chakra-ui/react';

function RequestInfo() {
  return (
    <VStack spacing={2} align="stretch">
      <Box>
        <Input id="name" placeholder="Name" borderColor="black" />
      </Box>
      <Box>
        <Input id="phone" placeholder="Phone number" borderColor="black" />
      </Box>
      <Box>
        <Input id="email" placeholder="Email" borderColor="black" />
      </Box>
      <Box>
        <Textarea placeholder="Enter message" borderColor="black" />
      </Box>
      <Box>
        <Button colorScheme="teal" size="lg" isFullWidth>
          Request Info
        </Button>
      </Box>
    </VStack>
  );
}

export default RequestInfo;
