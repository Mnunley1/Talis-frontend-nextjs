import { useRef } from 'react';
import Modal from 'react-modal';
import { Link as NextLink } from 'next/link';
import {
  Box,
  Button,
  Divider,
  Drawer,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  DrawerOverlay,
  Flex,
  Heading,
  IconButton,
  Image,
  Link,
  Spacer,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { FaBars } from 'react-icons/fa';
import TalisLogo from '../../public/images/navbar-logo.svg';
import TalisMenuLogo from '../../public/images/talis-marker.svg';

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      position="fixed"
      top="0"
      left="0"
      height="80px"
      width="100%"
      wrap="wrap"
      padding="1rem"
      bgColor="white"
      color="black"
      zIndex="500"
    >
      <Box as="a" href="/">
        <Image src={TalisLogo} height="30px" width="auto" />
      </Box>
      <Spacer />
      <IconButton
        ref={btnRef}
        bgColor="transparent"
        icon={<FaBars />}
        onClick={onOpen}
      />
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>
              <Image src={TalisMenuLogo} height="35px" width="auto" />
            </DrawerHeader>

            <DrawerBody>
              <VStack
                //divider={<StackDivider borderColor="gray.200" />}
                spacing={3}
                align="stretch"
              >
                <Box as="a" href="/">
                  <Button variant="ghost" colorScheme="teal" isFullWidth>
                    <Text fontSize="lg">Home</Text>
                  </Button>
                </Box>
                <Box as="a" href="/listings">
                  <Button variant="ghost" colorScheme="teal" isFullWidth>
                    <Text fontSize="lg">Listings</Text>
                  </Button>
                </Box>
                <Box as="a" href="/about">
                  <Button variant="ghost" colorScheme="teal" isFullWidth>
                    <Text fontSize="lg">About Talis</Text>
                  </Button>
                </Box>
              </VStack>
              <Divider marginY={4} />
              <VStack
                //divider={<StackDivider borderColor="gray.200" />}
                spacing={3}
                align="stretch"
              >
                <Box as="a" href="/account/login">
                  <Button variant="ghost" colorScheme="teal" isFullWidth>
                    <Text fontSize="lg">Log In</Text>
                  </Button>
                </Box>
                <Box as="a" href="/account/signup">
                  <Button variant="ghost" colorScheme="teal" isFullWidth>
                    <Text fontSize="lg">Sign Up</Text>
                  </Button>
                </Box>
              </VStack>
            </DrawerBody>
            <DrawerFooter>
              <Text fontSize="3xl">TALIS</Text>
            </DrawerFooter>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </Flex>
  );
};

export default Navbar;
