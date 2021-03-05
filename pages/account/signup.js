import { useState } from 'react';
import { db } from '../../firebase';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../contexts/AuthContext';
import {
  FacebookLoginButton,
  GoogleLoginButton,
} from 'react-social-login-buttons';
import {
  Alert,
  AlertIcon,
  AlertDescription,
  Box,
  Button,
  Center,
  CircularProgress,
  Container,
  Divider,
  Flex,
  FormErrorMessage,
  FormControl,
  FormLabel,
  Heading,
  IconButton,
  Input,
  Image,
  //Link,
  //Modal,
  Spacer,
  Stack,
  VStack,
  Text,
} from '@chakra-ui/react';
import TalisLogo from '../../public/images/navbar-logo.svg';
import signupImage from '../../public/images/signupImage.jpeg';

const ErrorMessage = ({ message }) => {
  return (
    <Alert
      status="error"
      variant="solid"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      borderRadius={8}
      mb={3}
    >
      <AlertIcon />
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
};

function Signin() {
  const { signUp, signInWithFacebook, signInWithGoogle } = useAuth();
  const { register, errors, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  async function onSubmit(data) {
    if (data.password !== data.confirmPassword) {
      console.log('error');
      return setError('Passwords do not match');
    }

    try {
      setError('');
      setLoading(true);
      await signUp(data.email, data.password).then((cred) => {
        var docRef = db.collection('users').doc(cred.user.uid);
        docRef.get().then(function (doc) {
          if (!doc.exists) {
            return docRef.set({
              id: cred.user.uid,
              location: '',
              favoriteListings: [],
            });
          }
        });
      });
      router.push('/');
    } catch (error) {
      setError(error.message);
    }

    setLoading(false);
  }

  async function handleFacebookLogin() {
    try {
      setError('');
      setLoading(true);
      await signInWithFacebook().then((cred) => {
        var docRef = db.collection('users').doc(cred.user.uid);
        docRef.get().then(function (doc) {
          if (!doc.exists) {
            return docRef.set({
              id: cred.user.uid,
              location: '',
              favoriteListings: [],
            });
          }
        });
      });
      router.push('/');
    } catch {
      setError('Failed to login');
    }

    setLoading(false);
  }

  async function handleGoogleLogin() {
    try {
      setError('');
      setLoading(true);
      await signInWithGoogle().then((cred) => {
        var docRef = db.collection('users').doc(cred.user.uid);
        docRef.get().then(function (doc) {
          if (!doc.exists) {
            return docRef.set({
              id: cred.user.uid,
              location: '',
              favoriteListings: [],
            });
          }
        });
      });
      router.push('/');
    } catch {
      setError('Failed to login');
    }

    setLoading(false);
  }

  return (
    <Flex
      align="center"
      justify="center"
      h="100vh"
      // bg="hsla(184, 100%, 35%, 1)"
      // bg="linear-gradient(180deg, hsla(184, 100%, 35%, 1) 0%, hsla(198, 100%, 24%, 1) 100%)"
      // bg="-moz-linear-gradient(180deg, hsla(184, 100%, 35%, 1) 0%, hsla(198, 100%, 24%, 1) 100%)"
      // bg="-webkit-linear-gradient(180deg, hsla(184, 100%, 35%, 1) 0%, hsla(198, 100%, 24%, 1) 100%)"
      // filter="progid: DXImageTransform.Microsoft.gradient( startColorstr='#00A3B0', endColorstr='#005479', GradientType=1 )"
    >
      <Flex
        w={['100%', '100%', '40%']}
        h="100vh"
        bg="white"
        align="center"
        justify="center"
      >
        <Box
          p={5}
          width={['90%', '70%', '100%']}
          bg="white"
          borderWidth={[1, 1, 0]}
          borderRadius={[8, 8, 0]}
          boxShadow={['xl', 'xl', 'none']}
        >
          <Box textAlign="center">
            <Box as="a" href="/">
              <Image
                src={TalisLogo}
                h={['35px', '40px', '45px']}
                w="auto"
                mx="auto"
                mb={4}
              />
            </Box>
            <Text fontSize="lg">Create your account to save listings</Text>
          </Box>
          <Box my={4} textAlign="left">
            <form onSubmit={handleSubmit(onSubmit)}>
              {error && <ErrorMessage message={error} />}
              <FormControl isInvalid={errors.email}>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input
                  type="email"
                  name="email"
                  placeholder="Enter Email"
                  size="md"
                  ref={register({ required: 'Enter an email' })}
                />
                <FormErrorMessage>
                  {errors.email && errors.email.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.password} mt={6}>
                <FormLabel htmlFor="password">Password</FormLabel>
                <Input
                  type="password"
                  name="password"
                  placeholder="Enter Password"
                  size="md"
                  ref={register({ required: 'Enter a password' })}
                />
                <FormErrorMessage>
                  {errors.password && errors.password.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.confirmPassword} mt={6}>
                <FormLabel htmlFor="confirmPassword">
                  Confirm Password
                </FormLabel>
                <Input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  size="md"
                  ref={register({ required: 'Confirm your password' })}
                />
                <FormErrorMessage>
                  {errors.confirmPassword && errors.confirmPassword.message}
                </FormErrorMessage>
              </FormControl>
              <Button
                bgColor="#00A3B0"
                color="white"
                variant="solid"
                type="submit"
                width="full"
                mt={4}
              >
                {loading ? (
                  <CircularProgress
                    isIndeterminate
                    size="24px"
                    color="#00A3B0"
                  />
                ) : (
                  'Register'
                )}
              </Button>
            </form>
          </Box>
          <Stack direction="row" alignItems="center" my={3}>
            <Divider orientation="horizontal" />
            <Text textColor="gray.400">OR</Text>
            <Divider orientation="horizontal" />
          </Stack>
          <GoogleLoginButton
            style={{ width: '100%' }}
            align="center"
            onClick={handleGoogleLogin}
          >
            <span>Continue with Google</span>
          </GoogleLoginButton>
          <FacebookLoginButton
            style={{ width: '100%' }}
            align="center"
            onClick={handleFacebookLogin}
          ></FacebookLoginButton>
          <Text my={3} fontSize="md" textAlign="center">
            Already have an account?{' '}
            <Box as="a" color="teal.500" href="/account/login">
              Log in
            </Box>
          </Text>
        </Box>
      </Flex>
      <Flex
        w="60%"
        h="100vh"
        bg="rgba(0,255,0,0.2)"
        bgImage={`linear-gradient(180deg, hsla(184, 100%, 35%, .9) 0%, hsla(198, 100%, 24%, .9) 100%),url("${signupImage}")`}
        bgRepeat="no-repeat"
        bgPosition="center center"
        bgSize="cover"
        color="white"
        align="center"
        display={['none', 'none', 'flex']}
      >
        <Box mx={5}>
          <VStack align="start" spacing={4}>
            <Heading size="4xl">Welcome to Talis</Heading>
            <Text fontSize="xl">
              Create an account and begin your search for a new home today
            </Text>
          </VStack>
        </Box>
      </Flex>
    </Flex>
  );
}

export default Signin;
