import { useRef, useState } from 'react';
import Modal from 'react-modal';
import { useRouter } from 'next/router';
import { useAuth } from '../../contexts/AuthContext';
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
  const { currentUser, logout } = useAuth();
  const [error, setError] = useState('');
  const btnRef = useRef();
  const router = useRouter();

  function handleLogout() {
    setError('');

    try {
      onClose();
      router.reload();
      logout();
      //router.push('/');
    } catch {
      setError('Failed to logout');
    }
  }

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      position="fixed"
      top="0"
      left="0"
      height="64px"
      width="100%"
      wrap="wrap"
      padding=".5rem"
      paddingX="1rem"
      bgColor="white"
      color="black"
      borderBottom="1px"
      borderColor="gray.100"
      zIndex="500"
    >
      <Box as="a" href="/">
        <Image src={TalisLogo} height="25px" width="auto" />
      </Box>
      <Spacer />
      {currentUser ? null : <><Button
        as="a"
        href="/account/signup"
        colorScheme="teal"
        size="sm"
        mr={1}
        display={['none', 'none', 'inherit']}
      >
        Sign Up
      </Button>
      <Button
        as="a"
        href="/account/login"
        colorScheme="teal"
        size="sm"
        mr={1}
        display={['none', 'none', 'inherit']}
      >
        Log in
      </Button></>}
      
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
          <DrawerContent bg="black" opacity="90%" color="white">
            <DrawerCloseButton />
            <DrawerHeader>
              <Image src={TalisMenuLogo} height="35px" width="auto" />
            </DrawerHeader>

            <DrawerBody>
              <VStack spacing={3} align="flex-start">
                <Box as="a" href="/">
                  <Text fontSize="xl" _hover={{ color: '#00A3B0' }}>
                    Home
                  </Text>
                </Box>
                <Box as="a" href="/listings/search">
                  <Text fontSize="lg" _hover={{ color: '#00A3B0' }}>
                    Listings
                  </Text>
                </Box>
                <Box as="a" href="/about">
                  <Text fontSize="lg" _hover={{ color: '#00A3B0' }}>
                    About Talis
                  </Text>
                </Box>
              </VStack>
              <Divider marginY={4} />
              <VStack spacing={3} align="flex-start">
                {currentUser ? (
                  <>
                    <Box as="a" href="/MyTalis/profile">
                      <Text fontSize="lg" _hover={{ color: '#00A3B0' }}>
                        MyTalis
                      </Text>
                    </Box>
                    <Box
                      as="button"
                      variant="ghost"
                      colorScheme="teal"
                      isFullWidth
                      onClick={handleLogout}
                    >
                      <Text fontSize="lg" _hover={{ color: '#00A3B0' }}>
                        Log Out
                      </Text>
                    </Box>
                  </>
                ) : (
                  <>
                    <Box as="a" href="/account/login">
                      <Text fontSize="lg" _hover={{ color: '#00A3B0' }}>
                        Log In
                      </Text>
                    </Box>
                    <Box as="a" href="/account/signup">
                      <Text fontSize="lg" _hover={{ color: '#00A3B0' }}>
                        Sign Up
                      </Text>
                    </Box>
                  </>
                )}
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
