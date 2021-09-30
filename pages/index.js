import React, { useState, useEffect, useLayoutEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { db } from '../firebase';
import qs from 'qs';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, Pagination, Stats } from 'react-instantsearch-dom';
//import headerImg from '../public/images/showcaseimage.jpg';
import cardImg1 from '../public/images/blackfam.jpg';
import cardImg2 from '../public/images/Kitchen.jpg';
import cardImg3 from '../public/images/familymovingin.jpg';
import headerImg from '../public/images/DJI_0458.png';
import ListingCards from '../components/ListingCards/ListingCards';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
//import Image from 'next/image';
import AutoComplete from '../components/AutoComplete/AutoComplete';
import {
  Box,
  Button,
  Center,
  Container,
  Image,
  Text,
  SimpleGrid,
  VStack,
} from '@chakra-ui/react';
import { FaSearch } from 'react-icons/fa';

const algoliaId = process.env.NEXT_PUBLIC_ALGOLIA_ID;
const searchKey = process.env.NEXT_PUBLIC_SEARCH_KEY;
const algoliaIndex = process.env.NEXT_PUBLIC_ALGOLIA_INDEX;
const searchClient = algoliasearch(algoliaId, searchKey);

const DEBOUNCE_TIME = 400;

const createURL = (state) => `?${qs.stringify(state)}`;

const searchStateToUrl = (router, searchState) =>
  searchState ? `${router.pathname}${createURL(searchState)}` : '';

const urlToSearchState = (router) => qs.parse(router.query);

