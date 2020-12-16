import { useRef, useState } from 'react';
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
  AlertTitle,
  AlertDescription,
  Box,
  Button,
  CircularProgress,
  CloseButton,
  Divider,
  Flex,
  FormErrorMessage,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Image,
  //Link,
  //Modal,
  Spacer,
  Stack,
  Text,
} from '@chakra-ui/react';
import TalisLogo from '../../public/images/navbar-logo.svg';

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
  const { login, signInWithFacebook, signInWithGoogle } = useAuth();
  const { register, errors, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  async function onSubmit(data) {
    try {
      setError('');
      setLoading(true);
      await login(data.email, data.password);
      router.back();
    } catch (error) {
      setError(error.message);
    }

    setLoading(false);
  }

  async function handleFacebookLogin() {
    try {
      setError('');
      setLoading(true);
      await signInWithFacebook();
      router.back();
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
      router.back();
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
      bg="hsla(184, 100%, 35%, 1)"
      bg="linear-gradient(180deg, hsla(184, 100%, 35%, 1) 0%, hsla(198, 100%, 24%, 1) 100%)"
      bg="-moz-linear-gradient(180deg, hsla(184, 100%, 35%, 1) 0%, hsla(198, 100%, 24%, 1) 100%)"
      bg="-webkit-linear-gradient(180deg, hsla(184, 100%, 35%, 1) 0%, hsla(198, 100%, 24%, 1) 100%)"
      filter="progid: DXImageTransform.Microsoft.gradient( startColorstr='#00A3B0', endColorstr='#005479', GradientType=1 )"
    >
      <Box
        p={5}
        width={['90%', '70%', '45%']}
        bg="white"
        borderWidth={1}
        borderRadius={8}
        boxShadow="lg"
        mT="auto"
      >
        <Box textAlign="center">
          <Image src={TalisLogo} h="45px" w="auto" mx="auto" mb={4} />
          <Text fontSize="lg">Sign into your account</Text>
        </Box>
        <Box my={3} textAlign="left">
          <form onSubmit={handleSubmit(onSubmit)}>
            {error && <ErrorMessage message={error} />}
            <FormControl isInvalid={errors.email}>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input
                type="email"
                name="email"
                placeholder="example@email.com"
                size="md"
                ref={register({ required: 'Please enter your email' })}
              />
              <FormErrorMessage>
                {errors.email && errors.email.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.password} mt={3}>
              <FormLabel htmlFor="password">Password</FormLabel>
              <Input
                type="password"
                name="password"
                placeholder="*******"
                size="md"
                ref={register({ required: 'Please enter your password' })}
              />
              <FormErrorMessage>
                {errors.password && errors.password.message}
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
                <CircularProgress isIndeterminate size="24px" color="teal" />
              ) : (
                'Sign In'
              )}
            </Button>
          </form>
        </Box>
        <Box as="a" color="teal.500" href="/account/forgot-password">
          <Text fontSize="md" textAlign="end">
            Forgot password?
          </Text>
        </Box>
        <Stack direction="row" alignItems="center" mb={3}>
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
        <Text fontSize="md" textAlign="center">
          Don't have an account?{' '}
          <Box as="a" color="teal.500" href="/account/signup">
            Sign up
          </Box>
        </Text>
      </Box>
    </Flex>
  );
}

export default Signin;
