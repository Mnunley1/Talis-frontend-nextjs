import React, { useEffect } from 'react';
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

const algoliaIndex = process.env.NEXT_PUBLIC_ALGOLIA_INDEX;

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

const FloatingSearchBtn = ({ customClick, visible, bedrooms, onCLick }) => {
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
        <Button onClick={onCLick}>Filters</Button>
        <CustomSortBy
          defaultRefinement={algoliaIndex}
          items={[
            {
              value: `${algoliaIndex}`,
              label: 'Featured',
            },
            {
              value: `${algoliaIndex}_price_desc`,
              label: 'Price (High to Low)',
            },
            {
              value: `${algoliaIndex}_price_asc`,
              label: 'Price (Low to High)',
            },
            {
              value: `${algoliaIndex}_bedrooms_desc`,
              label: 'Bedrooms',
            },
            {
              value: `${algoliaIndex}_bathrooms_desc`,
              label: 'Bathrooms',
            },
          ]}
        />
      </ButtonGroup>
    </Box>
  );
};

export default FloatingSearchBtn;
