import {
  Box,
  Button,
  ButtonGroup,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  Radio,
  RadioGroup,
  Stack,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  Center,
  Portal,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { connectNumericMenu } from 'react-instantsearch-dom';

const Bedrooms = ({ items, refine, createURL, defaultRefinement }) => {
  const defaultLabel = items.find((item) => item.value === defaultRefinement)
    .label;
  return (
    <RadioGroup defaultValue={defaultLabel} value={defaultLabel}>
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
};

const BedroomsMenu = connectNumericMenu(Bedrooms);

const MobileFilters = ({ onClick, bedrooms, filters }) => {
  return (
    <Box
      bgColor="white"
      color="black"
      zIndex="2000"
      position="absolute"
      top="0"
      left="0"
      h="100%"
      w="100%"
      p="10px"
      display={filters ? 'block' : 'none'}
    >
      <button onClick={onClick}>close</button>
      <Text>Bedrooms</Text>
      <BedroomsMenu
        attribute="bedrooms"
        defaultRefinement={bedrooms}
        items={[
          { label: '1', end: 1 },
          { label: '2', end: 2 },
          { label: '3', end: 3 },
          { label: '4', end: 4 },
        ]}
      />
    </Box>
  );
};

export default MobileFilters;
