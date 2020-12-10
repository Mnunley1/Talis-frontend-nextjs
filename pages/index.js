import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { db } from '../firebase';
import Modal from 'react-modal';
import axios from 'axios';
import headerImg from '../public/images/showcaseimage.jpg';
import cardImg1 from '../public/images/blackfam.jpg';
import cardImg2 from '../public/images/Kitchen.jpg';
import cardImg3 from '../public/images/familymovingin.jpg';
import ListingCards from '../components/ListingCards/ListingCards';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
//import Button from '@material-ui/core/Button';
import {
  Box,
  Button,
  Center,
  Container,
  Image,
  Input,
  InputGroup,
  InputRightAddon,
  Text,
  SimpleGrid,
  VStack,
  Wrap,
} from '@chakra-ui/react';
import { FaSearch } from 'react-icons/fa';

export default function HomeView() {
  const { register, handleSubmit, watch, errors } = useForm();
  const router = useRouter();
  const [listings, setListings] = useState([]);

  useEffect(() => {
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
      })
      .catch((error) => console.log(error));
  }, []);

  const onSubmit = (data) =>
    router.push({
      pathname: '/listings/search',
      query: { query: data.search, page: 1 },
    });

  console.log(listings);

  return (
    <>
      <Navbar />
      <Box
        as="section"
        bgImage={`linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),url("${headerImg}")`}
        bgRepeat="no-repeat"
        bgPosition="center center"
        bgSize="cover"
        color="white"
        height="60vh"
        mt="80px"
      >
        <Center marginY="auto" height="100%">
          <VStack>
            <Text fontSize="6xl" textAlign="center">
              FIND YOUR NEW HOME
            </Text>
            <Box width="80%">
              <form onSubmit={handleSubmit(onSubmit)}>
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
            </Box>
          </VStack>
        </Center>
      </Box>
      <Box as="section" paddingY="60px">
        <Container maxW="lg" centerContent>
          <VStack spacing={8}>
            <Text fontSize="3xl">Latest Listings</Text>
            <SimpleGrid columns={[1, 1, 2, 4]} spacing={3}>
              <ListingCards data={listings} />
            </SimpleGrid>
            <Button as="a" href="/listings/search" colorScheme="teal" size="md">
              View More
            </Button>
          </VStack>
        </Container>
      </Box>
      <Box as="section" paddingY="60px">
        <Container maxW="lg" centerContent>
          <SimpleGrid columns={[1, 1, 2]}>
            <Box bgColor="gray.100" height="auto" width="100%" padding={10}>
              <VStack>
                <Text fontSize="md" alignSelf="start">
                  Helping You Find the Perfect Fit
                </Text>
                <Text fontSize="sm" align="start">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Incidunt, debitis nam!
                </Text>
              </VStack>
            </Box>
            <Box bgColor="gray.100">
              <Image
                src={cardImg1}
                alt="Segun Adebayo"
                height="auto"
                width="100%"
              />
            </Box>
            <Box bgColor="gray.100">
              <Image
                src={cardImg2}
                alt="Segun Adebayo"
                height="auto"
                width="100%"
              />
            </Box>
            <Box bgColor="gray.100" height="auto" width="100%" padding={10}>
              <VStack>
                <Text fontSize="md" alignSelf="start">
                  Helping You Find the Perfect Fit
                </Text>
                <Text fontSize="sm" align="start">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Incidunt, debitis nam!
                </Text>
              </VStack>
            </Box>
            <Box bgColor="gray.100" height="auto" width="100%" padding={10}>
              <VStack>
                <Text fontSize="md" alignSelf="start">
                  Helping You Find the Perfect Fit
                </Text>
                <Text fontSize="sm" align="start">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Incidunt, debitis nam!
                </Text>
              </VStack>
            </Box>
            <Box bgColor="gray.100">
              <Image
                src={cardImg3}
                alt="Segun Adebayo"
                height="auto"
                width="100%"
              />
            </Box>
          </SimpleGrid>
        </Container>
      </Box>
      <Box as="section" paddingY="60px">
        <Container maxW="md" centerContent>
          <Text fontSize="xl" align="center">
            Search hundreds of listings including apartments, houses, condos and
            townhomes available for rent in Accra. You'll find your next home in
            any style you prefer.
          </Text>
        </Container>
      </Box>
      <Footer />
    </>
  );
}
