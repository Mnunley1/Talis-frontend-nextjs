import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { functions } from '../../firebase';
import { useForm, Controller } from 'react-hook-form';
import {
  Alert,
  AlertIcon,
  AlertDescription,
  Box,
  Button,
  Center,
  CircularProgress,
  Checkbox,
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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Spacer,
  Stack,
  VStack,
  Text,
  Textarea,
  useToast,
  useDisclosure,
} from '@chakra-ui/react';

function RequestInfo() {
  const { currentUser } = useAuth();
  const methods = useForm();
  const { handleSubmit, control, errors, register, reset } = methods;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  function messageSuccess() {
    toast({
      position: 'top',
      title: 'Message Sent Successfully',
      description: 'An agent will contact you shortly.',
      status: 'success',
      duration: 6000,
      isClosable: true,
    });
  }

  function sendEmail(data) {
    const callable = functions.httpsCallable('requestInfoEmail');
    return callable({
      text: data.text,
      email: data.email,
      phoneNumber: data.phoneNumber,
      name: data.name,
    }).then(console.log(data));
  }

  async function onSubmit(data) {
    if (!currentUser) {
      console.log('Log In!');
      return setError('You must log in!');
    }

    try {
      setError('');
      setLoading(true);
      await sendEmail(data);
      reset();
      onClose();
      messageSuccess();
    } catch (error) {
      setError(error.message);
      console.log(error);
    }

    setLoading(false);
  }

  return (
    <>
      <VStack align="stretch">
        <Box>
          <Text fontSize="2xl" textAlign="center">
            Contact Talis
          </Text>
        </Box>
        <Box my={4} textAlign="left">
          <form
            onSubmit={(e) => {
              if (!currentUser) {
                e.preventDefault();
                onOpen();
              } else {
                handleSubmit(onSubmit);
              }
            }}
          >
            {/* {error && <ErrorMessage message={error} />} */}
            <VStack align="stretch" spacing={2}>
              <FormControl isInvalid={errors.name}>
                <Input
                  type="name"
                  name="name"
                  placeholder="Name"
                  size="md"
                  ref={register({ required: 'Enter your name' })}
                />
                <FormErrorMessage>
                  {errors.name && errors.name.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.password}>
                <Input
                  type="phone number"
                  name="phoneNumber"
                  placeholder="Phone number"
                  size="md"
                  ref={register({ required: 'Enter phone number' })}
                />
                <FormErrorMessage>
                  {errors.phoneNumber && errors.phoneNumber.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.email}>
                <Input
                  type="email"
                  name="email"
                  placeholder="Email"
                  size="md"
                  ref={register({ required: 'Enter your email' })}
                />
                <FormErrorMessage>
                  {errors.email && errors.email.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.text}>
                <Textarea
                  type="text"
                  name="text"
                  placeholder="Enter Message"
                  size="md"
                  ref={register({ required: 'Enter message' })}
                />
                <FormErrorMessage>
                  {errors.text && errors.text.message}
                </FormErrorMessage>
              </FormControl>
              <Controller
                as={(props) => (
                  <Checkbox
                    onChange={(e) => props.onChange(e.target.checked)}
                    checked={props.value}
                    colorScheme="teal"
                  >
                    Request a tour
                  </Checkbox>
                )}
                name="requestTour"
                control={control}
                defaultValue={false}
                ref={register({ required: true })}
              />
              <Box>
                <Text color="#4e4e4e" fontSize="xs">
                  By pressing Request Info, you agree that Talis may contact you
                  via phone/text about your inquiry, which may involve the use
                  of automated means. You are not required to consent as a
                  condition of purchasing any property, goods or services.
                  Message/data rates may be applicable.
                </Text>
              </Box>
            </VStack>

            <Button
              bgColor="#00A3B0"
              color="white"
              variant="solid"
              type="submit"
              width="full"
              mt={4}
            >
              {loading ? (
                <CircularProgress isIndeterminate size="24px" color="#00A3B0" />
              ) : (
                'Request Info'
              )}
            </Button>
          </form>
        </Box>
      </VStack>

      <Modal
        isCentered
        isOpen={isOpen}
        onClose={onClose}
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader mx="auto">Login / Signup</ModalHeader>
          <ModalCloseButton />
          <ModalBody textAlign="center">
            {' '}
            Login or create a new account to save your favorite listings
          </ModalBody>
          <ModalFooter mx="auto">
            <Button
              as="a"
              href="/account/login"
              variant="ghost"
              color="teal.500"
              mr={3}
              onClick={onClose}
            >
              Log in
            </Button>
            <Button
              as="a"
              href="/account/signup"
              variant="ghost"
              color="teal.500"
            >
              Sign up
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default RequestInfo;
