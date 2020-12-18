import React, { useState } from 'react';
import MobileSearchFilter from '../MobileSearchFilter/MobileSearchFilter';
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
  MenuIcon,
  MenuCommand,
  MenuDivider,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Radio,
  RadioGroup,
  Stack,
  useDisclosure,
} from '@chakra-ui/react';

const VirtualBedsMenu = connectNumericMenu(() => null);

const Bedrooms = ({ items, refine, createURL, updateBedrooms }) => (
  <RadioGroup>
    <Stack direction="row">
      {items.map((item) => (
        <a
          href={createURL(item.value)}
          style={{ fontWeight: item.isRefined ? 'bold' : '' }}
          onChange={(event) => {
            event.preventDefault();
            updateBedrooms(item.value);
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

const FilterMenu = ({ currentRefinement }) => {
  const [bedroomsState, setBedroomsState] = useState(currentRefinement);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const updateBedrooms = (value) => {
    setBedroomsState(value);
  };

  return (
    <>
      <Button onClick={onOpen}>Filter</Button>

      <VirtualBedsMenu
        attribute="bedrooms"
        items={[
          { label: '1', end: 1 },
          { label: '2', end: 2 },
          { label: '3', end: 3 },
          { label: '4', end: 4 },
        ]}
      />

      <Modal isOpen={isOpen} onClose={onClose} size="lg" isCentered>
        <ModalOverlay />
        <ModalContent borderRadius={0}>
          <ModalHeader>Filter</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <BedroomsMenu
              attribute="bedrooms"
              defaultRefinement={bedroomsState}
              updateBedrooms={updateBedrooms}
              items={[
                { label: '1', end: 1 },
                { label: '2', end: 2 },
                { label: '3', end: 3 },
                { label: '4', end: 4 },
              ]}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
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
