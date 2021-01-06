import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { db, storage } from '../../../firebase';
import Footer from '../../../components/Footer/Footer';
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
  HStack,
  Icon,
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
import { FaRulerCombined } from 'react-icons/fa';
import { FaBath } from 'react-icons/fa';
import { FaBed } from 'react-icons/fa';

export default function Listing() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const { id } = router.query;
  const [listing, setListing] = useState([]);
  const [images, setImages] = useState([]);
  //console.log(id);

  useEffect(() => {
    var docRef = db.collection('fl_content').doc(id);

    docRef
      .get()
      .then((doc) => {
        const items = [];
        if (doc.exists) {
          setListing(doc.data());
          //console.log(doc.data().listingImages);
          doc.data().listingImages.forEach((item) => {
            //items.push(item.path);
            db.doc(`${item.path}`)
              .get()
              .then((doc) => {
                var fileName = doc.data().file;
                storage
                  .ref('flamelink/media/' + fileName)
                  .getDownloadURL()
                  .then((url) => {
                    items.push({ original: url });
                    setImages(items);
                  });
              });
          });
        } else {
          // doc.data() will be undefined in this case
          console.log('No such document!');
        }
      })
      .catch((error) => {
        console.log('Error getting document:', error);
      });
  }, []);

  console.log(images.length);
  console.log(images);
  return (
    <div>
      <Navbar />
      <Container maxW="lg" px={[0, 5]}>
        <Box as="section" color="white" h="100%" w="100%" mt="64px">
          <ListingGallery images={images} />
        </Box>
        <Box as="section" w="100%" p={5}>
          <Flex color="black">
            <Box w={['100%', '100%', '60%']}>
              <Text fontSize="4xl" fontWeight="700">
                <HStack>
                  <Box>{listing.title}</Box>
                  <Spacer />
                  <Box fontSize="3xl">
                    {listing.price}{' '}
                    <Box
                      as="span"
                      color="#4e4e4e"
                      fontWeight="normal"
                      letterSpacing="wide"
                      fontSize="xs"
                      textTransform="uppercase"
                    >
                      / month
                    </Box>
                  </Box>
                </HStack>
              </Text>
              <Box fontSize="lg" fontWeight="300">
                {listing.address} | {listing.neighborhood}
              </Box>
              <Box fontSize="lg" fontWeight="300" mt={5} color="#4e4e4e">
                <Icon as={FaBed} w={4} h={4} mr={2} />
                {listing.bedrooms} Beds
                <Icon as={FaBath} w={4} h={4} mx={2} />
                {listing.bathrooms} Baths
                <Icon as={FaRulerCombined} w={4} h={4} mx={2} />
                {listing.squareFeet} sqm
              </Box>

              <Box mt={8}>
                <Text fontSize="xl" fontWeight="700">
                  Description
                </Text>
                <Box fontSize="lg" fontWeight="300">
                  {listing.description}
                </Box>
              </Box>
              <Box mt={8}>
                <Text fontSize="xl" fontWeight="700">
                  Listing Details
                </Text>
              </Box>
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
      <Box mb={['54px', '54px', '0']}>
        <Footer />
      </Box>

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
