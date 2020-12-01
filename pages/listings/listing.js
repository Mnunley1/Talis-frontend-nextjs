import { useRef } from 'react';
import dynamic from 'next/dynamic';
/* import aboutImg1 from '../public/images/office-image.jpg';
import businessman1 from '../public/images/businessman1.jpg';
import businessman2 from '../public/images/businessman2.jpg';
import businessman3 from '../public/images/businessman3.jpg'; */
import Navbar from '../../components/Navbar/Navbar';
import ListingGallery from '../../components/ListingGallery/ListingGallery';
import RequestInfo from '../../components/RequestInfo/RequestInfo';
import ScheduleTour from '../../components/ScheduleTour/ScheduleTour';
import {
  Box,
  Button,
  Container,
  Flex,
  Image,
  Text,
  SimpleGrid,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  VStack,
  Center,
} from '@chakra-ui/react';

export default function listing() {
  return (
    <div>
      <Navbar />
      <Container maxW="lg">
        <Box as="section" color="white" h="100%" w="100%" mt="80px">
          <ListingGallery />
        </Box>
        <Box as="section" w="100%" p={7}>
          <Flex color="black">
            <Box w="60%">
              <VStack spacing={4} align="stretch">
                <Box h="40px">
                  <Text fontSize="3xl">Liting Title</Text>
                </Box>
                <Box h="40px">Listing Address</Box>
                <Box h="40px">Listing Info</Box>
                <Box h="40px">Listing Description</Box>
              </VStack>
            </Box>
            <Box
              w="40%"
              border="1px"
              borderColor="gray.100"
              borderRadius="5px"
              p={2}
            >
              <Tabs isFitted variant="enclosed">
                <TabList>
                  <Tab>Request Info</Tab>
                  <Tab>Schedule A Tour</Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>
                    <RequestInfo />
                  </TabPanel>
                  <TabPanel>
                    <ScheduleTour />
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </Box>
          </Flex>
        </Box>
      </Container>
    </div>
  );
}
