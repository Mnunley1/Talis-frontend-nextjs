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
  VStack,
  Checkbox,
  CheckboxGroup,
} from '@chakra-ui/react';
import { connectRefinementList } from 'react-instantsearch-dom';
import { connectNumericMenu } from 'react-instantsearch-dom';
import { FaAngleDown } from 'react-icons/fa';

function NumericMenu({ items, refine, createURL, defaultRefinement }) {
  return (
    <Box width="100%">
      <Menu closeOnSelect={false}>
        <MenuButton
          as={Button}
          width="100%"
          color="gray.500"
          variant="outline"
          borderColor="gray.300"
          label="Max Price"
          rightIcon={<FaAngleDown />}
        >
          Max Price {defaultRefinement.replace(':', '')}
        </MenuButton>
        <MenuList zIndex={2} width="100%" type="radio" color="teal.500">
          <MenuOptionGroup
            defaultValue={defaultRefinement}
            value={defaultRefinement}
          >
            {items.map((item) => (
              <MenuItemOption
                key={item.label}
                value={item.value}
                onClick={(event) => {
                  event.preventDefault();
                  refine(item.value);
                }}
              >
                <a
                  href={createURL(item.value)}
                  style={{ textDecoration: 'none', color: 'black' }}
                >
                  {item.label}
                </a>
              </MenuItemOption>
            ))}
          </MenuOptionGroup>
        </MenuList>
      </Menu>
    </Box>
  );
}

const PriceNumericMenu = connectNumericMenu(NumericMenu);

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

function RefinementList({ values, refine, defaultRefinement }) {
  return (
    <VStack align="start">
      {values.map((staticItem) => {
        const isRefined =
          defaultRefinement.some((item) => item === staticItem.value) || false;
        return (
          <CheckboxGroup disableGutters>
            <div key={staticItem.value} value={staticItem.value}>
              <Checkbox
                colorScheme="teal"
                value={staticItem.value}
                isChecked={isRefined}
                onChange={(event) => {
                  const value = event.currentTarget.value;
                  const next = defaultRefinement.includes(value)
                    ? defaultRefinement.filter((current) => current !== value)
                    : defaultRefinement.concat(value);
                  refine(next);
                }}
              >
                <Text color="black">{staticItem.label}</Text>
              </Checkbox>
            </div>
          </CheckboxGroup>
        );
      })}
    </VStack>
  );
}

const CustomRefinementList = connectRefinementList(RefinementList);

const MobileFilters = ({ onClick, bedrooms, filters, listingType, price }) => {
  return (
    <Box
      bgColor="white"
      color="black"
      zIndex="2000"
      position="fixed"
      top="0"
      left="0"
      h="100%"
      w="100%"
      p="25px"
      display={filters ? 'block' : 'none'}
    >
      <Box>
        <Center>
          <Text fontSize="3xl">Filter Listings</Text>
        </Center>
      </Box>
      <VStack align="start" spacing={3}>
        <Text fontSize="xl">Price</Text>
        <PriceNumericMenu
          attribute="price"
          defaultRefinement={price}
          items={[
            { label: '$1000', end: 1000 },
            { label: '$2000', end: 2000 },
            { label: '$3000', end: 3000 },
            { label: '$4000', end: 4000 },
            { label: '$5000', end: 5000 },
          ]}
        />
        <Text fontSize="xl">Bedrooms</Text>
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
        {/* <Text fontSize="xl">Bathrooms</Text> */}
        <Text fontSize="xl">Listign Type</Text>
        <CustomRefinementList
          attribute="listing_type"
          defaultRefinement={listingType}
          values={[
            { label: 'Townhome', value: 'townhome' },
            { label: 'House', value: 'house' },
            { label: 'Condo', value: 'condo' },
          ]}
        />
      </VStack>
      <Box textAlign="center">
        <Button onClick={onClick} variant="solid" colorScheme="teal">
          View Results
        </Button>
      </Box>
    </Box>
  );
};

export default MobileFilters;
