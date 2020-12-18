import { connectNumericMenu } from 'react-instantsearch-dom';
import {
  Box,
  Button,
  Radio,
  RadioGroup,
  HStack,
  Text,
  StackDivider,
  Stack,
  VStack,
  useRadio,
  getCheckboxProps,
  useRadioGroup,
  getRootProps,
} from '@chakra-ui/react';

const Bedrooms = ({ items, refine, createURL }) => (
  <RadioGroup>
    <Stack direction="row">
      {items.map((item) => (
        <a
          href={createURL(item.value)}
          style={{ fontWeight: item.isRefined ? 'bold' : '' }}
          onChange={(event) => {
            event.preventDefault();
            refine(item.value);
          }}
        >
          <Radio key={item.label} value={item.label}>
            {item.label}
          </Radio>
        </a>
      ))}
    </Stack>
  </RadioGroup>
);

const BedroomsMenu = connectNumericMenu(Bedrooms);

const MobileSearchFilter = () => {
  return (
    <VStack
      divider={<StackDivider borderColor="gray.200" />}
      spacing={4}
      align="stretch"
    >
      <Box>
        <BedroomsMenu
          attribute="bedrooms"
          items={[
            { label: '1', end: 1 },
            { label: '2', end: 2 },
            { label: '3', end: 3 },
            { label: '4', end: 4 },
          ]}
        />
      </Box>
      <Box h="40px" bg="tomato">
        2
      </Box>
      <Box h="40px" bg="pink.100">
        3
      </Box>
    </VStack>
  );
};

export default MobileSearchFilter;
