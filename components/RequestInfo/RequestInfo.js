import {
  Box,
  Button,
  Checkbox,
  Input,
  Text,
  VStack,
  Textarea,
} from '@chakra-ui/react';

function RequestInfo() {
  return (
    <VStack spacing={2} align="stretch">
      <Box>
        <Text fontSize="2xl" textAlign="center">
          Contact Talis
        </Text>
      </Box>
      <Box>
        <Input id="name" placeholder="Name" borderColor="gray.200" />
      </Box>
      <Box>
        <Input id="phone" placeholder="Phone number" borderColor="gray.200" />
      </Box>
      <Box>
        <Input id="email" placeholder="Email" borderColor="gray.200" />
      </Box>
      <Box>
        <Textarea placeholder="Enter message" borderColor="gray.200" />
      </Box>
      <Box>
        <Checkbox size="md" colorScheme="teal">
          Request A Tour
        </Checkbox>
      </Box>
      <Box>
        <Button colorScheme="teal" size="lg" isFullWidth>
          Request Info
        </Button>
      </Box>
      <Box>
        <Text color="#4e4e4e" fontSize="xs">
          By pressing Request Info, you agree that Talis may contact you via
          phone/text about your inquiry, which may involve the use of automated
          means. You are not required to consent as a condition of purchasing
          any property, goods or services. Message/data rates may be applicable.
        </Text>
      </Box>
    </VStack>
  );
}

export default RequestInfo;