export default function HomeView() {
  const { register, handleSubmit, watch, errors } = useForm();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState([]);
  const setStateId = React.useRef();
  const [searchState, setSearchState] = useState(urlToSearchState(router));

  function onSearchStateChange(nextSearchState) {
    clearTimeout(setStateId.current);

    setStateId.current = setTimeout(() => {
      //console.log('query [nextSearchState]:', nextSearchState);
      router.push({
        pathname: router.pathname,
        query: qs.stringify(nextSearchState),
      });
    }, DEBOUNCE_TIME);

    setSearchState(nextSearchState);
    //console.log(searchState);
  }

  useEffect(() => {
    console.log(loading);
    db.collection('fl_content')
      .where('_fl_meta_.schema', '==', 'listings')
      .limit(4)
      .get()
      .then((snapshot) => {
        const items = [];
        snapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          const data = doc.data();
          items.push(data);
        });
        setListings(items);
        setTimeout(() => setLoading(false), 4000);
      })
      .catch((error) => console.log(error));
  }, []);

  const onSubmit = (data) => {
    router.push({
      pathname: '/listings/search',
      query: { query: searchState, page: 1 },
    });
  };

  return (
    <>
      <Navbar />
      <Box
        as="section"
        //bgImage={`linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),url("${headerImg}")`}
        // bgRepeat="no-repeat"
        // bgPosition="center center"
        // bgSize="cover"
        position="relative"
        color="white"
        height={['60vh', '60vh']}
        minHeight={['60vh', '60vh']}
        mt="64px"
      >
        <video
          autoPlay
          src="https://res.cloudinary.com/talis-property-management/video/upload/v1617743209/The_Edge_-_Labone_-_Talis_Africa_qfexhh.mp4"
          type="video/mp4"
          muted
          loop
          playsInline
          preload="auto"
          poster={headerImg}
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: '-1',
          }}
        />
        <Box
          position="absolute"
          top="0"
          h="100%"
          w="100%"
          backgroundColor="black"
          opacity=".3"
        />
        <Box
          height="100%"
          position="absolute"
          top="0"
          w="100%"
          h="100%"
          zIndex={10}
          color="white"
        >
          <Center h="100%" w="100%">
            <VStack align="center" m={1}>
              <Text
                fontSize={['4xl', '6xl']}
                fontWeight="700"
                lineHeight={1}
                textAlign="center"
              >
                Find Your Next Home
              </Text>
              <Text fontSize="xl" textAlign="center">
                Let Talis help you find your next home with our user-friendly
                marketplace
              </Text>
              <Button
                as="a"
                href="/listings/search"
                colorScheme="teal"
                color="white"
                size="lg"
                variant="solid"
              >
                Search Listings
              </Button>
            </VStack>
          </Center>
        </Box>
        {/* <Center marginY="auto" height="100%">
          <VStack w="80%">
            <Text
              fontSize="5xl"
              fontWeight="700"
              textAlign="center"
              letterSpacing={-1}
              lineHeight={1}
              mb={6}
            >
              Discover your new home
            </Text>
            <Box width={['100%', '50%']}>
              <InstantSearch
                indexName={algoliaIndex}
                searchClient={searchClient}
                searchState={searchState}
                onSearchStateChange={onSearchStateChange}
                createURL={createURL}
              >
                <form onSubmit={handleSubmit(onSubmit)}>
                  <AutoComplete register={register} />
                  <InputGroup size="lg">
                  <Input
                    variant="outline"
                    borderRadius="5px"
                    placeholder="Search"
                    color="black"
                    backgroundColor="white"
                    name="search"
                    ref={register}
                  />
                  <InputRightAddon
                    as="button"
                    type="submit"
                    border="0"
                    bg="teal.500"
                    _hover={{
                      bg: 'teal.700',
                    }}
                    transition="background-color 0.15s ease 0s"
                    children={<FaSearch color="white" />}
                  />
                </InputGroup>
                </form>
              </InstantSearch>
            </Box>
          </VStack>
        </Center> */}
      </Box>

      <Box as="section" paddingY="60px">
        <Container maxW="container.lg" centerContent>
          <VStack spacing={8}>
            <Text
              fontSize="3xl"
              fontWeight="700"
              textAlign="center"
              letterSpacing={-1}
            >
              Latest Listings
            </Text>
            <SimpleGrid columns={[1, 1, 2, 4]} spacing={3}>
              <ListingCards listings={listings} loading={loading} />
            </SimpleGrid>
            <Button as="a" href="/listings/search" colorScheme="teal" size="md">
              View More
            </Button>
          </VStack>
        </Container>
      </Box>

      <Box as="section" paddingBottom="20px">
        <Container maxW="container.lg" centerContent>
          <SimpleGrid columns={[1, 1, 2]}>
            <Box
              bgColor="gray.100"
              height="auto"
              width="100%"
              padding={10}
              borderTopLeftRadius={['0', '0', '20px']}
            >
              <VStack>
                <Text
                  fontSize="lg"
                  alignSelf="start"
                  fontWeight="semibold"
                  as="h4"
                  lineHeight="tight"
                >
                  Renting Made Simple
                </Text>
                <Text fontSize="md" fontWeight="300" align="start">
                  Browse the highest quality listings, request a tour, apply
                  online, and more!
                </Text>
              </VStack>
            </Box>
            <Box order={[-1, -1, 'inherit']} height="auto" width="100%">
              <Image
                src="/images/blackfam.jpg"
                alt="Segun Adebayo"
                borderTopRightRadius="20px"
                borderTopLeftRadius={['20px', '20px', '0']}
              />
            </Box>
            <Box bgColor="gray.100" height="auto" width="100%">
              <Image src="/images/Kitchen.jpg" alt="Segun Adebayo" />
            </Box>
            <Box bgColor="gray.100" height="auto" width="100%" padding={10}>
              <VStack>
                <Text
                  fontSize="lg"
                  alignSelf="start"
                  fontWeight="semibold"
                  as="h4"
                  lineHeight="tight"
                >
                  Find Your Next Renter
                </Text>
                <Text fontSize="md" fontWeight="300" align="start">
                  Connect with renters both local and worldwide and lease your
                  property 100% online. Our platforms ease of use makes it the
                  most desired way for foreigners to shop premium properties.
                </Text>
              </VStack>
            </Box>
            <Box
              bgColor="gray.100"
              height="auto"
              width="100%"
              padding={10}
              order={[10, 10, 'inherit']}
              borderBottomRightRadius={['20px', '20px', '0']}
              borderBottomLeftRadius="20px"
            >
              <VStack>
                <Text
                  fontSize="lg"
                  alignSelf="start"
                  fontWeight="semibold"
                  as="h4"
                  lineHeight="tight"
                >
                  Tips For Renters
                </Text>
                <Text fontSize="md" fontWeight="300" align="start">
                  Find answers to all of your renting questions with a guide to
                  each of Accra’s neighborhoods and their associated perks.
                </Text>
              </VStack>
            </Box>
            <Box height="auto" width="100%">
              <Image
                src="/images/familymovingin.jpg"
                alt="Segun Adebayo"
                borderBottomRightRadius={['0', '0', '20px']}
              />
            </Box>
          </SimpleGrid>
        </Container>
      </Box>
      <Box as="section" paddingY="40px">
        <Container maxW="container.md" centerContent>
          <Text fontSize="2xl" align="center">
            We are constantly updating listings, so you will never miss out.
          </Text>
        </Container>
      </Box>
      <Footer />
    </>
  );
}
