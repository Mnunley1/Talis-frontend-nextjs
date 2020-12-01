import { useState } from 'react';
import { useRouter } from 'next/router';
import {
  FacebookLoginButton,
  GoogleLoginButton,
} from 'react-social-login-buttons';
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
  Drawer,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  DrawerOverlay,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  IconButton,
  Input,
  //Link,
  //Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Spacer,
  StackDivider,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';

function Signin() {
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError('');
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history.push('/');
    } catch {
      setError('Failed to login');
    }

    setLoading(false);
  }

  async function handleFacebookLogin() {
    try {
      setError('');
      setLoading(true);
      await signInWithFacebook();
      history.push('/');
    } catch {
      setError('Failed to login');
    }

    setLoading(false);
  }

  async function handleGoogleLogin() {
    try {
      setError('');
      setLoading(true);
      await signInWithGoogle();
      history.push('/');
    } catch {
      setError('Failed to login');
    }

    setLoading(false);
  }

  return (
    <Flex align="center" justify="center" h="100vh">
      <Box
        p={8}
        maxWidth="500px"
        borderWidth={1}
        borderRadius={8}
        boxShadow="lg"
        mT="auto"
      >
        <Box textAlign="center">
          <Heading>Login</Heading>
        </Box>
        <Box my={4} textAlign="left">
          <form /* onSubmit={handleSubmit} */>
            {/* {error && <ErrorMessage message={error} />} */}
            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                placeholder="test@test.com"
                size="lg"
                /* onChange={(event) => setEmail(event.currentTarget.value)} */
              />
            </FormControl>
            <FormControl isRequired mt={6}>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                placeholder="*******"
                size="lg"
                /* onChange={(event) => setPassword(event.currentTarget.value)} */
              />
            </FormControl>
            <Button
              backgroundColor="blue.500"
              variant="outline"
              type="submit"
              width="full"
              mt={4}
            >
              {isLoading ? (
                <CircularProgress isIndeterminate size="24px" color="teal" />
              ) : (
                'Sign In'
              )}
            </Button>
          </form>
        </Box>
        <Divider />
        <Box textAlign="center">
          <Text>Or continue with:</Text>
        </Box>
        <GoogleLoginButton
          style={{ width: '100%' }}
          align="center"
          //onClick={handleGoogleLogin}
        >
          <span>Continue with Google</span>
        </GoogleLoginButton>
        <FacebookLoginButton
          style={{ width: '100%' }}
          align="center"
          //onClick={handleFacebookLogin}
        ></FacebookLoginButton>
      </Box>
    </Flex>
  );
}

export default Signin;
