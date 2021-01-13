import React from 'react';
import { connectNumericMenu } from 'react-instantsearch-dom';
import { connectSortBy } from 'react-instantsearch-dom';
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
  useDisclosure,
} from '@chakra-ui/react';


const Bedrooms = ({ items, refine, createURL, defaultRefinement }) => {
  const defaultLabel = items.find(item => item.value === defaultRefinement).label;
  return (
    <RadioGroup defaultValue={defaultLabel}>
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
            <Radio key={item.label} value={item.label} isChecked={item.isRefined}>
              {item.label}
            </Radio>
          </a>
        ))}
      </Stack>
    </RadioGroup>
  )
};

const BedroomsMenu = connectNumericMenu(Bedrooms);

const FilterMenu = ({ searchState }) => {
  const { onOpen } = useDisclosure();

  return (
    <>
      <Popover size="lg">
        <PopoverTrigger>
          <Button onClick={onOpen}>Filter</Button>
        </PopoverTrigger>
        <Portal>
          <PopoverContent borderRadius={0}>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverHeader>Filter</PopoverHeader>
            <PopoverBody>
              <Center>
                <BedroomsMenu
                  attribute="bedrooms"
                  defaultRefinement={searchState}
                  items={[
                    { label: '1', end: 1 },
                    { label: '2', end: 2 },
                    { label: '3', end: 3 },
                    { label: '4', end: 4 },
                  ]}
                />
              </Center>
            </PopoverBody>
          </PopoverContent>
        </Portal>
      </Popover>
    </>
  );
};

function SortBy({ items, refine, createURL }) {
  return (
    <Menu>
      <MenuButton as={Button} variant="solid" colorScheme="teal">
        Sort By
      </MenuButton>
      <MenuList minWidth="150px" type="radio" color="teal.500">
        <MenuOptionGroup>
          {items.map((item) => (
            <MenuItemOption
              key={item.label}
              value={item.label}
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
  );
}
const CustomSortBy = connectSortBy(SortBy);

const FloatingSearchBtn = ({ customClick, visible, bedrooms }) => {
  return (
    <Box width={['100%', '100%', '30%']} display={['block', 'block', 'none']}>
      <ButtonGroup
        size="md"
        isAttached
        variant="solid"
        colorScheme="teal"
        position="fixed"
        bottom="0"
        right="50%"
        transform="translate(50%, -50%)"
        zIndex="1000"
        opacity="95%"
      >
        <Button mr="-px" onClick={customClick}>
          {!visible ? 'Map' : 'Listings'}
        </Button>
        <FilterMenu searchState={bedrooms} />
        <CustomSortBy
          defaultRefinement="Talis_Development"
          items={[
            {
              value: 'Talis_Development',
              label: 'Featured',
            },
            {
              value: 'Talis_Development_price_desc',
              label: 'Price (High to Low)',
            },
            {
              value: 'Talis_Development_price_asc',
              label: 'Price (Low to High)',
            },
            {
              value: 'Talis_Development_bedrooms_desc',
              label: 'Bedrooms',
            },
            {
              value: 'Talis_Development_bathrooms_desc',
              label: 'Bathrooms',
            },
          ]}
        />
      </ButtonGroup>
    </Box>
  );
};

export default FloatingSearchBtn;
