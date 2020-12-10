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
            <Text fontSize="6xl" textAlign="center">
              TALIS IS A LEADER IN REAL ESTATE
            </Text>
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
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                vestibulum dolor massa. Etiam scelerisque luctus nisl ut
                dignissim. Donec elementum, urna sit amet ullamcorper viverra,
                tortor justo pellentesque orci, ac consectetur augue orci et
                risus. In nulla augue, laoreet vulputate arcu id, consequat
                volutpat tortor. Phasellus accumsan magna non commodo cursus.
                Aenean condimentum pretium augue. Nullam eget tincidunt lectus.
                In porttitor bibendum neque, eu auctor dolor tincidunt ut. Donec
                lacinia suscipit luctus.
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
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                vestibulum dolor massa. Etiam scelerisque luctus nisl ut
                dignissim. Donec elementum, urna sit amet ullamcorper viverra,
                tortor justo pellentesque orci, ac consectetur augue orci et
                risus. In nulla augue, laoreet vulputate arcu id, consequat
                volutpat tortor. Phasellus accumsan magna non commodo cursus.
                Aenean condimentum pretium augue. Nullam eget tincidunt lectus.
                In porttitor bibendum neque, eu auctor dolor tincidunt ut. Donec
                lacinia suscipit luctus.
              </Text>
            </Box>
          </SimpleGrid>
        </Container>
      </Box>
      <Footer />
    </div>
  );
}
