import { useRef } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import {
  Box,
  Button,
  Container,
  Image,
  Text,
  SimpleGrid,
  VStack,
  Center,
} from '@chakra-ui/react';

export default function ProfileLayout() {
  return (
    <div>
      <Navbar />
      <Text marginTop="80px">MyTalis</Text>
    </div>
  );
}
