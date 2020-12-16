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
  useDisclosure,
} from '@chakra-ui/react';

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

const FilterMenu = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen}>Filter</Button>

      <Modal isOpen={isOpen} onClose={onClose} size="full" isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody></ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

const FloatingSearchBtn = ({ customClick, visible }) => {
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
        <FilterMenu />
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
              value: 'Talis_Development_bedrooms_asc',
              label: 'Bedrooms',
            },
            {
              value: 'Talis_Development_bathrooms_asc',
              label: 'Bathrooms',
            },
          ]}
        />
      </ButtonGroup>
    </Box>
  );
};

export default FloatingSearchBtn;
