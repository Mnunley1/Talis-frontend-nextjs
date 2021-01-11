import { Box, Image, Text } from '@chakra-ui/react';
import Link from 'next/link';

function MobileListingPopup({ bedrooms, bathrooms, price, title, id, slug }) {
  return (
    <a href={`/listings/${[slug]}/${[id]}`}>
      <Box maxW="sm" overflow="hidden">
        {/* <Image src={image} alt="Listing Image" h="200px" objectFit="cover" /> */}
        <Text>{price}</Text>
        <Text>{title}</Text>
        <Text>
          {bedrooms} Beds | {bathrooms} Baths
        </Text>
      </Box>
    </a>
  );
}

export default MobileListingPopup;
