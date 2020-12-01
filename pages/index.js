import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Modal from 'react-modal';
import axios from 'axios';
import headerImg from '../public/images/showcaseimage.jpg';
import cardImg1 from '../public/images/blackfam.jpg';
import cardImg2 from '../public/images/Kitchen.jpg';
import cardImg3 from '../public/images/familymovingin.jpg';
//import ListingCards from '../components/ListingCards/ListingCards';
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
} from '@chakra-ui/react';
import { FaSearch } from 'react-icons/fa';

export default function HomeView() {
  const router = useRouter();
  const [listings, setListings] = useState([]);

  /* useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/pages/').then((res) => {
      setListings(res.data);
      console.log(res.data);
    });
  }, []);
 */

  return (
    <>
      {/* <Header /> */}
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
            <Text fontSize="6xl">FIND YOUR NEW HOME</Text>
            <Box width="80%">
              <InputGroup size="lg">
                <Input
                  variant="outline"
                  borderRadius="5px"
                  placeholder="Search"
                  color="black"
                  backgroundColor="white"
                />
                <InputRightAddon
                  border="0"
                  bg="teal.500"
                  children={<FaSearch color="white" />}
                />
              </InputGroup>
            </Box>
          </VStack>
        </Center>
      </Box>
      <Box as="section" paddingY="60px">
        <Container maxW="lg" centerContent>
          <VStack spacing={10}>
            <Text fontSize="3xl">Latest Listings</Text>
            <Button colorScheme="teal" size="md">
              Button
            </Button>
          </VStack>
        </Container>
      </Box>
      <Box as="section" paddingY="60px">
        <Container maxW="md" centerContent>
          <SimpleGrid columns={2}>
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
      {/* <Container className={classes.heroSection} maxWidth="false">
        <Grid direction="row" align="center" spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h2">Find Your New Home</Typography>
          </Grid>
          <Grid item container direction="row" spacing={1} xs={6}>
            <Grid item xs={10}>
              <TextField
                className={classes.searchBar}
                id="outlined-search"
                placeholder="Search Neighborhood"
                type="search"
                variant="outlined"
                color="white"
              />
            </Grid>
            <Grid item xs={2}>
              <Button
                style={{ width: '100%', height: '100%' }}
                variant="contained"
                color="primary"
                href="/listings"
              >
                Search
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Container>

      <Container className={classes.sectionPadding} maxWidth="lg">
        <Grid container direction="column" align="center" spacing={4}>
          <Grid item xs={12}>
            <Typography variant="h4">Latest Listings</Typography>
          </Grid>
          <Grid item>
            <ListingCards data={listings} />
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary" href="/listings">
              View More
            </Button>
          </Grid>
        </Grid>
      </Container>

      <Container className={classes.sectionPadding} maxWidth="md">
        <Grid
          style={{ backgroundColor: '#D9D9D9' }}
          container
          direction="row"
          xs={12}
          spacing={0}
        >
          <Grid
            className={classes.displayText}
            item
            xs={12}
            md={6}
            align="start"
          >
            <Typography variant="h6">
              Helping You Find the Perfect Fit
            </Typography>
            <Typography variant="p">
              orem ipsum dolor sit amet consectetur adipisicing elit. Incidunt,
              debitis nam!
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Container disableGutters maxWidth="false">
              <img
                src={cardImg1}
                alt="Family enjoying new home"
                style={{ width: '100%', height: 'auto' }}
              />
            </Container>
          </Grid>
        </Grid>
        <Grid
          style={{ backgroundColor: '#D9D9D9' }}
          container
          direction="row"
          xs={12}
          spacing={0}
        >
          <Grid item xs={12} md={6}>
            <Container disableGutters maxWidth="false">
              <img
                src={cardImg2}
                alt="Modern styled kitchen"
                style={{ width: '100%', height: 'auto' }}
              />
            </Container>
          </Grid>
          <Grid
            className={classes.displayText}
            item
            xs={12}
            md={6}
            align="start"
          >
            <Typography variant="h6">Luxury at the Right Price</Typography>
            <Typography variant="p">
              orem ipsum dolor sit amet consectetur adipisicing elit. Incidunt,
              debitis nam!
            </Typography>
          </Grid>
        </Grid>
        <Grid
          style={{ backgroundColor: '#D9D9D9' }}
          container
          direction="row"
          xs={12}
          spacing={0}
        >
          <Grid
            className={classes.displayText}
            item
            xs={12}
            md={6}
            align="start"
          >
            <Typography variant="h6">
              Helping Investors Maximize Occupancy
            </Typography>
            <Typography variant="p">
              orem ipsum dolor sit amet consectetur adipisicing elit. Incidunt,
              debitis nam!
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Container disableGutters maxWidth="false">
              <img
                src={cardImg3}
                alt="Family moving into new home"
                style={{ width: '100%', height: 'auto' }}
              />
            </Container>
          </Grid>
        </Grid>
      </Container>

      <Container className={classes.sectionPadding} maxWidth="md">
        <Grid container xs={12} direction="row" align="center">
          <Typography variant="h6">
            Search hundreds of listings including apartments, houses, condos and
            townhomes available for rent in Accra. You'll find your next home in
            any style you prefer.
          </Typography>
        </Grid>
      </Container>
      <Footer /> */}
    </>
  );
}
