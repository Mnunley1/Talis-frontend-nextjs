import dynamic from 'next/dynamic';
import aboutImg1 from '../public/images/office-image.jpg';
import businessman1 from '../public/images/businessman1.jpg';
import businessman2 from '../public/images/businessman2.jpg';
import businessman3 from '../public/images/businessman3.jpg';
import Footer from '../components/Footer/Footer';
import Navbar from '../components/Navbar/Navbar';
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Image,
  Text,
  SimpleGrid,
  Spacer,
  VStack,
  Center,
} from '@chakra-ui/react';

const Map = dynamic(() => import('../components/Map/Map'), { ssr: false });

export default function HomeView() {
  return (
    <div>
      <Navbar />
      <Box
        as="section"
        position="relative"
        color="white"
        height="60vh"
        mt="80px"
      >
        <video
          autoPlay
          muted
          loop
          preload
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: '-1',
          }}
        >
          <source
            src="https://res.cloudinary.com/talis-property-management/video/upload/v1606326919/heroVideo_timrcm.mp4"
            type="video/mp4"
          />
        </video>
        <Box
          as="overlay"
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
          <Center w="70%" h="100%" margin="auto">
            <VStack>
              <Text fontSize="6xl" fontWeight="700" textAlign="center" mb={-5}>
                About Talis
              </Text>
              <Text fontSize="3xl" textAlign="center">
                Committed to serving renters and property owners
              </Text>
            </VStack>
          </Center>
        </Box>
      </Box>

      <Box as="section" paddingY="60px">
        <Container maxW="lg" centerContent>
          <SimpleGrid columns={[1, 1, 2]} spacing={10}>
            <Box>
              <Image src={aboutImg1} height="auto" width="100%" />
            </Box>
            <Box height="auto" width="100%" p={0}>
              <Heading as="h5" size="lg">
                Talis
              </Heading>
              <Text fontWeight="300">
                Talis Africa is a real estate and rental marketplace dedicated
                to empowering consumers with industry leading data, inspiration
                and knowledge while connecting users with local experts.
              </Text>
              <br />
              <Text fontWeight="300">
                At Talis we go beyond the typical listings, by sourcing insights
                straight from locals and offering neighborhood information, to
                give people a deeper understanding of what living in a home and
                neighborhood is really like. We're committed to helping them
                discover a place where they will love to live and where they
                will feel more connected to the community and to each other.
                It's why we strive every day to help build a more neighborly
                world.
              </Text>
            </Box>
          </SimpleGrid>
        </Container>
      </Box>

      <Box as="section" paddingY="60px">
        <Container maxW="lg" centerContent>
          <Heading as="h5" size="lg" mb={5}>
            Talis Leadership
          </Heading>
          <SimpleGrid columns={[1, 1, 3]} spacing={5}>
            <Box
              maxW="100%"
              borderWidth="1px"
              borderColor="lightgray.100"
              borderRadius="xl"
              overflow="hidden"
            >
              <Image
                src={businessman1}
                height="250px"
                width="100%"
                objectFit="cover"
              />
              <Box p="6">
                <Box fontWeight="semibold" alignItems="baseline">
                  Micahel Smith
                </Box>
                <Box mt="1" as="h4" lineHeight="tight" isTruncated>
                  Chief Executive Officer
                </Box>
              </Box>
            </Box>
            <Box
              maxW="100%"
              borderWidth="1px"
              borderColor="lightgray.100"
              borderRadius="xl"
              overflow="hidden"
            >
              <Image
                src={businessman2}
                height="250px"
                width="100%"
                objectFit="cover"
              />
              <Box p="6">
                <Box fontWeight="semibold" alignItems="baseline">
                  Micahel Smith
                </Box>
                <Box mt="1" as="h4" lineHeight="tight" isTruncated>
                  Chief Executive Officer
                </Box>
              </Box>
            </Box>
            <Box
              maxW="100%"
              borderWidth="1px"
              borderColor="lightgray.100"
              borderRadius="xl"
              overflow="hidden"
            >
              <Image
                src={businessman3}
                height="250px"
                width="100%"
                objectFit="cover"
              />
              <Box p="6">
                <Box fontWeight="semibold" alignItems="baseline">
                  Micahel Smith
                </Box>
                <Box mt="1" as="h4" lineHeight="tight" isTruncated>
                  Chief Executive Officer
                </Box>
              </Box>
            </Box>
          </SimpleGrid>
        </Container>
      </Box>

      <Box as="section" paddingY="60px">
        <Container maxW="lg" centerContent>
          <SimpleGrid columns={[1, 1, 2]} spacing={10}>
            <Box>
              <Map />
            </Box>
            <Box height="auto" width="100%">
              <Heading as="h5" size="lg">
                Talis Office
              </Heading>
              <Text fontWeight="300">
                Talis Africa Headquarters 8 Sir Arku Korsah Rd. Accra, Ghana
              </Text>
              <br />
              <Text fontWeight="300">
                Trulia, founded in Accra, remains nestled in the heart of the
                city. Minutes away from the Kotoka International Airport, Talis
                get to enjoy a state-of-the-art office building.
              </Text>
              <br />
              <Text fontWeight="300">
                Press & Media Inquiries: PR@Talisafrica.com
              </Text>
            </Box>
          </SimpleGrid>
        </Container>
      </Box>
      <Footer />
    </div>
  );
}
