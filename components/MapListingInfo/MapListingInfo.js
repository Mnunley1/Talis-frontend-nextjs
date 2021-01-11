import { Box, Image, Text } from '@chakra-ui/react';

function MapListingInfo({ bedrooms, bathrooms, price, title }) {
  return (
    <Box maxW="sm" overflow="hidden">
      {/* <Image src={image} alt="Listing Image" h="200px" objectFit="cover" /> */}
      <Text>{price}</Text>
      <Text>{title}</Text>
      <Text>
        {bedrooms} Beds | {bathrooms} Baths
      </Text>
    </Box>
  );
}

export default MapListingInfo;
