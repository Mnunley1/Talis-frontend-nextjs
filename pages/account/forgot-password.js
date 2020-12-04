import { useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../contexts/AuthContext';
import {
  Alert,
  AlertIcon,
  AlertDescription,
  Box,
  Button,
  CircularProgress,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Link,
  Text,
} from '@chakra-ui/react';

const AlertMessage = ({ message }) => {
  return (
    <Alert
      status="success"
      variant="solid"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      borderRadius={8}
      mb={3}
    >
      <AlertIcon />
      <AlertDescription>
        {message}
        {error}
      </AlertDescription>
    </Alert>
  );
};

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
  const { resetPassword } = useAuth();
  const { register, errors, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  async function onSubmit(data) {
    try {
      setError('');
      setLoading(true);
      await resetPassword(data.email);
      setSuccess('Check your inbox for password reset link');
    } catch (error) {
      setError(error.message);
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
          <Text fontSize="lg">Enter your email to reset password</Text>
        </Box>
        <Box my={4} textAlign="left">
          <form onSubmit={handleSubmit(onSubmit)}>
            {success && <AlertMessage message={success} />}
            {error && <ErrorMessage message={error} />}
            <FormControl isInvalid={errors.email}>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input
                type="email"
                name="email"
                placeholder="Enter email address"
                size="md"
                ref={register({ required: 'Enter an email' })}
              />
              <FormErrorMessage>
                {errors.email && errors.email.message}
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
                'Reset Password'
              )}
            </Button>
          </form>
        </Box>
        <Divider my={3} />
        <Box textAlign="center">
          <Text>
            Remember your password?{' '}
            <Link color="teal.500" href="/account/login">
              Login
            </Link>
          </Text>
        </Box>
      </Box>
    </Flex>
  );
}

export default Signin;
