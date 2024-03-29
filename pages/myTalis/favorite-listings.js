import { useEffect, useState } from 'react';
import { withRouter } from 'next/router';
import { db } from '../../firebase';
import { useAuth } from '../../contexts/AuthContext';
import { useRouter } from 'next/router';
import Navbar from '../../components/Navbar/Navbar';
import ListingCards from '../../components/ListingCards/ListingCards';
import {
  Box,
  Center,
  Divider,
  Flex,
  Text,
  SimpleGrid,
  Spinner,
  StackDivider,
  VStack,
} from '@chakra-ui/react';

export default function favavoritesPage() {
  const router = useRouter();
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState([]);
  const [favorites, setFavorites] = useState([]);

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

  const setFavoriteListings = () => {
    const id = currentUser.uid;
    var docRef = db.collection('users').doc(id);

    docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          Promise.all(
            doc.data().favoriteListings.map((item) => {
              return db
                .collection('fl_content')
                .doc(`${item}`)
                .get()
                .then((doc) => doc.data());
            })
          ).then((items) => setListings(items));
        } else {
          // doc.data() will be undefined in this case
          console.log('No such document!');
        }
      })
      .catch((error) => {
        console.log('Error getting document:', error);
      });
  };

  useEffect(() => {
    if (!currentUser) {
      router.push('/account/login');
    } else {
      setFavoriteListings();
      getUserFavorites();
      setLoading(false);
    }
  }, []);
  console.log(favorites);
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
                <Box as="a" href="/myTalis/profile">
                  <Text fontSize="lg">Profile</Text>
                </Box>
                <Box as="a" href="/myTalis/favorite-listings">
                  <Text fontSize="lg">Favorite Listings</Text>
                </Box>
              </VStack>
            </Box>
            <Box
              as="container"
              w={['100%', '100%', '75%']}
              bg="gray.200"
              p={5}
              overflowY="auto"
            >
              <Text fontSize="3xl">Favorite Listings</Text>
              <Divider borderColor="black" />
              <Flex color="black">
                <Box w="100%" pt={5}>
                  {favorites ? (
                    <SimpleGrid columns={[1, 1, 2, 4]} spacing={2}>
                      <ListingCards
                        getUserFavorites={getUserFavorites}
                        favorites={favorites}
                        listings={listings}
                      />
                    </SimpleGrid>
                  ) : (
                    <Text>You have not saved any properties</Text>
                  )}
                </Box>
              </Flex>
            </Box>
          </>
        )}
      </Flex>
    </div>
  );
}
