import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../../contexts/AuthContext';
import { db, storage } from '../../../firebase';
import Footer from '../../../components/Footer/Footer';
import Navbar from '../../../components/Navbar/Navbar';
import ListingGallery from '../../../components/ListingGallery/ListingGallery';
import RequestInfo from '../../../components/RequestInfo/RequestInfo';
import FavoriteButton from '../../../components/FavoriteButton/FavoriteButton';
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  Icon,
  Image,
  List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,
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
import { FaRegCheckCircle } from 'react-icons/fa';

export default function Listing() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const { currentUser } = useAuth();
  const { id } = router.query;
  const [listing, setListing] = useState([]);
  const [communityFeatures, setCommunityFeatures] = useState([]);
  const [listingFeatures, setListingFeatures] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [images, setImages] = useState([]);

  const getUserFavorites = () => {
    if (currentUser) {
      var docRef = db.collection('users').where('id', '==', currentUser.uid);
      console.log(docRef);

      docRef
        .get()
        .then((querySnapshot) => {
          const items = [];
          querySnapshot.forEach(function (doc) {
            // doc.data() is never undefined for query doc snapshots
            const data = doc.data().favoriteListings;
            console.log(data);
            data.map((item) => items.push(item));
            //items.push(data);
          });
          setFavorites(items);
        })
        .catch(function (error) {
          console.log('Error getting documents: ', error);
        });
    }
  };

  useEffect(() => {
    var docRef = db.collection('fl_content').doc(id);

    docRef
      .get()
      .then((doc) => {
        const items = [];
        if (doc.exists) {
          const data = doc.data();
          console.log(data);
          setListing(data);
          setListingFeatures(data.listingFeatures);
          setCommunityFeatures(data.communityFeatures);
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

  useEffect(() => {
    if (currentUser) {
      getUserFavorites();
    }
  }, []);

  console.log(listingFeatures);
  console.log(listing);
  return (
    <div>
      <Navbar />
      <Container maxW="lg" px={[0, 5]}>
        <Box as="section" color="white" h="100%" w="100%" mt="64px">
          <ListingGallery images={images} />
        </Box>
        <Box as="section" w="100%" p={5}>
          <HStack direction="row" align="start" color="black">
            <Box w={['100%', '100%', '60%']}>
              <Text fontSize="4xl" fontWeight="700">
                <HStack>
                  <Box>{listing.title}</Box>
                  <Spacer />
                  <Box fontSize="3xl">
                    <FavoriteButton
                      listingID={id}
                      favorites={favorites}
                      getUserFavorites={getUserFavorites}
                    />
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
                  Listing Features
                </Text>
                <List spacing={3}>
                  {listingFeatures.map((item) => {
                    return (
                      <ListItem>
                        <ListIcon as={FaRegCheckCircle} color="teal.500" />
                        {item}
                      </ListItem>
                    );
                  })}
                </List>
              </Box>
              <Box mt={8}>
                <Text fontSize="xl" fontWeight="700">
                  Community Features
                </Text>
                <List spacing={3}>
                  {communityFeatures.map((item, i) => {
                    return (
                      <ListItem key={i}>
                        <ListIcon as={FaRegCheckCircle} color="teal.500" />
                        {item}
                      </ListItem>
                    );
                  })}
                </List>
              </Box>
            </Box>
            <Box
              w="40%"
              display={['none', 'none', 'inline-block']}
              boxShadow="lg"
              rounded="lg"
              border="1px"
              borderColor="gray.200"
              p={5}
              ml={5}
            >
              <RequestInfo />
            </Box>
          </HStack>
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
            <RequestInfo onClose={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
}
