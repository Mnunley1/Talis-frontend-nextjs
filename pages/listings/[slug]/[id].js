import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { db } from '../../../firebase';
import Navbar from '../../../components/Navbar/Navbar';
import ListingGallery from '../../../components/ListingGallery/ListingGallery';
import RequestInfo from '../../../components/RequestInfo/RequestInfo';
import ScheduleTour from '../../../components/ScheduleTour/ScheduleTour';
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  SimpleGrid,
  Spacer,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useDisclosure,
  VStack,
  Center,
} from '@chakra-ui/react';

export default function Listing() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const { id } = router.query;
  const [listing, setListing] = useState([]);
  console.log(id);

  useEffect(() => {
    var docRef = db.collection('fl_content').doc(id);

    docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          setListing(doc.data());
        } else {
          // doc.data() will be undefined in this case
          console.log('No such document!');
        }
      })
      .catch((error) => {
        console.log('Error getting document:', error);
      });
  }, []);
  console.log(listing);

  return (
    <div>
      <Navbar />
      <Container maxW="lg">
        <Box as="section" color="white" h="100%" w="100%" mt="80px">
          <ListingGallery />
        </Box>
        <Box as="section" w="100%" p={5}>
          <Flex color="black">
            <Box w={['100%', '100%', '60%']}>
              <VStack spacing={4} align="stretch">
                <Box h="40px">
                  <Heading size="2xl">{listing.title}</Heading>
                </Box>
                <Box h="40px">{listing.neighborhood}</Box>
                <Box h="40px">{listing.address}</Box>
                <Box h="40px">{listing.price}</Box>
                <Box h="40px">{listing.description}</Box>
              </VStack>
            </Box>
            <Box
              w="40%"
              display={['none', 'none', 'block']}
              boxShadow="lg"
              rounded="lg"
              border="1px"
              borderColor="gray.200"
              p={5}
              ml={5}
            >
              <RequestInfo />
            </Box>
          </Flex>
        </Box>
      </Container>
      <Box
        h="55px"
        position="fixed"
        bottom="0"
        backgroundColor="white"
        borderTop="1px"
        borderColor="gray.200"
        width="100%"
        display={['block', 'block', 'none']}
      >
        <Center h="100%">
          <Button colorScheme="teal" size="md" w="85%" onClick={onOpen}>
            Request Info
          </Button>
        </Center>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent mx={[2, 0]}>
          <ModalHeader>
            <ModalCloseButton />
          </ModalHeader>
          <ModalBody p={5}>
            <RequestInfo />
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
}
