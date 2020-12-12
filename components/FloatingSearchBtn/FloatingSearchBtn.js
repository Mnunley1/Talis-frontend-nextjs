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

const SortMenu = () => {
  return (
    <Menu closeOnSelect={false} placement="top-end">
      <MenuButton as={Button} colorScheme="teal">
        Sort
      </MenuButton>
      <MenuList minWidth="200px">
        <MenuOptionGroup defaultValue="asc" title="Order" type="radio">
          <MenuItemOption value="asc">Ascending</MenuItemOption>
          <MenuItemOption value="desc">Descending</MenuItemOption>
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  );
};

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

function FloatingSearchBtn() {
  return (
    <Box width={['100%', '100%', '30%']} display={['block', 'block', 'none']}>
      <ButtonGroup
        size="lg"
        isAttached
        variant="solid"
        colorScheme="teal"
        position="fixed"
        bottom="0"
        right="50%"
        transform="translate(50%, -50%)"
        zIndex="100"
      >
        <Button mr="-px">Map</Button>
        <FilterMenu />
        <SortMenu />
      </ButtonGroup>
    </Box>
  );
}

export default FloatingSearchBtn;
