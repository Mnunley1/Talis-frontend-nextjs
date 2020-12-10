import { Box, Button, ButtonGroup } from '@chakra-ui/react';

function FloatingSearchBtn() {
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
        zIndex="100"
      >
        <Button mr="-px">Map</Button>
        <Button mr="-px">Filter</Button>
        <Button mr="-px">Sort</Button>
      </ButtonGroup>
    </Box>
  );
}

export default FloatingSearchBtn;
