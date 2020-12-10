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
import ReactHorizontalDatePicker from 'react-horizontal-strip-datepicker';

function ScheduleTour() {
  const onSelectedDay = (d) => {
    console.log(d);
  };

  return (
    <VStack spacing={2} align="stretch">
      <ReactHorizontalDatePicker
        selectedDay={onSelectedDay}
        enableScroll={true}
        enableDays={8}
      />
      <Box></Box>
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
        <Button colorScheme="teal" size="lg" isFullWidth>
          Schedule Tour
        </Button>
      </Box>
    </VStack>
  );
}

export default ScheduleTour;
