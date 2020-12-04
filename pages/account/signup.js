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
  //Link,
  //Modal,
  Text,
} from '@chakra-ui/react';

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
        return db.collection('users').doc(cred.user.uid).set({
          location: '',
          favoriteListings: [],
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
        return db.collection('users').doc(cred.user.uid).set({
          location: '',
          favoriteListings: [],
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
        return db.collection('users').doc(cred.user.uid).set({
          location: '',
          favoriteListings: [],
        });
      });
      router.push('/');
    } catch {
      setError('Failed to login');
    }

    setLoading(false);
  }

  return (
    <Flex align="center" justify="center" h="100vh">
      <Box
        p={5}
        width="35%"
        borderWidth={1}
        borderRadius={8}
        boxShadow="lg"
        mT="auto"
      >
        <Box textAlign="center">
          <Heading fontSize="4xl">TALIS</Heading>
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
              <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
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
              colorScheme="teal"
              variant="solid"
              type="submit"
              width="full"
              mt={4}
            >
              {loading ? (
                <CircularProgress isIndeterminate size="24px" color="teal" />
              ) : (
                'Register'
              )}
            </Button>
          </form>
        </Box>
        <Center mb={3}>
          <Text fontSize="sm">
            Already have an account?{' '}
            <Box as="a" color="teal.500" href="/account/login">
              Log in
            </Box>
          </Text>
        </Center>
        <Divider />
        <Box textAlign="center">
          <Text>Or continue with:</Text>
        </Box>
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
      </Box>
    </Flex>
  );
}

export default Signin;
